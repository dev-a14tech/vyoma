<script setup lang="ts">
import { sitePaths } from '~/data/solutions'

usePageSeo({
  title: 'Disclaimer',
  description: 'Important information about the content of this website.'
})
</script>

<template>
  <div>
    <SectionsHeroSection
      :breadcrumbs="[{ label: 'Home', to: sitePaths.home }, { label: 'Legal' }, { label: 'Disclaimer' }]"
      eyebrow="Legal"
      title="Disclaimer"
      subtitle="Important information about the content of this website."
      hide-actions
    />

    <section class="section bg-white">
      <div class="container-v max-w-[720px]">
        <div v-reveal class="flex items-start gap-3 rounded-v border border-line bg-ice px-5 py-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="mt-0.5 shrink-0 text-ocean">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
          </svg>
          <p class="text-[0.92rem] leading-relaxed text-ink">
            Placeholder content, pending legal review before launch. The final wording will be published before public launch.
          </p>
        </div>
        <p class="lede mt-8">
          VYOMA is a product of AVAJET Aviation Consultants LLP.
          For questions in the meantime, please use our
          <NuxtLink :to="sitePaths.contact" class="font-medium text-ocean hover:underline">contact form</NuxtLink>.
        </p>
      </div>
    </section>
  </div>
</template>
