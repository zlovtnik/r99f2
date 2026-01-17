# RCLabs Starter Template - Development Specification & Roadmap

**Project Codename:** `r99f2` (Starter Template)  
**Maintainer:** RCLabs (Solo Software Engineer Owner)  
**Template Purpose:** Rapid deployment of SEO-optimized local business websites  
**Current Version:** 0.0.1  
**Last Updated:** January 14, 2026  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture Overview](#2-architecture-overview)
3. [Current Capabilities](#3-current-capabilities)
4. [Gap Analysis & Improvements](#4-gap-analysis--improvements)
5. [Roadmap](#5-roadmap)
6. [Task Backlog](#6-task-backlog)
7. [Template Customization Guide](#7-template-customization-guide)
8. [Deployment Matrix](#8-deployment-matrix)
9. [Quality Gates](#9-quality-gates)

---

## 1. Executive Summary

### 1.1 Vision

This project serves as RCLabs' **white-label starter template** for rapidly deploying SEO-optimized, conversion-focused websites for local service businesses (contractors, home services, professional services). The goal is to minimize time-to-deployment while maximizing quality and customizability.

### 1.2 Core Value Proposition

| Aspect | Current State | Target State |
|--------|---------------|--------------|
| **Time to deploy new client** | 2-3 days | < 4 hours |
| **SEO readiness** | ✅ Strong | ✅ Excellent |
| **Customization effort** | Medium | Low (config-driven) |
| **Multi-tenant support** | ❌ None | ✅ Full config isolation |
| **Testing coverage** | ❌ None | 80%+ critical paths |
| **Documentation** | Partial | Comprehensive |

### 1.3 Tech Stack Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                         │
│  SvelteKit 2 + Svelte 5 │ Tailwind CSS 3.4 │ TypeScript         │
├─────────────────────────────────────────────────────────────────┤
│                      BUILD & TOOLING                            │
│  Vite 7 │ Bun 1.2 │ PostCSS │ ESLint │ Prettier                │
├─────────────────────────────────────────────────────────────────┤
│                      SEO & ANALYTICS                            │
│  JSON-LD Schemas │ GA4 │ Dynamic Sitemap │ robots.txt          │
├─────────────────────────────────────────────────────────────────┤
│                      DEPLOYMENT OPTIONS                         │
│  Cloudflare Pages (primary) │ Docker │ Kubernetes │ OCI        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Architecture Overview

### 2.1 Directory Structure Philosophy

```
src/
├── lib/
│   ├── components/     # Reusable UI components (client-agnostic)
│   ├── config/         # Client-specific configuration
│   ├── data/           # Content data (services, testimonials, FAQs)
│   ├── types/          # TypeScript interfaces
│   └── utils/          # Business logic, validation, SEO helpers
├── routes/
│   ├── api/            # Backend endpoints (contact, analytics)
│   ├── services/       # Dynamic service pages
│   ├── service-areas/  # Location-based landing pages
│   └── [content]/      # Static content pages
└── static/             # Images, favicon, static assets
```

### 2.2 Data Flow Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   constants.ts  │────▶│   Data Files     │────▶│   Components    │
│  (Source of     │     │  (services.ts,   │     │  (ServiceCard,  │
│   Truth)        │     │   areas.ts...)   │     │   Hero, etc.)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  validation.ts  │     │    seo.ts        │     │    Routes       │
│  (Form rules)   │     │  (Schema gen)    │     │  (+page.svelte) │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

### 2.3 Environment Configuration Model

| Layer | Variables | Purpose |
|-------|-----------|---------|
| **Client Display** | `VITE_BUSINESS_*`, `VITE_SITE_URL` | UI rendering |
| **Feature Flags** | `VITE_ENABLE_*` | Toggle features |
| **Server-side** | `ADMIN_EMAIL`, `RATE_LIMIT_*` | API behavior |
| **Analytics** | `VITE_GA_MEASUREMENT_ID` | Tracking |

---

## 3. Current Capabilities

### 3.1 Features Matrix

| Feature | Status | Quality |
|---------|--------|---------|
| Home page with Hero, Services, Testimonials | ✅ | High |
| Dynamic service pages (`/services/[slug]`) | ✅ | High |
| Dynamic service area pages (`/service-areas/[city]`) | ✅ | High |
| Contact form with validation | ✅ | High |
| Rate-limited API endpoint | ✅ | High |
| Email dispatch (SMTP) | ✅ | Medium |
| JSON-LD structured data | ✅ | High |
| Dynamic sitemap.xml | ✅ | High |
| Dynamic robots.txt | ✅ | High |
| GA4 analytics integration | ✅ | Medium |
| Blog/resource section | ✅ | Medium |
| Gallery page | ✅ | Basic |
| FAQ page | ✅ | High |
| Testimonials page | ✅ | High |
| Health check endpoint | ✅ | Basic |
| LLMs.txt for AI crawlers | ✅ | Basic |

### 3.2 SEO Readiness

| SEO Element | Implementation |
|-------------|----------------|
| Title tags | ✅ Per-page customization |
| Meta descriptions | ✅ Per-page customization |
| Canonical URLs | ✅ Automatic |
| Open Graph tags | ✅ Full implementation |
| Twitter cards | ✅ Full implementation |
| LocalBusiness schema | ✅ Automatic generation |
| Service schema | ✅ Per-service pages |
| BreadcrumbList schema | ✅ Available |
| FAQ schema | ✅ On FAQ page |

### 3.3 Deployment Readiness

| Platform | Config Files | Status |
|----------|--------------|--------|
| Cloudflare Pages | `wrangler.toml`, `adapter-cloudflare` | ✅ Production-ready |
| Docker | `Dockerfile`, `Makefile` | ✅ Production-ready |
| Kubernetes | `k8s-*.yaml`, deploy scripts | ✅ Ready |
| OCI DevOps | `build_spec.yml` | ✅ Ready |
| Vercel | Adapter available | ⚠️ Needs swap |

---

## 4. Gap Analysis & Improvements

### 4.1 Critical Gaps

| Gap | Impact | Priority |
|-----|--------|----------|
| No automated tests | High risk of regressions | 🔴 P0 |
| No client config generator | Slow onboarding | 🔴 P0 |
| No input sanitization on display | XSS risk, security vulnerability | 🔴 P0 |
| Email service hardcoded | Limited email providers | 🟡 P1 |
| No CMS integration | Manual content updates | 🟡 P1 |
| No image optimization pipeline | Performance | 🟡 P1 |

### 4.2 Enhancement Opportunities

| Enhancement | Business Value |
|-------------|----------------|
| Multi-language support (i18n) | Expand client base |
| Dark mode | Modern UX |
| A/B testing framework | Conversion optimization |
| Form builder component | Rapid customization |
| Admin dashboard | Client self-service |
| Webhook integrations | CRM, scheduling tools |
| Payment integration | Service deposits |

### 4.3 Technical Debt

| Item | Description | Effort |
|------|-------------|--------|
| Inconsistent adapter config | README mentions Vercel, config uses Cloudflare | Low |
| Missing error boundaries | No graceful error handling | Medium |
| No loading states for async | UX improvement needed | Low |
| Rate limiter not distributed | Won't scale horizontally | Medium |

---

## 5. Roadmap

### Phase 1: Foundation Hardening (Weeks 1-2)

**Objective:** Make the template production-grade and client-ready

```
Week 1: Quality & Testing
├── Set up Vitest + Testing Library
├── Write tests for validation utilities
├── Write tests for API endpoints
├── Add component tests for critical UI
└── Set up CI/CD pipeline with tests

Week 2: Configuration & Onboarding
├── Create client config generator CLI
├── Externalize all client-specific values
├── Create .env.example with documentation
├── Build initialization script
└── Document customization workflow
```

### Phase 2: Feature Completion (Weeks 3-4)

**Objective:** Add missing features for full-service offering

```
Week 3: Email & Integrations
├── Abstract email service (support multiple providers)
├── Add Resend/SendGrid/Mailgun support
├── Implement webhook system for form submissions
├── Add Zapier/n8n integration hooks
└── Create CRM integration templates

Week 4: Content & Media
├── Add image optimization pipeline
├── Implement lazy loading for images
├── Add WebP/AVIF auto-conversion
├── Create content validation scripts
└── Add markdown support for blog posts
```

### Phase 3: Scale & Monetization (Weeks 5-8)

**Objective:** Enable multi-client management and premium features

```
Week 5-6: Multi-tenant Architecture
├── Design config-per-client structure
├── Build client management CLI
├── Create deployment automation
├── Add client-specific analytics
└── Build usage/billing tracking

Week 7-8: Premium Features
├── Add booking/scheduling integration
├── Implement payment gateway (Stripe)
├── Create client portal/dashboard
├── Add review management integration
└── Build performance monitoring
```

### Phase 4: Growth & Polish (Ongoing)

**Objective:** Continuous improvement and competitive advantage

```
Ongoing Improvements:
├── A/B testing framework
├── Multi-language support (i18n)
├── Dark mode theming
├── Accessibility audit & fixes
├── Performance optimization
├── SEO monitoring integration
└── AI-powered content suggestions
```

---

## 6. Task Backlog

### 6.1 🔴 P0 - Critical (Must Do Before Next Client)

#### TASK-001: Set Up Testing Infrastructure
- **Description:** Initialize Vitest with Svelte Testing Library, create test utilities
- **Acceptance Criteria:**
  - [ ] `bun test` runs successfully
  - [ ] Coverage reporting enabled
  - [ ] CI blocks on test failures
- **Effort:** 4 hours
- **Files to create:**
  - `vitest.config.ts`
  - `src/lib/utils/__tests__/validation.test.ts`
  - `src/routes/api/contact/__tests__/server.test.ts`

#### TASK-002: Create Client Configuration Generator
- **Description:** CLI tool to scaffold new client configs from prompts
- **Acceptance Criteria:**
  - [ ] `bun run init:client` prompts for business info
  - [ ] Generates `.env`, updates constants.ts
  - [ ] Creates client-specific data files
- **Effort:** 8 hours
- **Files to create:**
  - `scripts/init-client.ts`
  - `templates/env.template`
  - `templates/constants.template.ts`

#### TASK-003: Write Core Validation Tests
- **Description:** Test coverage for all validation functions
- **Acceptance Criteria:**
  - [ ] `validateContactForm` fully tested
  - [ ] `validateEmail` fully tested
  - [ ] Edge cases covered (XSS, injection)
- **Effort:** 3 hours
- **Files to create:**
  - `src/lib/utils/__tests__/validation.test.ts`

#### TASK-004: Write API Endpoint Tests
- **Description:** Integration tests for contact API
- **Acceptance Criteria:**
  - [ ] Success path tested
  - [ ] Validation error paths tested
  - [ ] Rate limiting tested
  - [ ] Email dispatch mocked
- **Effort:** 4 hours
- **Files to create:**
  - `src/routes/api/contact/__tests__/+server.test.ts`

#### TASK-005: Fix Documentation Inconsistencies
- **Description:** Align README, copilot-instructions, and actual config
- **Acceptance Criteria:**
  - [ ] README reflects Cloudflare adapter (not Vercel)
  - [ ] All env vars documented in one place
  - [ ] Deployment instructions verified
- **Effort:** 2 hours
- **Files to modify:**
  - `README.md`
  - `.github/copilot-instructions.md`

#### TASK-006: Implement Input Sanitization on Display (XSS Prevention)
- **Description:** No input sanitization on display - XSS risk identified in security review
- **Acceptance Criteria:**
  - [ ] All user-generated content is sanitized before rendering
  - [ ] HTML entities are escaped in form displays and error messages
  - [ ] Output escaping applied to dynamic content (testimonials, form submissions, etc.)
  - [ ] Content Security Policy (CSP) headers configured in `wrangler.toml` or response headers
  - [ ] Svelte `{@html}` usage audited and secured with DOMPurify or equivalent
- **Effort:** 4 hours
- **Remediation Steps:**
  1. Audit all `{@html}` usages in Svelte components
  2. Implement `escapeHtml()` utility for all user input display
  3. Add DOMPurify for any required rich HTML rendering
  4. Configure CSP headers with nonce support (recommended for Tailwind + SvelteKit):
     - Use `style-src 'self' 'nonce-%sveltekit.nonce%'` in SvelteKit's CSP config
     - Alternative: Extract critical CSS and use hash-based CSP
     - Note: `'unsafe-inline'` weakens XSS protection; use nonce-based CSP as the preferred approach
  5. Add automated XSS test cases to validation test suite
- **Files to modify:**
  - `src/lib/utils/validation.ts` (add sanitization exports)
  - `src/lib/components/*.svelte` (audit and fix)
  - `wrangler.toml` or `static/_headers` (CSP config)
  - `src/lib/utils/__tests__/validation.test.ts` (XSS test cases)

---

### 6.2 🟡 P1 - High Priority (Next Sprint)

#### TASK-010: Abstract Email Service
- **Description:** Create email provider interface, support multiple providers
- **Acceptance Criteria:**
  - [ ] `EmailProvider` interface defined
  - [ ] SMTP implementation exists
  - [ ] Resend implementation exists
  - [ ] Provider selected via env var
- **Effort:** 6 hours
- **Files to create/modify:**
  - `src/lib/utils/email/index.ts`
  - `src/lib/utils/email/providers/smtp.ts`
  - `src/lib/utils/email/providers/resend.ts`
  - `src/lib/utils/email/types.ts`

#### TASK-011: Image Optimization Pipeline
- **Description:** Auto-optimize images on build, lazy loading
- **Acceptance Criteria:**
  - [ ] Images converted to WebP
  - [ ] Responsive srcset generated
  - [ ] Lazy loading implemented
  - [ ] Build time acceptable (< 60s)
- **Effort:** 6 hours
- **Files to create/modify:**
  - `vite.config.ts` (add image plugin)
  - `src/lib/components/OptimizedImage.svelte`

#### TASK-012: Add Error Boundaries
- **Description:** Graceful error handling throughout app
- **Acceptance Criteria:**
  - [ ] `+error.svelte` handles all error types
  - [ ] API errors show user-friendly messages
  - [ ] Error logging to console/service
- **Effort:** 4 hours
- **Files to modify:**
  - `src/routes/+error.svelte`
  - `src/lib/components/ErrorBoundary.svelte`

#### TASK-013: Component Loading States
- **Description:** Add skeleton loaders, loading indicators
- **Acceptance Criteria:**
  - [ ] Form submission shows spinner
  - [ ] Page transitions smooth
  - [ ] Skeleton loaders for data-heavy sections
- **Effort:** 3 hours
- **Files to modify:**
  - `src/lib/components/ContactForm.svelte`
  - `src/lib/components/LoadingSpinner.svelte` (enhance)
  - `src/lib/components/SkeletonLoader.svelte` (enhance)

#### TASK-014: Webhook System for Form Submissions
- **Description:** POST form data to configured webhooks
- **Acceptance Criteria:**
  - [ ] `WEBHOOK_URL` env var support
  - [ ] Async webhook calls (non-blocking)
  - [ ] Retry logic for failures
  - [ ] Webhook payload documented
- **Effort:** 4 hours
- **Files to modify:**
  - `src/routes/api/contact/+server.ts`
  - `src/lib/utils/webhook.ts` (new)

#### TASK-015: Create .env.example with Full Documentation
- **Description:** Comprehensive example env file
- **Acceptance Criteria:**
  - [ ] All env vars listed with descriptions
  - [ ] Default values where appropriate
  - [ ] Grouped by category (client, server, features)
- **Effort:** 1 hour
- **Files to create:**
  - `.env.example`

---

### 6.3 🟢 P2 - Medium Priority (Backlog)

#### TASK-020: Multi-language Support (i18n)
- **Description:** Internationalization framework
- **Acceptance Criteria:**
  - [ ] Language files structure defined
  - [ ] Language switcher component
  - [ ] URL-based locale routing
  - [ ] SEO tags per language
- **Effort:** 12 hours

#### TASK-021: Dark Mode Support
- **Description:** Toggle between light/dark themes
- **Acceptance Criteria:**
  - [ ] Theme toggle component
  - [ ] Persistent preference (localStorage)
  - [ ] System preference detection
  - [ ] All components themed
- **Effort:** 8 hours

#### TASK-022: A/B Testing Framework
- **Description:** Simple A/B test infrastructure
- **Acceptance Criteria:**
  - [ ] Variant assignment utility
  - [ ] Analytics event tracking
  - [ ] Cookie-based persistence
  - [ ] Documentation for usage
- **Effort:** 6 hours

#### TASK-023: Booking/Scheduling Integration
- **Description:** Embed Calendly/Cal.com or similar
- **Acceptance Criteria:**
  - [ ] Booking widget component
  - [ ] Config for booking URL
  - [ ] CTA integration
- **Effort:** 4 hours

#### TASK-024: Review Management Integration
- **Description:** Display Google/Yelp reviews
- **Acceptance Criteria:**
  - [ ] Reviews fetch utility
  - [ ] Review display component
  - [ ] Cache layer for API limits
- **Effort:** 8 hours

#### TASK-025: Performance Monitoring
- **Description:** Core Web Vitals tracking
- **Acceptance Criteria:**
  - [ ] Web Vitals SDK integrated
  - [ ] Metrics sent to analytics
  - [ ] Performance budget defined
- **Effort:** 4 hours

---

### 6.4 🔵 P3 - Nice to Have (Future)

#### TASK-030: Admin Dashboard
- **Description:** Client self-service portal
- **Effort:** 40+ hours

#### TASK-031: CMS Integration (Sanity/Contentful)
- **Description:** Headless CMS for content management
- **Effort:** 20+ hours

#### TASK-032: Payment Integration (Stripe)
- **Description:** Accept deposits/payments
- **Effort:** 16+ hours

#### TASK-033: Multi-tenant Management CLI
- **Description:** Manage multiple client deployments
- **Effort:** 24+ hours

#### TASK-034: AI Content Suggestions
- **Description:** GPT-powered content generation
- **Effort:** 16+ hours

---

## 7. Template Customization Guide

### 7.1 Quick Start for New Client

```bash
# 1. Clone the template
git clone https://github.com/rclabs/r99f2 client-name
cd client-name

# 2. Install dependencies
bun install

# 3. Run initialization (TASK-002)
bun run init:client

# 4. Update content files
# Edit: src/lib/data/services.ts
# Edit: src/lib/data/serviceAreas.ts
# Edit: src/lib/data/testimonials.ts

# 5. Replace images
# Add to: static/images/

# 6. Test locally
bun dev

# 7. Deploy
bun run deploy
```

### 7.2 Configuration Checklist

| File | What to Change |
|------|----------------|
| `.env` | All business info, API keys |
| `src/lib/utils/constants.ts` | `BUSINESS_INFO`, `SERVICE_AREAS`, `SERVICE_OPTIONS` |
| `src/lib/config/siteConfig.ts` | Site metadata, feature flags |
| `src/lib/data/services.ts` | Service catalog |
| `src/lib/data/serviceAreas.ts` | Coverage areas |
| `src/lib/data/testimonials.ts` | Customer reviews |
| `src/lib/data/faq.ts` | FAQ content |
| `tailwind.config.js` | Brand colors (primary, secondary, accent) |
| `static/images/` | Logo, hero images, service photos |

### 7.3 Branding Customization

```javascript
// tailwind.config.js - Update these for client branding
colors: {
  primary: '#4CAF50',    // Main brand color
  secondary: '#AED581',  // Secondary/hover color
  accent: '#FFA726',     // CTA/highlight color
  neutral: {
    50: '#f9fafb',
    // ... grayscale palette
  }
}
```

---

## 8. Deployment Matrix

### 8.1 Platform Comparison

| Platform | Cost | Complexity | Best For |
|----------|------|------------|----------|
| **Cloudflare Pages** | Free-$20/mo | Low | Most clients |
| **Vercel** | Free-$20/mo | Low | JS-heavy sites |
| **Docker/VPS** | $5-20/mo | Medium | Full control |
| **Kubernetes** | $50+/mo | High | Enterprise |
| **OCI** | Pay-as-go | Medium | Oracle clients |

### 8.2 Deployment Commands

```bash
# Cloudflare Pages (recommended)
make deploy

# Docker
make docker-build
docker run -p 3000:3000 r99f2

# Kubernetes
make deploy-k8s
```

---

## 9. Quality Gates

### 9.1 Pre-Deployment Checklist

- [ ] `bun run check` passes (TypeScript, Svelte)
- [ ] `bun test` passes (when tests exist)
- [ ] All env vars configured
- [ ] Images optimized (< 200KB each)
- [ ] Mobile responsive verified
- [ ] Forms tested end-to-end
- [ ] Schema markup validated (Google Rich Results Test)
- [ ] Lighthouse score > 90 (Performance, SEO)
- [ ] Contact form sends email successfully
- [ ] All links working (no 404s)

### 9.2 Performance Budgets

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | TBD |
| Largest Contentful Paint | < 2.5s | TBD |
| Cumulative Layout Shift | < 0.1 | TBD |
| Total Bundle Size | < 200KB | TBD |
| Image Total Size | < 1MB | TBD |

### 9.3 SEO Requirements

| Requirement | Status |
|-------------|--------|
| Unique title per page | ✅ |
| Unique meta description per page | ✅ |
| Canonical URLs | ✅ |
| Structured data (Schema.org) | ✅ |
| Mobile-friendly | ✅ |
| HTTPS | ✅ (via platform) |
| XML sitemap | ✅ |
| robots.txt | ✅ |

---

## Appendix A: File Reference

### Key Files by Category

**Configuration:**
- `svelte.config.js` - SvelteKit configuration
- `vite.config.ts` - Build configuration
- `tailwind.config.js` - Styling/theming
- `wrangler.toml` - Cloudflare config

**Data (Edit per client):**
- `src/lib/utils/constants.ts` - Business info, service lists
- `src/lib/data/services.ts` - Service catalog
- `src/lib/data/serviceAreas.ts` - Coverage areas
- `src/lib/data/testimonials.ts` - Reviews
- `src/lib/data/faq.ts` - FAQs

**Components (Rarely edit):**
- `src/lib/components/Hero.svelte`
- `src/lib/components/ContactForm.svelte`
- `src/lib/components/ServiceCard.svelte`
- `src/lib/components/Navigation.svelte`
- `src/lib/components/Footer.svelte`

**API (Rarely edit):**
- `src/routes/api/contact/+server.ts`
- `src/routes/api/analytics/+server.ts`

---

## Appendix B: Sprint Planning Template

### Sprint Template

```markdown
## Sprint [N]: [Theme]
**Duration:** [Start Date] - [End Date]
**Goal:** [One-sentence objective]

### Committed Tasks
- [ ] TASK-XXX: [Title] (X hours)
- [ ] TASK-XXX: [Title] (X hours)

### Stretch Goals
- [ ] TASK-XXX: [Title]

### Blockers/Risks
- [List any known blockers]

### Definition of Done
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Deployed to staging
```

---

*Document Version: 1.0.0*  
*Last Updated: January 14, 2026*  
*Maintainer: RCLabs*
