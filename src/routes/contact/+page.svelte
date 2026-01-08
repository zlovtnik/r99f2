<script lang="ts">
  import { siteConfig } from '$config/siteConfig';
  import ContactForm from '$components/ContactForm.svelte';
  import { BUSINESS_INFO } from '$lib/utils/constants';

  const baseUrl = siteConfig.siteUrl;

  // SEO metadata
  $: seo = {
    title: 'Contact Us | LR Sunrise Construction',
    description: 'Get in touch with LR Sunrise Construction for professional roofing services. Call (978) 519-9774 or fill out our contact form for a free quote.',
    keywords: 'contact roofing, roofing quote, roofing services, Portland Maine',
    url: `${baseUrl}/contact`,
    image: `${baseUrl}/images/og-contact.jpg`
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

<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-900">Contact LR Sunrise Construction</h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-semibold mb-6 text-gray-900">Get In Touch</h2>

          <div class="space-y-4">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <div>
                <p class="font-medium text-gray-900">Phone</p>
                <p class="text-gray-600">{BUSINESS_INFO.telephone}</p>
              </div>
            </div>

            <div class="flex items-center">
              <svg class="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <div>
                <p class="font-medium text-gray-900">Email</p>
                <p class="text-gray-600">{BUSINESS_INFO.email}</p>
              </div>
            </div>

            <div class="flex items-start">
              <svg class="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <div>
                <p class="font-medium text-gray-900">Service Areas</p>
                <p class="text-gray-600">{BUSINESS_INFO.serviceAreas}</p>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-900">Business Hours</h3>
            <div class="space-y-2 text-gray-600">
              {#each BUSINESS_INFO.businessHours as hour}
                <p>{hour}</p>
              {/each}
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-semibold mb-6 text-gray-900">Send Us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  </div>
</section>