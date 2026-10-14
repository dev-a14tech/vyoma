// Lets deep links like #solutions-camo or #demo-ask select a tab inside a section,
// so header/footer links land on the right state (ported from lib/hooks.ts).
export function useHashSelect(prefix: string, ids: readonly string[], onSelect: (id: string) => void) {
  onMounted(() => {
    const apply = () => {
      const hash = decodeURIComponent(window.location.hash.replace('#', ''))
      if (!hash.startsWith(prefix + '-')) return
      const id = hash.slice(prefix.length + 1)
      if (ids.includes(id)) {
        onSelect(id)
        document.getElementById(prefix)?.scrollIntoView({ block: 'start' })
      }
    }
    apply()
    window.addEventListener('hashchange', apply)
    onBeforeUnmount(() => window.removeEventListener('hashchange', apply))
  })
}
