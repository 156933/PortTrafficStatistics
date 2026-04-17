#!/bin/bash
#
# Traffic Monitor 一键安装管理脚本
# https://github.com/156933/PortTrafficStatistics
#

set -e

# ==================== 配置 ====================
REPO="156933/PortTrafficStatistics"
INSTALL_DIR="/opt/traffic-monitor"
# ================================================

# 颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
DIM='\033[2m'
BOLD='\033[1m'
NC='\033[0m'

line() { printf "${DIM}─%.0s${NC}" $(seq 1 56); echo; }
banner() {
    clear
    echo
    echo -e "  ${PURPLE}${BOLD}⚡ Traffic Monitor${NC}"
    echo -e "  ${DIM}LXC / VPS 端口流量监控系统${NC}"
    line
}

info()    { echo -e "  ${BLUE}ℹ${NC}  $1"; }
success() { echo -e "  ${GREEN}✔${NC}  $1"; }
warn()    { echo -e "  ${YELLOW}⚠${NC}  $1"; }
error()   { echo -e "  ${RED}✘${NC}  $1"; }

ask() {
    local label="$1" default="$2" var="$3"
    if [ -n "$default" ]; then
        echo -ne "  ${WHITE}${label}${NC} ${DIM}[${default}]${NC}: "
    else
        echo -ne "  ${WHITE}${label}${NC}: "
    fi
    read -r input
    eval "$var=\"${input:-$default}\""
}

ask_important() {
    local label="$1" var="$2"
    echo
    echo -e "  ${YELLOW}┌─────────────────────────────────────────┐${NC}"
    echo -e "  ${YELLOW}│${NC}  ${BOLD}${label}${NC}"
    echo -e "  ${YELLOW}└─────────────────────────────────────────┘${NC}"
    echo -ne "  ${YELLOW}▸${NC} "
    read -r input
    eval "$var=\"$input\""
    echo
}

ask_password() {
    local label="$1" var="$2"
    echo
    echo -e "  ${YELLOW}┌─────────────────────────────────────────┐${NC}"
    echo -e "  ${YELLOW}│${NC}  ${BOLD}${label}${NC}"
    echo -e "  ${YELLOW}└─────────────────────────────────────────┘${NC}"
    echo -ne "  ${YELLOW}▸${NC} "
    read -rs input
    echo
    eval "$var=\"$input\""
    echo
}

# ==================== 工具函数 ====================

check_root() {
    if [ "$EUID" -ne 0 ]; then
        error "请使用 root 用户运行此脚本 (sudo bash install.sh)"
        exit 1
    fi
}

detect_arch() {
    case "$(uname -m)" in
        x86_64)  echo "amd64" ;;
        aarch64) echo "arm64" ;;
        *)       error "不支持的架构: $(uname -m)"; exit 1 ;;
    esac
}

get_latest_version() {
    curl -fsSL "https://api.github.com/repos/$REPO/releases/latest" 2>/dev/null | \
        grep '"tag_name"' | head -1 | cut -d '"' -f 4
}

get_local_version() {
    local binary="$1"
    local vfile="$INSTALL_DIR/.version-$binary"
    [ -f "$vfile" ] && cat "$vfile" || echo "未安装"
}

download_binary() {
    local binary="$1" version="$2" arch="$3"
    local url="https://github.com/$REPO/releases/download/$version/${binary}-linux-${arch}"
    local tmp="$INSTALL_DIR/${binary}.tmp"

    info "正在下载 ${binary} ${version} (${arch})..."
    if curl -fsSL -L -o "$tmp" "$url"; then
        chmod +x "$tmp"
        mv "$tmp" "$INSTALL_DIR/$binary"
        echo "$version" > "$INSTALL_DIR/.version-$binary"
        success "下载完成"
        return 0
    else
        rm -f "$tmp"
        error "下载失败"
        return 1
    fi
}

gen_jwt_secret() {
    head -c 32 /dev/urandom | base64 | tr -d '=/+' | head -c 32
}

create_service() {
    local name="$1" binary="$2" config="$3"
    cat > "/etc/systemd/system/traffic-${name}.service" << EOF
[Unit]
Description=Traffic Monitor ${name}
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=$INSTALL_DIR
ExecStart=$INSTALL_DIR/$binary -config $INSTALL_DIR/${config}
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
    systemctl daemon-reload
}

