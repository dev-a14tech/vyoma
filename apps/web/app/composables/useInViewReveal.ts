// Ports the source design's [data-inview]/[data-inview="true"] scroll-reveal system:
// elements start with data-inview="false" in the markup: CSS keyed off that attribute
// holds them at their pre-reveal state until this observer flips it to "true" once,
// the first time the element (or its container) scrolls into view.
export function useInViewReveal() {
  const root = ref<HTMLElement | null>(null)

  onMounted(() => {
    if (!root.value) return
    const targets = root.value.querySelectorAll<HTMLElement>('[data-inview="false"]')
    if (!targets.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.setAttribute('data-inview', 'true'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-inview', 'true')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )
    targets.forEach((el) => observer.observe(el))

    onBeforeUnmount(() => observer.disconnect())
  })

  return { root }
}
