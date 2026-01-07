import type { ServiceArea } from '../types';

export const serviceAreas = [
  {
    id: 'portland',
    name: 'Portland',
    slug: 'portland',
    description: 'Roof repair and replacement services in Portland, Maine',
    zipCodes: ['04101', '04102', '04103'],
    keywords: ['roof repair Portland Maine', 'roofing Portland Maine'],
    state: 'Maine',
    emergencyResponseTime: 'Emergency repairs within 2 hours'
  },
  {
    id: 'westbrook',
    name: 'Westbrook',
    slug: 'westbrook',
    description: 'Roof repair and replacement services in Westbrook, Maine',
    zipCodes: ['04092'],
    keywords: ['roof repair Westbrook Maine', 'roofing Westbrook Maine'],
    state: 'Maine',
    emergencyResponseTime: 'Emergency repairs within 2 hours'
  },
  {
    id: 'cumberland',
    name: 'Cumberland',
    slug: 'cumberland',
    description: 'Roof repair and replacement services in Cumberland, Maine',
    zipCodes: ['04021'],
    keywords: ['roof repair Cumberland Maine', 'roofing Cumberland Maine'],
    state: 'Maine',
    emergencyResponseTime: 'Emergency repairs within 2 hours'
  },
  {
    id: 'cape-elizabeth',
    name: 'Cape Elizabeth',
    slug: 'cape-elizabeth',
    description: 'Roof repair and replacement services in Cape Elizabeth, Maine',
    zipCodes: ['04107'],
    keywords: ['roof repair Cape Elizabeth Maine', 'roofing Cape Elizabeth Maine'],
    state: 'Maine',
    emergencyResponseTime: 'Emergency repairs within 2 hours'
  },
  {
    id: 'falmouth',
    name: 'Falmouth',
    slug: 'falmouth',
    description: 'Roof repair and replacement services in Falmouth, Maine',
    zipCodes: ['04105'],
    keywords: ['roof repair Falmouth Maine', 'roofing Falmouth Maine'],
    state: 'Maine',
    emergencyResponseTime: 'Emergency repairs within 2 hours'
  }
] as const satisfies readonly ServiceArea[];
