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
  rating: 1 | 2 | 3 | 4 | 5;
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
