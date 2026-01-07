import type { FAQ } from '../types';
import { faqConfig } from '../config/faqConfig';
import { formatPricing } from '../utils/seo';

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
    answer: `We serve ${faqConfig.serviceArea || 'Maine and surrounding communities'}.`,
    category: 'Service Areas'
  },
  {
    id: '4',
    question: 'Do you offer financing options?',
    answer: 'Yes, we offer flexible financing options for roof replacement projects.',
    category: 'Payment'
  },
  {
    id: '5',
    question: 'What types of roofing materials do you work with?',
    answer: 'We work with all types of roofing materials including asphalt shingles, metal roofing, rubber, and flat roofs.',
    category: 'Services'
  },
  {
    id: '6',
    question: 'How much does a roof inspection cost?',
    answer: `Roof inspections are typically ${formatPricing(faqConfig.inspectionPricing)}. Contact us for a quote.`,
    category: 'Pricing'
  }
];
