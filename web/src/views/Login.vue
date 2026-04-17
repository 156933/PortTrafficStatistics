<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const message = useMessage()
const username = ref('')
const password = ref('')
const loading = ref(false)

if (auth.isLoggedIn) {
  router.replace('/admin/dashboard')
}

async function handleLogin() {
  if (!username.value || !password.value) {
    message.warning('请输入用户名和密码')
    return
  }
  loading.value = true
  try {
    await auth.login(username.value, password.value)
    message.success('登录成功')
    router.push('/admin/dashboard')
  } catch (e: any) {
    message.error(e.response?.data?.error || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-bg-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
    <div class="login-card">
      <div class="login-header">
        <div class="login-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
          </svg>
        </div>
        <h1 class="login-title">流量监控</h1>
        <p class="login-subtitle">管理员登录</p>
      </div>
      <n-form @submit.prevent="handleLogin">
        <n-form-item label="用户名" :show-feedback="false" style="margin-bottom: 20px;">
          <n-input v-model:value="username" placeholder="请输入用户名" size="large" />
        </n-form-item>
        <n-form-item label="密码" :show-feedback="false" style="margin-bottom: 28px;">
          <n-input v-model:value="password" type="password" placeholder="请输入密码" show-password-on="click" size="large" @keydown.enter="handleLogin" />
        </n-form-item>
        <n-button type="primary" block size="large" :loading="loading" @click="handleLogin" style="font-weight: 600;">
          登 录
        </n-button>
      </n-form>
      <div class="login-footer">
        <router-link to="/" class="back-link">返回公开看板</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
  position: relative;
  overflow: hidden;
}

.login-bg-shapes {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.shape-1 { width: 400px; height: 400px; background: #6366f1; top: -100px; right: -100px; }
.shape-2 { width: 300px; height: 300px; background: #8b5cf6; bottom: -50px; left: -50px; }
.shape-3 { width: 200px; height: 200px; background: #06b6d4; top: 50%; left: 50%; transform: translate(-50%, -50%); }

.login-card {
  width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;
}

.login-header { text-align: center; margin-bottom: 36px; }

.login-logo {
  width: 56px; height: 56px; border-radius: 16px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white; display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
}

.login-title { font-size: 24px; font-weight: 700; color: #1e293b; margin: 0 0 4px; }
.login-subtitle { font-size: 14px; color: #94a3b8; margin: 0; }
.login-footer { text-align: center; margin-top: 24px; }
.back-link { font-size: 13px; color: #94a3b8; text-decoration: none; transition: color 0.2s; }
.back-link:hover { color: #6366f1; }
</style>
