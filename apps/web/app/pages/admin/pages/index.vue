<script setup lang="ts">
import type { PageContent } from '@vyoma/shared'

definePageMeta({ layout: 'admin' })

const adminFetch = useAdminFetch()
const { data: pages } = await useAsyncData('admin:pages', () => adminFetch<PageContent[]>('/admin/pages'))
</script>

<template>
  <div class="p-8 max-w-3xl">
    <h1 class="font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)] mb-6">Pages</h1>
    <div class="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-3">Slug</th>
            <th class="px-4 py-3">Hero title</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="p in pages" :key="p.slug">
            <td class="px-4 py-3 font-mono text-xs text-slate-500">{{ p.slug }}</td>
            <td class="px-4 py-3 font-medium text-[var(--vyoma-deep-navy)]">{{ p.heroTitle }}</td>
            <td class="px-4 py-3 text-right">
              <NuxtLink :to="`/admin/pages/${p.slug}`" class="text-[var(--vyoma-aviation-blue)] text-xs font-medium">Edit</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
