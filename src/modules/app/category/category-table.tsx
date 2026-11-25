import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import useSWR from 'swr'
import { Button } from '@/modules/core'
import { useRole } from '@/modules/app/auth'
import type { Category } from './category-types'

export const CategoryTable = () => {
  const { isAdmin } = useRole()
  const { data: categories, error, isLoading } = useSWR<Category[]>('/Category')

  if (error) return <p className='text-destructive'>No se pudieron cargar las categorías.</p>

  return (
    <section className='grid gap-4'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-black text-foreground'>Categorías</h1>
          <p className='text-sm text-muted-foreground'>{categories?.length ?? 0} categorías</p>
        </div>
        {isAdmin && (
          <Button asChild>
            <Link to='/category/new'>
              <Plus /> Nueva categoría
            </Link>
          </Button>
        )}
      </div>

      {isLoading && <p className='text-muted-foreground'>Cargando…</p>}

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {categories?.map((c) => (
          <article key={c.id} className='grid gap-3 rounded-2xl border border-border bg-background p-5 shadow-sm'>
            {c.picture && <img src={c.picture} alt={c.name} className='h-32 w-full rounded-xl object-cover' />}
            <h2 className='text-lg font-bold text-brand-purple-900'>{c.name}</h2>
            <p className='text-sm text-muted-foreground'>{c.description ?? 'Sin descripción'}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
