<script lang="ts">
  import { siteConfig } from '$config/siteConfig';
  import CTA from '$components/CTA.svelte';
  import SchemaMarkup from '$components/SchemaMarkup.svelte';
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

  // SEO metadata
  $: seo = {
    title: 'Project Gallery | LR Sunrise Construction',
    description: 'Browse our portfolio of completed construction projects including roofing, siding, carpentry, and remodeling work in Portland, ME and surrounding areas.',
    url: `${baseUrl}/gallery`,
    image: `${baseUrl}/images/og-gallery.jpg`
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
<section class="bg-gradient-to-r from-primary to-secondary text-white py-16 relative overflow-hidden">
  <div class="absolute inset-0 bg-black/40"></div>
  <div class="absolute inset-0 bg-cover bg-center opacity-20" style:background-image={`url('/images/General-Contractor1.webp')`}></div>
  <div class="container mx-auto px-4 text-center relative z-10">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">Our Project Gallery</h1>
    <p class="text-xl text-neutral-light max-w-3xl mx-auto">
      Explore our portfolio of completed projects. From roofing and siding to custom carpentry and remodeling, see the quality craftsmanship we bring to every job.
    </p>
  </div>
</section>

<!-- Category Filter -->
<section class="py-8 bg-white border-b">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap justify-center gap-2">
      {#each categories as category}
        <button
          class="px-4 py-2 rounded-full font-medium transition-colors {activeCategory === category.id 
            ? 'bg-primary text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          on:click={() => activeCategory = category.id}
          aria-pressed={activeCategory === category.id}
        >
          {category.name}
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- Gallery Grid -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-6xl mx-auto">
      {#if filteredItems.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each filteredItems as item (item.id)}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden group">
              <div class="relative h-64 bg-gray-200 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div class="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                    View Project
                  </span>
                </div>
              </div>
              <div class="p-6">
                <span class="text-sm text-primary font-medium uppercase tracking-wide">
                  {categories.find(c => c.id === item.category)?.name || item.category}
                </span>
                <h3 class="text-xl font-semibold text-gray-900 mt-2">{item.title}</h3>
                <p class="text-gray-600 mt-2">{item.description}</p>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-center py-12">
          <p class="text-gray-600 text-lg">No projects found in this category.</p>
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Services Highlight -->
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4 text-gray-900">Ready to Start Your Project?</h2>
      <p class="text-gray-600 mb-8">
        We'd love to add your project to our gallery. Whether you need roofing, siding, carpentry, or a complete renovation, we're here to bring your vision to life.
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {#each services.slice(0, 4) as service}
          <a href={`/services/${service.slug}`} class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <span class="font-medium text-gray-900">{service.name}</span>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<CTA />
