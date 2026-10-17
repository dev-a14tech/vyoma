<script setup lang="ts">
import { sitePaths } from '~/data/solutions'

defineProps<{ error: { statusCode: number; statusMessage?: string } }>()

useSeoMeta({ title: 'Page Not Found — VYOMA', robots: 'noindex, nofollow' })
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <LandingHeader />
    <main class="flex-1 pt-(--header-h)">
      <section class="hero-bg flex min-h-[70vh] items-center pb-28 pt-20">
        <div class="container-v max-w-[680px] text-center">
          <p class="eyebrow">Error {{ error.statusCode }}</p>
          <h1 class="display-lg mt-3.5 text-navy">This page has flown off course.</h1>
          <p class="lede mx-auto mt-5 max-w-[480px]">The page you're looking for doesn't exist or has moved.</p>
          <div class="btn-row mt-10 justify-center">
            <NuxtLink :to="sitePaths.home" class="btn btn--primary">
              Back to Home
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </NuxtLink>
            <NuxtLink :to="sitePaths.sitemap" class="btn btn--ghost">View Sitemap</NuxtLink>
          </div>
        </div>
      </section>
    </main>
    <LandingFooter />
  </div>
</template>
