<script setup lang="ts">
const faqs = [
  {
    q: 'What is VYOMA?',
    a: 'VYOMA is an aviation technology platform that brings fleet visibility, maintenance planning, continuing airworthiness and technical records together in one connected digital workspace. It is part of the AVAJet family.'
  },
  {
    q: 'Who is VYOMA designed for?',
    a: 'Airlines and aircraft operators, CAMO organisations, MRO teams, fleet managers, maintenance controllers and airworthiness teams.'
  },
  {
    q: 'What is VYOMA ONE?',
    a: 'VYOMA ONE is the connected platform at the heart of VYOMA: one workspace where fleet, maintenance, airworthiness and operations teams work from the same information.'
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
            <a href="#demo-ask" class="font-medium text-ocean underline decoration-sky/40 underline-offset-4 hover:decoration-sky">Ask us directly</a>.
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
