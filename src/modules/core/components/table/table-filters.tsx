import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button, Input } from '../../ui'

export interface FilterOption {
  label: string
  value: string
}

interface TableFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  category?: string
  categoryOptions?: FilterOption[]
  onCategoryChange?: (value: string) => void
  searchPlaceholder?: string
  debounceTime?: number
  onClear: () => void
}

export const TableFilters = ({
  search,
  onSearchChange,
  category = '',
  categoryOptions = [],
  onCategoryChange,
  searchPlaceholder = 'Buscar…',
  debounceTime = 400,
  onClear
}: TableFiltersProps) => {
  const [term, setTerm] = useState(search)

  useEffect(() => {
    const timeout = setTimeout(() => onSearchChange(term.trim()), debounceTime)
    return () => clearTimeout(timeout)
  }, [term, debounceTime, onSearchChange])

  const hasFilters = term !== '' || category !== ''

  const handleClear = () => {
    setTerm('')
    onClear()
  }

  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
      <div className='relative w-full sm:max-w-xs'>
        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={searchPlaceholder}
          className='pl-9'
        />
      </div>

      {onCategoryChange && (
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className='h-11 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        >
          <option value=''>Todas las categorías</option>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {hasFilters && (
        <Button variant='ghost' size='sm' onClick={handleClear}>
          <X /> Limpiar
        </Button>
      )}
    </div>
  )
}
