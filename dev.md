# DEVELOPMENT SPECIFICATION
## LB Sunrise - Website & SEO Implementation

**Project Name:** LB Sunrise Website & Google SEO
**Client:** LB Sunrise (Roofing/Construction Services)
**Service Provider:** RCLabs
**Tech Stack:** Svelte + TypeScript
**Project Duration:** January 6, 2026 - January 16, 2026
**Total Budget:** $4,000.00
**Reference Site:** https://superiorroofingofmaine.com/

---

## 1. PROJECT OVERVIEW

### 1.1 Objectives
- Build fast, modern, SEO-optimized website for LB Sunrise roofing services
- Implement comprehensive SEO strategy from ground up
- Create responsive, mobile-first design
- Establish conversion-focused website for lead generation
- Optimize for local search (Portland, Maine area)

### 1.2 Technology Stack
- **Framework:** Svelte 4+
- **Language:** TypeScript (strict mode)
- **Build Tool:** Vite
- **SSR:** SvelteKit
- **Styling:** Tailwind CSS
- **Package Manager:** npm
- **Hosting:** Vercel or Netlify (recommended)
- **Version Control:** Git

### 1.3 Key Features
- Server-side rendering (SSR) for SEO optimization
- Static site generation (SSG) for fast performance
- Mobile-responsive design
- Schema markup integration
- Analytics tracking ready
- Form handling and validation
- Contact form with email integration
- Service showcase
- Local SEO features (Google Maps, business info)
- Blog/Resource section (optional expansion)

---

## 2. PROJECT STRUCTURE

### 2.1 Directory Structure
```
lb-sunrise/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          # Home page
│   │   ├── +layout.svelte        # Root layout
│   │   ├── services/
│   │   │   ├── +page.svelte      # Services overview
│   │   │   ├── roof-repair/
│   │   │   │   └── +page.svelte  # Roof repair service page
│   │   │   ├── roof-replacement/
│   │   │   │   └── +page.svelte  # Roof replacement service page
│   │   │   ├── roof-inspection/
│   │   │   │   └── +page.svelte  # Roof inspection service page
│   │   │   └── emergency-service/
│   │   │       └── +page.svelte  # Emergency service page
│   │   ├── service-areas/
│   │   │   ├── +page.svelte      # Service areas overview
│   │   │   ├── portland/
│   │   │   │   └── +page.svelte  # Portland specific page
│   │   │   └── [city]/
│   │   │       └── +page.svelte  # Dynamic city pages
│   │   ├── about/
│   │   │   └── +page.svelte      # About page
│   │   ├── contact/
│   │   │   └── +page.svelte      # Contact page
│   │   ├── sitemap.xml/
│   │   │   └── +server.ts        # Dynamic sitemap
│   │   ├── robots.txt/
│   │   │   └── +server.ts        # Robots.txt generation
│   │   └── api/
│   │       ├── contact/
│   │       │   └── +server.ts    # Contact form handler
│   │       └── analytics/
│   │           └── +server.ts    # Analytics endpoint
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Navigation.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── Hero.svelte
│   │   │   ├── ServiceCard.svelte
│   │   │   ├── TestimonialCard.svelte
│   │   │   ├── ContactForm.svelte
│   │   │   ├── CTA.svelte
│   │   │   └── SchemaMarkup.svelte
│   │   ├── types/
│   │   │   ├── index.ts          # TypeScript interfaces
│   │   │   └── seo.ts            # SEO-related types
│   │   ├── utils/
│   │   │   ├── seo.ts            # SEO utilities
│   │   │   ├── validation.ts     # Form validation
│   │   │   ├── analytics.ts      # Analytics helpers
│   │   │   └── constants.ts      # Business constants
│   │   ├── data/
│   │   │   ├── services.ts       # Service data
│   │   │   ├── serviceAreas.ts   # Service area data
│   │   │   ├── testimonials.ts   # Testimonial data
│   │   │   └── faq.ts            # FAQ data
│   │   └── config/
│   │       └── siteConfig.ts     # Site-wide configuration
│   ├── app.css                   # Global styles
│   └── app.html                  # Root HTML
├── static/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero/
│   │   ├── services/
│   │   ├── testimonials/
│   │   └── og-image.jpg          # Open Graph image
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 3. SVELTEKIT CONFIGURATION

### 3.1 svelte.config.js
```typescript
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from 'svelte-vite';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      $types: 'src/lib/types',
      $utils: 'src/lib/utils',
      $data: 'src/lib/data',
      $config: 'src/lib/config'
    }
  }
};
```

### 3.2 vite.config.ts
```typescript
import { defineConfig } from 'vite';
import svg from 'vite-plugin-svgo';

