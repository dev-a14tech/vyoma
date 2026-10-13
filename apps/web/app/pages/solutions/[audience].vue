<script setup lang="ts">
const route = useRoute()
const slug = route.params.audience as string

const { data: audience } = await useAudience(slug)

if (!audience.value) {
  throw createError({ statusCode: 404, statusMessage: 'Solution not found' })
}

const { data: allFeatures } = await useFeatures()

const relevantFeatures = computed(() => {
  if (!audience.value || !allFeatures.value) return []
  const slugs = new Set(audience.value.relevantFeatureSlugs)
  return allFeatures.value.filter((f) => slugs.has(f.slug))
})

useSeoMeta({
  title: audience.value.title,
  description: audience.value.heroCopy
})
</script>

<template>
  <div v-if="audience">
    <SectionsHeroSection eyebrow="Solutions" :title="audience.title" :subtitle="audience.heroCopy" compact />

    <section class="py-16">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 class="font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)] mb-6">What this usually looks like today</h2>
        <ul class="space-y-3">
          <li v-for="pp in audience.painPoints" :key="pp" class="flex items-start gap-3 text-slate-700">
            <UIcon name="i-lucide-alert-circle" class="w-4 h-4 mt-1 text-amber-500 shrink-0" />
            {{ pp }}
          </li>
        </ul>
      </div>
    </section>

    <section v-if="relevantFeatures.length" class="py-16 bg-[var(--vyoma-section-bg-alt)]">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="font-heading text-2xl font-bold text-center text-[var(--vyoma-deep-navy)] mb-10">Relevant modules</h2>
        <SectionsFeatureBentoGrid :features="relevantFeatures" />
      </div>
    </section>

    <SectionsDemoRequestCta />
  </div>
</template>
