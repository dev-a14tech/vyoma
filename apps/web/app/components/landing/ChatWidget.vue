<script setup lang="ts">
// Floating assistant, bottom left. Questions go to our own API (/api/chat), which calls
// Gemini with a server-side key: nothing secret is ever in the browser.
interface Msg {
  role: 'user' | 'assistant'
  content: string
}

const STORAGE_KEY = 'vyoma-chat'
const SUGGESTIONS = [
  'What is CAMO software?',
  'Which module is for flying training schools?',
  'Do you cover logistics?',
  'How do I book a demo?'
]

const base = useApiBase()
const enabled = ref(false)
const open = ref(false)
const messages = ref<Msg[]>([])
const input = ref('')
const sending = ref(false)
const error = ref<string | null>(null)
const listEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLTextAreaElement | null>(null)

function save() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value.slice(-30)))
  } catch { /* storage unavailable (private mode): the chat still works, it just is not remembered */ }
}

function scrollToEnd() {
  nextTick(() => {
    if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
  })
}

async function send(text: string) {
  const content = text.trim()
  if (!content || sending.value) return
  error.value = null
  messages.value.push({ role: 'user', content })
  input.value = ''
  sending.value = true
  save()
  scrollToEnd()
  try {
    const res = await $fetch<{ reply: string }>(`${base}/chat`, {
      method: 'POST',
      body: { messages: messages.value.slice(-12) }
    })
    messages.value.push({ role: 'assistant', content: res.reply })
    save()
  } catch (e) {
    const status = (e as { statusCode?: number; status?: number }).statusCode ?? (e as { status?: number }).status
    error.value = status === 429
      ? 'You are sending messages quickly. Please wait a moment and try again.'
      : 'Sorry, I could not answer just now. Please try again, or use Ask More on this page.'
  } finally {
    sending.value = false
    scrollToEnd()
  }
}

function retry() {
  const lastUser = [...messages.value].reverse().find(m => m.role === 'user')
  if (!lastUser) return
  // Drop the unanswered question and ask it again.
  const idx = messages.value.lastIndexOf(lastUser)
  messages.value.splice(idx)
  send(lastUser.content)
}

function toggle() {
  open.value = !open.value
  if (open.value) {
    scrollToEnd()
    nextTick(() => inputEl.value?.focus())
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) open.value = false
}

function clearChat() {
  messages.value = []
  error.value = null
  save()
}

