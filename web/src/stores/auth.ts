import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../api/client'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const username = ref<string | null>(localStorage.getItem('username'))

  const isLoggedIn = computed(() => !!token.value)

  async function login(user: string, password: string) {
    const res = await api.post('/auth/login', { username: user, password })
    token.value = res.data.token
    username.value = user
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('username', user)
  }

  function logout() {
    token.value = null
    username.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  return { token, username, isLoggedIn, login, logout }
})
