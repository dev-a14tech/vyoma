<script setup lang="ts">
import type { AudienceSegment } from '@vyoma/shared'

definePageMeta({ layout: 'admin' })

const adminFetch = useAdminFetch()
const { data: audiences, refresh } = await useAsyncData('admin:audiences', () =>
  adminFetch<AudienceSegment[]>('/admin/audiences')
)

async function togglePublished(a: AudienceSegment) {
  await adminFetch(`/admin/audiences/${a.id}`, { method: 'PATCH', body: { published: !a.published } })
  await refresh()
}
</script>

<template>
  <div class="p-8 max-w-4xl">
    <h1 class="font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)] mb-6">Audiences</h1>
    <div class="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-3">Title</th>
            <th class="px-4 py-3">Hero copy</th>
            <th class="px-4 py-3">Published</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="a in audiences" :key="a.id">
            <td class="px-4 py-3 font-medium text-[var(--vyoma-deep-navy)] whitespace-nowrap">{{ a.title }}</td>
            <td class="px-4 py-3 text-slate-500 max-w-sm truncate">{{ a.heroCopy }}</td>
            <td class="px-4 py-3">
              <USwitch :model-value="a.published" @update:model-value="togglePublished(a)" />
            </td>
            <td class="px-4 py-3 text-right">
              <NuxtLink :to="`/admin/audiences/${a.id}`" class="text-[var(--vyoma-aviation-blue)] text-xs font-medium">Edit</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
