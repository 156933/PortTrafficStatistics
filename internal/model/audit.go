package model

import "time"

type AuditLog struct {
	ID            int64     `json:"id"`
	AdminUsername string    `json:"admin_username"`
	Action        string    `json:"action"`
	TargetType    string    `json:"target_type"`
	TargetID      string    `json:"target_id"`
	Detail        string    `json:"detail"`
	CreatedAt     time.Time `json:"created_at"`
}
