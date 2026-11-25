import { isAxiosError } from 'axios'
import { SERVICES_MSGS } from './consts'

interface ProblemBody {
  title?: string
  detail?: string
  errors?: Record<string, string[]>
}

export const getApiErrorMessage = (error: unknown, fallback: string = SERVICES_MSGS.ERROR): string => {
  if (isAxiosError(error)) {
    const body = error.response?.data as ProblemBody | undefined
    if (body?.detail) return body.detail
    if (body?.errors) return Object.values(body.errors).flat().join(' ')
    if (body?.title) return body.title
  }
  return fallback
}
