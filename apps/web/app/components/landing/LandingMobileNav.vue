<script setup lang="ts">
import { companyLinks, operationTypeLinks, platformLinks, primaryLinks, sitePaths, solutionModuleLinks } from '~/data/solutions'

const emit = defineEmits<{ close: [] }>()
const route = useRoute()
const router = useRouter()

// Closes the menu on every link, including one to the current page (no route change), and
// scrolls to the section for a same-page hash link, which the router skips as a duplicate.
function onLinkClick(to: string) {
  emit('close')
  const target = router.resolve(to)
  if (target.hash && target.fullPath === route.fullPath) {
    // After the menu unmounts and the page scroll lock is released.
    nextTick(() => document.getElementById(decodeURIComponent(target.hash.slice(1)))?.scrollIntoView())
  }
}

// Close on navigation and when the window grows into the desktop nav.
watch(() => route.fullPath, () => emit('close'))

onMounted(() => {
  const desktop = window.matchMedia('(min-width: 1024px)')
  const onChange = (mq: MediaQueryListEvent) => {
    if (mq.matches) emit('close')
  }
  if (desktop.matches) emit('close')
  desktop.addEventListener('change', onChange)
  onBeforeUnmount(() => desktop.removeEventListener('change', onChange))
})

const rowClass = 'flex min-h-13 cursor-pointer list-none items-center justify-between border-b border-line px-1 text-[1.02rem] font-medium text-navy [&::-webkit-details-marker]:hidden'
const subClass = 'border-b border-line pb-2.5 pl-3 pt-1.5'
const subLinkClass = 'block px-1 py-2.5 text-[0.95rem] text-muted hover:text-ocean aria-[current=page]:text-ocean'
const subLabelClass = 'px-1 pb-0.5 pt-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted'
</script>

<template>
  <nav id="mobile-nav" aria-label="Mobile" class="fixed inset-x-0 bottom-0 top-(--header-h) z-49 overflow-y-auto overscroll-contain border-t border-line bg-white px-(--gutter) pb-8 pt-3 lg:hidden">
    <ul>
      <li>
        <NuxtLink :to="sitePaths.home" :class="rowClass" @click="onLinkClick(sitePaths.home)">Home</NuxtLink>
      </li>
      <li>
        <details class="group">
          <summary :class="rowClass">
            Platform
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="transition-transform duration-200 group-open:rotate-180">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div :class="subClass">
            <NuxtLink v-for="item in platformLinks" :key="item.href" :to="item.href" :class="subLinkClass" @click="onLinkClick(item.href)">{{ item.label }}</NuxtLink>
          </div>
        </details>
      </li>
      <li>
        <details class="group">
          <summary :class="rowClass">
            Solutions
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="transition-transform duration-200 group-open:rotate-180">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div :class="subClass">
            <NuxtLink :to="sitePaths.solutions" :class="subLinkClass" @click="onLinkClick(sitePaths.solutions)">All solutions</NuxtLink>
            <p :class="subLabelClass">Modules</p>
            <NuxtLink v-for="item in solutionModuleLinks" :key="item.href" :to="item.href" :class="subLinkClass" @click="onLinkClick(item.href)">{{ item.label }}</NuxtLink>
            <p :class="subLabelClass">Operations by type</p>
            <NuxtLink v-for="item in operationTypeLinks" :key="item.href" :to="item.href" :class="subLinkClass" @click="onLinkClick(item.href)">{{ item.label }}</NuxtLink>
          </div>
        </details>
      </li>
      <li>
        <details class="group">
          <summary :class="rowClass">
            Company
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="transition-transform duration-200 group-open:rotate-180">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div :class="subClass">
            <NuxtLink v-for="item in companyLinks" :key="item.href" :to="item.href" :class="subLinkClass" @click="onLinkClick(item.href)">{{ item.label }}</NuxtLink>
          </div>
        </details>
      </li>
      <li v-for="item in primaryLinks" :key="item.href">
        <NuxtLink :to="item.href" :class="rowClass" @click="onLinkClick(item.href)">{{ item.label }}</NuxtLink>
      </li>
    </ul>
    <div class="mt-6 grid gap-2.5">
      <NuxtLink :to="sitePaths.demo" class="btn btn--primary" @click="onLinkClick(sitePaths.demo)">
        Book a Demo
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </NuxtLink>
      <NuxtLink :to="sitePaths.contact" class="btn btn--ghost" @click="onLinkClick(sitePaths.contact)">Ask a Question</NuxtLink>
    </div>
  </nav>
</template>
