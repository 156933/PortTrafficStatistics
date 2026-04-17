import api from './client'

export function getPublicBoard() {
  return api.get('/public/board')
}

export function getPublicDailyStats() {
  return api.get('/public/daily-stats')
}

export function getUserDaily(userId: string) {
  return api.get(`/public/user/${userId}/daily`)
}
