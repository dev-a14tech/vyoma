<script setup lang="ts">
import { sitePaths } from '~/data/solutions'

usePageSeo({
  title: 'Why VYOMA — The Problems VYOMA Solves',
  description: 'The problems VYOMA solves for teams responsible for aircraft: fleet visibility, connected maintenance information, clearer priorities, structured records and audit readiness.',
  keywords: 'why-vyoma'
})
</script>

<template>
  <div>
    <SectionsHeroSection
      :breadcrumbs="[{ label: 'Home', to: sitePaths.home }, { label: 'Platform', to: sitePaths.platform }, { label: 'Why VYOMA' }]"
      eyebrow="Why VYOMA"
      title="Clarity That Moves Aviation Forward."
      subtitle="The problems VYOMA solves for teams responsible for aircraft."
    >
      <NuxtLink :to="sitePaths.demo" class="btn btn--primary">
        Book a Demo
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </NuxtLink>
      <NuxtLink :to="sitePaths.contact" class="btn btn--ghost">Ask a Question</NuxtLink>
    </SectionsHeroSection>

    <LandingSectionsWhySection
      heading="Airworthiness data is scattered. Mistakes are expensive."
      lede="Here is what changes when every team works from one record per aircraft."
      list-label="The problems VYOMA solves"
      before-prefix="Today:"
    />

    <SectionsDemoRequestCta />
  </div>
</template>
