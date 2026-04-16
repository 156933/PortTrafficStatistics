import api from './client'

export function getTrafficOverview(start?: string, end?: string) {
  return api.get('/admin/traffic/overview', { params: { start, end } })
}

export function getUserTraffic(userId: string) {
  return api.get(`/admin/traffic/user/${userId}`)
}
