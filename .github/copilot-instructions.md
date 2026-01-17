# Copilot Instructions

## Project Overview

**LR Sunrise Construction** - A local contractor business website for Portland, ME serving 21 communities within 200 miles. The site focuses on siding installation, roofing, carpentry, and remodeling services with strong local SEO.

**Improvement Roadmap**: See [src/lib/assets/fixes.md](src/lib/assets/fixes.md) for the active task list and implementation priorities. Current focus areas:
- Navigation dropdowns for Services/Areas
- Limiting homepage service areas to 6 featured (not all 21)
- Adding urgency messaging to CTAs
- Google Maps embeds on service area pages

## Stack & Architecture

- **Framework**: SvelteKit 2 with Vite 7, Tailwind 3.4, PostCSS (autoprefixer), TypeScript
- **Adapter**: Cloudflare Pages via adapter-cloudflare (see [svelte.config.js](svelte.config.js) and [wrangler.jsonc](wrangler.jsonc))
- **Build commands**: `npm run dev|build|preview|check` (type-checking via svelte-check)
- **Path aliases**: `$components`, `$types`, `$utils`, `$data`, `$config` defined in [svelte.config.js](svelte.config.js); prefer these over relative imports

## Routing & Pages

- **Root layout**: [src/routes/+layout.svelte](src/routes/+layout.svelte) loads global styles/favicon and calls `initializeGA()` on mount; guard browser-only code (window/document) to avoid SSR errors
- **Home page**: [src/routes/+page.svelte](src/routes/+page.svelte) renders schema JSON-LD, hero, services (4 from `featuredServices`), testimonials (3), blog posts (3), featured service areas (6), and CTA sections; sources from `featuredServices` (4-item subset), `testimonials`, `blogPosts`, `serviceAreas`, `benefits`, `BUSINESS_INFO`
- **Static pages**: [src/routes/about/+page.svelte](src/routes/about/+page.svelte), [src/routes/contact/+page.svelte](src/routes/contact/+page.svelte), [src/routes/faq/+page.svelte](src/routes/faq/+page.svelte), [src/routes/gallery/+page.svelte](src/routes/gallery/+page.svelte), [src/routes/testimonials/+page.svelte](src/routes/testimonials/+page.svelte); all manually set SEO tags using `siteConfig.siteUrl`
- **Dynamic routes**: 
  - [src/routes/service-areas/[city]/+page.svelte](src/routes/service-areas/[city]/+page.svelte) uses [ServiceAreaPage.svelte](src/lib/components/ServiceAreaPage.svelte) with area-specific FAQs, testimonials, climate context
  - [src/routes/services/[slug]/+page.svelte](src/routes/services/[slug]/+page.svelte) for individual service pages
  - [src/routes/blog/[slug]/+page.svelte](src/routes/blog/[slug]/+page.svelte) for blog posts with markdown content
- **API routes**: `/api/contact` (form submission), `/api/analytics` (event tracking), `/health` (healthcheck), `/robots.txt`, `/sitemap.xml`, `/llms.txt` (all server-rendered)

## Data & Configuration

- **Structured data**: All content lives in [src/lib/data/](src/lib/data/):
  - `services.ts` - All services defined here; exports `featuredServices` subset (4 items used on homepage)
  - `serviceAreas.ts` - Service areas with climateContext, seasonalTips, localFaqs, testimonials, galleryItems per area
  - `testimonials.ts` - Customer reviews with ratings
  - `blog.ts` - Blog posts with markdown content, featuredImage, relatedServices
  - `galleryItems.ts` - Project gallery with categories (siding, roofing, carpentry, etc.)
  - `benefits.ts` - "Why Choose Us" benefits and process steps
  - `faq.ts` - General FAQs by category
- **Constants**: [src/lib/utils/constants.ts](src/lib/utils/constants.ts) exports:
  - `BUSINESS_INFO` - Name, phone, email, address, hours, discounts, service radius
  - `SERVICE_AREAS` - Array of 21 area names
  - `SERVICE_OPTIONS` - Canonical list of service names for form validation
  - `PROMOTIONAL_BADGES`, `STATS`, `KEYWORDS` - Marketing content
  - `FEATURED_AREAS`, `FEATURED_AREAS_SET` - Featured service areas for homepage display
- **Config flags**: [src/lib/config/siteConfig.ts](src/lib/config/siteConfig.ts) reads `VITE_ENABLE_*` envs for feature toggles
- **Environment vars**: `VITE_GA_MEASUREMENT_ID`, `VITE_ENABLE_*` toggles, `VITE_BUSINESS_EMAIL/PHONE` (client-side), `ADMIN_EMAIL` (server-side email recipient), `VITE_SITE_URL` (default `https://lrsunrise.com`), `RATE_LIMIT_WINDOW_SECONDS` (default 60), `RATE_LIMIT_MAX` (default 5)

## SEO & Analytics

