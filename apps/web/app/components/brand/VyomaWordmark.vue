<script setup lang="ts">
withDefaults(defineProps<{ height?: number }>(), { height: 28 })
</script>

<template>
  <!--
    Placeholder logomark approximating the brand-kit description (orbit ring + triangular
    yantra + jet streak). Swap for the real exported logo asset once Dipesh delivers it.
  -->
  <span class="inline-flex items-center gap-2" :style="{ height: `${height}px` }">
    <svg :width="height" :height="height" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="17" stroke="#41a1d9" stroke-width="2.2" />
      <path d="M20 10 L26 26 L20 22 L14 26 Z" fill="#143758" />
      <path d="M20 10 L26 26 L20 22 Z" fill="#005f8f" />
      <path d="M26 8 L32 4 L28 10 L30 12 L24 14 Z" fill="#143758" />
    </svg>
    <span class="font-heading font-bold tracking-tight text-[var(--vyoma-deep-navy)]" :style="{ fontSize: `${height * 0.62}px` }">
      VYOMA
    </span>
  </span>
</template>
