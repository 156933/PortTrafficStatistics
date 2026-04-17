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
  { label: 'All', value: '' },
  { label: 'Unresolved', value: 'false' },
  { label: 'Resolved', value: 'true' },
]

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  {
    title: 'Triggered', key: 'triggered_at', width: 180,
    render: (row: any) => formatDateTime(row.triggered_at),
  },
  { title: 'User', key: 'user_id', width: 120, render: (row: any) => row.user_id || '-' },
  { title: 'Message', key: 'message', ellipsis: { tooltip: true } },
  {
    title: 'Status', key: 'resolved', width: 120,
    render: (row: any) => h(NTag, {
      type: row.resolved ? 'success' : 'warning',
      size: 'small',
      round: true,
      bordered: false,
    }, () => row.resolved ? 'Resolved' : 'Unresolved'),
  },
  {
    title: 'Actions', key: 'actions', width: 120,
    render: (row: any) => row.resolved
      ? null
      : h(NButton, { size: 'small', type: 'primary', secondary: true, onClick: () => handleResolve(row.id) }, () => 'Resolve'),
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
    message.success('Resolved')
    fetchData()
  } catch (e) {
    message.error('Operation failed')
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
    <div class="page-header">
      <div class="page-title">Alert Logs</div>
      <n-select v-model:value="resolvedFilter" :options="filterOptions" style="width: 160px;" @update:value="fetchData" />
    </div>

    <div class="table-card">
      <n-data-table
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="{ page: page, pageSize: size, itemCount: total, onChange: handlePageChange }"
        :bordered="false"
      />
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em;
}

.table-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
