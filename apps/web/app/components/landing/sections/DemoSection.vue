<script setup lang="ts">
type Mode = 'book' | 'ask'

const orgTypes = ['Airline / aircraft operator', 'CAMO organisation', 'Flying training school', 'Private jet / non-scheduled operator', 'Leasing / asset management', 'Other']
const timings = ['As soon as possible', 'Within the next two weeks', 'Later this month', "I'm flexible"]
const topics = ['The VYOMA platform', 'VYOMA ONE', 'Fleet management', 'Onboarding and migration', 'Something else']

type Values = {
  name: string
  email: string
  company: string
  role: string
  orgType: string
  timing: string
  topic: string
  message: string
}
type Errors = Partial<Record<keyof Values, string>>
const emptyValues = (): Values => ({ name: '', email: '', company: '', role: '', orgType: '', timing: '', topic: '', message: '' })

function validate(v: Values, mode: Mode): Errors {
  const e: Errors = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!v.email.trim()) e.email = 'Enter your work email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter an email address like name@company.com.'
  if (!v.company.trim()) e.company = 'Enter your company name.'
  if (mode === 'book') {
    if (!v.role.trim()) e.role = 'Enter your job role.'
    if (!v.orgType) e.orgType = 'Select your organisation type.'
  } else {
    if (!v.topic) e.topic = 'Select what your question is about.'
    if (!v.message.trim()) e.message = 'Enter your question.'
  }
  if (v.message.length > 2000) e.message = 'Keep the message under 2,000 characters.'
  return e
}

const copy = {
  book: {
    tab: 'Book a Demo',
    intro: "Tell us about your fleet and the workflows you want to improve. We'll tailor a walkthrough of VYOMA to your operation.",
    points: ['A walkthrough built around your aircraft and processes', 'Time for your teams to ask questions', 'A clear view of onboarding and next steps'],
    submit: 'Request Your Demo',
    done: 'Demo request received'
  },
  ask: {
    tab: 'Ask More',
    intro: 'Have a question before booking a demo? Ask us anything about VYOMA and the team will get back to you.',
    points: ['Answers from the VYOMA team', 'No commitment to book a demo', 'Help finding the right next step'],
    submit: 'Send Your Question',
    done: 'Question received'
  }
} as const

const mode = ref<Mode>('book')
const values = ref<Values>(emptyValues())
const errors = ref<Errors>({})
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

useHashSelect('demo', ['book', 'ask'], (id) => switchMode(id as Mode))

function switchMode(m: Mode) {
  mode.value = m
  errors.value = {}
  status.value = 'idle'
}

function clearError(k: keyof Values) {
  if (errors.value[k]) errors.value = { ...errors.value, [k]: undefined }
}

const base = useApiBase()

async function onSubmit() {
  const errs = validate(values.value, mode.value)
  errors.value = errs
  const first = Object.keys(errs)[0]
  if (first) {
    document.getElementById(`f-${first}`)?.focus()
    return
  }
  status.value = 'sending'
  try {
    const path = mode.value === 'book' ? '/leads/demo-request' : '/leads/contact'
    await $fetch(`${base}${path}`, {
      method: 'POST',
      body: {
        name: values.value.name,
        email: values.value.email,
        company: values.value.company,
        role: values.value.role || undefined,
        orgType: values.value.orgType || undefined,
        timing: values.value.timing || undefined,
        topic: values.value.topic || undefined,
        message: values.value.message || undefined,
        source: 'vyoma.aero'
      }
    })
    status.value = 'sent'
  } catch {
    status.value = 'error'
  }
}

function startNewRequest() {
  values.value = emptyValues()
  status.value = 'idle'
}

const c = computed(() => copy[mode.value])
const done = computed(() => status.value === 'sent')
</script>

