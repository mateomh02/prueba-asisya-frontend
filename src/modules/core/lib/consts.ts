export const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8080'

export const FORM_ERRORS_MSGS = {
  REQUIRED: 'El campo es obligatorio',
  EMAIL: 'Debe ingresar un correo válido'
}

export const SERVICES_MSGS = {
  ERROR: 'Ocurrió un error. Inténtelo nuevamente.',
  INVALID_CREDENTIALS: 'Usuario o contraseña incorrectos.'
}

export const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50]
