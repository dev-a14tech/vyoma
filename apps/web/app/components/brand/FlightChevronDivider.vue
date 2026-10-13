<script setup lang="ts">
const el = ref<HTMLElement | null>(null)
const visible = ref(false)

onMounted(() => {
  if (!el.value) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.4 }
  )
  observer.observe(el.value)
})
</script>

<template>
  <div
    ref="el"
    class="motif-chevron-sweep relative h-10 flex items-center justify-center my-2"
    :class="{ 'is-visible': visible }"
    aria-hidden="true"
  >
    <svg width="120" height="16" viewBox="0 0 120 16" fill="none" class="chevron-base opacity-20">
      <path d="M0 2 L14 8 L0 14 M20 2 L34 8 L20 14 M40 2 L54 8 L40 14 M60 2 L74 8 L60 14 M80 2 L94 8 L80 14 M100 2 L114 8 L100 14" stroke="#143758" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg width="120" height="16" viewBox="0 0 120 16" fill="none" class="chevron-fill absolute">
      <path d="M0 2 L14 8 L0 14 M20 2 L34 8 L20 14 M40 2 L54 8 L40 14 M60 2 L74 8 L60 14 M80 2 L94 8 L80 14 M100 2 L114 8 L100 14" stroke="#41a1d9" stroke-width="2" stroke-linecap="round" />
    </svg>
  </div>
</template>
