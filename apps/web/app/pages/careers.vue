<script setup lang="ts">
definePageMeta({ layout: 'landing' })

useSeoMeta({
  title: 'Careers',
  description: 'There are no open roles listed right now. When VYOMA is hiring, positions will be posted here.'
})
</script>

<template>
  <section class="hero-bg pb-28 pt-[152px]">
    <div class="container-v max-w-[820px]">
      <a href="/" class="text-[0.85rem] font-medium text-ocean hover:underline">&larr; Back to home</a>
      <h1 class="display-lg mt-6 text-navy">Careers</h1>
      <p class="lede mt-5">There are no open roles listed right now. When VYOMA is hiring, positions will be posted here.</p>
      <div class="mt-12">
        <a href="/#demo" class="btn btn-primary">
          <span>Book a Demo</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="btn-arrow">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
