<script lang="ts">
  import { siteConfig } from '$config/siteConfig';
  import CTA from '$lib/components/CTA.svelte';
  import { BUSINESS_INFO } from '$lib/utils/constants';
  import type { Service } from '$lib/types';

  export let data;

  $: service = data.service as Service;

  // SEO metadata
  $: seo = {
    title: `${service.name} | ${siteConfig.businessName}`,
    description: service.description,
    url: `${siteConfig.siteUrl}/services/${service.slug}`,
    image: `${siteConfig.siteUrl}${service.imageUrl}`
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
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
        <img src={service.imageUrl} alt={service.imageAlt} class="w-full h-64 object-cover" />
        <div class="p-8">
          <h1 class="text-4xl font-bold mb-4 text-gray-900">{service.name}</h1>
          <p class="text-xl text-gray-700 mb-8">{service.description}</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 class="text-2xl font-semibold mb-4 text-gray-900">Benefits</h2>
              <ul class="space-y-2">
                {#each service.benefits as benefit}
                  <li class="flex items-center text-gray-700">
                    <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {benefit}
                  </li>
                {/each}
              </ul>
            </div>

            <div>
              <h2 class="text-2xl font-semibold mb-4 text-gray-900">Our Process</h2>
              <ol class="space-y-2">
                {#each service.process as step, i}
                  <li class="flex items-center text-gray-700">
                    <span class="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">{i + 1}</span>
                    {step}
                  </li>
                {/each}
              </ol>
            </div>
          </div>

          {#if service.warranty}
            <div class="mt-8 p-4 bg-blue-50 rounded-lg">
              <p class="text-lg font-semibold text-blue-900">Warranty: {service.warranty!}</p>
            </div>
          {/if}
        </div>
      </div>

      <div class="text-center">
        <p class="text-lg text-gray-700 mb-8">
          Ready to get your roof repaired? Contact us today for a free estimate.
        </p>
        <a href="/contact" class="btn btn-primary">{service.cta}</a>
      </div>
    </div>
  </div>
</section>

<CTA />