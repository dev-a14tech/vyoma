<script setup lang="ts">
import type { NavGroup } from '~/types/nav'

defineProps<{ nav: NavGroup[] }>()
const emit = defineEmits<{ close: [] }>()

const section = ref<string | null>('Platform')
</script>

<template>
  <div id="mobile-nav" class="nav-panel fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-line bg-white lg:hidden">
    <nav aria-label="Mobile" class="container-v pb-10 pt-4">
      <ul class="divide-y divide-line">
        <li v-for="group in nav" :key="group.label">
          <button
            type="button"
            class="flex w-full items-center justify-between py-4 text-left text-[1.05rem] font-medium text-navy"
            :aria-expanded="section === group.label"
            @click="section = section === group.label ? null : group.label"
          >
            {{ group.label }}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="transition-transform" :class="section === group.label ? 'rotate-180' : ''">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div class="acc-body" :data-open="section === group.label">
            <div>
              <ul class="pb-3">
                <li v-for="item in group.items" :key="item.label">
                  <a :href="item.href" class="flex min-h-11 items-center rounded-lg px-3 text-[0.95rem] text-muted hover:bg-ice hover:text-navy" @click="emit('close')">
                    {{ item.label }}
                  </a>
                  <ul v-if="item.children">
                    <li v-for="child in item.children" :key="child.label">
                      <a :href="child.href" class="flex min-h-11 items-center rounded-lg pl-7 pr-3 text-[0.9rem] text-muted hover:bg-ice hover:text-navy" @click="emit('close')">
                        {{ child.label }}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <a href="/#demo" class="btn btn-primary mt-6 w-full" @click="emit('close')">
        Book a Demo
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="btn-arrow">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </a>
      <a href="/#demo-ask" class="btn btn-ghost mt-3 w-full" @click="emit('close')">Ask More</a>
    </nav>
  </div>
</template>
