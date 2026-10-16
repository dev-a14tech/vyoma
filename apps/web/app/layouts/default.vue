<template>
  <div class="flex flex-col min-h-screen">
    <LandingHeader />
    <!-- The header is fixed, so content starts below it. -->
    <main class="flex-1 pt-(--header-h)">
      <slot />
    </main>
    <LandingFooter />
  </div>
</template>
