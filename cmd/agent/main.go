package main

import (
	"flag"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	"time"

	"lxc-traffic-monitor/internal/agent"
)

func main() {
	configPath := flag.String("config", "config/agent.example.yaml", "path to config file")
	flag.Parse()

	slog.SetDefault(slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo})))

	cfg, err := agent.LoadAgentConfig(*configPath)
	if err != nil {
		slog.Error("load config", "error", err)
		os.Exit(1)
	}

	reporter := agent.NewReporter(cfg.ServerURL, cfg.HostID, cfg.APIToken)

	var collector agent.Collector
	var iptCollector *agent.IptablesCollector

	if cfg.MockMode {
		slog.Info("running in mock mode", "users", len(cfg.MockUsers))
		collector = agent.NewMockCollector(cfg.MockUsers)
	} else {
		iptCollector = agent.NewIptablesCollector()
		collector = iptCollector

		// Fetch initial port mappings and set up iptables rules
		mappings, err := reporter.FetchPortMappings()
		if err != nil {
			slog.Warn("fetch initial port mappings failed, will retry", "error", err)
		} else {
			slog.Info("loaded port mappings", "count", len(mappings))
			iptCollector.SetupRules(toAgentMappings(mappings))
		}
	}

	interval := time.Duration(cfg.IntervalSeconds) * time.Second
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	// Sync mappings every 5 minutes in real mode
	var syncTicker *time.Ticker
	if !cfg.MockMode {
		syncTicker = time.NewTicker(5 * time.Minute)
		defer syncTicker.Stop()
	}

	slog.Info("agent starting", "host_id", cfg.HostID, "interval", interval, "server", cfg.ServerURL)

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	collectAndReport := func() {
		samples, err := collector.Collect()
		if err != nil {
			slog.Error("collect failed", "error", err)
			return
		}
		slog.Info("collected traffic", "samples", len(samples))

		if err := reporter.Report(samples); err != nil {
			slog.Warn("report failed", "error", err)
			return
		}
		slog.Info("reported traffic successfully")
	}

	syncMappings := func() {
		if iptCollector == nil {
			return
		}
		mappings, err := reporter.FetchPortMappings()
		if err != nil {
			slog.Warn("sync port mappings failed", "error", err)
			return
		}
		iptCollector.SyncMappings(toAgentMappings(mappings))
		slog.Info("synced port mappings", "count", len(mappings))
	}

	// Initial collect
	collectAndReport()

	for {
		select {
		case <-ticker.C:
			collectAndReport()
		case <-func() <-chan time.Time {
			if syncTicker != nil {
				return syncTicker.C
			}
			return make(chan time.Time) // never fires
		}():
			syncMappings()
		case <-quit:
			slog.Info("agent stopping")
			return
		}
	}
}

func toAgentMappings(mappings []agent.PortMapping) []agent.PortMapping {
	return mappings
}
