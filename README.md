# Unwired Website

Company website for Unwired, deployed on Vercel.

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

Production builds are handled by Next.js and include the website plus backend route handlers used by the app.

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

## Waitlist API

Product waitlist submissions are handled through the app-owned tRPC backend at `apps/web/src/app/api/trpc/[trpc]/route.ts`.

Required environment variables:

- `RESEND_API_KEY` — Resend API key used to send the confirmation email
- `WAITLIST_FROM_EMAIL` — verified sender for waitlist confirmations
- `WAITLIST_NOTIFY_EMAIL` — internal recipient for collected waitlist submissions

## Current routes

- `/` homepage
- `/api/trpc` tRPC backend API
- `/products/waitlist` shared Product Waitlist
- `/unwired-mail` product proof page
- `/unwired-calendar` product proof page
- `/writing` repo-owned writing index, intentionally omitted from navigation
- `/writing/[slug]` statically generated MDX writing entries

Writing content and publishing instructions live in
[`apps/web/src/content/writing`](./apps/web/src/content/writing/README.md).

## Content direction

The site is consultancy-first, with Unwired products supporting the positioning. Domain language and positioning decisions are tracked in [CONTEXT.md](./CONTEXT.md).
