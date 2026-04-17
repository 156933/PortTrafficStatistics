<script setup lang="ts">
import { computed } from 'vue'
import { formatBytes } from '../utils/format'

const props = defineProps<{
  used: number
  limit: number
}>()

const percentage = computed(() => {
  if (props.limit <= 0) return 0
  return Math.min(100, Math.round((props.used / props.limit) * 10000) / 100)
})

const barColor = computed(() => {
  if (percentage.value >= 80) return 'linear-gradient(90deg, #f43f5e, #fb7185)'
  if (percentage.value >= 60) return 'linear-gradient(90deg, #f59e0b, #fbbf24)'
  return 'linear-gradient(90deg, #6366f1, #818cf8)'
})

const label = computed(() => {
  if (props.limit <= 0) return formatBytes(props.used)
  return `${formatBytes(props.used)} / ${formatBytes(props.limit)}`
})
</script>

<template>
  <div class="usage-bar-wrapper">
    <div class="usage-bar-track">
      <div
        class="usage-bar-fill"
        :style="{ width: (limit > 0 ? percentage : 0) + '%', background: barColor }"
      />
    </div>
    <div class="usage-bar-info">
      <span class="usage-label">{{ label }}</span>
      <span v-if="limit > 0" class="usage-percent" :style="{ color: percentage >= 80 ? '#f43f5e' : percentage >= 60 ? '#f59e0b' : '#6366f1' }">
        {{ percentage }}%
      </span>
    </div>
  </div>
</template>

<style scoped>
.usage-bar-wrapper {
  width: 100%;
}

.usage-bar-track {
  width: 100%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}

.usage-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
  min-width: 0;
}

.usage-bar-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
}

.usage-label {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
}

.usage-percent {
  font-size: 12px;
  font-weight: 700;
}
</style>
