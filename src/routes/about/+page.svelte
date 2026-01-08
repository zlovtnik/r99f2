<script lang="ts">
  import { SITE_URL, BUSINESS_INFO } from '$utils/constants';
  import { services } from '$data/services';

  const baseUrl = SITE_URL;

  // SEO metadata
  $: seo = {
    title: 'About Us | LR Sunrise Construction - Portland, ME',
    description: 'Learn about LR Sunrise Construction, your trusted construction company in Portland, ME. Over 10 years of experience delivering quality craftsmanship for residential and commercial projects.',
    keywords: 'construction company, about us, general contractor, Portland Maine, 10 years experience',
    url: `${baseUrl}/about`,
    image: `${baseUrl}/images/og-about.jpg`
  };
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />

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

<!-- Hero Section -->
<section class="bg-gradient-to-r from-primary to-secondary text-white py-16 relative overflow-hidden">
  <div class="absolute inset-0 bg-black/40"></div>
  <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('/images/General-Contractor.webp')"></div>
  <div class="container mx-auto px-4 relative z-10">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">Expertise and Dedication Define Our Construction Company</h1>
    <p class="text-xl text-neutral-light max-w-3xl">
      Looking for a construction company in Portland, ME that delivers reliable and professional service? At LR Sunrise Construction, we take pride in providing dependable solutions for both residential and commercial projects.
    </p>
  </div>
</section>

<section class="py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Why Our Services Matter -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Why Our Services Matter</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p class="text-lg text-gray-700 mb-4">
              Your property deserves care and attention from skilled professionals who understand the details of every project. Whether you need siding replacement, carpentry work, or emergency repairs, we're here to help enhance your space while ensuring lasting durability.
            </p>
            <p class="text-gray-700">
              Every service we offer focuses on improving aesthetics, structural integrity, and long-term value for your investment.
            </p>
          </div>
          <div class="bg-gray-100 rounded-lg p-8">
            <img src="/images/Professional-Construction-Service.webp" alt="Our general contractor at work in Portland, ME" class="rounded-lg w-full h-64 object-cover" />
          </div>
        </div>
      </div>

      <!-- Why Turn to Us -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Why Turn to Us?</h2>
        <p class="text-lg text-gray-700 mb-6">
          Our team brings years of experience and dedication to every job we tackle. We specialize in a wide range of services, including siding, roofing, painting, framing, flooring, and interior or exterior remodeling.
        </p>
        <p class="text-gray-700 mb-6">
          Operating as a mobile-only business allows us to deliver efficient solutions directly to your site when you need them most. From small repairs to extensive renovations, we approach each project with professionalism and care. We also prioritize clear communication and client satisfaction at every step.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div class="flex items-start gap-4">
            <div class="bg-neutral-light rounded-full p-3">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">10 Years of Experience</h3>
              <p class="text-gray-600 text-sm">Proven track record of quality work</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="bg-neutral-light rounded-full p-3">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Mobile Services</h3>
              <p class="text-gray-600 text-sm">We come to you within 200 miles</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="bg-neutral-light rounded-full p-3">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Special Discounts</h3>
              <p class="text-gray-600 text-sm">15% off for seniors, military, and new customers</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="bg-neutral-light rounded-full p-3">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">7 Days a Week</h3>
              <p class="text-gray-600 text-sm">Available when you need us</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Your Trusted Team -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Your Trusted Team</h2>
        <p class="text-lg text-gray-700 mb-4">
          As a construction company offering diverse services under one roof, we aim to simplify your property improvement needs. Our dedication to precision ensures that each project is completed with efficiency and attention to detail.
        </p>
        <p class="text-gray-700">
          By focusing on craftsmanship and customer satisfaction, our team delivers results designed to last.
        </p>
      </div>

      <!-- Services List -->
      <div class="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Our Services Include:</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          {#each services as service (service.id)}
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>{service.name}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-primary rounded-lg p-8 text-white text-center">
        <h2 class="text-2xl font-bold mb-4">Reliable Construction Company Solutions Tailored to You</h2>
        <p class="text-neutral-light mb-6">
          If you're searching for a professional general contractor serving Portland, ME, we'd love the opportunity to earn your trust. At LR Sunrise Construction, we strive to make property improvements stress-free by delivering high-quality results tailored to your specific goals.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" class="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors">
            Schedule an Appointment
          </a>
          <a href={`tel:${BUSINESS_INFO.telephone}`} class="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">
            Call {BUSINESS_INFO.telephone}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>