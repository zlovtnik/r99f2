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
  <meta property="og:image" content="{siteConfig.siteUrl}/images/og-image.jpg" />
  <meta property="og:url" content="{siteConfig.siteUrl}/blog" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seoTitle} />
  <meta name="twitter:description" content={seoDescription} />
  <meta name="twitter:image" content="{siteConfig.siteUrl}/images/og-image.jpg" />
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
  <section class="bg-gradient-to-br from-primary to-secondary text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Home Improvement Blog
        </h1>
        <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
          Expert tips, guides, and insights for Maine homeowners
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
</div>