# ==================== 安装 Server ====================

install_server() {
    banner
    echo -e "  ${CYAN}${BOLD}安装 Server（管理面板）${NC}"
    echo -e "  ${DIM}提供 Web 管理后台、API 接口、数据存储${NC}"
    line

    if [ -f "$INSTALL_DIR/server" ] && systemctl is-active --quiet traffic-server 2>/dev/null; then
        warn "Server 已安装且正在运行"
        echo -ne "  是否重新安装？${DIM}[y/N]${NC}: "
        read -r ans
        [[ ! "$ans" =~ ^[yY]$ ]] && return
        systemctl stop traffic-server 2>/dev/null || true
        echo
    fi

    local arch version
    arch=$(detect_arch)
    version=$(get_latest_version)

    if [ -z "$version" ]; then
        error "无法获取最新版本，请检查网络连接"
        return 1
    fi

    info "最新版本: ${GREEN}${version}${NC}"
    echo

    echo -e "  ${BOLD}基本配置${NC}"
    line

    ask "监听端口" "7878" port
    ask "站点标题" "流量监控" site_title

    echo
    echo -e "  ${BOLD}管理员账号${NC}"
    echo -e "  ${DIM}首次启动时创建，之后可在面板中修改${NC}"
    line

    ask "管理员用户名" "admin" admin_user

    ask_password "设置管理员密码（输入不可见）"
    admin_pass="$input"

    if [ -z "$admin_pass" ]; then
        error "密码不能为空"
        return 1
    fi

    ask_password "再次确认密码"
    admin_pass2="$input"

    if [ "$admin_pass" != "$admin_pass2" ]; then
        error "两次密码不一致"
        return 1
    fi

    local jwt_secret
    jwt_secret=$(gen_jwt_secret)

    mkdir -p "$INSTALL_DIR"

    echo
    download_binary "server" "$version" "$arch" || return 1

    cat > "$INSTALL_DIR/server.yaml" << EOF
listen: ":${port}"
db_path: "${INSTALL_DIR}/traffic.db"
jwt_secret: "${jwt_secret}"
site_title: "${site_title}"

init_admin:
  username: "${admin_user}"
  password: "${admin_pass}"
EOF
    chmod 600 "$INSTALL_DIR/server.yaml"

    create_service "server" "server" "server.yaml"
    systemctl enable --now traffic-server

    sleep 2
    if systemctl is-active --quiet traffic-server; then
        echo
        line
        success "${BOLD}Server 安装成功！${NC}"
        echo
        local ip
        ip=$(curl -fsSL4 ip.sb 2>/dev/null || hostname -I | awk '{print $1}')
        echo -e "  ${WHITE}访问地址:${NC}  http://${ip}:${port}"
        echo -e "  ${WHITE}用户名:${NC}    ${admin_user}"
        echo -e "  ${WHITE}密码:${NC}      ${DIM}（你刚才设置的）${NC}"
        echo
        echo -e "  ${DIM}配置文件: ${INSTALL_DIR}/server.yaml${NC}"
        echo -e "  ${DIM}查看状态: systemctl status traffic-server${NC}"
        echo -e "  ${DIM}查看日志: journalctl -u traffic-server -f${NC}"
        line
        echo
        echo -e "  ${CYAN}下一步:${NC} 登录管理面板 → 添加母机 → 复制 API Token → 在母机上安装 Agent"
    else
        error "Server 启动失败"
        echo -e "  ${DIM}排查: journalctl -u traffic-server -n 30${NC}"
    fi
}

# ==================== 安装 Agent ====================

