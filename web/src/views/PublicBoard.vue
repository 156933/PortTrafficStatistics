<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NModal, NSpin, NTag } from 'naive-ui'
import { getPublicBoard, getPublicDailyStats, getUserDaily } from '../api/public'
import { formatBytes } from '../utils/format'
import UsageBar from '../components/UsageBar.vue'
import TrafficChart from '../components/TrafficChart.vue'

import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])

interface BoardUser {
  user_id: string
  name: string
  host_name: string
  port_range: string
  status: string
  cycle: { start: string; end: string; reset_day: number }
  traffic: {
    rx_bytes: number
    tx_bytes: number
    total_bytes: number
    total_human: string
    limit_bytes: number
    limit_human: string
    usage_percent: number
  }
}

const users = ref<BoardUser[]>([])
const dailyStats = ref<any[]>([])
const loading = ref(true)
const showModal = ref(false)
const selectedUser = ref<BoardUser | null>(null)
const dailyData = ref<any[]>([])
const dailyLoading = ref(false)
let timer: number | null = null

const totalTraffic = computed(() => {
  let rx = 0, tx = 0
  for (const u of users.value) {
    rx += u.traffic.rx_bytes
    tx += u.traffic.tx_bytes
  }
  return { rx, tx, total: rx + tx }
})

const activeUsers = computed(() => users.value.filter(u => u.status === 'active').length)
const topUser = computed(() => {
  if (users.value.length === 0) return null
  return [...users.value].sort((a, b) => b.traffic.total_bytes - a.traffic.total_bytes)[0]
})

const trendChartOption = computed(() => {
  if (dailyStats.value.length === 0) return {}
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: 'transparent',
      textStyle: { color: '#e2e8f0', fontSize: 13 },
      formatter: (params: any) => {
        let html = `<div style="font-weight:600;margin-bottom:6px">${params[0].axisValue}</div>`
        for (const p of params) {
          html += `<div style="display:flex;align-items:center;gap:6px;margin:3px 0">${p.marker}<span>${p.seriesName}</span><span style="font-weight:600;margin-left:auto">${formatBytes(p.value)}</span></div>`
        }
        return html
      },
    },
    legend: {
      data: ['下载', '上传'],
      icon: 'roundRect', itemWidth: 12, itemHeight: 4,
      textStyle: { color: '#94a3b8', fontSize: 12 },
      right: 0,
    },
    grid: { left: 70, right: 16, top: 40, bottom: 28 },
    xAxis: {
      type: 'category',
      data: dailyStats.value.map(d => d.date),
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#94a3b8', fontSize: 11 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: (v: number) => formatBytes(v), color: '#94a3b8', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      axisLine: { show: false }, axisTick: { show: false },
    },
    series: [
      {
        name: '下载', type: 'line', smooth: true, showSymbol: false,
        data: dailyStats.value.map(d => d.rx_bytes),
        lineStyle: { width: 2.5 }, itemStyle: { color: '#6366f1' },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(99,102,241,0.2)' }, { offset: 1, color: 'rgba(99,102,241,0)' }] } },
      },
      {
        name: '上传', type: 'line', smooth: true, showSymbol: false,
        data: dailyStats.value.map(d => d.tx_bytes),
        lineStyle: { width: 2.5 }, itemStyle: { color: '#10b981' },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(16,185,129,0.2)' }, { offset: 1, color: 'rgba(16,185,129,0)' }] } },
      },
    ],
  }
})

