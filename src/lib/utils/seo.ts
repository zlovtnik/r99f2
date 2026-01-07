import type { SEOMetadata } from '../types';
import type { LocalBusinessInfo, ServiceInfo } from '../types/seo';
import { BUSINESS_INFO, LOGO_URL, SITE_URL, SERVICE_AREAS, OG_IMAGE_URL } from './constants';

function toTitleCase(str: string): string {
  return str.replaceAll('-', ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

export function formatPricing(pricing: { min: number; max: number; note: string }): string {
  // Validate inputs
  if (typeof pricing.min !== 'number' || typeof pricing.max !== 'number') {
    return 'Pricing unavailable';
  }

  if (isNaN(pricing.min) || isNaN(pricing.max) || !isFinite(pricing.min) || !isFinite(pricing.max)) {
    return 'Pricing unavailable';
  }

  if (pricing.min < 0 || pricing.max < 0) {
    return 'Pricing unavailable';
  }

  if (pricing.min > pricing.max) {
    return 'Pricing unavailable';
  }

  // Reasonable bounds check (prevent extremely large numbers that might be data errors)
  const MAX_REASONABLE_PRICE = 100000; // $100,000
  if (pricing.min > MAX_REASONABLE_PRICE || pricing.max > MAX_REASONABLE_PRICE) {
    return 'Call for pricing';
  }

  return `$${pricing.min}-${pricing.max} ${pricing.note}`;
}

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
    ogImage: options.ogImage || OG_IMAGE_URL,
    canonical: options.canonical,
    schema: options.schema
  };
}

export function generateBreadcrumbs(path: string): Array<{ name: string; url: string }> {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: Array<{ name: string; url: string }> = [{ name: 'Home', url: SITE_URL }];

  segments.reduce((currentUrl, segment) => {
    const nextUrl = `${currentUrl}/${segment}`;
    breadcrumbs.push({
      name: toTitleCase(segment),
      url: nextUrl
    });
    return nextUrl;
  }, SITE_URL);

  return breadcrumbs;
}

export function createLocalBusinessSchema(businessInfo: LocalBusinessInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessInfo.name,
    image: businessInfo.image || LOGO_URL,
    description: businessInfo.description || 'Professional roofing services in Maine',
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address,
      addressLocality: businessInfo.city,
      addressRegion: businessInfo.state,
      postalCode: businessInfo.zipCode,
      addressCountry: 'US'
    },
    url: businessInfo.url || SITE_URL,
    serviceArea: businessInfo.serviceArea || {
      '@type': 'City',
      name: 'Portland, Maine'
    },
    areaServed: businessInfo.areaServed || SERVICE_AREAS,
    priceRange: businessInfo.priceRange || '$$'
  };
}

export function createServiceSchema(service: ServiceInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: service.providerName || BUSINESS_INFO.name
    },
    areaServed: service.areaServed || SERVICE_AREAS,
    url: `/services/${service.slug}`
  };
}
