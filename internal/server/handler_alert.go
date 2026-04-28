package server

import (
	"encoding/json"
	"net/http"
	"strconv"

	"lxc-traffic-monitor/internal/model"
)

func (s *Server) handleListAlertRules(w http.ResponseWriter, r *http.Request) {
	rules, err := s.store.ListAlertRules()
	if err != nil {
		respondError(w, http.StatusInternalServerError, "list alert rules failed")
		return
	}
	respondJSON(w, http.StatusOK, rules)
}

func (s *Server) handleCreateAlertRule(w http.ResponseWriter, r *http.Request) {
	var req model.CreateAlertRuleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if req.Type == "" {
		respondError(w, http.StatusBadRequest, "type required")
		return
	}
	if req.NotifyMethod == "" {
		req.NotifyMethod = "log"
	}

	rule, err := s.store.CreateAlertRule(&req)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "create alert rule failed")
		return
	}

	admin := GetAdminUsername(r.Context())
	s.store.CreateAuditLog(admin, "create_alert_rule", "alert_rule", strconv.FormatInt(rule.ID, 10), "")

	respondJSON(w, http.StatusCreated, rule)
}

func (s *Server) handleUpdateAlertRule(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid id")
		return
	}

	var req model.UpdateAlertRuleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if err := s.store.UpdateAlertRule(id, &req); err != nil {
		respondError(w, http.StatusInternalServerError, "update alert rule failed")
		return
	}

	admin := GetAdminUsername(r.Context())
	detail, _ := json.Marshal(req)
	s.store.CreateAuditLog(admin, "update_alert_rule", "alert_rule", idStr, string(detail))

	respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) handleDeleteAlertRule(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid id")
		return
	}

	if err := s.store.DeleteAlertRule(id); err != nil {
		respondError(w, http.StatusInternalServerError, "delete alert rule failed")
		return
	}

	admin := GetAdminUsername(r.Context())
	s.store.CreateAuditLog(admin, "delete_alert_rule", "alert_rule", idStr, "")

	respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) handleListAlertLogs(w http.ResponseWriter, r *http.Request) {
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	size, _ := strconv.Atoi(r.URL.Query().Get("size"))
	if page < 1 {
		page = 1
	}
	if size < 1 || size > 100 {
		size = 20
	}

	var resolved *bool
	if v := r.URL.Query().Get("resolved"); v != "" {
		b := v == "true"
		resolved = &b
	}

	logs, total, err := s.store.ListAlertLogs(resolved, page, size)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "list alert logs failed")
		return
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"data":  logs,
		"total": total,
		"page":  page,
		"size":  size,
	})
}

func (s *Server) handleResolveAlertLog(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid id")
		return
	}

	if err := s.store.ResolveAlertLog(id); err != nil {
		respondError(w, http.StatusInternalServerError, "resolve alert log failed")
		return
	}

	respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}
