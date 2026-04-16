package server

import (
	"net/http"
	"strconv"
)

func (s *Server) handleListAuditLogs(w http.ResponseWriter, r *http.Request) {
	action := r.URL.Query().Get("action")
	targetType := r.URL.Query().Get("target_type")
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	size, _ := strconv.Atoi(r.URL.Query().Get("size"))
	if page < 1 {
		page = 1
	}
	if size < 1 || size > 100 {
		size = 50
	}

	logs, total, err := s.store.ListAuditLogs(action, targetType, page, size)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "list audit logs failed")
		return
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"data":  logs,
		"total": total,
		"page":  page,
		"size":  size,
	})
}
