<script setup lang="ts">
import type { FeatureTheme } from '@vyoma/shared'

defineProps<{ features: FeatureTheme[] }>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[1fr]">
    <SectionsFeatureThemeCard
      v-for="(feature, i) in features"
      :key="feature.id"
      :feature="feature"
      :large="i === 0"
    />
  </div>
</template>
