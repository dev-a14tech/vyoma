<script setup lang="ts">
import { solutions } from '~/data/solutions'

definePageMeta({ layout: 'landing' })

const route = useRoute()
const sub = route.params.sub as string

const operations = solutions.find(s => s.id === 'operations')
const child = operations?.children?.find(c => c.slug === sub)
if (!child) {
  throw createError({ statusCode: 404, statusMessage: 'Solution not found', fatal: true })
}
</script>

<template>
  <SolutionsSolutionDetail v-if="child" :id="child.id" />
</template>