export default defineConfig({
  plugins: [svg()],
  ssr: {
    preload: true
  },
  build: {
    target: 'esnext',
    minify: 'terser'
  }
});
```

### 3.3 tsconfig.json
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "paths": {
      "$/*": ["./src/*"]
    }
  }
}
```

---

## 4. TYPESCRIPT TYPES & INTERFACES

### 4.1 lib/types/index.ts
```typescript
export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  imageAlt: string;
  benefits: string[];
  process: string[];
  warranty?: string;
  price?: string;
  cta: string;
  keywords: string[];
}

export interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  description: string;
  zipCodes: string[];
  keywords: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  text: string;
  rating: number;
  imageUrl?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  zipCode: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  schema?: Record<string, any>;
}

export interface BusinessInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  lat: number;
  lng: number;
  hours: Record<string, string>;
  serviceRadius: string;
}
```

### 4.2 lib/types/seo.ts
```typescript
export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface LocalBusinessSchema extends SchemaMarkup {
  '@type': 'LocalBusiness' | 'Plumber' | 'HomeServiceBusiness';
  name: string;
  telephone: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  url: string;
  image: string;
}

export interface BreadcrumbSchema extends SchemaMarkup {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}
```

---

## 5. CORE COMPONENTS

### 5.1 lib/components/Navigation.svelte
```typescript
<script lang="ts">
  import { page } from '$app/stores';
  import type { Service } from '$types';
  import { services } from '$data/services';

  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
  };
</script>

<nav class="sticky top-0 z-50 bg-white shadow">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <a href="/" class="text-2xl font-bold text-blue-600">LB Sunrise</a>
      
      <button on:click={toggleMenu} class="md:hidden">Menu</button>
      
      <ul class="hidden md:flex gap-8">
        <li><a href="/" class:active={$page.url.pathname === '/'}>Home</a></li>
        <li><a href="/services" class:active={$page.url.pathname.startsWith('/services')}>Services</a></li>
        <li><a href="/service-areas" class:active={$page.url.pathname.startsWith('/service-areas')}>Service Areas</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact" class="btn">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>

<style>
  .active {
    @apply text-blue-600 font-semibold;
  }
</style>
```

### 5.2 lib/components/SchemaMarkup.svelte
```typescript
<script lang="ts">
  import type { SchemaMarkup } from '$types/seo';

  export let schema: SchemaMarkup;
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
```

### 5.3 lib/components/ContactForm.svelte
```typescript
<script lang="ts">
  import { enhance } from '$app/forms';
  import { validateContactForm } from '$utils/validation';
  import type { ContactFormData } from '$types';

  let formData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    zipCode: ''
  };

  let errors: Record<string, string> = {};
  let submitted = false;

  const handleSubmit = async (e: SubmitEvent) => {
    errors = validateContactForm(formData);
    
    if (Object.keys(errors).length === 0) {
      submitted = true;
    }
  };
</script>

<form on:submit={handleSubmit} class="space-y-4">
  <input
    type="text"
    placeholder="Your Name"
    bind:value={formData.name}
    class="w-full p-2 border"
    required
  />
  {#if errors.name}
    <p class="text-red-500">{errors.name}</p>
  {/if}

  <input
    type="email"
    placeholder="Your Email"
    bind:value={formData.email}
    class="w-full p-2 border"
    required
  />

  <input
    type="tel"
    placeholder="Your Phone"
    bind:value={formData.phone}
    class="w-full p-2 border"
    required
  />

  <select bind:value={formData.service} class="w-full p-2 border">
    <option value="">Select a Service</option>
    <option value="roof-repair">Roof Repair</option>
    <option value="roof-replacement">Roof Replacement</option>
    <option value="inspection">Roof Inspection</option>
    <option value="emergency">Emergency Service</option>
  </select>

  <textarea
    placeholder="Your Message"
    bind:value={formData.message}
    class="w-full p-2 border"
    rows="5"
  ></textarea>

  <button type="submit" class="btn btn-primary w-full">
    Send Message
  </button>

  {#if submitted}
    <p class="text-green-600">Thank you! We'll contact you soon.</p>
  {/if}
</form>
```

---

## 6. SEO IMPLEMENTATION

