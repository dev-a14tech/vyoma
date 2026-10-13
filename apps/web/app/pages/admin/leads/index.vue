<script setup lang="ts">
import type { LeadSubmission } from '@vyoma/shared'

definePageMeta({ layout: 'admin' })

const adminFetch = useAdminFetch()
const { data: leads, refresh } = await useAsyncData('admin:leads', () =>
  adminFetch<LeadSubmission[]>('/admin/leads')
)

const statusTone: Record<string, string> = {
  NEW: 'bg-sky-100 text-sky-700',
  CONTACTED: 'bg-amber-100 text-amber-700',
  CLOSED: 'bg-emerald-100 text-emerald-700'
}

async function setStatus(lead: LeadSubmission, status: string) {
  await adminFetch(`/admin/leads/${lead.id}/status`, { method: 'PATCH', body: { status } })
  await refresh()
}
</script>

<template>
  <div class="p-8 max-w-5xl">
    <h1 class="font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)] mb-6">Leads</h1>
    <div class="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Type</th>
            <th class="px-4 py-3">Company</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Received</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="lead in leads" :key="lead.id">
            <td class="px-4 py-3 font-medium text-[var(--vyoma-deep-navy)] whitespace-nowrap">{{ lead.name }}</td>
            <td class="px-4 py-3 text-slate-600">{{ lead.email }}</td>
            <td class="px-4 py-3 text-slate-500 text-xs">{{ lead.type }}</td>
            <td class="px-4 py-3 text-slate-500">{{ lead.company || '—' }}</td>
            <td class="px-4 py-3">
              <select
                class="text-xs rounded-full px-2 py-1 border-0 font-medium"
                :class="statusTone[lead.status]"
                :value="lead.status"
                @change="setStatus(lead, ($event.target as HTMLSelectElement).value)"
              >
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </td>
            <td class="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{{ new Date(lead.createdAt).toLocaleDateString() }}</td>
          </tr>
          <tr v-if="!leads?.length">
            <td colspan="6" class="px-4 py-8 text-center text-slate-400">No leads yet.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
