// Ported from Hero.tsx: --px/--py are set relative to the whole window (not the
// container), rAF-throttled, and skipped for touch devices / reduced motion.
export function usePointerParallax() {
  const root = ref<HTMLElement | null>(null)

  onMounted(() => {
    const el = root.value
    if (!el) return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3))
        el.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3))
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    onBeforeUnmount(() => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    })
  })

  return { root }
}
