<script setup lang="ts">
import { solutionPath, solutions } from '~/data/solutions'

definePageMeta({ layout: 'landing' })

usePageSeo({
  title: 'Solutions for Airlines, Flying Schools and Private Jet Operators',
  description:
    'VYOMA solutions: management analytics, CAMO maintenance, operations for airlines, flying training schools and private jet operators, and aviation logistics, in one connected platform.',
  keywords: 'solutions'
})
</script>

<template>
  <div>
    <section class="hero-bg pb-16 pt-[132px] md:pb-20 md:pt-[152px]">
      <div class="container-v">
        <p class="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-ocean">Solutions</p>
        <h1 class="display-xl mt-5 max-w-[820px] text-navy">One platform, four modules.</h1>
        <p class="lede mt-7 max-w-[680px]">
          Management, maintenance, operations and logistics share the same aircraft information, so every team works from the same picture. Pick a module to see what it covers.
        </p>
      </div>
    </section>

    <section class="section bg-white pt-4" aria-label="Solutions">
      <div class="container-v grid gap-6 md:grid-cols-2">
        <article
          v-for="s in solutions"
          :key="s.id"
          class="flex flex-col rounded-[28px] border border-line bg-white p-8"
        >
          <span class="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white">
            <LandingAudienceIcon :id="s.icon" :size="22" />
          </span>
          <h2 class="mt-6 text-[1.35rem] font-semibold text-navy">{{ s.label }}</h2>
          <p class="mt-3 text-[0.95rem] leading-relaxed text-muted">
            {{ s.children ? 'Planning, crew and reporting for the way you fly.' : s.description }}
          </p>

          <ul v-if="s.children" class="mt-5 space-y-2">
            <li v-for="c in s.children" :key="c.id">
              <a :href="solutionPath(c.id)" class="text-[0.95rem] font-medium text-ocean hover:underline">{{ c.label }} &rarr;</a>
            </li>
          </ul>

          <a :href="solutionPath(s.id)" class="mt-auto pt-8 text-[0.92rem] font-medium text-navy hover:underline">
            Explore {{ s.label }} &rarr;
          </a>
        </article>
      </div>
    </section>
  </div>
</template>