async function fetchBoard() {
  try {
    const [boardRes, statsRes] = await Promise.all([
      getPublicBoard(),
      getPublicDailyStats(),
    ])
    users.value = boardRes.data.users || []
    dailyStats.value = statsRes.data.daily || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function showDetail(user: BoardUser) {
  selectedUser.value = user
  showModal.value = true
  dailyLoading.value = true
  try {
    const res = await getUserDaily(user.user_id)
    dailyData.value = res.data.daily || []
  } catch (e) {
    console.error(e)
  } finally {
    dailyLoading.value = false
  }
}

function statusLabel(status: string) {
  if (status === 'active') return '正常'
  if (status === 'suspended') return '已暂停'
  return status
}

function statusType(status: string): 'success' | 'warning' | 'default' {
  if (status === 'active') return 'success'
  if (status === 'suspended') return 'warning'
  return 'default'
}

onMounted(() => {
  fetchBoard()
  timer = window.setInterval(fetchBoard, 60000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <n-spin :show="loading">
    <!-- 顶部统计 -->
    <div class="stats-section">
      <div class="stat-hero">
        <div class="stat-hero-label">本周期总流量</div>
        <div class="stat-hero-value">{{ formatBytes(totalTraffic.total) }}</div>
        <div class="stat-hero-detail">
          <span class="dl">↓ {{ formatBytes(totalTraffic.rx) }}</span>
          <span class="sep">|</span>
          <span class="ul">↑ {{ formatBytes(totalTraffic.tx) }}</span>
        </div>
      </div>
      <div class="stat-cards">
        <div class="stat-mini">
          <div class="stat-mini-value">{{ activeUsers }}</div>
          <div class="stat-mini-label">活跃用户</div>
        </div>
        <div class="stat-mini">
          <div class="stat-mini-value">{{ users.length }}</div>
          <div class="stat-mini-label">总用户数</div>
        </div>
        <div class="stat-mini">
          <div class="stat-mini-value">{{ topUser?.name || '-' }}</div>
          <div class="stat-mini-label">用量最高</div>
        </div>
      </div>
    </div>

    <!-- 流量趋势图 -->
    <div v-if="dailyStats.length > 0" class="trend-card">
      <div class="trend-header">
        <div class="trend-title">流量趋势（近 30 天）</div>
      </div>
      <v-chart :option="trendChartOption" style="height: 280px;" autoresize />
    </div>

    <!-- 用户卡片 -->
    <div class="section-title">用户用量</div>
    <div class="board-grid">
      <div v-for="user in users" :key="user.user_id" class="user-card" @click="showDetail(user)">
        <div class="card-top">
          <div class="card-top-left">
            <div class="user-name">{{ user.name }}</div>
            <n-tag :type="statusType(user.status)" size="small" round>{{ statusLabel(user.status) }}</n-tag>
          </div>
          <div class="card-total">
            <div class="card-total-value">{{ formatBytes(user.traffic.total_bytes) }}</div>
            <div class="card-total-label">总流量</div>
          </div>
        </div>

        <div class="card-usage">
          <usage-bar :used="user.traffic.total_bytes" :limit="user.traffic.limit_bytes" />
        </div>

        <div class="card-bottom">
          <div class="card-meta-row">
            <span class="meta-tag">{{ user.host_name }}</span>
            <span class="meta-tag">端口 {{ user.port_range }}</span>
            <span class="meta-tag">{{ user.cycle.start }} ~ {{ user.cycle.end }}</span>
          </div>
          <div class="card-traffic">
            <span class="traffic-dl">↓ {{ formatBytes(user.traffic.rx_bytes) }}</span>
            <span class="traffic-ul">↑ {{ formatBytes(user.traffic.tx_bytes) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && users.length === 0" class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="color: #cbd5e1;">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p>暂无用户数据</p>
    </div>
  </n-spin>

  <n-modal v-model:show="showModal" preset="card" style="max-width: 720px; border-radius: 20px;">
    <template #header>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>{{ selectedUser?.name }}</span>
        <span style="color: #94a3b8; font-weight: 400; font-size: 14px;">每日流量</span>
      </div>
    </template>
    <n-spin :show="dailyLoading">
      <traffic-chart v-if="dailyData.length > 0" :data="dailyData" />
      <div v-else-if="!dailyLoading" class="empty-state" style="padding: 40px;">
        <p>本周期暂无流量数据</p>
      </div>
    </n-spin>
  </n-modal>
</template>

<style scoped>
/* ===== 顶部统计 ===== */
.stats-section {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
}

.stat-hero {
  flex: 1;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 20px;
  padding: 32px;
  color: white;
  min-width: 0;
}

.stat-hero-label {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 8px;
  font-weight: 500;
}

.stat-hero-value {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 12px;
}

.stat-hero-detail {
  font-size: 14px;
  opacity: 0.85;
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-hero-detail .dl { font-weight: 600; }
.stat-hero-detail .ul { font-weight: 600; }
.stat-hero-detail .sep { opacity: 0.4; }

.stat-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 180px;
}

.stat-mini {
  background: #ffffff;
  border-radius: 14px;
  padding: 16px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.stat-mini-value {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-mini-label {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
  margin-top: 2px;
}

/* ===== 趋势图 ===== */
.trend-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.trend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.trend-title {
  font-size: 16px;
  font-weight: 600;
  color: #334155;
}

/* ===== 用户卡片 ===== */
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 16px;
}

.board-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}

.user-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.user-card:hover {
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.1);
  transform: translateY(-3px);
  border-color: rgba(99, 102, 241, 0.15);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.card-top-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.user-name {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-total {
  text-align: right;
  flex-shrink: 0;
}

.card-total-value {
  font-size: 22px;
  font-weight: 800;
  color: #6366f1;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.card-total-label {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 500;
  margin-top: 2px;
}

.card-usage {
  margin-bottom: 14px;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.card-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;
}

.meta-tag {
  font-size: 11px;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.card-traffic {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.traffic-dl {
  font-size: 12px;
  font-weight: 600;
  color: #6366f1;
}

.traffic-ul {
  font-size: 12px;
  font-weight: 600;
  color: #10b981;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-state p {
  color: #94a3b8;
  margin-top: 12px;
  font-size: 15px;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .stats-section {
    flex-direction: column;
  }

  .stat-cards {
    flex-direction: row;
  }

  .stat-hero-value {
    font-size: 28px;
  }

  .board-grid {
    grid-template-columns: 1fr;
  }
}
</style>
