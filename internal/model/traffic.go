package model

import "time"

type TrafficLog struct {
	ID         int64     `json:"id"`
	HostID     string    `json:"host_id"`
	UserID     string    `json:"user_id"`
	RxBytes    int64     `json:"rx_bytes"`
	TxBytes    int64     `json:"tx_bytes"`
	RecordedAt time.Time `json:"recorded_at"`
	CreatedAt  time.Time `json:"created_at"`
}

type TrafficReport struct {
	HostID    string        `json:"host_id"`
	Timestamp string        `json:"timestamp"`
	Users     []UserTraffic `json:"users"`
}

type UserTraffic struct {
	UserID  string `json:"user_id"`
	RxBytes int64  `json:"rx_bytes"`
	TxBytes int64  `json:"tx_bytes"`
}

type PortMapping struct {
	UserID    string `json:"user_id"`
	PortStart int    `json:"port_start"`
	PortEnd   int    `json:"port_end"`
}

type BoardUser struct {
	UserID    string      `json:"user_id"`
	Name      string      `json:"name"`
	HostName  string      `json:"host_name"`
	PortRange string      `json:"port_range"`
	Status    string      `json:"status"`
	Cycle     CycleInfo   `json:"cycle"`
	Traffic   TrafficInfo `json:"traffic"`
}

type CycleInfo struct {
	Start    string `json:"start"`
	End      string `json:"end"`
	ResetDay int    `json:"reset_day"`
}

type TrafficInfo struct {
	RxBytes      int64   `json:"rx_bytes"`
	TxBytes      int64   `json:"tx_bytes"`
	TotalBytes   int64   `json:"total_bytes"`
	TotalHuman   string  `json:"total_human"`
	LimitBytes   int64   `json:"limit_bytes"`
	LimitHuman   string  `json:"limit_human"`
	UsagePercent float64 `json:"usage_percent"`
}

type DailyTraffic struct {
	Date       string `json:"date"`
	RxBytes    int64  `json:"rx_bytes"`
	TxBytes    int64  `json:"tx_bytes"`
	TotalBytes int64  `json:"total_bytes"`
}