// Render assistant text without v-html: **bold**, bullet lines and our own page paths.
type Token = { type: 'text' | 'bold' | 'link'; text: string; href?: string }
const LINK = /(\/solutions(?:\/[a-z0-9-]+){0,2}|\/#demo(?:-ask)?)/g

function inline(line: string): Token[] {
  const out: Token[] = []
  line.split('**').forEach((part, i) => {
    if (!part) return
    const type = i % 2 === 1 ? 'bold' : 'text'
    let last = 0
    for (const m of part.matchAll(LINK)) {
      if (m.index! > last) out.push({ type, text: part.slice(last, m.index) })
      out.push({ type: 'link', text: m[0], href: m[0] })
      last = m.index! + m[0].length
    }
    if (last < part.length) out.push({ type, text: part.slice(last) })
  })
  return out
}

function lines(content: string) {
  return content.split('\n').filter(l => l.trim()).map((l) => {
    const bullet = /^\s*[*-]\s+/.test(l)
    return { bullet, tokens: inline(l.replace(/^\s*[*-]\s+/, '')) }
  })
}

onMounted(async () => {
  document.addEventListener('keydown', onKey)
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) messages.value = JSON.parse(saved)
  } catch { /* ignore a corrupt or unavailable store */ }
  try {
    const status = await $fetch<{ enabled: boolean }>(`${base}/chat/status`)
    enabled.value = status.enabled
  } catch {
    enabled.value = false // API unreachable: no button rather than one that cannot work
  }
})
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <div v-if="enabled" class="fixed bottom-4 left-4 z-[55] sm:bottom-6 sm:left-6">
    <div
      v-if="open"
      id="vyoma-chat"
      role="dialog"
      aria-label="VYOMA assistant"
      class="mb-3 flex h-[min(540px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_30px_80px_-30px_rgba(20,55,88,0.55)]"
    >
      <header class="flex items-center justify-between gap-3 bg-navy px-5 py-4 text-white">
        <div class="flex items-center gap-3">
          <span class="grid h-9 w-9 place-items-center rounded-full bg-white">
            <img src="/images/brand/vyoma-logomark.png" alt="" width="22" height="18" class="w-[22px]" draggable="false">
          </span>
          <div class="leading-tight">
            <p class="text-[0.95rem] font-semibold">VYOMA Assistant</p>
            <p class="text-[0.74rem] text-[#a9bdd0]">Ask about our platform</p>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <button v-if="messages.length" type="button" class="rounded-full px-2.5 py-1 text-[0.74rem] text-[#a9bdd0] hover:bg-white/10 hover:text-white" @click="clearChat">New chat</button>
          <button type="button" class="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10" aria-label="Close chat" @click="open = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>
      </header>

      <div ref="listEl" class="flex-1 space-y-3 overflow-y-auto bg-ice px-4 py-4" aria-live="polite">
        <div class="max-w-[88%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[0.9rem] leading-relaxed text-ink shadow-sm">
          Hi! I can tell you about VYOMA's management, maintenance, operations and logistics modules. What would you like to know?
        </div>

        <div v-if="!messages.length" class="flex flex-wrap gap-2 pt-1">
          <button
            v-for="s in SUGGESTIONS"
            :key="s"
            type="button"
            class="rounded-full border border-line bg-white px-3.5 py-2 text-left text-[0.82rem] text-navy hover:border-ocean"
            @click="send(s)"
          >
            {{ s }}
          </button>
        </div>

        <template v-for="(m, i) in messages" :key="i">
          <div v-if="m.role === 'user'" class="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-navy px-4 py-3 text-[0.9rem] leading-relaxed text-white">
            {{ m.content }}
          </div>
          <div v-else class="max-w-[88%] space-y-2 rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[0.9rem] leading-relaxed text-ink shadow-sm">
            <template v-for="(l, j) in lines(m.content)" :key="j">
              <p v-if="!l.bullet">
                <template v-for="(t, k) in l.tokens" :key="k">
                  <a v-if="t.type === 'link'" :href="t.href" class="font-medium text-ocean underline">{{ t.text }}</a>
                  <strong v-else-if="t.type === 'bold'">{{ t.text }}</strong>
                  <template v-else>{{ t.text }}</template>
                </template>
              </p>
              <p v-else class="flex gap-2">
                <span class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden="true" />
                <span>
                  <template v-for="(t, k) in l.tokens" :key="k">
                    <a v-if="t.type === 'link'" :href="t.href" class="font-medium text-ocean underline">{{ t.text }}</a>
                    <strong v-else-if="t.type === 'bold'">{{ t.text }}</strong>
                    <template v-else>{{ t.text }}</template>
                  </template>
                </span>
              </p>
            </template>
          </div>
        </template>

        <div v-if="sending" class="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm" role="status" aria-label="The assistant is typing">
          <span class="h-2 w-2 animate-pulse rounded-full bg-sky" />
          <span class="h-2 w-2 animate-pulse rounded-full bg-sky [animation-delay:150ms]" />
          <span class="h-2 w-2 animate-pulse rounded-full bg-sky [animation-delay:300ms]" />
        </div>

        <div v-if="error" class="rounded-2xl border border-[#f0c9c4] bg-[#fdf1ef] px-4 py-3 text-[0.84rem] text-[#8a2b22]" role="alert">
          {{ error }}
          <button type="button" class="ml-1 font-medium underline" @click="retry">Try again</button>
        </div>
      </div>

      <form class="border-t border-line bg-white p-3" @submit.prevent="send(input)">
        <div class="flex items-end gap-2">
          <label for="vyoma-chat-input" class="sr-only">Your question</label>
          <textarea
            id="vyoma-chat-input"
            ref="inputEl"
            v-model="input"
            rows="1"
            maxlength="1000"
            placeholder="Type your question…"
            class="max-h-28 min-h-[44px] flex-1 resize-none rounded-xl border border-line bg-ice px-3.5 py-2.5 text-[0.9rem] text-ink outline-none focus:border-ocean"
            @keydown.enter.exact.prevent="send(input)"
          />
          <button
            type="submit"
            :disabled="sending || !input.trim()"
            class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-white transition-opacity disabled:opacity-40"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </button>
        </div>
        <p class="mt-2 px-1 text-[0.7rem] leading-snug text-muted">AI answers can be wrong. For specifics, <a href="/#demo-ask" class="underline">ask the team</a> or <a href="/#demo" class="underline">book a demo</a>.</p>
      </form>
    </div>

    <button
      type="button"
      class="flex h-14 items-center gap-2.5 rounded-full bg-navy pl-4 pr-5 text-[0.92rem] font-medium text-white shadow-[0_18px_40px_-18px_rgba(20,55,88,0.7)] transition-transform hover:-translate-y-0.5"
      :aria-expanded="open"
      aria-controls="vyoma-chat"
      @click="toggle"
    >
      <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6" /></svg>
      <span class="hidden sm:inline">{{ open ? 'Close' : 'Ask VYOMA' }}</span>
    </button>
  </div>
</template>
