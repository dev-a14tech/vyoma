<script setup lang="ts">
import { sitePaths, solutionPath } from '~/data/solutions'

definePageMeta({ layout: 'landing' })

usePageSeo({
  description:
    'VYOMA is CAMO software and aircraft maintenance tracking software for airlines, flying training schools and private jet operators. Track airworthiness directives, service bulletins, components and fleet compliance in one place.',
  keywords: 'home'
})

// Features cards: static copy from the design. Icons are Lucide paths (layout-dashboard,
// shield-check, calendar-clock, gauge, file-text, clipboard-check).
interface CapIcon { d?: string, rect?: { width: string, height: string, x: string, y: string, rx: string }, circle?: { cx: string, cy: string, r: string } }

const capabilities: { title: string, body: string, to: string, icon: CapIcon[] }[] = [
  {
    title: 'Fleet Overview',
    body: 'See the status of every aircraft, engine, APU and component at a glance. Know instantly which aircraft are serviceable and what needs attention first.',
    to: '/platform#fleet-management',
    icon: [
      { rect: { width: '7', height: '9', x: '3', y: '3', rx: '1' } },
      { rect: { width: '7', height: '5', x: '14', y: '3', rx: '1' } },
      { rect: { width: '7', height: '9', x: '14', y: '12', rx: '1' } },
      { rect: { width: '7', height: '5', x: '3', y: '16', rx: '1' } }
    ]
  },
  {
    title: 'AD & SB Compliance',
    body: 'Track every airworthiness directive and service bulletin against each aircraft. Due dates are calculated from live hours, cycles and calendar time, so nothing slips through.',
    to: solutionPath('maintenance'),
    icon: [
      { d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' },
      { d: 'm9 12 2 2 4-4' }
    ]
  },
  {
    title: 'Maintenance Planning',
    body: 'Plan MPD and AMP tasks, build due lists and raise work orders from the same data. Act on maintenance before it becomes urgent.',
    to: solutionPath('maintenance'),
    icon: [
      { d: 'M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5' },
      { d: 'M16 2v4' },
      { d: 'M8 2v4' },
      { d: 'M3 10h5' },
      { d: 'M17.5 17.5 16 16.3V14' },
      { circle: { cx: '16', cy: '16', r: '6' } }
    ]
  },
  {
    title: 'Component & LLP Life Tracking',
    body: 'Monitor remaining life on engines, landing gear and life-limited parts. Get warned well before a limit is reached.',
    to: solutionPath('maintenance'),
    icon: [
      { d: 'm12 14 4-4' },
      { d: 'M3.34 19a10 10 0 1 1 17.32 0' }
    ]
  },
  {
    title: 'Digital Tech Logs & Defects',
    body: 'Record flights and defects digitally, traceable from first report to rectification. No more re-keying from paper.',
    to: '/platform#technical-logs',
    icon: [
      { d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z' },
      { d: 'M14 2v4a2 2 0 0 0 2 2h4' },
      { d: 'M10 9H8' },
      { d: 'M16 13H8' },
      { d: 'M16 17H8' }
    ]
  },
  {
    title: 'Audit-Ready Reporting',
    body: 'Generate compliance reports whenever an auditor or regulator asks. Every change to a record is logged with who made it and when.',
    to: solutionPath('management'),
    icon: [
      { rect: { width: '8', height: '4', x: '8', y: '2', rx: '1' } },
      { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' },
      { d: 'm9 14 2 2 4-4' }
    ]
  }
]

const alsoIncludes = [
  { label: 'Airlines', to: solutionPath('airlines') },
  { label: 'Flying training schools', to: solutionPath('flying-training') },
  { label: 'Private jet operators', to: solutionPath('non-scheduled') }
]
</script>

<template>
  <div>
    <LandingSectionsHeroSection />
    <LandingSectionsWhatIsVyomaSection />

    <section id="features" class="features-section" aria-labelledby="cap-title">
      <div class="mx-auto w-full max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
        <div class="section-head">
          <p class="eyebrow">Features</p>
          <h2 id="cap-title" class="h2">Everything airworthiness needs, connected.</h2>
          <p class="lede">Every capability draws on the same aircraft information, so every team sees the same answer.</p>
        </div>
        <div class="cap-grid">
          <NuxtLink v-for="cap in capabilities" :key="cap.title" :to="cap.to" class="cap-card">
            <span class="icon-tile">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <template v-for="(part, i) in cap.icon" :key="i">
                  <path v-if="part.d" :d="part.d" />
                  <rect v-else-if="part.rect" v-bind="part.rect" />
                  <circle v-else-if="part.circle" v-bind="part.circle" />
                </template>
              </svg>
            </span>
            <h3>{{ cap.title }}</h3>
            <p>{{ cap.body }}</p>
            <span class="link-arrow">
              Learn more
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </NuxtLink>
        </div>
        <p class="also-line">
          Also includes flight scheduling, training school and private jet operations.
          <NuxtLink v-for="link in alsoIncludes" :key="link.label" :to="link.to">{{ link.label }}</NuxtLink>
        </p>
        <div class="section-cta">
          <NuxtLink :to="sitePaths.platform" class="btn btn--primary">
            Explore the Platform
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
          <NuxtLink :to="sitePaths.demo" class="btn btn--ghost">Book a Demo</NuxtLink>
        </div>
      </div>
    </section>

    <LandingSectionsDemoSection />
  </div>
</template>
