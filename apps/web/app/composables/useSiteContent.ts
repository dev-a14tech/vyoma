import type {
  AudienceSegment,
  FeatureTheme,
  PageContent,
  Testimonial
} from '@vyoma/shared'

function apiFetch<T>(path: string) {
  const base = useApiBase()
  // Cast: with a server/ dir present Nitro types $fetch against its own routes, but this
  // call goes to the separate CMS API whose response type is T.
  return useAsyncData<T>(`content:${path}`, () => $fetch(`${base}${path}`) as Promise<T>)
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
