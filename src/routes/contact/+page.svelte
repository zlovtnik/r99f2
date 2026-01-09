<script lang="ts">
  import { siteConfig } from '$config/siteConfig';
  import ContactForm from '$components/ContactForm.svelte';
  import SchemaMarkup from '$components/SchemaMarkup.svelte';
  import { BUSINESS_INFO, BUSINESS_HOURS } from '$utils/constants';
  import { createBreadcrumbSchema } from '$utils/seo';

  const baseUrl = siteConfig.siteUrl;

  // SEO metadata
  $: seo = {
    title: 'Contact Us | LR Sunrise Construction - Portland, ME',
    description: 'Get in touch with LR Sunrise Construction for professional construction services. Call (978) 519-9774 or fill out our contact form for a free estimate. Serving Portland, ME and surrounding areas.',
    keywords: 'contact general contractor, construction quote, Portland Maine contractor, free estimate',
    url: `${baseUrl}/contact`,
    image: `${baseUrl}/images/og-contact.jpg`
  };

  // BreadcrumbList schema
  $: breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Contact Us', url: `${baseUrl}/contact` }
  ]);
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

{#if breadcrumbSchema}
  <SchemaMarkup schema={breadcrumbSchema} />
{/if}

<!-- Hero Section -->
<section class="bg-gradient-to-r from-primary to-secondary text-white py-16 relative overflow-hidden">
  <div class="absolute inset-0 bg-black/40"></div>
  <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('/images/r-29.webp')"></div>
  <div class="container mx-auto px-4 relative z-10">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">Seamless Connection with a Commercial Construction Contractor</h1>
    <p class="text-xl text-neutral-light max-w-3xl">
      For professional commercial construction contractor assistance, our team is ready to support your project needs. Serving the Portland, ME area, we pride ourselves on prompt responses and clear communication.
    </p>
  </div>
</section>

<section class="py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div>
          <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-semibold mb-6 text-gray-900">Contact Information</h2>

            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="bg-neutral-light rounded-full p-3 flex-shrink-0">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 text-lg">{BUSINESS_INFO.name}</h3>
                  <p class="text-gray-600">{BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zipCode}</p>
                  <p class="text-gray-600">Area served: {BUSINESS_INFO.serviceRadius}</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="bg-neutral-light rounded-full p-3 flex-shrink-0">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Phone</p>
                  <a href={`tel:${BUSINESS_INFO.telephone}`} class="text-primary hover:underline text-lg">{BUSINESS_INFO.telephone}</a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="bg-neutral-light rounded-full p-3 flex-shrink-0">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Email</p>
                  <a href={`mailto:${BUSINESS_INFO.email}`} class="text-primary hover:underline">{BUSINESS_INFO.email}</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 class="text-xl font-semibold mb-4 text-gray-900">Working Hours</h3>
            <div class="space-y-2 text-gray-600">
              {#each BUSINESS_HOURS as hour}
                {@const parts = hour.split(': ')}
                {@const day = parts[0]}
                {@const time = parts.slice(1).join(': ')}
                <p class="flex justify-between">
                  <span>{day}</span>
                  <span class="font-medium">{time}</span>
                </p>
              {/each}
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h3 class="text-xl font-semibold mb-4 text-gray-900">Payment Accepted</h3>
            <div class="flex flex-col gap-3">
              {#each BUSINESS_INFO.paymentMethods || ['Cash', 'Check'] as method}
                <div class="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  {#if method === 'Cash'}
                    <svg class="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  {:else if method === 'Check'}
                    <svg class="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  {:else}
                    <svg class="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  {/if}
                  <span class="text-gray-800 font-medium">{method}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-semibold mb-6 text-gray-900">Get A Free Estimate</h2>
          <p class="text-gray-600 mb-6">
            Fill out the form below and we'll get back to you as soon as possible to discuss your project needs.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  </div>
</section>