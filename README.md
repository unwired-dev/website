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
- **Fallow** — `pnpm audit` from the repo root (changed-code audit for dead code, duplication, and complexity)

Fallow is installed only in the root `package.json`. Config lives in `.fallowrc.json` at the repo root.

Optional Turborepo remote cache in GitHub repository settings:

| Name | Type | Purpose |
| --- | --- | --- |
| `TURBO_TOKEN` | Secret | Vercel remote cache token |
| `TURBO_TEAM` | Variable | Vercel team slug |

## Deployment

Production deploys are handled automatically by Vercel when changes are pushed to `main`. Connect the GitHub repository in the Vercel dashboard and set the root directory to `apps/web`.

Pull requests get preview deployments when the Vercel Git integration is enabled.

## Current routes

- `/` homepage
- `/unwired-mail` product proof page

## Content direction

The site is consultancy-first, with Unwired Mail serving as product proof. Domain language and positioning decisions are tracked in [CONTEXT.md](./CONTEXT.md).
