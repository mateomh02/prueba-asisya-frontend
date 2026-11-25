import axios from 'axios'
import { API_URL } from './lib/consts'
import { useAuthStore } from '@/modules/app/auth/auth-store'

export const api = axios.create({
  baseURL: API_URL
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
