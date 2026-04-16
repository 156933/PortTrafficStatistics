import api from './client'

export function listUsers(params: { status?: string; search?: string; page?: number; size?: number }) {
  return api.get('/admin/users', { params })
}

export function getUser(userId: string) {
  return api.get(`/admin/users/${userId}`)
}

export function createUser(data: any) {
  return api.post('/admin/users', data)
}

export function updateUser(userId: string, data: any) {
  return api.put(`/admin/users/${userId}`, data)
}

export function deleteUser(userId: string) {
  return api.delete(`/admin/users/${userId}`)
}

export function suspendUser(userId: string) {
  return api.post(`/admin/users/${userId}/suspend`)
}

export function resumeUser(userId: string) {
  return api.post(`/admin/users/${userId}/resume`)
}
