<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { formatBytes } from '../utils/format'

use([CanvasRenderer, LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent])

const props = defineProps<{
  data: Array<{ date: string; rx_bytes: number; tx_bytes: number; total_bytes: number }>
  type?: 'line' | 'bar'
}>()

const option = computed(() => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderColor: 'transparent',
    textStyle: { color: '#e2e8f0', fontSize: 13 },
    formatter: (params: any) => {
      let html = `<div style="font-weight:600;margin-bottom:6px">${params[0].axisValue}</div>`
      for (const p of params) {
        html += `<div style="display:flex;align-items:center;gap:6px;margin:3px 0">${p.marker} <span>${p.seriesName}</span> <span style="font-weight:600;margin-left:auto">${formatBytes(p.value)}</span></div>`
      }
      return html
    },
  },
  legend: {
    data: ['Download', 'Upload'],
    icon: 'roundRect',
    itemWidth: 12,
    itemHeight: 4,
    textStyle: { color: '#94a3b8', fontSize: 12 },
  },
  grid: { left: 80, right: 20, top: 48, bottom: 30 },
  xAxis: {
    type: 'category',
    data: props.data.map((d) => d.date),
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisLabel: { color: '#94a3b8', fontSize: 12 },
    axisTick: { show: false },
  },
  yAxis: {
    type: 'value',
    axisLabel: { formatter: (v: number) => formatBytes(v), color: '#94a3b8', fontSize: 12 },
    splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  series: [
    {
      name: 'Download',
      type: props.type || 'line',
      data: props.data.map((d) => d.rx_bytes),
      smooth: true,
      showSymbol: false,
      lineStyle: { width: 2.5 },
      itemStyle: { color: '#6366f1' },
      areaStyle: props.type !== 'bar' ? {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(99,102,241,0.15)' },
            { offset: 1, color: 'rgba(99,102,241,0)' },
          ],
        },
      } : undefined,
    },
    {
      name: 'Upload',
      type: props.type || 'line',
      data: props.data.map((d) => d.tx_bytes),
      smooth: true,
      showSymbol: false,
      lineStyle: { width: 2.5 },
      itemStyle: { color: '#10b981' },
      areaStyle: props.type !== 'bar' ? {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(16,185,129,0.15)' },
            { offset: 1, color: 'rgba(16,185,129,0)' },
          ],
        },
      } : undefined,
    },
  ],
}))
</script>

<template>
  <v-chart :option="option" style="height: 320px; width: 100%;" autoresize />
</template>
