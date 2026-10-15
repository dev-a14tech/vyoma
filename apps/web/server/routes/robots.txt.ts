// Served at /robots.txt. Built from the configured site URL so the Sitemap line is always
// absolute and correct for the live domain.
export default defineEventHandler((event) => {
  const siteUrl = String(useRuntimeConfig(event).public.siteUrl || '').replace(/\/+$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api/',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    ''
  ].join('\n')
})
