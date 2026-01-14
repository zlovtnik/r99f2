import { services } from '$lib/data/services';
import { serviceAreas } from '$lib/data/serviceAreas';
import { blogPosts } from '$lib/data/blog';
import { SITE_URL } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

/**
 * Escapes XML special characters to prevent malformed XML
 * Handles: & < > " '
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface SitemapPage {
  path: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

export const GET: RequestHandler = async () => {
  const baseUrl = SITE_URL;

  // Static pages - omit lastmod since we don't have reliable modification dates
  // Google recommends only including lastmod when you have accurate data
  const staticPages: SitemapPage[] = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/service-areas', priority: '0.9', changefreq: 'weekly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog', priority: '0.8', changefreq: 'weekly' },
    { path: '/faq', priority: '0.7', changefreq: 'monthly' },
    { path: '/testimonials', priority: '0.7', changefreq: 'weekly' },
    { path: '/gallery', priority: '0.6', changefreq: 'weekly' },
  ];

  // Generate service pages dynamically from data (no reliable lastmod)
  const servicePages: SitemapPage[] = services.map(service => ({
    path: `/services/${service.slug}`,
    priority: '0.8',
    changefreq: 'monthly'
  }));

  // Generate service area pages dynamically from data (no reliable lastmod)
  const serviceAreaPages: SitemapPage[] = serviceAreas.map(area => ({
    path: `/service-areas/${area.slug}`,
    priority: '0.8',
    changefreq: 'monthly'
  }));

  // Generate blog post pages with actual publish/update dates
  const blogPages: SitemapPage[] = blogPosts.map(post => ({
    path: `/blog/${post.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
    // Only include lastmod if we have a real date
    ...(post.updatedAt || post.publishedAt ? { lastmod: post.updatedAt || post.publishedAt } : {})
  }));

  const allPages = [...staticPages, ...servicePages, ...serviceAreaPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => {
  const loc = escapeXml(`${baseUrl}${page.path}`);
  const lastmodTag = page.lastmod ? `\n    <lastmod>${escapeXml(page.lastmod)}</lastmod>` : '';
  return `  <url>
    <loc>${loc}</loc>${lastmodTag}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
};