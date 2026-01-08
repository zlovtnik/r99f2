import type { Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John Smith',
    service: 'Roof Replacement',
    text: 'LR Sunrise Construction did an excellent job replacing our roof. Professional, on-time, and great price. Highly recommend!',
    rating: 5,
    imageUrl: '/images/testimonials/john-smith.svg'
  },
  {
    id: '2',
    name: 'Emily Carter',
    service: 'Roof Repair',
    text: 'We had an emergency roof leak during a storm. They responded quickly and fixed it properly. Outstanding service and communication!',
    rating: 4,
    imageUrl: '/images/testimonials/emily-carter.svg'
  },
  {
    id: '3',
    name: 'Robert Thompson',
    service: 'Roof Inspection',
    text: 'Thorough inspection with detailed report. Very knowledgeable and provided helpful advice on maintenance. Would use again.',
    rating: 5,
    imageUrl: '/images/testimonials/robert-thompson.svg'
  }
];
