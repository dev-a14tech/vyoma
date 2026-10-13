<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    subtitle: string
    compact?: boolean
  }>(),
  { eyebrow: 'Digital Backbone of Aviation' }
)
</script>

<template>
  <section class="relative overflow-hidden border-b border-[var(--vyoma-cloud)]">
    <BrandOrbitRing :size="760" />
    <div class="motif-yantra-bg absolute inset-0 opacity-40" aria-hidden="true" />
    <div
      class="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center"
      :class="compact ? 'py-16 sm:py-20' : 'py-24 sm:py-32'"
    >
      <span class="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--vyoma-aviation-blue)] mb-5">
        {{ eyebrow }}
      </span>
      <h1 class="font-heading font-extrabold text-[var(--vyoma-deep-navy)] leading-tight" :class="compact ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-6xl'">
        {{ title }}
      </h1>
      <p class="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
        {{ subtitle }}
      </p>
      <div class="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
        <UButton to="/request-demo" size="xl" color="primary" class="font-semibold px-6">
          Book a Demo
        </UButton>
        <UButton to="/features" size="xl" color="neutral" variant="soft" class="font-semibold px-6">
          Explore Features
        </UButton>
      </div>
    </div>
  </section>
</template>