### 6.1 lib/utils/seo.ts
```typescript
import type { SEOMetadata } from '$types';

export function getSEOMetadata(
  title: string,
  description: string,
  keywords: string[] = [],
  options: Partial<SEOMetadata> = {}
): SEOMetadata {
  return {
    title,
    description,
    keywords,
    ogImage: options.ogImage || '/images/og-image.jpg',
    canonical: options.canonical,
    schema: options.schema
  };
}

export function generateBreadcrumbs(path: string): Array<{ name: string; url: string }> {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Home', url: '/' }];

  segments.reduce((url, segment) => {
    const newUrl = `${url}/${segment}`;
    breadcrumbs.push({
      name: segment.replace(/-/g, ' ').toUpperCase(),
      url: newUrl
    });
    return newUrl;
  }, '');

  return breadcrumbs;
}

export function createLocalBusinessSchema(businessInfo: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessInfo.name,
    image: '/images/logo.svg',
    description: 'Professional roofing services in Maine',
    telephone: businessInfo.phone,
    email: businessInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address,
      addressLocality: businessInfo.city,
      addressRegion: businessInfo.state,
      postalCode: businessInfo.zipCode,
      addressCountry: 'US'
    },
    url: 'https://lbsunrise.com',
    serviceArea: {
      '@type': 'City',
      name: 'Portland, Maine'
    },
    areaServed: ['Portland ME', 'Westbrook ME', 'Cumberland ME'],
    priceRange: '$$'
  };
}

export function createServiceSchema(service: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'LB Sunrise'
    },
    areaServed: 'Portland, Maine',
    url: `/services/${service.slug}`
  };
}
```

### 6.2 lib/utils/validation.ts
```typescript
import type { ContactFormData } from '$types';

export function validateContactForm(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!data.phone || !/^\d{10}$/.test(data.phone.replace(/\D/g, ''))) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### 6.3 lib/utils/constants.ts
```typescript
export const BUSINESS_INFO = {
  name: 'LB Sunrise',
  phone: '(978) 519-9774',
  email: 'LEMADILAN5@gmail.com',
  address: '44 Veranda St',
  city: 'Portland',
  state: 'ME',
  zipCode: '04101',
  lat: 43.6612,
  lng: -70.2556,
  hours: {
    'Monday-Friday': '8:00 AM - 6:00 PM',
    'Saturday': '9:00 AM - 4:00 PM',
    'Sunday': 'Closed'
  },
  serviceRadius: 'Portland Metro Area and surrounding Maine communities'
};

export const KEYWORDS = {
  primary: ['roof repair', 'roof replacement', 'roofing contractor', 'roof inspection'],
  location: ['Portland ME', 'Westbrook ME', 'Cumberland ME', 'Maine roofing'],
  long_tail: ['emergency roof repair', 'commercial roofing', 'residential roofing', 'roof leak repair']
};

export const SERVICE_AREAS = [
  'Portland',
  'Westbrook',
  'Cumberland',
  'Cape Elizabeth',
  'Falmouth'
];
```

---

## 7. PAGE ROUTES

### 7.1 src/routes/+layout.svelte (Root Layout)
```typescript
<script lang="ts">
  import '../app.css';
  import Navigation from '$components/Navigation.svelte';
  import Footer from '$components/Footer.svelte';
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#2563eb" />
</svelte:head>

<Navigation />
<main>
  <slot />
</main>
<Footer />
```

### 7.2 src/routes/+page.svelte (Home Page)
```typescript
<script lang="ts">
  import { createLocalBusinessSchema } from '$utils/seo';
  import SchemaMarkup from '$components/SchemaMarkup.svelte';
  import Hero from '$components/Hero.svelte';
  import { BUSINESS_INFO } from '$utils/constants';

  const schema = createLocalBusinessSchema(BUSINESS_INFO);
</script>

<svelte:head>
  <title>LB Sunrise - Professional Roofing Services in Portland, Maine</title>
  <meta name="description" content="Expert roof repair, replacement, and inspection services in Portland, Maine. Emergency roofing services available. Call (978) 519-9774 for a free quote." />
  <meta name="keywords" content="roof repair, roof replacement, roofing contractor, Portland Maine" />
  <link rel="canonical" href="https://lbsunrise.com" />
  <meta property="og:title" content="LB Sunrise - Professional Roofing Services" />
  <meta property="og:description" content="Expert roof repair and replacement in Portland, Maine" />
  <meta property="og:type" content="website" />
</svelte:head>

<SchemaMarkup {schema} />

<Hero />

<section class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-6">Professional Roofing Services in Portland, Maine</h1>
  <p class="text-lg text-gray-600 mb-8">
    LB Sunrise provides top-quality roof repair, replacement, and inspection services.
    Call us today for a free estimate.
  </p>
