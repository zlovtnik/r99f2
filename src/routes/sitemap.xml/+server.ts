import { services } from '$lib/data/services';
import { serviceAreas } from '$lib/data/serviceAreas';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const baseUrl = import.meta.env.PUBLIC_SITE_URL || 'https://lbsunrise.com';

  // Static pages
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'monthly' },
    { path: '/services', priority: '0.8', changefreq: 'monthly' },
    { path: '/service-areas', priority: '0.8', changefreq: 'monthly' },
    { path: '/about', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  ];

  // Generate service pages dynamically from data
  const servicePages = services.map(service => ({
    path: `/services/${service.slug}`,
    priority: '0.7',
    changefreq: 'monthly'
  }));

  // Generate service area pages dynamically from data
  const serviceAreaPages = serviceAreas.map(area => ({
    path: `/service-areas/${area.slug}`,
    priority: '0.6',
    changefreq: 'monthly'
  }));

  const allPages = [...staticPages, ...servicePages, ...serviceAreaPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
};