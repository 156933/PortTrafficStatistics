package model

import "time"

type AlertRule struct {
	ID             int64     `json:"id"`
	UserID         *string   `json:"user_id"`
	Type           string    `json:"type"`
	ThresholdBytes *int64    `json:"threshold_bytes"`
	NotifyMethod   string    `json:"notify_method"`
	WebhookURL     string    `json:"webhook_url"`
	Enabled        bool      `json:"enabled"`
	CreatedAt      time.Time `json:"created_at"`
}

type CreateAlertRuleRequest struct {
	UserID         *string `json:"user_id"`
	Type           string  `json:"type"`
	ThresholdBytes *int64  `json:"threshold_bytes"`
	NotifyMethod   string  `json:"notify_method"`
	WebhookURL     string  `json:"webhook_url"`
}

type UpdateAlertRuleRequest struct {
	UserID         *string `json:"user_id,omitempty"`
	Type           *string `json:"type,omitempty"`
	ThresholdBytes *int64  `json:"threshold_bytes,omitempty"`
	NotifyMethod   *string `json:"notify_method,omitempty"`
	WebhookURL     *string `json:"webhook_url,omitempty"`
	Enabled        *bool   `json:"enabled,omitempty"`
}

type AlertLog struct {
	ID          int64      `json:"id"`
	RuleID      int64      `json:"rule_id"`
	UserID      *string    `json:"user_id"`
	Message     string     `json:"message"`
	Resolved    bool       `json:"resolved"`
	TriggeredAt time.Time  `json:"triggered_at"`
	ResolvedAt  *time.Time `json:"resolved_at"`
}
