<script setup lang="ts">
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Platform', to: '/platform' },
  { label: 'Features', to: '/features' },
  { label: 'Why VYOMA', to: '/why-vyoma' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
]

const solutionsLinks = [
  { label: 'Airline Operators', to: '/solutions/airline-operators' },
  { label: 'CAMO Organisations', to: '/solutions/camo-organisations' },
  { label: 'Aircraft Lessors', to: '/solutions/aircraft-lessors' },
  { label: 'MRO Partners', to: '/solutions/mro-partners' },
  { label: 'Regulatory Auditors', to: '/solutions/regulatory-auditors' }
]

const solutionsOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-(--vyoma-cloud)">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="shrink-0">
        <BrandVyomaWordmark :height="26" />
      </NuxtLink>

      <nav class="hidden lg:flex items-center gap-7 text-sm font-medium text-(--vyoma-deep-navy)">
        <NuxtLink
          v-for="link in navLinks.slice(0, 2)"
          :key="link.to"
          :to="link.to"
          class="hover:text-(--vyoma-aviation-blue) transition-colors"
        >
          {{ link.label }}
        </NuxtLink>

        <div class="relative" @mouseenter="solutionsOpen = true" @mouseleave="solutionsOpen = false">
          <button class="flex items-center gap-1 hover:text-(--vyoma-aviation-blue) transition-colors">
            Solutions
            <UIcon name="i-lucide-chevron-down" class="w-3.5 h-3.5" />
          </button>
          <div
            v-show="solutionsOpen"
            class="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64"
          >
            <div class="rounded-xl border border-(--vyoma-cloud) bg-white shadow-lg p-2">
              <NuxtLink
                v-for="s in solutionsLinks"
                :key="s.to"
                :to="s.to"
                class="block px-3 py-2 rounded-lg text-sm hover:bg-(--vyoma-section-bg-alt) transition-colors"
              >
                {{ s.label }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <NuxtLink
          v-for="link in navLinks.slice(2)"
          :key="link.to"
          :to="link.to"
          class="hover:text-(--vyoma-aviation-blue) transition-colors"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="hidden lg:block">
        <UButton to="/request-demo" color="primary" size="md" class="font-semibold">
          Book a Demo
        </UButton>
      </div>

      <button class="lg:hidden p-2" aria-label="Toggle menu" @click="mobileOpen = !mobileOpen">
        <UIcon :name="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="w-6 h-6" />
      </button>
    </div>

    <div v-if="mobileOpen" class="lg:hidden border-t border-(--vyoma-cloud) bg-white">
      <div class="px-4 py-4 flex flex-col gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-2 py-2.5 rounded-lg text-sm font-medium hover:bg-(--vyoma-section-bg-alt)"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
        <p class="px-2 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Solutions</p>
        <NuxtLink
          v-for="s in solutionsLinks"
          :key="s.to"
          :to="s.to"
          class="px-2 py-2.5 rounded-lg text-sm hover:bg-(--vyoma-section-bg-alt)"
          @click="mobileOpen = false"
        >
          {{ s.label }}
        </NuxtLink>
        <UButton to="/request-demo" color="primary" block class="mt-3 font-semibold" @click="mobileOpen = false">
          Book a Demo
        </UButton>
      </div>
    </div>
  </header>
</template>
