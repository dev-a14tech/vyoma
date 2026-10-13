<script setup lang="ts">
definePageMeta({ layout: false })

const route = useRoute()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

async function onSubmit() {
  loading.value = true
  error.value = null
  try {
    await adminLogin(email.value, password.value)
    const redirect = (route.query.redirect as string) || '/admin'
    await navigateTo(redirect)
  } catch {
    error.value = 'Invalid email or password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--vyoma-section-bg-alt)] px-4">
    <div class="w-full max-w-sm bg-white rounded-2xl border border-[var(--vyoma-cloud)] shadow-sm p-7">
      <BrandVyomaWordmark :height="24" />
      <h1 class="mt-5 font-heading text-xl font-bold text-[var(--vyoma-deep-navy)]">Admin sign in</h1>
      <p class="text-sm text-slate-500 mt-1">Content management for the VYOMA website.</p>

      <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
        <UFormField label="Email">
          <UInput v-model="email" type="email" required class="w-full" />
        </UFormField>
        <UFormField label="Password">
          <UInput v-model="password" type="password" required class="w-full" />
        </UFormField>
        <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>
        <UButton type="submit" block color="primary" class="font-semibold" :loading="loading">
          Sign in
        </UButton>
      </form>
    </div>
  </div>
</template>
