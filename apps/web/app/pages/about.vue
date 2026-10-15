<script setup lang="ts">
const { data: page } = await usePageContent('about')

usePageSeo({
  title: page.value?.seoTitle ?? 'About VYOMA',
  description:
    page.value?.seoDescription ??
    'VYOMA is an aviation software platform from the AVAJet family, built to manage risk across the aircraft lifecycle: maintenance, airworthiness, operations and logistics.',
  keywords: 'about'
})
</script>

<template>
  <div>
    <SectionsHeroSection
      eyebrow="About"
      :title="page?.heroTitle ?? 'Built by aviation technical specialists'"
      :subtitle="page?.heroSubtitle ?? ''"
      compact
    />

    <section class="py-16">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose">
        <p class="text-slate-700 leading-relaxed">
          AVAJET Aviation Consultants LLP has been operating since 2009, with headquarters in Mumbai
          and offices in Hyderabad and Dubai. The firm provides independent aircraft technical
          advisory &mdash; continuing airworthiness management, technical inspections, aircraft asset
          management, and aviation advisory &mdash; with no affiliation to any airline, lessor, or MRO.
        </p>
        <p class="mt-4 text-slate-700 leading-relaxed">
          VYOMA grew out of that work: two decades of CAMO and technical-advisory experience, built
          into software. It's why the platform models aircraft, airworthiness, and compliance the way
          a technical specialist actually works &mdash; not the way a generic software team guessed it
          might.
        </p>
      </div>
    </section>

    <SectionsDemoRequestCta />
  </div>
</template>
