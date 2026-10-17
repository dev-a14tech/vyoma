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
      <div class="container-v max-w-[720px] space-y-6 text-[0.95rem] leading-relaxed text-ink">
        <p>
          The information contained on this website is for general information purposes only. While VYOMA endeavors to keep the
          information up to date and correct, we make no representations or warranties of any kind, express or implied, about
          the completeness, accuracy, reliability, suitability, or availability with respect to the website or the
          information, products, services, or related graphics contained on the website for any purpose.
        </p>
        <p>
          Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for
          any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage
          whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
        </p>
        <p>
          Certain visual assets, graphical representations, and photographic media utilized throughout this digital presence
          are strictly for thematic or illustrative conceptualization. The presence of specific liveries, insignias, or
          identifiable commercial entities within such visual contexts is entirely incidental. Such depictions do not intend to
          convey, infer, or constitute any formal affiliation, endorsement, operational engagement, or commercial partnership
          beyond those explicitly stated in our official client disclosures.
        </p>
        <p class="lede">
          If you have any queries please contact us at
          <a href="mailto:info@vyoma.aero" class="font-medium text-ocean hover:underline">info@vyoma.aero</a>, or use our
          <NuxtLink :to="sitePaths.contact" class="font-medium text-ocean hover:underline">contact form</NuxtLink>.
        </p>
      </div>
    </section>
  </div>
</template>
