import { api } from '@/modules/core'
import type { CategoryFormValues } from './category-schema'

export const createCategory = async (values: CategoryFormValues) => {
  const { data } = await api.post('/Category', {
    name: values.name,
    description: values.description || null,
    picture: values.picture || null
  })
  return data
}
