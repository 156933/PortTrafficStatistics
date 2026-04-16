package main

import (
	"context"
	"embed"
	"flag"
	"io/fs"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"lxc-traffic-monitor/internal/server"
)

//go:embed web/dist
var embeddedFS embed.FS

func main() {
	configPath := flag.String("config", "config/server.example.yaml", "path to config file")
	flag.Parse()

	slog.SetDefault(slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo})))

	cfg, err := server.LoadConfig(*configPath)
	if err != nil {
		slog.Error("load config", "error", err)
		os.Exit(1)
	}

	store, err := server.NewStore(cfg.DBPath)
	if err != nil {
		slog.Error("init database", "error", err)
		os.Exit(1)
	}
	defer store.Close()

	if cfg.InitAdmin.Username != "" && cfg.InitAdmin.Password != "" {
		if err := store.SeedAdmin(cfg.InitAdmin.Username, cfg.InitAdmin.Password); err != nil {
			slog.Error("seed admin", "error", err)
			os.Exit(1)
		}
	}

	var staticFS fs.FS
	sub, err := fs.Sub(embeddedFS, "web/dist")
	if err != nil {
		slog.Warn("no embedded web assets, running API-only mode", "error", err)
	} else {
		staticFS = sub
	}

	srv := server.NewServer(cfg, store, staticFS)

	httpServer := &http.Server{
		Addr:    cfg.Listen,
		Handler: srv.Handler(),
	}

	go func() {
		slog.Info("server starting", "addr", cfg.Listen, "title", cfg.SiteTitle)
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			slog.Error("server error", "error", err)
			os.Exit(1)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	slog.Info("shutting down server...")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := httpServer.Shutdown(ctx); err != nil {
		slog.Error("server shutdown", "error", err)
	}
	slog.Info("server stopped")
}
