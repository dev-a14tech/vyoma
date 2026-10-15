// v-reveal: text, cards and sections rise from the bottom as they scroll into view.
//
//   <h2 v-reveal>…</h2>                   rises when it enters the viewport
//   <article v-reveal="120">…</article>   same, after a 120 ms delay (use it to stagger cards)
//
// The hidden start state only applies once the page's script has run (the `js-reveal` class
// on <html>, set in app.vue), so crawlers, no-JS visitors and print never see invisible
// content. The state lives in a data attribute rather than a class, so Vue re-rendering an
// element's `class` cannot wipe it.

let observer: IntersectionObserver | null = null

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          if (!entry.isIntersecting) {
            // Already scrolled past (anchor jump, restored scroll position): show it as is,
            // there is nothing left to animate.
            if (entry.boundingClientRect.top < 0) {
              el.removeAttribute('data-reveal')
              observer!.unobserve(el)
            }
            continue
          }
          reveal(el)
          observer!.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
  }
  return observer
}

function reveal(el: HTMLElement) {
  el.setAttribute('data-reveal', 'in')
  // Once it has risen, drop the reveal state so it leaves no transition or delay behind
  // (a card's own hover effect must not inherit the stagger delay).
  const done = (e: Event) => {
    if ((e as TransitionEvent).propertyName !== 'transform') return
    el.removeEventListener('transitionend', done)
    el.removeAttribute('data-reveal')
    el.style.transitionDelay = ''
  }
  el.addEventListener('transitionend', done)
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    // Server render: the element is marked so the first paint already holds it back.
    getSSRProps: () => ({ 'data-reveal': 'out' }),
    created(el: HTMLElement) {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'out')
    },
    mounted(el: HTMLElement, binding: { value?: number }) {
      if (binding.value) el.style.transitionDelay = `${binding.value}ms`
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        el.removeAttribute('data-reveal')
        return
      }
      getObserver().observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    }
  })
})
