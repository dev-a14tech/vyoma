<script setup lang="ts">
import type { Testimonial } from '@vyoma/shared'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const id = route.params.id as string
const adminFetch = useAdminFetch()

const { data: testimonial } = await useAsyncData(`admin:testimonial:${id}`, () =>
  adminFetch<Testimonial>(`/admin/testimonials/${id}`)
, { server: false })

const form = reactive({
  quote: testimonial.value?.quote ?? '',
  authorName: testimonial.value?.authorName ?? '',
  authorRole: testimonial.value?.authorRole ?? '',
  orgName: testimonial.value?.orgName ?? '',
  published: testimonial.value?.published ?? true
})

const saving = ref(false)
const saved = ref(false)

async function save() {
  saving.value = true
  saved.value = false
  try {
    await adminFetch(`/admin/testimonials/${id}`, { method: 'PATCH', body: form })
    saved.value = true
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="p-8 max-w-2xl">
    <NuxtLink to="/admin/testimonials" class="text-sm text-[var(--vyoma-aviation-blue)]">&larr; Testimonials</NuxtLink>
    <h1 class="mt-2 font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)]">Edit testimonial</h1>

    <form class="mt-6 space-y-4" @submit.prevent="save">
      <UFormField label="Quote">
        <UTextarea v-model="form.quote" :rows="3" class="w-full" />
      </UFormField>
      <UFormField label="Author name">
        <UInput v-model="form.authorName" class="w-full" />
      </UFormField>
      <UFormField label="Author role">
        <UInput v-model="form.authorRole" class="w-full" />
      </UFormField>
      <UFormField label="Organisation">
        <UInput v-model="form.orgName" class="w-full" />
      </UFormField>
      <UFormField label="Published">
        <USwitch v-model="form.published" />
      </UFormField>
      <div class="flex items-center gap-3 pt-2">
        <UButton type="submit" color="primary" class="font-semibold" :loading="saving">Save changes</UButton>
        <span v-if="saved" class="text-sm text-emerald-600">Saved</span>
      </div>
    </form>
  </div>
</template>