<template>
  <section id="demo" class="section bg-white" aria-labelledby="demo-title">
    <div class="container-v">
      <div class="dark-band relative overflow-hidden rounded-[32px] px-5 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16">
        <img src="/images/brand/vyoma-logomark.png" alt="" aria-hidden="true" width="629" height="520" class="watermark absolute -bottom-40 -left-32 opacity-[0.07]" style="height:520px;width:auto" draggable="false" />
        <div class="relative grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div class="lg:col-span-5">
            <h2 id="demo-title" class="display-lg text-white">See Aviation Intelligence in Action.</h2>
            <p :key="mode" class="lede fade-swap mt-5 !text-[#a9bdd0]">{{ c.intro }}</p>
            <ul :key="`${mode}-p`" class="fade-swap mt-10 space-y-4 text-[0.93rem] text-[#d5e2ee]">
              <li v-for="t in c.points" :key="t" class="flex gap-3">
                <span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-cyan">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                {{ t }}
              </li>
            </ul>
          </div>

          <div class="lg:col-span-7">
            <div class="rounded-[24px] bg-white p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-6 md:p-8">
              <div role="tablist" aria-label="Request type" class="mb-7 grid grid-cols-2 gap-1 rounded-full bg-ice p-1">
                <button
                  v-for="m in (['book', 'ask'] as const)"
                  :key="m"
                  role="tab"
                  type="button"
                  :aria-selected="mode === m"
                  class="h-10 rounded-full text-[0.9rem] font-medium transition-colors"
                  :class="mode === m ? 'bg-navy text-white' : 'text-muted hover:text-navy'"
                  @click="switchMode(m)"
                >
                  {{ copy[m].tab }}
                </button>
              </div>

              <div v-if="done" class="fade-swap py-6 text-center" role="status">
                <span class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist text-ocean">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <h3 class="display-md mt-5 text-navy">{{ c.done }}</h3>
                <p class="mx-auto mt-3 max-w-[420px] text-[0.95rem] text-muted">
                  Thanks, {{ values.name.split(' ')[0] }}. The VYOMA team will contact you at {{ values.email }}.
                </p>
                <button type="button" class="btn btn-ghost btn-sm mt-7" @click="startNewRequest">Start a new request</button>
              </div>

              <form v-else :key="mode" novalidate class="fade-swap grid gap-5 md:grid-cols-2" @submit.prevent="onSubmit">
                <div>
                  <label for="f-name" class="mb-1.5 block text-[0.84rem] font-medium text-navy">Name</label>
                  <input id="f-name" v-model="values.name" type="text" autocomplete="name" :aria-invalid="!!errors.name" class="field" @input="clearError('name')" />
                  <p v-if="errors.name" class="mt-1.5 text-[0.8rem] text-alert">{{ errors.name }}</p>
                </div>
                <div>
                  <label for="f-email" class="mb-1.5 block text-[0.84rem] font-medium text-navy">Work email</label>
                  <input id="f-email" v-model="values.email" type="email" autocomplete="email" :aria-invalid="!!errors.email" class="field" @input="clearError('email')" />
                  <p v-if="errors.email" class="mt-1.5 text-[0.8rem] text-alert">{{ errors.email }}</p>
                </div>
                <div>
                  <label for="f-company" class="mb-1.5 block text-[0.84rem] font-medium text-navy">Company name</label>
                  <input id="f-company" v-model="values.company" type="text" autocomplete="organization" :aria-invalid="!!errors.company" class="field" @input="clearError('company')" />
                  <p v-if="errors.company" class="mt-1.5 text-[0.8rem] text-alert">{{ errors.company }}</p>
                </div>

                <template v-if="mode === 'book'">
                  <div>
                    <label for="f-role" class="mb-1.5 block text-[0.84rem] font-medium text-navy">Job role</label>
                    <input id="f-role" v-model="values.role" type="text" autocomplete="organization-title" :aria-invalid="!!errors.role" class="field" @input="clearError('role')" />
                    <p v-if="errors.role" class="mt-1.5 text-[0.8rem] text-alert">{{ errors.role }}</p>
                  </div>
                  <div>
                    <label for="f-orgType" class="mb-1.5 block text-[0.84rem] font-medium text-navy">Organisation type</label>
                    <select id="f-orgType" v-model="values.orgType" :aria-invalid="!!errors.orgType" class="field" :class="values.orgType ? '' : 'text-muted'" @change="clearError('orgType')">
                      <option value="">Select one</option>
                      <option v-for="o in orgTypes" :key="o" :value="o">{{ o }}</option>
                    </select>
                    <p v-if="errors.orgType" class="mt-1.5 text-[0.8rem] text-alert">{{ errors.orgType }}</p>
                  </div>
                  <div>
                    <label for="f-timing" class="mb-1.5 block text-[0.84rem] font-medium text-navy">Preferred demo timing <span class="font-normal text-muted">(optional)</span></label>
                    <select id="f-timing" v-model="values.timing" class="field" :class="values.timing ? '' : 'text-muted'">
                      <option value="">Select one</option>
                      <option v-for="t in timings" :key="t" :value="t">{{ t }}</option>
                    </select>
                  </div>
                </template>
                <template v-else>
                  <div>
                    <label for="f-topic" class="mb-1.5 block text-[0.84rem] font-medium text-navy">Your question is about</label>
                    <select id="f-topic" v-model="values.topic" :aria-invalid="!!errors.topic" class="field" :class="values.topic ? '' : 'text-muted'" @change="clearError('topic')">
                      <option value="">Select one</option>
                      <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
                    </select>
                    <p v-if="errors.topic" class="mt-1.5 text-[0.8rem] text-alert">{{ errors.topic }}</p>
                  </div>
                </template>

                <div class="md:col-span-2">
                  <label for="f-message" class="mb-1.5 block text-[0.84rem] font-medium text-navy">
                    {{ mode === 'book' ? 'What would you like to see?' : 'Your question' }}
                    <span v-if="mode === 'book'" class="font-normal text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="f-message"
                    v-model="values.message"
                    rows="4"
                    :aria-invalid="!!errors.message"
                    :placeholder="mode === 'book' ? 'Fleet size, aircraft types, priorities…' : 'Ask us anything about VYOMA…'"
                    class="field"
                    @input="clearError('message')"
                  />
                  <p v-if="errors.message" class="mt-1.5 text-[0.8rem] text-alert">{{ errors.message }}</p>
                </div>

                <p v-if="status === 'error'" class="flex items-start gap-2 rounded-xl bg-[#fdecea] p-3 text-[0.85rem] text-alert md:col-span-2" role="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="mt-0.5 shrink-0">
                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                  </svg>
                  Your request couldn't be sent. Check your connection and try again.
                </p>

                <div class="flex flex-col-reverse items-start justify-between gap-4 md:col-span-2 md:flex-row md:items-center">
                  <p class="text-[0.78rem] text-muted">We'll only use these details to respond to your request.</p>
                  <button type="submit" :disabled="status === 'sending'" class="btn btn-primary w-full md:w-auto">
                    {{ status === 'sending' ? 'Sending…' : c.submit }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="btn-arrow">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
