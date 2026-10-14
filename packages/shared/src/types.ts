// Shared content shapes used by both the Nuxt admin forms and the public-site renderer.
// Kept hand-written (not Prisma-generated) so the `web` app has no build-time dependency on `api`'s Prisma client.

export type PlaceholderMotif = 'yantra-grid' | 'orbit-bands' | 'flight-chevron' | 'rosette-ring'

export interface FeatureTheme {
  id: string
  slug: string
  order: number
  title: string
  summary: string
  icon: string
  bodyMarkdown: string
  videoUrl: string | null
  placeholderMotif: PlaceholderMotif
  capabilities: string[]
  published: boolean
  updatedAt: string
}

export interface AudienceSegment {
  id: string
  slug: string
  title: string
  heroCopy: string
  painPoints: string[]
  relevantFeatureSlugs: string[]
  published: boolean
}

export interface Testimonial {
  id: string
  quote: string
  authorName: string
  authorRole: string
  orgName: string
  logoUrl: string | null
  published: boolean
  order: number
}

export interface PageContentBlock {
  type: string
  data: Record<string, unknown>
}

export interface PageContent {
  id: string
  slug: string
  heroTitle: string
  heroSubtitle: string
  seoTitle: string
  seoDescription: string
  ogImageUrl: string | null
  blocks: PageContentBlock[]
}

export type LeadType = 'DEMO_REQUEST' | 'CONTACT'
export type LeadStatus = 'NEW' | 'CONTACTED' | 'CLOSED'

export interface LeadSubmission {
  id: string
  type: LeadType
  name: string
  email: string
  company: string | null
  role: string | null
  orgType: string | null
  timing: string | null
  topic: string | null
  message: string | null
  source: string
  status: LeadStatus
  createdAt: string
}

export interface LeadSubmissionInput {
  type: LeadType
  name: string
  email: string
  company?: string
  role?: string
  orgType?: string
  timing?: string
  topic?: string
  message?: string
  source?: string
}

export interface SiteSetting {
  key: string
  value: unknown
}

export interface AdminProfile {
  id: string
  email: string
  name: string
}
