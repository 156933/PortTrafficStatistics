<script setup lang="ts">
import { h, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NLayout, NLayoutSider, NLayoutContent, NLayoutHeader, NMenu, NButton, NSpace, NIcon } from 'naive-ui'
import {
  SpeedometerOutline,
  PeopleOutline,
  ServerOutline,
  AlertCircleOutline,
  ListOutline,
  DocumentTextOutline,
} from '@vicons/ionicons5'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const collapsed = ref(false)

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  { label: '仪表盘', key: '/admin/dashboard', icon: renderIcon(SpeedometerOutline) },
  { label: '用户管理', key: '/admin/users', icon: renderIcon(PeopleOutline) },
  { label: '母机管理', key: '/admin/hosts', icon: renderIcon(ServerOutline) },
  { label: '告警配置', key: '/admin/alerts/rules', icon: renderIcon(AlertCircleOutline) },
  { label: '告警记录', key: '/admin/alerts/logs', icon: renderIcon(ListOutline) },
  { label: '操作日志', key: '/admin/audit', icon: renderIcon(DocumentTextOutline) },
]

const activeKey = computed(() => route.path)

function handleMenuUpdate(key: string) {
  router.push(key)
}

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <n-layout has-sider style="min-height: 100vh;">
    <n-layout-sider
      bordered
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div style="padding: 16px; text-align: center; font-weight: bold; font-size: 16px;">
        {{ collapsed ? 'LXC' : 'LXC 流量监控' }}
      </div>
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :value="activeKey"
        @update:value="handleMenuUpdate"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered style="padding: 12px 24px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 14px; color: #666;">管理后台</span>
        <n-space align="center">
          <span style="font-size: 14px;">{{ auth.username }}</span>
          <n-button size="small" @click="handleLogout">登出</n-button>
        </n-space>
      </n-layout-header>
      <n-layout-content style="padding: 24px;">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
