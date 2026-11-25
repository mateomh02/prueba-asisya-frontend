import { Table, TableBody, TableCell, TableEmpty, TableHeader, TablePagination, TableRow, TableFilters } from '@/modules/core/components/table'
import { useProducts } from './use-products'

const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

const headerCellTitles = ['Nombre', 'Categoría', 'Precio', 'Stock', 'Origen', 'Estado']

export const ProductTable = () => {
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

  if (error) return <p className='text-destructive'>No se pudieron cargar los productos.</p>

  return (
    <section className='grid gap-4'>
      <div>
        <h1 className='text-2xl font-black text-foreground'>Productos</h1>
        <p className='text-sm text-muted-foreground'>{total} productos registrados</p>
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
