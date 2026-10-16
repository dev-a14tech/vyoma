<script setup lang="ts">
import { avajetUrl, footerCompanyLinks, footerPlatformLinks, footerSolutionLinks, legalLinks, sitePaths } from '~/data/solutions'

const columns = [
  { label: 'Platform', items: footerPlatformLinks },
  { label: 'Solutions', items: footerSolutionLinks },
  { label: 'Company', items: footerCompanyLinks }
]

const year = new Date().getFullYear()

const linkClass = 'inline-block py-1.5 text-[0.9rem] text-footer-link transition-colors duration-200 hover:text-white'
</script>

<template>
  <footer class="relative overflow-hidden bg-navy-deep pb-7 pt-[clamp(56px,7vw,88px)] text-footer-text">
    <img src="/images/brand/vyoma-logomark.png" alt="" aria-hidden="true" width="752" height="622" class="pointer-events-none absolute -bottom-40 -right-35 h-auto w-130 select-none opacity-5" draggable="false" />
    <div class="mx-auto w-full max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
      <div class="relative grid items-center gap-6 rounded-v-lg bg-white p-[clamp(24px,3vw,36px)] text-muted md:grid-cols-[1fr_auto]">
        <div>
          <img src="/images/brand/vyoma-logo-full.png" alt="VYOMA" width="140" height="43" class="h-auto w-35" draggable="false" />
          <p class="mt-3 max-w-105 text-[0.95rem]">CAMO software for the teams who keep aircraft flying.</p>
          <p class="mt-1.5 max-w-105 text-[0.88rem]">Every aircraft. Every insight. One connected workspace for aviation teams.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <NuxtLink :to="sitePaths.demo" class="btn btn--primary">
            Book a Demo
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
          <NuxtLink :to="sitePaths.contact" class="btn btn--ghost">Contact Us</NuxtLink>
        </div>
      </div>

      <nav aria-label="Footer" class="relative mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        <div v-for="col in columns" :key="col.label">
          <h2 class="text-[0.85rem] font-semibold text-white">{{ col.label }}</h2>
          <ul class="mt-3">
            <li v-for="item in col.items" :key="item.href">
              <NuxtLink :to="item.href" :class="linkClass">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-[0.85rem] font-semibold text-white">Contact</h2>
          <ul class="mt-3">
            <li><NuxtLink :to="sitePaths.demo" :class="linkClass">Book a Demo</NuxtLink></li>
            <li><NuxtLink :to="sitePaths.contact" :class="linkClass">Ask a question</NuxtLink></li>
            <li><NuxtLink :to="avajetUrl" rel="noopener" :class="linkClass">AVAJet ↗</NuxtLink></li>
          </ul>
        </div>
      </nav>

      <div class="relative mt-14 flex flex-col gap-3 border-t border-white/10 pt-5 text-[0.82rem] text-footer-dim md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {{ year }} VYOMA &middot; Part of the
          <NuxtLink :to="avajetUrl" rel="noopener" class="inline-block py-1.5 hover:text-white">AVAJet</NuxtLink>
          family &middot; Powered by A14 Technologies
        </p>
        <ul class="flex flex-wrap gap-x-5 gap-y-1">
          <li v-for="l in legalLinks" :key="l.href">
            <NuxtLink :to="l.href" class="inline-block py-1.5 hover:text-white">{{ l.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
