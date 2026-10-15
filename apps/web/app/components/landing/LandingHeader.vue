<script setup lang="ts">
import { solutionHref, solutions } from '~/data/solutions'
import type { NavGroup } from '~/types/nav'

const mainNav: NavGroup[] = [
  {
    label: 'Platform',
    items: [
      { label: 'VYOMA ONE', href: '/#capabilities', description: 'The connected aviation platform' },
      { label: 'Key Features', href: '/#features', description: 'Everything VYOMA brings together' },
      { label: 'Fleet Management', href: '/#features', description: 'Every aircraft, one clear view' },
      { label: 'Maintenance Planning', href: '/#features', description: "See what's due, before it's urgent" },
      { label: 'Airworthiness & Compliance', href: '/#features', description: 'Compliance status you can show' },
      { label: 'Technical Records', href: '/#features', description: 'Structured, traceable records' }
    ]
  },
  {
    label: 'Solutions',
    items: solutions.map(s => ({
      label: s.label,
      href: solutionHref(s.id),
      children: s.children?.map(c => ({ label: c.label, href: solutionHref(c.id) }))
    }))
  },
  {
    label: 'Company',
    items: [
      { label: 'About VYOMA', href: '/#about' },
      { label: 'Getting Started', href: '/#getting-started' },
      { label: 'FAQs', href: '/#faq' },
      { label: 'Careers', href: '/careers/' }
    ]
  }
]

const open = ref<string | null>(null)
const drawer = ref(false)
const scrolled = ref(false)
const navEl = ref<HTMLElement | null>(null)
let closeTimer: ReturnType<typeof setTimeout> | null = null

function enter(label: string) {
  if (closeTimer) clearTimeout(closeTimer)
  open.value = label
}
function leave() {
  closeTimer = setTimeout(() => (open.value = null), 140)
}

onMounted(() => {
  const onScroll = () => (scrolled.value = window.scrollY > 8)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      open.value = null
      drawer.value = false
    }
  }
  const onClick = (e: MouseEvent) => {
    if (navEl.value && !navEl.value.contains(e.target as Node)) open.value = null
  }
  document.addEventListener('keydown', onKey)
  document.addEventListener('mousedown', onClick)

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('keydown', onKey)
    document.removeEventListener('mousedown', onClick)
  })
})

watch(drawer, (isOpen) => {
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300"
    :class="scrolled || open ? 'header-glass border-b border-line/80' : 'border-b border-transparent'"
  >
    <div class="container-v flex h-[72px] items-center justify-between gap-6">
      <a href="/#top" class="shrink-0 rounded-md" aria-label="VYOMA home">
        <BrandVyomaWordmark :height="30" />
      </a>

      <nav ref="navEl" aria-label="Main" class="hidden lg:block">
        <ul class="flex items-center gap-1">
          <li
            v-for="group in mainNav"
            :key="group.label"
            class="relative"
            @mouseenter="enter(group.label)"
            @mouseleave="leave"
          >
            <button
              type="button"
              class="flex h-10 items-center gap-1 rounded-full px-3.5 text-[0.92rem] font-medium transition-colors"
              :class="open === group.label ? 'bg-mist text-navy' : 'text-ink/80 hover:text-navy'"
              :aria-expanded="open === group.label"
              :aria-controls="`menu-${group.label}`"
              @click="open = open === group.label ? null : group.label"
            >
              {{ group.label }}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="transition-transform duration-200" :class="open === group.label ? 'rotate-180' : ''">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              v-if="open === group.label"
              :id="`menu-${group.label}`"
              class="nav-panel absolute left-1/2 top-full -translate-x-1/2 pt-3"
              :class="group.label === 'Platform' ? 'w-[340px]' : 'w-[280px]'"
            >
              <div class="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-[0_24px_60px_-20px_rgba(20,55,88,0.35)]">
                <ul>
                  <li v-for="item in group.items" :key="item.label">
                    <a :href="item.href" class="group flex items-start justify-between gap-3 rounded-xl px-3.5 py-2.5 hover:bg-ice focus-visible:bg-ice" @click="open = null">
                      <span>
                        <span class="block text-[0.9rem] font-medium text-navy">{{ item.label }}</span>
                        <span v-if="item.description" class="mt-0.5 block text-[0.8rem] text-muted">{{ item.description }}</span>
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="mt-1 shrink-0 -translate-x-1 text-sky opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                        <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                      </svg>
                    </a>
                    <ul v-if="item.children" class="mb-1">
                      <li v-for="child in item.children" :key="child.label">
                        <a :href="child.href" class="group flex items-start justify-between gap-3 rounded-xl py-2 pl-7 pr-3.5 hover:bg-ice focus-visible:bg-ice" @click="open = null">
                          <span class="block text-[0.85rem] text-muted group-hover:text-navy">{{ child.label }}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="mt-0.5 shrink-0 -translate-x-1 text-sky opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                            <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <a href="/#demo-ask" class="hidden h-10 items-center rounded-full px-4 text-[0.92rem] font-medium text-navy hover:bg-mist md:inline-flex">Ask More</a>
        <a href="/#demo" class="btn btn-primary btn-sm hidden sm:inline-flex">
          <span>Book a Demo</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="btn-arrow">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </a>
        <button
          type="button"
          class="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-navy lg:hidden"
          :aria-label="drawer ? 'Close menu' : 'Open menu'"
          :aria-expanded="drawer"
          aria-controls="mobile-nav"
          @click="drawer = !drawer"
        >
          <svg v-if="drawer" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" />
          </svg>
        </button>
      </div>
    </div>

    <LandingMobileNav v-if="drawer" :nav="mainNav" @close="drawer = false" />
  </header>
</template>
