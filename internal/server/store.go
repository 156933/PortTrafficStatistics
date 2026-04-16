package server

import (
	"database/sql"
	"fmt"
	"log/slog"
	"math"
	"os"
	"path/filepath"
	"time"

	"lxc-traffic-monitor/internal/model"

	"github.com/google/uuid"
	_ "modernc.org/sqlite"
	"golang.org/x/crypto/bcrypt"
)

type Store struct {
	db *sql.DB
}

func NewStore(dbPath string) (*Store, error) {
	dir := filepath.Dir(dbPath)
	if dir != "." && dir != "" {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return nil, fmt.Errorf("create db directory: %w", err)
		}
	}

	db, err := sql.Open("sqlite", dbPath+"?_pragma=journal_mode(WAL)&_pragma=busy_timeout(5000)")
	if err != nil {
		return nil, fmt.Errorf("open database: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("ping database: %w", err)
	}

	s := &Store{db: db}
	if err := s.migrate(); err != nil {
		return nil, fmt.Errorf("migrate database: %w", err)
	}

	return s, nil
}

func (s *Store) Close() error {
	return s.db.Close()
}

func (s *Store) migrate() error {
	statements := []string{
		`CREATE TABLE IF NOT EXISTS admins (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE,
			password_hash TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id TEXT NOT NULL UNIQUE,
			name TEXT NOT NULL,
			traffic_limit_bytes INTEGER DEFAULT 0,
			reset_day INTEGER DEFAULT 1,
			port_start INTEGER NOT NULL,
			port_end INTEGER NOT NULL,
			host_id TEXT NOT NULL,
			status TEXT DEFAULT 'active',
			note TEXT DEFAULT '',
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS hosts (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			host_id TEXT NOT NULL UNIQUE,
			name TEXT NOT NULL,
			api_token TEXT NOT NULL,
			status TEXT DEFAULT 'online',
			last_seen_at DATETIME,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS traffic_logs (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			host_id TEXT NOT NULL,
			user_id TEXT NOT NULL,
			rx_bytes INTEGER NOT NULL,
			tx_bytes INTEGER NOT NULL,
			recorded_at DATETIME NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE INDEX IF NOT EXISTS idx_traffic_user_time ON traffic_logs(user_id, recorded_at)`,
		`CREATE INDEX IF NOT EXISTS idx_traffic_host_time ON traffic_logs(host_id, recorded_at)`,
		`CREATE TABLE IF NOT EXISTS alert_rules (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id TEXT,
			type TEXT NOT NULL,
			threshold_bytes INTEGER,
			notify_method TEXT DEFAULT 'log',
			webhook_url TEXT,
			enabled INTEGER DEFAULT 1,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS alert_logs (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			rule_id INTEGER NOT NULL,
			user_id TEXT,
			message TEXT NOT NULL,
			resolved INTEGER DEFAULT 0,
			triggered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			resolved_at DATETIME,
			FOREIGN KEY (rule_id) REFERENCES alert_rules(id)
		)`,
		`CREATE TABLE IF NOT EXISTS audit_logs (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			admin_username TEXT NOT NULL,
			action TEXT NOT NULL,
			target_type TEXT NOT NULL,
			target_id TEXT NOT NULL,
			detail TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE INDEX IF NOT EXISTS idx_audit_time ON audit_logs(created_at)`,
	}

	tx, err := s.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	for _, stmt := range statements {
		if _, err := tx.Exec(stmt); err != nil {
			return fmt.Errorf("exec migration: %w", err)
		}
	}

	return tx.Commit()
}

