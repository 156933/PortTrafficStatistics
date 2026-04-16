<script setup lang="ts">
</script>

<template>
  <div style="min-height: 100vh; background: #f5f7f9;">
    <div style="background: #fff; padding: 16px 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.1); margin-bottom: 24px;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
        <h1 style="margin: 0; font-size: 20px; color: #333;">LXC 流量监控</h1>
        <router-link to="/login" style="color: #2080f0; text-decoration: none; font-size: 14px;">管理后台</router-link>
      </div>
    </div>
    <div style="max-width: 1200px; margin: 0 auto; padding: 0 16px;">
      <router-view />
    </div>
  </div>
</template>
