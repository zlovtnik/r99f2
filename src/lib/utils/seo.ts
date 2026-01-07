import type { SEOMetadata } from '../types';
import type { LocalBusinessInfo, ServiceInfo } from '../types/seo';
import { BUSINESS_INFO } from './constants';

function toTitleCase(str: string): string {
  return str.replaceAll('-', ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
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
    ogImage: options.ogImage || '/images/og-image.jpg',
    canonical: options.canonical,
    schema: options.schema
  };
}

export function generateBreadcrumbs(path: string): Array<{ name: string; url: string }> {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Home', url: '/' }];

  let url = '';
  segments.forEach((segment) => {
    url = `${url}/${segment}`;
    breadcrumbs.push({
      name: toTitleCase(segment),
      url
    });
  });

  return breadcrumbs;
}

export function createLocalBusinessSchema(businessInfo: LocalBusinessInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessInfo.name,
    image: businessInfo.image || '/images/logo.svg',
    description: businessInfo.description || 'Professional roofing services in Maine',
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
    url: businessInfo.url || 'https://lbsunrise.com',
    serviceArea: businessInfo.serviceArea || {
      '@type': 'City',
      name: 'Portland, Maine'
    },
    areaServed: businessInfo.areaServed || ['Portland ME', 'Westbrook ME', 'Cumberland ME'],
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
    areaServed: service.areaServed || 'Portland, Maine',
    url: `/services/${service.slug}`
  };
}
