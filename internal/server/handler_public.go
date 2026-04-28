package server

import (
	"net/http"
	"time"
)

func (s *Server) handlePublicBoard(w http.ResponseWriter, r *http.Request) {
	board, err := s.store.GetPublicBoard()
	if err != nil {
		respondError(w, http.StatusInternalServerError, "fetch board failed")
		return
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"generated_at": time.Now().UTC().Format(time.RFC3339),
		"users":        board,
	})
}

func (s *Server) handlePublicDailyStats(w http.ResponseWriter, r *http.Request) {
	daily, err := s.store.GetPublicDailyStats()
	if err != nil {
		respondError(w, http.StatusInternalServerError, "fetch daily stats failed")
		return
	}
	respondJSON(w, http.StatusOK, map[string]interface{}{
		"daily": daily,
	})
}

func (s *Server) handlePublicUserDaily(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("user_id")
	if userID == "" {
		respondError(w, http.StatusBadRequest, "user_id required")
		return
	}

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
