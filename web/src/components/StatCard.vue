<script setup lang="ts">
import { NCard, NStatistic } from 'naive-ui'

defineProps<{
  title: string
  value: string | number
}>()
</script>

<template>
  <n-card>
    <n-statistic :label="title" :value="String(value)" />
  </n-card>
</template>
