<script setup lang="ts">
import { companyLinks, operationTypeLinks, platformLinks, primaryLinks, sitePaths, solutionModuleLinks } from '~/data/solutions'

type MenuId = 'platform' | 'solutions' | 'company'

const route = useRoute()
const router = useRouter()
const open = ref<MenuId | null>(null)
const drawer = ref(false)
const scrolled = ref(false)
const navEl = ref<HTMLElement | null>(null)
const toggleEl = ref<HTMLButtonElement | null>(null)
// Hover opens the menus only on devices with a real pointer; touch relies on tapping.
let hoverCapable = false
let closeTimer: ReturnType<typeof setTimeout> | null = null

// The top-level item the current page belongs to, coloured ocean in the nav.
const section = computed(() => {
  const p = route.path
  if (p.startsWith('/platform') || p.startsWith('/why-vyoma')) return 'platform'
  if (p.startsWith('/solutions')) return 'solutions'
  if (p.startsWith('/about') || p.startsWith('/careers')) return 'company'
  if (p.startsWith('/faq')) return 'faq'
  if (p.startsWith('/contact')) return 'contact'
  return null
})

function onMenuClick(id: MenuId, e: MouseEvent) {
  // A mouse click on a hover-opened menu keeps it open; keyboard (detail 0) and touch toggle it.
  open.value = hoverCapable && e.detail > 0 ? id : open.value === id ? null : id
}
function onMenuEnter(id: MenuId) {
  if (!hoverCapable) return
  if (closeTimer) clearTimeout(closeTimer)
  open.value = id
}
function onMenuLeave(id: MenuId) {
  if (!hoverCapable) return
  closeTimer = setTimeout(() => {
    if (open.value === id) open.value = null
  }, 160)
}
function onMenuFocusOut(id: MenuId, e: FocusEvent) {
  const item = e.currentTarget as HTMLElement
  if (!item.contains(e.relatedTarget as Node | null) && open.value === id) open.value = null
}

// Runs alongside NuxtLink's own navigation. The route watcher below only fires when the URL
// changes, so this also closes the menu for a link to the current page, and scrolls to the
// section for a same-page hash link (the router skips those as a duplicate navigation).
function onItemClick(to: string) {
  if (closeTimer) clearTimeout(closeTimer)
  open.value = null
  const target = router.resolve(to)
  if (target.hash && target.fullPath === route.fullPath) {
    document.getElementById(decodeURIComponent(target.hash.slice(1)))?.scrollIntoView()
  }
}

onMounted(() => {
  hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const onScroll = () => (scrolled.value = window.scrollY > 8)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return
    if (open.value) {
      navEl.value?.querySelector<HTMLButtonElement>(`[aria-controls="menu-${open.value}"]`)?.focus()
      open.value = null
    }
    if (drawer.value) {
      drawer.value = false
      toggleEl.value?.focus()
    }
  }
  const onClick = (e: MouseEvent) => {
    if (navEl.value && !navEl.value.contains(e.target as Node)) open.value = null
  }
  document.addEventListener('keydown', onKey)
  document.addEventListener('click', onClick)

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('keydown', onKey)
    document.removeEventListener('click', onClick)
    if (closeTimer) clearTimeout(closeTimer)
    document.documentElement.style.overflow = ''
  })
})

watch(() => route.fullPath, () => {
  open.value = null
})

watch(drawer, (isOpen) => {
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
})

