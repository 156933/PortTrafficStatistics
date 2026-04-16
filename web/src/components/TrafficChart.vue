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
    formatter: (params: any) => {
      let html = `${params[0].axisValue}<br/>`
      for (const p of params) {
        html += `${p.marker} ${p.seriesName}: ${formatBytes(p.value)}<br/>`
      }
      return html
    },
  },
  legend: { data: ['下载', '上传'] },
  grid: { left: 80, right: 20, top: 40, bottom: 30 },
  xAxis: {
    type: 'category',
    data: props.data.map((d) => d.date),
  },
  yAxis: {
    type: 'value',
    axisLabel: { formatter: (v: number) => formatBytes(v) },
  },
  series: [
    {
      name: '下载',
      type: props.type || 'line',
      data: props.data.map((d) => d.rx_bytes),
      smooth: true,
      itemStyle: { color: '#2080f0' },
    },
    {
      name: '上传',
      type: props.type || 'line',
      data: props.data.map((d) => d.tx_bytes),
      smooth: true,
      itemStyle: { color: '#18a058' },
    },
  ],
}))
</script>

<template>
  <v-chart :option="option" style="height: 300px; width: 100%;" autoresize />
</template>
