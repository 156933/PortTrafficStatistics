<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { NDataTable, NButton, NSpace, NModal, NForm, NFormItem, NInput, NInputNumber, NSelect, NSwitch, NPopconfirm, NTag, useMessage } from 'naive-ui'
import { listAlertRules, createAlertRule, updateAlertRule, deleteAlertRule } from '../../api/alert'
import { formatBytes, gbToBytes } from '../../utils/format'

const message = useMessage()
const data = ref<any[]>([])
const loading = ref(true)
const showForm = ref(false)
const form = ref({ user_id: '', type: 'traffic_limit', threshold_gb: 100, notify_method: 'log', webhook_url: '' })

const typeOptions = [
  { label: '流量超限', value: 'traffic_limit' },
  { label: '母机离线', value: 'host_offline' },
]

const notifyOptions = [
  { label: '仅记录', value: 'log' },
  { label: 'Webhook', value: 'webhook' },
]

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '用户', key: 'user_id', width: 100, render: (row: any) => row.user_id || '全局' },
  { title: '类型', key: 'type', width: 100, render: (row: any) => row.type === 'traffic_limit' ? '流量超限' : '母机离线' },
  { title: '阈值', key: 'threshold_bytes', width: 120, render: (row: any) => row.threshold_bytes ? formatBytes(row.threshold_bytes) : '-' },
  { title: '通知', key: 'notify_method', width: 100 },
  {
    title: '启用', key: 'enabled', width: 80,
    render: (row: any) => h(NTag, { type: row.enabled ? 'success' : 'default', size: 'small' }, () => row.enabled ? '启用' : '禁用'),
  },
  {
    title: '操作', key: 'actions', width: 160,
    render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', onClick: () => toggleEnabled(row) }, () => row.enabled ? '禁用' : '启用'),
      h(NPopconfirm, { onPositiveClick: () => handleDelete(row.id) }, { default: () => '确认删除？', trigger: () => h(NButton, { size: 'small', type: 'error' }, () => '删除') }),
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
    message.success('创建成功')
    showForm.value = false
    form.value = { user_id: '', type: 'traffic_limit', threshold_gb: 100, notify_method: 'log', webhook_url: '' }
    fetchData()
  } catch (e: any) {
    message.error(e.response?.data?.error || '创建失败')
  }
}

async function toggleEnabled(row: any) {
  try {
    await updateAlertRule(row.id, { enabled: !row.enabled })
    fetchData()
  } catch (e) {
    message.error('操作失败')
  }
}

async function handleDelete(id: number) {
  try {
    await deleteAlertRule(id)
    message.success('已删除')
    fetchData()
  } catch (e) {
    message.error('删除失败')
  }
}

onMounted(fetchData)
</script>

<template>
  <div>
    <n-space justify="space-between" style="margin-bottom: 16px;">
      <h3 style="margin: 0;">告警规则</h3>
      <n-button type="primary" @click="showForm = true">添加规则</n-button>
    </n-space>

    <n-data-table :columns="columns" :data="data" :loading="loading" :bordered="false" />

    <n-modal v-model:show="showForm" preset="card" title="添加告警规则" style="max-width: 450px;">
      <n-form label-placement="left" label-width="80">
        <n-form-item label="用户">
          <n-input v-model:value="form.user_id" placeholder="留空为全局" />
        </n-form-item>
        <n-form-item label="类型">
          <n-select v-model:value="form.type" :options="typeOptions" />
        </n-form-item>
        <n-form-item label="阈值 (GB)">
          <n-input-number v-model:value="form.threshold_gb" :min="0" :precision="2" />
        </n-form-item>
        <n-form-item label="通知方式">
          <n-select v-model:value="form.notify_method" :options="notifyOptions" />
        </n-form-item>
        <n-form-item v-if="form.notify_method === 'webhook'" label="Webhook">
          <n-input v-model:value="form.webhook_url" placeholder="https://..." />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button type="primary" @click="handleCreate">创建</n-button>
      </template>
    </n-modal>
  </div>
</template>
