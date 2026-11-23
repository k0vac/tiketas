export const routerBasepath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export function withBase(path: string | null | undefined) {
  if (!path) return path ?? null
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path
  }

  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}
