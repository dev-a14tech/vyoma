<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const adminFetch = useAdminFetch()
const { data: leads } = await useAsyncData('admin:leads:count', () =>
  adminFetch<Array<{ status: string }>>('/admin/leads')
)
const { data: features } = await useAsyncData('admin:features:count', () =>
  adminFetch<Array<{ published: boolean }>>('/admin/features')
)

const newLeads = computed(() => leads.value?.filter((l) => l.status === 'NEW').length ?? 0)
const publishedFeatures = computed(() => features.value?.filter((f) => f.published).length ?? 0)
</script>

<template>
  <div class="p-8 max-w-5xl">
    <h1 class="font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)]">Dashboard</h1>
    <div class="mt-6 grid sm:grid-cols-3 gap-4">
      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">New leads</p>
        <p class="mt-1 text-3xl font-bold text-[var(--vyoma-deep-navy)]">{{ newLeads }}</p>
        <NuxtLink to="/admin/leads" class="text-xs text-[var(--vyoma-aviation-blue)] mt-2 inline-block">View leads &rarr;</NuxtLink>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Published features</p>
        <p class="mt-1 text-3xl font-bold text-[var(--vyoma-deep-navy)]">{{ publishedFeatures }} / {{ features?.length ?? 0 }}</p>
        <NuxtLink to="/admin/features" class="text-xs text-[var(--vyoma-aviation-blue)] mt-2 inline-block">Edit features &rarr;</NuxtLink>
      </div>
    </div>
  </div>
</template>
