// Single source of truth for site-wide SEO copy. Keywords are the plain-language terms
// people in aviation actually type ("camo software", "flying training school software"),
// not internal module names.

export const SITE_NAME = 'VYOMA'
export const SITE_TAGLINE = 'CAMO & Aircraft Maintenance Software'

export const DEFAULT_TITLE = 'VYOMA — CAMO Software & Aircraft Maintenance Tracking Platform'

export const DEFAULT_DESCRIPTION =
  'VYOMA is CAMO software and aircraft maintenance tracking software for airlines, flying training schools and private jet operators. Track airworthiness directives, service bulletins, components and fleet compliance in one place.'

export const SOCIAL_IMAGE = '/images/brand/vyoma-logo-full.png'

// Site-wide keyword set (also the fallback for pages without their own).
export const SITE_KEYWORDS = [
  'camo software',
  'continuing airworthiness management software',
  'aircraft maintenance software',
  'aircraft maintenance tracking software',
  'aviation maintenance management software',
  'airworthiness directive tracking software',
  'service bulletin tracking software',
  'aircraft records management software',
  'aviation compliance software',
  'fleet management software for aircraft',
  'airline maintenance software',
  'flying training school software',
  'flight school management software',
  'private jet fleet management software',
  'non-scheduled operator software',
  'MEL CDL management software',
  'component life tracking software',
  'aviation logistics software'
]

export const PAGE_KEYWORDS: Record<string, string[]> = {
  home: SITE_KEYWORDS,
  platform: [
    'aircraft maintenance software platform',
    'camo software',
    'aircraft fleet management software',
    'maintenance planning software for aircraft',
    'aircraft technical records software',
    'airworthiness management system',
    'aviation maintenance tracking'
  ],
  features: [
    'aircraft maintenance software features',
    'airworthiness directive tracking',
    'service bulletin tracking',
    'MEL CDL management',
    'aircraft component tracking',
    'maintenance due list software',
    'duplicate inspection tracking'
  ],
  'why-vyoma': [
    'camo software provider',
    'aircraft maintenance software for airlines',
    'secure aviation software',
    'aviation software audit ready',
    'multi-tenant aviation platform'
  ],
  about: ['about VYOMA', 'aviation software company', 'aircraft lifecycle risk management'],
  contact: ['contact VYOMA', 'camo software enquiry', 'aviation software support'],
  'request-demo': [
    'book camo software demo',
    'aircraft maintenance software demo',
    'aviation software demo request',
    'flying training school software demo'
  ],
  solutions: [
    'airline maintenance software',
    'flying training school software',
    'flight school maintenance software',
    'private jet maintenance software',
    'non-scheduled operator software',
    'aviation logistics software',
    'aviation management software'
  ]
}
