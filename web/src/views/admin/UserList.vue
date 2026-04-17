<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NDataTable, NButton, NSpace, NInput, NSelect, NPopconfirm, NTag, useMessage } from 'naive-ui'
import { listUsers, deleteUser, suspendUser, resumeUser } from '../../api/user'
import { exportTrafficCSV, downloadBlob } from '../../api/export'

const router = useRouter()
const message = useMessage()
const data = ref<any[]>([])
const loading = ref(true)
const total = ref(0)
const page = ref(1)
const size = ref(20)
const search = ref('')
const statusFilter = ref<string | null>(null)

const statusOptions = [
  { label: 'All', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Suspended', value: 'suspended' },
]

const columns = [
  { title: 'User ID', key: 'user_id', width: 120, ellipsis: { tooltip: true } },
  { title: 'Name', key: 'name', width: 120, ellipsis: { tooltip: true } },
  { title: 'Host', key: 'host_id', width: 120, ellipsis: { tooltip: true } },
  { title: 'Port Range', key: 'port', width: 130, render: (row: any) => `${row.port_start} - ${row.port_end}` },
  {
    title: 'Status', key: 'status', width: 100,
    render: (row: any) => h(NTag, {
      type: row.status === 'active' ? 'success' : row.status === 'suspended' ? 'warning' : 'default',
      size: 'small',
      round: true,
    }, () => row.status === 'active' ? 'Active' : row.status === 'suspended' ? 'Suspended' : row.status),
  },
  {
    title: 'Actions', key: 'actions', width: 220, fixed: 'right' as const,
    render: (row: any) => h(NSpace, { size: 8 }, () => [
      h(NButton, { size: 'small', secondary: true, onClick: () => router.push(`/admin/users/${row.user_id}/edit`) }, () => 'Edit'),
      row.status === 'active'
        ? h(NPopconfirm, { onPositiveClick: () => handleSuspend(row.user_id) }, {
            default: () => 'Confirm suspend?',
            trigger: () => h(NButton, { size: 'small', secondary: true, type: 'warning' }, () => 'Suspend'),
          })
        : h(NButton, { size: 'small', secondary: true, type: 'info', onClick: () => handleResume(row.user_id) }, () => 'Resume'),
      h(NPopconfirm, { onPositiveClick: () => handleDelete(row.user_id) }, {
        default: () => 'Confirm delete?',
        trigger: () => h(NButton, { size: 'small', secondary: true, type: 'error' }, () => 'Delete'),
      }),
    ]),
  },
]

async function fetchData() {
  loading.value = true
  try {
    const res = await listUsers({ status: statusFilter.value || undefined, search: search.value || undefined, page: page.value, size: size.value })
    data.value = res.data.data || []
    total.value = res.data.total
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function handleDelete(userId: string) {
  try {
    await deleteUser(userId)
    message.success('Deleted')
    fetchData()
  } catch (e) {
    message.error('Delete failed')
  }
}

async function handleSuspend(userId: string) {
  try {
    await suspendUser(userId)
    message.success('Suspended')
    fetchData()
  } catch (e) {
    message.error('Operation failed')
  }
}

async function handleResume(userId: string) {
  try {
    await resumeUser(userId)
    message.success('Resumed')
    fetchData()
  } catch (e) {
    message.error('Operation failed')
  }
}

async function handleExport() {
  try {
    const res = await exportTrafficCSV()
    downloadBlob(res.data, 'traffic_export.csv')
  } catch (e) {
    message.error('Export failed')
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
      <div class="page-title">Users</div>
      <n-space>
        <n-button type="primary" @click="router.push('/admin/users/create')">
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </template>
          New User
        </n-button>
        <n-button secondary @click="handleExport">Export CSV</n-button>
      </n-space>
    </div>

    <div class="filter-bar">
      <n-input v-model:value="search" placeholder="Search users..." clearable style="width: 240px;" @clear="fetchData" @keydown.enter="fetchData" />
      <n-select v-model:value="statusFilter" :options="statusOptions" style="width: 140px;" @update:value="fetchData" />
    </div>

    <div class="table-card">
      <n-data-table
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="{ page: page, pageSize: size, itemCount: total, onChange: handlePageChange }"
        :bordered="false"
        :scroll-x="800"
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

.filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.table-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
