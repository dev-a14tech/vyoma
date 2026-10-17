<script setup lang="ts">
import type { LeadType } from '@vyoma/shared'

const props = defineProps<{
  type: LeadType
  submitLabel?: string
}>()

const { submitting, submitted, error, submit } = useLeadForm(props.type)

const orgTypeOptions = [
  'Airline / aircraft operator',
  'CAMO organisation',
  'Flying training school',
  'Private jet / non-scheduled operator',
  'Leasing / asset management',
  'Other'
]

const timingOptions = ['As soon as possible', 'Within the next two weeks', 'Later this month', "I'm flexible"]

const form = reactive({
  name: '',
  email: '',
  company: '',
  role: '',
  orgType: '',
  timing: '',
  topic: '',
  message: ''
})

async function onSubmit() {
  try {
    await submit({ ...form, source: 'website' })
  } catch {
    // error state already surfaced via `error`
  }
}
</script>

<template>
  <div v-if="submitted" class="rounded-v border border-line bg-ice p-8 text-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="mx-auto text-ocean">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
    </svg>
    <h3 class="mt-3 font-display text-[1.2rem] font-semibold text-navy">Thanks — we got it</h3>
    <p class="mt-1 text-[0.92rem] text-muted">Someone from the VYOMA team will be in touch shortly.</p>
  </div>

  <form v-else class="space-y-4" @submit.prevent="onSubmit">
    <p class="text-[0.8rem] text-muted">Fields marked optional can be left blank.</p>

    <div class="grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-1.5 block text-[0.85rem] font-medium text-navy">Name</span>
        <input v-model="form.name" type="text" required placeholder="Jane Doe" class="field" />
      </label>
      <label class="block">
        <span class="mb-1.5 block text-[0.85rem] font-medium text-navy">Work email</span>
        <input v-model="form.email" type="email" required placeholder="jane@airline.com" class="field" />
      </label>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-1.5 block text-[0.85rem] font-medium text-navy">Company name<template v-if="type === 'CONTACT'"> <span class="text-muted">(optional)</span></template></span>
        <input v-model="form.company" type="text" :required="type === 'DEMO_REQUEST'" placeholder="Your airline / CAMO / MRO" class="field" />
      </label>
      <label class="block">
        <span class="mb-1.5 block text-[0.85rem] font-medium text-navy">Organisation type <span class="text-muted">(optional)</span></span>
        <select v-model="form.orgType" class="field">
          <option value="">Select one</option>
          <option v-for="opt in orgTypeOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </label>
    </div>

    <label v-if="type === 'DEMO_REQUEST'" class="block">
      <span class="mb-1.5 block text-[0.85rem] font-medium text-navy">Job role <span class="text-muted">(optional)</span></span>
      <input v-model="form.role" type="text" placeholder="e.g. Head of Engineering" class="field" />
    </label>

    <label v-if="type === 'DEMO_REQUEST'" class="block">
      <span class="mb-1.5 block text-[0.85rem] font-medium text-navy">Preferred demo timing <span class="text-muted">(optional)</span></span>
      <select v-model="form.timing" class="field">
        <option value="">Select one</option>
        <option v-for="opt in timingOptions" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </label>

    <label v-if="type === 'DEMO_REQUEST'" class="block">
      <span class="mb-1.5 block text-[0.85rem] font-medium text-navy">What would you like to see? <span class="text-muted">(optional)</span></span>
      <textarea v-model="form.topic" rows="3" class="field" placeholder="Tell us about your fleet and the workflows you want to improve." />
    </label>

    <label v-else class="block">
      <span class="mb-1.5 block text-[0.85rem] font-medium text-navy">Your question</span>
      <textarea v-model="form.message" rows="4" required class="field" placeholder="What would you like to know?" />
    </label>

    <p v-if="error" class="text-[0.85rem] text-[#e5372b]">{{ error }}</p>

    <p class="text-[0.78rem] leading-relaxed text-muted">
      We use your details only to respond to your {{ type === 'DEMO_REQUEST' ? 'request' : 'question' }}. See our
      <NuxtLink to="/legal/privacy" class="font-medium text-ocean hover:underline">Privacy Policy</NuxtLink>.
    </p>

    <button type="submit" class="btn btn--primary w-full justify-center" :disabled="submitting">
      {{ submitting ? 'Sending…' : (submitLabel ?? 'Submit') }}
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
      </svg>
    </button>
  </form>
</template>