install_agent() {
    banner
    echo -e "  ${CYAN}${BOLD}安装 Agent（流量采集）${NC}"
    echo -e "  ${DIM}部署在母机上，采集端口流量并上报到 Server${NC}"
    line

    if [ -f "$INSTALL_DIR/agent" ] && systemctl is-active --quiet traffic-agent 2>/dev/null; then
        warn "Agent 已安装且正在运行"
        echo -ne "  是否重新安装？${DIM}[y/N]${NC}: "
        read -r ans
        [[ ! "$ans" =~ ^[yY]$ ]] && return
        systemctl stop traffic-agent 2>/dev/null || true
        echo
    fi

    local arch version
    arch=$(detect_arch)
    version=$(get_latest_version)

    if [ -z "$version" ]; then
        error "无法获取最新版本，请检查网络连接"
        return 1
    fi

    info "最新版本: ${GREEN}${version}${NC}"
    echo

    echo -e "  ${BOLD}连接配置${NC}"
    echo -e "  ${DIM}填写 Server 的地址和从管理面板获取的 Token${NC}"
    line

    ask "Server 地址" "http://your-server:7878" server_url
    ask "母机 ID（自定义名称）" "node-01" host_id
    ask "采集间隔（秒）" "60" interval

    ask_important "粘贴 API Token（在管理面板「母机管理」中创建获取）"
    api_token="$input"

    if [ -z "$api_token" ]; then
        error "API Token 不能为空"
        return 1
    fi

    mkdir -p "$INSTALL_DIR"

    download_binary "agent" "$version" "$arch" || return 1

    cat > "$INSTALL_DIR/agent.yaml" << EOF
server_url: "${server_url}"
host_id: "${host_id}"
api_token: "${api_token}"
interval_seconds: ${interval}
mock_mode: false
EOF
    chmod 600 "$INSTALL_DIR/agent.yaml"

    create_service "agent" "agent" "agent.yaml"
    systemctl enable --now traffic-agent

    sleep 2
    if systemctl is-active --quiet traffic-agent; then
        echo
        line
        success "${BOLD}Agent 安装成功！${NC}"
        echo
        echo -e "  ${WHITE}母机 ID:${NC}     ${host_id}"
        echo -e "  ${WHITE}上报地址:${NC}    ${server_url}"
        echo -e "  ${WHITE}采集间隔:${NC}    ${interval} 秒"
        echo
        echo -e "  ${DIM}配置文件: ${INSTALL_DIR}/agent.yaml${NC}"
        echo -e "  ${DIM}查看状态: systemctl status traffic-agent${NC}"
        echo -e "  ${DIM}查看日志: journalctl -u traffic-agent -f${NC}"
        line
    else
        error "Agent 启动失败"
        echo -e "  ${DIM}排查: journalctl -u traffic-agent -n 30${NC}"
    fi
}

# ==================== 单机部署 ====================

