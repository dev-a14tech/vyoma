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
      <nav aria-label="Footer" class="relative grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
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
          </ul>
        </div>
      </nav>

      <div class="relative mt-14 flex flex-col gap-3 border-t border-white/10 pt-5 text-[0.82rem] text-footer-dim md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {{ year }} VYOMA &middot; Part of
          <NuxtLink :to="avajetUrl" target="_blank" rel="noopener" class="inline-block py-1.5 hover:text-white">AVAJet Aviation Group</NuxtLink>
          &amp; powered by
          <NuxtLink to="https://www.a14technologies.com/" target="_blank" rel="noopener" class="inline-block py-1.5 hover:text-white">A14 Technologies</NuxtLink>
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
