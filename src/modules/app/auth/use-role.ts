import { defineRole } from '@/modules/core'
import { useAuthStore } from './auth-store'

export const useRole = () => {
  const role = useAuthStore((s) => s.user?.role)
  return defineRole(role)
}