install_all_in_one() {
    banner
    echo -e "  ${CYAN}${BOLD}单机部署（Server + Agent）${NC}"
    echo -e "  ${DIM}在同一台机器上同时运行管理面板和流量采集${NC}"
    echo -e "  ${DIM}无需手动复制 Token，脚本自动完成对接${NC}"
    line

    # 检查已有安装
    if systemctl is-active --quiet traffic-server 2>/dev/null || systemctl is-active --quiet traffic-agent 2>/dev/null; then
        warn "检测到已有服务正在运行"
        echo -ne "  是否停止并重新安装？${DIM}[y/N]${NC}: "
        read -r ans
        [[ ! "$ans" =~ ^[yY]$ ]] && return
        systemctl stop traffic-server 2>/dev/null || true
        systemctl stop traffic-agent 2>/dev/null || true
        echo
    fi

    local arch version
    arch=$(detect_arch)
    version=$(get_latest_version)

    if [ -z "$version" ]; then
        error "无法获取最新版本，请检查网络连接"
        return 1
    fi

    info "最新版本: ${GREEN}${version}${NC}"
    echo

    # ===== Server 配置 =====
    echo -e "  ${BOLD}Server 配置${NC}"
    line

    ask "监听端口" "7878" port
    ask "站点标题" "流量监控" site_title

    echo
    echo -e "  ${BOLD}管理员账号${NC}"
    line

    ask "管理员用户名" "admin" admin_user

    ask_password "设置管理员密码（输入不可见）"
    admin_pass="$input"

    if [ -z "$admin_pass" ]; then
        error "密码不能为空"
        return 1
    fi

    ask_password "再次确认密码"
    admin_pass2="$input"

    if [ "$admin_pass" != "$admin_pass2" ]; then
        error "两次密码不一致"
        return 1
    fi

    # ===== Agent 配置 =====
    echo
    echo -e "  ${BOLD}Agent 配置${NC}"
    line

    ask "母机 ID（自定义名称）" "node-01" host_id
    ask "母机显示名称" "本机节点" host_name
    ask "采集间隔（秒）" "60" interval

    # ===== 开始安装 =====
    echo
    line
    info "开始安装..."
    echo

    local jwt_secret
    jwt_secret=$(gen_jwt_secret)
    mkdir -p "$INSTALL_DIR"

    # 1. 下载两个二进制
    download_binary "server" "$version" "$arch" || return 1
    download_binary "agent" "$version" "$arch" || return 1

    # 2. 写 Server 配置并启动
    cat > "$INSTALL_DIR/server.yaml" << EOF
listen: ":${port}"
db_path: "${INSTALL_DIR}/traffic.db"
jwt_secret: "${jwt_secret}"
site_title: "${site_title}"

init_admin:
  username: "${admin_user}"
  password: "${admin_pass}"
EOF
    chmod 600 "$INSTALL_DIR/server.yaml"

    create_service "server" "server" "server.yaml"
    systemctl enable --now traffic-server

    info "等待 Server 启动..."
    sleep 3

    if ! systemctl is-active --quiet traffic-server; then
        error "Server 启动失败，终止安装"
        echo -e "  ${DIM}排查: journalctl -u traffic-server -n 30${NC}"
        return 1
    fi
    success "Server 已启动"

    # 3. 调 API 登录拿 JWT
    info "正在自动创建母机..."

    local login_resp jwt_token
    login_resp=$(curl -fsSL -X POST "http://127.0.0.1:${port}/api/v1/auth/login" \
        -H "Content-Type: application/json" \
        -d "{\"username\":\"${admin_user}\",\"password\":\"${admin_pass}\"}" 2>/dev/null) || {
        error "登录 API 失败"
        return 1
    }

    jwt_token=$(echo "$login_resp" | grep -o '"token":"[^"]*"' | cut -d '"' -f 4)
    if [ -z "$jwt_token" ]; then
        error "获取 JWT Token 失败"
        return 1
    fi

    # 4. 调 API 创建母机拿 API Token
    local host_resp api_token
    host_resp=$(curl -fsSL -X POST "http://127.0.0.1:${port}/api/v1/admin/hosts" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer ${jwt_token}" \
        -d "{\"host_id\":\"${host_id}\",\"name\":\"${host_name}\"}" 2>/dev/null) || {
        error "创建母机失败"
        return 1
    }

    api_token=$(echo "$host_resp" | grep -o '"api_token":"[^"]*"' | cut -d '"' -f 4)
    if [ -z "$api_token" ]; then
        error "获取 API Token 失败"
        echo -e "  ${DIM}响应: ${host_resp}${NC}"
        return 1
    fi
    success "母机已创建，Token 已自动获取"

    # 5. 写 Agent 配置并启动
    cat > "$INSTALL_DIR/agent.yaml" << EOF
server_url: "http://127.0.0.1:${port}"
host_id: "${host_id}"
api_token: "${api_token}"
interval_seconds: ${interval}
mock_mode: false
EOF
    chmod 600 "$INSTALL_DIR/agent.yaml"

    create_service "agent" "agent" "agent.yaml"
    systemctl enable --now traffic-agent

    sleep 2

    if ! systemctl is-active --quiet traffic-agent; then
        error "Agent 启动失败"
        echo -e "  ${DIM}排查: journalctl -u traffic-agent -n 30${NC}"
        return 1
    fi
    success "Agent 已启动"

    # ===== 完成 =====
    echo
    line
    echo
    echo -e "  ${GREEN}${BOLD}  ✔  单机部署完成！${NC}"
    echo
    line

    local ip
    ip=$(curl -fsSL4 ip.sb 2>/dev/null || hostname -I | awk '{print $1}')

    echo
    echo -e "  ${BOLD}Server${NC}"
    echo -e "  ${WHITE}访问地址:${NC}    http://${ip}:${port}"
    echo -e "  ${WHITE}用户名:${NC}      ${admin_user}"
    echo -e "  ${WHITE}密码:${NC}        ${DIM}（你刚才设置的）${NC}"
    echo
    echo -e "  ${BOLD}Agent${NC}"
    echo -e "  ${WHITE}母机 ID:${NC}     ${host_id}"
    echo -e "  ${WHITE}母机名称:${NC}    ${host_name}"
    echo -e "  ${WHITE}上报地址:${NC}    http://127.0.0.1:${port}"
    echo -e "  ${WHITE}采集间隔:${NC}    ${interval} 秒"
    echo

    echo -e "  ${YELLOW}┌─────────────────────────────────────────┐${NC}"
    echo -e "  ${YELLOW}│${NC}  ${BOLD}API Token（已自动配置）${NC}"
    echo -e "  ${YELLOW}│${NC}  ${DIM}${api_token}${NC}"
    echo -e "  ${YELLOW}└─────────────────────────────────────────┘${NC}"

    echo
    echo -e "  ${DIM}配置文件: ${INSTALL_DIR}/server.yaml${NC}"
    echo -e "  ${DIM}          ${INSTALL_DIR}/agent.yaml${NC}"
    echo -e "  ${DIM}查看日志: journalctl -u traffic-server -f${NC}"
    echo -e "  ${DIM}          journalctl -u traffic-agent -f${NC}"
    line
    echo
    echo -e "  ${CYAN}下一步:${NC} 登录管理面板 → 创建用户 → 分配端口范围 → 开始监控"
}

# ==================== 更新 ====================

update_binary() {
    local binary="$1" service="traffic-$1"
    local label
    [ "$binary" = "server" ] && label="Server" || label="Agent"

    banner
    echo -e "  ${CYAN}${BOLD}更新 ${label}${NC}"
    line

    if [ ! -f "$INSTALL_DIR/$binary" ]; then
        error "${label} 尚未安装"
        return 1
    fi

    local arch version current
    arch=$(detect_arch)
    version=$(get_latest_version)
    current=$(get_local_version "$binary")

    if [ -z "$version" ]; then
        error "无法获取最新版本"
        return 1
    fi

    echo -e "  ${WHITE}当前版本:${NC}  ${current}"
    echo -e "  ${WHITE}最新版本:${NC}  ${version}"
    echo

    if [ "$version" = "$current" ]; then
        success "已是最新版本，无需更新"
        return 0
    fi

    echo -ne "  确认更新到 ${GREEN}${version}${NC}？${DIM}[Y/n]${NC}: "
    read -r ans
    [[ "$ans" =~ ^[nN]$ ]] && return

    echo

    cp "$INSTALL_DIR/$binary" "$INSTALL_DIR/${binary}.bak"

    download_binary "$binary" "$version" "$arch" || {
        mv "$INSTALL_DIR/${binary}.bak" "$INSTALL_DIR/$binary"
        return 1
    }

    info "正在重启服务..."
    systemctl restart "$service"

    sleep 3
    if systemctl is-active --quiet "$service"; then
        success "更新成功: ${current} → ${version}"
        rm -f "$INSTALL_DIR/${binary}.bak"
    else
        error "启动失败，正在回滚..."
        mv "$INSTALL_DIR/${binary}.bak" "$INSTALL_DIR/$binary"
        systemctl restart "$service"
        error "已回滚到 ${current}"
    fi
}

update_all() {
    banner
    echo -e "  ${CYAN}${BOLD}全部更新${NC}"
    line

    local has_any=0
    for comp in server agent; do
        [ -f "$INSTALL_DIR/$comp" ] && has_any=1
    done

    if [ "$has_any" = "0" ]; then
        error "没有已安装的组件"
        return 1
    fi

    local arch version
    arch=$(detect_arch)
    version=$(get_latest_version)

    if [ -z "$version" ]; then
        error "无法获取最新版本"
        return 1
    fi

    for comp in server agent; do
        [ ! -f "$INSTALL_DIR/$comp" ] && continue
        local current
        current=$(get_local_version "$comp")
        local label
        [ "$comp" = "server" ] && label="Server" || label="Agent"

        if [ "$version" = "$current" ]; then
            echo -e "  ${label}: ${GREEN}已是最新${NC} ${DIM}${current}${NC}"
            continue
        fi

        echo -e "  ${label}: ${current} → ${GREEN}${version}${NC}"
        cp "$INSTALL_DIR/$comp" "$INSTALL_DIR/${comp}.bak"
        if download_binary "$comp" "$version" "$arch"; then
            systemctl restart "traffic-$comp"
            sleep 2
            if systemctl is-active --quiet "traffic-$comp"; then
                success "${label} 更新成功"
                rm -f "$INSTALL_DIR/${comp}.bak"
            else
                error "${label} 启动失败，回滚中..."
                mv "$INSTALL_DIR/${comp}.bak" "$INSTALL_DIR/$comp"
                systemctl restart "traffic-$comp"
            fi
        else
            mv "$INSTALL_DIR/${comp}.bak" "$INSTALL_DIR/$comp"
        fi
    done
}

# ==================== 查看状态 ====================

show_status() {
    banner
    echo -e "  ${CYAN}${BOLD}运行状态${NC}"
    line

    for comp in server agent; do
        local ver label
        ver=$(get_local_version "$comp")
        [ "$comp" = "server" ] && label="Server" || label="Agent"
        if [ "$ver" = "未安装" ]; then
            echo -e "  ${DIM}${label}:  未安装${NC}"
        else
            local sc st
            if systemctl is-active --quiet "traffic-$comp" 2>/dev/null; then
                sc="$GREEN"; st="运行中"
            else
                sc="$RED"; st="已停止"
            fi
            echo -e "  ${WHITE}${label}${NC}  ${sc}● ${st}${NC}  ${DIM}${ver}${NC}"
        fi
    done

    echo
    local latest
    latest=$(get_latest_version)
    echo -e "  ${DIM}GitHub 最新版本: ${latest:-获取失败}${NC}"
    line
}

# ==================== 查看日志 ====================

show_logs() {
    banner
    echo -e "  ${CYAN}${BOLD}查看日志${NC}"
    line
    echo -e "  ${WHITE}1${NC}  Server 日志"
    echo -e "  ${WHITE}2${NC}  Agent 日志"
    echo -e "  ${WHITE}0${NC}  ${DIM}返回${NC}"
    echo
    echo -ne "  请选择: "
    read -r choice

    case "$choice" in
        1) journalctl -u traffic-server -n 50 --no-pager ;;
        2) journalctl -u traffic-agent -n 50 --no-pager ;;
    esac
}

