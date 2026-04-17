package server

import (
	"encoding/json"
	"io/fs"
	"net/http"
	"strings"
)

type Server struct {
	config *Config
	store  *Store
	mux    *http.ServeMux
}

func NewServer(config *Config, store *Store, staticFS fs.FS) *Server {
	s := &Server{
		config: config,
		store:  store,
		mux:    http.NewServeMux(),
	}
	s.setupRoutes(staticFS)
	return s
}

func (s *Server) Handler() http.Handler {
	var h http.Handler = s.mux
	h = CORSMiddleware(h)
	h = LoggingMiddleware(h)
	return h
}

func (s *Server) setupRoutes(staticFS fs.FS) {
	// Health
	s.mux.HandleFunc("GET /api/v1/health", func(w http.ResponseWriter, r *http.Request) {
		respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})

	// Public
	s.mux.HandleFunc("GET /api/v1/public/board", s.handlePublicBoard)
	s.mux.HandleFunc("GET /api/v1/public/daily-stats", s.handlePublicDailyStats)
	s.mux.HandleFunc("GET /api/v1/public/user/{user_id}/daily", s.handlePublicUserDaily)

	// Auth
	s.mux.HandleFunc("POST /api/v1/auth/login", s.handleLogin)

	// Agent internal (with agent auth)
	agentMux := http.NewServeMux()
	agentMux.HandleFunc("GET /api/v1/internal/host/{host_id}/port-mappings", s.handlePortMappings)
	agentMux.HandleFunc("POST /api/v1/traffic", s.handleTrafficIngest)
	s.mux.Handle("GET /api/v1/internal/", AgentAuthMiddleware(s.store, agentMux))
	s.mux.Handle("POST /api/v1/traffic", AgentAuthMiddleware(s.store, agentMux))

	// Admin (with JWT auth)
	adminMux := http.NewServeMux()
	// Dashboard
	adminMux.HandleFunc("GET /api/v1/admin/dashboard", s.handleDashboard)
	// Users
	adminMux.HandleFunc("GET /api/v1/admin/users", s.handleListUsers)
	adminMux.HandleFunc("POST /api/v1/admin/users", s.handleCreateUser)
	adminMux.HandleFunc("GET /api/v1/admin/users/{user_id}", s.handleGetUser)
	adminMux.HandleFunc("PUT /api/v1/admin/users/{user_id}", s.handleUpdateUser)
	adminMux.HandleFunc("DELETE /api/v1/admin/users/{user_id}", s.handleDeleteUser)
	adminMux.HandleFunc("POST /api/v1/admin/users/{user_id}/suspend", s.handleSuspendUser)
	adminMux.HandleFunc("POST /api/v1/admin/users/{user_id}/resume", s.handleResumeUser)
	// Hosts
	adminMux.HandleFunc("GET /api/v1/admin/hosts", s.handleListHosts)
	adminMux.HandleFunc("POST /api/v1/admin/hosts", s.handleCreateHost)
	adminMux.HandleFunc("PUT /api/v1/admin/hosts/{host_id}", s.handleUpdateHost)
	adminMux.HandleFunc("DELETE /api/v1/admin/hosts/{host_id}", s.handleDeleteHost)
	// Traffic
	adminMux.HandleFunc("GET /api/v1/admin/traffic/overview", s.handleTrafficOverview)
	adminMux.HandleFunc("GET /api/v1/admin/traffic/user/{user_id}", s.handleAdminUserTraffic)
	// Alerts
	adminMux.HandleFunc("GET /api/v1/admin/alerts/rules", s.handleListAlertRules)
	adminMux.HandleFunc("POST /api/v1/admin/alerts/rules", s.handleCreateAlertRule)
	adminMux.HandleFunc("PUT /api/v1/admin/alerts/rules/{id}", s.handleUpdateAlertRule)
	adminMux.HandleFunc("DELETE /api/v1/admin/alerts/rules/{id}", s.handleDeleteAlertRule)
	adminMux.HandleFunc("GET /api/v1/admin/alerts/logs", s.handleListAlertLogs)
	adminMux.HandleFunc("POST /api/v1/admin/alerts/logs/{id}/resolve", s.handleResolveAlertLog)
	// Audit
	adminMux.HandleFunc("GET /api/v1/admin/audit", s.handleListAuditLogs)
	// Export
	adminMux.HandleFunc("GET /api/v1/admin/export/traffic", s.handleExportTraffic)

	s.mux.Handle("/api/v1/admin/", AdminAuthMiddleware(s.config.JWTSecret, adminMux))

	// SPA static files fallback
	if staticFS != nil {
		s.mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			if strings.HasPrefix(r.URL.Path, "/api/") {
				respondError(w, http.StatusNotFound, "not found")
				return
			}
			s.serveStatic(w, r, staticFS)
		})
	}
}

