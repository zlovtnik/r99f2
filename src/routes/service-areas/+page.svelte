<script lang="ts">
  import { serviceAreas } from '$lib/data/serviceAreas';
  import CTA from '$lib/components/CTA.svelte';
  import SchemaMarkup from '$lib/components/SchemaMarkup.svelte';

  import { SITE_URL } from '$lib/utils/constants';

  const baseUrl = SITE_URL;

  // SEO metadata
  $: seo = {
    title: 'Service Areas | LB Sunrise Roofing',
    description: 'Professional roofing services in Portland, Westbrook, and surrounding areas in Maine. Emergency roof repair available.',
    keywords: 'roofing service areas, Portland Maine roofing, Westbrook Maine roofing',
    url: `${baseUrl}/service-areas`,
    image: `${baseUrl}/images/og-service-areas.jpg`
  };

  // JSON-LD schema for service areas list
  $: schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Service Areas',
    description: 'Professional roofing service areas in Maine',
    numberOfItems: serviceAreas.length,
    itemListElement: serviceAreas.map((area, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Place',
        name: `${area.name}, ${area.state}`,
        description: area.description,
        url: `${baseUrl}/service-areas/${area.slug}`,
        address: {
          '@type': 'PostalAddress',
          addressRegion: area.state,
          postalCode: area.zipCodes.join(', ')
        }
      }
    }))
  };
</script>

<svelte:head>
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
</svelte:head>

<SchemaMarkup {schema} />

<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-900">Our Service Areas</h1>
      <p class="text-xl text-center text-gray-600 mb-12">
        Professional roofing services serving Portland, Westbrook, and surrounding communities in Maine.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {#if serviceAreas && serviceAreas.length > 0}
          {#each serviceAreas as area (area.id)}
            <a href="/service-areas/{area.slug}" class="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow group" aria-label="View roofing services in {area.name}, {area.state}">
              <h2 class="text-2xl font-semibold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                {area.name}, {area.state}
              </h2>
              <p class="text-gray-700 mb-4">{area.description}</p>
              <div class="mb-4">
                <p class="font-medium text-gray-900 mb-2">ZIP Codes Served:</p>
                <p class="text-gray-600">{area.zipCodes.join(', ')}</p>
              </div>
              <span class="text-blue-600 font-medium group-hover:text-blue-800 transition-colors">View Details →</span>
            </a>
          {/each}
        {:else}
          <div class="col-span-full bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 class="text-xl font-semibold mb-4 text-gray-900">No Service Areas Found</h3>
            <p class="text-gray-700 mb-6">We're currently updating our service areas. Please contact us to see if we can serve your location.</p>
            <a href="/contact" class="btn btn-primary">Contact Us</a>
          </div>
        {/if}
      </div>

      <div class="text-center">
        <p class="text-lg text-gray-700 mb-8">
          Don't see your area listed? Contact us to see if we can serve you.
        </p>
        <a href="/contact" class="btn btn-primary">Contact Us</a>
      </div>
    </div>
  </div>
</section>

<CTA />