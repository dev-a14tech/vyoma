<script setup lang="ts">
import { sitePaths } from '~/data/solutions'

usePageSeo({
  title: 'FAQ — Frequently Asked Questions',
  description: 'Answers about VYOMA, who it is designed for, and how a demo and onboarding work.',
  keywords: 'faq'
})
</script>

<template>
  <div>
    <SectionsHeroSection
      :breadcrumbs="[{ label: 'Home', to: sitePaths.home }, { label: 'FAQ' }]"
      eyebrow="FAQ"
      title="Questions, answered."
      hide-actions
    />

    <LandingSectionsFaqSection :ask-href="sitePaths.contact" />

    <SectionsDemoRequestCta />
  </div>
</template>
