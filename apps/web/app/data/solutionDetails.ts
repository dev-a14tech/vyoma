// Detail-page content for each solution, written from what the product actually does.
// Keyed by the ids in data/solutions.ts. Nothing here should describe a feature the
// product does not have: check it against the product before adding a line.

export interface SolutionHighlight {
  title: string
  text: string
}

export interface SolutionDetail {
  // Eyebrow and <h1> of the page
  eyebrow: string
  title: string
  intro: string
  highlights: readonly SolutionHighlight[]
  // Who it is written for
  audience: readonly string[]
  // Solution ids this one works with (shown as "Connected modules")
  related: readonly string[]
  // SEO
  seoTitle: string
  seoDescription: string
  keywords: readonly string[]
}

export const solutionDetails: Record<string, SolutionDetail> = {
  management: {
    eyebrow: 'Management',
    title: 'Management analytics and compliance oversight',
    intro:
      'One place for the people who answer for the fleet. See what is coming due, what it is likely to cost, and where compliance stands, without asking each team for a report.',
    highlights: [
      {
        title: 'Fleet-wide and by-owner views',
        text: 'Switch between the whole fleet, a single aircraft, an operator or an owner to see upcoming maintenance from the angle you need.'
      },
      {
        title: 'Upcoming work at a glance',
        text: 'MPD and AD tasks coming due across the fleet, broken down by task type, with a direct link to each aircraft\'s due list.'
      },
      {
        title: 'Estimated cost insight',
        text: 'Compare the estimated cost of upcoming work using your own rates and using MRO actual cost.'
      },
      {
        title: 'Compliance Center',
        text: 'A fleet compliance summary per aircraft: overall status, AD, SB and MEL status, open findings and the date of the last completed audit.'
      },
      {
        title: 'Compliance and audit',
        text: 'Audit findings tracked against an aircraft or the organisation as a whole, so open items do not get lost between reviews.'
      },
      {
        title: 'Master data and access control',
        text: 'A master database for operators, owners and lessors, with role-based permissions so each team sees what it should.'
      }
    ],
    audience: ['Accountable managers', 'Operations and technical directors', 'Quality and compliance teams', 'Aircraft owners and lessors'],
    related: ['maintenance', 'operations'],
    seoTitle: 'Aviation Management Software: Fleet Analytics and Compliance',
    seoDescription:
      'Management analytics and compliance oversight for aircraft fleets: upcoming MPD and AD work, estimated maintenance cost, a fleet Compliance Center and audit tracking in one platform.',
    keywords: [
      'aviation management software',
      'fleet management software for aircraft',
      'aviation compliance software',
      'aircraft maintenance cost tracking',
      'airworthiness compliance dashboard'
    ]
  },

  maintenance: {
    eyebrow: 'Maintenance',
    title: 'CAMO software for continuing airworthiness',
    intro:
      'The maintenance module is the CAMO section of VYOMA. It keeps technical records, directives, planned maintenance and component life in one place, whether the CAMO is your own team or a subcontracted organisation.',
    highlights: [
      {
        title: 'Technical records per aircraft',
        text: 'An identity card, configuration and structured records for every aircraft, engine and APU.'
      },
      {
        title: 'AD and SB tracking',
        text: 'Airworthiness directives and service bulletins tracked per aircraft, engine and APU, with last done, next due and status.'
      },
      {
        title: 'MPD and AMP programme',
        text: 'Maintenance programme tasks and a due list that shows what is coming before it becomes urgent.'
      },
      {
        title: 'Components and life-limited parts',
        text: 'Component status, LLP life and hard-time items tracked against the aircraft they are installed on.'
      },
      {
        title: 'MEL/CDL and duplicate inspections',
        text: 'Deferred defects managed against the MEL/CDL, and duplicate inspections requested and tracked.'
      },
      {
        title: 'Tech logs, defects and work orders',
        text: 'Tech logs, aircraft defects and work orders linked to the aircraft record, with reports including ESR, reliability, oil consumption monitoring and the component replacement register.'
      }
    ],
    audience: ['CAMO organisations', 'Airline and operator technical teams', 'Maintenance controllers', 'Airworthiness and records teams'],
    related: ['management', 'logistics'],
    seoTitle: 'CAMO Software: Aircraft Maintenance and Airworthiness Tracking',
    seoDescription:
      'CAMO software for continuing airworthiness: AD and SB tracking, MPD and AMP due lists, component and LLP life, MEL/CDL, tech logs and work orders for in-house and subcontracted CAMOs.',
    keywords: [
      'camo software',
      'continuing airworthiness management software',
      'aircraft maintenance tracking software',
      'airworthiness directive tracking software',
      'service bulletin tracking software',
      'MEL CDL management software',
      'component life tracking software'
    ]
  },

  operations: {
    eyebrow: 'Operations',
    title: 'Operations software for every kind of flying',
    intro:
      'Operations in VYOMA is built around how you fly. Airlines, flying training schools and private jet operators each get the planning and reporting they actually use, all connected to the airworthiness status of the aircraft.',
    highlights: [
      {
        title: 'Technical status behind every flight',
        text: 'Each operation sits on the same aircraft record as maintenance, so serviceability and open discrepancies are never a separate question.'
      },
      {
        title: 'Planning',
        text: 'Flight schedules, crew allocation and rosters, flight dispatch and release, and weight and balance.'
      },
      {
        title: 'Live view',
        text: 'Aircraft status, open discrepancies and crew roster status in one live operations view.'
      },
      {
        title: 'Reports',
        text: 'Flying and utilisation, traffic and schedule, and crew compliance reports for management and regulators.'
      }
    ],
    audience: ['Airlines', 'Flying training schools', 'Private jet and non-scheduled operators'],
    related: ['maintenance', 'management'],
    seoTitle: 'Aviation Operations Software for Airlines, Flight Schools and Private Jets',
    seoDescription:
      'Operations software for airlines, flying training schools and private jet operators: flight planning, crew, dispatch, training, trips and utilisation reports tied to aircraft airworthiness.',
    keywords: [
      'aviation operations software',
      'airline maintenance and operations software',
      'flying training school software',
      'private jet operator software',
      'non-scheduled operator software'
    ]
  },

  airlines: {
    eyebrow: 'Operations / Airlines',
    title: 'Airline operations and maintenance software',
    intro:
      'Connect technical status to daily flying. Planners see which aircraft are serviceable and what is deferred, and engineering sees the flying that is coming.',
    highlights: [
      {
        title: 'Live Ops',
        text: 'Serviceable and AOG aircraft, open and deferred discrepancies, and crew roster status, day by day.'
      },
      {
        title: 'Flight schedule',
        text: 'Plan and review flights, including completed, delayed and cancelled flights.'
      },
      {
        title: 'Crew allocation and roster',
        text: 'Assign crew to flights and see duty, rest and standby blocks on the roster.'
      },
      {
        title: 'Dispatch and release',
        text: 'A flight release checklist that checks MEL/CDL and weight and balance status before departure.'
      },
      {
        title: 'Utilisation and traffic reports',
        text: 'Flying and utilisation, traffic and schedule, and crew compliance reports.'
      },
      {
        title: 'Maintenance in the same picture',
        text: 'Due lists, ADs and SBs, and MEL/CDL from the maintenance module, so fewer aircraft ground unexpectedly.'
      }
    ],
    audience: ['Airline operations control', 'Planners and schedulers', 'Crew planners', 'Engineering and maintenance control'],
    related: ['maintenance', 'management'],
    seoTitle: 'Airline Maintenance and Operations Software',
    seoDescription:
      'Airline maintenance and operations software: live ops, flight schedule, crew allocation, dispatch and release, utilisation and traffic reports connected to aircraft airworthiness.',
    keywords: [
      'airline maintenance software',
      'airline operations software',
      'flight scheduling software',
      'crew roster software',
      'airline fleet management software'
    ]
  },

  'flying-training': {
    eyebrow: 'Operations / Flying Training Schools',
    title: 'Flying training school software',
    intro:
      'Run the training and the fleet from one system. Sorties, students and instructors sit next to the hours, inspections and airworthiness of every trainer aircraft.',
    highlights: [
      {
        title: 'Student roster',
        text: 'Keep students, their courses and their progress in one roster.'
      },
      {
        title: 'Instructors and examiners',
        text: 'Instructors and examiners recorded with their qualifications, so bookings use the right people.'
      },
      {
        title: 'Sortie booking',
        text: 'Book sorties against aircraft, instructors and students.'
      },
      {
        title: 'Exercise log',
        text: 'Log the exercises flown on each sortie.'
      },
      {
        title: 'Hours and utilisation reports',
        text: 'Student hours, instructor utilisation and training hours reports.'
      },
      {
        title: 'Trainer aircraft airworthiness',
        text: 'Hours-based maintenance, directives and component life for every trainer, tracked in the maintenance module.'
      }
    ],
    audience: ['Flying training organisations', 'Chief flying instructors', 'Training managers', 'Maintenance teams for training fleets'],
    related: ['maintenance', 'management'],
    seoTitle: 'Flying Training School Software: Sorties, Students and Aircraft',
    seoDescription:
      'Flying training school software: student roster, instructors, sortie booking, exercise log, student hours and instructor utilisation, plus maintenance tracking for every trainer aircraft.',
    keywords: [
      'flying training school software',
      'flight school management software',
      'flight school maintenance software',
      'sortie booking software',
      'student hours tracking'
    ]
  },

  'non-scheduled': {
    eyebrow: 'Operations / Private Jet Operators',
    title: 'Private jet and non-scheduled operator software',
    intro:
      'Work trip by trip. From the first request to the final margin, with the airworthiness of the aircraft you assign always in view.',
    highlights: [
      {
        title: 'Trip requests',
        text: 'Capture a request with customer, route, dates, passengers and aircraft category, and track it from new request through quote, confirmation, flying and completion.'
      },
      {
        title: 'Fleet availability check',
        text: 'See which aircraft in the requested category are free, committed or AOG before you quote, and flag when a sub-charter or wet lease is needed.'
      },
      {
        title: 'Permits and handling',
        text: 'Landing and overflight permits tracked per leg, with the handler, validity and status, and an alert when an international leg has no approved permit.'
      },
      {
        title: 'Trip costing and margin',
        text: 'Revenue and cost lines for fuel, handling and permits, crew and positioning, with margin and margin percentage per trip.'
      },
      {
        title: 'Trip utilisation',
        text: 'Fleet utilisation by revenue and positioning hours, and a trip margin report.'
      },
      {
        title: 'Airworthiness for every aircraft',
        text: 'Due lists, directives and MEL/CDL from the maintenance module behind each tail you assign to a trip.'
      }
    ],
    audience: ['Private jet operators', 'Charter and non-scheduled operators', 'Operations and sales teams', 'Aircraft owners and managers'],
    related: ['maintenance', 'management'],
    seoTitle: 'Private Jet and Non-Scheduled Operator Software',
    seoDescription:
      'Software for private jet and non-scheduled operators: trip requests, fleet availability, permits and handling, trip costing and margin, and aircraft airworthiness in one platform.',
    keywords: [
      'private jet fleet management software',
      'private jet maintenance software',
      'non-scheduled operator software',
      'charter operator software',
      'trip management software for aircraft operators'
    ]
  },

  logistics: {
    eyebrow: 'Logistics',
    title: 'Part and vendor masters for aviation logistics',
    intro:
      'The foundation of aviation logistics: a clean record of every part and every vendor, linked to the aircraft and components each part applies to.',
    highlights: [
      {
        title: 'Part masters',
        text: 'Part identification and general details, inspection and life cycle details, and task details for each part.'
      },
      {
        title: 'Applicability and effectivity',
        text: 'Which aircraft types a part applies to, and whether it is effective on the airframe, engine, APU, propeller or component.'
      },
      {
        title: 'Part links and storage',
        text: 'Links between parts, duty and tax details, and storage details kept against the part.'
      },
      {
        title: 'Linked to your fleet',
        text: 'Parts connect to the aircraft and installed components they apply to.'
      },
      {
        title: 'Vendor masters',
        text: 'Vendor identification, classification, contacts, registrations, approvals, air references and memberships.'
      },
      {
        title: 'Vendors against parts',
        text: 'Record which vendors supply which parts, from the part master.'
      }
    ],
    audience: ['Logistics and stores teams', 'Procurement and purchasing', 'Technical records teams', 'CAMO and maintenance planners'],
    related: ['maintenance', 'management'],
    seoTitle: 'Aviation Logistics Software: Part and Vendor Masters',
    seoDescription:
      'Aviation logistics software with part masters and vendor masters: life cycle, applicability and effectivity per part, vendor approvals and registrations, linked to your aircraft and components.',
    keywords: [
      'aviation logistics software',
      'aircraft parts management software',
      'aviation vendor management',
      'part master data aviation',
      'aviation procurement software'
    ]
  }
}
