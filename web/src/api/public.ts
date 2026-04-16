import api from './client'

export function getPublicBoard() {
  return api.get('/public/board')
}

export function getUserDaily(userId: string) {
  return api.get(`/public/user/${userId}/daily`)
}
