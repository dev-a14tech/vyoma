<script setup lang="ts">
definePageMeta({ layout: 'landing' })

usePageSeo({
  description:
    'VYOMA is CAMO software and aircraft maintenance tracking software for airlines, flying training schools and private jet operators. Track airworthiness directives, service bulletins, components and fleet compliance in one place.',
  keywords: 'home'
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