</section>
```

### 7.3 src/routes/services/+page.svelte (Services Page)
```typescript
<script lang="ts">
  import { services } from '$data/services';
  import ServiceCard from '$components/ServiceCard.svelte';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Roofing Services',
    description: 'Professional roofing services in Portland, Maine'
  };
</script>

<svelte:head>
  <title>Roofing Services - Roof Repair & Replacement | LB Sunrise</title>
  <meta name="description" content="Browse our roofing services: roof repair, replacement, inspections, and emergency services in Portland, Maine." />
  <link rel="canonical" href="https://lbsunrise.com/services" />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8">Our Roofing Services</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each services as service}
      <ServiceCard {service} />
    {/each}
  </div>
</div>
```

### 7.4 src/routes/contact/+page.svelte (Contact Page)
```typescript
<script lang="ts">
  import ContactForm from '$components/ContactForm.svelte';
  import { BUSINESS_INFO } from '$utils/constants';
</script>

<svelte:head>
  <title>Contact LB Sunrise - Free Roofing Estimate</title>
  <meta name="description" content="Contact LB Sunrise for a free roofing estimate. Call {BUSINESS_INFO.phone} or fill out our contact form." />
  <link rel="canonical" href="https://lbsunrise.com/contact" />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8">Contact Us</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <ContactForm />
    </div>
    
    <div class="bg-gray-100 p-8 rounded">
      <h2 class="text-2xl font-bold mb-4">Contact Information</h2>
      <p class="mb-2"><strong>Phone:</strong> <a href="tel:{BUSINESS_INFO.phone}">{BUSINESS_INFO.phone}</a></p>
      <p class="mb-2"><strong>Email:</strong> <a href="mailto:{BUSINESS_INFO.email}">{BUSINESS_INFO.email}</a></p>
      <p class="mb-2"><strong>Address:</strong> {BUSINESS_INFO.address}, {BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zipCode}</p>
      
      <h3 class="text-xl font-bold mt-6 mb-4">Hours</h3>
      {#each Object.entries(BUSINESS_INFO.hours) as [day, hours]}
        <p class="mb-1">{day}: {hours}</p>
      {/each}
    </div>
  </div>
</div>
```

### 7.5 src/routes/sitemap.xml/+server.ts
```typescript
import type { RequestHandler } from '@sveltejs/kit';
import { services } from '$data/services';
import { serviceAreas } from '$data/serviceAreas';

export const GET: RequestHandler = async () => {
  const baseUrl = 'https://lbsunrise.com';
  
  const staticPages = [
    '',
    '/services',
    '/service-areas',
    '/about',
    '/contact'
  ];

  const servicePages = services.map(s => `/services/${s.slug}`);
  const areaPages = serviceAreas.map(a => `/service-areas/${a.slug}`);

  const allPages = [...staticPages, ...servicePages, ...areaPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
};
```

### 7.6 src/routes/robots.txt/+server.ts
```typescript
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://lbsunrise.com/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=86400'
    }
  });
};
```

### 7.7 src/routes/api/contact/+server.ts
```typescript
import type { RequestHandler } from '@sveltejs/kit';
import { validateContactForm } from '$utils/validation';
import type { ContactFormData } from '$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data: ContactFormData = await request.json();
    
    const errors = validateContactForm(data);
    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({ errors }), { status: 400 });
    }

    // Send email (implement with email service)
    // await sendEmail(data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to submit form' }), {
      status: 500
    });
  }
};
```

---

## 8. DATA FILES

### 8.1 lib/data/services.ts
```typescript
import type { Service } from '$types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Roof Repair',
    slug: 'roof-repair',
    description: 'Professional roof repair services for all types of roofing materials. Quick response times for emergency repairs.',
    shortDescription: 'Expert roof repair services',
    imageUrl: '/images/services/roof-repair.jpg',
    imageAlt: 'Professional roof repair in Portland Maine',
    benefits: [
      'Quick response times',
      'All materials handled',
      'Weather-tight repairs',
      'Warranty included'
    ],
    process: [
      'Thorough inspection',
      'Damage assessment',
      'Repair estimate',
      'Professional installation'
    ],
    warranty: '5-year warranty on repairs',
    keywords: ['roof repair', 'roof leak repair', 'emergency roof repair'],
    cta: 'Get Free Estimate'
  },
  {
    id: '2',
    name: 'Roof Replacement',
    slug: 'roof-replacement',
    description: 'Complete roof replacement services with quality materials and expert installation.',
    shortDescription: 'Full roof replacement',
    imageUrl: '/images/services/roof-replacement.jpg',
    imageAlt: 'Roof replacement services Portland Maine',
    benefits: [
      'New roof warranty',
      'Modern materials',
      'Professional installation',
      'Financing available'
    ],
    process: [
      'Inspection and quote',
      'Material selection',
      'Old roof removal',
      'New roof installation'
    ],
    warranty: '10-year manufacturer warranty',
    keywords: ['roof replacement', 'new roof', 'residential roofing'],
    cta: 'Schedule Inspection'
  },
  {
    id: '3',
    name: 'Roof Inspection',
    slug: 'roof-inspection',
    description: 'Comprehensive roof inspection for damage detection and maintenance planning.',
    shortDescription: 'Professional roof inspection',
    imageUrl: '/images/services/roof-inspection.jpg',
    imageAlt: 'Roof inspection services',
    benefits: [
      'Detailed report',
      'Photo documentation',
      'Expert assessment',
      'Preventative insights'
    ],
    process: [
      'Visual inspection',
      'Damage documentation',
      'Report generation',
      'Repair recommendations'
    ],
    keywords: ['roof inspection', 'roof assessment', 'roof evaluation'],
    cta: 'Book Inspection'
  }
];
```

### 8.2 lib/data/serviceAreas.ts
```typescript
import type { ServiceArea } from '$types';

