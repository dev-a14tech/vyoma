<script setup lang="ts">
import { solutionPath, solutions } from '~/data/solutions'

definePageMeta({ layout: 'landing' })

usePageSeo({
  title: 'Sitemap',
  description: 'Every page and section of the VYOMA website in one place: platform, solutions for airlines, flying training schools and private jet operators, company and legal pages.'
})

interface MapItem { label: string; href: string; indent?: boolean }

const groups: Array<{ label: string; items: MapItem[] }> = [
  {
    label: 'Platform',
    items: [
      { label: 'Home', href: '/' },
      { label: 'VYOMA ONE', href: '/#capabilities' },
      { label: 'What is VYOMA', href: '/#what-we-do' },
      { label: 'Security', href: '/#security' }
    ]
  },
  {
    label: 'Solutions',
    items: [{ label: 'All solutions', href: '/solutions' }, ...solutions.flatMap(s => [
      { label: s.label, href: solutionPath(s.id) },
      ...(s.children ?? []).map(c => ({ label: c.label, href: solutionPath(c.id), indent: true }))
    ])]
  },
  {
    label: 'Company',
    items: [
      { label: 'About', href: '/#about' },
      { label: 'FAQs', href: '/#faq' },
      { label: 'Book a Demo', href: '/#demo' },
      { label: 'Ask More', href: '/#demo-ask' },
      { label: 'Careers', href: '/careers/' }
    ]
  },
  {
    label: 'Legal',
    items: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Use', href: '/legal/terms' }
    ]
  }
]
</script>

<template>
  <section class="hero-bg pb-28 pt-20">
    <div class="container-v max-w-205">
      <a href="/" class="text-[0.85rem] font-medium text-ocean hover:underline">&larr; Back to home</a>
      <h1 v-reveal class="display-lg mt-6 text-navy">Sitemap</h1>
      <p v-reveal="100" class="lede mt-5">Every page and section of the VYOMA website.</p>
      <div class="mt-12 grid gap-10 sm:grid-cols-2">
        <nav v-for="(group, i) in groups" :key="group.label" v-reveal="(i % 2) * 120" :aria-label="group.label">
          <h2 class="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ocean">{{ group.label }}</h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in group.items" :key="item.href + item.label" :class="item.indent ? 'pl-4' : ''">
              <a :href="item.href" class="text-[0.95rem] text-navy hover:underline">{{ item.label }}</a>
            </li>
          </ul>
        </nav>
      </div>
      <p class="mt-14 text-[0.88rem] text-muted">
        Looking for the machine-readable version? <a href="/sitemap.xml" class="font-medium text-ocean hover:underline">sitemap.xml</a>
      </p>
    </div>
  </section>
</template>
