<script setup lang="ts">
const audiences = [
  {
    id: 'airlines',
    label: 'Airlines',
    headline: 'Engineering and operations, reading the same fleet.',
    body: "Give operations and engineering one shared view of aircraft status, so planning decisions reflect each aircraft's real position.",
    benefits: ['Fewer surprises when allocating aircraft', 'Shared priorities across departments', 'Fleet status without chasing updates']
  },
  {
    id: 'camo',
    label: 'CAMO Teams',
    headline: 'Continuing airworthiness, kept current.',
    body: 'Stay on top of airworthiness obligations with compliance status that comes straight from the underlying records.',
    benefits: ['Compliance status ready for review', 'Overdue items surfaced early', 'Traceable records for every aircraft']
  },
  {
    id: 'mro',
    label: 'MRO Organisations',
    headline: 'Maintenance work with the full aircraft context.',
    body: "Plan and complete maintenance with the aircraft's history and current position close at hand.",
    benefits: ['Complete aircraft context for every job', 'Clear status on work in progress', 'Structured records on completion']
  },
  {
    id: 'fleet',
    label: 'Fleet Managers',
    headline: 'Fleet health without the spreadsheet.',
    body: 'Understand the health, availability and utilisation of your fleet at a glance.',
    benefits: ['Fleet-wide view in one place', 'Early sight of upcoming workload', 'Insight for confident decisions']
  },
  {
    id: 'control',
    label: 'Maintenance Controllers',
    headline: "What's due, what's overdue, what's next.",
    body: 'Know which items need attention first and plan maintenance ahead of time.',
    benefits: ['Clear priorities, not long lists', 'Planning across short and long horizons', 'Less time reconciling data']
  },
  {
    id: 'airworthiness',
    label: 'Airworthiness Teams',
    headline: "Records that are complete before they're needed.",
    body: "Capture technical records once, in a structured way, so they're accurate and ready when they're needed.",
    benefits: ['Structured technical records', 'Consistent data across the fleet', 'Ready for audits and reviews']
  }
] as const

const active = ref<string>(audiences[0].id)
useHashSelect(
  'solutions',
  audiences.map((a) => a.id),
  (id) => (active.value = id)
)
const a = computed(() => audiences.find((x) => x.id === active.value) ?? audiences[0])
</script>

<template>
  <section id="solutions" class="section bg-ice" aria-labelledby="solutions-title">
    <div class="container-v">
      <div class="max-w-[760px]">
        <h2 id="solutions-title" class="display-lg text-navy">Built for the People Behind Every Aircraft.</h2>
        <p class="lede mt-5 max-w-[620px]">Choose your role to see where VYOMA helps.</p>
      </div>

      <div class="mt-14 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
        <div role="tablist" aria-label="Audiences" aria-orientation="vertical" class="tablist -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
          <button
            v-for="x in audiences"
            :key="x.id"
            role="tab"
            :aria-selected="x.id === active"
            aria-controls="solutions-panel"
            :id="`aud-${x.id}`"
            class="relative flex h-12 shrink-0 items-center gap-3 rounded-xl border px-4 text-left text-[0.93rem] font-medium transition-colors lg:h-14 lg:border-transparent"
            :class="x.id === active ? 'border-navy bg-navy text-white lg:bg-white lg:text-navy lg:shadow-[0_8px_24px_-16px_rgba(20,55,88,0.5)]' : 'border-line bg-white text-muted hover:text-navy lg:bg-transparent lg:hover:bg-white/70'"
            @click="active = x.id"
          >
            <span
              class="absolute inset-y-3 left-0 hidden w-[3px] rounded-full bg-sky transition-opacity lg:block"
              :class="x.id === active ? 'opacity-100' : 'opacity-0'"
            />
            <LandingAudienceIcon :id="x.id" :size="18" :class="x.id === active ? 'text-cyan lg:text-ocean' : 'text-muted'" />
            {{ x.label }}
          </button>
        </div>

        <div id="solutions-panel" role="tabpanel" :aria-labelledby="`aud-${a.id}`" class="rounded-[28px] border border-line bg-white p-7 md:p-10">
          <div :key="a.id" class="fade-swap grid gap-8 xl:grid-cols-[1.2fr_1fr] xl:gap-12">
            <div>
              <span class="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white">
                <LandingAudienceIcon :id="a.id" :size="22" />
              </span>
              <h3 class="display-md mt-6 text-navy">{{ a.headline }}</h3>
              <p class="mt-4 text-[0.98rem] leading-relaxed text-muted">{{ a.body }}</p>
            </div>
            <div class="flex flex-col justify-between gap-8 xl:border-l xl:border-line xl:pl-10">
              <ul class="space-y-3.5">
                <li v-for="b in a.benefits" :key="b" class="flex gap-3 text-[0.95rem] text-ink">
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