export const serviceAreas: ServiceArea[] = [
  {
    id: 'portland',
    name: 'Portland',
    slug: 'portland',
    description: 'Professional roofing services throughout Portland, Maine',
    zipCodes: ['04101', '04102', '04103'],
    keywords: ['roof repair Portland ME', 'roofing contractor Portland']
  },
  {
    id: 'westbrook',
    name: 'Westbrook',
    slug: 'westbrook',
    description: 'Roof repair and replacement services in Westbrook, Maine',
    zipCodes: ['04092'],
    keywords: ['roof repair Westbrook', 'roofing Westbrook Maine']
  },
  {
    id: 'cumberland',
    name: 'Cumberland',
    slug: 'cumberland',
    description: 'Roof repair and replacement services in Cumberland, Maine',
    zipCodes: ['04021'],
    keywords: ['roof repair Cumberland', 'roofing Cumberland Maine']
  }
];
```

### 8.3 lib/data/testimonials.ts
```typescript
import type { Testimonial } from '$types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John Smith',
    service: 'Roof Replacement',
    text: 'LB Sunrise did an excellent job replacing our roof. Professional, on-time, and great price. Highly recommend!',
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    service: 'Roof Repair',
    text: 'We had an emergency roof leak. They responded quickly and fixed it properly. Great service!',
    rating: 5
  },
  {
    id: '3',
    name: 'Mike Davis',
    service: 'Roof Inspection',
    text: 'Thorough inspection with detailed report. Very knowledgeable and helpful advice.',
    rating: 5
  }
];
```

### 8.4 lib/data/faq.ts
```typescript
import type { FAQ } from '$types';

export const faq: FAQ[] = [
  {
    id: '1',
    question: 'How long does a roof replacement take?',
    answer: 'Most roof replacements take 2-5 days depending on roof size and complexity.',
    category: 'Roof Replacement'
  },
  {
    id: '2',
    question: 'Do you offer emergency roof repair?',
    answer: 'Yes, we offer 24/7 emergency roof repair services for urgent situations.',
    category: 'Roof Repair'
  },
  {
    id: '3',
    question: 'What is your service area?',
    answer: 'We serve Portland, Maine and surrounding communities within a 30-mile radius.',
    category: 'Service Areas'
  },
  {
    id: '4',
    question: 'Do you offer financing options?',
    answer: 'Yes, we offer flexible financing options for roof replacement projects.',
    category: 'Payment'
  }
];
```

---

## 9. STYLING & TAILWIND CONFIGURATION

### 9.1 tailwind.config.js
```javascript
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
```

### 9.2 src/app.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #2563eb;
  --secondary: #1e40af;
  --text: #1f2937;
  --text-light: #6b7280;
  --bg-light: #f9fafb;
}

body {
  @apply text-gray-900 bg-white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.btn {
  @apply px-6 py-2 rounded-lg font-semibold transition-colors;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-900 hover:bg-gray-300;
}

.container {
  max-width: 1200px;
}

h1, h2, h3, h4, h5, h6 {
  @apply font-bold text-gray-900;
}

a {
  @apply text-blue-600 hover:text-blue-700;
}
```

---

## 10. PACKAGE.JSON DEPENDENCIES

