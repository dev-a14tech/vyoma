<template>
  <section class="py-20 bg-[var(--vyoma-deep-navy)] text-white relative overflow-hidden">
    <div class="motif-yantra-bg absolute inset-0 opacity-[0.08]" aria-hidden="true" style="filter: invert(1)" />
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <span class="text-xs font-semibold tracking-widest uppercase text-[var(--vyoma-sky-blue)]">Built on an open platform</span>
        <h2 class="mt-3 font-heading text-3xl font-bold">A fully documented API, not a black box</h2>
        <p class="mt-4 text-slate-300">
          Every workflow in VYOMA is backed by a REST API with full Swagger documentation &mdash; so your
          systems, your BI tools, and your integrations can read and write the same data your team
          works in every day.
        </p>
        <ul class="mt-6 space-y-3 text-sm text-slate-300">
          <li class="flex items-center gap-2"><UIcon name="i-lucide-check" class="w-4 h-4 text-[var(--vyoma-sky-blue)]" />Hundreds of documented REST endpoints</li>
          <li class="flex items-center gap-2"><UIcon name="i-lucide-check" class="w-4 h-4 text-[var(--vyoma-sky-blue)]" />True multi-tenant data isolation per organisation</li>
          <li class="flex items-center gap-2"><UIcon name="i-lucide-check" class="w-4 h-4 text-[var(--vyoma-sky-blue)]" />Granular, permission-based role access control</li>
        </ul>
      </div>
      <div class="rounded-xl bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl">
        <div class="flex items-center gap-1.5 px-4 py-3 border-b border-slate-700">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
          <span class="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          <span class="ml-3 text-xs text-slate-400 font-mono">POST /api/content/features</span>
        </div>
        <pre class="p-4 text-xs text-emerald-300 font-mono leading-relaxed overflow-x-auto"><code>GET /api/aircraft/:id/compliance-summary

{
  "tailNumber": "VY-204",
  "status": "DUE_SOON",
  "openItems": [
    { "type": "AD", "ref": "2026-04-11" },
    { "type": "MEL", "ref": "25-1", "expiresIn": "6d" }
  ],
  "lastAudited": "2026-10-02T09:14:00Z"
}</code></pre>
      </div>
    </div>
  </section>
</template>
