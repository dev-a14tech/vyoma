<script setup lang="ts">
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [
    { rel: 'icon', href: '/icon.png', type: 'image/png' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Barlow:wght@500;600;700;800&display=swap'
    }
  ],
  htmlAttrs: { lang: 'en' }
})

useSeoMeta({
  titleTemplate: (title) => (title ? `${title} — VYOMA` : 'VYOMA — Every Aircraft. Every Insight. One VYOMA.'),
  ogSiteName: 'VYOMA',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
