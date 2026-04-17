<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NSpin } from 'naive-ui'
import api from '../../api/client'
import { getTrafficOverview } from '../../api/traffic'
import { formatBytes } from '../../utils/format'
import StatCard from '../../components/StatCard.vue'

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

const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#ec4899', '#14b8a6', '#3b82f6', '#a855f7']

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
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderColor: 'transparent',
        textStyle: { color: '#e2e8f0', fontSize: 13 },
        formatter: (params: any) => `<div style="font-weight:600">${params[0].name}</div><div>${formatBytes(params[0].value)}</div>`,
      },
      grid: { left: 100, right: 24, top: 12, bottom: 30 },
      xAxis: {
        type: 'value',
        axisLabel: { formatter: (v: number) => formatBytes(v), color: '#94a3b8', fontSize: 12 },
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'category',
        data: top10.map((e: any) => e.name).reverse(),
        axisLabel: { color: '#475569', fontSize: 12 },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: [{
        type: 'bar',
        data: top10.map((e: any, i: number) => ({
          value: e.total_bytes,
          itemStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: colors[top10.length - 1 - i] || '#6366f1' },
                { offset: 1, color: (colors[top10.length - 1 - i] || '#6366f1') + '99' },
              ],
            },
            borderRadius: [0, 6, 6, 0],
          },
        })).reverse(),
        barWidth: 20,
      }],
    }

    const groups: Record<string, number> = {}
    for (const entry of trafficOverview.value) {
      groups[entry.name || entry.user_id] = (groups[entry.name || entry.user_id] || 0) + entry.total_bytes
    }
    pieChartOption.value = {
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderColor: 'transparent',
        textStyle: { color: '#e2e8f0', fontSize: 13 },
        formatter: (p: any) => `<div style="font-weight:600">${p.name}</div><div>${formatBytes(p.value)} (${p.percent}%)</div>`,
      },
      series: [{
        type: 'pie',
        radius: ['45%', '72%'],
        center: ['50%', '50%'],
        itemStyle: { borderColor: '#fff', borderWidth: 3, borderRadius: 6 },
        label: {
          formatter: '{b}',
          color: '#64748b',
          fontSize: 12,
        },
        data: Object.entries(groups).map(([k, v], i) => ({
          name: k,
          value: v,
          itemStyle: { color: colors[i % colors.length] },
        })),
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
    <div class="page-title">Dashboard</div>

    <div class="stats-grid">
      <stat-card title="Active Users" :value="stats.total_users" icon="users" color="indigo" />
      <stat-card title="Online Hosts" :value="stats.online_hosts" icon="server" color="emerald" />
      <stat-card title="Today's Traffic" :value="stats.today_traffic_human" icon="traffic" color="amber" />
      <stat-card title="Unresolved Alerts" :value="stats.unresolved_alerts" icon="alert" color="rose" />
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-title">Traffic Ranking - Top 10</div>
        <v-chart v-if="trafficOverview.length > 0" :option="topChartOption" style="height: 320px;" autoresize />
        <div v-else class="chart-empty">No data</div>
      </div>
      <div class="chart-card">
        <div class="chart-title">User Traffic Distribution</div>
        <v-chart v-if="trafficOverview.length > 0" :option="pieChartOption" style="height: 320px;" autoresize />
        <div v-else class="chart-empty">No data</div>
      </div>
    </div>
  </n-spin>
</template>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.chart-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.chart-title {
  font-size: 15px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 16px;
}

.chart-empty {
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 14px;
}
</style>
