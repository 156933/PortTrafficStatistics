# ⚡ Traffic Monitor

LXC / VPS 端口流量监控系统 —— 通过 iptables 精确统计每个用户端口范围的进出流量，支持按月计费周期、流量告警、多母机管理。

## 功能

- **流量统计** — 基于 iptables mangle 表，精确采集 TCP/UDP 双向流量（支持 IPv4 + IPv6）
- **多用户管理** — 每个用户分配独立端口范围，支持暂停/恢复/删除
- **多母机支持** — Agent 部署在母机上采集流量，通过 API 上报到 Server
- **账期计费** — 自定义每月重置日，按账期汇总流量
- **公开看板** — 无需登录即可查看所有用户的流量用量和趋势图
- **流量告警** — 支持流量超限告警，可配置 Webhook 通知
- **数据导出** — 支持 CSV 格式导出流量数据
- **操作审计** — 记录所有管理操作日志
- **零依赖部署** — 单二进制 + SQLite，无需 MySQL/Redis

## 架构

```
用户设备 ──▶ 母机（Xray/Snell 等代理）──▶ 互联网
                    │
              Agent 采集流量
              （iptables 计数）
                    │
                    ▼
              Server（API + Web）
              （SQLite 存储）
```

| 组件 | 说明 | 部署位置 |
|------|------|----------|
| **Server** | Web 管理面板 + API + 数据存储 | 任意一台 VPS |
| **Agent** | 流量采集，通过 iptables 统计端口流量 | 每台母机 |

## 快速安装

一行命令启动安装脚本：

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/156933/PortTrafficStatistics/main/install.sh)
```

### 安装脚本功能

```
  ⚡ Traffic Monitor
  LXC / VPS 端口流量监控系统
  ────────────────────────────────────────

  安装
  1  安装 Server        （管理面板 + 数据存储）
  2  安装 Agent         （母机流量采集）
  3  单机部署           （Server + Agent 一键装在本机）

  管理
  4  更新 Server
  5  更新 Agent
  6  全部更新
  7  查看状态
  8  查看日志
  9  编辑配置
  10 卸载

  0  退出
```

### 三种安装模式

#### 模式一：分机部署（推荐生产环境）

适合 Server 和 Agent 部署在不同机器上。

**VPS A — 安装 Server：**

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/156933/PortTrafficStatistics/main/install.sh)
# 选 1 → 输入端口、管理员账号密码 → 自动安装并启动
```

**VPS B（母机）— 安装 Agent：**

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/156933/PortTrafficStatistics/main/install.sh)
# 选 2 → 输入 Server 地址、母机 ID、API Token → 自动安装并启动
```

> API Token 在 Server 管理面板「母机管理」中创建母机后获取。

#### 模式二：单机部署（推荐新手）

Server 和 Agent 跑在同一台机器上，**脚本自动完成 Token 对接，无需手动操作**。

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/156933/PortTrafficStatistics/main/install.sh)
# 选 3 → 输入端口、管理员账号、母机名称 → 全自动完成
```

单机部署的自动流程：
1. 下载 Server + Agent 二进制
2. 创建配置并启动 Server
3. 自动调用 API 登录 → 创建母机 → 获取 Token
4. 用获取的 Token 配置 Agent 并启动
5. 显示访问地址和所有配置信息

#### 模式三：手动安装

<details>
<summary>展开手动安装步骤</summary>

##### 安装 Server

```bash
mkdir -p /opt/traffic-monitor && cd /opt/traffic-monitor
curl -L -o server https://github.com/156933/PortTrafficStatistics/releases/latest/download/server-linux-amd64
chmod +x server

cat > server.yaml << 'EOF'
listen: ":7878"
db_path: "/opt/traffic-monitor/traffic.db"
jwt_secret: "替换为随机字符串"
site_title: "流量监控"

init_admin:
  username: "admin"
  password: "你的密码"
EOF

cat > /etc/systemd/system/traffic-server.service << 'EOF'
[Unit]
Description=Traffic Monitor Server
After=network-online.target

[Service]
Type=simple
WorkingDirectory=/opt/traffic-monitor
ExecStart=/opt/traffic-monitor/server -config /opt/traffic-monitor/server.yaml
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now traffic-server
```

##### 安装 Agent

