<script setup lang="ts">
definePageMeta({ layout: 'landing' })

usePageSeo({
  title: 'Careers',
  description: 'There are no open roles listed right now. When VYOMA is hiring, positions will be posted here.'
})
// Placeholder page: keep it out of search results until there are roles to list.
useSeoMeta({ robots: 'noindex, follow' })
</script>

<template>
  <section class="hero-bg pb-28 pt-20">
    <div class="container-v max-w-[820px]">
      <a href="/" class="block text-[0.85rem] font-medium text-ocean hover:underline">&larr; Back to home</a>
      <p class="eyebrow mt-6">Careers</p>
      <h1 class="display-lg mt-3.5 text-navy">Careers at VYOMA.</h1>
      <p class="lede mt-5">There are no open roles listed right now. When VYOMA is hiring, positions will be posted here.</p>
      <div class="btn-row mt-12">
        <a href="/about" class="btn btn--primary">
          About VYOMA
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </a>
        <a href="/contact" class="btn btn--ghost">Contact Us</a>
      </div>
    </div>
  </section>
</template>
