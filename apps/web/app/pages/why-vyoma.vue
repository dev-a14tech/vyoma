<script setup lang="ts">
const { data: page } = await usePageContent('why-vyoma')

useSeoMeta({
  title: page.value?.seoTitle ?? 'Why VYOMA',
  description: page.value?.seoDescription
})

const faqItems = [
  {
    question: 'How is tenant data kept separate?',
    answer:
      'Each organisation on VYOMA gets its own isolated database, not just a row-level tenant flag — so one organisation’s data is never queryable from another’s context.'
  },
  {
    question: 'What does the audit trail actually record?',
    answer:
      'Every compliance-relevant action is written to a hash-chained, timestamped audit log, so the history of a record can be verified as unmodified — not just logged, but provably intact.'
  },
  {
    question: 'Can we restrict what different roles can see or do?',
    answer:
      'Yes. Access is controlled by granular, permission-based roles rather than broad admin/user tiers, so a maintenance controller and a compliance auditor can see exactly what their role needs.'
  }
]
</script>

<template>
  <div>
    <SectionsHeroSection
      eyebrow="Why VYOMA"
      :title="page?.heroTitle ?? 'Built for audit day, every day'"
      :subtitle="page?.heroSubtitle ?? ''"
      compact
    />

    <SectionsApiTrustSection />

    <section class="py-16">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-6">
        <div class="p-6 rounded-2xl border border-[var(--vyoma-cloud)]">
          <UIcon name="i-lucide-database" class="w-6 h-6 text-[var(--vyoma-aviation-blue)]" />
          <h3 class="mt-3 font-heading font-semibold text-[var(--vyoma-deep-navy)]">Per-tenant data isolation</h3>
          <p class="mt-1 text-sm text-slate-600">Each organisation's data lives in its own isolated store, not a shared table with a tenant flag.</p>
        </div>
        <div class="p-6 rounded-2xl border border-[var(--vyoma-cloud)]">
          <UIcon name="i-lucide-key-round" class="w-6 h-6 text-[var(--vyoma-aviation-blue)]" />
          <h3 class="mt-3 font-heading font-semibold text-[var(--vyoma-deep-navy)]">Granular permissions</h3>
          <p class="mt-1 text-sm text-slate-600">Role access is defined down to individual permission codes, not broad admin/user tiers.</p>
        </div>
        <div class="p-6 rounded-2xl border border-[var(--vyoma-cloud)]">
          <UIcon name="i-lucide-link-2" class="w-6 h-6 text-[var(--vyoma-aviation-blue)]" />
          <h3 class="mt-3 font-heading font-semibold text-[var(--vyoma-deep-navy)]">Hash-chained audit log</h3>
          <p class="mt-1 text-sm text-slate-600">Compliance-relevant actions are recorded in a tamper-evident, timestamped chain.</p>
        </div>
        <div class="p-6 rounded-2xl border border-[var(--vyoma-cloud)]">
          <UIcon name="i-lucide-file-code" class="w-6 h-6 text-[var(--vyoma-aviation-blue)]" />
          <h3 class="mt-3 font-heading font-semibold text-[var(--vyoma-deep-navy)]">Documented REST API</h3>
          <p class="mt-1 text-sm text-slate-600">Every module is reachable through a fully documented API, with Swagger docs included.</p>
        </div>
      </div>
    </section>

    <SectionsFaqSection :items="faqItems" title="Trust, in detail" />

    <SectionsDemoRequestCta />
  </div>
</template>
