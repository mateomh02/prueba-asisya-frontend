import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useSWRConfig } from 'swr'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { getApiErrorMessage } from '@/modules/core/lib/api-error'
import { categorySchema, type CategoryFormValues } from './category-schema'
import { createCategory } from './category-service'

export const useCategoryForm = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', description: '', picture: '' }
  })

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      await createCategory(values)
      await mutate('/Category')
      toast.success('Categoría creada correctamente')
      navigate('/category')
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
        form.setError('name', { message: getApiErrorMessage(error) })
      } else {
        toast.error(getApiErrorMessage(error))
      }
    }
  }

  return { form, onSubmit }
}
