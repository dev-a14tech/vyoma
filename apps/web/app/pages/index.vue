<script setup lang="ts">
const { data: page } = await usePageContent('home')
const { data: features } = await useFeatures()
const { data: audiences } = await useAudiences()
const { data: testimonials } = await useTestimonials()

useSeoMeta({
  title: 'Digital Backbone of Aviation',
  description: page.value?.seoDescription
})

const faqItems = [
  {
    question: 'Is VYOMA built for airlines, CAMO organisations, or MROs?',
    answer:
      'All three. VYOMA connects fleet management, airworthiness compliance, maintenance, flight operations, crew, and reporting in one platform used by airline operators, CAMO organisations, aircraft lessors, and MRO partners.'
  },
  {
    question: 'How does VYOMA handle data isolation between organisations?',
    answer:
      'VYOMA uses true multi-tenant architecture with per-tenant database isolation — not just row-level separation — combined with granular, permission-based role access control.'
  },
  {
    question: 'Can our systems integrate with VYOMA?',
    answer:
      'Yes. VYOMA exposes a fully documented REST API covering the platform’s workflows, so your existing tools and integrations can read and write the same data your team works in.'
  }
]
</script>

<template>
  <div>
    <SectionsHeroSection
      :title="page?.heroTitle ?? 'Digital Backbone of Aviation'"
      :subtitle="page?.heroSubtitle ?? 'VYOMA connects fleet management, airworthiness, maintenance, flight operations, crew, and reporting in one platform.'"
    />

    <SectionsAudienceStrip v-if="audiences?.length" :audiences="audiences" />

    <BrandFlightChevronDivider />

    <section class="py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-xs font-semibold tracking-widest uppercase text-[var(--vyoma-aviation-blue)]">Complete platform</span>
          <h2 class="mt-3 font-heading text-3xl sm:text-4xl font-bold text-[var(--vyoma-deep-navy)]">From onboarding to audit-ready reports</h2>
          <p class="mt-3 text-slate-600 max-w-2xl mx-auto">Seven connected modules covering the full lifecycle of continuing airworthiness and flight operations.</p>
        </div>
        <SectionsFeatureBentoGrid v-if="features?.length" :features="features" />
      </div>
    </section>

    <SectionsApiTrustSection />

    <SectionsTestimonialCarousel v-if="testimonials?.length" :testimonials="testimonials" />

    <SectionsFaqSection :items="faqItems" />

    <SectionsDemoRequestCta />
  </div>
</template>
