export interface Product {
  id: number
  productName: string
  unitPrice: number
  unitsInStock: number
  discontinued: boolean
  categoryId: number
  categoryName: string
  source: string
}

export interface ProductDetail extends Product {
  categoryPicture: string | null
  supplierId: number | null
  quantityPerUnit: string | null
  unitsOnOrder: number
  reorderLevel: number
}

export interface PagedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
