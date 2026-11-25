import { LoginForm } from '@/modules/app/login'

export default function Login() {
  return (
    <main className='grid min-h-screen lg:grid-cols-2'>
      <section className='hidden flex-col justify-between bg-gradient-to-br from-brand-purple-900 via-brand-purple-600 to-brand-magenta-600 p-12 text-white lg:flex'>
        <span className='text-2xl font-black tracking-tight'>asisya</span>
        <div className='grid gap-4'>
          <h2 className='text-4xl font-black leading-tight'>Guía de asistencias</h2>
          <p className='max-w-md text-white/80'>Gestiona productos y categorías de forma segura desde un solo lugar.</p>
        </div>
        <span className='text-sm text-white/60'>© {new Date().getFullYear()} Asisya</span>
      </section>

      <section className='flex items-center justify-center bg-background p-6'>
        <div className='grid w-full max-w-sm gap-8'>
          <div className='grid gap-2'>
            <span className='text-sm font-semibold text-brand-magenta-600'>Bienvenido</span>
            <h1 className='text-3xl font-black text-foreground'>Iniciar sesión</h1>
            <p className='text-sm text-muted-foreground'>Ingrese sus credenciales para acceder a la plataforma.</p>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  )
}
