<script setup lang="ts">
import { findSolution, sitePaths, solutionPath } from '~/data/solutions'
import type { Solution } from '~/data/solutions'
import { solutionDetails } from '~/data/solutionDetails'
import type { SolutionHighlight } from '~/data/solutionDetails'

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

// "What it covers" as a tab view (coversLayout 'tabs'): one panel per highlight.
const activeTab = ref(0)
const tabNav = ref<HTMLElement | null>(null)
const tabEls = ref<HTMLButtonElement[]>([])
const pad = (n: number) => String(n).padStart(2, '0')
// Ids are prefixed with the solution so they stay unique if more than one tab view renders.
const tabId = (i: number) => `tv-${props.id}-t${i}`
const panelId = (i: number) => `tv-${props.id}-p${i}`
// "Choose how you fly" as expanding panels (childLayout 'expand'). At >= 1200px the panels sit
// side by side and one is always open; below that they are an accordion that can all close.
const openChild = ref<string | null>(children.value[0]?.id ?? null)
const xpWide = ref(false)
const xpHeads = ref<HTMLButtonElement[]>([])
let xpHoverCapable = false
let xpTimer: ReturnType<typeof setTimeout> | null = null

function clearXpTimer() {
  if (xpTimer) clearTimeout(xpTimer)
  xpTimer = null
}
function toggleChild(id: string) {
  clearXpTimer()
  openChild.value = xpWide.value || openChild.value !== id ? id : null
}
// Hovering a closed side panel opens it after a short pause, so passing over it does not.
function onChildEnter(id: string) {
  if (!xpWide.value || !xpHoverCapable || openChild.value === id) return
  clearXpTimer()
  xpTimer = setTimeout(() => (openChild.value = id), 140)
}
function onChildKey(e: KeyboardEvent, i: number) {
  const last = children.value.length - 1
  const next = ({
    ArrowDown: i === last ? 0 : i + 1,
    ArrowRight: i === last ? 0 : i + 1,
    ArrowUp: i === 0 ? last : i - 1,
    ArrowLeft: i === 0 ? last : i - 1,
    Home: 0,
    End: last
  } as Record<string, number>)[e.key]
  if (next === undefined) return
  e.preventDefault()
  xpHeads.value[next]?.focus()
  if (xpWide.value) openChild.value = children.value[next]!.id
}

onMounted(() => {
  if (detail.value.childLayout !== 'expand') return
  xpHoverCapable = window.matchMedia('(hover: hover)').matches
  const wide = window.matchMedia('(min-width: 1200px)')
  const sync = () => {
    xpWide.value = wide.matches
    if (wide.matches && !openChild.value) openChild.value = children.value[0]?.id ?? null
  }
  sync()
  wide.addEventListener('change', sync)
  onBeforeUnmount(() => {
    wide.removeEventListener('change', sync)
    clearXpTimer()
  })
})

// Short line under a module's name in "Works with".
const relatedSummary = (id: string) =>
  detail.value.relatedText?.[id] ?? solutionDetails[id]?.summary ?? `${solutionDetails[id]?.intro.split('. ')[0]}.`

// Back to the first tab and panel when the same component instance moves to another solution.
watch(() => props.id, () => {
  activeTab.value = 0
  tabEls.value = []
  openChild.value = children.value[0]?.id ?? null
  xpHeads.value = []
})

