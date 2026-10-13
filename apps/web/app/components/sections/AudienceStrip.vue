<script setup lang="ts">
import type { AudienceSegment } from '@vyoma/shared'

defineProps<{ audiences: AudienceSegment[] }>()
</script>

<template>
  <section class="py-16 bg-[var(--vyoma-section-bg-alt)]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p class="text-center text-xs font-semibold tracking-widest uppercase text-slate-500 mb-8">
        Built for every seat in aviation operations
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <NuxtLink
          v-for="a in audiences"
          :key="a.id"
          :to="`/solutions/${a.slug}`"
          class="flex flex-col items-center text-center p-4 rounded-xl border border-transparent hover:border-[var(--vyoma-cloud)] hover:bg-white transition-colors"
        >
          <span class="font-heading font-semibold text-sm text-[var(--vyoma-deep-navy)]">{{ a.title }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
