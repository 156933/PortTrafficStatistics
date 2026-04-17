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
  { label: '全部操作', value: '' },
  { label: '创建用户', value: 'create_user' },
  { label: '更新用户', value: 'update_user' },
  { label: '删除用户', value: 'delete_user' },
  { label: '暂停用户', value: 'suspend_user' },
  { label: '恢复用户', value: 'resume_user' },
  { label: '创建母机', value: 'create_host' },
  { label: '删除母机', value: 'delete_host' },
  { label: '创建告警规则', value: 'create_alert_rule' },
  { label: '删除告警规则', value: 'delete_alert_rule' },
]

const targetTypeOptions = [
  { label: '全部类型', value: '' },
  { label: '用户', value: 'user' },
  { label: '母机', value: 'host' },
  { label: '告警规则', value: 'alert_rule' },
]

const actionLabels: Record<string, string> = {
  create_user: '创建用户', update_user: '更新用户', delete_user: '删除用户',
  suspend_user: '暂停用户', resume_user: '恢复用户',
  create_host: '创建母机', delete_host: '删除母机',
  create_alert_rule: '创建告警规则', delete_alert_rule: '删除告警规则',
}
const actionColors: Record<string, string> = {
  create_user: 'success', update_user: 'info', delete_user: 'error',
  suspend_user: 'warning', resume_user: 'success',
  create_host: 'success', delete_host: 'error',
  create_alert_rule: 'success', delete_alert_rule: 'error',
}

const columns = [
  { title: '时间', key: 'created_at', width: 180, render: (row: any) => formatDateTime(row.created_at) },
  { title: '操作人', key: 'admin_username', width: 120 },
  { title: '操作', key: 'action', width: 150, render: (row: any) => h(NTag, { type: (actionColors[row.action] || 'default') as any, size: 'small', round: true, bordered: false }, () => actionLabels[row.action] || row.action) },
  { title: '目标类型', key: 'target_type', width: 100 },
  { title: '目标 ID', key: 'target_id', width: 140, ellipsis: { tooltip: true } },
  { title: '详情', key: 'detail', ellipsis: { tooltip: true }, render: (row: any) => row.detail || '-' },
]

async function fetchData() { loading.value = true; try { const res = await listAuditLogs({ action: actionFilter.value || undefined, target_type: targetTypeFilter.value || undefined, page: page.value, size: size.value }); data.value = res.data.data || []; total.value = res.data.total } catch (e) { console.error(e) } finally { loading.value = false } }
function handlePageChange(p: number) { page.value = p; fetchData() }
onMounted(fetchData)
</script>

<template>
  <div>
    <div class="page-header">
      <div class="page-title">操作日志</div>
      <n-space>
        <n-select v-model:value="actionFilter" :options="actionOptions" style="width: 160px;" @update:value="fetchData" />
        <n-select v-model:value="targetTypeFilter" :options="targetTypeOptions" style="width: 140px;" @update:value="fetchData" />
      </n-space>
    </div>
    <div class="table-card">
      <n-data-table :columns="columns" :data="data" :loading="loading" :pagination="{ page, pageSize: size, itemCount: total, onChange: handlePageChange }" :bordered="false" :scroll-x="900" />
    </div>
  </div>
</template>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
.page-title { font-size: 24px; font-weight: 700; color: #1e293b; }
.table-card { background: #fff; border-radius: 16px; padding: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04); }
</style>
