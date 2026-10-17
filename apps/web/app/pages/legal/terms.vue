<script setup lang="ts">
import { sitePaths } from '~/data/solutions'

usePageSeo({
  title: 'Terms of Use',
  description: 'The terms that govern use of the VYOMA website and platform.'
})
</script>

<template>
  <div>
    <SectionsHeroSection
      :breadcrumbs="[{ label: 'Home', to: sitePaths.home }, { label: 'Legal' }, { label: 'Terms of Use' }]"
      eyebrow="Legal"
      title="Terms of Use"
      subtitle="The terms that govern use of the VYOMA website and platform."
      hide-actions
    />

    <section class="section bg-white">
      <div class="container-v max-w-[720px] space-y-6 text-[0.95rem] leading-relaxed text-ink">
        <p>
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use VYOMA's website if
          you do not agree to take all of the terms and conditions stated on this page.
        </p>
        <p>
          Unless otherwise stated, VYOMA and/or its licensors own the intellectual property rights for all material on the
          website. All intellectual property rights are reserved. You may access this website for your own personal use
          subject to the restrictions set in these terms and conditions.
        </p>

        <h2 class="pt-4 font-display text-[1.2rem] font-semibold text-navy">Data Sharing</h2>
        <p>
          Any inspection of an aircraft (or its records), or communication in respect thereof, that we have made or may make is
          solely for our benefit to monitor our continuing interest as lessor, owner or servicer of the aircraft. Anything
          contained herein, and in any attachments, pertaining to the aircraft or engines referred to &mdash; including, without
          limitation, statements that may relate to the airworthiness, condition, maintenance, repair, overhaul, modification,
          alteration, or operation of the aircraft, or regarding performance or compliance with the lease agreement pertaining
          to the aircraft &mdash; are intended to be personal communications between the sender and the addressee in connection
          with the administration of the lease agreement, and may not be distributed, quoted or referred to any person or
          entity, or relied upon by any person or entity, for any purpose.
        </p>
        <p>
          The sender is not qualified to express views as to the airworthiness of the aircraft or as to any safety issues or
          regulatory compliance issues relating to the aircraft, and does not assume any duty or responsibility to determine
          whether the aircraft, or any part thereof, is airworthy, safe for operation, compliant with applicable laws, rules,
          regulations, certificates, licenses or airworthiness directives, or properly serviced and maintained.
        </p>
        <p class="lede">
          For questions about these terms, please contact us at
          <a href="mailto:info@avajet.in" class="font-medium text-ocean hover:underline">info@avajet.in</a>, or use our
          <NuxtLink :to="sitePaths.contact" class="font-medium text-ocean hover:underline">contact form</NuxtLink>.
        </p>
      </div>
    </section>
  </div>
</template>
