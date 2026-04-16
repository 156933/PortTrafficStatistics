<script setup lang="ts">
import { computed } from 'vue'
import { NProgress } from 'naive-ui'
import { formatBytes } from '../utils/format'

const props = defineProps<{
  used: number
  limit: number
}>()

const percentage = computed(() => {
  if (props.limit <= 0) return 0
  return Math.min(100, Math.round((props.used / props.limit) * 10000) / 100)
})

const status = computed(() => {
  if (percentage.value >= 80) return 'error'
  if (percentage.value >= 60) return 'warning'
  return 'success'
})

const label = computed(() => {
  if (props.limit <= 0) return formatBytes(props.used)
  return `${formatBytes(props.used)} / ${formatBytes(props.limit)}`
})
</script>

<template>
  <div>
    <n-progress
      v-if="limit > 0"
      type="line"
      :percentage="percentage"
      :status="status"
      :indicator-placement="'inside'"
    />
    <div style="font-size: 12px; color: #666; margin-top: 4px;">{{ label }}</div>
  </div>
</template>
