<script setup lang="ts">
import { solutions } from '~/data/solutions'

definePageMeta({ layout: 'landing' })

const route = useRoute()
const slug = route.params.audience as string

// Old CMS audience pages (before the restructure) now live on the new solution pages.
const legacy: Record<string, string> = {
  'airline-operators': '/solutions/operations/airlines',
  'camo-organisations': '/solutions/maintenance',
  'aircraft-lessors': '/solutions/management',
  'mro-partners': '/solutions/maintenance',
  'regulatory-auditors': '/solutions/management'
}

if (legacy[slug]) {
  await navigateTo(legacy[slug], { redirectCode: 301 })
}

const solution = solutions.find(s => s.slug === slug)
if (!solution) {
  throw createError({ statusCode: 404, statusMessage: 'Solution not found', fatal: true })
}
</script>

<template>
  <SolutionsSolutionDetail v-if="solution" :id="solution.id" />
</template>
