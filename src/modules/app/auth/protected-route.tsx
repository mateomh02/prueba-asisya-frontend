import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from './auth-store'

export const ProtectedRoute = () => {
  const token = useAuthStore((s) => s.token)
  if (!token) return <Navigate to='/login' replace />
  return <Outlet />
}

export const GuestRoute = () => {
  const token = useAuthStore((s) => s.token)
  if (token) return <Navigate to='/' replace />
  return <Outlet />
}
