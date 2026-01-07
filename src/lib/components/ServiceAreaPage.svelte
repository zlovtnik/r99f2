<script lang="ts">
  import { siteConfig } from '$config/siteConfig';
  import { serviceAreas } from '$lib/data/serviceAreas';
  import CTA from '$lib/components/CTA.svelte';
  import { BUSINESS_INFO, STANDARD_SERVICES } from '$lib/utils/constants';
  import { createLocalBusinessSchema } from '$lib/utils/seo';
  import SchemaMarkup from '$lib/components/SchemaMarkup.svelte';

  export let areaSlug: string;

  $: area = serviceAreas.find(a => a.slug === areaSlug) ?? null;

  // SEO metadata
  $: seo = area ? {
    title: `Roofing Services in ${area.name}, Maine | LB Sunrise Roofing`,
    description: `Professional ${area.description}. Emergency roof repair and replacement services available. Call ${BUSINESS_INFO.telephone} for a free quote.`,
    keywords: area.keywords.join(', '),
    url: `${siteConfig.siteUrl}/service-areas/${area.slug}`,
    image: `${siteConfig.siteUrl}/images/og-service-area.jpg`
  } : null;

  // Schema markup for service area
  $: schema = area ? createLocalBusinessSchema({
    ...BUSINESS_INFO,
    serviceArea: {
      '@type': 'City',
      name: `${area.name}, ${area.state}`
    },
    areaServed: area.zipCodes.map(zip => `${zip}, ${area.state}`)
  }) : null;
</script>

<svelte:head>
  {#if seo}
    <title>{seo.title}</title>
    <meta name="description" content={seo.description} />
    <meta name="keywords" content={seo.keywords} />
    <link rel="canonical" href={seo.url} />

    <!-- Open Graph -->
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.description} />
    <meta property="og:url" content={seo.url} />
    <meta property="og:image" content={seo.image} />
    <meta property="og:type" content="website" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={seo.title} />
    <meta name="twitter:description" content={seo.description} />
    <meta name="twitter:image" content={seo.image} />
  {/if}
</svelte:head>

{#if schema}
  <SchemaMarkup {schema} />
{/if}

{#if area}
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-4 text-gray-900">Roofing Services in {area.name}, {area.state}</h1>
      <p class="text-xl text-center text-gray-600 mb-12">{area.description}</p>

      <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 class="text-2xl font-semibold mb-6 text-gray-900">Why Choose LB Sunrise in {area.name}?</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-900">Our Services</h3>
            <ul class="space-y-2 text-gray-700">
              {#each STANDARD_SERVICES as service}
                <li>• {service}</li>
              {/each}
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-900">Service Area Details</h3>
            <p class="text-gray-700 mb-4">
              <strong>ZIP Codes Served:</strong><br>
              {area.zipCodes.join(', ')}
            </p>
            <p class="text-gray-700">
              <strong>Response Time:</strong><br>
              {area.emergencyResponseTime ?? BUSINESS_INFO.emergencyResponseTime}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 rounded-lg p-8 mb-12">
        <h2 class="text-2xl font-semibold mb-4 text-blue-900">Get Your Free Quote Today</h2>
        <p class="text-blue-800 mb-6">
          Call us at {BUSINESS_INFO.telephone} or fill out our contact form for a free, no-obligation quote
          for your roofing needs in {area.name}.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="/contact" class="btn btn-primary" aria-label="Get a free quote for roofing services in {area.name}">Get Free Quote</a>
          <a href="tel:{BUSINESS_INFO.telephone}" class="btn btn-secondary" aria-label="Call LB Sunrise Roofing at {BUSINESS_INFO.telephone} for service in {area.name}">Call Now</a>
        </div>
      </div>

      <div class="text-center">
        <p class="text-lg text-gray-700 mb-8">
            Serving {area.name} and surrounding areas with quality roofing services since {BUSINESS_INFO.foundedYear}.
        </p>
      </div>
    </div>
  </div>
</section>

<CTA />
{:else}
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl font-bold mb-4 text-gray-900">Service Area Not Found</h1>
      <p class="text-xl text-gray-600 mb-8">The requested service area could not be found.</p>
      <a href="/service-areas" class="btn btn-primary">View All Service Areas</a>
    </div>
  </div>
</section>
{/if}
