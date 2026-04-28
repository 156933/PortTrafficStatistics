package agent

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"sync"
	"time"
)

type TrafficReport struct {
	HostID    string          `json:"host_id"`
	Timestamp string          `json:"timestamp"`
	Users     []TrafficSample `json:"users"`
}

type Reporter struct {
	serverURL string
	hostID    string
	apiToken  string
	client    *http.Client
	mu        sync.Mutex
	cache     []TrafficReport
}

func NewReporter(serverURL, hostID, apiToken string) *Reporter {
	return &Reporter{
		serverURL: serverURL,
		hostID:    hostID,
		apiToken:  apiToken,
		client:    &http.Client{Timeout: 10 * time.Second},
	}
}

func (r *Reporter) Report(samples []TrafficSample) error {
	report := TrafficReport{
		HostID:    r.hostID,
		Timestamp: time.Now().UTC().Format(time.RFC3339),
		Users:     samples,
	}

	r.mu.Lock()
	pending := make([]TrafficReport, len(r.cache))
	copy(pending, r.cache)
	r.cache = nil
	r.mu.Unlock()

	pending = append(pending, report)

	var failed []TrafficReport
	for _, rep := range pending {
		if err := r.send(rep); err != nil {
			slog.Warn("report failed, caching", "error", err)
			failed = append(failed, rep)
		}
	}

	if len(failed) > 0 {
		r.mu.Lock()
		r.cache = append(r.cache, failed...)
		if len(r.cache) > 1000 {
			r.cache = r.cache[len(r.cache)-1000:]
		}
		r.mu.Unlock()
		return fmt.Errorf("failed to send %d reports", len(failed))
	}

	return nil
}

func (r *Reporter) send(report TrafficReport) error {
	body, err := json.Marshal(report)
	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPost, r.serverURL+"/api/v1/traffic", bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+r.apiToken)

	resp, err := r.client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("server returned %d", resp.StatusCode)
	}

	return nil
}

func (r *Reporter) FetchPortMappings() ([]PortMapping, error) {
	req, err := http.NewRequest(http.MethodGet, r.serverURL+"/api/v1/internal/host/"+r.hostID+"/port-mappings", nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "Bearer "+r.apiToken)

	resp, err := r.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("port mappings: server returned %d", resp.StatusCode)
	}

	var result struct {
		Mappings []PortMapping `json:"mappings"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return result.Mappings, nil
}
