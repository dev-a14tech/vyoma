<script setup lang="ts">
const profile = useAdminProfile()
const checked = useAdminAuthChecked()

async function handleLogout() {
  await adminLogout()
  await navigateTo('/admin/login')
}

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: 'i-lucide-layout-dashboard' },
  { label: 'Features', to: '/admin/features', icon: 'i-lucide-layers' },
  { label: 'Audiences', to: '/admin/audiences', icon: 'i-lucide-users' },
  { label: 'Pages', to: '/admin/pages', icon: 'i-lucide-file-text' },
  { label: 'Testimonials', to: '/admin/testimonials', icon: 'i-lucide-quote' },
  { label: 'Leads', to: '/admin/leads', icon: 'i-lucide-inbox' }
]
</script>

<template>
  <!-- Nothing here renders until the client-side auth check resolves (see
       admin-auth.global.ts): the api lives cross-domain in production, so SSR can
       never confirm auth, and showing the real dashboard before that check finishes
       would flash real admin content at a visitor who turns out not to be logged in. -->
  <div v-if="!checked" class="min-h-screen grid place-items-center bg-slate-50">
    <div class="flex items-center gap-2.5 text-sm text-slate-400">
      <UIcon name="i-lucide-loader-2" class="w-4 h-4 animate-spin" />
      Checking session…
    </div>
  </div>
  <div v-else class="min-h-screen flex bg-slate-50">
    <aside class="w-60 shrink-0 border-r border-slate-200 bg-white flex flex-col">
      <div class="h-16 flex items-center px-5 border-b border-slate-200">
        <BrandVyomaWordmark :height="22" />
      </div>
      <nav class="flex-1 px-3 py-4 space-y-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          active-class="bg-brand-50 text-brand-700"
        >
          <UIcon :name="item.icon" class="w-4 h-4" />
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="p-3 border-t border-slate-200">
        <p class="px-3 text-xs text-slate-500 truncate">{{ profile?.email }}</p>
        <UButton variant="ghost" color="neutral" size="sm" block class="mt-1 justify-start" icon="i-lucide-log-out" @click="handleLogout">
          Log out
        </UButton>
      </div>
    </aside>
    <main class="flex-1 min-w-0">
      <slot />
    </main>
  </div>
</template>
