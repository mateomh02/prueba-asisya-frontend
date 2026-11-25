import { z } from 'zod'

const integerInRange = (max: number, label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} es obligatorio`)
    .refine((v) => /^\d+$/.test(v) && Number(v) <= max, `${label} debe ser un entero entre 0 y ${max}`)

export const productSchema = z.object({
  productName: z.string().trim().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
  categoryId: z.string().min(1, 'Seleccione una categoría'),
  supplierId: z
    .string()
    .trim()
    .refine((v) => v === '' || (/^\d+$/.test(v) && Number(v) > 0), 'Debe ser un número de proveedor válido'),
  quantityPerUnit: z.string().trim().max(50, 'Máximo 50 caracteres'),
  unitPrice: z
    .string()
    .trim()
    .min(1, 'El precio es obligatorio')
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 1_000_000_000, 'El precio debe ser mayor o igual a 0'),
  unitsInStock: integerInRange(32767, 'Las existencias'),
  unitsOnOrder: integerInRange(32767, 'Las unidades en pedido'),
  reorderLevel: integerInRange(32767, 'El nivel de reorden'),
  discontinued: z.boolean()
})

export type ProductFormValues = z.infer<typeof productSchema>

export const emptyProductValues: ProductFormValues = {
  productName: '',
  categoryId: '',
  supplierId: '',
  quantityPerUnit: '',
  unitPrice: '',
  unitsInStock: '0',
  unitsOnOrder: '0',
  reorderLevel: '0',
  discontinued: false
}
