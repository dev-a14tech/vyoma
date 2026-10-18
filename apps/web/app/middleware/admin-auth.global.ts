export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  if (to.path === '/admin/login') return

  // The api currently lives on a different domain than the web app (see useApiBase),
  // so the admin auth cookie never reaches the server during SSR - only the browser's
  // own cross-site fetch can see it. Skip the check here and let it run client-side
  // once hydrated, where the cookie is actually sent.
  if (import.meta.server) return

  const profile = useAdminProfile()
  if (!profile.value) {
    await fetchAdminProfile()
  }
  if (!profile.value) {
    return navigateTo(`/admin/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
