import { BUSINESS_INFO, SITE_URL } from '../utils/constants';

export const siteConfig = {
  // Site metadata
  title: 'LB Sunrise - Professional Roofing Services',
  description: 'Expert roof repair, replacement, and inspection services in Portland, Maine. Emergency roofing services available.',
  keywords: ['roof repair', 'roof replacement', 'roofing contractor', 'Portland Maine'],
  author: 'LB Sunrise',
  
  // URLs
  siteUrl: SITE_URL,
  
  // Business information
  businessName: BUSINESS_INFO.name,
  businessPhone: BUSINESS_INFO.phone,
  businessEmail: BUSINESS_INFO.email,
  businessAddress: `${BUSINESS_INFO.address}, ${BUSINESS_INFO.city}, ${BUSINESS_INFO.state} ${BUSINESS_INFO.zipCode}`,
  businessHours: BUSINESS_INFO.hours,
  
  // SEO
  defaultOgImage: '/images/og-image.jpg',
  twitterHandle: '@lbsunrise',
  
  // Features
  enableContactForm: import.meta.env.VITE_ENABLE_CONTACT_FORM !== 'false',
  enableServiceAreas: import.meta.env.VITE_ENABLE_SERVICE_AREAS !== 'false',
  enableTestimonials: import.meta.env.VITE_ENABLE_TESTIMONIALS !== 'false',
  enableFAQ: import.meta.env.VITE_ENABLE_FAQ !== 'false',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS !== 'false',
  enableSocialSharing: import.meta.env.VITE_ENABLE_SOCIAL_SHARING !== 'false',
  
  // Pagination
  itemsPerPage: 12,
  
  // Cache settings
  cacheDuration: 3600 // 1 hour in seconds
};

export type SiteConfig = typeof siteConfig;
