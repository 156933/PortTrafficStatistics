package server

import (
	"os"

	"gopkg.in/yaml.v3"
)

type Config struct {
	Listen   string      `yaml:"listen"`
	DBPath   string      `yaml:"db_path"`
	JWTSecret string     `yaml:"jwt_secret"`
	SiteTitle string     `yaml:"site_title"`
	InitAdmin InitAdmin  `yaml:"init_admin"`
}

type InitAdmin struct {
	Username string `yaml:"username"`
	Password string `yaml:"password"`
}

func LoadConfig(path string) (*Config, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	cfg := &Config{
		Listen:    ":8080",
		DBPath:    "./traffic.db",
		SiteTitle: "流量监控",
	}
	if err := yaml.Unmarshal(data, cfg); err != nil {
		return nil, err
	}
	return cfg, nil
}
