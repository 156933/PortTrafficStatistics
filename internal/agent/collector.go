package agent

import (
	"bufio"
	"fmt"
	"log/slog"
	"math/rand"
	"os/exec"
	"strconv"
	"strings"
	"sync"
	"time"
)

type TrafficSample struct {
	UserID  string `json:"user_id"`
	RxBytes int64  `json:"rx_bytes"`
	TxBytes int64  `json:"tx_bytes"`
}

type PortMapping struct {
	UserID    string `json:"user_id"`
	PortStart int    `json:"port_start"`
	PortEnd   int    `json:"port_end"`
}

type Collector interface {
	Collect() ([]TrafficSample, error)
}

// IptablesCollector uses iptables custom chains to count traffic per user port range.
type IptablesCollector struct {
	mu       sync.Mutex
	mappings []PortMapping
	lastRx   map[string]int64
	lastTx   map[string]int64
	seenRx   map[string]bool
	seenTx   map[string]bool
}

func NewIptablesCollector() *IptablesCollector {
	return &IptablesCollector{
		lastRx: make(map[string]int64),
		lastTx: make(map[string]int64),
		seenRx: make(map[string]bool),
		seenTx: make(map[string]bool),
	}
}

// SetupRules creates iptables chains and rules for all port mappings.
// Uses the mangle table with PREROUTING/POSTROUTING to capture ALL traffic
// (local + forwarded) regardless of filter table rules.
// Idempotent: uses -C to check before -I.
func (c *IptablesCollector) SetupRules(mappings []PortMapping) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.mappings = mappings

	for _, m := range mappings {
		portRange := fmt.Sprintf("%d:%d", m.PortStart, m.PortEnd)
		chainIn := fmt.Sprintf("TRAFFIC_%s_IN", m.UserID)
		chainOut := fmt.Sprintf("TRAFFIC_%s_OUT", m.UserID)

		for _, cmd := range []string{"iptables", "ip6tables"} {
			// Create chains in the mangle table (ignore error if exists)
			exec.Command(cmd, "-t", "mangle", "-N", chainIn).Run()
			exec.Command(cmd, "-t", "mangle", "-N", chainOut).Run()

			// Add a RETURN rule inside each chain so packets are counted then returned.
			if !mangleReturnRuleExists(cmd, chainIn) {
				runMangle(cmd, "-A", chainIn, "-j", "RETURN")
			}
			if !mangleReturnRuleExists(cmd, chainOut) {
				runMangle(cmd, "-A", chainOut, "-j", "RETURN")
			}

			// PREROUTING: counts all incoming packets (local + forwarded) by dport
			for _, proto := range []string{"tcp", "udp"} {
				if !mangleChainRuleExists(cmd, "PREROUTING", proto, "--dport", portRange, chainIn) {
					runMangle(cmd, "-I", "PREROUTING", "-p", proto, "--dport", portRange, "-j", chainIn)
				}
			}

			// POSTROUTING: counts all outgoing packets (local + forwarded) by sport
			for _, proto := range []string{"tcp", "udp"} {
				if !mangleChainRuleExists(cmd, "POSTROUTING", proto, "--sport", portRange, chainOut) {
					runMangle(cmd, "-I", "POSTROUTING", "-p", proto, "--sport", portRange, "-j", chainOut)
				}
			}
		}

		slog.Info("iptables mangle rules set up", "user_id", m.UserID, "ports", portRange)
	}
}

// SyncMappings compares old and new mappings, adding/removing rules as needed.
func (c *IptablesCollector) SyncMappings(newMappings []PortMapping) {
	c.mu.Lock()
	old := c.mappings
	c.mu.Unlock()

	oldMap := make(map[string]PortMapping)
	for _, m := range old {
		oldMap[m.UserID] = m
	}
	newMap := make(map[string]PortMapping)
	for _, m := range newMappings {
		newMap[m.UserID] = m
	}

	// Remove users no longer present (or whose port range changed — they will be re-added below)
	for uid, m := range oldMap {
		nm, stillPresent := newMap[uid]
		if !stillPresent || nm.PortStart != m.PortStart || nm.PortEnd != m.PortEnd {
			c.removeUserRules(m)
			c.mu.Lock()
			delete(c.lastRx, uid)
			delete(c.lastTx, uid)
			delete(c.seenRx, uid)
			delete(c.seenTx, uid)
			c.mu.Unlock()
		}
	}

	// Add new users + re-add users whose port range changed
	var toAdd []PortMapping
	for uid, m := range newMap {
		om, existed := oldMap[uid]
		if !existed || om.PortStart != m.PortStart || om.PortEnd != m.PortEnd {
			toAdd = append(toAdd, m)
		}
	}
	if len(toAdd) > 0 {
		c.SetupRules(toAdd)
	}

	c.mu.Lock()
	c.mappings = newMappings
	c.mu.Unlock()
}

