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

  gtag('js', new Date())
  // Sends gtag's own automatic page_view for the very first load - router.afterEach
  // below never fires for that one, only for client-side navigations after it.
  gtag('config', gaId)

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
