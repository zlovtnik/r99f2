<script lang="ts">
  import { createLocalBusinessSchema } from '$lib/utils/seo';
  import SchemaMarkup from '$lib/components/SchemaMarkup.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import { BUSINESS_INFO, SITE_URL, SERVICE_AREAS } from '$lib/utils/constants';
  import { featuredServices } from '$lib/data/services';
  import { testimonials } from '$lib/data/testimonials';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import TestimonialCard from '$lib/components/TestimonialCard.svelte';
  import CTA from '$lib/components/CTA.svelte';

  const siteUrl = SITE_URL;
  $: schema = createLocalBusinessSchema({
    ...BUSINESS_INFO,
    url: siteUrl
  });
</script>

<svelte:head>
  <title>LR Sunrise Construction - General Contractor in Portland, Maine</title>
  <meta name="description" content="LR Sunrise Construction - Your trusted general contractor in Portland, ME. Expert siding installation, carpentry, roofing, and remodeling services. 10 years of experience. Call (978) 519-9774 for a free estimate." />
  <meta name="keywords" content="general contractor, construction company, siding installation, carpentry services, roof installation, Portland Maine" />
  <link rel="canonical" href={siteUrl} />
  <meta property="og:title" content="LR Sunrise Construction - General Contractor Portland, ME" />
  <meta property="og:description" content="Exceptional general contractor solutions for your projects. Siding, carpentry, roofing, and more." />
  <meta property="og:url" content={siteUrl} />
  <meta property="og:image" content={`${siteUrl}/images/og-image.jpg`} />
  <meta property="og:image:alt" content="LR Sunrise Construction professional services in Portland, Maine" />
  <meta property="og:type" content="website" />
  <meta name="twitter:image" content={`${siteUrl}/images/og-image.jpg`} />
</svelte:head>

<SchemaMarkup {schema} />

<Hero />

<!-- Services Section -->
<section class="container mx-auto px-4 py-16">
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">We Specialize In The Following Services</h2>
    <p class="text-lg text-gray-600 max-w-3xl mx-auto">
      From siding installation to emergency repairs, our team delivers quality craftsmanship and reliable service for all your construction needs.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
    {#each featuredServices as service (service.id)}
      <ServiceCard {service} />
    {/each}
  </div>

  <div class="text-center">
    <a href="/services" class="inline-block bg-primary hover:bg-secondary text-white font-semibold px-8 py-3 rounded-lg transition-colors">
      View All Services
    </a>
  </div>
</section>

<!-- Why Choose Us Section -->
<section class="bg-gray-50 py-16">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Why Choose Us? Here's What's in It for You!</h2>
        <p class="text-gray-600 mb-6">
          Hiring a trusted general contractor isn't just about getting the job done—it's about transforming how you feel about your space. We believe in delivering services that resonate emotionally and strategically with our clients' needs.
        </p>
        <p class="text-gray-600 mb-8">
          Working with us means gaining access to a team who listens closely, prioritizes communication at every step, and values meticulous craftsmanship as much as you do.
        </p>
        
        <ul class="space-y-3">
          <li class="flex items-center gap-3">
            <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-700">Increased property value</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-700">Enhanced energy efficiency</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-700">Improved safety features</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-700">Customizable design options</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-700">Streamlined project timelines</span>
          </li>
        </ul>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h3 class="text-2xl font-bold mb-6">How Does Our Process Work?</h3>
        <p class="text-gray-600 mb-6">
          Our approach revolves around transparency, precision, and customer partnership—a philosophy designed to ensure satisfaction at every stage.
        </p>
        <ol class="space-y-4">
          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</span>
            <span class="text-gray-700">Conduct a detailed consultation for personalized recommendations</span>
          </li>
          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</span>
            <span class="text-gray-700">Create a transparent estimate outlining scope and cost</span>
          </li>
          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</span>
            <span class="text-gray-700">Select materials based on durability and style preferences</span>
          </li>
          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">4</span>
            <span class="text-gray-700">Execute projects with precision-focused craftsmanship</span>
          </li>
          <li class="flex gap-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">5</span>
            <span class="text-gray-700">Perform final walkthroughs ensuring every detail is addressed</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</section>

<!-- Service Areas Section -->
<section class="py-16">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">We Serve the Surrounding Areas!</h2>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        No matter where you're located within Portland, ME, we've got you covered! We proudly extend our services to surrounding communities as part of our commitment to accessibility and convenience.
      </p>
    </div>

    <div class="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
      {#each SERVICE_AREAS as area}
        <a href={`/service-areas/${area.toLowerCase().replace(/ /g, '-')}`} class="bg-gray-100 hover:bg-neutral-light text-gray-700 hover:text-primary px-4 py-2 rounded-full transition-colors">
          {area}, ME
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section class="bg-gray-50 py-16">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
      <p class="text-lg text-gray-600">See what our satisfied customers have to say about our work.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each testimonials.slice(0, 3) as testimonial (testimonial.id)}
        <TestimonialCard {testimonial} />
      {/each}
    </div>

    <div class="text-center mt-8">
      <a href="/testimonials" class="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors">
        View All Testimonials
      </a>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-16">
  <div class="container mx-auto px-4">
    <div class="bg-primary rounded-2xl p-8 md:p-12 text-white text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Your Trusted General Contractor for Total Property Transformation</h2>
      <p class="text-xl text-neutral-light mb-8 max-w-3xl mx-auto">
        LR Sunrise Construction specializes in delivering comprehensive construction services including siding installation across Portland, ME. Whether you're seeking enhanced curb appeal or structural improvements, we're here to turn your vision into reality.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/contact" class="inline-block bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors">
          Contact Us Today
        </a>
        <a href={`tel:${BUSINESS_INFO.telephone}`} class="inline-block border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">
          Call: {BUSINESS_INFO.telephone}
        </a>
      </div>
    </div>
  </div>
</section>
