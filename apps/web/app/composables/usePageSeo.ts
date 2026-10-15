import { PAGE_KEYWORDS } from '~/data/seo'

interface PageSeo {
  // Without a title the site default (DEFAULT_TITLE) is used.
  title?: string
  description: string
  keywords?: keyof typeof PAGE_KEYWORDS | string[]
}

// Per-page title, description, keywords and the matching Open Graph / Twitter tags.
// Canonical URL, robots and the site-wide JSON-LD are set once in app.vue.
export function usePageSeo(seo: PageSeo | (() => PageSeo)) {
  const resolve = typeof seo === 'function' ? seo : () => seo
  const keywordsOf = (k: PageSeo['keywords']) => (Array.isArray(k) ? k : k ? PAGE_KEYWORDS[k] : undefined)

  // Page keywords replace the site-wide ones (same tag key, so no duplicate meta).
  useHead({
    meta: [{ name: 'keywords', content: () => keywordsOf(resolve().keywords)?.join(', ') }]
  })

  useSeoMeta({
    title: () => resolve().title,
    description: () => resolve().description,
    ogTitle: () => resolve().title,
    ogDescription: () => resolve().description,
    twitterTitle: () => resolve().title,
    twitterDescription: () => resolve().description
  })
}
