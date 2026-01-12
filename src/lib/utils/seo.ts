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

  if (Number.isNaN(pricing.min) || Number.isNaN(pricing.max) || !Number.isFinite(pricing.min) || !Number.isFinite(pricing.max)) {
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

  let currentUrl = SITE_URL;
  for (const segment of segments) {
    currentUrl = `${currentUrl}/${segment}`;
    breadcrumbs.push({
      name: toTitleCase(segment),
      url: currentUrl
    });
  }

  return breadcrumbs;
}

export function createLocalBusinessSchema(businessInfo: LocalBusinessInfo) {
  const baseUrl = businessInfo.url || SITE_URL;
  const imageUrl = businessInfo.image || LOGO_URL;
  const absoluteImageUrl = (() => {
    try {
      return new URL(imageUrl, baseUrl).toString();
    } catch {
      return imageUrl;
    }
  })();

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessInfo.name,
    image: absoluteImageUrl,
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
    url: baseUrl,
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

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  if (!items || items.length === 0) {
    return null;
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function createArticleSchema(article: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: string;
  publisher: string;
  url: string;
  keywords?: string[];
}) {
  const absoluteLogoUrl = (() => {
    try {
      return new URL(LOGO_URL, SITE_URL).toString();
    } catch {
      return LOGO_URL;
    }
  })();

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    ...(article.dateModified && { dateModified: article.dateModified }),
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher,
      logo: {
        '@type': 'ImageObject',
        url: absoluteLogoUrl
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    },
    ...(article.image && { image: article.image }),
    ...(article.keywords?.length && { keywords: article.keywords.join(', ') })
  };
}

export function createCollectionSchema(collection: {
  name: string;
  description: string;
  url: string;
  items: Array<{
    name: string;
    description: string;
    url: string;
    datePublished: string;
    author: string;
    image?: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    url: collection.url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: collection.items.length,
      itemListElement: collection.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          name: item.name,
          description: item.description,
          url: item.url,
          datePublished: item.datePublished,
          author: {
            '@type': 'Person',
            name: item.author
          },
          ...(item.image && { image: item.image })
        }
      }))
    }
  };
}

/**
 * Creates FAQ schema markup for pages with frequently asked questions
 * Enables FAQ rich results in search engines
 */
export function createFAQSchema(faqs: Array<{
  question: string;
  answer: string;
}>) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Creates AggregateRating schema to showcase customer reviews and ratings
 * Improves visibility with star ratings in search results
 */
export function createAggregateRatingSchema(rating: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}) {
  const bestRating = rating.bestRating || 5;
  const worstRating = rating.worstRating || 1;

  if (
    rating.ratingValue < worstRating ||
    rating.ratingValue > bestRating ||
    rating.reviewCount < 1 ||
    !Number.isInteger(rating.reviewCount)
  ) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: rating.ratingValue,
    reviewCount: rating.reviewCount,
    bestRating: bestRating,
    worstRating: worstRating
  };
}

/**
 * Creates Review schema for individual customer reviews
 * Enhances credibility and provides review snippets in search results
 * 
 * @param review - Review data with validated ratingValue (1-5)
 * @param review.reviewBody - The text content of the review
 * @param review.author - Name of the person who wrote the review
 * @param review.ratingValue - Rating value (1-5). Will throw RangeError if outside this range
 * @param review.datePublished - ISO 8601 date string
 * @param review.headline - Optional title/headline for the review
 */
export function createReviewSchema(review: {
  reviewBody: string;
  author: string;
  ratingValue: number;
  datePublished: string;
  headline?: string;
}) {
  // Validate rating is within 1-5 range; return null for invalid input (consistent with createAggregateRatingSchema)
  if (review.ratingValue < 1 || review.ratingValue > 5) {
    return null;
  }

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewBody: review.reviewBody,
    author: {
      '@type': 'Person',
      name: review.author
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.ratingValue,
      bestRating: 5,
      worstRating: 1
    },
    datePublished: review.datePublished
  };

  // Only include name/headline if provided
  if (review.headline) {
    schema.name = review.headline;
  }

  return schema;
}

/**
 * Creates VideoObject schema for video content
 * Enables video rich results and improves video discoverability
 */
export function createVideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string | string[];
  uploadDate: string;
  duration: string;
  contentUrl?: string;
  embedUrl: string;
}) {
  const thumbnails = Array.isArray(video.thumbnailUrl)
    ? video.thumbnailUrl
    : [video.thumbnailUrl];

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: thumbnails,
    uploadDate: video.uploadDate,
    duration: video.duration,
    ...(video.contentUrl && { contentUrl: video.contentUrl }),
    embedUrl: video.embedUrl
  };
}

/**
 * Creates HowTo schema for instructional/process content
 * Perfect for roofing repair processes, maintenance guides, etc.
 */
export function createHowToSchema(howTo: {
  name: string;
  description: string;
  image?: string;
  totalTime: string;
  estimatedCost?: {
    currency: string;
    price: string;
  };
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    ...(howTo.image && { image: howTo.image }),
    totalTime: howTo.totalTime,
    ...(howTo.estimatedCost && {
      estimatedCost: {
        '@type': 'PriceSpecification',
        currency: howTo.estimatedCost.currency,
        price: howTo.estimatedCost.price
      }
    }),
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image })
    }))
  };
}

/**
 * Creates Organization schema with extended business information
 * Complements LocalBusiness schema with additional organization details
 */
export function createOrganizationSchema(org: {
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone?: string;
  email?: string;
  sameAs?: string[];
  foundingDate?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo,
    description: org.description,
    ...(org.telephone && { telephone: org.telephone }),
    ...(org.email && { email: org.email }),
    ...(org.sameAs && { sameAs: org.sameAs }),
    ...(org.foundingDate && { foundingDate: org.foundingDate }),
    ...(org.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: org.address.streetAddress,
        addressLocality: org.address.addressLocality,
        addressRegion: org.address.addressRegion,
        postalCode: org.address.postalCode,
        addressCountry: 'US'
      }
    })
  };
}