# ==================== 卸载 ====================

uninstall() {
    banner
    echo -e "  ${RED}${BOLD}卸载${NC}"
    line

    echo -e "  ${WHITE}1${NC}  卸载 Server"
    echo -e "  ${WHITE}2${NC}  卸载 Agent"
    echo -e "  ${WHITE}3${NC}  全部卸载"
    echo -e "  ${WHITE}0${NC}  ${DIM}返回${NC}"
    echo
    echo -ne "  请选择: "
    read -r choice

    do_uninstall() {
        local comp="$1"
        systemctl stop "traffic-$comp" 2>/dev/null || true
        systemctl disable "traffic-$comp" 2>/dev/null || true
        rm -f "/etc/systemd/system/traffic-$comp.service"
        rm -f "$INSTALL_DIR/$comp" "$INSTALL_DIR/${comp}.bak" "$INSTALL_DIR/.version-$comp"
        systemctl daemon-reload
        success "${comp} 已卸载"
    }

    case "$choice" in
        1)
            echo -ne "  ${RED}确认卸载 Server？${NC}${DIM}[y/N]${NC}: "
            read -r ans
            if [[ "$ans" =~ ^[yY]$ ]]; then
                do_uninstall server
                echo -ne "  同时删除数据库和配置文件？${DIM}[y/N]${NC}: "
                read -r ans2
                [[ "$ans2" =~ ^[yY]$ ]] && rm -f "$INSTALL_DIR/server.yaml" "$INSTALL_DIR/traffic.db"* && success "数据已清除"
            fi
            ;;
        2)
            echo -ne "  ${RED}确认卸载 Agent？${NC}${DIM}[y/N]${NC}: "
            read -r ans
            [[ "$ans" =~ ^[yY]$ ]] && do_uninstall agent && rm -f "$INSTALL_DIR/agent.yaml"
            ;;
        3)
            echo -ne "  ${RED}确认全部卸载？${NC}${DIM}[y/N]${NC}: "
            read -r ans
            if [[ "$ans" =~ ^[yY]$ ]]; then
                do_uninstall server
                do_uninstall agent
                echo -ne "  删除整个目录 ${INSTALL_DIR}？${DIM}[y/N]${NC}: "
                read -r ans2
                [[ "$ans2" =~ ^[yY]$ ]] && rm -rf "$INSTALL_DIR" && success "目录已删除"
            fi
            ;;
    esac
}

