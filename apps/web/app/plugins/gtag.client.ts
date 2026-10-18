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
  // send_page_view off: the router.afterEach below sends it instead, with the correct
  // SPA path on every navigation (not just the first load).
  gtag('config', gaId, { send_page_view: false })

  const router = useRouter()
  router.afterEach((to) => {
    gtag('event', 'page_view', { page_path: to.fullPath, page_title: document.title })
  })
})

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}
