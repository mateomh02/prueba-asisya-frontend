import { api } from '@/modules/core'
import type { ProductFormValues } from './product-schema'

export const toProductPayload = (v: ProductFormValues) => ({
  productName: v.productName,
  categoryId: Number(v.categoryId),
  supplierId: v.supplierId ? Number(v.supplierId) : null,
  quantityPerUnit: v.quantityPerUnit || null,
  unitPrice: Number(v.unitPrice),
  unitsInStock: Number(v.unitsInStock),
  unitsOnOrder: Number(v.unitsOnOrder),
  reorderLevel: Number(v.reorderLevel),
  discontinued: v.discontinued
})

export const createProduct = async (values: ProductFormValues) => {
  const { data } = await api.post('/Product', toProductPayload(values))
  return data
}

export const updateProduct = async (id: number, values: ProductFormValues) => {
  const { data } = await api.put(`/Products/${id}`, toProductPayload(values))
  return data
}

export const deleteProduct = async (id: number) => {
  await api.delete(`/Products/${id}`)
}
