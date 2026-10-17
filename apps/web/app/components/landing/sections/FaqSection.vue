<script setup lang="ts">
withDefaults(defineProps<{ askHref?: string }>(), { askHref: '#demo-ask' })

const faqs = [
  {
    q: 'What is VYOMA?',
    a: 'VYOMA is an aviation technology platform that brings fleet visibility, maintenance planning, continuing airworthiness and technical records together in one connected digital workspace. It is part of the AVAJet family.'
  },
  {
    q: 'Who is VYOMA designed for?',
    a: 'Airlines, flying training schools, private jet and non-scheduled operators, and CAMO organisations, including their fleet managers, maintenance controllers and airworthiness teams.'
  },
  {
    q: 'What is VYOMA ONE?',
    a: 'VYOMA ONE is the connected platform at the heart of VYOMA: one workspace where management, maintenance, operations and logistics teams work from the same information.'
  },
  {
    q: 'What is CAMO software?',
    a: 'A CAMO (Continuing Airworthiness Management Organisation) keeps an aircraft legally airworthy: tracking directives and bulletins, planned maintenance, component life and technical records. CAMO software like VYOMA keeps all of that in one place instead of spreadsheets and paper. An airline can run its own CAMO or subcontract one.'
  },
  {
    q: 'Is VYOMA software for flying training schools?',
    a: 'Yes. Alongside aircraft maintenance and airworthiness tracking, VYOMA handles the student roster, instructors and examiners, sortie booking, exercise logs, and student-hours and instructor-utilisation reports.'
  },
  {
    q: 'Can private jet and non-scheduled operators use VYOMA?',
    a: 'Yes. Private jet and non-scheduled operators can manage trip requests through to quote, confirmation and completion, track permits and handling per leg, and see trip costing and margin, with the airworthiness status of each aircraft alongside.'
  },
  {
    q: 'Does VYOMA cover logistics and parts?',
    a: 'VYOMA includes part masters and vendor masters. Parts carry their life cycle, applicability and effectivity, and are linked to the aircraft and installed components they apply to. Vendors carry classifications, approvals and registrations.'
  },
  {
    q: 'Does VYOMA include fleet management?',
    a: 'Yes. Fleet management is a core capability, giving you a single, current view of every aircraft and what it needs.'
  },
  {
    q: "Why can't I see product screens on the website?",
    a: 'We prefer to show VYOMA in a demo, where we can tailor the walkthrough to your fleet and answer questions as we go.'
  },
  {
    q: 'How does the demo work?',
    a: 'Book a demo with a few details about your organisation. The VYOMA team will contact you to understand your needs and arrange a walkthrough at a time that suits you.'
  },
  {
    q: 'What onboarding options are available?',
    a: 'Onboarding, including migration of existing records, configuration and training, is planned with each organisation based on its fleet and operation.'
  },
  {
    q: "How can I ask a question that isn't covered here?",
    a: 'Use Ask More in the form below and the VYOMA team will get back to you.'
  }
]

// FAQPage structured data for the questions shown on this page.
useHead({
  script: [
    {
      type: 'application/ld+json',
      key: 'ld-faq',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      })
    }
  ]
})

const open = ref<number | null>(0)
</script>

<template>
  <section id="faq" class="section bg-ice" aria-labelledby="faq-title">
    <div class="container-v grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-4">
        <div class="lg:sticky lg:top-28">
          <h2 id="faq-title" class="display-lg text-navy">Questions, answered.</h2>
          <p class="lede mt-5">
            Something not covered here?
            <a :href="askHref" class="font-medium text-ocean underline decoration-sky/40 underline-offset-4 hover:decoration-sky">Ask us directly</a>.
          </p>
        </div>
      </div>
      <ul class="lg:col-span-8">
        <li v-for="(f, i) in faqs" :key="f.q" class="border-b border-line first:border-t">
          <h3>
            <button
              type="button"
              :id="`faq-q-${i}`"
              :aria-expanded="open === i"
              :aria-controls="`faq-a-${i}`"
              class="flex w-full items-center justify-between gap-6 py-6 text-left text-[1.05rem] font-medium text-navy md:text-[1.12rem]"
              @click="open = open === i ? null : i"
            >
              {{ f.q }}
              <span
                class="grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300"
                :class="open === i ? 'rotate-45 border-navy bg-navy text-white' : 'border-line bg-white text-navy'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                  <path d="M5 12h14" /><path d="M12 5v14" />
                </svg>
              </span>
            </button>
          </h3>
          <div :id="`faq-a-${i}`" role="region" :aria-labelledby="`faq-q-${i}`" class="acc-body" :data-open="open === i">
            <div>
              <p class="max-w-[680px] pb-6 pr-12 text-[0.95rem] leading-relaxed text-muted">{{ f.a }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
