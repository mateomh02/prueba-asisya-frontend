import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppRoute } from '@/modules/app/routes/route-types'

export interface AuthUser {
  email: string
  role: string
  roleId: number
}

interface AuthState {
  token: string | null
  user: AuthUser | null
  routes: AppRoute[]
  setSession: (token: string, user: AuthUser) => void
  setRoutes: (routes: AppRoute[]) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      routes: [],
      setSession: (token, user) => set({ token, user }),
      setRoutes: (routes) => set({ routes }),
      logout: () => set({ token: null, user: null, routes: [] })
    }),
    { name: 'auth' }
  )
)
