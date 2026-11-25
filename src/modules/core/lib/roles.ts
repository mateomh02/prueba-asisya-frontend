export const ROLE_NAMES = {
  admin: 'Admin',
  user: 'User'
} as const

export const defineRole = (role?: string | null) => {
  const isAdmin = role === ROLE_NAMES.admin
  const isUser = role === ROLE_NAMES.user
  return { isAdmin, isUser }
}
