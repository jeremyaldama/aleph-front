<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project Guidelines

## Build and Validate

- Package manager: `pnpm`
- Dev server: `pnpm dev`
- Production build: `pnpm build`
- Production run: `pnpm start`
- Lint: `pnpm lint`
- Tests: no test runner is configured yet. Do not invent test commands.

## Architecture

- Framework: Next.js App Router on Next 16.2.x with React 19.
- Primary app files:
  - `app/layout.tsx` for root metadata, font variables, and shell.
  - `app/page.tsx` for the current landing page.
  - `app/globals.css` for global tokens and Tailwind v4 theme wiring.
- Keep page-level UI in server components by default. Add client components only when interactivity requires it.

## Styling and UI Conventions

- Use Tailwind CSS v4 utility classes for most styling.
- Keep design language minimal and data-oriented: rounded cards, soft shadows, restrained gradients.
- Preserve existing color/token setup in `app/globals.css` unless a task explicitly changes branding.
- Reuse typography setup from `next/font/google` in `app/layout.tsx`.

## TypeScript and Imports

- TypeScript is `strict`; avoid `any` unless justified.
- Prefer explicit types for public component props.
- Use `@/*` path alias when importing from project root.

## Linting and Quality

- ESLint uses `eslint.config.mjs` with `eslint-config-next` (`core-web-vitals` + `typescript`).
- For code changes, run `pnpm lint` and fix issues introduced by the change.

## Monorepo Note

- This package participates in a pnpm workspace (`pnpm-workspace.yaml`).
- Keep commands and file paths scoped to this package unless the task explicitly requires workspace-wide changes.

## Common Pitfalls

- Do not rely on stale Next.js knowledge. Check docs in `node_modules/next/dist/docs/` for behavior changes.
- Avoid adding Pages Router patterns (`pages/`, `getServerSideProps`) unless the project explicitly introduces them.
- Do not assume a testing framework exists.
