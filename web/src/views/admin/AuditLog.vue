<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { NDataTable, NSpace, NSelect, NTag } from 'naive-ui'
import { listAuditLogs } from '../../api/audit'
import { formatDateTime } from '../../utils/format'

const data = ref<any[]>([])
const loading = ref(true)
const total = ref(0)
const page = ref(1)
const size = ref(50)
const actionFilter = ref<string | null>(null)
const targetTypeFilter = ref<string | null>(null)

const actionOptions = [
  { label: 'All Actions', value: '' },
  { label: 'Create User', value: 'create_user' },
  { label: 'Update User', value: 'update_user' },
  { label: 'Delete User', value: 'delete_user' },
  { label: 'Suspend User', value: 'suspend_user' },
  { label: 'Resume User', value: 'resume_user' },
  { label: 'Create Host', value: 'create_host' },
  { label: 'Delete Host', value: 'delete_host' },
  { label: 'Create Alert Rule', value: 'create_alert_rule' },
  { label: 'Delete Alert Rule', value: 'delete_alert_rule' },
]

const targetTypeOptions = [
  { label: 'All Types', value: '' },
  { label: 'User', value: 'user' },
  { label: 'Host', value: 'host' },
  { label: 'Alert Rule', value: 'alert_rule' },
]

const actionColors: Record<string, string> = {
  create_user: 'success',
  update_user: 'info',
  delete_user: 'error',
  suspend_user: 'warning',
  resume_user: 'success',
  create_host: 'success',
  delete_host: 'error',
  create_alert_rule: 'success',
  delete_alert_rule: 'error',
}

const columns = [
  { title: 'Time', key: 'created_at', width: 180, render: (row: any) => formatDateTime(row.created_at) },
  { title: 'Admin', key: 'admin_username', width: 120 },
  {
    title: 'Action', key: 'action', width: 150,
    render: (row: any) => h(NTag, {
      type: (actionColors[row.action] || 'default') as any,
      size: 'small',
      round: true,
      bordered: false,
    }, () => row.action),
  },
  { title: 'Target', key: 'target_type', width: 100 },
  { title: 'Target ID', key: 'target_id', width: 140, ellipsis: { tooltip: true } },
  {
    title: 'Detail', key: 'detail', ellipsis: { tooltip: true },
    render: (row: any) => row.detail || '-',
  },
]

async function fetchData() {
  loading.value = true
  try {
    const res = await listAuditLogs({ action: actionFilter.value || undefined, target_type: targetTypeFilter.value || undefined, page: page.value, size: size.value })
    data.value = res.data.data || []
    total.value = res.data.total
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
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
      <div class="page-title">Audit Log</div>
      <n-space>
        <n-select v-model:value="actionFilter" :options="actionOptions" style="width: 160px;" @update:value="fetchData" />
        <n-select v-model:value="targetTypeFilter" :options="targetTypeOptions" style="width: 140px;" @update:value="fetchData" />
      </n-space>
    </div>

    <div class="table-card">
      <n-data-table
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="{ page: page, pageSize: size, itemCount: total, onChange: handlePageChange }"
        :bordered="false"
        :scroll-x="900"
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
  flex-wrap: wrap;
  gap: 12px;
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