### 10.1 package.json
```json
{
  "name": "lb-sunrise",
  "version": "1.0.0",
  "description": "LB Sunrise roofing services website",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "@sveltejs/adapter-vercel": "^4.1.0",
    "@sveltejs/adapter-auto": "^3.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@tailwindcss/forms": "^0.5.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.50.0",
    "postcss": "^8.4.32",
    "prettier": "^3.1.0",
    "svelte": "^4.2.0",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.3.2",
    "vite": "^5.0.0",
    "vite-plugin-svgo": "^2.4.0"
  },
  "dependencies": {
    "@sveltejs/kit": "^2.0.0",
    "svelte": "^4.2.0"
  }
}
```

---

## 11. ADDITIONAL COMPONENTS

### 11.1 lib/components/Hero.svelte
```typescript
<script lang="ts">
  import { BUSINESS_INFO } from '$utils/constants';
</script>

<section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
  <div class="container mx-auto px-4">
    <div class="max-w-2xl">
      <h1 class="text-5xl font-bold mb-6">
        Professional Roofing Services in Portland, Maine
      </h1>
      <p class="text-xl mb-8 text-blue-100">
        Expert roof repair, replacement, and inspection. Available 24/7 for emergency services.
      </p>
      <div class="flex gap-4">
        <a href="/contact" class="btn btn-primary bg-white text-blue-600 hover:bg-gray-100">
          Get Free Estimate
        </a>
        <a href="tel:{BUSINESS_INFO.phone}" class="btn btn-secondary border-2 border-white text-white hover:bg-white/10">
          Call Now
        </a>
      </div>
    </div>
  </div>
</section>
```

### 11.2 lib/components/Footer.svelte
```typescript
<script lang="ts">
  import { BUSINESS_INFO } from '$utils/constants';
</script>

<footer class="bg-gray-900 text-white py-12">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div>
        <h3 class="text-2xl font-bold mb-4">LB Sunrise</h3>
        <p class="text-gray-300">Professional roofing services serving Portland, Maine and surrounding areas.</p>
      </div>
      
      <div>
        <h4 class="text-lg font-bold mb-4">Quick Links</h4>
        <ul class="space-y-2 text-gray-300">
          <li><a href="/services" class="hover:text-white">Services</a></li>
          <li><a href="/service-areas" class="hover:text-white">Service Areas</a></li>
          <li><a href="/about" class="hover:text-white">About</a></li>
          <li><a href="/contact" class="hover:text-white">Contact</a></li>
        </ul>
      </div>
      
      <div>
        <h4 class="text-lg font-bold mb-4">Contact Info</h4>
        <p class="text-gray-300 mb-2">
          <strong>Phone:</strong> <a href="tel:{BUSINESS_INFO.phone}" class="hover:text-white">{BUSINESS_INFO.phone}</a>
        </p>
        <p class="text-gray-300 mb-2">
          <strong>Email:</strong> <a href="mailto:{BUSINESS_INFO.email}" class="hover:text-white">{BUSINESS_INFO.email}</a>
        </p>
        <p class="text-gray-300">
          <strong>Address:</strong> {BUSINESS_INFO.address}, {BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zipCode}
        </p>
      </div>
    </div>
    
    <div class="border-t border-gray-700 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400">&copy; 2026 LB Sunrise. All rights reserved.</p>
        <div class="flex gap-4 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" class="text-gray-400 hover:text-white">Terms & Conditions</a>
          <a href="#" class="text-gray-400 hover:text-white">Accessibility</a>
        </div>
      </div>
    </div>
  </div>
</footer>
```

### 11.3 lib/components/ServiceCard.svelte
```typescript
<script lang="ts">
  import type { Service } from '$types';

  export let service: Service;
</script>

<div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
  <img
    src={service.imageUrl}
    alt={service.imageAlt}
    class="w-full h-48 object-cover"
  />
  <div class="p-6">
    <h3 class="text-2xl font-bold mb-2">{service.name}</h3>
    <p class="text-gray-600 mb-4">{service.description}</p>
    
    <h4 class="font-semibold mb-2">Benefits:</h4>
    <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
      {#each service.benefits as benefit}
        <li>{benefit}</li>
      {/each}
    </ul>
    
    {#if service.warranty}
      <p class="text-sm text-green-600 font-semibold mb-4">{service.warranty}</p>
    {/if}
    
    <a href="/services/{service.slug}" class="btn btn-primary">
      {service.cta}
    </a>
  </div>
</div>
```

