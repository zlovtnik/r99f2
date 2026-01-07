import { SITE_URL } from '$lib/utils/constants';

export function GET() {
	const siteUrl = SITE_URL;

	const robots = `# Robots.txt for LB Sunrise
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
}
