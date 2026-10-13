<script setup lang="ts">
useSeoMeta({
  title: 'Book a Demo',
  description: 'See VYOMA on your own fleet data — book a focused walkthrough with our team.'
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-[var(--vyoma-cloud)]">
      <BrandOrbitRing :size="600" />
      <div class="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <span class="text-xs font-semibold tracking-widest uppercase text-[var(--vyoma-aviation-blue)]">Book a demo</span>
          <h1 class="mt-3 font-heading text-3xl sm:text-4xl font-bold text-[var(--vyoma-deep-navy)]">
            See VYOMA on your own fleet
          </h1>
          <p class="mt-4 text-slate-600">
            Tell us a bit about your operation and we'll set up a focused walkthrough &mdash;
            your aircraft, your compliance items, your workflows.
          </p>
          <ul class="mt-6 space-y-2.5 text-sm text-slate-600">
            <li class="flex items-center gap-2"><UIcon name="i-lucide-check" class="w-4 h-4 text-[var(--vyoma-aviation-blue)]" />30-minute walkthrough, tailored to your fleet</li>
            <li class="flex items-center gap-2"><UIcon name="i-lucide-check" class="w-4 h-4 text-[var(--vyoma-aviation-blue)]" />No obligation, no credit card</li>
          </ul>
        </div>
        <div class="bg-white rounded-2xl border border-[var(--vyoma-cloud)] p-6 shadow-sm">
          <SectionsLeadForm type="DEMO_REQUEST" submit-label="Request my demo" />
        </div>
      </div>
    </section>
  </div>
</template>
