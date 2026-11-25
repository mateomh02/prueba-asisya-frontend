import { api } from '@/modules/core'
import type { AppRoute } from './route-types'

export const getRoutes = async (): Promise<AppRoute[]> => {
  const { data } = await api.get<AppRoute[]>('/routes')
  return data
}