# ==================== 编辑配置 ====================

edit_config() {
    banner
    echo -e "  ${CYAN}${BOLD}编辑配置${NC}"
    line
    echo -e "  ${WHITE}1${NC}  编辑 server.yaml"
    echo -e "  ${WHITE}2${NC}  编辑 agent.yaml"
    echo -e "  ${WHITE}0${NC}  ${DIM}返回${NC}"
    echo
    echo -ne "  请选择: "
    read -r choice

    local editor="${EDITOR:-nano}"
    case "$choice" in
        1)
            if [ -f "$INSTALL_DIR/server.yaml" ]; then
                $editor "$INSTALL_DIR/server.yaml"
                echo -ne "  重启 Server 使配置生效？${DIM}[Y/n]${NC}: "
                read -r ans
                [[ ! "$ans" =~ ^[nN]$ ]] && systemctl restart traffic-server && success "Server 已重启"
            else
                error "server.yaml 不存在"
            fi
            ;;
        2)
            if [ -f "$INSTALL_DIR/agent.yaml" ]; then
                $editor "$INSTALL_DIR/agent.yaml"
                echo -ne "  重启 Agent 使配置生效？${DIM}[Y/n]${NC}: "
                read -r ans
                [[ ! "$ans" =~ ^[nN]$ ]] && systemctl restart traffic-agent && success "Agent 已重启"
            else
                error "agent.yaml 不存在"
            fi
            ;;
    esac
}

