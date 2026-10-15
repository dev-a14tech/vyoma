// Single source of truth for VYOMA's solution areas. Drives the header Solutions
// dropdown (desktop + mobile), the footer Solutions column and the homepage
// "Built for the People" tabs. Order here is the order shown everywhere.

export type SolutionIconId = 'management' | 'maintenance' | 'operations' | 'airlines' | 'flying-training' | 'non-scheduled' | 'logistics'

interface SolutionBase {
  id: string
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
    label: 'Management',
    icon: 'management',
    headline: 'Your entire airworthiness picture, in one place.',
    description: 'Continuing airworthiness management (CAMO) software that keeps records, compliance and planning in sync across the fleet.',
    bullets: ['Centralised technical records', 'AD/SB and compliance tracking', 'Audit-ready at any time']
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    icon: 'maintenance',
    headline: 'Maintenance that never slips through the cracks.',
    description: 'Aircraft maintenance tracking software for planning tasks, tracking components and closing work on time.',
    bullets: ['Task and inspection due tracking', 'Component and LLP life tracking', 'Work package and defect history']
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: 'operations',
    children: [
      {
        id: 'airlines',
        label: 'Airlines',
        icon: 'airlines',
        headline: 'Keep scheduled fleets flying on time.',
        description: 'Airline maintenance and operations software that connects technical status to daily flying.',
        bullets: ['Fleet-wide aircraft status', 'Utilisation and hours/cycles tracking', 'Fewer AOG surprises']
      },
      {
        id: 'flying-training',
        label: 'Flying Training Schools',
        icon: 'flying-training',
        headline: 'Built for high-utilisation training fleets.',
        description: 'Flying training school software that tracks every trainer aircraft\'s hours, inspections and airworthiness.',
        bullets: ['Hours-based inspection alerts', 'Simple records for small teams', 'DGCA-ready documentation']
      },
      {
        id: 'non-scheduled',
        label: 'Non-Scheduled / Private Jet Operators',
        shortLabel: 'Non-Scheduled & Private Jet',
        icon: 'non-scheduled',
        headline: 'Airworthiness without the overhead.',
        description: 'Maintenance and compliance software for charter, NSOP and private jet operators.',
        bullets: ['Per-aircraft compliance view', 'Owner and operator reporting', 'Ready for inspections']
      }
    ]
  },
  {
    id: 'logistics',
    label: 'Logistics',
    icon: 'logistics',
    headline: 'The right part, at the right place, on time.',
    description: 'Aviation spares and inventory management linked directly to maintenance demand.',
    bullets: ['Spares and stock tracking', 'Certificates and traceability', 'Requisitions tied to tasks']
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

export const solutionHref = (id: string) => `/#solutions-${id}`

// Selectable leaves (solutions with content panels), in display order.
export const solutionLeaves: readonly SolutionLeaf[] = solutions.flatMap(s => s.children ?? [s])

// Maps any solution or legacy id to the leaf that should be shown.
export function resolveSolutionId(id: string): string | undefined {
  const target = legacySolutionIds[id] ?? id
  const match = solutions.find(s => s.id === target) ?? solutionLeaves.find(s => s.id === target)
  if (!match) return undefined
  return match.children ? match.children[0].id : match.id
}
