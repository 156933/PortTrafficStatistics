package server

import (
	"encoding/csv"
	"net/http"
	"time"
)

func (s *Server) handleExportTraffic(w http.ResponseWriter, r *http.Request) {
	start := r.URL.Query().Get("start")
	end := r.URL.Query().Get("end")

	if start == "" {
		start = time.Now().UTC().AddDate(0, -1, 0).Format("2006-01-02")
	}
	if end == "" {
		end = time.Now().UTC().Format("2006-01-02")
	}

	records, err := s.store.ExportTrafficCSV(start, end)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "export failed")
		return
	}

	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment; filename=traffic_export.csv")

	writer := csv.NewWriter(w)
	for _, record := range records {
		if err := writer.Write(record); err != nil {
			return
		}
	}
	writer.Flush()
}