const navLinkClass = (active: boolean, isOpen = false) => [
  'inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[0.92rem] font-medium transition-colors duration-200 hover:bg-ice hover:text-navy lg:max-[1100px]:px-2.5',
  isOpen ? 'bg-ice text-navy' : active ? 'text-ocean' : 'text-ink'
]
const chevronClass = (isOpen: boolean) => ['size-3.75 transition-transform duration-200', isOpen ? 'rotate-180' : '']
const menuClass = (id: MenuId) => [
  'absolute left-1/2 top-[calc(100%+10px)] z-10 -translate-x-1/2 rounded-v border border-line bg-white p-2.5 shadow-v [transition:opacity_0.18s,translate_0.18s_var(--ease-out-soft),visibility_0.18s]',
  open.value === id ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1.5 opacity-0'
]
const menuItemClass = 'block rounded-v-sm px-3 py-2.5 transition-colors duration-150 hover:bg-ice aria-[current=page]:bg-ice'
const menuLabelClass = 'px-3 pb-1 pt-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted'
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 h-(--header-h) border-b bg-white/82 backdrop-blur-[14px] backdrop-saturate-160 transition-[border-color,box-shadow] duration-250"
    :class="scrolled ? 'border-line shadow-header' : 'border-transparent'"
  >
    <div class="mx-auto flex h-full w-full max-w-[calc(var(--container)+2*var(--gutter))] items-center justify-between gap-4 px-(--gutter)">
      <NuxtLink :to="sitePaths.home" class="inline-flex shrink-0" aria-label="VYOMA home">
        <img src="/images/brand/vyoma-logo-full.png" alt="VYOMA" width="132" height="41" class="h-auto w-31 lg:w-33" draggable="false" />
      </NuxtLink>

      <nav ref="navEl" aria-label="Main" class="hidden lg:block">
        <ul class="flex items-center gap-1">
          <li class="relative" @mouseenter="onMenuEnter('platform')" @mouseleave="onMenuLeave('platform')" @focusout="onMenuFocusOut('platform', $event)">
            <button
              type="button"
              :class="navLinkClass(section === 'platform', open === 'platform')"
              :aria-expanded="open === 'platform'"
              aria-controls="menu-platform"
              @click="onMenuClick('platform', $event)"
            >
              Platform
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" :class="chevronClass(open === 'platform')">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div id="menu-platform" class="min-w-67.5" :class="menuClass('platform')">
              <NuxtLink v-for="item in platformLinks" :key="item.href" :to="item.href" :class="menuItemClass" @click="onItemClick(item.href)">
                <strong class="block text-[0.92rem] font-semibold text-navy">{{ item.label }}</strong>
                <span class="mt-0.5 block text-[0.82rem] leading-[1.45] text-muted">{{ item.description }}</span>
              </NuxtLink>
            </div>
          </li>

          <li class="relative" @mouseenter="onMenuEnter('solutions')" @mouseleave="onMenuLeave('solutions')" @focusout="onMenuFocusOut('solutions', $event)">
            <button
              type="button"
              :class="navLinkClass(section === 'solutions', open === 'solutions')"
              :aria-expanded="open === 'solutions'"
              aria-controls="menu-solutions"
              @click="onMenuClick('solutions', $event)"
            >
              Solutions
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" :class="chevronClass(open === 'solutions')">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div id="menu-solutions" class="grid w-150 grid-cols-2 gap-1.5" :class="menuClass('solutions')">
              <div>
                <p :class="menuLabelClass">Modules</p>
                <NuxtLink v-for="item in solutionModuleLinks" :key="item.href" :to="item.href" :class="menuItemClass" @click="onItemClick(item.href)">
                  <strong class="block text-[0.92rem] font-semibold text-navy">{{ item.label }}</strong>
                  <span class="mt-0.5 block text-[0.82rem] leading-[1.45] text-muted">{{ item.description }}</span>
                </NuxtLink>
              </div>
              <div>
                <p :class="menuLabelClass">Operations by type</p>
                <NuxtLink v-for="item in operationTypeLinks" :key="item.href" :to="item.href" :class="menuItemClass" @click="onItemClick(item.href)">
                  <strong class="block text-[0.92rem] font-semibold text-navy">{{ item.label }}</strong>
                  <span class="mt-0.5 block text-[0.82rem] leading-[1.45] text-muted">{{ item.description }}</span>
                </NuxtLink>
                <NuxtLink :to="sitePaths.solutions" class="group mx-3 mb-1 mt-1.5 inline-flex items-center gap-2 font-medium text-ocean" @click="onItemClick(sitePaths.solutions)">
                  All solutions
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="transition-transform duration-200 ease-out-soft group-hover:translate-x-0.75">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </li>

          <li class="relative" @mouseenter="onMenuEnter('company')" @mouseleave="onMenuLeave('company')" @focusout="onMenuFocusOut('company', $event)">
            <button
              type="button"
              :class="navLinkClass(section === 'company', open === 'company')"
              :aria-expanded="open === 'company'"
              aria-controls="menu-company"
              @click="onMenuClick('company', $event)"
            >
              Company
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" :class="chevronClass(open === 'company')">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div id="menu-company" class="min-w-67.5" :class="menuClass('company')">
              <NuxtLink v-for="item in companyLinks" :key="item.href" :to="item.href" :class="menuItemClass" @click="onItemClick(item.href)">
                <strong class="block text-[0.92rem] font-semibold text-navy">{{ item.label }}</strong>
                <span class="mt-0.5 block text-[0.82rem] leading-[1.45] text-muted">{{ item.description }}</span>
              </NuxtLink>
            </div>
          </li>

          <li v-for="item in primaryLinks" :key="item.href">
            <NuxtLink :to="item.href" :class="navLinkClass(section === item.href.slice(1))" @click="onItemClick(item.href)">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2.5">
        <NuxtLink :to="sitePaths.demo" class="btn btn--primary btn--sm hidden min-[480px]:inline-flex">Book a Demo</NuxtLink>
        <button
          ref="toggleEl"
          type="button"
          class="grid size-11 place-items-center rounded-full border border-line bg-white text-navy lg:hidden"
          :aria-label="drawer ? 'Close menu' : 'Open menu'"
          :aria-expanded="drawer"
          aria-controls="mobile-nav"
          @click="drawer = !drawer"
        >
          <svg v-if="drawer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Teleported: the header's backdrop-filter would otherwise trap this fixed panel inside its 72px. -->
    <Teleport to="body">
      <LandingMobileNav v-if="drawer" @close="drawer = false" />
    </Teleport>
  </header>
</template>
