<script setup lang="ts">
import type { LeadSubmission } from '@vyoma/shared'

definePageMeta({ layout: 'admin' })

const adminFetch = useAdminFetch()
const { data: leads, refresh } = await useAsyncData('admin:leads', () =>
  adminFetch<LeadSubmission[]>('/admin/leads')
, { server: false })

const typeLabel: Record<string, string> = { DEMO_REQUEST: 'Book a demo', CONTACT: 'Ask more' }
const statusTone: Record<string, string> = {
  NEW: 'bg-sky-100 text-sky-700',
  CONTACTED: 'bg-amber-100 text-amber-700',
  CLOSED: 'bg-emerald-100 text-emerald-700'
}

const search = ref('')
const typeFilter = ref('')
const statusFilter = ref('')
const openId = ref<string | null>(null)
const error = ref<string | null>(null)

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return (leads.value ?? []).filter((l) => {
    if (typeFilter.value && l.type !== typeFilter.value) return false
    if (statusFilter.value && l.status !== statusFilter.value) return false
    if (!q) return true
    return [l.name, l.email, l.company, l.role, l.orgType, l.topic, l.message]
      .some(v => v?.toLowerCase().includes(q))
  })
})

const counts = computed(() => ({
  total: leads.value?.length ?? 0,
  fresh: (leads.value ?? []).filter(l => l.status === 'NEW').length
}))

const when = (iso: string) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })

async function setStatus(lead: LeadSubmission, status: string) {
  error.value = null
  try {
    await adminFetch(`/admin/leads/${lead.id}/status`, { method: 'PATCH', body: { status } })
    await refresh()
  } catch {
    error.value = 'Could not update the status. Please try again.'
  }
}

function csvCell(v: string | null | undefined) {
  const s = (v ?? '').replace(/"/g, '""')
  return `"${s}"`
}

function exportCsv() {
  const head = ['Received', 'Type', 'Status', 'Name', 'Email', 'Company', 'Role', 'Organisation type', 'Timing', 'Topic', 'Message', 'Source']
  const rows = filtered.value.map(l => [
    new Date(l.createdAt).toISOString(), typeLabel[l.type] ?? l.type, l.status, l.name, l.email,
    l.company, l.role, l.orgType, l.timing, l.topic, l.message, l.source
  ].map(csvCell).join(','))
  const blob = new Blob([[head.map(csvCell).join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `vyoma-leads-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(a.href)
}
</script>

<template>
  <div class="p-8 max-w-6xl">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)]">Leads</h1>
        <p class="mt-1 text-sm text-slate-500">
          Everything submitted through <strong>Book a Demo</strong> and <strong>Ask More</strong> on the website.
          {{ counts.total }} total, <span class="font-medium text-sky-700">{{ counts.fresh }} new</span>.
        </p>
      </div>
      <div class="flex gap-2">
        <button type="button" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" @click="refresh()">Refresh</button>
        <button type="button" class="rounded-lg bg-[var(--vyoma-deep-navy)] px-3 py-2 text-sm font-medium text-white disabled:opacity-40" :disabled="!filtered.length" @click="exportCsv">Export CSV</button>
      </div>
    </div>

    <div class="mb-4 flex flex-wrap gap-3">
      <input v-model="search" type="search" placeholder="Search name, email, company, message…" aria-label="Search leads" class="min-w-[260px] flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
      <select v-model="typeFilter" aria-label="Filter by type" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
        <option value="">All types</option>
        <option value="DEMO_REQUEST">Book a demo</option>
        <option value="CONTACT">Ask more</option>
      </select>
      <select v-model="statusFilter" aria-label="Filter by status" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
        <option value="">All statuses</option>
        <option value="NEW">New</option>
        <option value="CONTACTED">Contacted</option>
        <option value="CLOSED">Closed</option>
      </select>
    </div>

    <p v-if="error" class="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{{ error }}</p>

    <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-3">Received</th>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Company</th>
            <th class="px-4 py-3">Type</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          <template v-for="lead in filtered" :key="lead.id">
            <tr class="border-t border-slate-100">
              <td class="whitespace-nowrap px-4 py-3 text-xs text-slate-500">{{ when(lead.createdAt) }}</td>
              <td class="px-4 py-3">
                <span class="block font-medium text-[var(--vyoma-deep-navy)]">{{ lead.name }}</span>
                <a :href="`mailto:${lead.email}`" class="text-xs text-slate-500 hover:underline">{{ lead.email }}</a>
              </td>
              <td class="px-4 py-3 text-slate-600">
                {{ lead.company || '—' }}
                <span v-if="lead.role" class="block text-xs text-slate-400">{{ lead.role }}</span>
              </td>
              <td class="px-4 py-3 text-xs text-slate-600">{{ typeLabel[lead.type] ?? lead.type }}</td>
              <td class="px-4 py-3">
                <select
                  class="rounded-full border-0 px-2 py-1 text-xs font-medium"
                  :class="statusTone[lead.status]"
                  :value="lead.status"
                  :aria-label="`Status of ${lead.name}`"
                  @change="setStatus(lead, ($event.target as HTMLSelectElement).value)"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </td>
              <td class="px-4 py-3 text-right">
                <button type="button" class="text-xs font-medium text-[var(--vyoma-aviation-blue)]" :aria-expanded="openId === lead.id" @click="openId = openId === lead.id ? null : lead.id">
                  {{ openId === lead.id ? 'Hide' : 'Details' }}
                </button>
              </td>
            </tr>
            <tr v-if="openId === lead.id" class="bg-slate-50">
              <td colspan="6" class="px-4 py-4">
                <dl class="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <div><dt class="text-xs uppercase tracking-wide text-slate-400">Organisation type</dt><dd class="text-slate-700">{{ lead.orgType || '—' }}</dd></div>
                  <div><dt class="text-xs uppercase tracking-wide text-slate-400">Timing</dt><dd class="text-slate-700">{{ lead.timing || '—' }}</dd></div>
                  <div><dt class="text-xs uppercase tracking-wide text-slate-400">Topic</dt><dd class="text-slate-700">{{ lead.topic || '—' }}</dd></div>
                  <div><dt class="text-xs uppercase tracking-wide text-slate-400">Source</dt><dd class="text-slate-700">{{ lead.source }}</dd></div>
                  <div class="sm:col-span-2 lg:col-span-3"><dt class="text-xs uppercase tracking-wide text-slate-400">Message</dt><dd class="whitespace-pre-wrap text-slate-700">{{ lead.message || '—' }}</dd></div>
                </dl>
              </td>
            </tr>
          </template>
          <tr v-if="!filtered.length">
            <td colspan="6" class="px-4 py-10 text-center text-slate-400">
              {{ counts.total ? 'No leads match these filters.' : 'No leads yet. They appear here as soon as someone submits the form on the website.' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
