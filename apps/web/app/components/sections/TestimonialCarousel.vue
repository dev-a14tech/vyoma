<script setup lang="ts">
import type { Testimonial } from '@vyoma/shared'

defineProps<{ testimonials: Testimonial[] }>()
</script>

<template>
  <section v-if="testimonials.length" class="py-20 bg-[var(--vyoma-section-bg-alt)]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 class="font-heading text-3xl font-bold text-center text-[var(--vyoma-deep-navy)] mb-10">
        Trusted by aviation operations teams
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <BrandRosetteRing
          v-for="t in testimonials"
          :key="t.id"
          class="block rounded-2xl border border-[var(--vyoma-cloud)] bg-white p-6"
        >
          <p class="text-sm text-slate-700">&ldquo;{{ t.quote }}&rdquo;</p>
          <div class="mt-4">
            <p class="text-sm font-semibold text-[var(--vyoma-deep-navy)]">{{ t.authorName }}</p>
            <p class="text-xs text-slate-500">{{ t.authorRole }} &middot; {{ t.orgName }}</p>
          </div>
        </BrandRosetteRing>
      </div>
    </div>
  </section>
</template>
