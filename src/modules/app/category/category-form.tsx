import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Button, Form } from '@/modules/core'
import { InputField } from '@/modules/core/components'
import { useCategoryForm } from './use-category-form'

export const CategoryForm = () => {
  const { form, onSubmit } = useCategoryForm()
  const isSubmitting = form.formState.isSubmitting

  return (
    <div className='mx-auto grid w-full max-w-2xl gap-6'>
      <div>
        <h1 className='text-2xl font-black text-foreground'>Nueva categoría</h1>
        <p className='text-sm text-muted-foreground'>Los campos marcados con nombre son obligatorios.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-5 rounded-2xl border border-border bg-background p-6 shadow-sm'>
          <InputField control={form.control} name='name' label='Nombre' placeholder='Ej: SERVIDORES' />
          <InputField control={form.control} name='description' label='Descripción' placeholder='Opcional' />
          <InputField control={form.control} name='picture' label='URL de la imagen' placeholder='https://…' />

          <div className='flex items-center justify-end gap-3 pt-2'>
            <Button asChild variant='outline'>
              <Link to='/category'>Cancelar</Link>
            </Button>
            <Button type='submit' variant='secondary' disabled={isSubmitting}>
              {isSubmitting && <Loader2 className='animate-spin' />}
              Guardar categoría
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
