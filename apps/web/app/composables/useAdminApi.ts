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
  const base = useApiBase()
  const profile = useAdminProfile()
  try {
    profile.value = await $fetch<AdminProfile>(`${base}/admin/auth/me`, {
      credentials: 'include',
      headers: serverCookieHeaders()
    })
  } catch {
    profile.value = null
  }
  return profile.value
}

export async function adminLogin(email: string, password: string) {
  // Always called from the browser (a login button click) - useApiBase() resolves to
  // the public base here anyway, since import.meta.server is false on the client.
  const base = useApiBase()
  const profile = useAdminProfile()
  const result = await $fetch<{ admin: AdminProfile }>(`${base}/admin/auth/login`, {
    method: 'POST',
    credentials: 'include',
    body: { email, password }
  })
  profile.value = result.admin
  return result.admin
}

export async function adminLogout() {
  const base = useApiBase()
  const profile = useAdminProfile()
  await $fetch(`${base}/admin/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
  profile.value = null
}

export function useAdminFetch() {
  const base = useApiBase()
  return <T>(path: string, opts: Parameters<typeof $fetch>[1] = {}) =>
    $fetch<T>(`${base}${path}`, {
      credentials: 'include',
      headers: serverCookieHeaders(),
      ...opts
    })
}
