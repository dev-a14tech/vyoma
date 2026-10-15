// Served at /sitemap.xml: the fixed public pages plus the CMS-driven feature and
// solution pages. If the CMS API is unreachable the static pages are still listed.
const STATIC_PAGES: Array<{ path: string; priority: number }> = [
  { path: '/', priority: 1.0 },
  { path: '/platform', priority: 0.9 },
  { path: '/features', priority: 0.8 },
  { path: '/why-vyoma', priority: 0.7 },
  { path: '/about', priority: 0.6 },
  { path: '/request-demo', priority: 0.9 },
  { path: '/contact', priority: 0.6 },
  { path: '/sitemap', priority: 0.3 },
  { path: '/legal/privacy', priority: 0.2 },
  { path: '/legal/terms', priority: 0.2 },
  { path: '/legal/disclaimer', priority: 0.2 }
]

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

async function slugs(base: string, path: string): Promise<string[]> {
  try {
    const rows = await $fetch<Array<{ slug: string }>>(`${base}${path}`)
    return rows.map((r) => r.slug).filter(Boolean)
  } catch {
    return []
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl || '').replace(/\/+$/, '')
  const apiBase = String(config.apiInternalBase || config.public.apiBase)

  const [features, audiences] = await Promise.all([
    slugs(apiBase, '/content/features'),
    slugs(apiBase, '/content/audiences')
  ])

  const urls = [
    ...STATIC_PAGES,
    ...features.map((s) => ({ path: `/features/${s}`, priority: 0.7 })),
    ...audiences.map((s) => ({ path: `/solutions/${s}`, priority: 0.8 }))
  ]

  const body = urls
    .map((u) => `  <url><loc>${escapeXml(siteUrl + u.path)}</loc><priority>${u.priority.toFixed(1)}</priority></url>`)
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=3600')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
})
