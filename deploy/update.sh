#!/bin/bash
# Traffic Monitor auto-update script
# Usage:
#   BINARY=server SERVICE=traffic-server ./update.sh        # interactive, requires confirmation
#   BINARY=agent  SERVICE=traffic-agent  ./update.sh -y     # silent, auto-confirm

set -e

# ===== Config =====
REPO="${REPO:-156933/PortTrafficStatistics}"
INSTALL_DIR="${INSTALL_DIR:-/opt/traffic-monitor}"
BINARY="${BINARY:?BINARY is required (agent | server)}"
SERVICE="${SERVICE:?SERVICE is required (traffic-agent | traffic-server)}"
ARCH="${ARCH:-$(uname -m)}"
GH_TOKEN="${GH_TOKEN:-}"

# -y to skip confirmation
AUTO_CONFIRM=0
[ "$1" = "-y" ] && AUTO_CONFIRM=1

# ===== Do not edit below =====

case "$ARCH" in
    x86_64)  GOARCH="amd64" ;;
    aarch64) GOARCH="arm64" ;;
    *)       GOARCH="$ARCH" ;;
esac

ASSET_NAME="${BINARY}-linux-${GOARCH}"
VERSION_FILE="$INSTALL_DIR/.version-$BINARY"
TS="[$(date '+%Y-%m-%d %H:%M:%S')]"

AUTH_HEADER=()
[ -n "$GH_TOKEN" ] && AUTH_HEADER=(-H "Authorization: token $GH_TOKEN")

# 1. Fetch latest tag
LATEST=$(curl -fsSL "${AUTH_HEADER[@]}" \
    "https://api.github.com/repos/$REPO/releases/latest" | \
    grep '"tag_name"' | head -1 | cut -d '"' -f 4)

if [ -z "$LATEST" ]; then
    echo "$TS [$BINARY] Failed to fetch latest version"
    exit 1
fi

# 2. Compare with local version
CURRENT=""
[ -f "$VERSION_FILE" ] && CURRENT=$(cat "$VERSION_FILE")

if [ "$LATEST" = "$CURRENT" ]; then
    echo "$TS [$BINARY] Already up to date: $CURRENT"
    exit 0
fi

echo "$TS [$BINARY] New version available: $LATEST (current: ${CURRENT:-none})"

# 3. Confirm
if [ "$AUTO_CONFIRM" = "0" ]; then
    read -rp "Update to $LATEST? [y/N] " answer
    case "$answer" in
        [yY]|[yY][eE][sS]) ;;
        *) echo "$TS [$BINARY] Update cancelled"; exit 0 ;;
    esac
fi

echo "$TS [$BINARY] Downloading..."

# 4. Download
DOWNLOAD_URL="https://github.com/$REPO/releases/download/$LATEST/$ASSET_NAME"
TMP_FILE="$INSTALL_DIR/$BINARY.new"

if ! curl -fsSL "${AUTH_HEADER[@]}" -L -o "$TMP_FILE" "$DOWNLOAD_URL"; then
    echo "$TS [$BINARY] Download failed: $DOWNLOAD_URL"
    rm -f "$TMP_FILE"
    exit 1
fi

chmod +x "$TMP_FILE"

# 5. Backup old + atomic replace
if [ -f "$INSTALL_DIR/$BINARY" ]; then
    mv "$INSTALL_DIR/$BINARY" "$INSTALL_DIR/$BINARY.old"
fi
mv "$TMP_FILE" "$INSTALL_DIR/$BINARY"

# 6. Restart service
systemctl restart "$SERVICE"

# 7. Health check (wait 3s)
sleep 3
if systemctl is-active --quiet "$SERVICE"; then
    echo "$TS [$BINARY] Update successful: ${CURRENT:-none} -> $LATEST"
    echo "$LATEST" > "$VERSION_FILE"
    rm -f "$INSTALL_DIR/$BINARY.old"
else
    echo "$TS [$BINARY] Start failed, rolling back to ${CURRENT:-old version}"
    if [ -f "$INSTALL_DIR/$BINARY.old" ]; then
        mv "$INSTALL_DIR/$BINARY.old" "$INSTALL_DIR/$BINARY"
        systemctl restart "$SERVICE"
    fi
    exit 1
fi
