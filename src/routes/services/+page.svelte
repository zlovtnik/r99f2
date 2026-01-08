<script lang="ts">
  import { siteConfig } from '$config/siteConfig';
  import { services } from '$lib/data/services';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import CTA from '$lib/components/CTA.svelte';

  const baseUrl = siteConfig.siteUrl;

  // SEO metadata
  $: seo = {
    title: `Roofing Services | ${siteConfig.businessName}`,
    description: 'Professional roofing services including repair, replacement, and inspection. Expert roofers serving Portland, Maine and surrounding areas.',
    url: `${baseUrl}/services`,
    image: services.length > 0 ? `${baseUrl}${services[0].imageUrl}` : `${baseUrl}/images/og-image.jpg`
  };
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
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

<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-900">Our Roofing Services</h1>
      <p class="text-xl text-center text-gray-600 mb-12">
        Professional roofing services with quality craftsmanship and reliable results.
        Serving Portland, Maine and surrounding areas.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {#each services || [] as service (service.id)}
          <ServiceCard {service} />
        {/each}
      </div>

      <div class="text-center">
        <p class="text-lg text-gray-700 mb-8">
          Need help with your roofing project? Contact us for expert advice and a free quote.
        </p>
      </div>
    </div>
  </div>
</section>

<CTA />