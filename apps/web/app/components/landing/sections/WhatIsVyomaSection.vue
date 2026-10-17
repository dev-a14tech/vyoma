<script setup lang="ts">
import { sitePaths } from '~/data/solutions'

const problems = [
  { problem: 'Tech logs on paper, ADs in spreadsheets, component life in someone\'s inbox.', solution: 'One record per aircraft that every team works from.' },
  { problem: 'Overdue items are discovered late, often during an audit.', solution: 'Due items are calculated live and ranked by urgency.' },
  { problem: 'Days spent compiling compliance figures before every review.', solution: 'Compliance reports ready on demand, with a full audit trail.' }
]
</script>

<template>
  <section id="what-we-do" class="wwd-section" aria-labelledby="wwd-title">
    <div class="wwd mx-auto w-full max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
      <div>
        <div class="wwd__sticky wwd__intro">
          <p class="eyebrow">What we do</p>
          <h2 id="wwd-title" class="h2">A Smarter Way to Manage Aviation.</h2>
          <p class="lede wwd__line">Scattered aircraft records, one shared workspace.</p>
          <p class="wwd__info">Entered once, available to every team, everywhere.</p>
        </div>
      </div>
      <div class="wwd__illo">
        <svg viewBox="0 0 400 210" role="img" aria-label="Tech logs, spreadsheets, trackers and email feeding into one record per aircraft" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="or-hub" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#143758" /><stop offset="1" stop-color="#005F8F" /></linearGradient>
            <linearGradient id="or-line" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#41A1D9" stop-opacity="0.25" /><stop offset="1" stop-color="#41A1D9" stop-opacity="0.8" /></linearGradient>
          </defs>
          <!-- Tech log -->
          <g transform="rotate(-6 46 38)">
            <rect x="20" y="16" width="52" height="44" rx="7" fill="#fff" stroke="#DCE6EF" />
            <rect x="20" y="16" width="52" height="9" rx="4" fill="#E8F1F8" />
            <rect x="28" y="31" width="34" height="3.5" rx="1.75" fill="#C9DBEA" /><rect x="28" y="39" width="28" height="3.5" rx="1.75" fill="#C9DBEA" /><rect x="28" y="47" width="31" height="3.5" rx="1.75" fill="#C9DBEA" />
            <path d="M60 50 l3 3 l6 -7" fill="none" stroke="#41A1D9" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <!-- Spreadsheet -->
          <g transform="rotate(5 74 88)">
            <rect x="48" y="66" width="56" height="44" rx="7" fill="#fff" stroke="#DCE6EF" />
            <path d="M48 80 H104 M48 94 H104 M66 66 V110 M85 66 V110" stroke="#DCE6EF" />
            <rect x="52" y="70" width="10" height="6" rx="1.5" fill="#6CC9F5" opacity="0.7" /><rect x="70" y="84" width="11" height="6" rx="1.5" fill="#005F8F" opacity="0.45" /><rect x="89" y="98" width="11" height="6" rx="1.5" fill="#41A1D9" opacity="0.6" />
          </g>
          <!-- Tracker -->
          <g transform="rotate(-4 46 140)">
            <rect x="18" y="118" width="54" height="44" rx="7" fill="#fff" stroke="#DCE6EF" />
            <circle cx="29" cy="130" r="4" fill="none" stroke="#41A1D9" stroke-width="1.5" /><rect x="38" y="128" width="26" height="4" rx="2" fill="#C9DBEA" />
            <circle cx="29" cy="141" r="4" fill="#41A1D9" opacity="0.8" /><rect x="38" y="139" width="22" height="4" rx="2" fill="#C9DBEA" />
            <circle cx="29" cy="152" r="4" fill="none" stroke="#005F8F" stroke-width="1.5" stroke-dasharray="2 2" /><rect x="38" y="150" width="18" height="4" rx="2" fill="#C9DBEA" />
          </g>
          <!-- Email -->
          <g transform="rotate(7 76 184)">
            <rect x="52" y="168" width="50" height="32" rx="6" fill="#fff" stroke="#DCE6EF" />
            <path d="M54 171 L77 187 L100 171" fill="none" stroke="#41A1D9" stroke-width="1.5" stroke-linejoin="round" />
          </g>
          <!-- Feeds into the hub -->
          <path d="M74 36 C 130 36, 140 105, 182 105" fill="none" stroke="url(#or-line)" stroke-width="1.5" stroke-dasharray="3 4" />
          <path d="M106 88 C 140 88, 150 105, 182 105" fill="none" stroke="url(#or-line)" stroke-width="1.5" stroke-dasharray="3 4" />
          <path d="M74 140 C 130 140, 145 105, 182 105" fill="none" stroke="url(#or-line)" stroke-width="1.5" stroke-dasharray="3 4" />
          <path d="M104 184 C 150 184, 150 105, 182 105" fill="none" stroke="url(#or-line)" stroke-width="1.5" stroke-dasharray="3 4" />
          <!-- Hub -->
          <circle cx="208" cy="105" r="34" fill="#41A1D9" opacity="0.1" />
          <circle cx="208" cy="105" r="26" fill="url(#or-hub)" />
          <path fill="#fff" d="M208 87 c1.6 0 2.6 1.8 2.6 4.4 v8.2 l13 7.4 v3.6 l-13 -3.6 v6.8 l3.8 3 v2.8 l-6.4 -1.8 l-6.4 1.8 v-2.8 l3.8 -3 v-6.8 l-13 3.6 v-3.6 l13 -7.4 v-8.2 c0 -2.6 1-4.4 2.6-4.4 z" />
          <path d="M234 105 H262" stroke="#41A1D9" stroke-width="2" stroke-linecap="round" />
          <circle cx="262" cy="105" r="3" fill="#41A1D9" />
          <!-- Aircraft record -->
          <rect x="268" y="40" width="118" height="130" rx="12" fill="#fff" stroke="#DCE6EF" />
          <rect x="268" y="40" width="118" height="30" rx="12" fill="#143758" /><rect x="268" y="58" width="118" height="12" fill="#143758" />
          <circle cx="284" cy="55" r="7" fill="#41A1D9" />
          <path fill="#fff" d="M284 50.5 c.5 0 .8 .6 .8 1.3 v2.4 l3.6 2.1 v1 l-3.6 -1 v1.9 l1.1 .9 v.8 l-1.9 -.5 l-1.9 .5 v-.8 l1.1 -.9 v-1.9 l-3.6 1 v-1 l3.6 -2.1 v-2.4 c0 -.7 .3 -1.3 .8 -1.3 z" />
          <rect x="297" y="51" width="52" height="4.5" rx="2.25" fill="#fff" opacity="0.85" /><rect x="297" y="59" width="34" height="3.5" rx="1.75" fill="#6CC9F5" opacity="0.7" />
          <g><circle cx="282" cy="88" r="4.5" fill="#1F9D6B" opacity="0.85" /><rect x="292" y="85.5" width="58" height="5" rx="2.5" fill="#E8F1F8" /><rect x="356" y="85" width="20" height="6" rx="3" fill="#E7F6EC" /></g>
          <g><circle cx="282" cy="108" r="4.5" fill="#41A1D9" /><rect x="292" y="105.5" width="48" height="5" rx="2.5" fill="#E8F1F8" /><rect x="356" y="105" width="20" height="6" rx="3" fill="#E8F1F8" /></g>
          <g><circle cx="282" cy="128" r="4.5" fill="#005F8F" opacity="0.7" /><rect x="292" y="125.5" width="54" height="5" rx="2.5" fill="#E8F1F8" /><rect x="356" y="125" width="20" height="6" rx="3" fill="#E8F1F8" /></g>
          <rect x="282" y="146" width="90" height="10" rx="5" fill="#F4F8FC" stroke="#DCE6EF" />
          <rect x="283" y="147" width="62" height="8" rx="4" fill="#41A1D9" opacity="0.55" />
          <g fill="#fff" stroke="#DCE6EF"><circle cx="290" cy="186" r="9" /><circle cx="314" cy="186" r="9" /><circle cx="338" cy="186" r="9" /><circle cx="362" cy="186" r="9" /></g>
          <g fill="#41A1D9" opacity="0.75"><circle cx="290" cy="184" r="3" /><circle cx="314" cy="184" r="3" /><circle cx="338" cy="184" r="3" /><circle cx="362" cy="184" r="3" /></g>
          <path d="M327 170 V177" stroke="#DCE6EF" stroke-width="1.5" />
        </svg>
      </div>
    </div>

    <div class="ps-block mx-auto w-full max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
      <h3 class="h3">Airworthiness data is scattered. Mistakes are expensive.</h3>
      <div class="ps">
        <article v-for="item in problems" :key="item.solution" class="ps-card">
          <p class="ps-label">The problem</p>
          <p class="problem">{{ item.problem }}</p>
          <p class="ps-label ps-label--solve">How VYOMA solves it</p>
          <p class="solution">{{ item.solution }}</p>
        </article>
      </div>
      <NuxtLink :to="sitePaths.whyVyoma" class="link-arrow">
        See all the problems VYOMA solves
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>
