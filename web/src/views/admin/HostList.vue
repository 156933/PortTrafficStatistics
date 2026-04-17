<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { NDataTable, NButton, NSpace, NModal, NForm, NFormItem, NInput, NPopconfirm, NTag, useMessage } from 'naive-ui'
import { listHosts, createHost, deleteHost } from '../../api/host'
import { formatDateTime } from '../../utils/format'

const message = useMessage()
const data = ref<any[]>([])
const loading = ref(true)
const showCreate = ref(false)
const showToken = ref(false)
const newToken = ref('')
const form = ref({ host_id: '', name: '' })

const columns = [
  { title: 'Host ID', key: 'host_id', width: 160, ellipsis: { tooltip: true } },
  { title: 'Name', key: 'name', width: 160, ellipsis: { tooltip: true } },
  {
    title: 'Status', key: 'status', width: 100,
    render: (row: any) => {
      const isOnline = row.last_seen_at && (Date.now() - new Date(row.last_seen_at).getTime()) < 5 * 60 * 1000
      return h('div', { style: 'display:flex;align-items:center;gap:8px' }, [
        h('div', {
          style: `width:8px;height:8px;border-radius:50%;background:${isOnline ? '#10b981' : '#ef4444'};box-shadow:0 0 6px ${isOnline ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
        }),
        h('span', { style: `color:${isOnline ? '#10b981' : '#94a3b8'};font-weight:500;font-size:13px` }, isOnline ? 'Online' : 'Offline'),
      ])
    },
  },
  {
    title: 'Last Report', key: 'last_seen_at', width: 180,
    render: (row: any) => row.last_seen_at ? formatDateTime(row.last_seen_at) : 'Never',
  },
  {
    title: 'Actions', key: 'actions', width: 100,
    render: (row: any) => h(NPopconfirm, { onPositiveClick: () => handleDelete(row.host_id) }, {
      default: () => 'Confirm delete?',
      trigger: () => h(NButton, { size: 'small', secondary: true, type: 'error' }, () => 'Delete'),
    }),
  },
]

async function fetchData() {
  loading.value = true
  try {
    const res = await listHosts()
    data.value = res.data || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function handleCreate() {
  if (!form.value.host_id || !form.value.name) {
    message.warning('Please fill in required fields')
    return
  }
  try {
    const res = await createHost(form.value)
    newToken.value = res.data.api_token
    showCreate.value = false
    showToken.value = true
    form.value = { host_id: '', name: '' }
    fetchData()
  } catch (e: any) {
    message.error(e.response?.data?.error || 'Create failed')
  }
}

async function handleDelete(hostId: string) {
  try {
    await deleteHost(hostId)
    message.success('Deleted')
    fetchData()
  } catch (e) {
    message.error('Delete failed')
  }
}

function copyNewToken() {
  navigator.clipboard.writeText(newToken.value)
  message.success('Token copied')
}

onMounted(fetchData)
</script>

<template>
  <div>
    <div class="page-header">
      <div class="page-title">Hosts</div>
      <n-button type="primary" @click="showCreate = true">
        <template #icon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </template>
        Add Host
      </n-button>
    </div>

    <div class="table-card">
      <n-data-table :columns="columns" :data="data" :loading="loading" :bordered="false" />
    </div>

    <n-modal v-model:show="showCreate" preset="card" title="Add Host" style="max-width: 440px; border-radius: 20px;">
      <n-form label-placement="left" label-width="80">
        <n-form-item label="Host ID">
          <n-input v-model:value="form.host_id" placeholder="e.g. hk-node-01" />
        </n-form-item>
        <n-form-item label="Name">
          <n-input v-model:value="form.name" placeholder="e.g. Hong Kong 01" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button type="primary" @click="handleCreate">Create</n-button>
      </template>
    </n-modal>

    <n-modal v-model:show="showToken" preset="card" title="Host Created" style="max-width: 520px; border-radius: 20px;">
      <div class="token-warning">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="flex-shrink: 0;">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Save this API Token now. It will only be shown once!</span>
      </div>
      <div class="token-box">{{ newToken }}</div>
      <template #action>
        <n-button type="primary" @click="copyNewToken">Copy Token</n-button>
      </template>
    </n-modal>
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

.token-warning {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 12px;
  color: #92400e;
  font-size: 14px;
  font-weight: 500;
}

.token-box {
  margin-top: 16px;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 13px;
  word-break: break-all;
  color: #334155;
  line-height: 1.6;
}
</style>
