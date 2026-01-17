<script lang="ts">
  import { siteConfig } from '$config/siteConfig';
  import CTA from '$components/CTA.svelte';
  import CheckIcon from '$components/CheckIcon.svelte';
  import SchemaMarkup from '$components/SchemaMarkup.svelte';
  import BeforeAfterSlider from '$components/BeforeAfterSlider.svelte';
  import { services } from '$data/services';
  import { galleryItems } from '$data/galleryItems';
  import { createBreadcrumbSchema } from '$utils/seo';

  const baseUrl = siteConfig.siteUrl;

  // Gallery categories derived from gallery data
  $: categories = [
    { id: 'all', name: 'All Projects' },
    ...Array.from(new Set(galleryItems.map(item => item.category)))
      .map(category => ({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1)
      }))
  ];

  let activeCategory = 'all';

  $: filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  // Filter items that have before/after images
  $: beforeAfterItems = galleryItems.filter(item => item.beforeImage);

  // SEO metadata
  $: seo = {
    title: 'Project Gallery | LR Sunrise Construction',
    description: 'Browse our portfolio of completed construction projects including roofing, siding, carpentry, and remodeling work in Portland, ME and surrounding areas.',
    url: `${baseUrl}/gallery`,
    image: `${baseUrl}/images/og-image.webp`
  };

  // BreadcrumbList schema
  $: breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Gallery', url: `${baseUrl}/gallery` }
  ]);
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
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
<section class="relative bg-gradient-to-br from-primary via-primary/90 to-secondary text-white py-20 overflow-hidden">
  <div class="absolute inset-0 bg-cover bg-center opacity-20" style:background-image={`url('/images/General-Contractor1.webp')`}></div>
  <div class="absolute inset-0 bg-black/40"></div>
  <div class="container mx-auto px-4 text-center relative z-10">
    <span class="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
      Our Work Speaks for Itself
    </span>
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Project Gallery</h1>
    <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
      Explore our portfolio of completed projects showcasing quality craftsmanship across Southern Maine
    </p>
    <div class="flex justify-center gap-4 mt-8">
      <span class="flex items-center gap-2 text-white/80">
        <CheckIcon class="w-5 h-5" />
        <span>Roofing</span>
      </span>
      <span class="flex items-center gap-2 text-white/80">
        <CheckIcon class="w-5 h-5" />
        <span>Siding</span>
      </span>
      <span class="flex items-center gap-2 text-white/80">
        <CheckIcon class="w-5 h-5" />
        <span>Carpentry</span>
      </span>
    </div>
  </div>
</section>

<!-- Category Filter -->
<section class="py-8 bg-white border-b sticky top-0 z-20 shadow-sm">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap justify-center gap-3">
      {#each categories as category}
        <button
          class="px-5 py-2.5 rounded-full font-medium transition-all duration-200 {activeCategory === category.id 
            ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
            : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'}"
          on:click={() => activeCategory = category.id}
          aria-pressed={activeCategory === category.id}
        >
          {category.name}
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- Before & After Transformations -->
{#if beforeAfterItems.length > 0}
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <span class="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-2 rounded-full mb-4">
          See the Difference
        </span>
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Before & After Transformations</h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Drag the slider to see the incredible transformations we've achieved for our clients
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each beforeAfterItems.slice(0, 4) as item (item.id)}
          <BeforeAfterSlider 
            beforeImage={item.beforeImage || ''}
            afterImage={item.afterImage || item.image}
            beforeAlt="Before: {item.title}"
            afterAlt="After: {item.title}"
            title={item.title}
          />
        {/each}
      </div>
    </div>
  </div>
</section>
{/if}

<!-- Gallery Grid -->
<section class="py-16 bg-gradient-to-b from-gray-50 to-white">
  <div class="container mx-auto px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Results count -->
      <p class="text-gray-600 text-center mb-8">
        Showing <span class="font-semibold text-primary">{filteredItems.length}</span> project{filteredItems.length !== 1 ? 's' : ''}
      </p>
      
      {#if filteredItems.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each filteredItems as item (item.id)}
            <article class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div class="relative h-72 bg-gray-200 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <!-- Category badge -->
                <span class="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {categories.find(c => c.id === item.category)?.name || item.category}
                </span>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900">{item.title}</h3>
                <p class="text-gray-600 mt-3 leading-relaxed line-clamp-2">{item.description}</p>
              </div>
            </article>
          {/each}
        </div>
      {:else}
        <div class="text-center py-16">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <p class="text-gray-600 text-lg">No projects found in this category.</p>
          <button 
            class="mt-4 text-primary font-medium hover:underline"
            on:click={() => activeCategory = 'all'}
          >
            View all projects →
          </button>
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Services Highlight -->
<section class="py-20 bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-5xl mx-auto text-center">
      <span class="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
        Your Project Could Be Next
      </span>
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ready to Start Your Project?</h2>
      <p class="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
        We'd love to add your project to our gallery. Whether you need roofing, siding, carpentry, or a complete renovation, we're here to bring your vision to life.
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {#each services.slice(0, 4) as service}
          <a 
            href={`/services/${service.slug}`} 
            class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-primary/5 hover:to-primary/10 transition-all duration-300 group border border-gray-100 hover:border-primary/20"
          >
            <span class="font-semibold text-gray-900 group-hover:text-primary transition-colors">{service.name}</span>
          </a>
        {/each}
      </div>
      <a 
        href="/contact" 
        class="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
      >
        Get a Free Quote
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </a>
    </div>
  </div>
</section>

<CTA />
