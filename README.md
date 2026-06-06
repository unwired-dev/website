# Unwired Website

Static company website for Unwired, deployed on Vercel.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX
- pnpm via Corepack

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

The site is configured for static export, so production builds emit fully static output suitable for Vercel deployment.

## CI

GitHub Actions runs on every push and pull request:

- **Lint** — `pnpm lint`
- **Format** — `pnpm format`
- **Test** — `pnpm test` (typecheck + build)
- **Fallow** — `pnpm analyze` from the repo root (changed-code audit for dead code, duplication, and complexity)

Fallow is installed only in the root `package.json`. Config lives in `.fallowrc.json` at the repo root.

Merges to `main` trigger a production deploy to Vercel after CI passes.

### Repository secrets

Configure these in GitHub repository settings:

| Secret | Purpose |
| --- | --- |
| `VERCEL_TOKEN` | Vercel API token for deploys |
| `VERCEL_ORG_ID` | Vercel team or user ID |
| `VERCEL_PROJECT_ID` | Vercel project ID for `apps/web` |

Optional Turborepo remote cache:

| Name | Type | Purpose |
| --- | --- | --- |
| `TURBO_TOKEN` | Secret | Vercel remote cache token |
| `TURBO_TEAM` | Variable | Vercel team slug |

Link the Vercel project to `apps/web` before the first deploy. Run `vercel link` from that directory to obtain org and project IDs.

## Current routes

- `/` homepage
- `/unwired-mail` product proof page

## Content direction

The site is consultancy-first, with Unwired Mail serving as product proof. Domain language and positioning decisions are tracked in [CONTEXT.md](./CONTEXT.md).
