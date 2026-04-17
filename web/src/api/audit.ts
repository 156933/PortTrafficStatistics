import api from './client'

export function listAuditLogs(params: { action?: string; target_type?: string; page?: number; size?: number }) {
  return api.get('/admin/audit', { params })
}