```bash
mkdir -p /opt/traffic-monitor && cd /opt/traffic-monitor
curl -L -o agent https://github.com/156933/PortTrafficStatistics/releases/latest/download/agent-linux-amd64
chmod +x agent

cat > agent.yaml << 'EOF'
server_url: "http://你的server地址:7878"
host_id: "node-01"
api_token: "从管理面板获取的Token"
interval_seconds: 60
mock_mode: false
EOF

cat > /etc/systemd/system/traffic-agent.service << 'EOF'
[Unit]
Description=Traffic Monitor Agent
After=network-online.target

[Service]
Type=simple
WorkingDirectory=/opt/traffic-monitor
ExecStart=/opt/traffic-monitor/agent -config /opt/traffic-monitor/agent.yaml
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now traffic-agent
```

</details>

## 使用流程

### 分机部署

```
1. VPS A 运行脚本 → 选 1 安装 Server
       ↓
2. 访问 http://IP:端口 → 登录管理后台
       ↓
3. 「母机管理」→ 添加母机 → 复制 API Token
       ↓
4. VPS B 运行脚本 → 选 2 安装 Agent → 粘贴 Token
       ↓
5. 「用户管理」→ 创建用户，分配端口范围
       ↓
6. Agent 自动同步端口映射，开始采集流量
```

### 单机部署

```
1. 运行脚本 → 选 3 单机部署
       ↓
2. 输入端口、管理员账号、母机名称
       ↓
3. 脚本自动完成 Server + Agent 安装和对接
       ↓
4. 访问 http://IP:端口 → 创建用户，分配端口范围
       ↓
5. Agent 自动同步端口映射，开始采集流量
```

## 管理命令

```bash
# 查看状态
systemctl status traffic-server
systemctl status traffic-agent

# 查看日志
journalctl -u traffic-server -f
journalctl -u traffic-agent -f

# 重启服务
systemctl restart traffic-server
systemctl restart traffic-agent

# 再次运行管理脚本（更新、编辑配置、卸载等）
bash <(curl -fsSL https://raw.githubusercontent.com/156933/PortTrafficStatistics/main/install.sh)
```

## 更新

### 通过管理脚本

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/156933/PortTrafficStatistics/main/install.sh)
# 选 4 更新 Server / 5 更新 Agent / 6 全部更新
```

脚本会自动检查版本、下载新二进制、重启服务，失败时自动回滚。

### CI/CD 自动更新

推送 tag 后 GitHub Actions 自动编译发布，配合 `deploy/update.sh` 和 systemd timer 实现全自动更新：

```bash
# 开发者发布新版本
git tag v1.2.0
git push --tags

# 服务器手动触发更新
BINARY=server SERVICE=traffic-server /opt/traffic-monitor/update.sh
BINARY=agent  SERVICE=traffic-agent  /opt/traffic-monitor/update.sh
```

## 技术栈

| 层 | 技术 |
|----|------|
| 后端 | Go + 标准库 net/http |
| 数据库 | SQLite（modernc.org/sqlite 纯 Go 驱动）|
| 前端 | Vue 3 + TypeScript + Naive UI + ECharts |
| 构建 | Vite，前端通过 go:embed 嵌入到二进制 |
| 流量采集 | iptables mangle 表 PREROUTING/POSTROUTING |
| 认证 | 管理员 JWT + Agent API Token |
| CI/CD | GitHub Actions 多架构编译（amd64 / arm64）|

## 项目结构

```
├── cmd/
│   ├── agent/main.go          # Agent 入口
│   └── server/main.go         # Server 入口（嵌入前端）
├── internal/
│   ├── agent/
│   │   ├── collector.go       # iptables 流量采集
│   │   ├── reporter.go        # 流量上报 + 离线缓存
│   │   └── config.go
│   ├── model/                 # 数据模型
│   └── server/
│       ├── server.go          # 路由 + 静态文件
│       ├── store.go           # SQLite 数据层
│       ├── middleware.go      # JWT / Agent 认证中间件
│       └── handler_*.go       # API 处理器
├── web/                       # Vue 3 前端源码
├── deploy/                    # 部署脚本和 systemd 配置
├── install.sh                 # 一键安装管理脚本
└── .github/workflows/         # CI/CD
```

## License

MIT
