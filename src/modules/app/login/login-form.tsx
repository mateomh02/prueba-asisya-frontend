import { Loader2 } from 'lucide-react'
import { Button, Form } from '@/modules/core'
import { InputField } from '@/modules/core/components'
import { useLoginForm } from './use-login-form'

export const LoginForm = () => {
  const { form, isLoading, onSubmit } = useLoginForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid w-full gap-5'>
        <InputField control={form.control} name='email' label='Correo' type='email' placeholder='usuario@correo.com' />
        <InputField control={form.control} name='password' label='Contraseña' type='password' placeholder='Ingrese su contraseña' />
        <Button type='submit' variant='secondary' size='lg' disabled={isLoading} className='mt-2 w-full'>
          {isLoading && <Loader2 className='animate-spin' />}
          Iniciar sesión
        </Button>
      </form>
    </Form>
  )
}