func (s *Server) serveStatic(w http.ResponseWriter, r *http.Request, staticFS fs.FS) {
	path := strings.TrimPrefix(r.URL.Path, "/")
	if path == "" {
		path = "index.html"
	}

	f, err := staticFS.Open(path)
	if err != nil {
		// SPA fallback: serve index.html for non-file paths
		f, err = staticFS.Open("index.html")
		if err != nil {
			http.NotFound(w, r)
			return
		}
		defer f.Close()
		stat, err := f.Stat()
		if err != nil {
			http.NotFound(w, r)
			return
		}
		http.ServeContent(w, r, "index.html", stat.ModTime(), f.(interface{ Read([]byte) (int, error); Seek(int64, int) (int64, error) }).(readSeeker))
		return
	}
	defer f.Close()

	stat, err := f.Stat()
	if err != nil {
		http.NotFound(w, r)
		return
	}
	if stat.IsDir() {
		f2, err := staticFS.Open(path + "/index.html")
		if err != nil {
			http.NotFound(w, r)
			return
		}
		defer f2.Close()
		stat2, _ := f2.Stat()
		http.ServeContent(w, r, "index.html", stat2.ModTime(), f2.(readSeeker))
		return
	}

	http.ServeContent(w, r, path, stat.ModTime(), f.(readSeeker))
}

type readSeeker interface {
	Read([]byte) (int, error)
	Seek(int64, int) (int64, error)
}

func (s *Server) handleDashboard(w http.ResponseWriter, r *http.Request) {
	stats, err := s.store.GetDashboardStats()
	if err != nil {
		respondError(w, http.StatusInternalServerError, "fetch dashboard stats failed")
		return
	}
	respondJSON(w, http.StatusOK, stats)
}

func (s *Server) handleTrafficOverview(w http.ResponseWriter, r *http.Request) {
	start := r.URL.Query().Get("start")
	end := r.URL.Query().Get("end")
	if start == "" || end == "" {
		cycleStart, cycleEnd := GetCycleDates(1)
		start = cycleStart.Format("2006-01-02")
		end = cycleEnd.Format("2006-01-02")
	}

	entries, err := s.store.GetTrafficOverview(start, end)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "fetch traffic overview failed")
		return
	}
	respondJSON(w, http.StatusOK, entries)
}

func (s *Server) handleAdminUserTraffic(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("user_id")
	daily, user, err := s.store.GetUserDailyTraffic(userID)
	if err != nil {
		respondError(w, http.StatusNotFound, "user not found")
		return
	}

	cycleStart, cycleEnd := GetCycleDates(user.ResetDay)
	respondJSON(w, http.StatusOK, map[string]interface{}{
		"user_id": user.UserID,
		"name":    user.Name,
		"cycle": map[string]string{
			"start": cycleStart.Format("2006-01-02"),
			"end":   cycleEnd.Format("2006-01-02"),
		},
		"daily": daily,
	})
}

func respondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func respondError(w http.ResponseWriter, status int, message string) {
	respondJSON(w, status, map[string]string{"error": message})
}
