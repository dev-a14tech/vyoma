# VYOMA Website

Marketing/SaaS site for VYOMA ("Digital Backbone of Aviation"), a CAMO/MRO aviation platform built by AVAJET Aviation Consultants LLP. Standalone project, separate from the `camo-dev` product app and the `avajet-website` corporate site.

See the full plan at the project's Claude plan file (shared separately) for context, design direction, and content sourcing.

## Stack

- `apps/web` — Nuxt 4 (SSR), Tailwind 4 + Nuxt UI, public marketing site + `/admin` CMS
- `apps/api` — NestJS 12, Mongoose + MongoDB, content API for the admin panel
- `packages/shared` — TypeScript types shared between both apps

## Local development

Requires Node 22+ and a local MongoDB instance.

```bash
# from repo root
npx pnpm install

# apps/api/.env — set MONGODB_URI, JWT_SECRET, etc. (see .env.example)
cd apps/api
npx pnpm run db:seed      # seeds the 7 feature themes, 5 audiences, page content, and an admin user
npx pnpm run start:dev    # http://localhost:3001, Swagger docs at /api/docs

# in a second terminal
cd apps/web
npx pnpm run dev          # http://localhost:3000
```

Default seeded admin login: `admin@vyoma.aero` / `ChangeMe123!` (override via `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` env vars before seeding) — **change this before any real deployment.**

## Content model

Public pages pull live content from the API (`/api/content/*`): feature themes, audience/solution pages, page hero/SEO blocks, and testimonials. Each `FeatureTheme` has a nullable `videoUrl` — when empty, the public site shows a placeholder mini-UI mockup instead; dropping in a real video (via the admin panel's upload flow) swaps it in automatically with no code changes. This is the hook for the separate per-feature animated-video production track.

## Known follow-ups

- Real per-feature animated videos (separate production track, not blocking this build)
- Legal pages (`/legal/*`) are placeholder content pending legal review
- Settings admin screen not built yet (backend endpoint exists: `GET/PUT /admin/settings`)
- No real hosting/domain wired up yet — see the plan's "Open assumptions" section
