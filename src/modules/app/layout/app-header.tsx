import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut, Package, ShieldCheck, Tags, type LucideIcon } from 'lucide-react'
import { Button, cn } from '@/modules/core'
import { useAuthStore } from '@/modules/app/auth'

const navMeta: Record<string, { label: string; icon: LucideIcon }> = {
  products: { label: 'Productos', icon: Package },
  category: { label: 'Categorías', icon: Tags }
}

export const AppHeader = () => {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const routes = useAuthStore((s) => s.routes)
  const logout = useAuthStore((s) => s.logout)

  const navItems = routes.filter((r) => r.name.endsWith('-view') && navMeta[r.component])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className='sticky top-0 z-30 bg-gradient-to-r from-brand-purple-900 via-brand-purple-600 to-brand-magenta-600 text-white shadow-lg'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4'>
        <div className='flex items-center gap-8'>
          <span className='text-xl font-black tracking-tight'>asisya</span>
          <nav className='flex items-center gap-2'>
            {navItems.map((item) => {
              const meta = navMeta[item.component]
              const Icon = meta.icon
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
                      isActive ? 'bg-white text-brand-purple-900' : 'text-white/80 hover:bg-white/10 hover:text-white'
                    )
                  }
                >
                  <Icon size={16} />
                  {meta.label}
                </NavLink>
              )
            })}
          </nav>
        </div>

        <div className='flex items-center gap-3'>
          <div className='hidden items-center gap-3 rounded-xl bg-white/10 px-4 py-2 sm:flex'>
            <ShieldCheck size={18} className='text-brand-coral-500' />
            <div className='grid leading-tight'>
              <span className='text-sm font-semibold'>{user?.email}</span>
              <span className='text-xs text-white/70'>{user?.role}</span>
            </div>
          </div>
          <Button variant='ghost' size='icon' onClick={handleLogout} aria-label='Cerrar sesión' className='text-white hover:bg-white/10'>
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </header>
  )
}
