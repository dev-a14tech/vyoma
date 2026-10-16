// Single source of truth for VYOMA's solution areas and the site navigation. Drives the
// header menus (desktop + mobile), the footer columns and the homepage "Built for the
// People" tabs. Order here is the order shown everywhere.

import type { NavLink } from '~/types/nav'

export type SolutionIconId = 'management' | 'maintenance' | 'operations' | 'airlines' | 'flying-training' | 'non-scheduled' | 'logistics'

interface SolutionBase {
  id: string
  // URL segment: /solutions/<slug>, or /solutions/operations/<slug> for the children of Operations
  slug: string
  label: string
  // Used where space is tight (the homepage tab list); falls back to label.
  shortLabel?: string
  // One-line summary under the label in the header Solutions menu.
  menuBlurb: string
  icon: SolutionIconId
}

// A selectable solution with its own content panel.
export interface SolutionLeaf extends SolutionBase {
  headline: string
  description: string
  bullets: readonly [string, string, string]
  children?: undefined
}

// A grouping (Operations) with no panel of its own; selecting it selects its first child.
export interface SolutionGroup extends SolutionBase {
  children: readonly [SolutionLeaf, ...SolutionLeaf[]]
}

export type Solution = SolutionLeaf | SolutionGroup

export const solutions: readonly Solution[] = [
  {
    id: 'management',
    slug: 'management',
    label: 'Asset Management',
    menuBlurb: 'Analytics and compliance oversight',
    icon: 'management',
    headline: 'See the whole operation at a glance.',
    description: 'Management analytics and compliance oversight for the people who answer for the fleet: leadership, accountable managers and quality teams.',
    bullets: ['Fleet-wide, by-aircraft, by-operator and by-owner views', 'Upcoming MPD and AD work with estimated cost', 'Compliance Center and audit trail']
  },
  {
    id: 'maintenance',
    slug: 'maintenance',
    label: 'Maintenance',
    menuBlurb: 'CAMO software for continuing airworthiness',
    icon: 'maintenance',
    headline: 'Maintenance that never slips through the cracks.',
    description: 'CAMO software for continuing airworthiness: technical records, AD and SB compliance, component life and maintenance planning, for in-house CAMO teams and subcontracted CAMOs alike.',
    bullets: ['AD, SB, MPD and AMP tracking', 'Component, engine and LLP life tracking', 'MEL/CDL, tech logs and work orders']
  },
  {
    id: 'operations',
    slug: 'operations',
    label: 'Operations',
    menuBlurb: 'Planning, crew and reporting for how you fly',
    icon: 'operations',
    children: [
      {
        id: 'airlines',
        slug: 'airlines',
        label: 'Airlines',
        menuBlurb: 'Scheduled fleets flying on time',
        icon: 'airlines',
        headline: 'Keep scheduled fleets flying on time.',
        description: 'Airline maintenance and operations software that connects technical status to daily flying.',
        bullets: ['Live ops with roster and discrepancy status', 'Flight schedule, crew allocation and dispatch', 'Utilisation and traffic reports']
      },
      {
        id: 'flying-training',
        slug: 'flying-training-schools',
        label: 'Flying Training Schools',
        menuBlurb: 'Sorties, students and trainer aircraft',
        icon: 'flying-training',
        headline: 'Built for high-utilisation training fleets.',
        description: 'Flying training school software that tracks sorties, students and instructors alongside every trainer aircraft\'s hours and airworthiness.',
        bullets: ['Student roster, instructors and sortie booking', 'Exercise log and student hours', 'Instructor utilisation and training hours reports']
      },
      {
        id: 'non-scheduled',
        slug: 'private-jet-operators',
        label: 'Private Jet / Non-Scheduled Operators',
        shortLabel: 'Private Jet & Non-Scheduled',
        menuBlurb: 'Trips requested, flown and costed',
        icon: 'non-scheduled',
        headline: 'Every trip requested, flown and costed.',
        description: 'Software for private jet and non-scheduled (NSOP) operators: trip requests, permits and costing, with the airworthiness status of every aircraft in view.',
        bullets: ['Trip requests through quote, confirmation and completion', 'Permits and handling tracked per leg', 'Trip costing, margin and utilisation reports']
      }
    ]
  },
  {
    id: 'logistics',
    slug: 'logistics',
    label: 'Logistics',
    menuBlurb: 'Part and vendor masters linked to your fleet',
    icon: 'logistics',
    headline: 'Know every part and every vendor.',
    description: 'Part and vendor master data for aviation logistics, linked to the aircraft and components each part applies to.',
    bullets: ['Part masters with life cycle and applicability', 'Vendor masters with approvals and registrations', 'Parts linked to aircraft and installed components']
  }
]

