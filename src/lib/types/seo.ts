export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

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
