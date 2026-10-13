<template>
  <section class="py-20">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="relative overflow-hidden rounded-3xl bg-[var(--vyoma-deep-navy)] text-white px-8 py-14 text-center">
        <BrandOrbitRing :size="480" />
        <div class="relative">
          <h2 class="font-heading text-3xl font-bold">See VYOMA on your own fleet data</h2>
          <p class="mt-3 text-slate-300 max-w-xl mx-auto">
            A focused walkthrough with your aircraft, compliance items, and workflows in mind.
          </p>
          <UButton to="/request-demo" size="xl" color="primary" class="mt-7 font-semibold px-7">
            Book a Demo
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
