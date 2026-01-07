import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 1,
    name: 'Roof Repair',
    slug: 'roof-repair',
    description: 'Professional roof repair services for all types of roofing materials. Quick response times for emergency repairs.',
    shortDescription: 'Expert roof repair services',
    imageUrl: '/images/services/roof-repair.jpg',
    imageAlt: 'Professional roof repair in Portland Maine',
    benefits: [
      'Quick response times',
      'All materials handled',
      'Weather-tight repairs',
      'Warranty included'
    ],
    process: [
      'Thorough inspection',
      'Damage assessment',
      'Repair estimate',
      'Professional installation'
    ],
    warranty: '5-year warranty on repairs',
    keywords: ['roof repair', 'roof leak repair', 'emergency roof repair'],
    cta: 'Get Free Estimate'
  },
  {
    id: 2,
    name: 'Roof Replacement',
    slug: 'roof-replacement',
    description: 'Complete roof replacement services with quality materials and expert installation.',
    shortDescription: 'Full roof replacement',
    imageUrl: '/images/services/roof-replacement.jpg',
    imageAlt: 'Roof replacement services Portland Maine',
    benefits: [
      'New roof warranty',
      'Modern materials',
      'Professional installation',
      'Financing available'
    ],
    process: [
      'Inspection and quote',
      'Material selection',
      'Old roof removal',
      'New roof installation'
    ],
    warranty: '10-year manufacturer warranty',
    keywords: ['roof replacement', 'new roof', 'residential roofing'],
    cta: 'Schedule Inspection'
  },
  {
    id: 3,
    name: 'Roof Inspection',
    slug: 'roof-inspection',
    description: 'Comprehensive roof inspection for damage detection and maintenance planning.',
    shortDescription: 'Professional roof inspection',
    imageUrl: '/images/services/roof-inspection.jpg',
    imageAlt: 'Roof inspection services',
    benefits: [
      'Detailed report',
      'Photo documentation',
      'Expert assessment',
      'Preventative insights'
    ],
    process: [
      'Visual inspection',
      'Damage documentation',
      'Report generation',
      'Repair recommendations'
    ],
    keywords: ['roof inspection', 'roof assessment', 'roof evaluation'],
    cta: 'Book Inspection'
  }
];
