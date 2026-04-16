import api from './client'

export function listHosts() {
  return api.get('/admin/hosts')
}

export function createHost(data: { host_id: string; name: string }) {
  return api.post('/admin/hosts', data)
}

export function updateHost(hostId: string, data: { name: string }) {
  return api.put(`/admin/hosts/${hostId}`, data)
}

export function deleteHost(hostId: string) {
  return api.delete(`/admin/hosts/${hostId}`)
}
