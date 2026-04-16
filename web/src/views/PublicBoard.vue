<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { NCard, NGrid, NGridItem, NTag, NModal, NSpin } from 'naive-ui'
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

function statusColor(status: string) {
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
    <n-grid :x-gap="16" :y-gap="16" cols="1 s:2 m:3 l:4" responsive="screen">
      <n-grid-item v-for="user in users" :key="user.user_id">
        <n-card hoverable style="cursor: pointer;" @click="showDetail(user)">
          <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>{{ user.name }}</span>
              <n-tag :type="statusColor(user.status)" size="small">
                {{ user.status === 'active' ? '正常' : user.status === 'suspended' ? '已暂停' : user.status }}
              </n-tag>
            </div>
          </template>
          <div style="font-size: 13px; color: #666; margin-bottom: 12px;">
            <div>节点: {{ user.host_name }}</div>
            <div>端口: {{ user.port_range }}</div>
            <div>周期: {{ user.cycle.start }} ~ {{ user.cycle.end }}</div>
          </div>
          <usage-bar :used="user.traffic.total_bytes" :limit="user.traffic.limit_bytes" />
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #999; margin-top: 8px;">
            <span>↓ {{ formatBytes(user.traffic.rx_bytes) }}</span>
            <span>↑ {{ formatBytes(user.traffic.tx_bytes) }}</span>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
    <div v-if="!loading && users.length === 0" style="text-align: center; padding: 60px; color: #999;">
      暂无用户数据
    </div>
  </n-spin>

  <n-modal v-model:show="showModal" preset="card" :title="selectedUser?.name + ' - 每日流量'" style="max-width: 700px;">
    <n-spin :show="dailyLoading">
      <traffic-chart v-if="dailyData.length > 0" :data="dailyData" />
      <div v-else-if="!dailyLoading" style="text-align: center; padding: 40px; color: #999;">
        暂无流量数据
      </div>
    </n-spin>
  </n-modal>
</template>
