// Splits /admin/* onto its own subdomain (admin.vyoma.aero), same Nuxt app and
// deployment - just a second domain alias pointed at it in Vercel. This is obscurity,
// not security: the actual protection is still the login/auth guard, this only stops
// /admin from being reachable by guessing a path off the public site.
export default defineEventHandler((event) => {
  const host = getRequestHost(event, { xForwardedHost: true })
  const isAdminHost = host?.startsWith('admin.')
  const path = event.path.split('?')[0]

  if (isAdminHost) {
    // The bare subdomain lands on the dashboard rather than a 404.
    if (path === '/') return sendRedirect(event, '/admin', 302)
    // Anything else that isn't an admin route, a Nuxt asset, or the favicon doesn't
    // belong here - send it to the real site instead of serving the public pages too.
    if (!path.startsWith('/admin') && !path.startsWith('/_nuxt') && path !== '/favicon.ico') {
      return sendRedirect(event, `https://www.vyoma.aero${path}`, 302)
    }
    return
  }

  // On the public site, /admin doesn't exist at all - not just hidden, actually 404s.
  if (path.startsWith('/admin')) {
    setResponseStatus(event, 404)
    return send(event, 'Not found')
  }
})
