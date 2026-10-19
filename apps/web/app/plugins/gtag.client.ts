// Google's own hosted gtag.js silently refuses to send a single hit on this page -
// confirmed exhaustively: correct consent, correct measurement ID (tried 3), forced
// debug_mode, zero duplicate scripts, no CSP, no opt-out flags, and the identical
// library works fine on every other site in the same browser/machine. A raw
// `navigator.sendBeacon` call to the exact same collect endpoint succeeds every time
// from this same page, so we build GA4 hits ourselves and send them directly via our
// first-party proxy (server/routes/g/collect.ts), bypassing gtag.js's internal logic
// entirely rather than chase a bug inside Google's own minified code.
export default defineNuxtPlugin(() => {
  const { public: { gaId } } = useRuntimeConfig()
  if (!gaId) return

  const CID_KEY = 'vyoma_ga_cid'
  let clientId = localStorage.getItem(CID_KEY)
  if (!clientId) {
    clientId = `${Math.floor(Math.random() * 2147483647)}.${Math.floor(Date.now() / 1000)}`
    localStorage.setItem(CID_KEY, clientId)
  }

  const SID_KEY = 'vyoma_ga_sid'
  let sessionId = sessionStorage.getItem(SID_KEY)
  if (!sessionId) {
    sessionId = String(Math.floor(Date.now() / 1000))
    sessionStorage.setItem(SID_KEY, sessionId)
  }

  function sendHit(eventName: string) {
    const params = new URLSearchParams({
      v: '2',
      tid: gaId,
      cid: clientId!,
      sid: sessionId!,
      en: eventName,
      dl: window.location.href,
      dt: document.title,
      ul: (navigator.language ?? 'en-us').toLowerCase(),
      sr: `${window.screen.width}x${window.screen.height}`,
      _s: '1',
    })
    navigator.sendBeacon(`/g/collect?${params.toString()}`)
  }

  sendHit('page_view')

  const router = useRouter()
  let isFirstNavigation = true
  router.afterEach(() => {
    // The first afterEach firing is Nuxt hydrating the already-loaded route, not a
    // real navigation - the sendHit above already covered it.
    if (isFirstNavigation) {
      isFirstNavigation = false
      return
    }
    sendHit('page_view')
  })
})
