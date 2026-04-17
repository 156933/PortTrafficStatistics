<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { NDataTable, NButton, NSelect, NTag, useMessage } from 'naive-ui'
import { listAlertLogs, resolveAlertLog } from '../../api/alert'
import { formatDateTime } from '../../utils/format'

const message = useMessage()
const data = ref<any[]>([])
const loading = ref(true)
const total = ref(0)
const page = ref(1)
const size = ref(20)
const resolvedFilter = ref<string | null>(null)

const filterOptions = [{ label: '全部', value: '' }, { label: '未处理', value: 'false' }, { label: '已处理', value: 'true' }]

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '触发时间', key: 'triggered_at', width: 180, render: (row: any) => formatDateTime(row.triggered_at) },
  { title: '用户', key: 'user_id', width: 120, render: (row: any) => row.user_id || '-' },
  { title: '告警内容', key: 'message', ellipsis: { tooltip: true } },
  { title: '状态', key: 'resolved', width: 120, render: (row: any) => h(NTag, { type: row.resolved ? 'success' : 'warning', size: 'small', round: true, bordered: false }, () => row.resolved ? '已处理' : '未处理') },
  { title: '操作', key: 'actions', width: 120, render: (row: any) => row.resolved ? null : h(NButton, { size: 'small', type: 'primary', secondary: true, onClick: () => handleResolve(row.id) }, () => '标记处理') },
]

async function fetchData() { loading.value = true; try { const res = await listAlertLogs({ resolved: resolvedFilter.value || undefined, page: page.value, size: size.value }); data.value = res.data.data || []; total.value = res.data.total } catch (e) { console.error(e) } finally { loading.value = false } }
async function handleResolve(id: number) { try { await resolveAlertLog(id); message.success('已标记处理'); fetchData() } catch (e) { message.error('操作失败') } }
function handlePageChange(p: number) { page.value = p; fetchData() }
onMounted(fetchData)
</script>

<template>
  <div>
    <div class="page-header">
      <div class="page-title">告警记录</div>
      <n-select v-model:value="resolvedFilter" :options="filterOptions" style="width: 140px;" @update:value="fetchData" />
    </div>
    <div class="table-card">
      <n-data-table :columns="columns" :data="data" :loading="loading" :pagination="{ page, pageSize: size, itemCount: total, onChange: handlePageChange }" :bordered="false" />
    </div>
  </div>
</template>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-title { font-size: 24px; font-weight: 700; color: #1e293b; }
.table-card { background: #fff; border-radius: 16px; padding: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04); }
</style>
