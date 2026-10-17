<script setup lang="ts">
import { sitePaths } from '~/data/solutions'

usePageSeo({
  title: 'Contact VYOMA',
  description: 'Talk to the VYOMA team about CAMO software, aircraft maintenance tracking and fleet compliance for your airline, flying school or private jet operation.',
  keywords: 'contact'
})
</script>

<template>
  <div>
    <SectionsHeroSection
      :breadcrumbs="[{ label: 'Home', to: sitePaths.home }, { label: 'Contact' }]"
      eyebrow="Contact"
      title="Ask us anything."
      subtitle="Have a question about VYOMA, your fleet or onboarding? Send it to the team and we'll get back to you."
      hide-actions
    />

    <section class="section bg-white">
      <div class="container-v grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="space-y-6 lg:col-span-5">
          <div v-reveal class="ps-card">
            <h2 class="font-display text-[1.15rem] font-semibold text-navy">Want to see VYOMA?</h2>
            <p class="mt-1.5 text-[0.92rem] text-muted">Book a walkthrough tailored to your operation.</p>
            <NuxtLink :to="sitePaths.demo" class="btn btn--primary btn--sm mt-5 self-start">
              Book a Demo
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <div v-reveal="100" class="ps-card">
            <h2 class="font-display text-[1.15rem] font-semibold text-navy">Common questions</h2>
            <p class="mt-1.5 text-[0.92rem] text-muted">Quick answers about the platform, demos and onboarding.</p>
            <NuxtLink :to="sitePaths.faq" class="mt-5 inline-flex items-center gap-1.5 self-start font-medium text-ocean hover:underline">
              Read the FAQ
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <div v-reveal="200" class="ps-card">
            <h2 class="font-display text-[1.15rem] font-semibold text-navy">Contact details</h2>
            <ul class="mt-3 space-y-2 text-[0.92rem] text-muted">
              <li class="flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="shrink-0 text-ocean">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" />
                </svg>
                info@avajet.in
              </li>
              <li class="flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="shrink-0 text-ocean">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 99875 27320
              </li>
              <li class="flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="shrink-0 text-ocean">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                </svg>
                HQ: Mumbai &middot; Offices: Hyderabad, Dubai
              </li>
            </ul>
          </div>
        </div>

        <div v-reveal="120" class="rounded-v-lg border border-line bg-white p-7 shadow-v lg:col-span-7">
          <h2 class="font-display text-[1.3rem] font-semibold text-navy">Send a question</h2>
          <div class="mt-5">
            <SectionsLeadForm type="CONTACT" submit-label="Send Question" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
