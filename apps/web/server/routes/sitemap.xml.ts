// Served at /sitemap.xml: every public page. The solution pages are static, so the
// sitemap no longer depends on the CMS API being reachable.
const STATIC_PAGES: Array<{ path: string; priority: number }> = [
  { path: '/', priority: 1.0 },
  { path: '/solutions', priority: 0.9 },
  { path: '/solutions/management', priority: 0.8 },
  { path: '/solutions/maintenance', priority: 0.9 },
  { path: '/solutions/operations', priority: 0.8 },
  { path: '/solutions/operations/airlines', priority: 0.8 },
  { path: '/solutions/operations/flying-training-schools', priority: 0.8 },
  { path: '/solutions/operations/private-jet-operators', priority: 0.8 },
  { path: '/solutions/logistics', priority: 0.8 },
  { path: '/sitemap', priority: 0.3 },
  { path: '/legal/privacy', priority: 0.2 },
  { path: '/legal/terms', priority: 0.2 },
  { path: '/legal/disclaimer', priority: 0.2 }
]

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export default defineEventHandler((event) => {
  const siteUrl = String(useRuntimeConfig(event).public.siteUrl || '').replace(/\/+$/, '')

  const body = STATIC_PAGES
    .map(u => `  <url><loc>${escapeXml(siteUrl + u.path)}</loc><priority>${u.priority.toFixed(1)}</priority></url>`)
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=3600')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
})
