<script setup lang="ts">
import type { LeadType } from '@vyoma/shared'

const props = defineProps<{
  type: LeadType
  submitLabel?: string
}>()

const { submitting, submitted, error, submit } = useLeadForm(props.type)

const form = reactive({
  name: '',
  email: '',
  company: '',
  role: '',
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
  <div v-if="submitted" class="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
    <UIcon name="i-lucide-check-circle" class="w-8 h-8 text-emerald-500 mx-auto mb-3" />
    <h3 class="font-heading font-semibold text-[var(--vyoma-deep-navy)]">Thanks &mdash; we got it</h3>
    <p class="text-sm text-slate-600 mt-1">Someone from the VYOMA team will be in touch shortly.</p>
  </div>

  <form v-else class="space-y-4" @submit.prevent="onSubmit">
    <div class="grid sm:grid-cols-2 gap-4">
      <UFormField label="Full name" required>
        <UInput v-model="form.name" placeholder="Jane Doe" required class="w-full" />
      </UFormField>
      <UFormField label="Work email" required>
        <UInput v-model="form.email" type="email" placeholder="jane@airline.com" required class="w-full" />
      </UFormField>
    </div>
    <div class="grid sm:grid-cols-2 gap-4">
      <UFormField label="Organisation">
        <UInput v-model="form.company" placeholder="Your airline / CAMO / MRO" class="w-full" />
      </UFormField>
      <UFormField label="Role">
        <UInput v-model="form.role" placeholder="e.g. Head of Engineering" class="w-full" />
      </UFormField>
    </div>
    <UFormField :label="type === 'DEMO_REQUEST' ? 'What would you like us to cover?' : 'Message'">
      <UTextarea v-model="form.message" :rows="4" class="w-full" />
    </UFormField>

    <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>

    <UButton type="submit" size="xl" color="primary" block class="font-semibold" :loading="submitting">
      {{ submitLabel ?? 'Submit' }}
    </UButton>
  </form>
</template>
