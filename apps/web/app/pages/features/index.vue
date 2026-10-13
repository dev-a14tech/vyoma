<script setup lang="ts">
const { data: features } = await useFeatures()

useSeoMeta({
  title: 'Features',
  description: 'Explore every module in the VYOMA platform, from fleet management to reporting.'
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