// Lucide icons for highlight.icon in the tab buttons; highlights without one show a check.
type TabIcon = NonNullable<SolutionHighlight['icon']>
interface IconShape { paths: string[], rects?: { x: number, y: number, width: number, height: number, rx: number }[], circles?: { cx: number, cy: number, r: number }[] }
const tabIcons: Record<TabIcon, IconShape> = {
  'shield': { paths: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', 'm9 12 2 2 4-4'] },
  'calendar-clock': { paths: ['M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5', 'M16 2v4', 'M8 2v4', 'M3 10h5', 'M17.5 17.5 16 16.3V14'], circles: [{ cx: 16, cy: 16, r: 6 }] },
  'layout-grid': { paths: [], rects: [{ x: 3, y: 3, width: 7, height: 7, rx: 1 }, { x: 14, y: 3, width: 7, height: 7, rx: 1 }, { x: 14, y: 14, width: 7, height: 7, rx: 1 }, { x: 3, y: 14, width: 7, height: 7, rx: 1 }] },
  'bar-chart': { paths: ['M3 3v16a2 2 0 0 0 2 2h16', 'M18 17V9', 'M13 17V5', 'M8 17v-3'] }
}

// "What it covers" as a bento (coversLayout 'bento'): placement classes for items a–f.
const bentoItemClasses = ['mbento__item--a', 'mbento__item--b', 'mbento__item--c', 'mbento__item--d mbento__item--dark', 'mbento__item--e', 'mbento__item--f']

function selectTab(i: number, focus = false) {
  activeTab.value = i
  const tab = tabEls.value[i]
  if (!tab) return
  if (focus) tab.focus()
  // Below 900px the tabs are a scrolling pill row: bring the selected pill into view.
  const nav = tabNav.value
  if (nav && window.matchMedia('(max-width: 899px)').matches) {
    const left = tab.getBoundingClientRect().left - nav.getBoundingClientRect().left + nav.scrollLeft - (nav.clientWidth - tab.offsetWidth) / 2
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    nav.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' })
  }
}

function onTabKey(e: KeyboardEvent) {
  const last = detail.value.highlights.length - 1
  const i = activeTab.value
  const next = ({
    ArrowDown: i === last ? 0 : i + 1,
    ArrowRight: i === last ? 0 : i + 1,
    ArrowUp: i === 0 ? last : i - 1,
    ArrowLeft: i === 0 ? last : i - 1,
    Home: 0,
    End: last
  } as Record<string, number>)[e.key]
  if (next === undefined) return
  e.preventDefault()
  selectTab(next, true)
}

// The page hero links every crumb but the last, which is the current page.
const heroCrumbs = computed(() => crumbs.value.map((c, i) => ({ label: c.label, to: i < crumbs.value.length - 1 ? c.href : undefined })))

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
    <SectionsHeroSection :breadcrumbs="heroCrumbs" :eyebrow="detail.eyebrow" :title="detail.title" :subtitle="detail.intro">
      <NuxtLink :to="sitePaths.demo" class="btn btn--primary">
        Book a Demo
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </NuxtLink>
      <NuxtLink :to="sitePaths.contact" class="btn btn--ghost">Ask a Question</NuxtLink>
    </SectionsHeroSection>

    <section class="sol-section bg-white" aria-labelledby="covers-title">
      <div class="mx-auto w-full max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
        <h2 id="covers-title" v-reveal class="h2">{{ children.length && detail.coversLayout !== 'tabs' ? 'What every operator gets' : 'What it covers' }}</h2>
        <div v-if="detail.coversLayout === 'tabs'" class="tabview tabview--covers">
          <div ref="tabNav" class="tabview__nav" role="tablist" aria-orientation="vertical" aria-label="What it covers" @keydown="onTabKey">
            <button
              v-for="(h, i) in detail.highlights"
              :id="tabId(i)"
              :key="h.title"
              :ref="el => { if (el) tabEls[i] = el as HTMLButtonElement }"
              class="tabview__tab"
              type="button"
              role="tab"
              :aria-controls="panelId(i)"
              :aria-selected="i === activeTab"
              :tabindex="i === activeTab ? 0 : -1"
              @click="selectTab(i)"
            >
              <span class="tabview__num">{{ pad(i + 1) }}</span>
              <span class="tabview__ico">
                <svg v-if="h.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                  <path v-for="d in tabIcons[h.icon].paths" :key="d" :d="d" />
                  <rect v-for="(r, ri) in tabIcons[h.icon].rects" :key="`r${ri}`" v-bind="r" />
                  <circle v-for="(c, ci) in tabIcons[h.icon].circles" :key="`c${ci}`" v-bind="c" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span class="tabview__label">{{ h.title }}</span>
              <span class="tabview__chev">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
          <div class="tabview__stage">
            <div
              v-for="(h, i) in detail.highlights"
              :id="panelId(i)"
              :key="h.title"
              class="tabview__panel"
              role="tabpanel"
              :aria-labelledby="tabId(i)"
              :hidden="i !== activeTab"
            >
              <!-- Static, trusted SVG from data/solutionDetails.ts -->
              <figure v-if="h.visual" class="tabview__visual" v-html="h.visual" />
              <div class="tabview__copy">
                <p class="tabview__count"><b>{{ pad(i + 1) }}</b> / {{ pad(detail.highlights.length) }}</p>
                <h3 class="tabview__title">{{ h.title }}</h3>
                <p class="tabview__desc">{{ h.text }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="detail.coversLayout === 'bento'" class="mbento" :class="{ 'mbento--mirror': detail.coversMirror }">
          <!-- Items a–f in order; d is the dark card with the solid icon tile. -->
          <article
            v-for="(h, i) in detail.highlights"
            :key="h.title"
            class="mbento__item"
            :class="bentoItemClasses[i]"
          >
            <!-- Static, trusted SVG from data/solutionDetails.ts -->
            <figure v-if="h.visual" class="mbento__visual" v-html="h.visual" />
            <div class="mbento__copy">
              <span class="icon-tile" :class="{ 'icon-tile--soft': i !== 3 }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <h3>{{ h.title }}</h3>
              <p>{{ h.text }}</p>
            </div>
          </article>
        </div>
        <div v-else class="sol-cards sol-cards--3">
          <article v-for="(h, i) in detail.highlights" :key="h.title" v-reveal="(i % 3) * 110" class="sol-card">
            <span class="icon-tile icon-tile--soft">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h3>{{ h.title }}</h3>
            <p>{{ h.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Operations: the three kinds of operator -->
    <section v-if="children.length" class="sol-section sol-section--line bg-white" aria-labelledby="sub-title">
      <div class="mx-auto w-full max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
        <h2 id="sub-title" v-reveal class="h2">Choose how you fly</h2>
        <div v-if="detail.childLayout === 'expand'" v-reveal="100" class="xpand">
          <article
            v-for="(c, i) in children"
            :key="c.id"
            class="xpand__item"
            :class="{ 'is-open': openChild === c.id }"
            @mouseenter="onChildEnter(c.id)"
            @mouseleave="clearXpTimer"
          >
            <h3 class="xpand__h">
              <button
                :id="`xh-${c.slug}`"
                :ref="el => { if (el) xpHeads[i] = el as HTMLButtonElement }"
                class="xpand__head"
                type="button"
                :aria-expanded="openChild === c.id"
                :aria-controls="`xp-${c.slug}`"
                @click="toggleChild(c.id)"
                @keydown="onChildKey($event, i)"
              >
                <span class="icon-tile">
                  <LandingAudienceIcon :id="c.icon" />
                </span>
                <span class="xpand__title">{{ c.shortLabel ?? c.label }}</span>
                <span class="xpand__teaser">{{ detail.childPanels?.[c.id]?.teaser }}</span>
                <span class="xpand__toggle" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" focusable="false">
                    <path d="M5 12h14" /><path d="M12 5v14" />
                  </svg>
                </span>
              </button>
            </h3>
            <!-- inert while closed, so the collapsed accordion's link is not tabbable. -->
            <div :id="`xp-${c.slug}`" class="xpand__body" role="region" :aria-labelledby="`xh-${c.slug}`" :inert="openChild !== c.id || undefined">
              <div class="xpand__inner">
                <!-- Static, trusted SVG from data/solutionDetails.ts -->
                <figure class="xpand__visual" v-html="detail.childPanels?.[c.id]?.visual" />
                <p>{{ detail.childPanels?.[c.id]?.description }}</p>
                <NuxtLink class="link-arrow" :to="solutionPath(c.id)" :aria-label="`Explore ${c.shortLabel ?? c.label}`">
                  Explore
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
        <div v-else v-reveal="100" class="sol-cards sol-cards--3">
          <NuxtLink v-for="c in children" :key="c.id" :to="solutionPath(c.id)" class="sol-card sol-card--link">
            <span class="icon-tile icon-tile--soft">
              <LandingAudienceIcon :id="c.icon" />
            </span>
            <h3>{{ c.label }}</h3>
            <p>{{ c.description }}</p>
            <span class="link-arrow">
              Explore
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="sol-section sol-section--ice">
      <!-- Works with as a list (worksWithLayout 'list'). With an intro line the left column is
           "Works with" + the intro; otherwise "Who it's for" stays on the left. -->
      <div v-if="detail.worksWithLayout === 'list'" class="sol-band mx-auto w-full max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
        <div v-if="detail.worksWithIntro">
          <h2 v-reveal class="h3">Works with</h2>
          <p class="works-intro">{{ detail.worksWithIntro }}</p>
        </div>
        <div v-else>
          <h2 v-reveal class="h3">Who it's for</h2>
          <ul v-reveal="100" class="check-list">
            <li v-for="a in detail.audience" :key="a">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>{{ a }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 v-if="!detail.worksWithIntro" v-reveal class="h3">Works with</h2>
          <ul v-reveal="100" class="linked-mods" role="list">
            <li v-for="r in related" :key="r.id">
              <NuxtLink :to="solutionPath(r.id)">
                <span class="icon-tile icon-tile--soft">
                  <LandingAudienceIcon :id="r.icon" />
                </span>
                <div class="linked-mods__text">
                  <h3>{{ r.label }}</h3>
                  <p>{{ relatedSummary(r.id) }}</p>
                </div>
                <span class="link-arrow">
                  Explore {{ r.label }}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="sol-band mx-auto w-full max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
        <div>
          <h2 v-reveal class="h3">Who it's for</h2>
          <ul v-reveal="100" class="check-list">
            <li v-for="a in detail.audience" :key="a">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>{{ a }}</span>
            </li>
          </ul>
        </div>
        <div v-if="related.length">
          <h2 v-reveal class="h3">Works with</h2>
          <div v-reveal="100" class="sol-cards">
            <NuxtLink v-for="r in related" :key="r.id" :to="solutionPath(r.id)" class="sol-card sol-card--link">
              <span class="icon-tile icon-tile--soft">
                <LandingAudienceIcon :id="r.icon" />
              </span>
              <h3>{{ r.label }}</h3>
              <p>{{ relatedSummary(r.id) }}</p>
              <span class="link-arrow">
                Explore {{ r.label }}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <SectionsDemoRequestCta />
  </div>
</template>
