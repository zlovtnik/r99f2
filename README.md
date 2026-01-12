# LR Sunrise Construction Site

This repository hosts a SvelteKit landing page for LR Sunrise Construction. It is a content-driven, SEO-first marketing site powered by
1. a canonical services/testimonials/service-area dataset under `src/lib/data`,
2. reusable Svelte components for hero, services, testimonials, schema markup, and contact details in `src/lib/components`, and
3. SvelteKit routes (`src/routes`) that render the home page, service pages, service-area pages, and supporting static endpoints (FAQ, gallery, blog-style service areas, robots, sitemap, healthcheck, etc.).

## Architecture at a Glance

- **SvelteKit + Tailwind + Vite**: the project uses `@sveltejs/kit` (v2.49) with `vite` for dev/build and `tailwindcss` for styling; the `svelte.config.js` file wires in `adapter-vercel` targeting `nodejs22.x` and defines the `$components`, `$types`, `$utils`, `$data`, and `$config` aliases used throughout the app.
- **Data-driven content**: services/testimonials/service areas/benefits gallery items live in `src/lib/data`; typed helpers in `src/lib/types` keep components, schema generation helpers (`src/lib/utils/seo.ts`, `createLocalBusinessSchema`, etc.), and validation/analytics utilities aligned with that data.
- **Structured utilities**: `src/lib/utils/constants.ts` consolidates business info, keywords, service areas, and canonical `SERVICE_OPTIONS`; `validation.ts` powers `ContactForm.svelte` and the API endpoint with the same rules so both client and server agree on required fields and valid services.
- **Components**: UI pieces such as `Hero`, `CTA`, `ServiceCard`, `TestimonialCard`, `ContactForm`, `Navigation`, and `Footer` live under `src/lib/components` and consume the shared data/SEO helpers (`schema markup`, `formatting`, `analytics`).
- **API surface**: the backend routes in `src/routes/api` include the contact form (`contact/+server.ts` with rate limiting, HTML escaping, and SMTP email dispatch via `src/lib/utils/email.ts`), analytics webhook (`api/analytics/+server.ts`), a simple healthcheck (`/health/+server.ts`), and static files like `robots.txt`/`sitemap.xml` in their own route directories.

## Data Flow

- **Service Options**: `SERVICE_OPTIONS` in `utils/constants.ts` is the single source of truth for every service slug (forms, validation, schema output, page generation). When adding a service area entry or expanding the drop-down, update this array and `src/lib/data/services.ts` in sync.
- **Testimonials, FAQs, Gallery**: these static lists feed the home page and their respective routes (e.g., `routes/testimonials/+page.svelte`), keeping the copy separate from layout logic.
- **Schema markup & SEO**: the `SchemaMarkup` component injects JSON-LD created by helpers in `src/lib/utils/seo.ts`; the layout wraps the site with structured business schema so search engines see consistent `BUSINESS_INFO` data.

## Contact Form & API

- The contact form component (`ContactForm.svelte`) pulls validation rules from `validateContactForm` and builds its `<select>` options from `SERVICE_OPTIONS` to guarantee consistency with the server.
- `routes/api/contact/+server.ts` validates submissions, enforces rate limiting via an in-memory sliding window (configurable with `RATE_LIMIT_WINDOW_SECONDS` and `RATE_LIMIT_MAX`), escapes user input, and sends email using the `ADMIN_EMAIL` hook.
- Environment variables that influence the endpoint and display values: `ADMIN_EMAIL` (required on server), `VITE_BUSINESS_EMAIL`, `VITE_BUSINESS_PHONE` (client), `VITE_SITE_URL`, and the rate limit/env toggles noted above.

## Environment Variables

| Name | Scope | Description |
| ---- | ----- | ----------- |
| `VITE_BUSINESS_EMAIL` | Client | Email shown on the site/contact cards. |
| `VITE_BUSINESS_PHONE` | Client | Phone number shown alongside contact info. |
| `VITE_SITE_URL` | Client | Base URL for schema markup; defaults to `https://constructioncompanyme.com`. |
| `VITE_GA_MEASUREMENT_ID` | Client | When provided (and not `G-XXXXXXXXXX`) the analytics helper injects GA4. |
| `ADMIN_EMAIL` | Server | Required recipient for contact form emails. |
| `RATE_LIMIT_WINDOW_SECONDS` | Server | Sliding window length for contact submissions (>=10). |
| `RATE_LIMIT_MAX` | Server | Max submissions per window (>=1). |

## Scripts

| Script | Purpose |
| ------ | ------- |
| `npm run dev` | Starts Vite dev server with hot reload. |
| `npm run preview` | Serves the production build locally. |
| `npm run build` | Compiles the SvelteKit app for production. |
| `npm run prepare` | Keeps generated SvelteKit files (vite.config, manifest) in sync. |
| `npm run check` | Runs `svelte-kit sync` and `svelte-check --tsconfig ./tsconfig.json` for type checking and linting. |
| `npm run check:watch` | Same as `check` but in watch mode for faster feedback during development. |

> This project uses Bun as the package manager (`packageManager: bun@1.2.17`), but all npm/yarn commands operate via the generated `package.json` as usual.

## Development Workflow

- Clone the repo, install dependencies (`bun install` or `npm install`), and start the dev server with `npm run dev`. Guard browser APIs in components via `onMount` or `typeof window !== 'undefined'` to stay SSR-safe (see `utils/analytics.ts`).
- Any new UI content should live in the data files (`serviceAreas.ts`, `services.ts`, `testimonials.ts`, `faq.ts`, etc.) and then be rendered through the existing components. Keep `SERVICE_OPTIONS` synced with the form and API validation rules.
- Use `npm run check` before commits to ensure typing/svelte checks pass; there is no separate test suite yet.

## Deployment

- **Vercel**: `@sveltejs/adapter-vercel` targets `nodejs22.x` and produces the `build/` output Vercel expects. Keep `.vercel/` config aligned with `vercel.json`.
- **Docker/Kubernetes/OCI**: the repo includes `Dockerfile`, `Makefile` targets, `build_spec.yml`, OCI/Kubernetes helper scripts, and manifest files (`k8s-deployment.yaml`, `deploy-*.sh`) for alternative deployment paths. Follow the docs (`docs/OCI_CICD_README.md`, `docs/dev.md`) when building containers or running in cluster environments.

## Additional Notes

- Global styles reside in `src/app.css`, Tailwind utilities are used with the extended color palette from `tailwind.config.js`, and the `Navigation` component uses the `$page` store to highlight the active route.
- Pages that need schema or SEO updates should import helpers from `src/lib/utils/seo.ts` and update `BUSINESS_INFO`, `SERVICE_OPTIONS`, or `SERVICE_AREAS` rather than hardcoding values.
- Keep analytics initialization (`initializeGA()`) inside `src/routes/+layout.svelte` guarded by the browser environment (e.g., `if (typeof window !== 'undefined')`).

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
