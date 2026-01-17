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
  state: string;
  featured?: boolean;
  emergencyResponseTime?: string;
  climateContext?: string;
  architecturalNotes?: string;
  seasonalTips?: string[];
  localFaqs?: FAQ[];
  testimonials?: Testimonial[];
  galleryItems?: GalleryItem[];
  videoUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  imageUrl?: string;
  videoUrl?: string;  // For video testimonials (YouTube/Vimeo)
  location?: string;  // City/area of the customer
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  beforeImage?: string;  // For before/after comparisons
  afterImage?: string;   // For before/after comparisons (defaults to image if not set)
  location?: string;     // City/area where project was completed
  completedDate?: string; // When project was completed
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  imageAlt?: string;
  videoUrl?: string;
  readingTime?: number;
  relatedServices?: string[];
  relatedAreas?: string[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
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
  telephone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  lat: number;
  lng: number;
  hours: Record<string, string>; // Structured hours for data processing
  businessHours: string[]; // Display-friendly hours for UI
  serviceAreas?: string;
  serviceRadius: string;
  foundedYear?: number;
  emergencyResponseTime?: string;
}
