<template>
  <div class="relative">
    <svg width="100%" height="100%" viewBox="0 0 64 64" class="absolute inset-0 text-brand-300/40" fill="none" aria-hidden="true">
      <g stroke="currentColor" stroke-width="1">
        <circle
          v-for="i in 16"
          :key="i"
          :cx="32 + 26 * Math.cos((i / 16) * 2 * Math.PI)"
          :cy="32 + 26 * Math.sin((i / 16) * 2 * Math.PI)"
          r="3"
        />
      </g>
    </svg>
    <slot />
  </div>
</template>
