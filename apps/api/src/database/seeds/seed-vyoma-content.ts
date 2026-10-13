import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const features = [
  {
    slug: 'fleet-aircraft-management',
    order: 1,
    title: 'Fleet & Aircraft Management',
    summary: 'A single system of record for every tail in the fleet, from onboarding to daily ops.',
    icon: 'plane',
    placeholderMotif: 'orbit-bands',
    bodyMarkdown:
      'Bring a new aircraft onto the platform through a guided onboarding wizard, then manage it from an 18-section workspace covering everything from configuration to flight history. Fleet-wide KPI dashboards keep leadership looking at the same numbers as the line.',
    capabilities: [
      'Guided aircraft onboarding (engines, APU, landing gear, airframe, components)',
      'Full per-aircraft workspace: defects, maintenance, work orders, documents, configuration',
      'Fleet-wide KPI dashboard for leadership visibility',
      'Life-limited parts and component status tracking',
    ],
  },
  {
    slug: 'airworthiness-compliance',
    order: 2,
    title: 'Airworthiness & Compliance',
    summary: 'Stay inspection-ready every day, not just the week before an audit.',
    icon: 'shield-check',
    placeholderMotif: 'yantra-grid',
    bodyMarkdown:
      'Track every Airworthiness Directive and Service Bulletin against your fleet automatically. Manage MEL/CDL deferrals with their extensions, run internal compliance audits with a structured findings workflow, and keep an immutable, timestamped audit trail that stands up to regulator scrutiny.',
    capabilities: [
      'AD/SB tracking matched automatically against fleet configuration',
      'MEL/CDL deferral management with extension workflows',
      'Fleet-wide compliance status dashboard (red/amber/green)',
      'Structured audit findings workflow with sign-off',
      'Immutable, hash-chained audit log for regulatory traceability',
    ],
  },
  {
    slug: 'maintenance-engineering',
    order: 3,
    title: 'Maintenance & Engineering',
    summary: 'Work orders, tech log, and engineering data in one connected workflow.',
    icon: 'wrench',
    placeholderMotif: 'flight-chevron',
    bodyMarkdown:
      'Plan and execute maintenance tasks against a structured task-card library, route the tech log through a proper approval workflow, and draw on a master engineering database covering AD/SB, MEL, APU, components, and engine/propeller specs so every task references the right data.',
    capabilities: [
      'Work order creation, tracking, and sign-off',
      'Tech log with structured approval workflow',
      'MPD/AMP maintenance task masters',
      'Master engineering database (AD/SB, MEL, APU, LRU, components)',
    ],
  },
  {
    slug: 'parts-supply-chain',
    order: 4,
    title: 'Parts & Supply Chain',
    summary: 'Know what parts you have, where they are, and when they expire.',
    icon: 'package',
    placeholderMotif: 'rosette-ring',
    bodyMarkdown:
      'Maintain a single part master and vendor master across the operation, track components through their full lifecycle, and keep a live requirements queue so procurement never finds out about a shortage from the hangar floor.',
    capabilities: [
      'Centralized part master and vendor master',
      'Component lifecycle tracking (hard-time, OCCM, LRU)',
      'Live requirements queue for procurement',
    ],
  },
  {
    slug: 'flight-operations',
    order: 5,
    title: 'Flight Operations',
    summary: 'Scheduling, dispatch, and live-ops visibility in one operating picture.',
    icon: 'radar',
    placeholderMotif: 'orbit-bands',
    bodyMarkdown:
      'Build and dispatch the flight schedule, track trips and charter operations including permits and handling, and watch live operations unfold with real-time roster and discrepancy monitoring — plus weight & balance, built in.',
    capabilities: [
      'Flight scheduling and dispatch',
      'Real-time live-ops roster and discrepancy monitoring',
      'Trip and charter management, including permits & handling',
      'Weight & balance',
    ],
  },
  {
    slug: 'crew-training',
    order: 6,
    title: 'Crew & Training',
    summary: 'Roster the line and prove duty-time compliance without the spreadsheet.',
    icon: 'users',
    placeholderMotif: 'yantra-grid',
    bodyMarkdown:
      'Manage crew rosters and allocation against a rolling duty-time compliance engine that checks 24-hour, 7-day, 28-day, and annual limits automatically. Training records and a full flight-training-organisation workflow keep instructors, students, and sign-offs connected.',
    capabilities: [
      'Crew roster and allocation',
      'Automated duty-time (FDTL) compliance checks — 24h/7d/28d/365d',
      'Crew training record management',
      'Flight-training-organisation workflows: instructors, students, sign-off',
    ],
  },
  {
    slug: 'reporting-analytics',
    order: 7,
    title: 'Reporting & Analytics',
    summary: 'Regulator-ready reports, generated from the same data your team works in.',
    icon: 'bar-chart-3',
    placeholderMotif: 'flight-chevron',
    bodyMarkdown:
      'Pull the reports regulators and management actually ask for — reliability, MEL statistics, oil consumption trends, utilisation, crew compliance — straight out of operational data, exportable to PDF, Excel, or Word.',
    capabilities: [
      'Engineering reliability reports (ESR) by ATA chapter',
      'MEL invoke/revoke statistics',
      'Oil consumption and utilisation trend reporting',
      'Crew compliance and training-hours reporting',
      'PDF / Excel / Word export on every report',
    ],
  },
] as const;

