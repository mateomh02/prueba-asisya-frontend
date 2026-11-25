import { z } from 'zod'
import { FORM_ERRORS_MSGS } from '@/modules/core'

export const loginSchema = z.object({
  email: z
    .string({ required_error: FORM_ERRORS_MSGS.REQUIRED })
    .min(1, FORM_ERRORS_MSGS.REQUIRED)
    .email(FORM_ERRORS_MSGS.EMAIL),
  password: z.string({ required_error: FORM_ERRORS_MSGS.REQUIRED }).min(1, FORM_ERRORS_MSGS.REQUIRED)
})

export type LoginFormValues = z.infer<typeof loginSchema>
