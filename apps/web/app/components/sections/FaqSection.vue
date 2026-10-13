<script setup lang="ts">
defineProps<{ items: Array<{ question: string; answer: string }>; title?: string }>()
</script>

<template>
  <section class="py-20">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h2 class="font-heading text-3xl font-bold text-center text-[var(--vyoma-deep-navy)] mb-10">
        {{ title ?? 'Frequently asked questions' }}
      </h2>
      <UAccordion
        :items="items.map((i) => ({ label: i.question, content: i.answer }))"
      />
    </div>
  </section>
</template>