const audiences = [
  {
    slug: 'airline-operators',
    order: 1,
    title: 'Airline Operators',
    heroCopy:
      'Run continuing airworthiness, maintenance, and flight ops from one platform instead of stitching together spreadsheets and point tools.',
    painPoints: [
      'Compliance status scattered across spreadsheets and email',
      'No single view of fleet health across maintenance and ops',
      'Audit prep means weeks of manual record pulling',
    ],
    relevantFeatureSlugs: [
      'fleet-aircraft-management',
      'airworthiness-compliance',
      'flight-operations',
      'reporting-analytics',
    ],
  },
  {
    slug: 'camo-organisations',
    order: 2,
    title: 'CAMO Organisations',
    heroCopy:
      'Manage continuing airworthiness for the fleets in your care with the same rigor regulators expect — built in, not bolted on.',
    painPoints: [
      'Tracking AD/SB compliance manually across multiple operators',
      'Proving audit-trail integrity to regulators',
      'Coordinating maintenance planning across a multi-operator portfolio',
    ],
    relevantFeatureSlugs: ['airworthiness-compliance', 'maintenance-engineering', 'reporting-analytics'],
  },
  {
    slug: 'aircraft-lessors',
    order: 3,
    title: 'Aircraft Lessors',
    heroCopy:
      'Get lessor-grade visibility into the technical condition and compliance status of every asset on lease, without chasing operators for updates.',
    painPoints: [
      'Limited visibility into an asset’s maintenance status between inspections',
      'Redelivery condition disputes due to incomplete records',
      'No standardized compliance reporting across a mixed-operator portfolio',
    ],
    relevantFeatureSlugs: ['fleet-aircraft-management', 'airworthiness-compliance', 'reporting-analytics'],
  },
  {
    slug: 'mro-partners',
    order: 4,
    title: 'MRO Partners',
    heroCopy:
      'Connect work orders, parts, and task cards to the same engineering data your customers’ compliance teams are already working from.',
    painPoints: [
      'Disconnected systems between work orders and parts inventory',
      'Manual task-card referencing slows down turnaround',
      'Limited visibility for customers into maintenance progress',
    ],
    relevantFeatureSlugs: ['maintenance-engineering', 'parts-supply-chain', 'fleet-aircraft-management'],
  },
  {
    slug: 'regulatory-auditors',
    order: 5,
    title: 'Regulatory Auditors',
    heroCopy:
      'Review a hash-chained, timestamped audit trail built for inspection from day one — not assembled the week before you show up.',
    painPoints: [
      'Paper-based or easily-edited digital records undermine audit confidence',
      'Inconsistent record formats across operators slow review',
      'Difficult to verify compliance history retroactively',
    ],
    relevantFeatureSlugs: ['airworthiness-compliance', 'reporting-analytics'],
  },
] as const;

