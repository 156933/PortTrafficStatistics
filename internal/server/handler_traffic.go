package server

import (
	"encoding/json"
	"log/slog"
	"net/http"

	"lxc-traffic-monitor/internal/model"
)

func (s *Server) handleTrafficIngest(w http.ResponseWriter, r *http.Request) {
	var report model.TrafficReport
	if err := json.NewDecoder(r.Body).Decode(&report); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if err := s.store.InsertTrafficLogs(&report); err != nil {
		slog.Error("insert traffic", "error", err)
		respondError(w, http.StatusInternalServerError, "insert traffic failed")
		return
	}

	if err := s.store.UpdateHostLastSeen(report.HostID); err != nil {
		slog.Error("update host last seen", "error", err)
	}

	seen := map[string]bool{}
	for _, u := range report.Users {
		if !seen[u.UserID] {
			seen[u.UserID] = true
			s.store.CheckAlerts(u.UserID)
		}
	}

	respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) handlePortMappings(w http.ResponseWriter, r *http.Request) {
	hostID := r.PathValue("host_id")
	if hostID == "" {
		respondError(w, http.StatusBadRequest, "host_id required")
		return
	}

	mappings, err := s.store.GetPortMappingsByHost(hostID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "fetch port mappings failed")
		return
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"mappings": mappings,
	})
}
