<script setup lang="ts">
const { data: features } = await useFeatures()

usePageSeo({
  title: 'Aircraft Maintenance Software Features',
  description: 'Explore every VYOMA module: airworthiness directive and service bulletin tracking, MEL/CDL, component life tracking, maintenance due lists, work orders and reporting.',
  keywords: 'features'
})
</script>

<template>
  <div>
    <SectionsHeroSection
      eyebrow="Features"
      title="A connected system, not a bundle of tools"
      subtitle="Seven modules that share the same data model — so a completed flight, a closed defect, or a signed-off work order updates everywhere at once."
      compact
    />

    <section class="py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionsFeatureBentoGrid v-if="features?.length" :features="features" />
      </div>
    </section>

    <SectionsDemoRequestCta />
  </div>
</template>
