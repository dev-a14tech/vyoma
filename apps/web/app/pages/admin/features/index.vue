<script setup lang="ts">
import type { FeatureTheme } from '@vyoma/shared'

definePageMeta({ layout: 'admin' })

const adminFetch = useAdminFetch()
const { data: features, refresh } = await useAsyncData('admin:features', () =>
  adminFetch<FeatureTheme[]>('/admin/features')
)

async function togglePublished(f: FeatureTheme) {
  await adminFetch(`/admin/features/${f.id}`, { method: 'PATCH', body: { published: !f.published } })
  await refresh()
}
</script>

<template>
  <div class="p-8 max-w-4xl">
    <div class="flex items-center justify-between mb-6">
      <h1 class="font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)]">Features</h1>
    </div>

    <div class="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-3">Order</th>
            <th class="px-4 py-3">Title</th>
            <th class="px-4 py-3">Video</th>
            <th class="px-4 py-3">Published</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="f in features" :key="f.id">
            <td class="px-4 py-3 text-slate-500">{{ f.order }}</td>
            <td class="px-4 py-3 font-medium text-[var(--vyoma-deep-navy)]">{{ f.title }}</td>
            <td class="px-4 py-3">
              <span v-if="f.videoUrl" class="text-emerald-600 text-xs font-medium">Live</span>
              <span v-else class="text-slate-400 text-xs">Placeholder</span>
            </td>
            <td class="px-4 py-3">
              <USwitch :model-value="f.published" @update:model-value="togglePublished(f)" />
            </td>
            <td class="px-4 py-3 text-right">
              <NuxtLink :to="`/admin/features/${f.id}`" class="text-[var(--vyoma-aviation-blue)] text-xs font-medium">Edit</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
