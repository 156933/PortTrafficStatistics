<script setup lang="ts">
const props = defineProps<{
  title: string
  value: string | number
  icon?: string
  color?: string
}>()

const gradients: Record<string, string> = {
  indigo: 'linear-gradient(135deg, #6366f1, #818cf8)',
  emerald: 'linear-gradient(135deg, #10b981, #34d399)',
  amber: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  rose: 'linear-gradient(135deg, #f43f5e, #fb7185)',
}

const bgColors: Record<string, string> = {
  indigo: 'rgba(99, 102, 241, 0.08)',
  emerald: 'rgba(16, 185, 129, 0.08)',
  amber: 'rgba(245, 158, 11, 0.08)',
  rose: 'rgba(244, 63, 94, 0.08)',
}
</script>

<template>
  <div class="stat-card">
    <div class="stat-icon" :style="{ background: gradients[color || 'indigo'] }">
      <svg v-if="icon === 'users'" width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg v-else-if="icon === 'server'" width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="8" rx="2" stroke="currentColor" stroke-width="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2" stroke="currentColor" stroke-width="2"/>
        <circle cx="6" cy="6" r="1" fill="currentColor"/>
        <circle cx="6" cy="18" r="1" fill="currentColor"/>
      </svg>
      <svg v-else-if="icon === 'traffic'" width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg v-else-if="icon === 'alert'" width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="stat-info">
      <span class="stat-title">{{ title }}</span>
      <span class="stat-value">{{ value }}</span>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.stat-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.stat-icon {
  width: 52px;
  height: 52px;
  min-width: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat-title {
  font-size: 13px;
  color: #94a3b8;
  font-weight: 500;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
