import { SITE_URL } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const baseUrl = SITE_URL;

  // Static pages
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'monthly' },
    { path: '/services', priority: '0.8', changefreq: 'monthly' },
    { path: '/service-areas', priority: '0.8', changefreq: 'monthly' },
    { path: '/about', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  ];

  // Service pages
  const servicePages = [
    { path: '/services/roof-repair', priority: '0.7', changefreq: 'monthly' },
    { path: '/services/roof-replacement', priority: '0.7', changefreq: 'monthly' },
    { path: '/services/roof-inspection', priority: '0.7', changefreq: 'monthly' },
  ];

  // Service area pages
  const serviceAreaPages = [
    { path: '/service-areas/portland', priority: '0.6', changefreq: 'monthly' },
    { path: '/service-areas/westbrook', priority: '0.6', changefreq: 'monthly' },
  ];

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