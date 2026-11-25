import { useCallback, useState } from 'react'
import useSWR from 'swr'
import type { PagedResult, Product } from './product-types'
import type { Category } from '@/modules/app/category/category-types'
import { PAGE_SIZE_OPTIONS } from '@/modules/core/lib/consts'

export const useProducts = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0])
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const query = new URLSearchParams({ page: String(page), pageSize: String(pageSize) })
  if (search) query.set('search', search)
  if (categoryId) query.set('categoryId', categoryId)

  const { data, error, isLoading, isValidating } = useSWR<PagedResult<Product>>(`/Products?${query.toString()}`)
  const { data: categories } = useSWR<Category[]>('/Category')

  const total = data?.total ?? 0
  const pageCount = Math.max(1, Math.ceil(total / pageSize))

  const changeSearch = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const changeCategory = (value: string) => {
    setCategoryId(value)
    setPage(1)
  }

  const changePageSize = (value: number) => {
    setPageSize(value)
    setPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setCategoryId('')
    setPage(1)
  }

  return {
    products: data?.items ?? [],
    total,
    page,
    pageSize,
    pageCount,
    search,
    categoryId,
    categoryOptions: (categories ?? []).map((c) => ({ label: c.name, value: String(c.id) })),
    isLoading,
    isFetching: isValidating,
    error,
    setPage,
    changeSearch,
    changeCategory,
    changePageSize,
    clearFilters
  }
}
