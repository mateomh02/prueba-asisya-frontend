import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().trim().min(1, 'El nombre es obligatorio').max(50, 'Máximo 50 caracteres'),
  description: z.string().trim().max(500, 'Máximo 500 caracteres'),
  picture: z
    .string()
    .trim()
    .max(500, 'Máximo 500 caracteres')
    .refine((v) => v === '' || /^https?:\/\//.test(v), 'Debe ser una URL que empiece por http:// o https://')
})

export type CategoryFormValues = z.infer<typeof categorySchema>
