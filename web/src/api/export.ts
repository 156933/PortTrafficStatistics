import api from './client'

export function exportTrafficCSV(start?: string, end?: string) {
  return api.get('/admin/export/traffic', {
    params: { start, end },
    responseType: 'blob',
  })
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
