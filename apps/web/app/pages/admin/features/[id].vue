<script setup lang="ts">
import type { FeatureTheme } from '@vyoma/shared'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const id = route.params.id as string
const adminFetch = useAdminFetch()

const { data: feature } = await useAsyncData(`admin:feature:${id}`, () =>
  adminFetch<FeatureTheme>(`/admin/features/${id}`)
, { server: false })

const form = reactive({
  title: feature.value?.title ?? '',
  summary: feature.value?.summary ?? '',
  icon: feature.value?.icon ?? '',
  bodyMarkdown: feature.value?.bodyMarkdown ?? '',
  videoUrl: feature.value?.videoUrl ?? '',
  capabilitiesText: (feature.value?.capabilities ?? []).join('\n'),
  published: feature.value?.published ?? true
})

const saving = ref(false)
const saved = ref(false)

async function save() {
  saving.value = true
  saved.value = false
  try {
    await adminFetch(`/admin/features/${id}`, {
      method: 'PATCH',
      body: {
        title: form.title,
        summary: form.summary,
        icon: form.icon,
        bodyMarkdown: form.bodyMarkdown,
        videoUrl: form.videoUrl || null,
        capabilities: form.capabilitiesText.split('\n').map((s) => s.trim()).filter(Boolean),
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
    <NuxtLink to="/admin/features" class="text-sm text-[var(--vyoma-aviation-blue)]">&larr; Features</NuxtLink>
    <h1 class="mt-2 font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)]">Edit feature</h1>

    <form class="mt-6 space-y-4" @submit.prevent="save">
      <UFormField label="Title">
        <UInput v-model="form.title" class="w-full" />
      </UFormField>
      <UFormField label="Summary">
        <UTextarea v-model="form.summary" :rows="2" class="w-full" />
      </UFormField>
      <UFormField label="Icon (lucide name)">
        <UInput v-model="form.icon" class="w-full" />
      </UFormField>
      <UFormField label="Body">
        <UTextarea v-model="form.bodyMarkdown" :rows="5" class="w-full" />
      </UFormField>
      <UFormField label="Capabilities (one per line)">
        <UTextarea v-model="form.capabilitiesText" :rows="4" class="w-full" />
      </UFormField>
      <UFormField label="Video URL" help="Leave blank to show the placeholder preview on the public site.">
        <UInput v-model="form.videoUrl" placeholder="https://..." class="w-full" />
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
