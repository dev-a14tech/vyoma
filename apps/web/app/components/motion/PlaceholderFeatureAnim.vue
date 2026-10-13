<script setup lang="ts">
const props = defineProps<{
  motif: string
  themeSlug: string
}>()

const fleetRows = [
  { tail: 'VY-101', status: 'Airworthy', color: 'bg-emerald-500' },
  { tail: 'VY-204', status: 'Due Soon', color: 'bg-amber-500' },
  { tail: 'VY-318', status: 'Airworthy', color: 'bg-emerald-500' }
]

const complianceRows = [
  { item: 'AD 2026-04-11', status: 'Open', tone: 'bg-amber-100 text-amber-700' },
  { item: 'SB 737-57-1182', status: 'Closed', tone: 'bg-emerald-100 text-emerald-700' },
  { item: 'MEL 25-1 Ext.', status: 'Monitor', tone: 'bg-sky-100 text-sky-700' }
]

const workOrders = ['WO-4471 · Scheduled', 'WO-4472 · In Progress', 'WO-4473 · Awaiting Parts']

const inventoryBars = [72, 45, 88, 30]

const scheduleSlots = [
  { time: '08:00', label: 'VY-101 · DXB-BOM' },
  { time: '11:30', label: 'VY-204 · BOM-DEL' },
  { time: '15:00', label: 'VY-318 · DEL-HYD' }
]

const crewRows = ['Capt. A. Sharma', 'F/O R. Mehta', 'Capt. S. Rao']

const chartBars = [40, 65, 52, 80, 60, 90]
</script>

<template>
  <div class="relative rounded-xl border border-[var(--vyoma-cloud)] bg-white shadow-sm overflow-hidden h-full min-h-[220px]">
    <div class="motif-yantra-bg absolute inset-0 opacity-50" aria-hidden="true" />
    <div class="relative p-4 h-full flex flex-col">
      <div class="flex items-center gap-1.5 mb-3">
        <span class="w-2.5 h-2.5 rounded-full bg-rose-300" />
        <span class="w-2.5 h-2.5 rounded-full bg-amber-300" />
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-300" />
      </div>

      <template v-if="themeSlug === 'fleet-aircraft-management'">
        <div class="space-y-2">
          <div v-for="row in fleetRows" :key="row.tail" class="flex items-center justify-between text-xs bg-slate-50 rounded-lg px-3 py-2">
            <span class="font-medium text-[var(--vyoma-deep-navy)]">{{ row.tail }}</span>
            <span class="flex items-center gap-1.5 text-slate-500"><span class="w-1.5 h-1.5 rounded-full" :class="row.color" />{{ row.status }}</span>
          </div>
        </div>
      </template>

      <template v-else-if="themeSlug === 'airworthiness-compliance'">
        <div class="space-y-2">
          <div v-for="row in complianceRows" :key="row.item" class="flex items-center justify-between text-xs bg-slate-50 rounded-lg px-3 py-2">
            <span class="text-[var(--vyoma-deep-navy)]">{{ row.item }}</span>
            <span class="px-2 py-0.5 rounded-full font-medium" :class="row.tone">{{ row.status }}</span>
          </div>
        </div>
      </template>

      <template v-else-if="themeSlug === 'maintenance-engineering'">
        <div class="space-y-2">
          <div v-for="wo in workOrders" :key="wo" class="flex items-center gap-2 text-xs bg-slate-50 rounded-lg px-3 py-2 text-[var(--vyoma-deep-navy)]">
            <UIcon name="i-lucide-wrench" class="w-3.5 h-3.5 text-[var(--vyoma-aviation-blue)]" />
            {{ wo }}
          </div>
        </div>
      </template>

      <template v-else-if="themeSlug === 'parts-supply-chain'">
        <div class="flex items-end gap-3 h-28 px-2">
          <div v-for="(bar, i) in inventoryBars" :key="i" class="flex-1 bg-gradient-to-t from-[var(--vyoma-aviation-blue)] to-[var(--vyoma-sky-blue)] rounded-t-md" :style="{ height: `${bar}%` }" />
        </div>
      </template>

      <template v-else-if="themeSlug === 'flight-operations'">
        <div class="space-y-2">
          <div v-for="slot in scheduleSlots" :key="slot.time" class="flex items-center gap-3 text-xs bg-slate-50 rounded-lg px-3 py-2">
            <span class="font-mono text-slate-400">{{ slot.time }}</span>
            <span class="text-[var(--vyoma-deep-navy)]">{{ slot.label }}</span>
          </div>
        </div>
      </template>

      <template v-else-if="themeSlug === 'crew-training'">
        <div class="space-y-2">
          <div v-for="c in crewRows" :key="c" class="flex items-center gap-2 text-xs bg-slate-50 rounded-lg px-3 py-2">
            <span class="w-5 h-5 rounded-full bg-[var(--vyoma-sky-blue)]/30 flex items-center justify-center text-[10px] font-semibold text-[var(--vyoma-aviation-blue)]">{{ c.charAt(0) }}</span>
            <span class="text-[var(--vyoma-deep-navy)]">{{ c }}</span>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="flex items-end gap-2 h-28 px-2">
          <div v-for="(bar, i) in chartBars" :key="i" class="flex-1 bg-gradient-to-t from-[var(--vyoma-deep-navy)] to-[var(--vyoma-sky-blue)] rounded-t-md" :style="{ height: `${bar}%` }" />
        </div>
      </template>

      <div class="mt-auto pt-3 text-[10px] uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
        <UIcon name="i-lucide-play-circle" class="w-3 h-3" />
        Preview &middot; feature video coming soon
      </div>
    </div>
  </div>
</template>
