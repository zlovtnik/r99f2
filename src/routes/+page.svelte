<script lang="ts">
  import { page } from '$app/stores';
  import { createLocalBusinessSchema } from '$lib/utils/seo';
  import SchemaMarkup from '$lib/components/SchemaMarkup.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import { BUSINESS_INFO } from '$lib/utils/constants';
  import { services } from '$lib/data/services';
  import { testimonials } from '$lib/data/testimonials';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import TestimonialCard from '$lib/components/TestimonialCard.svelte';
  import CTA from '$lib/components/CTA.svelte';

  $: siteUrl = $page.url.origin;
  $: schema = createLocalBusinessSchema({
    ...BUSINESS_INFO,
    url: siteUrl
  });
</script>

<svelte:head>
  <title>LB Sunrise - Professional Roofing Services in Portland, Maine</title>
  <meta name="description" content="Expert roof repair, replacement, and inspection services in Portland, Maine. Emergency roofing services available. Call (978) 519-9774 for a free quote." />
  <meta name="keywords" content="roof repair, roof replacement, roofing contractor, Portland Maine" />
  <link rel="canonical" href={siteUrl} />
  <meta property="og:title" content="LB Sunrise - Professional Roofing Services" />
  <meta property="og:description" content="Expert roof repair and replacement in Portland, Maine" />
  <meta property="og:image" content={`${siteUrl}/images/og-image.jpg`} />
  <meta property="og:image:alt" content="LB Sunrise professional roofing services in Portland, Maine" />
  <meta property="og:type" content="website" />
  <meta name="twitter:image" content={`${siteUrl}/images/og-image.jpg`} />
</svelte:head>

<SchemaMarkup {schema} />

<Hero />

<section class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-6">Professional Roofing Services in Portland, Maine</h1>
  <p class="text-lg text-gray-600 mb-12">
    LB Sunrise provides top-quality roof repair, replacement, and inspection services.
    Call us today at {BUSINESS_INFO.telephone} for a free estimate.
  </p>

  <div class="mb-16">
    <h2 class="text-3xl font-bold mb-8">Our Services</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each services as service (service.id)}
        <ServiceCard {service} />
      {/each}
    </div>
  </div>

  <div class="mb-16">
    <h2 class="text-3xl font-bold mb-8">Customer Testimonials</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each testimonials as testimonial (testimonial.id)}
        <TestimonialCard {testimonial} />
      {/each}
    </div>
  </div>
</section>

<CTA />
