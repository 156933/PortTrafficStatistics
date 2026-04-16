<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { NDataTable, NSpace, NSelect, NButton } from 'naive-ui'
import { listAuditLogs } from '../../api/audit'
import { formatDateTime } from '../../utils/format'

const data = ref<any[]>([])
const loading = ref(true)
const total = ref(0)
const page = ref(1)
const size = ref(50)
const actionFilter = ref<string | null>(null)
const targetTypeFilter = ref<string | null>(null)
const expandedKeys = ref<number[]>([])

const actionOptions = [
  { label: '全部', value: '' },
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
  { label: '全部', value: '' },
  { label: '用户', value: 'user' },
  { label: '母机', value: 'host' },
  { label: '告警规则', value: 'alert_rule' },
]

const columns = [
  { title: '时间', key: 'created_at', width: 180, render: (row: any) => formatDateTime(row.created_at) },
  { title: '操作人', key: 'admin_username', width: 100 },
  { title: '动作', key: 'action', width: 120 },
  { title: '目标类型', key: 'target_type', width: 100 },
  { title: '目标 ID', key: 'target_id', width: 120 },
  {
    title: '详情', key: 'detail', width: 100,
    render: (row: any) => row.detail
      ? h(NButton, { size: 'small', text: true, onClick: () => toggleExpand(row.id) }, () => expandedKeys.value.includes(row.id) ? '收起' : '查看')
      : '-',
  },
]

function toggleExpand(id: number) {
  const idx = expandedKeys.value.indexOf(id)
  if (idx >= 0) {
    expandedKeys.value.splice(idx, 1)
  } else {
    expandedKeys.value.push(id)
  }
}

const rowProps = (row: any) => ({
  style: expandedKeys.value.includes(row.id) ? '' : '',
})

async function fetchData() {
  loading.value = true
  try {
    const res = await listAuditLogs({ action: actionFilter.value || undefined, target_type: targetTypeFilter.value || undefined, page: page.value, size: size.value })
    data.value = res.data.data || []
    total.value = res.data.total
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
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
      <h3 style="margin: 0;">操作日志</h3>
      <n-space>
        <n-select v-model:value="actionFilter" :options="actionOptions" style="width: 140px;" placeholder="动作" @update:value="fetchData" />
        <n-select v-model:value="targetTypeFilter" :options="targetTypeOptions" style="width: 120px;" placeholder="目标" @update:value="fetchData" />
      </n-space>
    </n-space>

    <n-data-table
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="{ page: page, pageSize: size, itemCount: total, onChange: handlePageChange }"
      :bordered="false"
      :row-props="rowProps"
    />

    <div v-for="row in data.filter((r: any) => expandedKeys.includes(r.id))" :key="'detail-' + row.id" style="margin-top: 8px; padding: 12px; background: #f9f9f9; border-radius: 4px; font-family: monospace; font-size: 12px; white-space: pre-wrap;">
      {{ row.detail }}
    </div>
  </div>
</template>
