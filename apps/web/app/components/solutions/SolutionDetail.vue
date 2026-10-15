<script setup lang="ts">
import { findSolution, solutionPath } from '~/data/solutions'
import type { Solution } from '~/data/solutions'
import { solutionDetails } from '~/data/solutionDetails'

const props = defineProps<{ id: string }>()

const solution = computed(() => findSolution(props.id) as Solution)
const detail = computed(() => solutionDetails[props.id]!)
// Operations is a group: its three kinds of operator get a card each, linking to their own page.
const children = computed(() => solution.value.children ?? [])
const related = computed(() => detail.value.related.map(id => findSolution(id)).filter((s): s is Solution => !!s))

// Breadcrumb: Home / Solutions / [Operations /] this page
const crumbs = computed(() => {
  const list = [{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }]
  const parent = solutionPath(props.id).split('/').length > 3
  if (parent) list.push({ label: 'Operations', href: solutionPath('operations') })
  list.push({ label: solution.value.shortLabel ?? solution.value.label, href: solutionPath(props.id) })
  return list
})

const siteUrl = useSiteUrl()

usePageSeo({
  title: detail.value.seoTitle,
  description: detail.value.seoDescription,
  keywords: [...detail.value.keywords]
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      key: 'ld-breadcrumb',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.value.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.label,
          item: siteUrl(c.href)
        }))
      })
    }
  ]
})
</script>

<template>
  <div>
    <section class="hero-bg relative overflow-hidden pb-12 pt-[132px] md:pb-16 md:pt-[152px]">
      <div class="container-v relative">
        <nav v-reveal aria-label="Breadcrumb" class="text-[0.82rem] text-muted">
          <ol class="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li v-for="(c, i) in crumbs" :key="c.href" class="flex items-center gap-2">
              <a v-if="i < crumbs.length - 1" :href="c.href" class="hover:text-navy hover:underline">{{ c.label }}</a>
              <span v-else aria-current="page" class="font-medium text-navy">{{ c.label }}</span>
              <span v-if="i < crumbs.length - 1" aria-hidden="true">/</span>
            </li>
          </ol>
        </nav>

        <div class="mt-8 max-w-[820px]">
          <p v-reveal="60" class="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-ocean">{{ detail.eyebrow }}</p>
          <h1 v-reveal="140" class="display-xl mt-5 text-navy">{{ detail.title }}</h1>
          <p v-reveal="230" class="lede mt-7 max-w-[680px]">{{ detail.intro }}</p>
          <div v-reveal="320" class="mt-9 flex flex-wrap gap-3">
            <a href="/#demo" class="btn btn-primary">
              <span>Book a Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="btn-arrow">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a href="/#demo-ask" class="btn btn-ghost"><span>Ask a question</span></a>
          </div>
        </div>
      </div>
    </section>

    <!-- Operations: the three kinds of operator -->
    <section v-if="children.length" class="section bg-white" aria-labelledby="sub-title">
      <div class="container-v">
        <h2 id="sub-title" v-reveal class="display-md text-navy">Choose how you fly</h2>
        <div class="mt-10 grid gap-6 md:grid-cols-3">
          <a
            v-for="(c, i) in children"
            :key="c.id"
            v-reveal="i * 110"
            :href="solutionPath(c.id)"
            class="group flex flex-col rounded-[24px] border border-line bg-white p-7 transition-shadow hover:shadow-[0_20px_50px_-28px_rgba(20,55,88,0.45)]"
          >
            <span class="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white">
              <LandingAudienceIcon :id="c.icon" :size="22" />
            </span>
            <h3 class="mt-6 text-[1.15rem] font-semibold text-navy">{{ c.label }}</h3>
            <p class="mt-3 text-[0.92rem] leading-relaxed text-muted">{{ c.description }}</p>
            <span class="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.9rem] font-medium text-ocean">
              Explore more
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>

    <section class="section" :class="children.length ? 'bg-ice' : 'bg-white'" aria-labelledby="covers-title">
      <div class="container-v">
        <h2 id="covers-title" v-reveal class="display-md text-navy">{{ children.length ? 'What every operator gets' : 'What it covers' }}</h2>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(h, i) in detail.highlights"
            :key="h.title"
            v-reveal="(i % 3) * 110"
            class="rounded-[24px] border border-line bg-white p-7"
          >
            <span class="grid h-9 w-9 place-items-center rounded-full bg-[#e8f1f8] text-ocean">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h3 class="mt-5 text-[1.05rem] font-semibold text-navy">{{ h.title }}</h3>
            <p class="mt-2.5 text-[0.92rem] leading-relaxed text-muted">{{ h.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section bg-white" aria-labelledby="who-title">
      <div class="container-v grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <h2 id="who-title" v-reveal class="display-md text-navy">Who it is for</h2>
          <ul v-reveal="100" class="mt-7 flex flex-wrap gap-2.5">
            <li v-for="a in detail.audience" :key="a" class="rounded-full border border-line bg-ice px-4 py-2 text-[0.9rem] text-navy">{{ a }}</li>
          </ul>
        </div>
        <div v-if="related.length" class="lg:col-span-6 lg:col-start-7">
          <h2 v-reveal class="display-md text-navy">Works with</h2>
          <div class="mt-7 grid gap-4 sm:grid-cols-2">
            <a
              v-for="(r, i) in related"
              :key="r.id"
              v-reveal="100 + i * 110"
              :href="solutionPath(r.id)"
              class="group rounded-[20px] border border-line p-5 transition-colors hover:bg-ice"
            >
              <span class="block text-[1rem] font-semibold text-navy">{{ r.label }}</span>
              <span class="mt-1.5 block text-[0.86rem] leading-relaxed text-muted">{{ solutionDetails[r.id]?.intro.split('. ')[0] }}.</span>
              <span class="mt-3 inline-block text-[0.86rem] font-medium text-ocean">Explore more &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-white pt-0" aria-label="Book a demo">
      <div class="container-v">
        <div v-reveal class="dark-band relative overflow-hidden rounded-[32px] px-6 py-14 text-center sm:px-10 md:py-16">
          <h2 class="display-md text-white">See it on your own fleet.</h2>
          <p class="lede mx-auto mt-4 max-w-[540px] !text-[#a9bdd0]">Book a short walkthrough and we will show you how this fits the way your team works.</p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/#demo" class="btn btn-light">
              <span>Book a Demo</span>
            </a>
            <a href="/#demo-ask" class="btn btn-ghost !border-white/30 !text-white hover:!bg-white/10"><span>Ask More</span></a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
