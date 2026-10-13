<script setup lang="ts">
import type { AudienceSegment } from '@vyoma/shared'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const id = route.params.id as string
const adminFetch = useAdminFetch()

const { data: audience } = await useAsyncData(`admin:audience:${id}`, () =>
  adminFetch<AudienceSegment>(`/admin/audiences/${id}`)
)

const form = reactive({
  title: audience.value?.title ?? '',
  heroCopy: audience.value?.heroCopy ?? '',
  painPointsText: (audience.value?.painPoints ?? []).join('\n'),
  published: audience.value?.published ?? true
})

const saving = ref(false)
const saved = ref(false)

async function save() {
  saving.value = true
  saved.value = false
  try {
    await adminFetch(`/admin/audiences/${id}`, {
      method: 'PATCH',
      body: {
        title: form.title,
        heroCopy: form.heroCopy,
        painPoints: form.painPointsText.split('\n').map((s) => s.trim()).filter(Boolean),
        published: form.published
      }
    })
    saved.value = true
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="p-8 max-w-2xl">
    <NuxtLink to="/admin/audiences" class="text-sm text-[var(--vyoma-aviation-blue)]">&larr; Audiences</NuxtLink>
    <h1 class="mt-2 font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)]">Edit audience</h1>

    <form class="mt-6 space-y-4" @submit.prevent="save">
      <UFormField label="Title">
        <UInput v-model="form.title" class="w-full" />
      </UFormField>
      <UFormField label="Hero copy">
        <UTextarea v-model="form.heroCopy" :rows="3" class="w-full" />
      </UFormField>
      <UFormField label="Pain points (one per line)">
        <UTextarea v-model="form.painPointsText" :rows="4" class="w-full" />
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
