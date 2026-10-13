<script setup lang="ts">
import type { FeatureTheme } from '@vyoma/shared'

defineProps<{ feature: FeatureTheme; large?: boolean }>()
</script>

<template>
  <NuxtLink
    :to="`/features/${feature.slug}`"
    class="group flex flex-col rounded-2xl border border-[var(--vyoma-cloud)] bg-white p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
    :class="large ? 'md:col-span-2 md:row-span-2' : ''"
  >
    <div class="flex items-center gap-2 mb-3">
      <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-50 text-[var(--vyoma-aviation-blue)]">
        <UIcon :name="`i-lucide-${feature.icon}`" class="w-4.5 h-4.5" />
      </span>
      <h3 class="font-heading font-semibold text-[var(--vyoma-deep-navy)]">{{ feature.title }}</h3>
    </div>
    <p class="text-sm text-slate-600 mb-4">{{ feature.summary }}</p>

    <div class="flex-1 min-h-[160px]">
      <video v-if="feature.videoUrl" :src="feature.videoUrl" autoplay muted loop playsinline class="w-full h-full rounded-xl object-cover" />
      <MotionPlaceholderFeatureAnim v-else :motif="feature.placeholderMotif" :theme-slug="feature.slug" />
    </div>

    <span class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--vyoma-aviation-blue)] group-hover:gap-2 transition-all">
      Explore module
      <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
    </span>
  </NuxtLink>
</template>
