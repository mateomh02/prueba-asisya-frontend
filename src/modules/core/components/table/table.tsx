import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export const Table = ({ className, ...props }: ComponentProps<'table'>) => (
  <div className='overflow-hidden rounded-2xl border border-border bg-background shadow-sm'>
    <div className='overflow-x-auto'>
      <table className={cn('w-full text-left text-sm', className)} {...props} />
    </div>
  </div>
)

export const TableHeader = ({ titles }: { titles: string[] }) => (
  <thead className='bg-muted text-xs uppercase text-muted-foreground'>
    <tr>
      {titles.map((title) => (
        <th key={title} className='px-4 py-3 font-semibold'>
          {title}
        </th>
      ))}
    </tr>
  </thead>
)

export const TableBody = ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>

export const TableRow = ({ className, ...props }: ComponentProps<'tr'>) => (
  <tr className={cn('border-t border-border transition-colors hover:bg-muted/60', className)} {...props} />
)

export const TableCell = ({ className, ...props }: ComponentProps<'td'>) => (
  <td className={cn('px-4 py-3 align-middle text-foreground', className)} {...props} />
)

export const TableEmpty = ({ colSpan, children }: { colSpan: number; children: ReactNode }) => (
  <tr>
    <td colSpan={colSpan} className='px-4 py-10 text-center text-muted-foreground'>
      {children}
    </td>
  </tr>
)
