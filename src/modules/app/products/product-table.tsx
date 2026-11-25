import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSWRConfig } from 'swr'
import { toast } from 'react-toastify'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/modules/core'
import { getApiErrorMessage } from '@/modules/core/lib/api-error'
import { Table, TableBody, TableCell, TableEmpty, TableHeader, TablePagination, TableRow, TableFilters } from '@/modules/core/components/table'
import { useRole } from '@/modules/app/auth'
import { useProducts } from './use-products'
import { deleteProduct } from './product-service'
import { isProductsKey } from './use-product-form'
import type { Product } from './product-types'

const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

const baseHeaderCellTitles = ['Nombre', 'Categoría', 'Precio', 'Stock', 'Origen', 'Estado']

export const ProductTable = () => {
  const { isAdmin } = useRole()
  const { mutate } = useSWRConfig()
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const headerCellTitles = isAdmin ? [...baseHeaderCellTitles, 'Acciones'] : baseHeaderCellTitles
  const {
    products,
    total,
    page,
    pageSize,
    pageCount,
    search,
    categoryId,
    categoryOptions,
    isLoading,
    isFetching,
    error,
    setPage,
    changeSearch,
    changeCategory,
    changePageSize,
    clearFilters
  } = useProducts()

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`¿Eliminar el producto "${product.productName}"? Esta acción no se puede deshacer.`)) return
    setDeletingId(product.id)
    try {
      await deleteProduct(product.id)
      await mutate(isProductsKey)
      toast.success('Producto eliminado correctamente')
    } catch (err) {
      toast.error(getApiErrorMessage(err))
    } finally {
      setDeletingId(null)
    }
  }

  if (error) return <p className='text-destructive'>No se pudieron cargar los productos.</p>

  return (
    <section className='grid gap-4'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-black text-foreground'>Productos</h1>
          <p className='text-sm text-muted-foreground'>{total} productos registrados</p>
        </div>
        {isAdmin && (
          <Button asChild>
            <Link to='/products/new'>
              <Plus /> Nuevo producto
            </Link>
          </Button>
        )}
      </div>

      <TableFilters
        search={search}
        onSearchChange={changeSearch}
        category={categoryId}
        categoryOptions={categoryOptions}
        onCategoryChange={changeCategory}
        searchPlaceholder='Buscar por nombre…'
        onClear={clearFilters}
      />

      <Table>
        <TableHeader titles={headerCellTitles} />
        <TableBody>
          {isLoading && <TableEmpty colSpan={headerCellTitles.length}>Cargando…</TableEmpty>}
          {!isLoading && products.length === 0 && (
            <TableEmpty colSpan={headerCellTitles.length}>No hay productos para mostrar.</TableEmpty>
          )}
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell className='font-semibold'>{p.productName}</TableCell>
              <TableCell>{p.categoryName}</TableCell>
              <TableCell className='text-right'>{money.format(p.unitPrice)}</TableCell>
              <TableCell className='text-right'>{p.unitsInStock}</TableCell>
              <TableCell>
                <span
                  className={
                    p.source === 'BulkLoad'
                      ? 'rounded-full bg-brand-blue-50 px-2 py-1 text-xs font-semibold text-brand-blue-900'
                      : 'rounded-full bg-brand-magenta-50 px-2 py-1 text-xs font-semibold text-brand-magenta-900'
                  }
                >
                  {p.source === 'BulkLoad' ? 'Carga masiva' : 'Manual'}
                </span>
              </TableCell>
              <TableCell>
                <span className={p.discontinued ? 'text-brand-coral-700' : 'text-brand-purple-600'}>
                  {p.discontinued ? 'Descontinuado' : 'Activo'}
                </span>
              </TableCell>
              {isAdmin && (
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button asChild variant='outline' size='icon' aria-label='Editar producto'>
                      <Link to={`/products/${p.id}/edit`}>
                        <Pencil />
                      </Link>
                    </Button>
                    <Button
                      variant='outline'
                      size='icon'
                      aria-label='Eliminar producto'
                      disabled={deletingId === p.id}
                      onClick={() => handleDelete(p)}
                      className='text-brand-coral-700 hover:bg-brand-coral-50'
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        total={total}
        isFetching={isFetching}
        onPageChange={setPage}
        onPageSizeChange={changePageSize}
      />
    </section>
  )
}
