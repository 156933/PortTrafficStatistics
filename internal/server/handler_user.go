package server

import (
	"encoding/json"
	"net/http"
	"strconv"

	"lxc-traffic-monitor/internal/model"
)

func (s *Server) handleListUsers(w http.ResponseWriter, r *http.Request) {
	status := r.URL.Query().Get("status")
	search := r.URL.Query().Get("search")
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	size, _ := strconv.Atoi(r.URL.Query().Get("size"))
	if page < 1 {
		page = 1
	}
	if size < 1 || size > 100 {
		size = 20
	}

	users, total, err := s.store.ListUsers(status, search, page, size)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "list users failed")
		return
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"data":  users,
		"total": total,
		"page":  page,
		"size":  size,
	})
}

func (s *Server) handleGetUser(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("user_id")
	user, err := s.store.GetUser(userID)
	if err != nil {
		respondError(w, http.StatusNotFound, "user not found")
		return
	}

	cycleStart, cycleEnd := GetCycleDates(user.ResetDay)
	var rxTotal, txTotal int64
	s.store.db.QueryRow(
		"SELECT COALESCE(SUM(rx_bytes), 0), COALESCE(SUM(tx_bytes), 0) FROM traffic_logs WHERE user_id = ? AND recorded_at >= ? AND recorded_at <= ?",
		user.UserID, cycleStart, cycleEnd,
	).Scan(&rxTotal, &txTotal)

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"user": user,
		"traffic": map[string]interface{}{
			"rx_bytes":    rxTotal,
			"tx_bytes":    txTotal,
			"total_bytes": rxTotal + txTotal,
			"total_human": FormatBytes(rxTotal + txTotal),
		},
	})
}

func (s *Server) handleCreateUser(w http.ResponseWriter, r *http.Request) {
	var req model.CreateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if req.UserID == "" || req.Name == "" || req.HostID == "" {
		respondError(w, http.StatusBadRequest, "user_id, name, host_id required")
		return
	}
	if req.ResetDay < 1 || req.ResetDay > 28 {
		req.ResetDay = 1
	}

	user, err := s.store.CreateUser(&req)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "create user failed")
		return
	}

	admin := GetAdminUsername(r.Context())
	s.store.CreateAuditLog(admin, "create_user", "user", req.UserID, "")

	respondJSON(w, http.StatusCreated, user)
}

func (s *Server) handleUpdateUser(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("user_id")
	var req model.UpdateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if err := s.store.UpdateUser(userID, &req); err != nil {
		respondError(w, http.StatusInternalServerError, "update user failed")
		return
	}

	admin := GetAdminUsername(r.Context())
	detail, _ := json.Marshal(req)
	s.store.CreateAuditLog(admin, "update_user", "user", userID, string(detail))

	respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) handleDeleteUser(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("user_id")
	if err := s.store.DeleteUser(userID); err != nil {
		respondError(w, http.StatusInternalServerError, "delete user failed")
		return
	}

	admin := GetAdminUsername(r.Context())
	s.store.CreateAuditLog(admin, "delete_user", "user", userID, "")

	respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) handleSuspendUser(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("user_id")
	if err := s.store.SuspendUser(userID); err != nil {
		respondError(w, http.StatusInternalServerError, "suspend user failed")
		return
	}

	admin := GetAdminUsername(r.Context())
	s.store.CreateAuditLog(admin, "suspend_user", "user", userID, "")

	respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) handleResumeUser(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("user_id")
	if err := s.store.ResumeUser(userID); err != nil {
		respondError(w, http.StatusInternalServerError, "resume user failed")
		return
	}

	admin := GetAdminUsername(r.Context())
	s.store.CreateAuditLog(admin, "resume_user", "user", userID, "")

	respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}
