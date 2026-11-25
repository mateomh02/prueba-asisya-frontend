import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { api } from '@/modules/core'
import { useAuthStore } from '@/modules/app/auth'
import { getRoutes } from '@/modules/app/routes'
import { AppHeader } from './app-header'

const fetcher = async (url: string) => {
  const { data } = await api.get(url)
  return data
}

export const AppLayout = () => {
  const token = useAuthStore((s) => s.token)
  const routesCount = useAuthStore((s) => s.routes.length)
  const setRoutes = useAuthStore((s) => s.setRoutes)

  useEffect(() => {
    if (token && routesCount === 0) {
      getRoutes().then(setRoutes).catch(() => undefined)
    }
  }, [token, routesCount, setRoutes])

  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false, shouldRetryOnError: false }}>
      <div className='min-h-screen bg-muted'>
        <AppHeader />
        <main className='mx-auto max-w-7xl p-6'>
          <Outlet />
        </main>
      </div>
    </SWRConfig>
  )
}
