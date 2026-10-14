<script setup lang="ts">
withDefaults(defineProps<{ height?: number }>(), { height: 28 })
</script>

<template>
  <!-- Official VYOMA wordmark, used exactly as supplied (2010 x 622, transparent). -->
  <img
    src="/images/brand/vyoma-logo-full.png"
    alt="VYOMA"
    :width="Math.round((height * 2010) / 622)"
    :height="height"
    :style="{ height: `${height}px`, width: 'auto' }"
    draggable="false"
  />
</template>
