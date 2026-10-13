<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 640 })
</script>

<template>
  <div class="motif-orbit" aria-hidden="true">
    <svg :width="size" :height="size" viewBox="0 0 640 640" fill="none">
      <circle cx="320" cy="320" r="300" stroke="#41a1d9" stroke-opacity="0.18" stroke-width="1.5" />
      <circle cx="320" cy="320" r="230" stroke="#005f8f" stroke-opacity="0.16" stroke-width="1.5" stroke-dasharray="2 10" />
    </svg>
    <svg class="motif-orbit-reverse" :width="size * 0.7" :height="size * 0.7" viewBox="0 0 448 448" fill="none">
      <circle cx="224" cy="224" r="200" stroke="#143758" stroke-opacity="0.12" stroke-width="1" stroke-dasharray="1 6" />
    </svg>
  </div>
</template>
