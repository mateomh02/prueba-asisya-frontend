import { Link } from 'react-router-dom'
import { ArrowRight, Package, Tags, type LucideIcon } from 'lucide-react'
import { useAuthStore } from '@/modules/app/auth'

interface HomeCardProps {
  to: string
  title: string
  description: string
  icon: LucideIcon
}

const HomeCard = ({ to, title, description, icon: Icon }: HomeCardProps) => (
  <Link
    to={to}
    className='group grid gap-4 rounded-2xl border border-border bg-background p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg'
  >
    <span className='grid size-14 place-items-center rounded-xl bg-gradient-to-br from-brand-purple-600 to-brand-magenta-600 text-white'>
      <Icon size={26} />
    </span>
    <div className='grid gap-1'>
      <h2 className='text-xl font-black text-foreground'>{title}</h2>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
    <span className='flex items-center gap-2 text-sm font-semibold text-brand-purple-600 group-hover:text-brand-magenta-600'>
      Ir ahora <ArrowRight size={16} />
    </span>
  </Link>
)

export const HomePage = () => {
  const user = useAuthStore((s) => s.user)

  return (
    <section className='grid gap-8'>
      <div className='grid gap-2'>
        <span className='text-sm font-semibold text-brand-magenta-600'>Bienvenido</span>
        <h1 className='text-3xl font-black text-foreground'>{user?.email}</h1>
        <p className='text-muted-foreground'>Sesión iniciada con rol {user?.role}. ¿Qué quieres gestionar hoy?</p>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <HomeCard
          to='/products'
          title='Productos'
          description='Consulta, busca y gestiona el catálogo de productos.'
          icon={Package}
        />
        <HomeCard
          to='/category'
          title='Categorías'
          description='Revisa las categorías disponibles y sus imágenes.'
          icon={Tags}
        />
      </div>
    </section>
  )
}
