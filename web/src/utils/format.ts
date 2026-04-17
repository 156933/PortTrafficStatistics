export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  let b = bytes
  while (b >= 1024 && i < units.length - 1) {
    b /= 1024
    i++
  }
  return `${b.toFixed(2)} ${units[i]}`
}

export function formatDate(utcStr: string): string {
  return new Date(utcStr).toLocaleDateString('zh-CN')
}

export function formatDateTime(utcStr: string): string {
  return new Date(utcStr).toLocaleString('zh-CN')
}

export function gbToBytes(gb: number): number {
  return Math.round(gb * 1024 * 1024 * 1024)
}

export function bytesToGB(bytes: number): number {
  return Number((bytes / (1024 * 1024 * 1024)).toFixed(2))
}
