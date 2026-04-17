# 部署指南

## 初次部署

### 1. 创建安装目录

```bash
mkdir -p /opt/traffic-monitor
```

### 2. 下载首个版本

```bash
cd /opt/traffic-monitor

# Server（跑 Web 管理后台的机器）
curl -L -o server https://github.com/156933/PortTrafficStatistics/releases/latest/download/server-linux-amd64
chmod +x server

# Agent（跑在母机上采集流量）
curl -L -o agent https://github.com/156933/PortTrafficStatistics/releases/latest/download/agent-linux-amd64
chmod +x agent
```

> ARM64 机器把 `amd64` 换成 `arm64`。

### 3. 准备配置文件

```bash
# Server
cp server.yaml /opt/traffic-monitor/server.yaml
# 编辑 listen、db_path、jwt_secret、init_admin 等

# Agent
cp agent.yaml /opt/traffic-monitor/agent.yaml
# 编辑 server_url、host_id、api_token 等
```

### 4. 创建 systemd 服务（主服务）

**Server**（`/etc/systemd/system/traffic-server.service`）：

```ini
[Unit]
Description=Traffic Monitor Server
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/opt/traffic-monitor/server -config /opt/traffic-monitor/server.yaml
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

**Agent**（`/etc/systemd/system/traffic-agent.service`）：

```ini
[Unit]
Description=Traffic Monitor Agent
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/opt/traffic-monitor/agent -config /opt/traffic-monitor/agent.yaml
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

启动：

```bash
systemctl daemon-reload
systemctl enable --now traffic-server   # 或 traffic-agent
```

### 5. 启用自动更新

```bash
# 复制更新脚本
cp deploy/update.sh /opt/traffic-monitor/update.sh
chmod +x /opt/traffic-monitor/update.sh

# 复制 timer 文件
cp deploy/traffic-update-server.service /etc/systemd/system/
cp deploy/traffic-update-server.timer /etc/systemd/system/
# 或 agent 版本：
cp deploy/traffic-update-agent.service /etc/systemd/system/
cp deploy/traffic-update-agent.timer /etc/systemd/system/

# 启用
systemctl daemon-reload
systemctl enable --now traffic-update-server.timer  # 或 traffic-update-agent.timer
```

## 日常使用

### 发布新版本（开发者）

```bash
git tag v1.0.1
git push --tags
```

GitHub Actions 自动编译，产物发布到 Releases 页面。5 分钟内服务器自动拉取更新。

### 手动触发更新

```bash
systemctl start traffic-update-server.service   # 立即检查
systemctl start traffic-update-agent.service
```

### 查看更新日志

```bash
journalctl -u traffic-update-server -n 50       # 最近 50 条
journalctl -u traffic-update-server -f           # 实时跟踪
```

### 查看当前版本

```bash
cat /opt/traffic-monitor/.version-server
cat /opt/traffic-monitor/.version-agent
```

### 暂停/恢复自动更新

```bash
# 暂停
systemctl stop traffic-update-server.timer
systemctl disable traffic-update-server.timer

# 恢复
systemctl enable --now traffic-update-server.timer
```

## 私有仓库

如果 GitHub 仓库是私有的：

1. 创建 Personal Access Token（权限：`repo`）
2. 在 service 文件的 `[Service]` 段增加：

```ini
Environment=GH_TOKEN=ghp_xxxxxxxxxxxx
```

或保存到文件避免明文写在 unit 里：

```bash
echo 'GH_TOKEN=ghp_xxxxxxxxxxxx' > /opt/traffic-monitor/.env
chmod 600 /opt/traffic-monitor/.env
```

然后 service 文件改为：

```ini
EnvironmentFile=/opt/traffic-monitor/.env
```
