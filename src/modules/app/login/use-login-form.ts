import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { SERVICES_MSGS } from '@/modules/core'
import { useAuthStore } from '@/modules/app/auth'
import { getRoutes } from '@/modules/app/routes'
import { loginSchema, type LoginFormValues } from './login-schema'
import { login } from './login-service'

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const setSession = useAuthStore((s) => s.setSession)
  const setRoutes = useAuthStore((s) => s.setRoutes)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true)
    try {
      const response = await login(values)
      setSession(response.token, {
        email: response.email,
        role: response.role,
        roleId: response.roleId
      })
      setRoutes(await getRoutes())
      navigate('/')
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        toast.warn(SERVICES_MSGS.INVALID_CREDENTIALS)
      } else {
        toast.error(SERVICES_MSGS.ERROR)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { form, isLoading, onSubmit }
}
