import { api } from '@/modules/core'
import type { LoginFormValues } from './login-schema'

export interface LoginResponse {
  token: string
  email: string
  roleId: number
  role: string
}

export const login = async (values: LoginFormValues): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/Auth/login', values)
  return data
}
