<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { NModal, NSpin, NTag } from 'naive-ui'
import { getPublicBoard, getUserDaily } from '../api/public'
import { formatBytes } from '../utils/format'
import UsageBar from '../components/UsageBar.vue'
import TrafficChart from '../components/TrafficChart.vue'

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
    limit_bytes: number
    usage_percent: number
  }
}

const users = ref<BoardUser[]>([])
const loading = ref(true)
const showModal = ref(false)
const selectedUser = ref<BoardUser | null>(null)
const dailyData = ref<any[]>([])
const dailyLoading = ref(false)
let timer: number | null = null

async function fetchBoard() {
  try {
    const res = await getPublicBoard()
    users.value = res.data.users || []
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
  if (status === 'active') return 'Active'
  if (status === 'suspended') return 'Suspended'
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
    <div class="board-grid">
      <div
        v-for="user in users"
        :key="user.user_id"
        class="user-card"
        @click="showDetail(user)"
      >
        <div class="card-header">
          <div class="user-name">{{ user.name }}</div>
          <n-tag :type="statusType(user.status)" size="small" round>
            {{ statusLabel(user.status) }}
          </n-tag>
        </div>

        <div class="card-meta">
          <div class="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="8" rx="2" stroke="currentColor" stroke-width="2"/>
              <rect x="2" y="14" width="20" height="8" rx="2" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>{{ user.host_name }}</span>
          </div>
          <div class="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>{{ user.port_range }}</span>
          </div>
          <div class="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>{{ user.cycle.start }} ~ {{ user.cycle.end }}</span>
          </div>
        </div>

        <div class="card-usage">
          <usage-bar :used="user.traffic.total_bytes" :limit="user.traffic.limit_bytes" />
        </div>

        <div class="card-traffic">
          <div class="traffic-item download">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ formatBytes(user.traffic.rx_bytes) }}
          </div>
          <div class="traffic-item upload">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ formatBytes(user.traffic.tx_bytes) }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && users.length === 0" class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="color: #cbd5e1;">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p>No traffic data yet</p>
    </div>
  </n-spin>

  <n-modal v-model:show="showModal" preset="card" style="max-width: 720px; border-radius: 20px;">
    <template #header>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>{{ selectedUser?.name }}</span>
        <span style="color: #94a3b8; font-weight: 400; font-size: 14px;">Daily Traffic</span>
      </div>
    </template>
    <n-spin :show="dailyLoading">
      <traffic-chart v-if="dailyData.length > 0" :data="dailyData" />
      <div v-else-if="!dailyLoading" class="empty-state" style="padding: 40px;">
        <p>No traffic data in this cycle</p>
      </div>
    </n-spin>
  </n-modal>
</template>

<style scoped>
.board-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.user-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.user-card:hover {
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.1);
  transform: translateY(-4px);
  border-color: rgba(99, 102, 241, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.user-name {
  font-size: 17px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.01em;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
}

.meta-item svg {
  color: #94a3b8;
  flex-shrink: 0;
}

.card-usage {
  margin-bottom: 16px;
}

.card-traffic {
  display: flex;
  justify-content: space-between;
}

.traffic-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
}

.traffic-item.download {
  color: #6366f1;
}

.traffic-item.upload {
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
</style>
