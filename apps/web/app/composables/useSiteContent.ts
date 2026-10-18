import type {
  AudienceSegment,
  FeatureTheme,
  PageContent,
  Testimonial
} from '@vyoma/shared'

function apiFetch<T>(path: string) {
  const base = useApiBase()
  // lazy: true - don't block page navigation on this fetch. The API's Mongo connection is
  // lazy too (see apps/api/src/app.module.ts) and can take several seconds to (re)establish
  // after a cold start, which would otherwise stall the route change. Pages that call this
  // already render real fallback content, so the CMS override just fills in once it arrives.
  // Cast: with a server/ dir present Nitro types $fetch against its own routes, but this
  // call goes to the separate CMS API whose response type is T.
  return useAsyncData<T>(`content:${path}`, () => $fetch(`${base}${path}`) as Promise<T>, { lazy: true })
}

export function useFeatures() {
  return apiFetch<FeatureTheme[]>('/content/features')
}

export function useFeature(slug: string) {
  return apiFetch<FeatureTheme>(`/content/features/${slug}`)
}

export function useAudiences() {
  return apiFetch<AudienceSegment[]>('/content/audiences')
}

export function useAudience(slug: string) {
  return apiFetch<AudienceSegment>(`/content/audiences/${slug}`)
}

export function usePageContent(slug: string) {
  return apiFetch<PageContent>(`/content/pages/${slug}`)
}

export function useTestimonials() {
  return apiFetch<Testimonial[]>('/content/testimonials')
}
