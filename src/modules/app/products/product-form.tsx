import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { Loader2 } from 'lucide-react'
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/modules/core'
import { InputField } from '@/modules/core/components'
import type { Category } from '@/modules/app/category/category-types'
import type { ProductFormValues } from './product-schema'
import { useProductForm } from './use-product-form'

interface ProductFormProps {
  title: string
  productId?: number
  initialValues?: ProductFormValues
}

export const ProductForm = ({ title, productId, initialValues }: ProductFormProps) => {
  const { form, onSubmit } = useProductForm(productId, initialValues)
  const { data: categories } = useSWR<Category[]>('/Category')
  const isSubmitting = form.formState.isSubmitting

  return (
    <div className='mx-auto grid w-full max-w-3xl gap-6'>
      <div>
        <h1 className='text-2xl font-black text-foreground'>{title}</h1>
        <p className='text-sm text-muted-foreground'>Complete la información del producto.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-5 rounded-2xl border border-border bg-background p-6 shadow-sm'>
          <InputField control={form.control} name='productName' label='Nombre' placeholder='Ej: Servidor Dell R750' />

          <div className='grid gap-5 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className='h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    >
                      <option value=''>Seleccione…</option>
                      {categories?.map((c) => (
                        <option key={c.id} value={String(c.id)}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <InputField control={form.control} name='supplierId' label='Proveedor (opcional)' placeholder='Id del proveedor' />
          </div>

          <InputField control={form.control} name='quantityPerUnit' label='Presentación' placeholder='Ej: 1 unidad' />

          <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
            <InputField control={form.control} name='unitPrice' label='Precio' placeholder='0.00' />
            <InputField control={form.control} name='unitsInStock' label='Existencias' />
            <InputField control={form.control} name='unitsOnOrder' label='En pedido' />
            <InputField control={form.control} name='reorderLevel' label='Nivel de reorden' />
          </div>

          <FormField
            control={form.control}
            name='discontinued'
            render={({ field }) => (
              <label className='flex items-center gap-3 text-sm font-semibold text-foreground'>
                <input
                  type='checkbox'
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className='size-4 accent-brand-purple-600'
                />
                Producto descontinuado
              </label>
            )}
          />

          <div className='flex items-center justify-end gap-3 pt-2'>
            <Button asChild variant='outline'>
              <Link to='/products'>Cancelar</Link>
            </Button>
            <Button type='submit' variant='secondary' disabled={isSubmitting}>
              {isSubmitting && <Loader2 className='animate-spin' />}
              Guardar producto
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
