import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../ui'
import { PAGE_SIZE_OPTIONS } from '../../lib/consts'

interface TablePaginationProps {
  page: number
  pageCount: number
  pageSize: number
  total: number
  isFetching?: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export const TablePagination = ({
  page,
  pageCount,
  pageSize,
  total,
  isFetching,
  onPageChange,
  onPageSizeChange
}: TablePaginationProps) => {
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1
  const last = Math.min(page * pageSize, total)

  return (
    <div className='flex flex-col-reverse items-center justify-between gap-4 sm:flex-row'>
      <span className='text-sm text-muted-foreground'>
        {first}-{last} de {total} registros
      </span>

      <div className='flex flex-col items-center gap-4 sm:flex-row'>
        <label className='flex items-center gap-2 text-sm text-muted-foreground'>
          Registros por página
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className='h-9 rounded-xl border border-border bg-background px-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <span className='text-sm text-muted-foreground'>
          Página {page} de {pageCount}
        </span>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            aria-label='Página anterior'
            disabled={page <= 1 || isFetching}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant='outline'
            size='icon'
            aria-label='Página siguiente'
            disabled={page >= pageCount || isFetching}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
