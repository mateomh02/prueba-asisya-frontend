import { useState } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '../../ui'
import { cn } from '../../lib/utils'

interface InputFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  className?: string
}

export const InputField = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  disabled,
  className
}: InputFieldProps<TFieldValues>) => {
  const [isVisible, setIsVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && isVisible ? 'text' : type

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div className='relative'>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(isPassword && 'pr-11', className)}
              />
            </FormControl>
            {isPassword && (
              <button
                type='button'
                aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                onClick={() => setIsVisible((prev) => !prev)}
                className='absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground'
              >
                {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
