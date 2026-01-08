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
  import BenefitIcon from '$lib/components/BenefitIcon.svelte';
  import { fade, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  const benefits = [
    { text: 'Increased property value', icon: 'trending-up' },
    { text: 'Enhanced energy efficiency', icon: 'zap' },
    { text: 'Improved safety features', icon: 'shield' },
    { text: 'Customizable design options', icon: 'palette' },
    { text: 'Streamlined project timelines', icon: 'clock' }
  ];

  const steps = [
    'Conduct a detailed consultation for personalized recommendations',
    'Create a transparent estimate outlining scope and cost',
    'Select materials based on durability and style preferences',
    'Execute projects with precision-focused craftsmanship',
    'Perform final walkthroughs ensuring every detail is addressed'
  ];

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
<section class="container mx-auto px-4 sm:px-6 py-10 sm:py-16" transition:fade={{ duration: 600, easing: quintOut }}>
  <div class="text-center mb-8 sm:mb-12">
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">We Specialize In The Following Services</h2>
    <p class="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
      From siding installation to emergency repairs, our team delivers quality craftsmanship and reliable service for all your construction needs.
    </p>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8">
    {#each featuredServices as service, i (service.id)}
      <div transition:slide={{ duration: 400, delay: i * 100, easing: quintOut }}>
        <ServiceCard {service} />
      </div>
    {/each}
  </div>

  <div class="text-center">
    <a href="/services" class="inline-block bg-primary hover:bg-secondary active:bg-secondary/90 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors text-base sm:text-lg">
      View All Services
    </a>
  </div>
</section>

<!-- Why Choose Us Section -->
<section class="bg-gray-50 py-10 sm:py-16" transition:fade={{ duration: 600, delay: 100, easing: quintOut }}>
  <div class="container mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Why Choose Us? Here's What's in It for You!</h2>
        <p class="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          Hiring a trusted general contractor isn't just about getting the job done—it's about transforming how you feel about your space. We believe in delivering services that resonate emotionally and strategically with our clients' needs.
        </p>
        <p class="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
          Working with us means gaining access to a team who listens closely, prioritizes communication at every step, and values meticulous craftsmanship as much as you do.
        </p>
        
        <ul class="space-y-3">
          {#each benefits as benefit, i}
            <li class="flex items-center gap-3" transition:fade={{ duration: 600, delay: i * 200 }}>
              <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <BenefitIcon icon={benefit.icon}/>
              </div>
              <span class="text-gray-700 text-sm sm:text-base">{benefit.text}</span>
            </li>
          {/each}
        </ul>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-5 sm:p-8">
        <h3 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">How Does Our Process Work?</h3>
        <p class="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          Our approach revolves around transparency, precision, and customer partnership—a philosophy designed to ensure satisfaction at every stage.
        </p>
        <ol class="space-y-4">
          {#each steps as step, i}
            <li class="flex gap-3 sm:gap-4" in:fade={{ duration: 500, delay: i * 150 }}>
              <span class="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm transition-transform hover:scale-110">{i + 1}</span>
              <span class="text-gray-700 text-sm sm:text-base">{step}</span>
            </li>
          {/each}
        </ol>
      </div>
    </div>
  </div>
</section>

<!-- Service Areas Section -->
<section class="py-10 sm:py-16">
  <div class="container mx-auto px-4 sm:px-6">
    <div class="text-center mb-8 sm:mb-12">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">We Serve the Surrounding Areas!</h2>
      <p class="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
        No matter where you're located within Portland, ME, we've got you covered! We proudly extend our services to surrounding communities as part of our commitment to accessibility and convenience.
      </p>
    </div>

    <div class="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
      {#each SERVICE_AREAS as area}
        <a href={`/service-areas/${area.toLowerCase().replace(/ /g, '-')}`} class="bg-gray-100 hover:bg-neutral-light active:bg-neutral-light/80 text-gray-700 hover:text-primary px-3 sm:px-4 py-2 rounded-full transition-colors text-sm sm:text-base">
          {area}, ME
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section class="bg-gray-50 py-10 sm:py-16" transition:fade={{ duration: 600, delay: 200, easing: quintOut }}>
  <div class="container mx-auto px-4 sm:px-6">
    <div class="text-center mb-8 sm:mb-12">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Client Testimonials</h2>
      <p class="text-base sm:text-lg text-gray-600">See what our satisfied customers have to say about our work.</p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {#each testimonials.slice(0, 3) as testimonial, i (testimonial.id)}
        <div transition:slide={{ duration: 400, delay: 300 + i * 100, easing: quintOut }}>
          <TestimonialCard {testimonial} />
        </div>
      {/each}
    </div>

    <div class="text-center mt-6 sm:mt-8">
      <a href="/testimonials" class="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-primary/90 font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors text-base sm:text-lg">
        View All Testimonials
      </a>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-10 sm:py-16">
  <div class="container mx-auto px-4 sm:px-6">
    <div class="bg-primary rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-white text-center">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Your Trusted General Contractor for Total Property Transformation</h2>
      <p class="text-base sm:text-xl text-neutral-light mb-6 sm:mb-8 max-w-3xl mx-auto">
        LR Sunrise Construction specializes in delivering comprehensive construction services including siding installation across Portland, ME. Whether you're seeking enhanced curb appeal or structural improvements, we're here to turn your vision into reality.
      </p>
      <div class="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
        <a href="/contact" class="inline-block bg-white text-primary hover:bg-gray-100 active:bg-gray-200 font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors text-base sm:text-lg">
          Contact Us Today
        </a>
        <a href={`tel:${BUSINESS_INFO.telephone}`} class="inline-block border-2 border-white text-white hover:bg-white/10 active:bg-white/20 font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors text-base sm:text-lg">
          Call: {BUSINESS_INFO.telephone}
        </a>
      </div>
    </div>
  </div>
</section>