func (c *IptablesCollector) removeUserRules(m PortMapping) {
	portRange := fmt.Sprintf("%d:%d", m.PortStart, m.PortEnd)
	chainIn := fmt.Sprintf("TRAFFIC_%s_IN", m.UserID)
	chainOut := fmt.Sprintf("TRAFFIC_%s_OUT", m.UserID)

	for _, cmd := range []string{"iptables", "ip6tables"} {
		// Remove references from mangle PREROUTING/POSTROUTING
		for _, proto := range []string{"tcp", "udp"} {
			exec.Command(cmd, "-t", "mangle", "-w", "-D", "PREROUTING", "-p", proto, "--dport", portRange, "-j", chainIn).Run()
			exec.Command(cmd, "-t", "mangle", "-w", "-D", "POSTROUTING", "-p", proto, "--sport", portRange, "-j", chainOut).Run()
		}
		// Flush and delete chains from mangle table
		exec.Command(cmd, "-t", "mangle", "-w", "-F", chainIn).Run()
		exec.Command(cmd, "-t", "mangle", "-w", "-X", chainIn).Run()
		exec.Command(cmd, "-t", "mangle", "-w", "-F", chainOut).Run()
		exec.Command(cmd, "-t", "mangle", "-w", "-X", chainOut).Run()

		// Also clean up legacy filter table rules if they exist
		for _, proto := range []string{"tcp", "udp"} {
			exec.Command(cmd, "-w", "-D", "INPUT", "-p", proto, "--dport", portRange, "-j", chainIn).Run()
			exec.Command(cmd, "-w", "-D", "OUTPUT", "-p", proto, "--sport", portRange, "-j", chainOut).Run()
		}
		exec.Command(cmd, "-w", "-F", chainIn).Run()
		exec.Command(cmd, "-w", "-X", chainIn).Run()
		exec.Command(cmd, "-w", "-F", chainOut).Run()
		exec.Command(cmd, "-w", "-X", chainOut).Run()
	}

	slog.Info("iptables mangle rules removed", "user_id", m.UserID)
}

// Collect reads iptables counters and computes deltas.
func (c *IptablesCollector) Collect() ([]TrafficSample, error) {
	c.mu.Lock()
	mappings := make([]PortMapping, len(c.mappings))
	copy(mappings, c.mappings)
	c.mu.Unlock()

	var samples []TrafficSample
	for _, m := range mappings {
		chainIn := fmt.Sprintf("TRAFFIC_%s_IN", m.UserID)
		chainOut := fmt.Sprintf("TRAFFIC_%s_OUT", m.UserID)

		// Sum bytes from iptables and ip6tables
		rxV4 := readChainBytes("iptables", chainIn)
		rxV6 := readChainBytes("ip6tables", chainIn)
		txV4 := readChainBytes("iptables", chainOut)
		txV6 := readChainBytes("ip6tables", chainOut)

		currentRx := rxV4 + rxV6
		currentTx := txV4 + txV6

		c.mu.Lock()
		lastRx := c.lastRx[m.UserID]
		lastTx := c.lastTx[m.UserID]
		seenRx := c.seenRx[m.UserID]
		seenTx := c.seenTx[m.UserID]

		var deltaRx, deltaTx int64
		switch {
		case !seenRx:
			// First observation: seed the baseline so we don't report all
			// historical chain bytes as one giant spike on agent startup.
			deltaRx = 0
		case currentRx >= lastRx:
			deltaRx = currentRx - lastRx
		default:
			deltaRx = currentRx // counter reset
		}
		switch {
		case !seenTx:
			deltaTx = 0
		case currentTx >= lastTx:
			deltaTx = currentTx - lastTx
		default:
			deltaTx = currentTx
		}

		c.lastRx[m.UserID] = currentRx
		c.lastTx[m.UserID] = currentTx
		c.seenRx[m.UserID] = true
		c.seenTx[m.UserID] = true
		c.mu.Unlock()

		samples = append(samples, TrafficSample{
			UserID:  m.UserID,
			RxBytes: deltaRx,
			TxBytes: deltaTx,
		})
	}

	return samples, nil
}

// readChainBytes parses `iptables -t mangle -L <chain> -n -v -x -w` and sums the bytes column.
func readChainBytes(cmd, chain string) int64 {
	out, err := exec.Command(cmd, "-t", "mangle", "-L", chain, "-n", "-v", "-x", "-w").Output()
	if err != nil {
		return 0
	}

	var total int64
	scanner := bufio.NewScanner(strings.NewReader(string(out)))
	lineNum := 0
	for scanner.Scan() {
		lineNum++
		if lineNum <= 2 {
			continue // skip header lines
		}
		fields := strings.Fields(scanner.Text())
		if len(fields) < 2 {
			continue
		}
		bytes, err := strconv.ParseInt(fields[1], 10, 64)
		if err != nil {
			continue
		}
		total += bytes
	}
	return total
}

func mangleReturnRuleExists(cmd, chain string) bool {
	err := exec.Command(cmd, "-t", "mangle", "-w", "-C", chain, "-j", "RETURN").Run()
	return err == nil
}

func mangleChainRuleExists(cmd, chain, proto, portFlag, portRange, target string) bool {
	err := exec.Command(cmd, "-t", "mangle", "-w", "-C", chain, "-p", proto, portFlag, portRange, "-j", target).Run()
	return err == nil
}

func runMangle(cmd string, args ...string) {
	allArgs := append([]string{"-t", "mangle", "-w"}, args...)
	if err := exec.Command(cmd, allArgs...).Run(); err != nil {
		slog.Warn("iptables mangle command failed", "cmd", cmd, "args", args, "error", err)
	}
}

// MockCollector generates random traffic data for local development.
type MockCollector struct {
	users []MockUser
	rng   *rand.Rand
}

type MockUser struct {
	UserID    string `yaml:"user_id"`
	PortStart int    `yaml:"port_start"`
	PortEnd   int    `yaml:"port_end"`
}

func NewMockCollector(users []MockUser) *MockCollector {
	return &MockCollector{
		users: users,
		rng:   rand.New(rand.NewSource(time.Now().UnixNano())),
	}
}

func (m *MockCollector) Collect() ([]TrafficSample, error) {
	samples := make([]TrafficSample, 0, len(m.users))
	for _, u := range m.users {
		rx := int64(m.rng.Intn(10*1024*1024-100*1024) + 100*1024)
		tx := int64(m.rng.Intn(10*1024*1024-100*1024) + 100*1024)
		samples = append(samples, TrafficSample{
			UserID:  u.UserID,
			RxBytes: rx,
			TxBytes: tx,
		})
	}
	return samples, nil
}