// Deep links from before the restructure, kept working via the #solutions-<id> hash.
export const legacySolutionIds: Readonly<Record<string, string>> = {
  'camo': 'management',
  'airworthiness': 'management',
  'mro': 'maintenance',
  'control': 'maintenance',
  'maintenance-controllers': 'maintenance',
  'fleet': 'operations'
}

// Landing-page deep link to a solution's tab (the short gist on the home page).
export const solutionHref = (id: string) => `/#solutions-${id}`

// Detail page of a solution: its own page with the full brief.
export function solutionPath(id: string): string {
  for (const s of solutions) {
    if (s.id === id) return `/solutions/${s.slug}`
    const child = s.children?.find(c => c.id === id)
    if (child) return `/solutions/${s.slug}/${child.slug}`
  }
  return '/solutions'
}

export function findSolution(id: string): Solution | undefined {
  return solutions.find(s => s.id === id) ?? solutionLeaves.find(s => s.id === id)
}

// Selectable leaves (solutions with content panels), in display order.
export const solutionLeaves: readonly SolutionLeaf[] = solutions.flatMap(s => s.children ?? [s])

// Maps any solution or legacy id to the leaf that should be shown.
export function resolveSolutionId(id: string): string | undefined {
  const target = legacySolutionIds[id] ?? id
  const match = solutions.find(s => s.id === target) ?? solutionLeaves.find(s => s.id === target)
  if (!match) return undefined
  return match.children ? match.children[0].id : match.id
}

// ---------------------------------------------------------------------------
// Site navigation: the header (desktop + mobile) and the footer read their links here.

export const sitePaths = {
  home: '/',
  platform: '/platform',
  features: '/#features',
  capabilities: '/platform#capabilities',
  security: '/platform#security',
  whyVyoma: '/why-vyoma',
  solutions: '/solutions',
  about: '/about',
  aboutAvajet: '/about#avajet',
  careers: '/careers',
  faq: '/faq',
  contact: '/contact',
  demo: '/request-demo',
  privacy: '/legal/privacy',
  terms: '/legal/terms',
  disclaimer: '/legal/disclaimer',
  sitemap: '/sitemap'
} as const

export const avajetUrl = 'https://www.avajet.in'

// Header Platform menu (mobile shows the same links without descriptions).
export const platformLinks: readonly NavLink[] = [
  { label: 'Platform overview', href: sitePaths.platform, description: 'VYOMA ONE and how everything connects' },
  { label: 'Features', href: sitePaths.features, description: 'Everything airworthiness needs, connected' },
  { label: 'Why VYOMA', href: sitePaths.whyVyoma, description: 'The problems VYOMA solves' },
  { label: 'Security', href: sitePaths.security, description: 'Controlled access and traceable records' }
]

// Header Company menu.
export const companyLinks: readonly NavLink[] = [
  { label: 'About VYOMA', href: sitePaths.about, description: 'Our story, vision and the AVAJet family' },
  { label: 'Careers', href: sitePaths.careers, description: 'Work with the VYOMA team' }
]

// Top-level header links after the three menus.
export const primaryLinks: readonly NavLink[] = [
  { label: 'FAQ', href: sitePaths.faq },
  { label: 'Contact', href: sitePaths.contact }
]

// Header Solutions menu: the modules, then Operations' children by operation type.
export const solutionModuleLinks: readonly NavLink[] = solutions.map(s => ({
  label: s.shortLabel ?? s.label,
  href: solutionPath(s.id),
  description: s.menuBlurb
}))

export const operationTypeLinks: readonly NavLink[] = solutions.flatMap(s => s.children ?? []).map(c => ({
  label: c.shortLabel ?? c.label,
  href: solutionPath(c.id),
  description: c.menuBlurb
}))

export const footerPlatformLinks: readonly NavLink[] = [
  { label: 'Features', href: sitePaths.features },
  { label: 'Platform overview', href: sitePaths.platform },
  { label: 'Capabilities', href: sitePaths.capabilities },
  { label: 'Why VYOMA', href: sitePaths.whyVyoma },
  { label: 'Security', href: sitePaths.security },
  { label: 'All solutions', href: sitePaths.solutions }
]

// Every solution in display order, each Operations child right after Operations.
export const footerSolutionLinks: readonly NavLink[] = solutions.flatMap(s => [s, ...(s.children ?? [])]).map(s => ({
  label: s.shortLabel ?? s.label,
  href: solutionPath(s.id)
}))

export const footerCompanyLinks: readonly NavLink[] = [
  { label: 'About', href: sitePaths.about },
  { label: 'About AVAJet', href: sitePaths.aboutAvajet },
  { label: 'Careers', href: sitePaths.careers },
  { label: 'FAQ', href: sitePaths.faq }
]

export const legalLinks: readonly NavLink[] = [
  { label: 'Privacy', href: sitePaths.privacy },
  { label: 'Terms', href: sitePaths.terms },
  { label: 'Disclaimer', href: sitePaths.disclaimer },
  { label: 'Sitemap', href: sitePaths.sitemap }
]
