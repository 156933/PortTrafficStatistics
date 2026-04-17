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
  { label: '全部', value: '' },
  { label: '正常', value: 'active' },
  { label: '已暂停', value: 'suspended' },
]

const columns = [
  { title: '用户 ID', key: 'user_id', width: 120, ellipsis: { tooltip: true } },
  { title: '名称', key: 'name', width: 120, ellipsis: { tooltip: true } },
  { title: '母机', key: 'host_id', width: 120, ellipsis: { tooltip: true } },
  { title: '端口范围', key: 'port', width: 130, render: (row: any) => `${row.port_start} - ${row.port_end}` },
  {
    title: '状态', key: 'status', width: 100,
    render: (row: any) => h(NTag, {
      type: row.status === 'active' ? 'success' : row.status === 'suspended' ? 'warning' : 'default',
      size: 'small', round: true,
    }, () => row.status === 'active' ? '正常' : row.status === 'suspended' ? '已暂停' : row.status),
  },
  {
    title: '操作', key: 'actions', width: 220, fixed: 'right' as const,
    render: (row: any) => h(NSpace, { size: 8 }, () => [
      h(NButton, { size: 'small', secondary: true, onClick: () => router.push(`/admin/users/${row.user_id}/edit`) }, () => '编辑'),
      row.status === 'active'
        ? h(NPopconfirm, { onPositiveClick: () => handleSuspend(row.user_id) }, {
            default: () => '确认暂停该用户？',
            trigger: () => h(NButton, { size: 'small', secondary: true, type: 'warning' }, () => '暂停'),
          })
        : h(NButton, { size: 'small', secondary: true, type: 'info', onClick: () => handleResume(row.user_id) }, () => '恢复'),
      h(NPopconfirm, { onPositiveClick: () => handleDelete(row.user_id) }, {
        default: () => '确认删除该用户？',
        trigger: () => h(NButton, { size: 'small', secondary: true, type: 'error' }, () => '删除'),
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
  } catch (e) { console.error(e) } finally { loading.value = false }
}

async function handleDelete(userId: string) {
  try { await deleteUser(userId); message.success('已删除'); fetchData() } catch (e) { message.error('删除失败') }
}
async function handleSuspend(userId: string) {
  try { await suspendUser(userId); message.success('已暂停'); fetchData() } catch (e) { message.error('操作失败') }
}
async function handleResume(userId: string) {
  try { await resumeUser(userId); message.success('已恢复'); fetchData() } catch (e) { message.error('操作失败') }
}
async function handleExport() {
  try { const res = await exportTrafficCSV(); downloadBlob(res.data, 'traffic_export.csv') } catch (e) { message.error('导出失败') }
}
function handlePageChange(p: number) { page.value = p; fetchData() }

onMounted(fetchData)
</script>

<template>
  <div>
    <div class="page-header">
      <div class="page-title">用户管理</div>
      <n-space>
        <n-button type="primary" @click="router.push('/admin/users/create')">创建用户</n-button>
        <n-button secondary @click="handleExport">导出 CSV</n-button>
      </n-space>
    </div>
    <div class="filter-bar">
      <n-input v-model:value="search" placeholder="搜索用户..." clearable style="width: 240px;" @clear="fetchData" @keydown.enter="fetchData" />
      <n-select v-model:value="statusFilter" :options="statusOptions" style="width: 140px;" @update:value="fetchData" />
    </div>
    <div class="table-card">
      <n-data-table :columns="columns" :data="data" :loading="loading" :pagination="{ page, pageSize: size, itemCount: total, onChange: handlePageChange }" :bordered="false" :scroll-x="800" />
    </div>
  </div>
</template>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-title { font-size: 24px; font-weight: 700; color: #1e293b; }
.filter-bar { display: flex; gap: 12px; margin-bottom: 16px; }
.table-card { background: #fff; border-radius: 16px; padding: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04); }
</style>
