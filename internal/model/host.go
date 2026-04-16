package model

import "time"

type Host struct {
	ID         int64      `json:"id"`
	HostID     string     `json:"host_id"`
	Name       string     `json:"name"`
	APIToken   string     `json:"api_token,omitempty"`
	Status     string     `json:"status"`
	LastSeenAt *time.Time `json:"last_seen_at"`
	CreatedAt  time.Time  `json:"created_at"`
}

type CreateHostRequest struct {
	HostID string `json:"host_id"`
	Name   string `json:"name"`
}

type UpdateHostRequest struct {
	Name *string `json:"name,omitempty"`
}
