# Rohit Kumar Developer Portfolio

ROHIT.DEV is a recruiter-friendly personal portfolio for Rohit Kumar, presented as an interactive developer command center.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/rohit-dev-portfolio run dev` — run the portfolio preview
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/rohit-dev-portfolio/src/data/portfolio.ts` — single source of truth for personal, social, skills, education, project, profile, and journey content.
- `artifacts/rohit-dev-portfolio/src/components/portfolio.tsx` — componentized portfolio surface and local interactions.
- `artifacts/rohit-dev-portfolio/src/index.css` — dark command-center visual tokens, grid texture, motion, and responsive utilities.
- `artifacts/rohit-dev-portfolio/public/resume.pdf` — optional resume location; the UI detects whether the file exists before enabling download controls.

## Architecture decisions

- Portfolio content is centralized so personal details and project claims can be updated without searching through UI components.
- External project URLs remain visibly marked placeholders and are prevented from pretending to be verified live links.
- The contact form validates locally and shows a staged-success message rather than claiming email delivery without a provider.
- Experience, certifications, and achievements use honest empty states until verified data is supplied.

## Product

The portfolio includes responsive navigation, active section tracking, interactive terminal commands, skills tabs, project category filters, accessible project detail modals, honest academic/profile dashboards, local contact validation, resume detection, and back-to-top navigation.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
