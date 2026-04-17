<script setup lang="ts">
import { NDataTable } from 'naive-ui'
import { formatBytes } from '../utils/format'

defineProps<{
  data: Array<{ date: string; rx_bytes: number; tx_bytes: number; total_bytes: number }>
}>()

const columns = [
  { title: 'Date', key: 'date' },
  { title: 'Download', key: 'rx_bytes', render: (row: any) => formatBytes(row.rx_bytes) },
  { title: 'Upload', key: 'tx_bytes', render: (row: any) => formatBytes(row.tx_bytes) },
  { title: 'Total', key: 'total_bytes', render: (row: any) => formatBytes(row.total_bytes) },
]
</script>

<template>
  <n-data-table :columns="columns" :data="data" :bordered="false" size="small" />
</template>
