// Absolute URL helper: canonical links and Open Graph tags must be absolute.
export function useSiteUrl() {
  const base = String(useRuntimeConfig().public.siteUrl || '').replace(/\/+$/, '')
  return (path = '/') => `${base}${path.startsWith('/') ? path : `/${path}`}`
}
