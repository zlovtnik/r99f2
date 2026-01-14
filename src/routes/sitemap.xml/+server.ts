import { services } from '$lib/data/services';
import { serviceAreas } from '$lib/data/serviceAreas';
import { blogPosts } from '$lib/data/blog';
import { SITE_URL } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const baseUrl = SITE_URL;
  
  // Get current date for lastmod (pages that don't have specific dates)
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages with priorities
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: currentDate },
    { path: '/services', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { path: '/service-areas', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { path: '/about', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
    { path: '/contact', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
    { path: '/blog', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { path: '/faq', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
    { path: '/testimonials', priority: '0.7', changefreq: 'weekly', lastmod: currentDate },
    { path: '/gallery', priority: '0.6', changefreq: 'weekly', lastmod: currentDate },
  ];

  // Generate service pages dynamically from data
  const servicePages = services.map(service => ({
    path: `/services/${service.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: currentDate
  }));

  // Generate service area pages dynamically from data
  const serviceAreaPages = serviceAreas.map(area => ({
    path: `/service-areas/${area.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: currentDate
  }));

  // Generate blog post pages with actual publish dates
  const blogPages = blogPosts.map(post => ({
    path: `/blog/${post.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: post.updatedAt || post.publishedAt || currentDate
  }));

  const allPages = [...staticPages, ...servicePages, ...serviceAreaPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
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