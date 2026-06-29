# AGENTS.md

Instructions for coding agents working in this repository.

## Overview

- The git base branch is `main`.
- Use `pnpm` as the package manager.
- Keep changes focused and follow established patterns in the repository.

## Project Context

- This is the Unwired company website.
- Keep language aligned with `CONTEXT.md`; it is the source of truth for business terminology.
- The site is a consultancy-first marketing site with app-owned backend routes for conversion flows and subordinate product proof pages.
- Content is repo-owned and should stay in code, Markdown, or MDX unless the project direction changes.

## Stack

- Next.js `16.2.7` with the App Router.
- React `19.2.4`.
- TypeScript with `strict` enabled.
- Tailwind CSS 4 via `@import "tailwindcss"`.
- MDX through `@next/mdx`.
- Vercel deployment with an app-owned tRPC backend.
- Images are currently configured as `unoptimized: true`.

## Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## Completion Checklist

Before finishing:

1. Confirm only intended files changed.
2. Run relevant lint, format, typecheck, test, and audit commands for the touched area.
3. Update docs when commands, config, public behavior, or setup steps change.
4. Summarize what was verified and what was not run.

## Commands

- Use `pnpm` for package scripts when available.
- Main scripts:
  - `pnpm dev`
  - `pnpm build`
  - `pnpm start`
  - `pnpm lint`
  - `pnpm run audit` — Fallow static analysis from the monorepo root (`.fallowrc.json`)
- If local Node or pnpm is unavailable, do not install tooling silently. State what could not be run.

## Relevant Skills

- Use `next-best-practices` when changing App Router routes, layouts, metadata, route handlers, server/client boundaries, runtime behavior, image/font usage, or Next configuration.
- Use `vercel-react-best-practices` when writing or reviewing React components, data fetching, rendering performance, bundle size, or hydration behavior.
- Use frontend design skills only when the task asks for visual UI changes or implementation of a new page/section.

## Next.js Rules

- Prefer Server Components by default. Add `'use client'` only when a component needs browser APIs, event handlers, state, refs, effects, or client-only hooks.
- Keep client component props serializable. Do not pass functions, class instances, Dates, Maps, Sets, or non-plain objects across the server-to-client boundary unless intentionally transformed.
- In Next 15+ and 16, treat framework request APIs as async where applicable: `params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()`.
- Use `generateMetadata` or exported `metadata` for page metadata. Keep page titles and descriptions aligned with the glossary in `CONTEXT.md`.
- Use `notFound()`, `redirect()`, and `permanentRedirect()` instead of ad hoc error or redirect UI.
- If catching errors around Next control-flow helpers, rethrow framework control-flow errors rather than swallowing them.
- Use route handlers only for real HTTP API surfaces, including the existing tRPC backend. Prefer Server Components for reads and keep Product Waitlist mutations on the established tRPC procedure.
- Do not create a `route.ts` and `page.tsx` for the same route segment at the same level.
- Default runtime is Node.js. Use Edge runtime only for a clear latency or platform constraint.
- Keep the Vercel runtime boundary in mind. Put owned backend behavior behind explicit app routes and keep content pages statically renderable when they do not need request-time data.

## Runtime And Deployment Constraints

- The site deploys to Vercel and includes an app-owned tRPC backend for Product Waitlist submissions.
- Keep marketing and content routes statically renderable unless request-time behavior is required.
- Keep Product Waitlist mutations in the existing tRPC backend; do not reintroduce the superseded external-service or static-only architecture.
- For images, respect the current `images.unoptimized: true` setting. Prefer local assets in `public/` unless there is a clear reason to use remote images.
- If a requested feature changes the runtime or deployment model, call out the trade-off before implementing it.

## React Performance Rules

- Avoid data waterfalls. Start independent async work early and resolve with `Promise.all` where possible.
- Move `await` calls into the branch that actually needs the result when a cheap synchronous condition can decide the branch first.
- Use Suspense boundaries to stream slower sections when the route can benefit from progressive rendering.
- Keep server-rendered data narrow. Do not serialize large objects into client components when a small view model is enough.
- Use `React.cache()` for per-request deduplication when server work is repeated within a render.
- Avoid module-level mutable request state in Server Components or SSR code.
- Hoist static data, static JSX, fonts, and other request-independent values to module scope.
- Use `after()` for non-blocking post-response work when it is appropriate for the Vercel runtime.

## Bundle Rules

- Prefer direct imports over barrel imports when importing from large libraries.
- Keep import paths statically analyzable. Avoid broad dynamic paths that make tracing and bundling imprecise.
- Use `next/dynamic` for heavy client-only components when they are not needed for the initial render.
- Load analytics, logging, embeds, and other third-party scripts after hydration unless they are critical.
- Use `next/script` instead of raw script tags. Inline scripts need stable `id` values.
- Do not add production dependencies without confirmation.

## Client Component Rules

- Keep client islands small and purposeful.
- Do not make client components `async`.
- Put interaction logic in event handlers instead of effects when the logic is caused by a user action.
- Derive render state during render when possible instead of mirroring props or state with effects.
- Use functional `setState` to keep callbacks stable when updates depend on previous state.
- Use `useMemo` and `React.memo` only for meaningful expensive work or identity stability. Do not memoize trivial expressions.
- Do not define components inside components.
- Use primitive dependencies in hooks when possible.
- Use `startTransition` or `useDeferredValue` for non-urgent expensive UI updates.
- Store transient high-frequency values in refs instead of state when they do not affect rendering.

## Rendering And Hydration

- Avoid hydration mismatches from dates, random values, browser-only APIs, or environment-specific branches during render.
- Use client-only rendering, a stable placeholder, or a deliberate suppression only when a mismatch is expected and understood.
- Prefer ternaries over `&&` when rendering values that could be `0`, `""`, or another renderable falsey value.
- For long lists or below-the-fold sections, consider `content-visibility` when it improves rendering cost without breaking layout.
- Animate wrappers around SVGs rather than SVG elements directly when browser behavior is inconsistent.

## Images And Fonts

- Use `next/font` for fonts. Keep font definitions in module scope and apply variables through layout-level classes.
- Use `next/image` for image behavior compatible with the current `images.unoptimized: true` setup.
- For LCP images, set appropriate priority/preload behavior and accurate `sizes`.
- Provide dimensions or stable aspect ratios for images and media to avoid layout shift.
- Use blur placeholders only when the image source and UX justify them.

## MDX And Content

- Use MDX for content-led pages that may need React components later.
- Keep marketing copy consistent with `CONTEXT.md`.
- Do not rename glossary terms casually. If terminology changes, update `CONTEXT.md` as a glossary, not as an implementation spec.
- Keep Unwired Mail positioned as product proof, not the primary conversion path, unless the product strategy changes.

## Code Style

- Preserve existing App Router structure under `app/`.
- Keep shared styling in `app/globals.css` when it is truly global.
- Prefer simple typed module-level constants for repeated static content.
- Keep components small, readable, and close to the route until reuse is proven.
- Use semantic HTML and accessible links/buttons.
- External links should include `target="_blank"` only when useful and must include `rel="noreferrer"`.
- Avoid unrelated refactors while implementing a focused change.

## Verification

- Run `pnpm lint` after code changes when tooling is available.
- Run `pnpm run audit` from the monorepo root when changing dependencies, workspace packages, entry points, or code that may affect reachability or duplication.
- Run `pnpm build` for changes to routes, layouts, MDX, metadata, Next config, or runtime behavior when tooling is available.
- For visual changes, inspect the rendered page in a browser at desktop and mobile widths.
- If verification cannot be run because tooling is missing, report that explicitly in the final response.
