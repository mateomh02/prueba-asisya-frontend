import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRole } from './use-role'

export const AdminRoute = () => {
  const { isAdmin } = useRole()

  useEffect(() => {
    if (!isAdmin) toast.warn('No tienes permisos para acceder a esta sección.')
  }, [isAdmin])

  if (!isAdmin) return <Navigate to='/products' replace />
  return <Outlet />
}
