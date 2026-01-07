import type { PageServerLoad } from './$types';
import { services } from '$lib/data/services';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = ({ params }) => {
  const service = services.find(s => s.slug === params.slug);

  if (!service) {
    throw error(404, 'Service not found');
  }

  return {
    service
  };
};