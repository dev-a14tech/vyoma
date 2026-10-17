<script setup lang="ts">
import { sitePaths } from '~/data/solutions'

usePageSeo({
  title: 'Book a CAMO Software Demo',
  description: 'See VYOMA on your own fleet data. Book a focused demo of our CAMO and aircraft maintenance software for airlines, flying training schools and private jet operators.',
  keywords: 'request-demo'
})

const steps = [
  { n: '01', title: 'Discover VYOMA', text: 'Get to know the platform and the problems it solves for aviation teams.' },
  { n: '02', title: 'Book a demo', text: 'Tell us about your fleet and the workflows you want to improve.' },
  { n: '03', title: 'See it in action', text: 'A walkthrough tailored to your aircraft, your teams and your priorities.' },
  { n: '04', title: 'Plan your onboarding', text: 'Agree scope, data migration and training with the VYOMA team.' }
]

const highlights = [
  'A walkthrough built around your aircraft and processes',
  'Time for your teams to ask questions',
  'A clear view of onboarding and next steps'
]
</script>

<template>
  <div>
    <SectionsHeroSection
      :breadcrumbs="[{ label: 'Home', to: sitePaths.home }, { label: 'Book a Demo' }]"
      eyebrow="Book a demo"
      title="See VYOMA with your fleet in mind."
      subtitle="A walkthrough tailored to your aircraft, your teams and your workflows. We'll also show you how existing records move into VYOMA."
      hide-actions
    />

    <section class="section bg-white">
      <div class="container-v grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-28">
            <h2 class="font-display text-[1.5rem] font-semibold text-navy">See Aviation Intelligence in Action.</h2>
            <p class="lede mt-4 max-w-[440px]">Tell us about your fleet and the workflows you want to improve. We'll tailor a walkthrough of VYOMA to your operation.</p>
            <ul class="mt-7 space-y-3.5">
              <li v-for="h in highlights" :key="h" class="flex items-start gap-3 text-[0.95rem] text-ink">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="mt-0.5 shrink-0 text-ocean">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {{ h }}
              </li>
            </ul>
            <p class="mt-8 text-[0.9rem] text-muted">
              Have a question first?
              <NuxtLink :to="sitePaths.contact" class="font-medium text-ocean hover:underline">Contact us</NuxtLink>.
            </p>
          </div>
        </div>

        <div v-reveal class="rounded-v-lg border border-line bg-white p-7 shadow-v lg:col-span-7">
          <h2 class="font-display text-[1.3rem] font-semibold text-navy">Request your demo</h2>
          <div class="mt-5">
            <SectionsLeadForm type="DEMO_REQUEST" submit-label="Request a Demo" />
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-ice">
      <div class="container-v">
        <div class="max-w-[680px]">
          <p class="eyebrow">What happens next</p>
          <h2 class="display-lg mt-3.5 text-navy">From First Look to Live Fleet.</h2>
        </div>
        <ol class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(s, i) in steps" :key="s.n" v-reveal="i * 100" class="rounded-v border border-line bg-white p-6">
            <span class="font-display text-[1.6rem] font-semibold text-sky">{{ s.n }}</span>
            <h3 class="mt-3 text-[1rem] font-semibold text-navy">{{ s.title }}</h3>
            <p class="mt-2 text-[0.9rem] leading-relaxed text-muted">{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>
