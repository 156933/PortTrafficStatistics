<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NGrid, NGridItem, NSpin } from 'naive-ui'
import api from '../../api/client'
import { getTrafficOverview } from '../../api/traffic'
import { formatBytes } from '../../utils/format'
import StatCard from '../../components/StatCard.vue'
import TrafficChart from '../../components/TrafficChart.vue'

import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent])

const loading = ref(true)
const stats = ref({ total_users: 0, online_hosts: 0, today_traffic: 0, today_traffic_human: '0 B', unresolved_alerts: 0 })
const trafficOverview = ref<any[]>([])

const topChartOption = ref({})
const pieChartOption = ref({})

async function fetchData() {
  try {
    const [statsRes, overviewRes] = await Promise.all([
      api.get('/admin/dashboard'),
      getTrafficOverview(),
    ])
    stats.value = statsRes.data
    trafficOverview.value = overviewRes.data || []

    const top10 = trafficOverview.value.slice(0, 10)
    topChartOption.value = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => `${params[0].name}: ${formatBytes(params[0].value)}`,
      },
      grid: { left: 100, right: 20, top: 10, bottom: 30 },
      xAxis: { type: 'value', axisLabel: { formatter: (v: number) => formatBytes(v) } },
      yAxis: { type: 'category', data: top10.map((e: any) => e.name).reverse() },
      series: [{ type: 'bar', data: top10.map((e: any) => e.total_bytes).reverse(), itemStyle: { color: '#2080f0' } }],
    }

    const groups: Record<string, number> = {}
    for (const entry of trafficOverview.value) {
      const key = entry.user_id
      groups[key] = (groups[key] || 0) + entry.total_bytes
    }
    pieChartOption.value = {
      tooltip: { trigger: 'item', formatter: (p: any) => `${p.name}: ${formatBytes(p.value)}` },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        data: Object.entries(groups).map(([k, v]) => ({ name: k, value: v })),
      }],
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <n-spin :show="loading">
    <n-grid :x-gap="16" :y-gap="16" cols="2 m:4" responsive="screen">
      <n-grid-item>
        <stat-card title="活跃用户" :value="stats.total_users" />
      </n-grid-item>
      <n-grid-item>
        <stat-card title="在线母机" :value="stats.online_hosts" />
      </n-grid-item>
      <n-grid-item>
        <stat-card title="今日流量" :value="stats.today_traffic_human" />
      </n-grid-item>
      <n-grid-item>
        <stat-card title="未处理告警" :value="stats.unresolved_alerts" />
      </n-grid-item>
    </n-grid>

    <n-grid :x-gap="16" :y-gap="16" cols="1 m:2" responsive="screen" style="margin-top: 16px;">
      <n-grid-item>
        <div style="background: #fff; padding: 16px; border-radius: 4px;">
          <h3 style="margin: 0 0 12px;">流量排行 Top 10</h3>
          <v-chart v-if="trafficOverview.length > 0" :option="topChartOption" style="height: 300px;" autoresize />
          <div v-else style="height: 300px; display: flex; align-items: center; justify-content: center; color: #999;">暂无数据</div>
        </div>
      </n-grid-item>
      <n-grid-item>
        <div style="background: #fff; padding: 16px; border-radius: 4px;">
          <h3 style="margin: 0 0 12px;">用户流量占比</h3>
          <v-chart v-if="trafficOverview.length > 0" :option="pieChartOption" style="height: 300px;" autoresize />
          <div v-else style="height: 300px; display: flex; align-items: center; justify-content: center; color: #999;">暂无数据</div>
        </div>
      </n-grid-item>
    </n-grid>
  </n-spin>
</template>
