import type { AdminProfile } from '@vyoma/shared'

function serverCookieHeaders() {
  // During SSR, $fetch runs on the Nuxt server and has no access to the browser's
  // cookie jar, so the incoming request's Cookie header must be forwarded manually.
  if (import.meta.server) {
    return useRequestHeaders(['cookie'])
  }
  return {}
}

export function useAdminProfile() {
  return useState<AdminProfile | null>('admin-profile', () => null)
}

export async function fetchAdminProfile() {
  const config = useRuntimeConfig()
  const profile = useAdminProfile()
  try {
    profile.value = await $fetch<AdminProfile>(`${config.public.apiBase}/admin/auth/me`, {
      credentials: 'include',
      headers: serverCookieHeaders()
    })
  } catch {
    profile.value = null
  }
  return profile.value
}

export async function adminLogin(email: string, password: string) {
  const config = useRuntimeConfig()
  const profile = useAdminProfile()
  const result = await $fetch<{ admin: AdminProfile }>(`${config.public.apiBase}/admin/auth/login`, {
    method: 'POST',
    credentials: 'include',
    body: { email, password }
  })
  profile.value = result.admin
  return result.admin
}

export async function adminLogout() {
  const config = useRuntimeConfig()
  const profile = useAdminProfile()
  await $fetch(`${config.public.apiBase}/admin/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
  profile.value = null
}

export function useAdminFetch() {
  const config = useRuntimeConfig()
  return <T>(path: string, opts: Parameters<typeof $fetch>[1] = {}) =>
    $fetch<T>(`${config.public.apiBase}${path}`, {
      credentials: 'include',
      headers: serverCookieHeaders(),
      ...opts
    })
}
