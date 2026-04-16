import api from './client'

export function listAlertRules() {
  return api.get('/admin/alerts/rules')
}

export function createAlertRule(data: any) {
  return api.post('/admin/alerts/rules', data)
}

export function updateAlertRule(id: number, data: any) {
  return api.put(`/admin/alerts/rules/${id}`, data)
}

export function deleteAlertRule(id: number) {
  return api.delete(`/admin/alerts/rules/${id}`)
}

export function listAlertLogs(params: { resolved?: string; page?: number; size?: number }) {
  return api.get('/admin/alerts/logs', { params })
}

export function resolveAlertLog(id: number) {
  return api.post(`/admin/alerts/logs/${id}/resolve`)
}
