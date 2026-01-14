<script lang="ts">
  import { siteConfig } from '$config/siteConfig';
  import { serviceAreas } from '$lib/data/serviceAreas';
  import CTA from '$components/CTA.svelte';
  import { BUSINESS_INFO, STANDARD_SERVICES } from '$lib/utils/constants';
  import { createLocalBusinessSchema, createBreadcrumbSchema, createFAQSchema } from '$lib/utils/seo';
  import SchemaMarkup from '$components/SchemaMarkup.svelte';
  import TestimonialCard from '$components/TestimonialCard.svelte';

  export let areaSlug: string;

  $: area = serviceAreas.find(a => a.slug === areaSlug) ?? null;

  const baseUrl = siteConfig.siteUrl;

  // Track which FAQ is open
  let openFaqId: string | null = null;

  function toggleFaq(id: string) {
    openFaqId = openFaqId === id ? null : id;
  }


  // Reset openFaqId when service area changes
  $: if (areaSlug) {
    openFaqId = null;
  }
  // SEO metadata
  $: seo = area ? {
    title: `Roofing Services in ${area.name}, Maine | LR Sunrise Construction`,
    description: `Professional ${area.description}. Emergency roof repair and replacement services available. Call ${BUSINESS_INFO.telephone} for a free quote.`,
    keywords: area.keywords.join(', '),
    url: `${baseUrl}/service-areas/${area.slug}`,
    image: `${baseUrl}/images/og-service-area.jpg`
  } : null;

  // Schema markup for service area
  $: schema = area ? createLocalBusinessSchema({
    ...BUSINESS_INFO,
    url: baseUrl,
    serviceArea: {
      '@type': 'City',
      name: `${area.name}, ${area.state}`
    },
    areaServed: area.zipCodes.map(zip => `${zip}, ${area.state}`)
  }) : null;

  // FAQ Schema for local FAQs - enables rich results in search
  $: faqSchema = area?.localFaqs && area.localFaqs.length > 0 
    ? createFAQSchema(area.localFaqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      })))
    : null;

  // Validate video URLs to prevent XSS
  function isValidVideoUrl(url: string): boolean {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      const trustedHosts = ['youtube.com', 'youtu.be', 'www.youtube.com', 'vimeo.com', 'www.vimeo.com'];
      return trustedHosts.some(host => hostname === host || hostname.endsWith('.' + host));
    } catch {
      return false;
    }
  }

  // BreadcrumbList schema
  $: breadcrumbSchema = area ? createBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Service Areas', url: `${baseUrl}/service-areas` },
    { name: area.name, url: `${baseUrl}/service-areas/${area.slug}` }
  ]) : null;
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

