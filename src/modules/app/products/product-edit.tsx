import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { getApiErrorMessage } from '@/modules/core/lib/api-error'
import { ProductForm } from './product-form'
import type { ProductDetail } from './product-types'
import type { ProductFormValues } from './product-schema'

export const ProductEdit = () => {
  const { id } = useParams()
  const productId = Number(id)
  const { data, error, isLoading } = useSWR<ProductDetail>(Number.isInteger(productId) ? `/Products/${productId}` : null)

  if (isLoading) return <p className='text-muted-foreground'>Cargando producto…</p>
  if (error || !data) return <p className='text-destructive'>{getApiErrorMessage(error, 'Producto no encontrado.')}</p>

  const initialValues: ProductFormValues = {
    productName: data.productName,
    categoryId: String(data.categoryId),
    supplierId: data.supplierId ? String(data.supplierId) : '',
    quantityPerUnit: data.quantityPerUnit ?? '',
    unitPrice: String(data.unitPrice),
    unitsInStock: String(data.unitsInStock),
    unitsOnOrder: String(data.unitsOnOrder),
    reorderLevel: String(data.reorderLevel),
    discontinued: data.discontinued
  }

  return <ProductForm key={data.id} title='Editar producto' productId={data.id} initialValues={initialValues} />
}