// SeedAdmin creates initial admin if admins table is empty
func (s *Store) SeedAdmin(username, password string) error {
	var count int
	if err := s.db.QueryRow("SELECT COUNT(*) FROM admins").Scan(&count); err != nil {
		return err
	}
	if count > 0 {
		return nil
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	_, err = s.db.Exec("INSERT INTO admins (username, password_hash) VALUES (?, ?)", username, string(hash))
	if err != nil {
		return err
	}

	slog.Info("initial admin created", "username", username)
	return nil
}

// Admin methods

func (s *Store) GetAdminByUsername(username string) (*model.Admin, error) {
	var a model.Admin
	err := s.db.QueryRow(
		"SELECT id, username, password_hash, created_at FROM admins WHERE username = ?",
		username,
	).Scan(&a.ID, &a.Username, &a.PasswordHash, &a.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &a, nil
}

// Host methods

func (s *Store) CreateHost(req *model.CreateHostRequest) (*model.Host, error) {
	token := uuid.New().String()
	result, err := s.db.Exec(
		"INSERT INTO hosts (host_id, name, api_token) VALUES (?, ?, ?)",
		req.HostID, req.Name, token,
	)
	if err != nil {
		return nil, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &model.Host{
		ID:       id,
		HostID:   req.HostID,
		Name:     req.Name,
		APIToken: token,
		Status:   "online",
	}, nil
}

func (s *Store) ListHosts() ([]model.Host, error) {
	rows, err := s.db.Query("SELECT id, host_id, name, status, last_seen_at, created_at FROM hosts ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var hosts []model.Host
	for rows.Next() {
		var h model.Host
		if err := rows.Scan(&h.ID, &h.HostID, &h.Name, &h.Status, &h.LastSeenAt, &h.CreatedAt); err != nil {
			return nil, err
		}
		hosts = append(hosts, h)
	}
	return hosts, rows.Err()
}

func (s *Store) GetHost(hostID string) (*model.Host, error) {
	var h model.Host
	err := s.db.QueryRow(
		"SELECT id, host_id, name, api_token, status, last_seen_at, created_at FROM hosts WHERE host_id = ?",
		hostID,
	).Scan(&h.ID, &h.HostID, &h.Name, &h.APIToken, &h.Status, &h.LastSeenAt, &h.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &h, nil
}

func (s *Store) GetHostByToken(token string) (*model.Host, error) {
	var h model.Host
	err := s.db.QueryRow(
		"SELECT id, host_id, name, api_token, status, last_seen_at, created_at FROM hosts WHERE api_token = ?",
		token,
	).Scan(&h.ID, &h.HostID, &h.Name, &h.APIToken, &h.Status, &h.LastSeenAt, &h.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &h, nil
}

func (s *Store) UpdateHost(hostID string, req *model.UpdateHostRequest) error {
	if req.Name != nil {
		_, err := s.db.Exec("UPDATE hosts SET name = ? WHERE host_id = ?", *req.Name, hostID)
		return err
	}
	return nil
}

func (s *Store) DeleteHost(hostID string) error {
	_, err := s.db.Exec("DELETE FROM hosts WHERE host_id = ?", hostID)
	return err
}

func (s *Store) UpdateHostLastSeen(hostID string) error {
	_, err := s.db.Exec("UPDATE hosts SET last_seen_at = ?, status = 'online' WHERE host_id = ?", time.Now().UTC(), hostID)
	return err
}

// User methods

func (s *Store) CreateUser(req *model.CreateUserRequest) (*model.User, error) {
	now := time.Now().UTC()
	result, err := s.db.Exec(
		`INSERT INTO users (user_id, name, traffic_limit_bytes, reset_day, port_start, port_end, host_id, note, created_at, updated_at)
		 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		req.UserID, req.Name, req.TrafficLimitBytes, req.ResetDay,
		req.PortStart, req.PortEnd, req.HostID, req.Note, now, now,
	)
	if err != nil {
		return nil, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &model.User{
		ID:                id,
		UserID:            req.UserID,
		Name:              req.Name,
		TrafficLimitBytes: req.TrafficLimitBytes,
		ResetDay:          req.ResetDay,
		PortStart:         req.PortStart,
		PortEnd:           req.PortEnd,
		HostID:            req.HostID,
		Status:            "active",
		Note:              req.Note,
		CreatedAt:         now,
		UpdatedAt:         now,
	}, nil
}

func (s *Store) ListUsers(status, search string, page, size int) ([]model.User, int64, error) {
	where := "WHERE 1=1"
	args := []interface{}{}
	if status != "" {
		where += " AND status = ?"
		args = append(args, status)
	}
	if search != "" {
		where += " AND (user_id LIKE ? OR name LIKE ?)"
		pattern := "%" + search + "%"
		args = append(args, pattern, pattern)
	}

	var total int64
	countArgs := make([]interface{}, len(args))
	copy(countArgs, args)
	if err := s.db.QueryRow("SELECT COUNT(*) FROM users "+where, countArgs...).Scan(&total); err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * size
	query := fmt.Sprintf(
		"SELECT id, user_id, name, traffic_limit_bytes, reset_day, port_start, port_end, host_id, status, note, created_at, updated_at FROM users %s ORDER BY created_at DESC LIMIT ? OFFSET ?",
		where,
	)
	args = append(args, size, offset)

	rows, err := s.db.Query(query, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var users []model.User
	for rows.Next() {
		var u model.User
		if err := rows.Scan(&u.ID, &u.UserID, &u.Name, &u.TrafficLimitBytes, &u.ResetDay, &u.PortStart, &u.PortEnd, &u.HostID, &u.Status, &u.Note, &u.CreatedAt, &u.UpdatedAt); err != nil {
			return nil, 0, err
		}
		users = append(users, u)
	}
	return users, total, rows.Err()
}

func (s *Store) GetUser(userID string) (*model.User, error) {
	var u model.User
	err := s.db.QueryRow(
		"SELECT id, user_id, name, traffic_limit_bytes, reset_day, port_start, port_end, host_id, status, note, created_at, updated_at FROM users WHERE user_id = ?",
		userID,
	).Scan(&u.ID, &u.UserID, &u.Name, &u.TrafficLimitBytes, &u.ResetDay, &u.PortStart, &u.PortEnd, &u.HostID, &u.Status, &u.Note, &u.CreatedAt, &u.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func (s *Store) UpdateUser(userID string, req *model.UpdateUserRequest) error {
	sets := []string{}
	args := []interface{}{}

	if req.Name != nil {
		sets = append(sets, "name = ?")
		args = append(args, *req.Name)
	}
	if req.HostID != nil {
		sets = append(sets, "host_id = ?")
		args = append(args, *req.HostID)
	}
	if req.PortStart != nil {
		sets = append(sets, "port_start = ?")
		args = append(args, *req.PortStart)
	}
	if req.PortEnd != nil {
		sets = append(sets, "port_end = ?")
		args = append(args, *req.PortEnd)
	}
	if req.TrafficLimitBytes != nil {
		sets = append(sets, "traffic_limit_bytes = ?")
		args = append(args, *req.TrafficLimitBytes)
	}
	if req.ResetDay != nil {
		sets = append(sets, "reset_day = ?")
		args = append(args, *req.ResetDay)
	}
	if req.Note != nil {
		sets = append(sets, "note = ?")
		args = append(args, *req.Note)
	}

	if len(sets) == 0 {
		return nil
	}

	sets = append(sets, "updated_at = ?")
	args = append(args, time.Now().UTC())
	args = append(args, userID)

	query := fmt.Sprintf("UPDATE users SET %s WHERE user_id = ?", joinStrings(sets, ", "))
	_, err := s.db.Exec(query, args...)
	return err
}

func (s *Store) DeleteUser(userID string) error {
	_, err := s.db.Exec("UPDATE users SET status = 'deleted', updated_at = ? WHERE user_id = ?", time.Now().UTC(), userID)
	return err
}

func (s *Store) SuspendUser(userID string) error {
	_, err := s.db.Exec("UPDATE users SET status = 'suspended', updated_at = ? WHERE user_id = ?", time.Now().UTC(), userID)
	return err
}

func (s *Store) ResumeUser(userID string) error {
	_, err := s.db.Exec("UPDATE users SET status = 'active', updated_at = ? WHERE user_id = ?", time.Now().UTC(), userID)
	return err
}

// Traffic methods

func (s *Store) InsertTrafficLogs(report *model.TrafficReport) error {
	ts, err := time.Parse(time.RFC3339, report.Timestamp)
	if err != nil {
		return fmt.Errorf("parse timestamp: %w", err)
	}

	tx, err := s.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	stmt, err := tx.Prepare("INSERT INTO traffic_logs (host_id, user_id, rx_bytes, tx_bytes, recorded_at) VALUES (?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	for _, u := range report.Users {
		if _, err := stmt.Exec(report.HostID, u.UserID, u.RxBytes, u.TxBytes, ts); err != nil {
			return err
		}
	}

	return tx.Commit()
}

func (s *Store) GetPortMappingsByHost(hostID string) ([]model.PortMapping, error) {
	rows, err := s.db.Query(
		"SELECT user_id, port_start, port_end FROM users WHERE host_id = ? AND status != 'deleted'",
		hostID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var mappings []model.PortMapping
	for rows.Next() {
		var m model.PortMapping
		if err := rows.Scan(&m.UserID, &m.PortStart, &m.PortEnd); err != nil {
			return nil, err
		}
		mappings = append(mappings, m)
	}
	return mappings, rows.Err()
}

// GetCycleDates returns start and end of the billing cycle for given reset_day
func GetCycleDates(resetDay int) (start, end time.Time) {
	now := time.Now().UTC()
	year, month, day := now.Date()

	if day >= resetDay {
		start = time.Date(year, month, resetDay, 0, 0, 0, 0, time.UTC)
		end = time.Date(year, month+1, resetDay, 0, 0, 0, 0, time.UTC).Add(-time.Second)
	} else {
		start = time.Date(year, month-1, resetDay, 0, 0, 0, 0, time.UTC)
		end = time.Date(year, month, resetDay, 0, 0, 0, 0, time.UTC).Add(-time.Second)
	}
	return
}

func (s *Store) GetPublicBoard() ([]model.BoardUser, error) {
	users, _, err := s.ListUsers("", "", 1, 1000)
	if err != nil {
		return nil, err
	}

	var board []model.BoardUser
	for _, u := range users {
		if u.Status == "deleted" {
			continue
		}

		cycleStart, cycleEnd := GetCycleDates(u.ResetDay)

		var rxTotal, txTotal int64
		err := s.db.QueryRow(
			"SELECT COALESCE(SUM(rx_bytes), 0), COALESCE(SUM(tx_bytes), 0) FROM traffic_logs WHERE user_id = ? AND recorded_at >= ? AND recorded_at <= ?",
			u.UserID, cycleStart, cycleEnd,
		).Scan(&rxTotal, &txTotal)
		if err != nil {
			return nil, err
		}

		total := rxTotal + txTotal
		var usagePercent float64
		if u.TrafficLimitBytes > 0 {
			usagePercent = math.Round(float64(total)/float64(u.TrafficLimitBytes)*10000) / 100
		}

		hostName := u.HostID
		host, err := s.GetHost(u.HostID)
		if err == nil {
			hostName = host.Name
		}

		board = append(board, model.BoardUser{
			UserID:   u.UserID,
			Name:     u.Name,
			HostName: hostName,
			PortRange: fmt.Sprintf("%d-%d", u.PortStart, u.PortEnd),
			Status:   u.Status,
			Cycle: model.CycleInfo{
				Start:    cycleStart.Format("2006-01-02"),
				End:      cycleEnd.Format("2006-01-02"),
				ResetDay: u.ResetDay,
			},
			Traffic: model.TrafficInfo{
				RxBytes:      rxTotal,
				TxBytes:      txTotal,
				TotalBytes:   total,
				TotalHuman:   FormatBytes(total),
				LimitBytes:   u.TrafficLimitBytes,
				LimitHuman:   FormatBytes(u.TrafficLimitBytes),
				UsagePercent: usagePercent,
			},
		})
	}

	return board, nil
}

func (s *Store) GetUserDailyTraffic(userID string) ([]model.DailyTraffic, *model.User, error) {
	u, err := s.GetUser(userID)
	if err != nil {
		return nil, nil, err
	}

	cycleStart, cycleEnd := GetCycleDates(u.ResetDay)

	rows, err := s.db.Query(
		`SELECT DATE(recorded_at) as date, SUM(rx_bytes), SUM(tx_bytes)
		 FROM traffic_logs
		 WHERE user_id = ? AND recorded_at >= ? AND recorded_at <= ?
		 GROUP BY DATE(recorded_at)
		 ORDER BY date`,
		userID, cycleStart, cycleEnd,
	)
	if err != nil {
		return nil, nil, err
	}
	defer rows.Close()

	var daily []model.DailyTraffic
	for rows.Next() {
		var d model.DailyTraffic
		if err := rows.Scan(&d.Date, &d.RxBytes, &d.TxBytes); err != nil {
			return nil, nil, err
		}
		d.TotalBytes = d.RxBytes + d.TxBytes
		daily = append(daily, d)
	}
	return daily, u, rows.Err()
}

// Dashboard stats

type DashboardStats struct {
	TotalUsers      int64  `json:"total_users"`
	OnlineHosts     int64  `json:"online_hosts"`
	TodayTraffic    int64  `json:"today_traffic"`
	TodayTrafficStr string `json:"today_traffic_human"`
	UnresolvedAlerts int64 `json:"unresolved_alerts"`
}

func (s *Store) GetDashboardStats() (*DashboardStats, error) {
	stats := &DashboardStats{}

	if err := s.db.QueryRow("SELECT COUNT(*) FROM users WHERE status = 'active'").Scan(&stats.TotalUsers); err != nil {
		return nil, err
	}

	fiveMinAgo := time.Now().UTC().Add(-5 * time.Minute)
	if err := s.db.QueryRow("SELECT COUNT(*) FROM hosts WHERE last_seen_at > ?", fiveMinAgo).Scan(&stats.OnlineHosts); err != nil {
		return nil, err
	}

	today := time.Now().UTC().Truncate(24 * time.Hour)
	if err := s.db.QueryRow("SELECT COALESCE(SUM(rx_bytes + tx_bytes), 0) FROM traffic_logs WHERE recorded_at >= ?", today).Scan(&stats.TodayTraffic); err != nil {
		return nil, err
	}
	stats.TodayTrafficStr = FormatBytes(stats.TodayTraffic)

	if err := s.db.QueryRow("SELECT COUNT(*) FROM alert_logs WHERE resolved = 0").Scan(&stats.UnresolvedAlerts); err != nil {
		return nil, err
	}

	return stats, nil
}

// Traffic overview for admin

type TrafficOverviewEntry struct {
	UserID     string `json:"user_id"`
	Name       string `json:"name"`
	RxBytes    int64  `json:"rx_bytes"`
	TxBytes    int64  `json:"tx_bytes"`
	TotalBytes int64  `json:"total_bytes"`
}

func (s *Store) GetTrafficOverview(start, end string) ([]TrafficOverviewEntry, error) {
	query := `SELECT u.user_id, u.name, COALESCE(SUM(t.rx_bytes), 0), COALESCE(SUM(t.tx_bytes), 0)
		FROM users u
		LEFT JOIN traffic_logs t ON u.user_id = t.user_id AND t.recorded_at >= ? AND t.recorded_at <= ?
		WHERE u.status != 'deleted'
		GROUP BY u.user_id, u.name
		ORDER BY COALESCE(SUM(t.rx_bytes + t.tx_bytes), 0) DESC`

	rows, err := s.db.Query(query, start, end)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var entries []TrafficOverviewEntry
	for rows.Next() {
		var e TrafficOverviewEntry
		if err := rows.Scan(&e.UserID, &e.Name, &e.RxBytes, &e.TxBytes); err != nil {
			return nil, err
		}
		e.TotalBytes = e.RxBytes + e.TxBytes
		entries = append(entries, e)
	}
	return entries, rows.Err()
}

// Alert methods

func (s *Store) CreateAlertRule(req *model.CreateAlertRuleRequest) (*model.AlertRule, error) {
	result, err := s.db.Exec(
		"INSERT INTO alert_rules (user_id, type, threshold_bytes, notify_method, webhook_url) VALUES (?, ?, ?, ?, ?)",
		req.UserID, req.Type, req.ThresholdBytes, req.NotifyMethod, req.WebhookURL,
	)
	if err != nil {
		return nil, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &model.AlertRule{
		ID:             id,
		UserID:         req.UserID,
		Type:           req.Type,
		ThresholdBytes: req.ThresholdBytes,
		NotifyMethod:   req.NotifyMethod,
		WebhookURL:     req.WebhookURL,
		Enabled:        true,
	}, nil
}

func (s *Store) ListAlertRules() ([]model.AlertRule, error) {
	rows, err := s.db.Query("SELECT id, user_id, type, threshold_bytes, notify_method, webhook_url, enabled, created_at FROM alert_rules ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var rules []model.AlertRule
	for rows.Next() {
		var r model.AlertRule
		var enabled int
		if err := rows.Scan(&r.ID, &r.UserID, &r.Type, &r.ThresholdBytes, &r.NotifyMethod, &r.WebhookURL, &enabled, &r.CreatedAt); err != nil {
			return nil, err
		}
		r.Enabled = enabled == 1
		rules = append(rules, r)
	}
	return rules, rows.Err()
}

func (s *Store) UpdateAlertRule(id int64, req *model.UpdateAlertRuleRequest) error {
	sets := []string{}
	args := []interface{}{}

	if req.Type != nil {
		sets = append(sets, "type = ?")
		args = append(args, *req.Type)
	}
	if req.ThresholdBytes != nil {
		sets = append(sets, "threshold_bytes = ?")
		args = append(args, *req.ThresholdBytes)
	}
	if req.NotifyMethod != nil {
		sets = append(sets, "notify_method = ?")
		args = append(args, *req.NotifyMethod)
	}
	if req.WebhookURL != nil {
		sets = append(sets, "webhook_url = ?")
		args = append(args, *req.WebhookURL)
	}
	if req.Enabled != nil {
		sets = append(sets, "enabled = ?")
		if *req.Enabled {
			args = append(args, 1)
		} else {
			args = append(args, 0)
		}
	}

	if len(sets) == 0 {
		return nil
	}

	args = append(args, id)
	query := fmt.Sprintf("UPDATE alert_rules SET %s WHERE id = ?", joinStrings(sets, ", "))
	_, err := s.db.Exec(query, args...)
	return err
}

func (s *Store) DeleteAlertRule(id int64) error {
	_, err := s.db.Exec("DELETE FROM alert_rules WHERE id = ?", id)
	return err
}

func (s *Store) ListAlertLogs(resolved *bool, page, size int) ([]model.AlertLog, int64, error) {
	where := "WHERE 1=1"
	args := []interface{}{}
	if resolved != nil {
		where += " AND resolved = ?"
		if *resolved {
			args = append(args, 1)
		} else {
			args = append(args, 0)
		}
	}

	var total int64
	countArgs := make([]interface{}, len(args))
	copy(countArgs, args)
	if err := s.db.QueryRow("SELECT COUNT(*) FROM alert_logs "+where, countArgs...).Scan(&total); err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * size
	query := fmt.Sprintf("SELECT id, rule_id, user_id, message, resolved, triggered_at, resolved_at FROM alert_logs %s ORDER BY triggered_at DESC LIMIT ? OFFSET ?", where)
	args = append(args, size, offset)

	rows, err := s.db.Query(query, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var logs []model.AlertLog
	for rows.Next() {
		var l model.AlertLog
		var resolved int
		if err := rows.Scan(&l.ID, &l.RuleID, &l.UserID, &l.Message, &resolved, &l.TriggeredAt, &l.ResolvedAt); err != nil {
			return nil, 0, err
		}
		l.Resolved = resolved == 1
		logs = append(logs, l)
	}
	return logs, total, rows.Err()
}

func (s *Store) ResolveAlertLog(id int64) error {
	now := time.Now().UTC()
	_, err := s.db.Exec("UPDATE alert_logs SET resolved = 1, resolved_at = ? WHERE id = ?", now, id)
	return err
}

// Check alerts after traffic ingestion
func (s *Store) CheckAlerts(userID string) {
	rules, err := s.ListAlertRules()
	if err != nil {
		slog.Error("check alerts: list rules", "error", err)
		return
	}

	for _, rule := range rules {
		if !rule.Enabled || rule.Type != "traffic_limit" {
			continue
		}
		if rule.UserID != nil && *rule.UserID != userID && *rule.UserID != "" {
			continue
		}
		if rule.ThresholdBytes == nil {
			continue
		}

		u, err := s.GetUser(userID)
		if err != nil {
			continue
		}
		cycleStart, cycleEnd := GetCycleDates(u.ResetDay)
		var totalBytes int64
		if err := s.db.QueryRow(
			"SELECT COALESCE(SUM(rx_bytes + tx_bytes), 0) FROM traffic_logs WHERE user_id = ? AND recorded_at >= ? AND recorded_at <= ?",
			userID, cycleStart, cycleEnd,
		).Scan(&totalBytes); err != nil {
			continue
		}

		if totalBytes >= *rule.ThresholdBytes {
			msg := fmt.Sprintf("User %s traffic %s exceeded threshold %s", userID, FormatBytes(totalBytes), FormatBytes(*rule.ThresholdBytes))
			_, err := s.db.Exec(
				"INSERT INTO alert_logs (rule_id, user_id, message) VALUES (?, ?, ?)",
				rule.ID, userID, msg,
			)
			if err != nil {
				slog.Error("insert alert log", "error", err)
			}
		}
	}
}

// Audit methods

func (s *Store) CreateAuditLog(adminUsername, action, targetType, targetID, detail string) error {
	_, err := s.db.Exec(
		"INSERT INTO audit_logs (admin_username, action, target_type, target_id, detail) VALUES (?, ?, ?, ?, ?)",
		adminUsername, action, targetType, targetID, detail,
	)
	return err
}

func (s *Store) ListAuditLogs(action, targetType string, page, size int) ([]model.AuditLog, int64, error) {
	where := "WHERE 1=1"
	args := []interface{}{}
	if action != "" {
		where += " AND action = ?"
		args = append(args, action)
	}
	if targetType != "" {
		where += " AND target_type = ?"
		args = append(args, targetType)
	}

	var total int64
	countArgs := make([]interface{}, len(args))
	copy(countArgs, args)
	if err := s.db.QueryRow("SELECT COUNT(*) FROM audit_logs "+where, countArgs...).Scan(&total); err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * size
	query := fmt.Sprintf("SELECT id, admin_username, action, target_type, target_id, detail, created_at FROM audit_logs %s ORDER BY created_at DESC LIMIT ? OFFSET ?", where)
	args = append(args, size, offset)

	rows, err := s.db.Query(query, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var logs []model.AuditLog
	for rows.Next() {
		var l model.AuditLog
		if err := rows.Scan(&l.ID, &l.AdminUsername, &l.Action, &l.TargetType, &l.TargetID, &l.Detail, &l.CreatedAt); err != nil {
			return nil, 0, err
		}
		logs = append(logs, l)
	}
	return logs, total, rows.Err()
}

// Export

func (s *Store) ExportTrafficCSV(start, end string) ([][]string, error) {
	rows, err := s.db.Query(
		`SELECT t.user_id, u.name, DATE(t.recorded_at), SUM(t.rx_bytes), SUM(t.tx_bytes), SUM(t.rx_bytes + t.tx_bytes)
		 FROM traffic_logs t
		 LEFT JOIN users u ON t.user_id = u.user_id
		 WHERE t.recorded_at >= ? AND t.recorded_at <= ?
		 GROUP BY t.user_id, DATE(t.recorded_at)
		 ORDER BY t.user_id, DATE(t.recorded_at)`,
		start, end,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	result := [][]string{{"user_id", "name", "date", "rx_bytes", "tx_bytes", "total_bytes"}}
	for rows.Next() {
		var userID, name, date string
		var rx, tx, total int64
		if err := rows.Scan(&userID, &name, &date, &rx, &tx, &total); err != nil {
			return nil, err
		}
		result = append(result, []string{
			userID, name, date,
			fmt.Sprintf("%d", rx),
			fmt.Sprintf("%d", tx),
			fmt.Sprintf("%d", total),
		})
	}
	return result, rows.Err()
}

// Helpers

func FormatBytes(b int64) string {
	if b == 0 {
		return "0 B"
	}
	units := []string{"B", "KB", "MB", "GB", "TB"}
	i := 0
	fb := float64(b)
	for fb >= 1024 && i < len(units)-1 {
		fb /= 1024
		i++
	}
	return fmt.Sprintf("%.2f %s", fb, units[i])
}

func joinStrings(strs []string, sep string) string {
	result := ""
	for i, s := range strs {
		if i > 0 {
			result += sep
		}
		result += s
	}
	return result
}
