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

// True once the client-side auth check (admin-auth.global.ts) has actually resolved.
// The api lives cross-domain in production, so that check can never run during SSR -
// it starts false on every render (server included) and the admin layout stays on a
// loading state until this flips, so an unauthenticated visitor never sees a flash of
// real admin content before the redirect to login lands.
export function useAdminAuthChecked() {
  return useState<boolean>('admin-auth-checked', () => false)
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

  const attempt = () => $fetch<{ admin: AdminProfile }>(`${base}/admin/auth/login`, {
    method: 'POST',
    credentials: 'include',
    body: { email, password }
  })

  let result: { admin: AdminProfile }
  try {
    result = await attempt()
  } catch (err) {
    // A wrong email/password returns 401 - retrying won't fix that, fail fast. Anything
    // else (500/timeout/network) is most likely the API's lazily-connecting Mongo still
    // warming up on a cold serverless instance (see apps/api/src/app.module.ts): one
    // retry after a short wait covers that window instead of showing a false error.
    const status = (err as { statusCode?: number; response?: { status?: number } })?.statusCode
      ?? (err as { response?: { status?: number } })?.response?.status
    if (status === 401) throw err
    await new Promise(resolve => setTimeout(resolve, 2500))
    result = await attempt()
  }

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