{#if breadcrumbSchema}
  <SchemaMarkup schema={breadcrumbSchema} />
{/if}

{#if faqSchema}
  <SchemaMarkup schema={faqSchema} />
{/if}

{#if area}
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Breadcrumb navigation -->
      <nav aria-label="Breadcrumb" class="mb-6">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <a href={baseUrl} class="hover:text-primary">Home</a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href="{baseUrl}/service-areas" class="hover:text-primary">Service Areas</a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" class="text-gray-900 font-medium">{area.name}</li>
        </ol>
      </nav>

      <h1 class="text-4xl font-bold text-center mb-4 text-gray-900">Roofing Services in {area.name}, {area.state}</h1>
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-12">Expert Construction Services for {area.name} Homes & Businesses</h2>

      <!-- Climate & Architectural Context -->
      {#if area.climateContext}
        <div class="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 rounded-r-lg">
          <h3 class="text-xl font-semibold text-blue-900 mb-3">Local Climate Considerations</h3>
          <p class="text-blue-800">{area.climateContext}</p>
        </div>
      {/if}

      {#if area.architecturalNotes}
        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-r-lg">
          <h3 class="text-xl font-semibold text-green-900 mb-3">Architectural Notes for {area.name}</h3>
          <p class="text-green-800">{area.architecturalNotes}</p>
        </div>
      {/if}

      <!-- Seasonal Tips -->
      {#if area.seasonalTips && area.seasonalTips.length > 0}
        <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 class="text-2xl font-semibold mb-6 text-gray-900">Seasonal Service Recommendations</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each area.seasonalTips as tip, idx (idx)}
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p class="text-gray-700">{tip}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 class="text-2xl font-semibold mb-6 text-gray-900">Why Choose LR Sunrise Construction in {area.name}?</h2>

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
            <p class="text-gray-700 mb-4">
              <strong>Emergency Response Time:</strong><br>
              {area.emergencyResponseTime ?? BUSINESS_INFO.emergencyResponseTime}
            </p>
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                <span class="text-yellow-800 font-medium">Response Time Callout</span>
              </div>
              <p class="text-yellow-700 text-sm mt-1">We prioritize emergency repairs and typically respond within {area.emergencyResponseTime ?? BUSINESS_INFO.emergencyResponseTime} in the {area.name} area.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Local FAQs -->
      {#if area.localFaqs && area.localFaqs.length > 0}
        <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 class="text-2xl font-semibold mb-6 text-gray-900">{area.name}-Specific FAQs</h2>
          <div class="space-y-4">
            {#each area.localFaqs as faq (faq.id)}
              <div class="bg-gray-50 rounded-lg overflow-hidden">
                <button
                  class="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                  on:click={() => toggleFaq(faq.id)}
                  aria-expanded={openFaqId === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span class="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <svg
                    class="w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 {openFaqId === faq.id ? 'rotate-180' : ''}"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={`faq-answer-${faq.id}`}
                  class="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-200 overflow-hidden transition-all duration-300 {openFaqId === faq.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pb-0'}"
                  aria-hidden={openFaqId !== faq.id}
                >
                  <p class="pt-4">{faq.answer}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Testimonials -->
      {#if area.testimonials && area.testimonials.length > 0}
        <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 class="text-2xl font-semibold mb-6 text-gray-900">What {area.name} Customers Say</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each area.testimonials as testimonial (testimonial.id)}
              <TestimonialCard {testimonial} />
            {/each}
          </div>
        </div>
      {/if}

      <!-- Video Embed -->
      {#if area.videoUrl && isValidVideoUrl(area.videoUrl)}
        <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 class="text-2xl font-semibold mb-6 text-gray-900">See Our Work in {area.name}</h2>
          <div class="aspect-video">
            <iframe
              src={area.videoUrl}
              title="LR Sunrise Construction - {area.name} Projects"
              class="w-full h-full rounded-lg"
              sandbox="allow-scripts allow-same-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      {/if}

      <!-- Gallery Teaser -->
      {#if area.galleryItems && area.galleryItems.length > 0}
        <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 class="text-2xl font-semibold mb-6 text-gray-900">Recent Projects in {area.name}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {#each area.galleryItems.slice(0, 3) as item (item.id)}
              <a href="/gallery" class="group block">
                <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.description}
                    loading="lazy"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 class="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p class="text-gray-600 text-sm">{item.description}</p>
              </a>
            {/each}
          </div>
          <div class="text-center mt-6">
            <a href="/gallery" class="btn btn-secondary">View Full Gallery</a>
          </div>
        </div>
      {/if}

      <div class="bg-neutral-light rounded-lg p-8 mb-12">
        <h2 class="text-2xl font-semibold mb-4 text-neutral-dark">Get Your Free Quote Today</h2>
        <p class="text-neutral-dark mb-6">
          Call us at {BUSINESS_INFO.telephone} or fill out our contact form for a free, no-obligation quote
          for your roofing needs in {area.name}.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="/contact" class="btn btn-primary" aria-label="Get a free quote for roofing services in {area.name}">Get Free Quote</a>
          <a href="tel:{BUSINESS_INFO.telephone}" class="btn btn-secondary" aria-label="Call LR Sunrise Construction at {BUSINESS_INFO.telephone} for service in {area.name}">Call Now</a>
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
