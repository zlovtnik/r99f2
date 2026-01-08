<script lang="ts">
  import { siteConfig } from '$config/siteConfig';
  import { testimonials } from '$data/testimonials';
  import TestimonialCard from '$components/TestimonialCard.svelte';
  import CTA from '$components/CTA.svelte';
  import SchemaMarkup from '$components/SchemaMarkup.svelte';
  import { BUSINESS_INFO } from '$lib/utils/constants';
  import { STATS } from '$lib/utils/constants';

  const baseUrl = siteConfig.siteUrl;

  // SEO metadata
  $: seo = {
    title: 'Customer Reviews & Testimonials | LR Sunrise Construction',
    description: 'Read what our satisfied customers say about LR Sunrise Construction. Real reviews from homeowners and businesses throughout Portland, ME and surrounding areas.',
    keywords: 'construction reviews, contractor testimonials, customer feedback, Portland Maine contractor reviews',
    url: `${baseUrl}/testimonials`,
    image: `${baseUrl}/images/og-testimonials.jpg`
  };

  // Review schema for SEO
  $: reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS_INFO.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: STATS.starRating,
      reviewCount: testimonials.length
    },
    review: testimonials.map(t => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: { '@type': 'Rating', ratingValue: t.rating },
      reviewBody: t.text
    }))
  };
</script>

<style>
  .hero-bg {
    background-image: url('/images/Construction-Company.webp');
  }
</style>

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

<SchemaMarkup schema={reviewSchema} />

<!-- Hero Section -->
<section class="bg-gradient-to-r from-primary to-secondary text-white py-16 relative overflow-hidden">
  <div class="absolute inset-0 bg-black/40"></div>
  <div class="absolute inset-0 bg-cover bg-center opacity-20 hero-bg"></div>
  <div class="container mx-auto px-4 text-center relative z-10">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h1>
    <p class="text-xl text-neutral-light max-w-3xl mx-auto">
      Don't just take our word for it. Read real reviews from homeowners and businesses who have trusted {BUSINESS_INFO.name} with their construction projects.
    </p>
    <div class="mt-8 flex items-center justify-center gap-2">
      <div class="flex">
        {#each Array(5) as _, i}
          <svg class="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        {/each}
      </div>
      <span class="text-2xl font-bold ml-2">5.0</span>
      <span class="text-neutral-light">Average Rating</span>
    </div>
  </div>
</section>

<!-- Testimonials Grid -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each testimonials as testimonial (testimonial.id)}
          <TestimonialCard {testimonial} />
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div class="text-4xl md:text-5xl font-bold text-primary mb-2">{BUSINESS_INFO.yearsOfExperience}+</div>
          <div class="text-gray-600">Years Experience</div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold text-primary mb-2">{STATS.projectsCompleted}+</div>
          <div class="text-gray-600">Projects Completed</div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold text-primary mb-2">{STATS.satisfactionRate}%</div>
          <div class="text-gray-600">Satisfaction Rate</div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold text-primary mb-2">{STATS.starRating}</div>
          <div class="text-gray-600">Star Rating</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Why Customers Choose Us -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8 text-gray-900">Why Customers Choose Us</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="bg-neutral-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Quality Workmanship</h3>
          <p class="text-gray-600">Every project is completed with attention to detail and premium materials.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="bg-neutral-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Competitive Pricing</h3>
          <p class="text-gray-600">Fair, transparent pricing with special discounts for seniors and veterans.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="bg-neutral-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Clear Communication</h3>
          <p class="text-gray-600">We keep you informed every step of the way from start to finish.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<CTA />
