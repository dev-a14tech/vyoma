<template>
  <div class="flex flex-col min-h-screen">
    <LayoutSiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutSiteFooter />
  </div>
</template>
