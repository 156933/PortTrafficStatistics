<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NForm, NFormItem, NInput, NInputNumber, NSelect, NButton, NSpace, useMessage } from 'naive-ui'
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

const form = ref({ user_id: '', name: '', host_id: '', port_start: 10001, port_end: 10020, traffic_limit_gb: 100, reset_day: 1, note: '' })
const resetDayOptions = Array.from({ length: 28 }, (_, i) => ({ label: `每月 ${i + 1} 号`, value: i + 1 }))
const hostOptions = computed(() => hosts.value.map((h: any) => ({ label: `${h.name} (${h.host_id})`, value: h.host_id })))

async function loadHosts() { try { const res = await listHosts(); hosts.value = res.data || [] } catch (e) { console.error(e) } }
async function loadUser() {
  if (!isEdit.value) return
  try {
    const res = await getUser(route.params.id as string)
    const u = res.data.user
    form.value = { user_id: u.user_id, name: u.name, host_id: u.host_id, port_start: u.port_start, port_end: u.port_end, traffic_limit_gb: bytesToGB(u.traffic_limit_bytes), reset_day: u.reset_day, note: u.note }
  } catch (e) { message.error('加载用户失败') }
}

async function handleSubmit() {
  if (!form.value.user_id || !form.value.name || !form.value.host_id) { message.warning('请填写必填字段'); return }
  loading.value = true
  try {
    const data = { ...form.value, traffic_limit_bytes: gbToBytes(form.value.traffic_limit_gb) }
    if (isEdit.value) { await updateUser(route.params.id as string, data); message.success('更新成功') }
    else { await createUser(data); message.success('创建成功') }
    router.push('/admin/users')
  } catch (e: any) { message.error(e.response?.data?.error || '操作失败') } finally { loading.value = false }
}

onMounted(() => { loadHosts(); loadUser() })
</script>

<template>
  <div>
    <div class="page-title">{{ title }}</div>
    <div class="form-card">
      <n-form label-placement="left" label-width="120" style="max-width: 520px;">
        <n-form-item label="用户 ID"><n-input v-model:value="form.user_id" :disabled="isEdit" placeholder="如 user01" /></n-form-item>
        <n-form-item label="名称"><n-input v-model:value="form.name" placeholder="显示名称" /></n-form-item>
        <n-form-item label="母机"><n-select v-model:value="form.host_id" :options="hostOptions" placeholder="选择母机" /></n-form-item>
        <n-form-item label="起始端口"><n-input-number v-model:value="form.port_start" :min="1" :max="65535" style="width:100%;" /></n-form-item>
        <n-form-item label="结束端口"><n-input-number v-model:value="form.port_end" :min="1" :max="65535" style="width:100%;" /></n-form-item>
        <n-form-item label="流量上限 (GB)"><n-input-number v-model:value="form.traffic_limit_gb" :min="0" :precision="2" style="width:100%;" /></n-form-item>
        <n-form-item label="重置日"><n-select v-model:value="form.reset_day" :options="resetDayOptions" /></n-form-item>
        <n-form-item label="备注"><n-input v-model:value="form.note" type="textarea" :rows="3" /></n-form-item>
        <n-form-item label=" ">
          <n-space>
            <n-button type="primary" :loading="loading" @click="handleSubmit">{{ isEdit ? '保存' : '创建' }}</n-button>
            <n-button secondary @click="router.back()">取消</n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<style scoped>
.page-title { font-size: 24px; font-weight: 700; color: #1e293b; margin-bottom: 24px; }
.form-card { background: #fff; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04); }
</style>
