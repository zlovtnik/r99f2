<script lang="ts">
  import { createLocalBusinessSchema, createAggregateRatingSchema } from "$lib/utils/seo";
  import SchemaMarkup from "$lib/components/SchemaMarkup.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import { BUSINESS_INFO, SITE_URL, STATS, SERVICE_AREAS } from "$lib/utils/constants";
  import { featuredServices } from "$lib/data/services";
  import { testimonials } from "$lib/data/testimonials";
  import { benefits } from "$lib/data/benefits";
  import { featuredServiceAreas } from "$lib/data/serviceAreas";
  import ServiceCard from "$lib/components/ServiceCard.svelte";
  import TestimonialCard from "$lib/components/TestimonialCard.svelte";
  import BlogPostCard from "$lib/components/BlogPostCard.svelte";
  import BenefitIcon from "$lib/components/BenefitIcon.svelte";
  import PhoneIcon from "$lib/components/icons/PhoneIcon.svelte";
  import { blogPosts } from "$lib/data/blog";
  import { fade, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  const siteUrl = SITE_URL;
  $: schema = createLocalBusinessSchema({
    ...BUSINESS_INFO,
    url: siteUrl,
  });

  // Aggregate rating schema for review rich snippets
  $: aggregateRatingSchema = createAggregateRatingSchema({
    ratingValue: STATS.starRating,
    reviewCount: testimonials.length
  });

  // Combined LocalBusiness schema with aggregateRating embedded
  $: localBusinessWithRating = {
    ...schema,
    aggregateRating: aggregateRatingSchema
  };

  // Use pre-filtered featured areas (no runtime filtering needed)
  const featuredAreas = featuredServiceAreas;
</script>

<svelte:head>
  <title
    >Siding Installation & Construction Services | LR Sunrise Construction
    Portland ME</title
  >
  <meta
    name="description"
    content="Siding Installation & Construction Services in Portland, ME — Expert siding, carpentry, roofing & remodeling. 10+ years experience. Free estimates. Call (978) 519-9774."
  />
  <meta
    name="keywords"
    content="siding installation, construction services, carpentry, roofing, remodeling, Portland Maine"
  />
  <link rel="canonical" href={siteUrl} />
  <meta
    property="og:title"
    content="Siding Installation & Construction Services - LR Sunrise Construction Portland, ME"
  />
  <meta
    property="og:description"
    content="Professional siding installation and construction services. Carpentry, roofing, remodeling in Portland, Maine."
  />
  <meta property="og:url" content={siteUrl} />
  <meta property="og:image" content={`${siteUrl}/images/og-image.webp`} />
  <meta
    property="og:image:alt"
    content="LR Sunrise Construction professional services in Portland, Maine"
  />
  <meta property="og:type" content="website" />
  <meta name="twitter:image" content={`${siteUrl}/images/og-image.webp`} />
</svelte:head>

<SchemaMarkup schema={localBusinessWithRating} />

<Hero />

<!-- Services Section -->
<section
  class="container mx-auto px-4 sm:px-6 py-10 sm:py-16"
  in:fade={{ duration: 600, easing: quintOut }}
>
  <div class="text-center mb-8 sm:mb-12">
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
      Siding, Roof Installation & Construction Services
    </h2>
    <p class="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
      From siding installation to roof replacement, our general contractor team
      delivers quality craftsmanship for all your property needs.
    </p>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8"
  >
    {#each featuredServices as service, i (service.id)}
      <div
        transition:slide={{ duration: 400, delay: i * 100, easing: quintOut }}
      >
        <ServiceCard {service} />
      </div>
    {/each}
  </div>

  <div class="text-center">
    <a
      href="/services"
      class="inline-block bg-primary hover:bg-secondary active:bg-secondary/90 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors text-base sm:text-lg"
    >
      View All Services
    </a>
  </div>
</section>

<!-- Why Choose Us Section (Simplified) -->
<section
  class="bg-gray-50 py-10 sm:py-16"
  in:fade={{ duration: 600, delay: 100, easing: quintOut }}
>
  <div class="container mx-auto px-4 sm:px-6">
    <div class="text-center mb-8 sm:mb-12">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
        Why Portland Homeowners Trust Us
      </h2>
      <p class="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
        10+ years of quality craftsmanship, transparent pricing, and same-day emergency response.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
      {#each benefits.slice(0, 4) as benefit, i}
        <div
          class="bg-white rounded-xl shadow-md p-5 sm:p-6 text-center hover:shadow-lg transition-shadow"
          transition:fade={{ duration: 600, delay: i * 100 }}
        >
          <div
            class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <div class="text-primary">
              <BenefitIcon icon={benefit.icon} />
            </div>
          </div>
          <p class="text-gray-700 font-medium text-sm sm:text-base">{benefit.text}</p>
        </div>
      {/each}
    </div>

    <div class="text-center mt-8">
      <a
        href="/about"
        class="inline-flex items-center gap-2 text-primary hover:text-secondary font-semibold transition-colors"
      >
        Learn more about our process
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</section>

<!-- Service Areas Section -->
<section class="py-10 sm:py-16">
  <div class="container mx-auto px-4 sm:px-6">
    <div class="text-center mb-8 sm:mb-12">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
        Proudly Serving Portland & Nearby Communities
      </h2>
      <p class="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
        Quality construction services within 200 miles of Portland, ME. Same-day estimates available.
      </p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto mb-8">
      {#each featuredAreas as area (area.slug)}
        <a
          href={`/service-areas/${area.slug}`}
          class="bg-white border-2 border-gray-100 hover:border-primary hover:bg-primary/5 rounded-xl p-4 sm:p-5 text-center transition-all duration-200 hover:shadow-lg group"
        >
          <svg class="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="font-semibold text-gray-800 group-hover:text-primary text-sm sm:text-base block">{area.name}</span>
          <span class="text-xs text-gray-500">Maine</span>
        </a>
      {/each}
    </div>

    <div class="text-center">
      <a
        href="/service-areas"
        class="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors text-sm sm:text-base"
      >
        View All {SERVICE_AREAS.length} Service Areas
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section
  class="bg-gray-50 py-10 sm:py-16"
  in:fade={{ duration: 600, delay: 200, easing: quintOut }}
>
  <div class="container mx-auto px-4 sm:px-6">
    <div class="text-center mb-8 sm:mb-12">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
        Client Testimonials
      </h2>
      <p class="text-base sm:text-lg text-gray-600">
        See what our satisfied customers have to say about our work.
      </p>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
    >
      {#each testimonials.slice(0, 3) as testimonial, i (testimonial.id)}
        <div
          transition:slide={{
            duration: 400,
            delay: 300 + i * 100,
            easing: quintOut,
          }}
        >
          <TestimonialCard {testimonial} />
        </div>
      {/each}
    </div>

    <div class="text-center mt-6 sm:mt-8">
      <a
        href="/testimonials"
        class="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-primary/90 font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors text-base sm:text-lg"
      >
        View All Testimonials
      </a>
    </div>
  </div>
</section>

<!-- Blog Section -->
<section
  class="py-10 sm:py-16"
  in:fade={{ duration: 600, delay: 200, easing: quintOut }}
>
  <div class="container mx-auto px-4 sm:px-6">
    <div class="text-center mb-8 sm:mb-12">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
        Home Improvement Tips & Insights
      </h2>
      <p class="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
        Stay informed with expert advice on roofing, siding, and home maintenance for Maine homeowners.
      </p>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
    >
      {#each blogPosts.slice(0, 3) as post, i (post.id)}
        <div
          transition:slide={{
            duration: 400,
            delay: 300 + i * 100,
            easing: quintOut,
          }}
        >
          <BlogPostCard {post} />
        </div>
      {/each}
    </div>

    <div class="text-center mt-6 sm:mt-8">
      <a
        href="/blog"
        class="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-primary/90 font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors text-base sm:text-lg"
      >
        Read Our Blog
      </a>
    </div>
  </div>
</section>

<!-- CTA Section with Contact Form -->
<section class="py-10 sm:py-16 bg-gradient-to-br from-gray-50 to-white">
  <div class="container mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
      <!-- Left: Contact Info -->
      <div class="text-center lg:text-left">
        <span class="inline-flex items-center gap-1 bg-accent/20 text-accent font-bold text-sm px-4 py-1.5 rounded-full mb-4">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Free Quote in 24 Hours
        </span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Ready to Start Your Project?
        </h2>
        <p class="text-base sm:text-lg text-gray-600 mb-6">
          Get a free, no-obligation estimate for your siding, roofing, or construction project. 
          We'll respond within 24 hours.
        </p>
        
        <div class="space-y-4 mb-6">
          <a href={`tel:${BUSINESS_INFO.telephone}`} class="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <PhoneIcon class="w-6 h-6 text-primary" />
            </div>
            <div class="text-left">
              <p class="text-sm text-gray-500">Call us now</p>
              <p class="font-bold text-gray-900 text-lg">{BUSINESS_INFO.telephone}</p>
            </div>
          </a>
          
          <a href={`mailto:${BUSINESS_INFO.email}`} class="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="text-left">
              <p class="text-sm text-gray-500">Email us</p>
              <p class="font-bold text-gray-900">{BUSINESS_INFO.email}</p>
            </div>
          </a>
        </div>
        
        <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
          <span class="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">✓ 10+ Years Experience</span>
          <span class="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">✓ Licensed & Insured</span>
          <span class="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">✓ 15% Senior Discount</span>
        </div>
      </div>
      
      <!-- Right: Quick Contact Card -->
      <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">Get Your Free Estimate</h3>
        <p class="text-gray-500 text-sm text-center mb-6">Fill out the form or call us directly</p>
        
        <a 
          href="/contact" 
          class="block w-full bg-accent hover:bg-accent/90 text-neutral-900 font-bold py-4 px-6 rounded-xl text-center transition-all duration-200 hover:scale-[1.02] hover:shadow-lg mb-4"
        >
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Request Free Quote Now
          </span>
        </a>
        
        <a 
          href={`tel:${BUSINESS_INFO.telephone}`}
          class="block w-full bg-primary hover:bg-secondary text-white font-semibold py-4 px-6 rounded-xl text-center transition-colors"
        >
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now: {BUSINESS_INFO.telephone}
          </span>
        </a>
        
        <p class="text-center text-xs text-gray-400 mt-4">
          Same-day response guaranteed • No obligation
        </p>
      </div>
    </div>
  </div>
</section>

<!-- RCLabs Advertisement -->
<section class="bg-gray-50 border-t border-gray-200 py-4">
  <div class="container mx-auto px-4 sm:px-6">
    <div
      class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center"
    >
      <span class="text-xs text-gray-500">Website by</span>
      <a
        href="https://rclabs.dev"
        target="_blank"
        rel="noopener noreferrer"
        class="font-semibold text-primary hover:text-secondary transition-colors text-sm"
      >
        RCLabs Software House
      </a>
      <span class="hidden sm:inline text-gray-300">•</span>
      <span class="text-xs text-gray-500"
        >Building Digital Innovation - AI, Cloud, Web Apps & System Integration</span
      >
    </div>
  </div>
</section>
