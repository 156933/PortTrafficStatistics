<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NCard, NForm, NFormItem, NInput, NInputNumber, NSelect, NButton, useMessage } from 'naive-ui'
import { getUser, createUser, updateUser } from '../../api/user'
import { listHosts } from '../../api/host'
import { gbToBytes, bytesToGB } from '../../utils/format'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const loading = ref(false)
const hosts = ref<any[]>([])

const isEdit = computed(() => !!route.params.id)
const title = computed(() => isEdit.value ? '编辑用户' : '创建用户')

const form = ref({
  user_id: '',
  name: '',
  host_id: '',
  port_start: 10001,
  port_end: 10020,
  traffic_limit_gb: 100,
  reset_day: 1,
  note: '',
})

const resetDayOptions = Array.from({ length: 28 }, (_, i) => ({ label: `${i + 1} 号`, value: i + 1 }))

const hostOptions = computed(() => hosts.value.map((h: any) => ({ label: `${h.name} (${h.host_id})`, value: h.host_id })))

async function loadHosts() {
  try {
    const res = await listHosts()
    hosts.value = res.data || []
  } catch (e) {
    console.error(e)
  }
}

async function loadUser() {
  if (!isEdit.value) return
  try {
    const res = await getUser(route.params.id as string)
    const u = res.data.user
    form.value = {
      user_id: u.user_id,
      name: u.name,
      host_id: u.host_id,
      port_start: u.port_start,
      port_end: u.port_end,
      traffic_limit_gb: bytesToGB(u.traffic_limit_bytes),
      reset_day: u.reset_day,
      note: u.note,
    }
  } catch (e) {
    message.error('加载用户失败')
  }
}

async function handleSubmit() {
  if (!form.value.user_id || !form.value.name || !form.value.host_id) {
    message.warning('请填写必填字段')
    return
  }
  loading.value = true
  try {
    const data = {
      user_id: form.value.user_id,
      name: form.value.name,
      host_id: form.value.host_id,
      port_start: form.value.port_start,
      port_end: form.value.port_end,
      traffic_limit_bytes: gbToBytes(form.value.traffic_limit_gb),
      reset_day: form.value.reset_day,
      note: form.value.note,
    }
    if (isEdit.value) {
      await updateUser(route.params.id as string, data)
      message.success('更新成功')
    } else {
      await createUser(data)
      message.success('创建成功')
    }
    router.push('/admin/users')
  } catch (e: any) {
    message.error(e.response?.data?.error || '操作失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadHosts()
  loadUser()
})
</script>

<template>
  <n-card :title="title" style="max-width: 600px;">
    <n-form label-placement="left" label-width="100">
      <n-form-item label="User ID">
        <n-input v-model:value="form.user_id" :disabled="isEdit" placeholder="如 user01" />
      </n-form-item>
      <n-form-item label="名称">
        <n-input v-model:value="form.name" placeholder="用户显示名称" />
      </n-form-item>
      <n-form-item label="母机">
        <n-select v-model:value="form.host_id" :options="hostOptions" placeholder="选择母机" />
      </n-form-item>
      <n-form-item label="起始端口">
        <n-input-number v-model:value="form.port_start" :min="1" :max="65535" />
      </n-form-item>
      <n-form-item label="结束端口">
        <n-input-number v-model:value="form.port_end" :min="1" :max="65535" />
      </n-form-item>
      <n-form-item label="流量上限 (GB)">
        <n-input-number v-model:value="form.traffic_limit_gb" :min="0" :precision="2" />
      </n-form-item>
      <n-form-item label="重置日">
        <n-select v-model:value="form.reset_day" :options="resetDayOptions" />
      </n-form-item>
      <n-form-item label="备注">
        <n-input v-model:value="form.note" type="textarea" :rows="2" />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" :loading="loading" @click="handleSubmit">{{ isEdit ? '保存' : '创建' }}</n-button>
        <n-button style="margin-left: 12px;" @click="router.back()">取消</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>
