import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useSWRConfig } from 'swr'
import { toast } from 'react-toastify'
import { getApiErrorMessage } from '@/modules/core/lib/api-error'
import { emptyProductValues, productSchema, type ProductFormValues } from './product-schema'
import { createProduct, updateProduct } from './product-service'

export const isProductsKey = (key: unknown) => typeof key === 'string' && key.startsWith('/Products')

export const useProductForm = (productId?: number, initialValues?: ProductFormValues) => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues ?? emptyProductValues
  })

  const onSubmit = async (values: ProductFormValues) => {
    try {
      if (productId) {
        await updateProduct(productId, values)
        toast.success('Producto actualizado correctamente')
      } else {
        await createProduct(values)
        toast.success('Producto creado correctamente')
      }
      await mutate(isProductsKey)
      navigate('/products')
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  return { form, onSubmit }
}
