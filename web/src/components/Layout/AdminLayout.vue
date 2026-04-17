<script setup lang="ts">
import { h, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NLayout, NLayoutSider, NLayoutContent, NMenu, NIcon, NAvatar } from 'naive-ui'
import {
  SpeedometerOutline,
  PeopleOutline,
  ServerOutline,
  AlertCircleOutline,
  ListOutline,
  DocumentTextOutline,
  LogOutOutline,
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

const activeKey = computed(() => {
  const path = route.path
  if (path.startsWith('/admin/users')) return '/admin/users'
  if (path.startsWith('/admin/alerts/rules')) return '/admin/alerts/rules'
  if (path.startsWith('/admin/alerts/logs')) return '/admin/alerts/logs'
  return path
})

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
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="68"
      :width="240"
      show-trigger="bar"
      :native-scrollbar="false"
      class="admin-sider"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="sider-logo">
        <div class="sider-logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
          </svg>
        </div>
        <transition name="fade">
          <span v-if="!collapsed" class="sider-logo-text">Traffic Monitor</span>
        </transition>
      </div>

      <n-menu
        :collapsed="collapsed"
        :collapsed-width="68"
        :collapsed-icon-size="20"
        :options="menuOptions"
        :value="activeKey"
        @update:value="handleMenuUpdate"
      />

      <div class="sider-footer">
        <div class="user-info" :class="{ collapsed }">
          <n-avatar :size="32" round style="background: linear-gradient(135deg, #6366f1, #8b5cf6); flex-shrink: 0;">
            {{ auth.username?.charAt(0)?.toUpperCase() }}
          </n-avatar>
          <transition name="fade">
            <div v-if="!collapsed" class="user-detail">
              <span class="user-name">{{ auth.username }}</span>
              <span class="user-role">Administrator</span>
            </div>
          </transition>
        </div>
        <div class="logout-btn" @click="handleLogout" :title="collapsed ? '登出' : ''">
          <n-icon :size="18"><log-out-outline /></n-icon>
          <transition name="fade">
            <span v-if="!collapsed" style="margin-left: 8px;">登出</span>
          </transition>
        </div>
      </div>
    </n-layout-sider>

    <n-layout>
      <n-layout-content class="admin-content">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.admin-sider {
  background: #0f172a !important;
  display: flex;
  flex-direction: column;
}

.admin-sider :deep(.n-layout-sider-scroll-container) {
  display: flex;
  flex-direction: column;
}

.admin-sider :deep(.n-menu) {
  --n-item-text-color: #94a3b8;
  --n-item-text-color-hover: #e2e8f0;
  --n-item-text-color-active: #ffffff;
  --n-item-text-color-active-hover: #ffffff;
  --n-item-icon-color: #64748b;
  --n-item-icon-color-hover: #e2e8f0;
  --n-item-icon-color-active: #ffffff;
  --n-item-icon-color-active-hover: #ffffff;
  --n-item-color-hover: rgba(99, 102, 241, 0.08);
  --n-item-color-active: rgba(99, 102, 241, 0.15);
  --n-item-color-active-hover: rgba(99, 102, 241, 0.2);
  --n-border-radius: 10px;
  padding: 0 12px;
}

.admin-sider :deep(.n-menu-item-content) {
  border-radius: 10px !important;
}

.admin-sider :deep(.n-layout-toggle-bar) {
  background-color: #334155 !important;
}

.sider-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 20px 24px;
  overflow: hidden;
  white-space: nowrap;
}

.sider-logo-icon {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sider-logo-text {
  font-size: 16px;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.02em;
}

.sider-footer {
  margin-top: auto;
  padding: 16px 12px;
  border-top: 1px solid #1e293b;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  margin-bottom: 8px;
  overflow: hidden;
}

.user-info.collapsed {
  justify-content: center;
  padding: 8px 0;
}

.user-detail {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 12px;
  color: #64748b;
}

.logout-btn {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  color: #64748b;
  cursor: pointer;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.2s;
  overflow: hidden;
  white-space: nowrap;
}

.logout-btn:hover {
  color: #f87171;
  background: rgba(248, 113, 113, 0.08);
}

.admin-content {
  background: #f1f5f9;
  padding: 32px;
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
