<script setup lang="ts">
import { avajetUrl, sitePaths } from '~/data/solutions'

const { data: page } = await usePageContent('about')

usePageSeo({
  title: page.value?.seoTitle ?? 'About VYOMA',
  description:
    page.value?.seoDescription ??
    'VYOMA is an aviation software platform built to manage risk across the aircraft lifecycle: maintenance, airworthiness, operations and logistics.',
  keywords: 'about'
})

const defaultSubtitle = 'Vyoma means sky in Sanskrit. We build software for the teams who keep aircraft flying: the people who plan maintenance, track airworthiness and decide what happens to every aircraft next.'

const principles = [
  { title: 'Records first', text: 'Every insight depends on the record behind it, so data entry is guided, structured and checked at the source.' },
  { title: 'Show the next action', text: 'A number is only useful if it says what to do. Priorities come with the context needed to act on them.' },
  { title: 'Built for the people doing the work', text: 'Planners, engineers and airworthiness managers should find what they need in a few clicks, not a few hours.' }
]
</script>

<template>
  <div>
    <SectionsHeroSection
      :breadcrumbs="[{ label: 'Home', to: sitePaths.home }, { label: 'About' }]"
      eyebrow="About"
      :title="page?.heroTitle ?? 'Built for the Next Era of Aviation.'"
      :subtitle="page?.heroSubtitle || defaultSubtitle"
      hide-actions
    />

    <section class="section bg-white">
      <div class="container-v grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-5">
          <p class="eyebrow">Why VYOMA exists</p>
          <h2 class="display-lg mt-3.5 text-navy">Built for the teams who keep aircraft flying.</h2>
          <p class="lede mt-5 max-w-[440px]">
            The information that aviation decisions depend on is still scattered across paper, spreadsheets and disconnected systems.
            VYOMA brings it together in one place, so teams can act on a single, current record.
          </p>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          <div v-reveal class="ps-card">
            <h3 class="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ocean">Vision</h3>
            <p class="mt-2.5 text-[1rem] leading-relaxed text-navy">Every aviation team working from one clear, current picture of every aircraft.</p>
          </div>
          <div v-reveal="100" class="ps-card">
            <h3 class="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ocean">Mission</h3>
            <p class="mt-2.5 text-[1rem] leading-relaxed text-navy">Make airworthiness, maintenance and operations information connected, structured and easy to act on.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-ice">
      <div class="container-v">
        <div class="max-w-[680px]">
          <p class="eyebrow">How we build</p>
          <h2 class="display-lg mt-3.5 text-navy">Our principles.</h2>
        </div>
        <div class="mt-12 grid gap-5 md:grid-cols-3">
          <div v-for="(p, i) in principles" :key="p.title" v-reveal="i * 100" class="ps-card">
            <h3 class="text-[1.02rem] font-semibold text-navy">{{ p.title }}</h3>
            <p class="mt-2.5 text-[0.92rem] leading-relaxed text-muted">{{ p.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="avajet" class="section bg-white">
      <div class="container-v grid gap-5 sm:grid-cols-2">
        <div v-reveal class="ps-card">
          <h2 class="font-display text-[1.15rem] font-semibold text-navy">Part of AVAJet Aviation Group</h2>
          <p class="mt-2 text-[0.92rem] leading-relaxed text-muted">
            VYOMA brings AVAJet's experience in managing risk across the aircraft lifecycle into software.
          </p>
          <a :href="avajetUrl" target="_blank" rel="noopener" class="mt-5 inline-flex items-center gap-1.5 self-start font-medium text-ocean hover:underline">
            Visit AVAJet
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
        <div v-reveal="100" class="ps-card">
          <h2 class="font-display text-[1.15rem] font-semibold text-navy">Work with us</h2>
          <p class="mt-2 text-[0.92rem] leading-relaxed text-muted">See current openings at VYOMA.</p>
          <NuxtLink :to="sitePaths.careers" class="mt-5 inline-flex items-center gap-1.5 self-start font-medium text-ocean hover:underline">
            View Careers
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <SectionsDemoRequestCta />
  </div>
</template>
