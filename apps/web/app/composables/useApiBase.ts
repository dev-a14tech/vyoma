// Picks the right API base per request context:
// - server (SSR): prefer the Vercel service binding's internal URL when present
//   (skips the public edge entirely for server-to-server calls)
// - client (browser) or local dev with no binding: fall back to the public base
export function useApiBase() {
  const config = useRuntimeConfig()
  if (import.meta.server && config.apiInternalBase) {
    return config.apiInternalBase
  }
  return config.public.apiBase
}
