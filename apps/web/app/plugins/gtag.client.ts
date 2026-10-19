// Loads GA4 only when NUXT_PUBLIC_GA_ID is set (see nuxt.config.ts) and only in the
// browser - never during SSR, and never at all on localhost unless the env var is
// explicitly set there too. Also sends a page_view on every client-side route change,
// since gtag's own auto page_view only fires on the first real page load.
export default defineNuxtPlugin(() => {
  const { public: { gaId } } = useRuntimeConfig()
  if (!gaId) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  function gtag(...args: unknown[]) { window.dataLayer.push(args) }
  window.gtag = gtag

  // GA4 property has consent signals configured, and without an explicit default
  // signal it treats analytics_storage as unset - silently dropping every hit even
  // though the tag fires correctly (confirmed via Tag Assistant: tag detected, config
  // call seen, zero hits sent). No cookie banner on this site, so grant analytics,
  // deny ads - we don't do ad tracking.
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })

  gtag('js', new Date())
  // Sends gtag's own automatic page_view for the very first load - router.afterEach
  // below never fires for that one, only for client-side navigations after it.
  // transport_url routes the actual collect beacon through our own domain
  // (server/routes/g/collect.ts proxies it to Google) instead of google-analytics.com -
  // Safari and various blockers drop that domain outright even with consent granted,
  // since first-party requests aren't on any tracker blocklist.
  gtag('config', gaId, { transport_url: window.location.origin, first_party_collection: true })

  const router = useRouter()
  let isFirstNavigation = true
  router.afterEach((to) => {
    // The very first afterEach firing is Nuxt's hydration of the already-loaded route,
    // not a real navigation - gtag's own config call above already covered it, so
    // sending it again here would double-count that page_view.
    if (isFirstNavigation) {
      isFirstNavigation = false
      return
    }
    gtag('event', 'page_view', { page_path: to.fullPath, page_title: document.title })
  })
})

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}