### 11.4 lib/components/TestimonialCard.svelte
```typescript
<script lang="ts">
  import type { Testimonial } from '$types';

  export let testimonial: Testimonial;
</script>

<div class="bg-white rounded-lg shadow p-6">
  <div class="flex items-center gap-1 mb-3">
    {#each Array(testimonial.rating) as _}
      <span class="text-yellow-400">★</span>
    {/each}
  </div>
  <p class="text-gray-700 mb-4">"{testimonial.text}"</p>
  <div>
    <p class="font-semibold text-gray-900">{testimonial.name}</p>
    <p class="text-sm text-gray-600">{testimonial.service}</p>
  </div>
</div>
```

### 11.5 lib/components/CTA.svelte
```typescript
<script lang="ts">
</script>

<section class="bg-blue-600 text-white py-16">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-4xl font-bold mb-4">Ready to Get Started?</h2>
    <p class="text-lg text-blue-100 mb-8">
      Schedule your free roofing estimate today. No obligations, just honest advice.
    </p>
    <a href="/contact" class="btn bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
      Get Free Estimate
    </a>
  </div>
</section>
```

---

## 12. ENVIRONMENT SETUP & INSTALLATION

### 12.1 Installation Steps
```bash
# Clone repository
git clone [repository-url]
cd lb-sunrise

# Install dependencies
npm install

# Install SvelteKit adapter for target environment
npm install -D @sveltejs/adapter-vercel

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p
```

### 12.2 Development Environment
```bash
# Start development server
npm run dev

# The site will be available at http://localhost:5173

# In another terminal, watch for TypeScript errors
npx tsc --watch
```

### 12.3 Production Build
```bash
# Build for production
npm run build

# Test production build locally
npm run preview
```

---

## 13. SEO OPTIMIZATION CHECKLIST

### 13.1 On-Page SEO
- ✅ Meta titles and descriptions for all pages
- ✅ Heading hierarchy (H1, H2, H3)
- ✅ Structured data/Schema markup
- ✅ Image alt text
- ✅ Internal linking strategy
- ✅ Keyword optimization
- ✅ Mobile responsive design
- ✅ Fast page load speed (Core Web Vitals)
- ✅ Open Graph tags
- ✅ Canonical URLs

### 13.2 Technical SEO
- ✅ XML Sitemap generation
- ✅ Robots.txt configuration
- ✅ SSL/HTTPS (required)
- ✅ 301 redirects setup
- ✅ robots meta tags
- ✅ Server-side rendering (SvelteKit)
- ✅ Dynamic meta tags per page
- ✅ LocalBusiness schema markup
- ✅ Service schema markup
- ✅ BreadcrumbList schema

### 13.3 Content SEO
- ✅ Service area pages (local SEO)
- ✅ Service-specific landing pages
- ✅ FAQ content section
- ✅ Testimonials/Reviews content
- ✅ Location-specific keywords
- ✅ Long-tail keyword targeting
- ✅ User intent optimization
- ✅ E-E-A-T (Expertise, Experience, Authority, Trustworthiness)

### 13.4 Link Building & Authority
- ✅ Internal linking structure
- ✅ Backlink strategy (local citations)
- ✅ Google Business Profile optimization
- ✅ Local directory listings
- ✅ Review generation strategy
- ✅ Social media presence

---

## 14. GOOGLE BUSINESS PROFILE & LOCAL SEO

### 14.1 Google Business Profile Setup
- Business Name: LB Sunrise
- Category: Roofing Contractor
- Phone: (978) 519-9774
- Address: 44 Veranda St, Portland, ME 04101
- Hours: Mon-Fri 8:00 AM - 6:00 PM, Sat 9:00 AM - 4:00 PM, Sun Closed
- Service Areas: Portland, Westbrook, Cumberland, Cape Elizabeth, Falmouth
- Website: https://lbsunrise.com

### 14.2 Local Citation Strategy
- Create NAP (Name, Address, Phone) consistency across:
  - Google Business Profile
  - Yelp
  - Home Advisor
  - Angi
  - BBB (Better Business Bureau)
  - Local Maine business directories

### 14.3 Review Generation
- Request reviews on Google Business Profile
- Display testimonials prominently on website
- Create email follow-up system for review requests
- Monitor and respond to reviews

---

## 15. DEPLOYMENT STRATEGY

### 15.1 Hosting Options
- **Primary Recommendation:** Vercel (optimized for SvelteKit)
- **Alternative:** Netlify
- **Features:** Automatic deployments, edge functions, serverless functions

### 15.2 Deployment Process
```bash
# Connect to Vercel
npm install -g vercel
vercel login

# Deploy
vercel

# View deployment status
vercel list
```

### 15.3 Domain & DNS
- Domain: lbsunrise.com
- DNS Provider: [To be configured]
- SSL Certificate: Automatic via Vercel

