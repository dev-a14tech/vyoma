<script setup lang="ts">
import { legacySolutionIds, resolveSolutionId, solutionLeaves, solutions } from '~/data/solutions'
import type { Solution } from '~/data/solutions'

const active = ref<string>(solutionLeaves[0]!.id)
useHashSelect(
  'solutions',
  [...solutions.map(s => s.id), ...solutionLeaves.map(s => s.id), ...Object.keys(legacySolutionIds)],
  id => (active.value = resolveSolutionId(id) ?? active.value)
)

// Flattened tab rows: groups (Operations) followed by their children, indented on desktop.
const rows = solutions.flatMap(s => [
  { item: s as Solution, child: false },
  ...(s.children ?? []).map(c => ({ item: c as Solution, child: true }))
])

const isActive = (s: Solution) => s.id === active.value
const hasActiveChild = (s: Solution) => !!s.children?.some(c => c.id === active.value)
const select = (s: Solution) => (active.value = resolveSolutionId(s.id) ?? active.value)
const panelId = (s: Solution) => `solutions-panel-${s.children ? s.children[0].id : s.id}`
</script>

<template>
  <section id="solutions" class="section bg-ice" aria-labelledby="solutions-title">
    <div class="container-v">
      <div class="max-w-[760px]">
        <h2 id="solutions-title" class="display-lg text-navy">Built for the People Behind Every Aircraft.</h2>
        <p class="lede mt-5 max-w-[620px]">Choose your area to see where VYOMA helps.</p>
      </div>

      <div class="mt-14 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
        <div role="tablist" aria-label="Solutions" aria-orientation="vertical" class="tablist -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
          <button
            v-for="{ item: x, child } in rows"
            :key="x.id"
            role="tab"
            :aria-selected="isActive(x)"
            :aria-controls="panelId(x)"
            :id="`aud-${x.id}`"
            class="relative flex h-12 shrink-0 items-center gap-3 rounded-xl border px-4 text-left font-medium transition-colors lg:border-transparent"
            :class="[
              child ? 'text-[0.9rem] lg:ml-6 lg:h-11' : 'text-[0.93rem] lg:h-14',
              isActive(x)
                ? 'border-navy bg-navy text-white lg:bg-white lg:text-navy lg:shadow-[0_8px_24px_-16px_rgba(20,55,88,0.5)]'
                : hasActiveChild(x)
                  ? 'border-navy/40 bg-white text-navy lg:bg-transparent lg:hover:bg-white/70'
                  : 'border-line bg-white text-muted hover:text-navy lg:bg-transparent lg:hover:bg-white/70'
            ]"
            @click="select(x)"
          >
            <span
              class="absolute inset-y-3 left-0 hidden w-[3px] rounded-full bg-sky transition-opacity lg:block"
              :class="isActive(x) ? 'opacity-100' : 'opacity-0'"
            />
            <LandingAudienceIcon :id="x.icon" :size="child ? 16 : 18" :class="isActive(x) ? 'text-cyan lg:text-ocean' : hasActiveChild(x) ? 'text-ocean' : 'text-muted'" />
            {{ x.shortLabel ?? x.label }}
          </button>
        </div>

        <!-- Every panel is server-rendered (v-show) so each solution's copy is crawlable. -->
        <div
          v-for="a in solutionLeaves"
          v-show="a.id === active"
          :id="`solutions-panel-${a.id}`"
          :key="a.id"
          role="tabpanel"
          :aria-labelledby="`aud-${a.id}`"
          :aria-hidden="a.id !== active"
          class="rounded-[28px] border border-line bg-white p-7 md:p-10"
        >
          <div class="fade-swap grid gap-8 xl:grid-cols-[1.2fr_1fr] xl:gap-12">
            <div>
              <span class="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white">
                <LandingAudienceIcon :id="a.icon" :size="22" />
              </span>
              <h3 class="display-md mt-6 text-navy">{{ a.headline }}</h3>
              <p class="mt-4 text-[0.98rem] leading-relaxed text-muted">{{ a.description }}</p>
            </div>
            <div class="flex flex-col justify-between gap-8 xl:border-l xl:border-line xl:pl-10">
              <ul class="space-y-3.5">
                <li v-for="b in a.bullets" :key="b" class="flex gap-3 text-[0.95rem] text-ink">
                  <span class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                  {{ b }}
                </li>
              </ul>
              <a href="#demo" class="btn btn-primary self-start">
                <span>Book a Demo</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="btn-arrow">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
