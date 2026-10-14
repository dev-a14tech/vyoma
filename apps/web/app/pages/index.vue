<script setup lang="ts">
definePageMeta({ layout: 'landing' })

useSeoMeta({
  description:
    'VYOMA is a connected aviation platform bringing fleet visibility, maintenance intelligence, airworthiness management and operational clarity into one digital workspace.',
  ogDescription:
    'Fleet visibility, maintenance intelligence, airworthiness management and operational clarity in one digital workspace.',
  ogImage: '/images/brand/vyoma-logo-full.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div>
    <LandingSectionsHeroSection />
    <LandingSectionsWhatIsVyomaSection />
    <LandingSectionsCapabilitiesSection />
    <LandingSectionsFeaturesSection />
    <LandingSectionsWhySection />
    <LandingSectionsSolutionsSection />
    <LandingSectionsGettingStartedSection />
    <LandingSectionsSecuritySection />
    <LandingSectionsAboutSection />
    <LandingSectionsFaqSection />
    <LandingSectionsDemoSection />
  </div>
</template>
