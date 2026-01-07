import { BUSINESS_INFO } from '../utils/constants';

// Configurable FAQ values that may change frequently
export const faqConfig = {
  // Service area information
  serviceArea: `${BUSINESS_INFO.city}, ${BUSINESS_INFO.state} and surrounding communities within a 30-mile radius`,

  // Pricing information
  inspectionPricing: {
    min: 150,
    max: 300,
    note: 'depending on roof size'
  }
} as const;

export type FaqConfig = typeof faqConfig;