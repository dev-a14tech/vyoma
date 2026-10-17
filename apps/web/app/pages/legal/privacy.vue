<script setup lang="ts">
import { sitePaths } from '~/data/solutions'

usePageSeo({
  title: 'Privacy Policy',
  description: 'How VYOMA collects, uses and protects personal information shared through this website and the platform.'
})
</script>

<template>
  <div>
    <SectionsHeroSection
      :breadcrumbs="[{ label: 'Home', to: sitePaths.home }, { label: 'Legal' }, { label: 'Privacy Policy' }]"
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="How VYOMA collects, uses and protects personal information shared through this website and the platform."
      hide-actions
    />

    <section class="section bg-white">
      <div class="container-v max-w-[720px] space-y-6 text-[0.95rem] leading-relaxed text-ink">
        <p>
          VYOMA is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website.
        </p>
        <p>
          We may collect personal identification information from users in a variety of ways, including, but not limited to,
          when users visit our site, fill out a form, and in connection with other activities, services, features or resources
          we make available on our site. Users may be asked for, as appropriate, name, email address and phone number. We will
          collect personal identification information from users only if they voluntarily submit such information to us.
        </p>
        <p class="lede">
          For questions about this policy, please contact us at
          <a href="mailto:info@avajet.in" class="font-medium text-ocean hover:underline">info@avajet.in</a>, or use our
          <NuxtLink :to="sitePaths.contact" class="font-medium text-ocean hover:underline">contact form</NuxtLink>.
        </p>
      </div>
    </section>
  </div>
</template>
