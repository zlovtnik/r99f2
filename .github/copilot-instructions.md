# Copilot Instructions

## Stack & Architecture

- **Framework**: SvelteKit 2 with Vite 7, Tailwind 3.4, PostCSS (autoprefixer), TypeScript
- **Adapter**: Vercel targeting `nodejs22.x` runtime (see [svelte.config.js](svelte.config.js))
- **Build commands**: `npm run dev|build|preview|check` (type-checking via svelte-check)
- **Path aliases**: `$components`, `$types`, `$utils`, `$data`, `$config` defined in [svelte.config.js](svelte.config.js); prefer these over relative imports

## Routing & Pages

- **Root layout**: [src/routes/+layout.svelte](src/routes/+layout.svelte) loads global styles/favicon and calls `initializeGA()` on mount; guard browser-only code (window/document) to avoid SSR errors
- **Home page**: [src/routes/+page.svelte](src/routes/+page.svelte) renders schema JSON-LD, hero, services, testimonials, CTA; sources from `services`, `testimonials`, `BUSINESS_INFO`, and `createLocalBusinessSchema`
- **Static pages**: [src/routes/about/+page.svelte](src/routes/about/+page.svelte) manually sets SEO tags using `siteConfig.siteUrl`; follow this pattern for new pages
- **Dynamic service areas**: [src/routes/service-areas/[city]/+page.svelte](src/routes/service-areas/[city]/+page.svelte) uses [src/lib/components/ServiceAreaPage.svelte](src/lib/components/ServiceAreaPage.svelte) component with area slug; data from [src/lib/data/serviceAreas.ts](src/lib/data/serviceAreas.ts)

## Data & Configuration

- **Structured data**: Services/testimonials/FAQ/service areas live in [src/lib/data/](src/lib/data/) and use types from [src/lib/types/index.ts](src/lib/types/index.ts); update data files, not inline in components
- **Constants**: Business/site constants in [src/lib/utils/constants.ts](src/lib/utils/constants.ts) (BUSINESS_INFO, SERVICE_AREAS, SERVICE_OPTIONS exported as const arrays). **SERVICE_OPTIONS is the canonical list of service slugs**; use it for form `<select>` values and ensure [src/lib/data/services.ts](src/lib/data/services.ts) exports a services array whose slug fields are validated against SERVICE_OPTIONS to prevent drift. Any form validation logic that builds select options or validates submitted service slugs must derive its values from SERVICE_OPTIONS so both the data file and form validation code reference the same canonical source
- **Config flags**: [src/lib/config/siteConfig.ts](src/lib/config/siteConfig.ts) reads `VITE_ENABLE_*` envs for feature toggles (enableContactForm, enableAnalytics, etc.)
- **Environment vars**: `VITE_GA_MEASUREMENT_ID`, `VITE_ENABLE_*` toggles, `VITE_BUSINESS_EMAIL/PHONE` (client-side display only), `ADMIN_EMAIL` (server-side email recipient for contact API; required for outgoing messages), `VITE_SITE_URL` (default `https://lbsunrise.com`), `RATE_LIMIT_WINDOW_SECONDS` (sliding window in seconds for contact API rate limiter; default 60; server-side), `RATE_LIMIT_MAX` (max submissions per window; default 5; server-side; both read by [src/routes/api/contact/+server.ts](src/routes/api/contact/+server.ts))

## SEO & Analytics

- **SEO utilities**: [src/lib/utils/seo.ts](src/lib/utils/seo.ts) provides `createLocalBusinessSchema`, `createServiceSchema`, `formatPricing`, breadcrumbs
- **Schema markup**: Use [SchemaMarkup.svelte](src/lib/components/SchemaMarkup.svelte) for JSON-LD injection (not inline scripts)
- **Analytics**: [src/lib/utils/analytics.ts](src/lib/utils/analytics.ts) injects GA4 when `VITE_GA_MEASUREMENT_ID` is valid (not placeholder G-XXXXXXXXXX); tracking helpers are no-ops when GA absent. Call only in browser context.
- **Schema alignment**: When adding services/locations, keep `SERVICE_AREAS`, `SERVICE_OPTIONS` in [constants.ts](src/lib/utils/constants.ts) and JSON-LD schemas synchronized