const pages = [
  {
    slug: 'home',
    heroTitle: 'Digital Backbone of Aviation',
    heroSubtitle:
      'VYOMA connects fleet management, airworthiness, maintenance, flight ops, crew, and reporting in one platform built for the way CAMO organisations and operators actually work.',
    seoTitle: 'VYOMA — Digital Backbone of Aviation',
    seoDescription:
      'VYOMA is a continuing airworthiness and aviation operations platform covering fleet management, compliance, maintenance, flight ops, crew, and reporting in one connected system.',
    blocks: [],
  },
  {
    slug: 'platform',
    heroTitle: 'One platform, the whole operation',
    heroSubtitle:
      'Everything from aircraft onboarding to regulator-ready reports, built on a true multi-tenant architecture with granular role-based access.',
    seoTitle: 'The VYOMA Platform',
    seoDescription:
      'See how VYOMA connects fleet, compliance, maintenance, flight operations, crew, and reporting into a single aviation operations platform.',
    blocks: [],
  },
  {
    slug: 'why-vyoma',
    heroTitle: 'Built for audit day, every day',
    heroSubtitle:
      'Multi-tenant data isolation, granular permissions, a fully documented API, and an immutable audit trail — the trust infrastructure under every feature.',
    seoTitle: 'Why VYOMA — Trust & Compliance',
    seoDescription:
      'VYOMA is built on true multi-tenant data isolation, role-based access control, a documented REST API, and a hash-chained audit log.',
    blocks: [],
  },
  {
    slug: 'about',
    heroTitle: 'Built by aviation technical specialists',
    heroSubtitle:
      'VYOMA is built by AVAJET Aviation Consultants LLP, an independent aircraft technical advisory operating since 2009 — so the platform is built by people who have done this work, not just software people guessing at it.',
    seoTitle: 'About VYOMA',
    seoDescription: 'VYOMA is built by AVAJET Aviation Consultants LLP, an independent aviation technical advisory.',
    blocks: [],
  },
] as const;

async function main() {
  console.log('Seeding VYOMA website content...');

  for (const f of features) {
    await prisma.featureTheme.upsert({
      where: { slug: f.slug },
      create: { ...f, capabilities: f.capabilities as unknown as object },
      update: { ...f, capabilities: f.capabilities as unknown as object },
    });
  }
  console.log(`  - ${features.length} feature themes`);

  for (const a of audiences) {
    await prisma.audienceSegment.upsert({
      where: { slug: a.slug },
      create: {
        ...a,
        painPoints: a.painPoints as unknown as object,
        relevantFeatureSlugs: a.relevantFeatureSlugs as unknown as object,
      },
      update: {
        ...a,
        painPoints: a.painPoints as unknown as object,
        relevantFeatureSlugs: a.relevantFeatureSlugs as unknown as object,
      },
    });
  }
  console.log(`  - ${audiences.length} audience segments`);

  for (const p of pages) {
    await prisma.pageContent.upsert({
      where: { slug: p.slug },
      create: { ...p, blocks: p.blocks as unknown as object },
      update: { ...p, blocks: p.blocks as unknown as object },
    });
  }
  console.log(`  - ${pages.length} page content records`);

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@vyoma.aero';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.admin.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, passwordHash, name: 'VYOMA Admin' },
    update: {},
  });
  console.log(`  - admin user ready: ${adminEmail} (password from SEED_ADMIN_PASSWORD or default)`);

  console.log('Done.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
