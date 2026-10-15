<script setup lang="ts">
import { solutionPath, solutions } from '~/data/solutions'

const footerNav = [
  {
    label: 'Platform',
    items: [
      { label: 'VYOMA ONE', href: '/#capabilities' },
      { label: 'Fleet Management', href: '/#capabilities' },
      { label: 'Maintenance Planning', href: '/#capabilities' },
      { label: 'Airworthiness', href: '/#capabilities' }
    ]
  },
  {
    label: 'Solutions',
    items: solutions.flatMap(s => [{ label: s.label, href: solutionPath(s.id) }, ...(s.children ?? []).map(c => ({ label: c.label, href: solutionPath(c.id) }))])
  },
  {
    label: 'Company',
    items: [
      { label: 'About', href: '/#about' },
      { label: 'FAQs', href: '/#faq' },
      { label: 'Careers', href: '/careers/' }
    ]
  },
  {
    label: 'Connect',
    items: [
      { label: 'Book a Demo', href: '/#demo' },
      { label: 'Ask More', href: '/#demo-ask' },
      { label: 'AVAJet', href: 'https://www.avajet.in' }
    ]
  }
]

const legalNav = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Use', href: '/legal/terms' },
  { label: 'Sitemap', href: '/sitemap' }
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative overflow-hidden bg-navy-deep text-[#c4d4e2]" aria-labelledby="footer-title">
    <h2 id="footer-title" class="sr-only">Site footer</h2>
    <img src="/images/brand/vyoma-logomark.png" alt="" aria-hidden="true" width="774" height="640" class="watermark absolute -right-40 -top-24 opacity-[0.05]" style="height:640px;width:auto" draggable="false" />
    <div class="container-v relative pb-10 pt-16 md:pt-20">
      <div class="flex flex-col gap-8 rounded-[28px] bg-white p-7 md:flex-row md:items-center md:justify-between md:p-9">
        <div>
          <BrandVyomaWordmark :height="38" />
          <p class="mt-4 max-w-[440px] text-[0.95rem] leading-relaxed text-muted">Every aircraft. Every insight. One connected workspace for aviation teams.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a href="/#demo" class="btn btn-primary">
            <span>Book a Demo</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="btn-arrow">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a href="/#demo-ask" class="btn btn-ghost">Ask More</a>
        </div>
      </div>

      <nav aria-label="Footer" class="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        <div v-for="group in footerNav" :key="group.label">
          <h3 class="text-[0.85rem] font-semibold text-white">{{ group.label }}</h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in group.items" :key="item.label">
              <a :href="item.href" class="text-[0.88rem] text-[#a9bdd0] transition-colors hover:text-white">{{ item.label }}</a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.8rem] text-[#7f97ad] md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {{ year }} VYOMA &middot; Part of the
          <a href="https://www.avajet.in" class="text-[#a9bdd0] hover:text-white">AVAJet</a>
          family
        </p>
        <ul class="flex flex-wrap gap-x-6 gap-y-2">
          <li v-for="l in legalNav" :key="l.label">
            <a :href="l.href" class="hover:text-white">{{ l.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
