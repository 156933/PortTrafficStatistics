<script setup lang="ts">
import { NDataTable } from 'naive-ui'
import { formatBytes } from '../utils/format'

defineProps<{
  data: Array<{ date: string; rx_bytes: number; tx_bytes: number; total_bytes: number }>
}>()

const columns = [
  { title: '日期', key: 'date' },
  { title: '下载', key: 'rx_bytes', render: (row: any) => formatBytes(row.rx_bytes) },
  { title: '上传', key: 'tx_bytes', render: (row: any) => formatBytes(row.tx_bytes) },
  { title: '合计', key: 'total_bytes', render: (row: any) => formatBytes(row.total_bytes) },
]
</script>

<template>
  <n-data-table :columns="columns" :data="data" :bordered="false" size="small" />
</template>
