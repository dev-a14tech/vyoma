<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-(--vyoma-cloud) bg-(--vyoma-section-bg-alt)">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
      <div class="col-span-2">
        <BrandVyomaWordmark :height="24" />
        <p class="mt-3 text-sm text-slate-600 max-w-xs">Digital Backbone of Aviation.</p>
      </div>

      <div>
        <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Platform</h3>
        <ul class="space-y-2 text-sm">
          <li><NuxtLink to="/platform" class="hover:text-(--vyoma-aviation-blue)">Overview</NuxtLink></li>
          <li><NuxtLink to="/features" class="hover:text-(--vyoma-aviation-blue)">Features</NuxtLink></li>
          <li><NuxtLink to="/why-vyoma" class="hover:text-(--vyoma-aviation-blue)">Why VYOMA</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Solutions</h3>
        <ul class="space-y-2 text-sm">
          <li><NuxtLink to="/solutions/airline-operators" class="hover:text-(--vyoma-aviation-blue)">Airline Operators</NuxtLink></li>
          <li><NuxtLink to="/solutions/camo-organisations" class="hover:text-(--vyoma-aviation-blue)">CAMO Organisations</NuxtLink></li>
          <li><NuxtLink to="/solutions/mro-partners" class="hover:text-(--vyoma-aviation-blue)">MRO Partners</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Company</h3>
        <ul class="space-y-2 text-sm">
          <li><NuxtLink to="/about" class="hover:text-(--vyoma-aviation-blue)">About</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-(--vyoma-aviation-blue)">Contact</NuxtLink></li>
          <li><NuxtLink to="/request-demo" class="hover:text-(--vyoma-aviation-blue)">Book a Demo</NuxtLink></li>
        </ul>
      </div>
    </div>

    <div class="border-t border-(--vyoma-cloud)">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-3 justify-between text-xs text-slate-500">
        <p>&copy; {{ year }} VYOMA, a product of AVAJET Aviation Consultants LLP. All rights reserved.</p>
        <div class="flex gap-4">
          <NuxtLink to="/legal/privacy" class="hover:text-(--vyoma-aviation-blue)">Privacy</NuxtLink>
          <NuxtLink to="/legal/terms" class="hover:text-(--vyoma-aviation-blue)">Terms</NuxtLink>
          <NuxtLink to="/legal/disclaimer" class="hover:text-(--vyoma-aviation-blue)">Disclaimer</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
