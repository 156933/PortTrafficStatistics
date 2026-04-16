package agent

import (
	"os"

	"gopkg.in/yaml.v3"
)

type Config struct {
	ServerURL       string     `yaml:"server_url"`
	HostID          string     `yaml:"host_id"`
	APIToken        string     `yaml:"api_token"`
	IntervalSeconds int        `yaml:"interval_seconds"`
	MockMode        bool       `yaml:"mock_mode"`
	MockUsers       []MockUser `yaml:"mock_users"`
}

func LoadAgentConfig(path string) (*Config, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	cfg := &Config{
		IntervalSeconds: 60,
	}
	if err := yaml.Unmarshal(data, cfg); err != nil {
		return nil, err
	}
	return cfg, nil
}
