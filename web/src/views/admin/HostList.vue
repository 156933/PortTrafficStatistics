<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { NDataTable, NButton, NSpace, NModal, NForm, NFormItem, NInput, NPopconfirm, useMessage } from 'naive-ui'
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
  { title: '母机 ID', key: 'host_id', width: 160, ellipsis: { tooltip: true } },
  { title: '名称', key: 'name', width: 160, ellipsis: { tooltip: true } },
  {
    title: '状态', key: 'status', width: 100,
    render: (row: any) => {
      const isOnline = row.last_seen_at && (Date.now() - new Date(row.last_seen_at).getTime()) < 5 * 60 * 1000
      return h('div', { style: 'display:flex;align-items:center;gap:8px' }, [
        h('div', { style: `width:8px;height:8px;border-radius:50%;background:${isOnline ? '#10b981' : '#ef4444'};box-shadow:0 0 6px ${isOnline ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}` }),
        h('span', { style: `color:${isOnline ? '#10b981' : '#94a3b8'};font-weight:500;font-size:13px` }, isOnline ? '在线' : '离线'),
      ])
    },
  },
  { title: '最后上报', key: 'last_seen_at', width: 180, render: (row: any) => row.last_seen_at ? formatDateTime(row.last_seen_at) : '从未上报' },
  {
    title: '操作', key: 'actions', width: 100,
    render: (row: any) => h(NPopconfirm, { onPositiveClick: () => handleDelete(row.host_id) }, {
      default: () => '确认删除该母机？',
      trigger: () => h(NButton, { size: 'small', secondary: true, type: 'error' }, () => '删除'),
    }),
  },
]

async function fetchData() { loading.value = true; try { const res = await listHosts(); data.value = res.data || [] } catch (e) { console.error(e) } finally { loading.value = false } }
async function handleCreate() {
  if (!form.value.host_id || !form.value.name) { message.warning('请填写必填字段'); return }
  try {
    const res = await createHost(form.value); newToken.value = res.data.api_token
    showCreate.value = false; showToken.value = true; form.value = { host_id: '', name: '' }; fetchData()
  } catch (e: any) { message.error(e.response?.data?.error || '创建失败') }
}
async function handleDelete(hostId: string) { try { await deleteHost(hostId); message.success('已删除'); fetchData() } catch (e) { message.error('删除失败') } }
function copyNewToken() { navigator.clipboard.writeText(newToken.value); message.success('已复制到剪贴板') }
onMounted(fetchData)
</script>

<template>
  <div>
    <div class="page-header">
      <div class="page-title">母机管理</div>
      <n-button type="primary" @click="showCreate = true">添加母机</n-button>
    </div>
    <div class="table-card">
      <n-data-table :columns="columns" :data="data" :loading="loading" :bordered="false" />
    </div>

    <n-modal v-model:show="showCreate" preset="card" title="添加母机" style="max-width: 440px; border-radius: 20px;">
      <n-form label-placement="left" label-width="80">
        <n-form-item label="母机 ID"><n-input v-model:value="form.host_id" placeholder="如 hk-node-01" /></n-form-item>
        <n-form-item label="名称"><n-input v-model:value="form.name" placeholder="如 香港节点1" /></n-form-item>
      </n-form>
      <template #action><n-button type="primary" @click="handleCreate">创建</n-button></template>
    </n-modal>

    <n-modal v-model:show="showToken" preset="card" title="母机创建成功" style="max-width: 520px; border-radius: 20px;">
      <div class="token-warning">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>请立即保存 API Token，此 Token 仅显示一次！</span>
      </div>
      <div class="token-box">{{ newToken }}</div>
      <template #action><n-button type="primary" @click="copyNewToken">复制 Token</n-button></template>
    </n-modal>
  </div>
</template>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-title { font-size: 24px; font-weight: 700; color: #1e293b; }
.table-card { background: #fff; border-radius: 16px; padding: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04); }
.token-warning { display: flex; align-items: center; gap: 10px; padding: 14px 16px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; color: #92400e; font-size: 14px; font-weight: 500; }
.token-box { margin-top: 16px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; font-family: 'SF Mono', 'Fira Code', monospace; font-size: 13px; word-break: break-all; color: #334155; line-height: 1.6; }
</style>