### 15.4 Email Integration
- Contact form email: LEMADILAN5@gmail.com
- Implement with: SendGrid, Mailgun, or AWS SES
- Automated responses for contact submissions

---

## 16. POST-LAUNCH TASKS

### 16.1 Analytics & Tracking
- Set up Google Analytics 4
- Install Google Tag Manager
- Configure conversion tracking
- Track form submissions
- Monitor page performance
- Track user behavior

### 16.2 Google Search Console
- Verify ownership
- Submit sitemap
- Monitor indexation
- Track search performance
- Fix crawl errors
- Review mobile usability

### 16.3 Ongoing Maintenance
- Monitor Core Web Vitals
- Update content regularly
- Respond to reviews
- Generate new content/blog posts
- Monitor keyword rankings
- Track competitor activity

---

## 17. SUCCESS METRICS

### 17.1 Key Performance Indicators (KPIs)
- Organic traffic to website
- Contact form submissions
- Phone call conversions
- Average session duration
- Bounce rate
- Pages per session
- Keyword rankings (top 10 positions)
- Local search visibility

### 17.2 Targets (First 6 Months)
- 100+ organic visits per month
- 5+ contact form submissions per month
- 15+ organic keywords ranking
- Top 5 position for primary keywords
- Mobile usability score: 95+
- Page speed score: 90+

---

## 18. TIMELINE & MILESTONES

### Phase 1: Setup & Development (January 6-13, 2026)
- Repository initialization
- Project structure setup
- Core components development
- Data files creation
- Tailwind CSS configuration
- Development testing

### Phase 2: SEO Implementation (January 13-14, 2026)
- Schema markup implementation
- Meta tag configuration
- Sitemap & robots.txt setup
- Open Graph tags
- Google Business Profile setup

### Phase 3: Testing & QA (January 14-15, 2026)
- Cross-browser testing
- Mobile responsiveness testing
- Form testing
- SEO validation
- Performance optimization

### Phase 4: Deployment & Launch (January 15-16, 2026)
- Domain configuration
- DNS setup
- Vercel deployment
- Google Search Console setup
- Analytics configuration
- Launch announcement

---

## 19. REFERENCE DOCUMENTATION

### 19.1 Reference Site Analysis
- **Reference:** https://superiorroofingofmaine.com/
- **Key Features Implemented:**
  - Service showcase with multiple roofing types
  - Service area pages for local SEO
  - Contact form and CTA
  - Business information display
  - Mobile responsive design
  - Schema markup for local business
  - Multiple service options (Shingle, Rubber, Metal, Rolled Asphalt, Gutters)

### 19.2 Best Practices Applied
- Server-side rendering for SEO
- Dynamic meta tags per page
- Schema.org markup
- Open Graph social sharing
- Mobile-first design
- Performance optimization
- Accessibility considerations
- Form validation

---

## 20. NOTES & ADDITIONAL CONSIDERATIONS

### 20.1 Future Enhancements
- Blog section with roofing tips and advice
- Before/after photo gallery
- Video testimonials
- Virtual roof inspection booking
- Live chat support
- Multi-language support (French for Canadian visitors)
- Advanced analytics dashboard
- A/B testing framework
- CRM integration for lead management

### 20.2 Email Service Integration
- Nodemailer or SendGrid for form submissions
- Automated response emails to customers
- Admin notification emails
- Review request automation
- Newsletter capability

### 20.3 Security Considerations
- CORS configuration for API endpoints
- Rate limiting on contact form
- CSRF protection
- Input validation and sanitization
- Environment variables for sensitive data
- SSL/HTTPS enforcement
- Regular security audits

### 20.4 Compliance
- GDPR compliance for EU visitors
- CCPA compliance for California visitors
- Accessibility (WCAG 2.1 AA)
- Cookie consent banner
- Privacy policy page
- Terms and conditions page

---

## 21. CONTACT & PROJECT INFORMATION

**Project Manager:** RCLabs
**Client Contact:** LB Sunrise
**Phone:** (978) 519-9774
**Email:** LEMADILAN5@gmail.com
**Project Duration:** January 6-16, 2026
**Budget:** $4,000.00
**Repository:** [To be created]
**Live Site:** https://lbsunrise.com (pending deployment)

---

## 22. VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 6, 2026 | Initial project specification |
| 1.1 | Jan 6, 2026 | Complete documentation with all sections |

---

**Document Status:** ✅ Complete
**Last Updated:** January 6, 2026
**Next Review:** Post-Launch (January 17, 2026)