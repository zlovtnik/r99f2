import { PUBLIC_SITE_URL } from '$env/static/public';

export async function GET() {
	const siteUrl = PUBLIC_SITE_URL || 'https://lbsunrise.com';

	const robots = `# Robots.txt for LB Sunrise
# Allow search engines to crawl all public pages

User-agent: *
Allow: /
Disallow: /api/
Disallow: /.svelte-kit/
Disallow: /build/

# Specific rules for Google
User-agent: Googlebot
Allow: /

# Specific rules for Bing
User-agent: Bingbot
Allow: /

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml
`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
}
