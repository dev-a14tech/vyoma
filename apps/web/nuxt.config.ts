// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // Server-only: Vercel injects this at request time from the "api" service binding
    // (see vercel.json). Never set it by hand in Vercel's dashboard. Empty locally, where
    // the two dev servers just talk over plain localhost ports instead.
    apiInternalBase: process.env.API_INTERNAL_URL || '',
    public: {
      // Canonical origin for canonical links, Open Graph URLs, sitemap and robots.txt.
      // Set NUXT_PUBLIC_SITE_URL in Vercel to the live domain.
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://vyoma.aero',
      // Same-origin in production ("/api", routed to the api service by vercel.json's
      // rewrite) so the browser never needs CORS or to know the api service's own host.
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api'
    }
  },

  // VYOMA's brand kit is light-dominant by design; no dark theme has been built, so
  // disable Nuxt UI's dark-mode detection entirely rather than ship a half-dark site.
  ui: {
    colorMode: false
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
