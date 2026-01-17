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
  <div class="absolute inset-0 bg-cover bg-center opacity-30" style="background-image: url('/images/General-Contractor6.webp')"></div>
  <div class="container mx-auto px-4 relative z-10">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">Let's Build Something Great Together</h1>
    <p class="text-xl text-white/90 max-w-2xl">
      Ready to start your next project? Our team is here to answer your questions and provide a free, no-obligation estimate.
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
                  <p class="text-gray-600">Area served: {BUSINESS_INFO.serviceRadius}</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="bg-neutral-light rounded-full p-3 flex-shrink-0">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Address</p>
                  <p class="text-gray-600">{BUSINESS_INFO.streetAddress || ''}</p>
                  <p class="text-gray-600">{BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zipCode}</p>
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

              <!-- Social Media -->
              <div class="pt-4 border-t border-gray-200">
                <p class="font-semibold text-gray-900 mb-3">Follow Us</p>
                <div class="flex gap-3">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61581974097680" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
                      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.youtube.com/channel/UCzohehO6gVmAPgq8jETJhLQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                    aria-label="YouTube"
                  >
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 576 512" aria-hidden="true">
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.yelp.com/biz/lr-sunrise-construction-portland" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Yelp"
                  >
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 384 512" aria-hidden="true">
                      <path d="M42.9 240.32l99.62 48.61c19.2 9.4 16.2 37.51-4.5 42.71L30.5 358.45a22.79 22.79 0 0 1-28.21-19.6 197.16 197.16 0 0 1 9-85.32 22.8 22.8 0 0 1 31.61-13.21zm44 239.25a199.45 199.45 0 0 0 79.42 32.11A22.78 22.78 0 0 0 192.94 490l3.9-110.82c.7-21.3-25.5-31.91-39.81-16.1l-74.21 82.4a22.82 22.82 0 0 0 4.09 34.09zm145.34-109.92l58.81 94a22.93 22.93 0 0 0 34 5.5 198.36 198.36 0 0 0 52.71-67.61A23 23 0 0 0 364.17 370l-105.42-34.26c-20.31-6.5-37.81 15.8-26.51 33.91zm148.33-132.23a197.44 197.44 0 0 0-50.41-69.31 22.85 22.85 0 0 0-34 4.4l-62 91.92c-11.9 17.7 4.7 40.61 25.2 34.71L366 268.63a23 23 0 0 0 14.61-31.21zM62.11 30.18a22.86 22.86 0 0 0-9.9 32l104.12 180.44c11.7 20.2 42.61 11.9 42.61-11.4V22.88a22.67 22.67 0 0 0-24.5-22.8 320.37 320.37 0 0 0-112.33 30.1z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.mapquest.com/us/maine/lr-sunrise-construction-777793747" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="w-10 h-10 bg-primary hover:bg-secondary rounded-full flex items-center justify-center transition-colors"
                    aria-label="Find us on MapQuest"
                  >
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 384 512" aria-hidden="true">
                      <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/>
                    </svg>
                  </a>
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
              {#each BUSINESS_INFO.paymentMethods || ['Cash', 'Check', 'Zelle', 'Bank Transfer'] as method}
                <div class="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  {#if method === 'Cash'}
                    <svg class="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  {:else if method === 'Check'}
                    <svg class="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  {:else if method === 'Zelle'}
                    <svg class="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  {:else if method === 'Bank Transfer'}
                    <svg class="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
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

<!-- Explore More Section -->
<section class="py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/10 relative overflow-hidden">
  <!-- Decorative elements -->
  <div class="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
  <div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
  <div class="absolute top-1/2 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-2xl"></div>
  
  <div class="container mx-auto px-4 relative z-10">
    <div class="text-center mb-12">
      <span class="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Discover More</span>
      <h2 class="text-3xl md:text-4xl font-bold text-neutral-800 mb-3">Explore Our World</h2>
      <p class="text-neutral-600 max-w-xl mx-auto">Find everything you need to start your next project with confidence</p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      <!-- Services Card -->
      <a href="/services" class="group relative bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-primary/10">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-primary/25">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 class="font-bold text-neutral-800 text-lg mb-2 group-hover:text-primary transition-colors">All Services</h3>
          <p class="text-neutral-500 text-sm leading-relaxed">Browse our complete range of construction and roofing services</p>
          <div class="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Explore <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
      </a>
      
      <!-- Service Areas Card -->
      <a href="/service-areas" class="group relative bg-white rounded-2xl p-6 border border-neutral-200 hover:border-secondary/60 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-secondary/15">
        <div class="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-secondary/30">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="font-bold text-neutral-800 text-lg mb-2 group-hover:text-primary transition-colors">Service Areas</h3>
          <p class="text-neutral-500 text-sm leading-relaxed">Find services available in Portland and nearby communities</p>
          <div class="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Discover <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
      </a>
      
      <!-- Blog Card -->
      <a href="/blog" class="group relative bg-white rounded-2xl p-6 border border-neutral-200 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-accent/15">
        <div class="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 bg-gradient-to-br from-accent to-orange-500 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-accent/30">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="font-bold text-neutral-800 text-lg mb-2 group-hover:text-accent transition-colors">Learn More</h3>
          <p class="text-neutral-500 text-sm leading-relaxed">Expert tips, guides, and insights on home improvement</p>
          <div class="mt-4 flex items-center text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Read <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
      </a>
      
      <!-- Gallery Card -->
      <a href="/gallery" class="group relative bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-primary/10">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative">
          <div class="w-14 h-14 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-primary/25">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="font-bold text-neutral-800 text-lg mb-2 group-hover:text-primary transition-colors">View Projects</h3>
          <p class="text-neutral-500 text-sm leading-relaxed">Browse our portfolio of completed residential projects</p>
          <div class="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Gallery <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>