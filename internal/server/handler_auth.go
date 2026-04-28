package server

import (
	"encoding/json"
	"net/http"

	"lxc-traffic-monitor/internal/model"

	"golang.org/x/crypto/bcrypt"
)

func (s *Server) handleLogin(w http.ResponseWriter, r *http.Request) {
	var req model.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	admin, err := s.store.GetAdminByUsername(req.Username)
	if err != nil {
		respondError(w, http.StatusUnauthorized, "invalid credentials")
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(admin.PasswordHash), []byte(req.Password)); err != nil {
		respondError(w, http.StatusUnauthorized, "invalid credentials")
		return
	}

	tokenStr, expiresAt, err := GenerateJWT(admin.Username, s.config.JWTSecret)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "generate token failed")
		return
	}

	respondJSON(w, http.StatusOK, model.LoginResponse{
		Token:     tokenStr,
		ExpiresAt: expiresAt.Format("2006-01-02T15:04:05Z"),
	})
}
