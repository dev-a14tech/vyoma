<script setup lang="ts">
import type { PageContent } from '@vyoma/shared'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const slug = route.params.slug as string
const adminFetch = useAdminFetch()

const { data: page } = await useAsyncData(`admin:page:${slug}`, () =>
  adminFetch<PageContent>(`/content/pages/${slug}`).catch(() => null)
)

const form = reactive({
  heroTitle: page.value?.heroTitle ?? '',
  heroSubtitle: page.value?.heroSubtitle ?? '',
  seoTitle: page.value?.seoTitle ?? '',
  seoDescription: page.value?.seoDescription ?? ''
})

const saving = ref(false)
const saved = ref(false)

async function save() {
  saving.value = true
  saved.value = false
  try {
    await adminFetch(`/admin/pages/${slug}`, { method: 'PUT', body: { ...form, blocks: [] } })
    saved.value = true
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="p-8 max-w-2xl">
    <NuxtLink to="/admin/pages" class="text-sm text-[var(--vyoma-aviation-blue)]">&larr; Pages</NuxtLink>
    <h1 class="mt-2 font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)]">Edit page &middot; {{ slug }}</h1>

    <form class="mt-6 space-y-4" @submit.prevent="save">
      <UFormField label="Hero title">
        <UInput v-model="form.heroTitle" class="w-full" />
      </UFormField>
      <UFormField label="Hero subtitle">
        <UTextarea v-model="form.heroSubtitle" :rows="3" class="w-full" />
      </UFormField>
      <UFormField label="SEO title">
        <UInput v-model="form.seoTitle" class="w-full" />
      </UFormField>
      <UFormField label="SEO description">
        <UTextarea v-model="form.seoDescription" :rows="2" class="w-full" />
      </UFormField>
      <div class="flex items-center gap-3 pt-2">
        <UButton type="submit" color="primary" class="font-semibold" :loading="saving">Save changes</UButton>
        <span v-if="saved" class="text-sm text-emerald-600">Saved</span>
      </div>
    </form>
  </div>
</template>
