import { SITE_URL } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const siteUrl = SITE_URL;

	const robots = `# Robots.txt for LR Sunrise Construction
# Allow search engines to crawl all public pages

User-agent: *
Allow: /
Disallow: /api/
Disallow: /.svelte-kit/
Disallow: /build/

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml
`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};
