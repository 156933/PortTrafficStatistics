<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { NDataTable, NButton, NSpace, NModal, NForm, NFormItem, NInput, NInputNumber, NSelect, NPopconfirm, NTag, useMessage } from 'naive-ui'
import { listAlertRules, createAlertRule, updateAlertRule, deleteAlertRule } from '../../api/alert'
import { formatBytes, gbToBytes } from '../../utils/format'

const message = useMessage()
const data = ref<any[]>([])
const loading = ref(true)
const showForm = ref(false)
const form = ref({ user_id: '', type: 'traffic_limit', threshold_gb: 100, notify_method: 'log', webhook_url: '' })

const typeOptions = [
  { label: 'Traffic Limit', value: 'traffic_limit' },
  { label: 'Host Offline', value: 'host_offline' },
]

const notifyOptions = [
  { label: 'Log Only', value: 'log' },
  { label: 'Webhook', value: 'webhook' },
]

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: 'User', key: 'user_id', width: 120, render: (row: any) => row.user_id || 'Global' },
  {
    title: 'Type', key: 'type', width: 120,
    render: (row: any) => h(NTag, { size: 'small', round: true, bordered: false, type: row.type === 'traffic_limit' ? 'warning' : 'error' },
      () => row.type === 'traffic_limit' ? 'Traffic Limit' : 'Host Offline'),
  },
  { title: 'Threshold', key: 'threshold_bytes', width: 120, render: (row: any) => row.threshold_bytes ? formatBytes(row.threshold_bytes) : '-' },
  { title: 'Notify', key: 'notify_method', width: 100 },
  {
    title: 'Enabled', key: 'enabled', width: 80,
    render: (row: any) => h('div', {
      style: `width:8px;height:8px;border-radius:50%;background:${row.enabled ? '#10b981' : '#94a3b8'};box-shadow:0 0 6px ${row.enabled ? 'rgba(16,185,129,0.4)' : 'none'}`,
    }),
  },
  {
    title: 'Actions', key: 'actions', width: 160,
    render: (row: any) => h(NSpace, { size: 8 }, () => [
      h(NButton, { size: 'small', secondary: true, onClick: () => toggleEnabled(row) }, () => row.enabled ? 'Disable' : 'Enable'),
      h(NPopconfirm, { onPositiveClick: () => handleDelete(row.id) }, {
        default: () => 'Confirm delete?',
        trigger: () => h(NButton, { size: 'small', secondary: true, type: 'error' }, () => 'Delete'),
      }),
    ]),
  },
]

async function fetchData() {
  loading.value = true
  try {
    const res = await listAlertRules()
    data.value = res.data || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function handleCreate() {
  try {
    await createAlertRule({
      user_id: form.value.user_id || null,
      type: form.value.type,
      threshold_bytes: gbToBytes(form.value.threshold_gb),
      notify_method: form.value.notify_method,
      webhook_url: form.value.webhook_url,
    })
    message.success('Created')
    showForm.value = false
    form.value = { user_id: '', type: 'traffic_limit', threshold_gb: 100, notify_method: 'log', webhook_url: '' }
    fetchData()
  } catch (e: any) {
    message.error(e.response?.data?.error || 'Create failed')
  }
}

async function toggleEnabled(row: any) {
  try {
    await updateAlertRule(row.id, { enabled: !row.enabled })
    fetchData()
  } catch (e) {
    message.error('Operation failed')
  }
}

async function handleDelete(id: number) {
  try {
    await deleteAlertRule(id)
    message.success('Deleted')
    fetchData()
  } catch (e) {
    message.error('Delete failed')
  }
}

onMounted(fetchData)
</script>

<template>
  <div>
    <div class="page-header">
      <div class="page-title">Alert Rules</div>
      <n-button type="primary" @click="showForm = true">
        <template #icon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </template>
        Add Rule
      </n-button>
    </div>

    <div class="table-card">
      <n-data-table :columns="columns" :data="data" :loading="loading" :bordered="false" />
    </div>

    <n-modal v-model:show="showForm" preset="card" title="New Alert Rule" style="max-width: 480px; border-radius: 20px;">
      <n-form label-placement="left" label-width="100">
        <n-form-item label="User">
          <n-input v-model:value="form.user_id" placeholder="Leave empty for global" />
        </n-form-item>
        <n-form-item label="Type">
          <n-select v-model:value="form.type" :options="typeOptions" />
        </n-form-item>
        <n-form-item label="Threshold (GB)">
          <n-input-number v-model:value="form.threshold_gb" :min="0" :precision="2" style="width: 100%;" />
        </n-form-item>
        <n-form-item label="Notify">
          <n-select v-model:value="form.notify_method" :options="notifyOptions" />
        </n-form-item>
        <n-form-item v-if="form.notify_method === 'webhook'" label="Webhook URL">
          <n-input v-model:value="form.webhook_url" placeholder="https://..." />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button type="primary" @click="handleCreate">Create</n-button>
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
</style>
