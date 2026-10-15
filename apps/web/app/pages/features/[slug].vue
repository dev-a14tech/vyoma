<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: feature } = await useFeature(slug)

if (!feature.value) {
  throw createError({ statusCode: 404, statusMessage: 'Feature not found' })
}

usePageSeo({
  title: feature.value.title,
  description: feature.value.summary,
  keywords: 'features'
})
</script>

<template>
  <div v-if="feature">
    <section class="relative overflow-hidden border-b border-[var(--vyoma-cloud)]">
      <div class="motif-yantra-bg absolute inset-0 opacity-30" aria-hidden="true" />
      <div class="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
        <NuxtLink to="/features" class="inline-flex items-center gap-1 text-sm text-[var(--vyoma-aviation-blue)] mb-6">
          <UIcon name="i-lucide-arrow-left" class="w-3.5 h-3.5" />
          All features
        </NuxtLink>
        <div class="flex items-center gap-3 mb-4">
          <span class="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-50 text-[var(--vyoma-aviation-blue)]">
            <UIcon :name="`i-lucide-${feature.icon}`" class="w-5.5 h-5.5" />
          </span>
          <h1 class="font-heading text-3xl sm:text-4xl font-bold text-[var(--vyoma-deep-navy)]">{{ feature.title }}</h1>
        </div>
        <p class="text-lg text-slate-600 max-w-2xl">{{ feature.summary }}</p>
      </div>
    </section>

    <section class="py-16">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-10">
        <div class="md:col-span-3">
          <p class="text-slate-700 leading-relaxed whitespace-pre-line">{{ feature.bodyMarkdown }}</p>

          <h2 class="mt-8 font-heading font-semibold text-[var(--vyoma-deep-navy)] mb-3">What's included</h2>
          <ul class="space-y-2.5">
            <li v-for="cap in feature.capabilities" :key="cap" class="flex items-start gap-2 text-sm text-slate-700">
              <UIcon name="i-lucide-check" class="w-4 h-4 mt-0.5 text-[var(--vyoma-aviation-blue)] shrink-0" />
              {{ cap }}
            </li>
          </ul>
        </div>
        <div class="md:col-span-2">
          <video v-if="feature.videoUrl" :src="feature.videoUrl" autoplay muted loop playsinline class="w-full rounded-2xl" />
          <MotionPlaceholderFeatureAnim v-else :motif="feature.placeholderMotif" :theme-slug="feature.slug" />
        </div>
      </div>
    </section>

    <SectionsDemoRequestCta />
  </div>
</template>
