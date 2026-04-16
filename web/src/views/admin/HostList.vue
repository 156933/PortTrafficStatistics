<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { NDataTable, NButton, NSpace, NModal, NForm, NFormItem, NInput, NPopconfirm, NTag, NAlert, useMessage } from 'naive-ui'
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
  { title: 'Host ID', key: 'host_id', width: 140 },
  { title: '名称', key: 'name', width: 140 },
  {
    title: '状态', key: 'status', width: 80,
    render: (row: any) => {
      const isOnline = row.last_seen_at && (Date.now() - new Date(row.last_seen_at).getTime()) < 5 * 60 * 1000
      return h(NTag, { type: isOnline ? 'success' : 'error', size: 'small' }, () => isOnline ? '在线' : '离线')
    },
  },
  {
    title: '最后上报', key: 'last_seen_at', width: 180,
    render: (row: any) => row.last_seen_at ? formatDateTime(row.last_seen_at) : '从未上报',
  },
  {
    title: '操作', key: 'actions', width: 160,
    render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', onClick: () => copyToken(row.host_id) }, () => '复制 Token'),
      h(NPopconfirm, { onPositiveClick: () => handleDelete(row.host_id) }, { default: () => '确认删除？', trigger: () => h(NButton, { size: 'small', type: 'error' }, () => '删除') }),
    ]),
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
    message.warning('请填写必填字段')
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
    message.error(e.response?.data?.error || '创建失败')
  }
}

async function handleDelete(hostId: string) {
  try {
    await deleteHost(hostId)
    message.success('已删除')
    fetchData()
  } catch (e) {
    message.error('删除失败')
  }
}

function copyNewToken() {
  navigator.clipboard.writeText(newToken.value)
  message.success('已复制')
}

function copyToken(hostId: string) {
  const host = data.value.find((h: any) => h.host_id === hostId)
  if (host?.api_token) {
    navigator.clipboard.writeText(host.api_token)
    message.success('Token 已复制')
  } else {
    message.warning('Token 仅在创建时显示')
  }
}

onMounted(fetchData)
</script>

<template>
  <div>
    <n-space justify="space-between" style="margin-bottom: 16px;">
      <h3 style="margin: 0;">母机列表</h3>
      <n-button type="primary" @click="showCreate = true">添加母机</n-button>
    </n-space>

    <n-data-table :columns="columns" :data="data" :loading="loading" :bordered="false" />

    <n-modal v-model:show="showCreate" preset="card" title="添加母机" style="max-width: 400px;">
      <n-form label-placement="left" label-width="80">
        <n-form-item label="Host ID">
          <n-input v-model:value="form.host_id" placeholder="如 hk-node-01" />
        </n-form-item>
        <n-form-item label="名称">
          <n-input v-model:value="form.name" placeholder="如 香港节点1" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button type="primary" @click="handleCreate">创建</n-button>
      </template>
    </n-modal>

    <n-modal v-model:show="showToken" preset="card" title="母机创建成功" style="max-width: 500px;">
      <n-alert type="warning" title="请保存 API Token">
        此 Token 仅显示一次，请立即复制保存！
      </n-alert>
      <div style="margin-top: 12px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-family: monospace; word-break: break-all;">
        {{ newToken }}
      </div>
      <template #action>
        <n-button type="primary" @click="copyNewToken">复制 Token</n-button>
      </template>
    </n-modal>
  </div>
</template>
