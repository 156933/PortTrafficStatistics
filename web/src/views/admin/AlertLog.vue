<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { NDataTable, NButton, NSpace, NSelect, NTag, useMessage } from 'naive-ui'
import { listAlertLogs, resolveAlertLog } from '../../api/alert'
import { formatDateTime } from '../../utils/format'

const message = useMessage()
const data = ref<any[]>([])
const loading = ref(true)
const total = ref(0)
const page = ref(1)
const size = ref(20)
const resolvedFilter = ref<string | null>(null)

const filterOptions = [
  { label: '全部', value: '' },
  { label: '未处理', value: 'false' },
  { label: '已处理', value: 'true' },
]

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  {
    title: '触发时间', key: 'triggered_at', width: 180,
    render: (row: any) => formatDateTime(row.triggered_at),
  },
  { title: '用户', key: 'user_id', width: 100, render: (row: any) => row.user_id || '-' },
  { title: '消息', key: 'message' },
  {
    title: '状态', key: 'resolved', width: 100,
    render: (row: any) => h(NTag, { type: row.resolved ? 'success' : 'warning', size: 'small' }, () => row.resolved ? '已处理' : '未处理'),
  },
  {
    title: '操作', key: 'actions', width: 100,
    render: (row: any) => row.resolved
      ? null
      : h(NButton, { size: 'small', type: 'primary', onClick: () => handleResolve(row.id) }, () => '标记处理'),
  },
]

async function fetchData() {
  loading.value = true
  try {
    const res = await listAlertLogs({ resolved: resolvedFilter.value || undefined, page: page.value, size: size.value })
    data.value = res.data.data || []
    total.value = res.data.total
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function handleResolve(id: number) {
  try {
    await resolveAlertLog(id)
    message.success('已标记处理')
    fetchData()
  } catch (e) {
    message.error('操作失败')
  }
}

function handlePageChange(p: number) {
  page.value = p
  fetchData()
}

onMounted(fetchData)
</script>

<template>
  <div>
    <n-space justify="space-between" style="margin-bottom: 16px;">
      <h3 style="margin: 0;">告警记录</h3>
      <n-select v-model:value="resolvedFilter" :options="filterOptions" style="width: 120px;" @update:value="fetchData" />
    </n-space>

    <n-data-table
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="{ page: page, pageSize: size, itemCount: total, onChange: handlePageChange }"
      :bordered="false"
    />
  </div>
</template>
