<script setup lang="ts">
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_KEYWORDS, SITE_NAME, SOCIAL_IMAGE } from '~/data/seo'

const route = useRoute()
const siteUrl = useSiteUrl()

// Admin and API paths must never be indexed.
const isPrivate = computed(() => route.path.startsWith('/admin'))
// One canonical per page: no query string or hash variants.
const canonical = computed(() => siteUrl(route.path === '/' ? '/' : route.path.replace(/\/+$/, '')))

const logoUrl = siteUrl('/images/brand/vyoma-logomark.png')

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'keywords', content: SITE_KEYWORDS.join(', ') }
  ],
  link: [
    { rel: 'icon', href: '/icon.png', type: 'image/png' },
    { rel: 'canonical', href: canonical },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Barlow:wght@500;600;700;800&display=swap'
    }
  ],
  htmlAttrs: { lang: 'en' },
  script: [
    // Turns on the hidden start state of v-reveal (plugins/reveal.ts). Runs before first paint,
    // and only when JavaScript is available, so no-JS visitors and crawlers see everything.
    { key: 'js-reveal', innerHTML: "document.documentElement.classList.add('js-reveal')", tagPosition: 'head' },
    {
      type: 'application/ld+json',
      key: 'ld-organization',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: siteUrl('/'),
        logo: logoUrl,
        description: DEFAULT_DESCRIPTION
      })
    },
    {
      type: 'application/ld+json',
      key: 'ld-website',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: siteUrl('/')
      })
    },
    {
      type: 'application/ld+json',
      key: 'ld-software',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: SITE_NAME,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Aircraft maintenance and continuing airworthiness management software',
        operatingSystem: 'Web',
        url: siteUrl('/'),
        description: DEFAULT_DESCRIPTION,
        audience: {
          '@type': 'Audience',
          audienceType: 'Airlines, flying training schools, non-scheduled and private jet operators, CAMO and maintenance organisations'
        }
      })
    }
  ]
})

useSeoMeta({
  titleTemplate: (title) => (title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE),
  description: DEFAULT_DESCRIPTION,
  robots: computed(() => (isPrivate.value ? 'noindex, nofollow' : 'index, follow')),
  ogType: 'website',
  ogSiteName: SITE_NAME,
  ogTitle: DEFAULT_TITLE,
  ogDescription: DEFAULT_DESCRIPTION,
  ogUrl: canonical,
  ogImage: siteUrl(SOCIAL_IMAGE),
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterTitle: DEFAULT_TITLE,
  twitterDescription: DEFAULT_DESCRIPTION,
  twitterImage: siteUrl(SOCIAL_IMAGE)
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