- **SEO utilities**: [src/lib/utils/seo.ts](src/lib/utils/seo.ts) provides `createLocalBusinessSchema`, `createServiceSchema`, `createBreadcrumbSchema`, `createFAQSchema`, `formatPricing`
- **Schema markup**: Use [SchemaMarkup.svelte](src/lib/components/SchemaMarkup.svelte) for JSON-LD injection; supports LocalBusiness, BreadcrumbList, FAQPage schemas
- **Analytics**: [src/lib/utils/analytics.ts](src/lib/utils/analytics.ts) injects GA4 when `VITE_GA_MEASUREMENT_ID` is valid (not placeholder G-XXXXXXXXXX); tracking helpers are no-ops when GA absent. Call only in browser context.
- **Schema alignment**: When adding services/locations, keep `SERVICE_AREAS`, `SERVICE_OPTIONS` in [constants.ts](src/lib/utils/constants.ts) and JSON-LD schemas synchronized
- **Meta tags pattern**: Each page sets `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph, and Twitter meta tags in `<svelte:head>`

## Forms & Validation

- **Contact form**: [ContactForm.svelte](src/lib/components/ContactForm.svelte) and [Hero.svelte](src/lib/components/Hero.svelte) both have contact forms using `validateContactForm` from [validation.ts](src/lib/utils/validation.ts)
- **Service validation**: Forms import **SERVICE_OPTIONS** from constants.ts for `<select>` values; [src/routes/api/contact/+server.ts](src/routes/api/contact/+server.ts) also validates against SERVICE_OPTIONS server-side
- **Phone formatting**: `formatPhoneNumber` in [format.ts](src/lib/utils/format.ts) formats as (XXX) XXX-XXXX with cursor position preservation
- **API endpoint**: [src/routes/api/contact/+server.ts](src/routes/api/contact/+server.ts) handles form submission with rate limiting and sends email to `ADMIN_EMAIL`

## UI Components & Styling

- **Core components**: 
  - `Hero.svelte` - Homepage hero with embedded contact form, background image, promotional badges
  - `Navigation.svelte` - Sticky nav with desktop dropdowns for Services/Areas, mobile slide-out menu with collapsible sections, phone number in header
  - `Footer.svelte` - Large contact section + quick links + service links + contact info
  - `CTA.svelte` - Call-to-action section with secondary navigation cards
  - `ServiceCard.svelte`, `TestimonialCard.svelte`, `BlogPostCard.svelte` - Card components
  - `ServiceAreaPage.svelte` - Reusable template for dynamic service area pages with FAQs, testimonials, gallery
  - `ContactCard.svelte`, `ContactForm.svelte` - Contact UI elements
  - `SchemaMarkup.svelte` - JSON-LD script injection
- **Tailwind theme**: [tailwind.config.js](tailwind.config.js) extends colors:
  - primary: #4CAF50 (green)
  - secondary: #AED581 (light green)
  - accent: #FFA726 (orange) - **use for urgent CTAs**
  - neutral shades for backgrounds
- **Global styles**: [src/app.css](src/app.css) defines `.btn`, `.nav-link`, `.mobile-nav-link` utility classes
- **Accessibility**: Components include aria-labels, aria-expanded, focus states; follow these patterns

## Deployment & DevOps

- **Primary target**: Cloudflare Pages via adapter-cloudflare (outputs to `.svelte-kit/cloudflare/`); config in [wrangler.jsonc](wrangler.jsonc)
- **Alternative deployments**: Docker via [Dockerfile](Dockerfile) (multi-stage alpine build, port 3000, healthcheck at `/health`); OCI via [build_spec.yml](build_spec.yml) for OCI DevOps pipelines; Kubernetes manifests in [k8s-deployment.yaml](k8s-deployment.yaml), [k8s-service.yaml](k8s-service.yaml), [k8s-ingress.yaml](k8s-ingress.yaml)
- **Build artifacts**: Cloudflare uses `.svelte-kit/cloudflare/` output; OCI DevOps copies to `dist/` with production deps
- **Makefile**: [Makefile](Makefile) provides shortcuts: `make install|dev|build|check|docker-build|deploy-k8s`

## Development Workflow

- **Quality checks**: Run `npm run check` (svelte-check + tsc) before commits; no dedicated test suite exists yet
- **Content updates**: Prefer editing structured data files in `src/lib/data/` over hardcoding copy in components
- **SSR safety**: Always guard browser APIs (window/document) with `typeof window !== 'undefined'` or `onMount`; [analytics.ts](src/lib/utils/analytics.ts) shows proper patterns
- **Svelte transitions**: Use `fade`, `slide` from `svelte/transition` with `quintOut` easing for smooth animations

## Key Files Reference

### Config Files
- [svelte.config.js](svelte.config.js), [vite.config.ts](vite.config.ts), [tailwind.config.js](tailwind.config.js)
- [wrangler.jsonc](wrangler.jsonc) - Cloudflare Pages config

### Data Files (src/lib/data/)
- `services.ts` - Services array + `featuredServices` export (4 items for homepage)
- `serviceAreas.ts` - Service areas with rich content (FAQs, testimonials, gallery per area)
- `testimonials.ts` - Customer reviews
- `blog.ts` - Blog posts with markdown content
- `galleryItems.ts` - Project gallery items with categories
- `benefits.ts` - "Why Choose Us" benefits and process steps
- `faq.ts` - General FAQs

### Utils (src/lib/utils/)
- `constants.ts` - BUSINESS_INFO, SERVICE_AREAS, SERVICE_OPTIONS, STATS, KEYWORDS
- `seo.ts` - Schema creation functions
- `validation.ts` - Form validation
- `analytics.ts` - GA4 integration
- `format.ts` - Phone formatting

### Types
- [src/lib/types/index.ts](src/lib/types/index.ts) - Service, ServiceArea, Testimonial, BlogPost, GalleryItem, ContactFormData

### Static Assets
- [static/images/](static/images/) - Project photos, service images, blog images
- All images should be WebP format, max 1920px wide, <200KB each

## Task Tracking

All tasks are tracked in [src/lib/assets/fixes.md](src/lib/assets/fixes.md). Key components referenced:
- `Navigation.svelte` - Desktop/mobile navigation with dropdowns
- `GoogleMap.svelte` - Embedded maps for service areas and contact page
- `BeforeAfterSlider.svelte` - Image comparison slider for gallery
- `FloatingCTA.svelte`, `ExitIntentPopup.svelte` - Conversion optimization components
