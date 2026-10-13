<script setup lang="ts">
import type { Testimonial } from '@vyoma/shared'

definePageMeta({ layout: 'admin' })

const adminFetch = useAdminFetch()
const { data: testimonials, refresh } = await useAsyncData('admin:testimonials', () =>
  adminFetch<Testimonial[]>('/admin/testimonials')
)

async function remove(t: Testimonial) {
  await adminFetch(`/admin/testimonials/${t.id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div class="p-8 max-w-3xl">
    <div class="flex items-center justify-between mb-6">
      <h1 class="font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)]">Testimonials</h1>
      <UButton to="/admin/testimonials/new" color="primary" size="sm">Add testimonial</UButton>
    </div>

    <div v-if="!testimonials?.length" class="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400 text-sm">
      No testimonials yet. Add real client quotes here &mdash; they appear on the homepage once published.
    </div>

    <div v-else class="space-y-3">
      <div v-for="t in testimonials" :key="t.id" class="rounded-xl border border-slate-200 bg-white p-4 flex items-start justify-between gap-4">
        <div>
          <p class="text-sm text-slate-700">&ldquo;{{ t.quote }}&rdquo;</p>
          <p class="text-xs text-slate-500 mt-1">{{ t.authorName }} &middot; {{ t.orgName }}</p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <NuxtLink :to="`/admin/testimonials/${t.id}`" class="text-[var(--vyoma-aviation-blue)] text-xs font-medium">Edit</NuxtLink>
          <button class="text-rose-500 text-xs font-medium" @click="remove(t)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
