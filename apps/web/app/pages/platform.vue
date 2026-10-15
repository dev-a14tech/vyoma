<script setup lang="ts">
const { data: page } = await usePageContent('platform')
const { data: features } = await useFeatures()

usePageSeo({
  title: page.value?.seoTitle ?? 'Aircraft Maintenance & CAMO Software Platform',
  description:
    page.value?.seoDescription ??
    'One platform for fleet records, maintenance due lists, component tracking, AD and SB compliance, MEL/CDL and operations. CAMO software built for airlines, flying training schools and private jet operators.',
  keywords: 'platform'
})
</script>

<template>
  <div>
    <SectionsHeroSection
      eyebrow="Platform"
      :title="page?.heroTitle ?? 'One platform, the whole operation'"
      :subtitle="page?.heroSubtitle ?? ''"
      compact
    />

    <section class="py-16">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-6 text-center">
        <div class="p-6 rounded-2xl border border-[var(--vyoma-cloud)]">
          <UIcon name="i-lucide-shield-check" class="w-6 h-6 mx-auto text-[var(--vyoma-aviation-blue)]" />
          <h3 class="mt-3 font-heading font-semibold text-[var(--vyoma-deep-navy)]">Compliance-first</h3>
          <p class="mt-1 text-sm text-slate-600">Every workflow gate enforces your regulatory requirements at the process level.</p>
        </div>
        <div class="p-6 rounded-2xl border border-[var(--vyoma-cloud)]">
          <UIcon name="i-lucide-lock" class="w-6 h-6 mx-auto text-[var(--vyoma-aviation-blue)]" />
          <h3 class="mt-3 font-heading font-semibold text-[var(--vyoma-deep-navy)]">Audit-grade design</h3>
          <p class="mt-1 text-sm text-slate-600">Immutable, timestamped records ensure absolute traceability.</p>
        </div>
        <div class="p-6 rounded-2xl border border-[var(--vyoma-cloud)]">
          <UIcon name="i-lucide-layers" class="w-6 h-6 mx-auto text-[var(--vyoma-aviation-blue)]" />
          <h3 class="mt-3 font-heading font-semibold text-[var(--vyoma-deep-navy)]">True multi-tenant</h3>
          <p class="mt-1 text-sm text-slate-600">Per-tenant data isolation, not just row-level separation.</p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[var(--vyoma-section-bg-alt)]">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="font-heading text-3xl font-bold text-center text-[var(--vyoma-deep-navy)] mb-12">Every module, connected</h2>
        <SectionsFeatureBentoGrid v-if="features?.length" :features="features" />
      </div>
    </section>

    <SectionsDemoRequestCta />
  </div>
</template>
