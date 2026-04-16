package server

import (
	"encoding/json"
	"net/http"

	"lxc-traffic-monitor/internal/model"
)

func (s *Server) handleListHosts(w http.ResponseWriter, r *http.Request) {
	hosts, err := s.store.ListHosts()
	if err != nil {
		respondError(w, http.StatusInternalServerError, "list hosts failed")
		return
	}
	respondJSON(w, http.StatusOK, hosts)
}

func (s *Server) handleCreateHost(w http.ResponseWriter, r *http.Request) {
	var req model.CreateHostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if req.HostID == "" || req.Name == "" {
		respondError(w, http.StatusBadRequest, "host_id and name required")
		return
	}

	host, err := s.store.CreateHost(&req)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "create host failed")
		return
	}

	admin := GetAdminUsername(r.Context())
	s.store.CreateAuditLog(admin, "create_host", "host", req.HostID, "")

	respondJSON(w, http.StatusCreated, host)
}

func (s *Server) handleUpdateHost(w http.ResponseWriter, r *http.Request) {
	hostID := r.PathValue("host_id")
	var req model.UpdateHostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if err := s.store.UpdateHost(hostID, &req); err != nil {
		respondError(w, http.StatusInternalServerError, "update host failed")
		return
	}

	admin := GetAdminUsername(r.Context())
	detail, _ := json.Marshal(req)
	s.store.CreateAuditLog(admin, "update_host", "host", hostID, string(detail))

	respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) handleDeleteHost(w http.ResponseWriter, r *http.Request) {
	hostID := r.PathValue("host_id")
	if err := s.store.DeleteHost(hostID); err != nil {
		respondError(w, http.StatusInternalServerError, "delete host failed")
		return
	}

	admin := GetAdminUsername(r.Context())
	s.store.CreateAuditLog(admin, "delete_host", "host", hostID, "")

	respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}
