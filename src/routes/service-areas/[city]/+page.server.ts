import type { PageServerLoad } from './$types';
import { serviceAreas } from '$lib/data/serviceAreas';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = ({ params }) => {
  const area = serviceAreas.find(a => a.slug === params.city);

  if (!area) {
    throw error(404, 'Service area not found');
  }

  return {
    city: params.city,
    area
  };
};