# ==================== 主菜单 ====================

main_menu() {
    while true; do
        banner

        for comp in server agent; do
            local ver label
            ver=$(get_local_version "$comp")
            [ "$comp" = "server" ] && label="Server" || label="Agent"
            if [ "$ver" != "未安装" ]; then
                local sc st
                if systemctl is-active --quiet "traffic-$comp" 2>/dev/null; then
                    sc="$GREEN"; st="运行中"
                else
                    sc="$RED"; st="已停止"
                fi
                echo -e "  ${sc}●${NC} ${label} ${DIM}${ver} - ${st}${NC}"
            fi
        done
        echo

        echo -e "  ${BOLD}安装${NC}"
        echo -e "  ${WHITE}1${NC}  安装 Server        ${DIM}（管理面板 + 数据存储）${NC}"
        echo -e "  ${WHITE}2${NC}  安装 Agent         ${DIM}（母机流量采集）${NC}"
        echo -e "  ${WHITE}3${NC}  ${GREEN}单机部署${NC}          ${DIM}（Server + Agent 一键装在本机）${NC}"
        echo
        echo -e "  ${BOLD}管理${NC}"
        echo -e "  ${WHITE}4${NC}  更新 Server"
        echo -e "  ${WHITE}5${NC}  更新 Agent"
        echo -e "  ${WHITE}6${NC}  全部更新"
        echo -e "  ${WHITE}7${NC}  查看状态"
        echo -e "  ${WHITE}8${NC}  查看日志"
        echo -e "  ${WHITE}9${NC}  编辑配置"
        echo -e "  ${WHITE}10${NC} 卸载"
        echo
        echo -e "  ${WHITE}0${NC}  退出"
        line
        echo -ne "  请选择 ${DIM}[0-10]${NC}: "
        read -r choice

        case "$choice" in
            1) install_server ;;
            2) install_agent ;;
            3) install_all_in_one ;;
            4) update_binary server ;;
            5) update_binary agent ;;
            6) update_all ;;
            7) show_status ;;
            8) show_logs ;;
            9) edit_config ;;
            10) uninstall ;;
            0) echo; exit 0 ;;
            *) warn "无效选项" ;;
        esac

        echo
        echo -ne "  ${DIM}按回车键继续...${NC}"
        read -r
    done
}

# ==================== 入口 ====================

check_root
main_menu
