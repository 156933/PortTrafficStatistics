package model

import "time"

type User struct {
	ID                int64     `json:"id"`
	UserID            string    `json:"user_id"`
	Name              string    `json:"name"`
	TrafficLimitBytes int64     `json:"traffic_limit_bytes"`
	ResetDay          int       `json:"reset_day"`
	PortStart         int       `json:"port_start"`
	PortEnd           int       `json:"port_end"`
	HostID            string    `json:"host_id"`
	Status            string    `json:"status"`
	Note              string    `json:"note"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
}

type CreateUserRequest struct {
	UserID            string `json:"user_id"`
	Name              string `json:"name"`
	HostID            string `json:"host_id"`
	PortStart         int    `json:"port_start"`
	PortEnd           int    `json:"port_end"`
	TrafficLimitBytes int64  `json:"traffic_limit_bytes"`
	ResetDay          int    `json:"reset_day"`
	Note              string `json:"note"`
}

type UpdateUserRequest struct {
	Name              *string `json:"name,omitempty"`
	HostID            *string `json:"host_id,omitempty"`
	PortStart         *int    `json:"port_start,omitempty"`
	PortEnd           *int    `json:"port_end,omitempty"`
	TrafficLimitBytes *int64  `json:"traffic_limit_bytes,omitempty"`
	ResetDay          *int    `json:"reset_day,omitempty"`
	Note              *string `json:"note,omitempty"`
}
