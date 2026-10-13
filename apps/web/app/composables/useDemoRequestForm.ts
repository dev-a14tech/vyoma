import type { LeadSubmissionInput, LeadType } from '@vyoma/shared'

export function useLeadForm(type: LeadType) {
  // Submitted from a browser form - resolves to the public base (import.meta.server
  // is false client-side), same as adminLogin/adminLogout.
  const base = useApiBase()
  const submitting = ref(false)
  const submitted = ref(false)
  const error = ref<string | null>(null)

  async function submit(input: Omit<LeadSubmissionInput, 'type'>) {
    submitting.value = true
    error.value = null
    const path = type === 'DEMO_REQUEST' ? '/leads/demo-request' : '/leads/contact'
    try {
      await $fetch(`${base}${path}`, {
        method: 'POST',
        body: input
      })
      submitted.value = true
    } catch (err) {
      error.value = 'Something went wrong submitting the form. Please try again or email us directly.'
      throw err
    } finally {
      submitting.value = false
    }
  }

  return { submitting, submitted, error, submit }
}
