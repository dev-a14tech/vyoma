<template>
  <div>
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
      Skip to content
    </a>
    <LandingHeader />
    <main id="main">
      <slot />
    </main>
    <LandingFooter />
    <LandingChatWidget />
  </div>
</template>
