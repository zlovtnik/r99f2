<script lang="ts">
  import { page } from '$app/stores';
  import { blogPosts, blogCategories } from '$data/blog';
  import BlogPostCard from '$components/BlogPostCard.svelte';
  import { createCollectionSchema } from '$utils/seo';
  import SchemaMarkup from '$components/SchemaMarkup.svelte';
  import { siteConfig } from '$config/siteConfig';

  // Get selected category from query params
  $: selectedCategory = $page.url.searchParams.get('category') || '';

  // Sort posts by published date (newest first)
  $: sortedPosts = [...blogPosts].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Filter posts by selected category
  $: filteredPosts = selectedCategory
    ? sortedPosts.filter(post => post.category === selectedCategory)
    : sortedPosts;

  // Get featured post (most recent filtered post)
  $: featuredPost = filteredPosts[0];
  $: otherPosts = filteredPosts.slice(1);

  // Explore links data for DRY rendering
  const exploreLinks = [
    { href: '/services', label: 'Services', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { href: '/gallery', label: 'Gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { href: '/testimonials', label: 'Testimonials', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    { href: '/contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
  ] as const;

  // SEO metadata
  const seoTitle = 'Blog | LR Sunrise Construction - Home Improvement Tips & Advice';
  const seoDescription = 'Stay informed with the latest home improvement tips, roofing advice, and construction insights for Maine homeowners. Expert guidance from LR Sunrise Construction';
</script>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={seoDescription} />
  <meta name="keywords" content="home improvement blog, roofing tips, Maine construction, home renovation advice, siding guide" />
  <link rel="canonical" href="{siteConfig.siteUrl}/blog" />
  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={seoDescription} />
  <meta property="og:image" content="{siteConfig.siteUrl}/images/og-image.webp" />
  <meta property="og:url" content="{siteConfig.siteUrl}/blog" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seoTitle} />
  <meta name="twitter:description" content={seoDescription} />
  <meta name="twitter:image" content="{siteConfig.siteUrl}/images/og-image.webp" />
</svelte:head>

<SchemaMarkup schema={createCollectionSchema({
  name: 'LR Sunrise Construction Blog',
  description: seoDescription,
  url: `${siteConfig.siteUrl}/blog`,
  items: filteredPosts.map(post => ({
    name: post.title,
    description: post.excerpt,
    url: `${siteConfig.siteUrl}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: post.author,
    image: post.featuredImage ? `${siteConfig.siteUrl}${post.featuredImage}` : undefined
  }))
})} />

<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <section class="relative bg-gradient-to-br from-primary via-primary/90 to-secondary text-white py-20 overflow-hidden">
    <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('/images/General-Contractor1.webp')"></div>
    <div class="absolute inset-0 bg-black/40"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center">
        <span class="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
          LR Sunrise Construction
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Home Improvement Blog
        </h1>
        <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Expert tips, guides, and project insights for Maine homeowners
        </p>
      </div>
    </div>
  </section>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Featured Post -->
    {#if featuredPost}
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Latest Article</h2>
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <BlogPostCard post={featuredPost} featured={true} />
        </div>
      </section>
    {/if}

    <!-- Categories -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
      <div class="flex flex-wrap gap-2">
        <a
          href="/blog"
          class="px-4 py-2 rounded-full border transition-colors duration-200 {selectedCategory === '' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:bg-primary hover:text-white hover:border-primary'}"
        >
          All
        </a>
        {#each blogCategories as category}
          <a
            href="/blog?category={encodeURIComponent(category)}"
            class="px-4 py-2 rounded-full border transition-colors duration-200 {selectedCategory === category ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:bg-primary hover:text-white hover:border-primary'}"
          >
            {category}
          </a>
        {/each}
      </div>
    </section>

    <!-- Featured Post Empty State -->
    {#if !featuredPost}
      <section class="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 mb-12 text-center">
        <p class="text-gray-600 text-lg">No articles available in this category yet. Check back soon!</p>
      </section>
    {/if}

    <!-- All Posts -->
    {#if otherPosts.length > 0}
      <section>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">All Articles</h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {#each otherPosts as post (post.id)}
            <BlogPostCard {post} />
          {/each}
        </div>
      </section>
    {:else if filteredPosts.length === 0}
      <section class="text-center py-12">
        <p class="text-gray-600 text-lg">No articles in this category yet. Check back soon!</p>
      </section>
    {/if}
  </div>

  <!-- Explore Section -->
  <section class="py-16 bg-gradient-to-br from-primary/5 via-white to-secondary/5 border-t border-primary/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <span class="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
          Explore More
        </span>
        <h2 class="text-2xl font-bold text-gray-900">Or Explore</h2>
        <p class="text-gray-600 mt-2">Discover more about our services and projects</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {#each exploreLinks as link (link.href)}
          <a href={link.href} class="group p-6 bg-white rounded-xl border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300 text-center">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white group-focus-visible:bg-primary group-focus-visible:text-white transition-colors">
              <svg class="w-6 h-6 text-primary group-hover:text-white group-focus-visible:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={link.icon}/>
              </svg>
            </div>
            <span class="font-semibold text-gray-900 group-hover:text-primary group-focus-visible:text-primary transition-colors">{link.label}</span>
          </a>
        {/each}
      </div>
    </div>
  </section>
</div>