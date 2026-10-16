<script setup lang="ts">
import { sitePaths, solutionPath } from '~/data/solutions'

// Lucide icon paths for the audience chips.
const segments = [
  { label: 'Airlines & Operators', to: solutionPath('airlines'), icon: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'] },
  { label: 'CAMO Organisations', to: solutionPath('maintenance'), icon: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', 'm9 12 2 2 4-4'] },
  { label: 'Flying Training Schools', to: solutionPath('flying-training'), icon: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'] },
  { label: 'Private & Non-Scheduled Operators', to: solutionPath('non-scheduled'), icon: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'], rect: true }
]

const rings = [
  { label: 'Fleet', stroke: '#005F8F', dash: '97.26 113.1' },
  { label: 'Planning', stroke: '#41A1D9', dash: '72.38 113.1' },
  { label: 'Compliance', stroke: '#143758', dash: '105.18 113.1' }
]

const plane = 'M12 1.6c.9 0 1.5 1 1.5 2.2v5.5l8 4.6v2.1l-8-2.5v4.9l2.4 1.8v1.6L12 21l-3.9.8v-1.6l2.4-1.8v-4.9l-8 2.5v-2.1l8-4.6V3.8c0-1.2.6-2.2 1.5-2.2z'
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <img class="hero__mark" src="/images/brand/vyoma-logomark.png" alt="" width="752" height="622" draggable="false" />
    <div class="hero__grid mx-auto w-full max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
      <div class="hero__copy">
        <p class="eyebrow">Aviation management software</p>
        <h1 id="hero-title" class="display display--tag">One Aviation Platform.<br /><span class="gradient-text">Every Operation.</span></h1>
        <p class="lede">Manage your aviation operations with one connected software platform built for airlines, CAMO organisations, flying training schools, and private and non-scheduled operators.</p>
        <ul class="seg-chips" role="list">
          <li v-for="s in segments" :key="s.label">
            <NuxtLink :to="s.to">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path v-for="d in s.icon" :key="d" :d="d" />
                <rect v-if="s.rect" width="20" height="14" x="2" y="6" rx="2" />
              </svg>
              {{ s.label }}
            </NuxtLink>
          </li>
        </ul>
        <div class="btn-row">
          <NuxtLink :to="sitePaths.demo" class="btn btn--primary">
            Book a Demo
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
          <NuxtLink :to="sitePaths.platform" class="btn btn--ghost">Explore the Platform</NuxtLink>
        </div>
      </div>

      <!-- Decorative mock-up: no real UI or data. -->
      <div class="stage" aria-hidden="true">
        <svg class="stage__orbit" viewBox="0 0 900 700" fill="none">
          <ellipse cx="460" cy="350" rx="420" ry="250" transform="rotate(-14 460 350)" stroke="#41a1d9" stroke-opacity="0.28" stroke-width="1.2" />
          <ellipse cx="460" cy="350" rx="330" ry="190" transform="rotate(-14 460 350)" stroke="#143758" stroke-opacity="0.1" stroke-dasharray="3 7" />
        </svg>
        <div class="stage__glow" />
        <div class="panel">
          <div class="panel__bar">
            <div class="panel__bar-left">
              <img src="/images/brand/vyoma-logomark.png" alt="" width="752" height="622" draggable="false" />
              <span class="pill" style="width:80px" />
            </div>
            <div class="dots"><i /><i /><i /></div>
          </div>
          <div class="panel__rings">
            <div v-for="r in rings" :key="r.label" class="ring-card">
              <svg viewBox="0 0 46 46">
                <circle cx="23" cy="23" r="18" fill="none" stroke="#E8F1F8" stroke-width="5" />
                <circle cx="23" cy="23" r="18" fill="none" :stroke="r.stroke" stroke-width="5" stroke-linecap="round" :stroke-dasharray="r.dash" transform="rotate(-90 23 23)" />
              </svg>
              <div class="ring-card__text"><span>{{ r.label }}</span><i class="pill" /></div>
            </div>
          </div>
          <div class="panel__network">
            <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
              <g stroke="#41A1D9" stroke-opacity="0.5" stroke-width="1.2">
                <line x1="70" y1="70" x2="160" y2="40" /><line x1="160" y1="40" x2="260" y2="78" /><line x1="260" y1="78" x2="330" y2="46" />
                <line x1="70" y1="70" x2="110" y2="150" /><line x1="110" y1="150" x2="220" y2="160" /><line x1="220" y1="160" x2="320" y2="140" />
                <line x1="260" y1="78" x2="220" y2="160" /><line x1="160" y1="40" x2="220" y2="160" /><line x1="330" y1="46" x2="320" y2="140" />
              </g>
              <circle cx="70" cy="70" r="9" fill="#41A1D9" fill-opacity="0.15" /><circle cx="70" cy="70" r="4" fill="#6CC9F5" />
              <circle cx="160" cy="40" r="16" fill="#fff" stroke="#DCE6EF" />
              <g transform="translate(160 40) rotate(70) scale(0.7083) translate(-12 -12)"><path :d="plane" fill="#143758" /></g>
              <circle cx="260" cy="78" r="9" fill="#41A1D9" fill-opacity="0.15" /><circle cx="260" cy="78" r="4" fill="#6CC9F5" />
              <circle cx="330" cy="46" r="9" fill="#41A1D9" fill-opacity="0.15" /><circle cx="330" cy="46" r="4" fill="#005F8F" />
              <circle cx="110" cy="150" r="16" fill="#fff" stroke="#DCE6EF" />
              <g transform="translate(110 150) rotate(20) scale(0.7083) translate(-12 -12)"><path :d="plane" fill="#143758" /></g>
              <circle cx="220" cy="160" r="9" fill="#41A1D9" fill-opacity="0.15" /><circle cx="220" cy="160" r="4" fill="#005F8F" />
              <circle cx="320" cy="140" r="16" fill="#fff" stroke="#DCE6EF" />
              <g transform="translate(320 140) rotate(-40) scale(0.7083) translate(-12 -12)"><path :d="plane" fill="#143758" /></g>
            </svg>
          </div>
          <div class="panel__lower">
            <div class="panel__box">
              <svg viewBox="0 0 200 54" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hs-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stop-color="#41A1D9" stop-opacity="0.3" />
                    <stop offset="1" stop-color="#41A1D9" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 4 46 C 30 40, 44 22, 70 28 S 110 12, 136 18 S 176 4, 196 8 L 196 54 L 4 54 Z" fill="url(#hs-fill)" />
                <path d="M 4 46 C 30 40, 44 22, 70 28 S 110 12, 136 18 S 176 4, 196 8" fill="none" stroke="#005F8F" stroke-width="2.2" stroke-linecap="round" vector-effect="non-scaling-stroke" />
              </svg>
            </div>
            <div class="panel__box bars">
              <div class="bar"><i style="background:#22a06b" /><b><span style="width:82%" /></b></div>
              <div class="bar"><i style="background:#41a1d9" /><b><span style="width:58%" /></b></div>
              <div class="bar"><i style="background:#143758" /><b><span style="width:70%" /></b></div>
            </div>
          </div>
        </div>
        <div class="float-card float-card--a">
          <span class="plane-tile">
            <svg viewBox="0 0 24 24"><path :d="plane" fill="#fff" transform="rotate(45 12 12)" /></svg>
          </span>
          <span><strong>Every aircraft in view</strong><span class="seg"><i /><i /><i /><i /></span></span>
        </div>
        <div class="float-card float-card--b">
          <span class="ok-tile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <strong>Airworthy &amp; on track</strong>
        </div>
        <div class="float-card float-card--c mini-bars">
          <i style="height:18px;opacity:0.55" /><i style="height:28px;opacity:0.63" /><i style="height:22px;opacity:0.71" />
          <i style="height:36px;opacity:0.79" /><i style="height:30px;opacity:0.87" /><i style="height:42px;opacity:0.95" />
        </div>
      </div>
    </div>
  </section>
</template>
