import { BUSINESS_INFO, SERVICE_OPTIONS, SERVICE_AREAS, SITE_URL } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const siteUrl = SITE_URL;
	const phone = BUSINESS_INFO.telephone;
	const email = BUSINESS_INFO.email;

	const llmsTxt = `# LR Sunrise Construction

> Professional general contractor serving Portland, Maine and surrounding areas within 200 miles.

## About

LR Sunrise Construction is a trusted general contractor with over ${BUSINESS_INFO.yearsOfExperience} years of experience in ${BUSINESS_INFO.city}, ${BUSINESS_INFO.state}. We specialize in comprehensive construction services for residential and commercial properties.

## Services

${SERVICE_OPTIONS.map((service) => `- ${service}`).join('\n')}

## Service Areas

We proudly serve ${BUSINESS_INFO.city}, ${BUSINESS_INFO.state} and the surrounding communities including:
${SERVICE_AREAS.slice(1, 10).map((area) => `- ${area}, ME`).join('\n')}
- And many more within ${BUSINESS_INFO.serviceRadius}

## Contact

- Phone: ${phone}
- Email: ${email}
- Location: ${BUSINESS_INFO.city}, ${BUSINESS_INFO.state} ${BUSINESS_INFO.zipCode}
- Hours: ${BUSINESS_INFO.hoursDisplay}

## Discounts

- ${BUSINESS_INFO.discounts.senior}
- ${BUSINESS_INFO.discounts.military}
- ${BUSINESS_INFO.discounts.newCustomers}

## Links

- [Home](${siteUrl}/)
- [Services](${siteUrl}/services)
- [About Us](${siteUrl}/about)
- [Contact](${siteUrl}/contact)
- [FAQ](${siteUrl}/faq)
- [Testimonials](${siteUrl}/testimonials)
- [Service Areas](${siteUrl}/service-areas)
`;

	return new Response(llmsTxt, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
