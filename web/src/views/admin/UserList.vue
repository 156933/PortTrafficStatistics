<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NDataTable, NButton, NSpace, NInput, NSelect, NPopconfirm, NTag, useMessage } from 'naive-ui'
import { listUsers, deleteUser, suspendUser, resumeUser } from '../../api/user'
import { exportTrafficCSV, downloadBlob } from '../../api/export'
import { formatBytes } from '../../utils/format'
import UsageBar from '../../components/UsageBar.vue'

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
  { label: '全部', value: '' },
  { label: '正常', value: 'active' },
  { label: '已暂停', value: 'suspended' },
]

const columns = [
  { title: 'User ID', key: 'user_id', width: 100 },
  { title: '名称', key: 'name', width: 100 },
  { title: '母机', key: 'host_id', width: 120 },
  { title: '端口', key: 'port', width: 120, render: (row: any) => `${row.port_start}-${row.port_end}` },
  {
    title: '状态', key: 'status', width: 80,
    render: (row: any) => h(NTag, { type: row.status === 'active' ? 'success' : row.status === 'suspended' ? 'warning' : 'default', size: 'small' }, () => row.status === 'active' ? '正常' : row.status === 'suspended' ? '已暂停' : row.status),
  },
  {
    title: '操作', key: 'actions', width: 240,
    render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', onClick: () => router.push(`/admin/users/${row.user_id}/edit`) }, () => '编辑'),
      row.status === 'active'
        ? h(NPopconfirm, { onPositiveClick: () => handleSuspend(row.user_id) }, { default: () => '确认暂停？', trigger: () => h(NButton, { size: 'small', type: 'warning' }, () => '暂停') })
        : h(NButton, { size: 'small', type: 'info', onClick: () => handleResume(row.user_id) }, () => '恢复'),
      h(NPopconfirm, { onPositiveClick: () => handleDelete(row.user_id) }, { default: () => '确认删除？', trigger: () => h(NButton, { size: 'small', type: 'error' }, () => '删除') }),
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
    message.success('已删除')
    fetchData()
  } catch (e) {
    message.error('删除失败')
  }
}

async function handleSuspend(userId: string) {
  try {
    await suspendUser(userId)
    message.success('已暂停')
    fetchData()
  } catch (e) {
    message.error('操作失败')
  }
}

async function handleResume(userId: string) {
  try {
    await resumeUser(userId)
    message.success('已恢复')
    fetchData()
  } catch (e) {
    message.error('操作失败')
  }
}

async function handleExport() {
  try {
    const res = await exportTrafficCSV()
    downloadBlob(res.data, 'traffic_export.csv')
  } catch (e) {
    message.error('导出失败')
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
      <n-space>
        <n-input v-model:value="search" placeholder="搜索用户..." clearable style="width: 200px;" @clear="fetchData" @keydown.enter="fetchData" />
        <n-select v-model:value="statusFilter" :options="statusOptions" style="width: 120px;" @update:value="fetchData" />
      </n-space>
      <n-space>
        <n-button type="primary" @click="router.push('/admin/users/create')">创建用户</n-button>
        <n-button @click="handleExport">导出 CSV</n-button>
      </n-space>
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
