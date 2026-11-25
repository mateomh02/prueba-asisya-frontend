import { Button } from '@/modules/core'
import { useAuthStore } from '@/modules/app/auth'

export default function Products() {
  const { user, logout } = useAuthStore((s) => ({ user: s.user, logout: s.logout }))
  return (
    <main className='grid min-h-screen place-items-center gap-4 p-6 text-center'>
      <h1 className='text-3xl font-black text-foreground'>Productos</h1>
      <p className='text-muted-foreground'>Sesión iniciada como {user?.email} ({user?.role})</p>
      <Button variant='outline' onClick={logout}>Cerrar sesión</Button>
    </main>
  )
}
