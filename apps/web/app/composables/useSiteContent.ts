import type {
  AudienceSegment,
  FeatureTheme,
  PageContent,
  Testimonial
} from '@vyoma/shared'

function apiFetch<T>(path: string) {
  const config = useRuntimeConfig()
  return useAsyncData<T>(`content:${path}`, () => $fetch<T>(`${config.public.apiBase}${path}`))
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
