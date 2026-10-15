// Single source of truth for VYOMA's solution areas. Drives the header Solutions
// dropdown (desktop + mobile), the footer Solutions column and the homepage
// "Built for the People" tabs. Order here is the order shown everywhere.

export type SolutionIconId = 'management' | 'maintenance' | 'operations' | 'airlines' | 'flying-training' | 'non-scheduled' | 'logistics'

interface SolutionBase {
  id: string
  // URL segment: /solutions/<slug>, or /solutions/operations/<slug> for the children of Operations
  slug: string
  label: string
  // Used where space is tight (the homepage tab list); falls back to label.
  shortLabel?: string
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
    label: 'Management',
    icon: 'management',
    headline: 'See the whole operation at a glance.',
    description: 'Management analytics and compliance oversight for the people who answer for the fleet: leadership, accountable managers and quality teams.',
    bullets: ['Fleet-wide, by-aircraft, by-operator and by-owner views', 'Upcoming MPD and AD work with estimated cost', 'Compliance Center and audit trail']
  },
  {
    id: 'maintenance',
    slug: 'maintenance',
    label: 'Maintenance',
    icon: 'maintenance',
    headline: 'Maintenance that never slips through the cracks.',
    description: 'CAMO software for continuing airworthiness: technical records, AD and SB compliance, component life and maintenance planning, for in-house CAMO teams and subcontracted CAMOs alike.',
    bullets: ['AD, SB, MPD and AMP tracking', 'Component, engine and LLP life tracking', 'MEL/CDL, tech logs and work orders']
  },
  {
    id: 'operations',
    slug: 'operations',
    label: 'Operations',
    icon: 'operations',
    children: [
      {
        id: 'airlines',
        slug: 'airlines',
        label: 'Airlines',
        icon: 'airlines',
        headline: 'Keep scheduled fleets flying on time.',
        description: 'Airline maintenance and operations software that connects technical status to daily flying.',
        bullets: ['Live ops with roster and discrepancy status', 'Flight schedule, crew allocation and dispatch', 'Utilisation and traffic reports']
      },
      {
        id: 'flying-training',
        slug: 'flying-training-schools',
        label: 'Flying Training Schools',
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
