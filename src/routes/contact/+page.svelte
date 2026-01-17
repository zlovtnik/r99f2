<script lang="ts">
  import { siteConfig } from '$config/siteConfig';
  import ContactForm from '$components/ContactForm.svelte';
  import SchemaMarkup from '$components/SchemaMarkup.svelte';
  import GoogleMap from '$components/GoogleMap.svelte';
  import { BUSINESS_INFO, BUSINESS_HOURS, COUNTRY_CODE } from '$utils/constants';
  import { createBreadcrumbSchema } from '$utils/seo';

  const baseUrl = siteConfig.siteUrl;

  // Normalize phone number for WhatsApp (digits only with country code)
  const whatsappPhone = `${COUNTRY_CODE}${BUSINESS_INFO.telephone.replace(/\D/g, '')}`;

  // SEO metadata
  $: seo = {
    title: 'Contact Us | LR Sunrise Construction - Portland, ME',
    description: 'Contact LR Sunrise Construction for a free estimate on siding, roofing & construction. Call (978) 519-9774 or request a quote online. Serving Portland, Brunswick, Biddeford, Westbrook & 21 Maine communities.',
    keywords: 'contact general contractor, construction quote, Portland Maine contractor, Brunswick ME, free estimate',
    url: `${baseUrl}/contact`,
    image: `${baseUrl}/images/og-image.webp`
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
<section class="relative py-12 md:py-16 overflow-hidden">
  <!-- Background image -->
  <div class="absolute inset-0">
    <img src="/images/General-Contractor6.webp" alt="" class="w-full h-full object-cover" loading="eager" />
    <div class="absolute inset-0 bg-black/60"></div>
  </div>
  
  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-2xl">
      <h1 class="text-3xl md:text-4xl font-bold mb-3 text-white">
        Let's Build Something Great Together
      </h1>
      <p class="text-base md:text-lg text-white/90 mb-6">
        Ready to start your next project? Get in touch for a free estimate.
      </p>
      <a 
        href={`https://wa.me/${whatsappPhone}?text=Hi%2C%20I%27m%20interested%20in%20your%20construction%20services`} 
        target="_blank" 
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Chat on WhatsApp
      </a>
    </div>
  </div>
</section>

<section class="py-16 bg-gradient-to-b from-neutral-50 to-white relative">
  <!-- Decorative blobs -->
  <div class="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
  
  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div>
          <div class="bg-white rounded-2xl shadow-xl shadow-primary/5 border border-primary/10 p-8 mb-8 relative overflow-hidden">
            <!-- Card accent -->
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
            
            <h2 class="text-2xl font-bold mb-6 text-neutral-800 flex items-center gap-3">
              <span class="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </span>
              Contact Information
            </h2>

            <div class="space-y-5">
              <div class="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-colors group">
                <div class="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-3 flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-neutral-800 text-lg">{BUSINESS_INFO.name}</h3>
                  <p class="text-neutral-600">Area served: <span class="font-medium text-primary">{BUSINESS_INFO.serviceRadius}</span></p>
                </div>
              </div>

              <div class="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-secondary/5 to-transparent hover:from-secondary/10 transition-colors group">
                <div class="bg-gradient-to-br from-secondary to-primary rounded-xl p-3 flex-shrink-0 shadow-lg shadow-secondary/20 group-hover:scale-105 transition-transform">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="font-bold text-neutral-800">Address</p>
                  <p class="text-neutral-600">{BUSINESS_INFO.streetAddress || ''}</p>
                  <p class="text-neutral-600">{BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zipCode}</p>
                </div>
              </div>

              <div class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-accent/5 to-transparent hover:from-accent/10 transition-colors group">
                <div class="bg-gradient-to-br from-accent to-orange-500 rounded-xl p-3 flex-shrink-0 shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-bold text-neutral-800">Phone</p>
                  <a href={`tel:${BUSINESS_INFO.telephone}`} class="text-accent hover:text-orange-600 font-semibold text-lg transition-colors">{BUSINESS_INFO.telephone}</a>
                </div>
              </div>

              <div class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-colors group">
                <div class="bg-gradient-to-br from-primary to-secondary rounded-xl p-3 flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-bold text-neutral-800">Email</p>
                  <a href={`mailto:${BUSINESS_INFO.email}`} class="text-primary hover:text-secondary font-medium transition-colors">{BUSINESS_INFO.email}</a>
                </div>
              </div>

              <!-- Social Media -->
              <div class="pt-5 border-t border-primary/10">
                <p class="font-bold text-neutral-800 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  Follow Us
                </p>
                <div class="flex gap-3">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61581974097680" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-blue-500/25 hover:scale-105 hover:-translate-y-0.5"
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
                    class="w-11 h-11 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-red-500/25 hover:scale-105 hover:-translate-y-0.5"
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
                    class="w-11 h-11 bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-red-400/25 hover:scale-105 hover:-translate-y-0.5"
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
                    class="w-11 h-11 bg-gradient-to-br from-primary to-secondary hover:from-secondary hover:to-primary rounded-xl flex items-center justify-center transition-all shadow-lg shadow-primary/25 hover:scale-105 hover:-translate-y-0.5"
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
          <div class="bg-white rounded-2xl shadow-xl shadow-secondary/5 border border-secondary/10 p-8 mb-8 relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-secondary"></div>
            
            <h3 class="text-xl font-bold mb-5 text-neutral-800 flex items-center gap-3">
              <span class="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center shadow-lg shadow-secondary/25">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </span>
              Working Hours
            </h3>
            <div class="space-y-2">
              {#each BUSINESS_HOURS as hour}
                {@const parts = hour.split(': ')}
                {@const day = parts[0]}
                {@const time = parts.slice(1).join(': ')}
                <p class="flex justify-between py-2 px-3 rounded-lg odd:bg-secondary/5 even:bg-transparent">
                  <span class="text-neutral-600">{day}</span>
                  <span class="font-semibold text-neutral-800">{time}</span>
                </p>
              {/each}
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="bg-white rounded-2xl shadow-xl shadow-accent/5 border border-accent/10 p-8 relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-orange-400 to-accent"></div>
            
            <h3 class="text-xl font-bold mb-5 text-neutral-800 flex items-center gap-3">
              <span class="w-10 h-10 bg-gradient-to-br from-accent to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-accent/25">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              </span>
              Payment Accepted
            </h3>
            <div class="grid grid-cols-2 gap-3">
              {#each BUSINESS_INFO.paymentMethods || ['Cash', 'Check', 'Zelle', 'Bank Transfer'] as method}
                <div class="flex items-center gap-3 bg-gradient-to-r from-accent/5 to-transparent px-4 py-3.5 rounded-xl border border-accent/10 hover:border-accent/30 hover:from-accent/10 transition-all group">
                  {#if method === 'Cash'}
                    <div class="w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md shadow-green-500/20 group-hover:scale-105 transition-transform">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  {:else if method === 'Check'}
                    <div class="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  {:else if method === 'Zelle'}
                    <div class="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                  {:else if method === 'Bank Transfer'}
                    <div class="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                    </div>
                  {:else}
                    <div class="w-9 h-9 bg-gradient-to-br from-accent to-orange-500 rounded-lg flex items-center justify-center shadow-md shadow-accent/20 group-hover:scale-105 transition-transform">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                  {/if}
                  <span class="text-neutral-700 font-semibold text-sm">{method}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white rounded-2xl shadow-xl shadow-primary/5 border border-primary/10 p-8 relative overflow-hidden h-fit lg:sticky lg:top-8">
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
          
          <h2 class="text-2xl font-bold mb-4 text-neutral-800 flex items-center gap-3">
            <span class="w-10 h-10 bg-gradient-to-br from-accent to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-accent/25">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </span>
            Get A Free Estimate
          </h2>
          <p class="text-neutral-600 mb-6 leading-relaxed">
            Fill out the form below and we'll get back to you as soon as possible to discuss your project needs.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Google Map Section -->
<section class="py-12 bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-5xl mx-auto">
      <GoogleMap 
        address="{BUSINESS_INFO.address}"
        title="Find Us"
        height="400px"
        showDirections={true}
      />
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