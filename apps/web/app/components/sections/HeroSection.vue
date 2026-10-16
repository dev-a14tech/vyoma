<script setup lang="ts">
interface Breadcrumb {
  label: string
  // Omitted on the current page, which is shown as plain text.
  to?: string
}

withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    subtitle?: string
    // Kept for existing callers; the v2 page hero has a single size.
    compact?: boolean
    breadcrumbs?: Breadcrumb[]
  }>(),
  { eyebrow: 'Digital Backbone of Aviation', subtitle: '', compact: false, breadcrumbs: () => [] }
)
</script>

<template>
  <section class="page-hero">
    <img class="page-hero__mark" src="/images/brand/vyoma-logomark.png" alt="" aria-hidden="true" width="752" height="622" draggable="false" />
    <div class="relative mx-auto w-full max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
      <nav v-if="breadcrumbs.length" class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li v-for="crumb in breadcrumbs" :key="crumb.label">
            <NuxtLink v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</NuxtLink>
            <span v-else aria-current="page">{{ crumb.label }}</span>
          </li>
        </ol>
      </nav>
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1 class="h1">{{ title }}</h1>
      <p v-if="subtitle" class="lede">{{ subtitle }}</p>
      <div class="btn-row">
        <!-- Pages pass their own buttons; without them the hero keeps its original pair. -->
        <slot>
          <NuxtLink to="/request-demo" class="btn btn--primary">
            Book a Demo
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
          <NuxtLink to="/features" class="btn btn--ghost">Explore Features</NuxtLink>
        </slot>
      </div>
    </div>
  </section>
</template>
