<script setup lang="ts">
useSeoMeta({
  title: 'Contact',
  description: 'Get in touch with the VYOMA team.'
})
</script>

<template>
  <div>
    <section class="border-b border-[var(--vyoma-cloud)]">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <span class="text-xs font-semibold tracking-widest uppercase text-[var(--vyoma-aviation-blue)]">Contact</span>
          <h1 class="mt-3 font-heading text-3xl sm:text-4xl font-bold text-[var(--vyoma-deep-navy)]">Let's talk</h1>
          <p class="mt-4 text-slate-600">
            Questions about VYOMA, partnerships, or anything else &mdash; reach out and we'll get back to you.
          </p>
          <div class="mt-8 space-y-3 text-sm text-slate-600">
            <p class="flex items-center gap-2"><UIcon name="i-lucide-mail" class="w-4 h-4 text-[var(--vyoma-aviation-blue)]" />info@avajet.in</p>
            <p class="flex items-center gap-2"><UIcon name="i-lucide-map-pin" class="w-4 h-4 text-[var(--vyoma-aviation-blue)]" />HQ: Mumbai &middot; Offices: Hyderabad, Dubai</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-[var(--vyoma-cloud)] p-6 shadow-sm">
          <SectionsLeadForm type="CONTACT" submit-label="Send message" />
        </div>
      </div>
    </section>
  </div>
</template>
