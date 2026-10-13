<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const adminFetch = useAdminFetch()

const form = reactive({
  quote: '',
  authorName: '',
  authorRole: '',
  orgName: ''
})

const saving = ref(false)

async function save() {
  saving.value = true
  try {
    await adminFetch('/admin/testimonials', { method: 'POST', body: form })
    await navigateTo('/admin/testimonials')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="p-8 max-w-2xl">
    <NuxtLink to="/admin/testimonials" class="text-sm text-[var(--vyoma-aviation-blue)]">&larr; Testimonials</NuxtLink>
    <h1 class="mt-2 font-heading text-2xl font-bold text-[var(--vyoma-deep-navy)]">Add testimonial</h1>

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
      <UButton type="submit" color="primary" class="font-semibold" :loading="saving">Save testimonial</UButton>
    </form>
  </div>
</template>