## Forms & Validation

- **Contact form**: [ContactForm.svelte](src/lib/components/ContactForm.svelte) uses `validateContactForm` from [validation.ts](src/lib/utils/validation.ts) (validates name/email/phone/ZIP/service/message)
- **Service validation**: `ContactForm.svelte` should import **SERVICE_OPTIONS** from constants.ts so the `<select>` only exposes the canonical services and the client-side validation against `SERVICE_OPTIONS` prevents invalid submissions, and `[src/routes/api/contact/+server.ts](src/routes/api/contact/+server.ts)` must also import **SERVICE_OPTIONS** and reject requests whose `service` value is not recognized with a clear error response; do not rely on client-side checking alone
- **API endpoint**: [src/routes/api/contact/+server.ts](src/routes/api/contact/+server.ts) handles form submission with rate limiting (configurable via `RATE_LIMIT_WINDOW_SECONDS`, `RATE_LIMIT_MAX`) and sends email to `ADMIN_EMAIL` (server-side env); client-side display uses `VITE_BUSINESS_EMAIL` and `VITE_BUSINESS_PHONE`

## UI Components & Styling

- **Components**: Hero/CTA/ServiceCard/TestimonialCard/Footer/Navigation in [src/lib/components/](src/lib/components/); Navigation uses `$page` store for active route highlighting
- **Tailwind theme**: [tailwind.config.js](tailwind.config.js) extends colors (primary: #4CAF50, secondary: #AED581, accent: #FFA726, neutral shades)
- **Global styles**: [src/app.css](src/app.css) defines utility classes like `.btn`; maintain utility-first approach
- **Accessibility**: Components include aria-labels/ids (e.g., Testimonial star ratings, ContactForm errors); follow these patterns for new UI

## Deployment & DevOps

- **Primary target**: Vercel via adapter-vercel (outputs to `build/`)
- **Alternative deployments**: Docker via [Dockerfile](Dockerfile) (multi-stage alpine build, port 3000, healthcheck at `/health`); OCI via [build_spec.yml](build_spec.yml) for OCI DevOps pipelines; Kubernetes manifests in [k8s-deployment.yaml](k8s-deployment.yaml), [k8s-service.yaml](k8s-service.yaml), [k8s-ingress.yaml](k8s-ingress.yaml)
- **Build artifacts**: Vercel uses `build/` output; OCI DevOps copies to `dist/` with production deps
- **Makefile**: [Makefile](Makefile) provides shortcuts: `make install|dev|build|check|docker-build|deploy-k8s`

## Development Workflow

- **Quality checks**: Run `npm run check` (svelte-check + tsc) before commits; no dedicated test suite exists yet
- **Content updates**: Prefer editing structured data files/config over hardcoding copy in components for consistency
- **SSR safety**: Always guard browser APIs (window/document) with `typeof window !== 'undefined'` or `onMount`; [analytics.ts](src/lib/utils/analytics.ts) shows proper patterns

## Key Files Reference

- Config: [svelte.config.js](svelte.config.js), [vite.config.ts](vite.config.ts), [tailwind.config.js](tailwind.config.js)
- Data: [src/lib/data/services.ts](src/lib/data/services.ts), [testimonials.ts](src/lib/data/testimonials.ts), [serviceAreas.ts](src/lib/data/serviceAreas.ts)
- Utils: [constants.ts](src/lib/utils/constants.ts), [seo.ts](src/lib/utils/seo.ts), [validation.ts](src/lib/utils/validation.ts), [analytics.ts](src/lib/utils/analytics.ts)
- Types: [src/lib/types/index.ts](src/lib/types/index.ts) (Service, ServiceArea, Testimonial, ContactFormData)
- Static: [static/](static/) (robots.txt, sitemap.xml, images/)
