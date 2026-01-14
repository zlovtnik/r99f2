import { SITE_URL } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const siteUrl = SITE_URL;

	const robots = `# Robots.txt for LR Sunrise Construction
# Generated dynamically to ensure correct sitemap URL

# Allow all standard crawlers
User-agent: *
Allow: /
Disallow: /api/
Disallow: /.svelte-kit/
Disallow: /build/
Disallow: /_app/

# Allow Google to crawl images for image search
User-agent: Googlebot-Image
Allow: /images/

# Crawl delay to be respectful of server resources
# Most search engines ignore this but Bing respects it
User-agent: bingbot
Crawl-delay: 1

# Sitemap location (critical for SEO)
Sitemap: ${siteUrl}/sitemap.xml

# Host directive (helps with canonical domain)
Host: ${siteUrl}
`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
		}
	});
};
