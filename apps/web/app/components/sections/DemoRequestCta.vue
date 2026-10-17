<script setup lang="ts">
import { sitePaths } from '~/data/solutions'
</script>

<template>
  <section class="cta-section">
    <div class="mx-auto w-full max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
      <div class="cta-band">
        <img src="/images/brand/vyoma-logomark.png" alt="" aria-hidden="true" width="752" height="622" draggable="false" />
        <div class="relative">
          <h2>See it on your own fleet.</h2>
          <p>Book a short walkthrough to see how VYOMA fits your team's workflow.</p>
        </div>
        <div class="btn-row">
          <NuxtLink :to="sitePaths.demo" class="btn btn--light">
            Book a Demo
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
          <NuxtLink :to="sitePaths.contact" class="btn btn--outline-light">Ask a Question</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
