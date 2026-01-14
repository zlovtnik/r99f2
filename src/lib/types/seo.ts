export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

/**
 * Valid day of week values per Schema.org specification
 * @see https://schema.org/DayOfWeek
 */
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface OpeningHoursSpec {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: DayOfWeek[];
  opens: string;
  closes: string;
}

/**
 * Local business information for Schema.org LocalBusiness markup
 * 
 * Note: Use `geo` as the authoritative coordinate source for latitude/longitude.
 * The `geo` property follows the Schema.org GeoCoordinates specification.
 */
export interface LocalBusinessInfo {
  name: string;
  telephone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image?: string;
  description?: string;
  url?: string;
  serviceArea?: { '@type': string; name: string };
  areaServed?: string[];
  priceRange?: string;
  /**
   * Geographic coordinates for the business location.
   * This is the authoritative source for latitude/longitude.
   * @see https://schema.org/GeoCoordinates
   */
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHours?: OpeningHoursSpec[];
  sameAs?: string[];
}

export interface LocalBusinessSchema extends SchemaMarkup {
  '@type': 'LocalBusiness' | 'RoofingContractor' | 'HomeAndConstructionBusiness' | 'GeneralContractor' | 'HomeServiceBusiness';
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

export interface ServiceInfo {
  name: string;
  description: string;
  slug: string;
  providerName?: string;
  areaServed?: string[];
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
