<script lang="ts">
  import { siteConfig } from '$config/siteConfig';
  import { faq } from '$data/faq';
  import type { FAQ } from '$types';
  import CTA from '$components/CTA.svelte';
  import SchemaMarkup from '$components/SchemaMarkup.svelte';
  import { BUSINESS_INFO } from '$lib/utils/constants';

  const baseUrl = siteConfig.siteUrl;

  // Track which FAQ is open
  let openFaqId: string | null = null;

  function toggleFaq(id: string) {
    openFaqId = openFaqId === id ? null : id;
  }

  // SEO metadata
  $: seo = {
    title: 'Frequently Asked Questions | LR Sunrise Construction',
    description: 'Find answers to common questions about our construction services, pricing, service areas, and more. LR Sunrise Construction serves Portland, ME and surrounding areas.',
    keywords: 'construction FAQ, general contractor questions, Portland Maine contractor, construction services questions',
    url: `${baseUrl}/faq`,
    image: `${baseUrl}/images/og-faq.jpg`
  };

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
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

<SchemaMarkup schema={faqSchema} />

<!-- Hero Section -->
<section class="bg-gradient-to-r from-primary to-secondary text-white py-16">
  <div class="container mx-auto px-4 text-center">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
    <p class="text-xl text-neutral-light max-w-3xl mx-auto">
      Find answers to common questions about our construction services, process, and what makes {BUSINESS_INFO.name} the right choice for your project.
    </p>
  </div>
</section>

<!-- FAQ Accordion -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto">
      <div class="space-y-4">
        {#each faq as item (item.id)}
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              class="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              on:click={() => toggleFaq(item.id)}
              aria-expanded={openFaqId === item.id}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span class="text-lg font-semibold text-gray-900 pr-4">{item.question}</span>
              <svg
                class="w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 {openFaqId === item.id ? 'rotate-180' : ''}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`faq-answer-${item.id}`}
              class="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 overflow-hidden transition-all duration-300 {openFaqId === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pb-0'}"
              aria-hidden={openFaqId !== item.id}
            >
              <p class="pt-4">{item.answer}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Still Have Questions -->
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4 text-gray-900">Still Have Questions?</h2>
      <p class="text-gray-600 mb-8">
        Can't find the answer you're looking for? Our team is here to help. Give us a call or send us a message.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={`tel:${BUSINESS_INFO.telephone}`}
          class="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          Call {BUSINESS_INFO.telephone}
        </a>
        <a
          href="/contact"
          class="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-neutral-light transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          Send a Message
        </a>
      </div>
    </div>
  </div>
</section>

<CTA />
