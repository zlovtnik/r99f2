<script lang="ts">
  import { blogPosts, getRelatedBlogPosts } from '$data/blog';
  import type { BlogPost } from '$types';
  import BlogPostCard from '$components/BlogPostCard.svelte';
  import { createArticleSchema } from '$utils/seo';
  import SchemaMarkup from '$components/SchemaMarkup.svelte';

  export let data: { post: BlogPost; relatedPosts: BlogPost[] };

  $: ({ post, relatedPosts } = data);

  // Convert slug to title: split on non-alphanumeric, capitalize each word, join with spaces
  function slugToTitle(slug: string): string {
    return slug
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  // SEO metadata
  $: seoTitle = post.seoTitle || `${post.title} | LR Sunrise Construction Blog`;
  $: seoDescription = post.seoDescription || post.excerpt;
  $: canonicalUrl = `https://lbsunrise.com/blog/${post.slug}`;
</script>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={seoDescription} />
  {#if post.keywords}
    <meta name="keywords" content={post.keywords.join(', ')} />
  {/if}
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={seoDescription} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="article" />
  {#if post.featuredImage}
    <meta property="og:image" content={`https://lbsunrise.com${post.featuredImage}`} />
  {/if}
  {#if post.imageAlt}
    <meta property="og:image:alt" content={post.imageAlt} />
  {/if}
  <meta property="article:published_time" content={post.publishedAt} />
  {#if post.updatedAt}
    <meta property="article:modified_time" content={post.updatedAt} />
  {/if}
  <meta property="article:author" content={post.author} />
  <meta property="article:section" content={post.category} />
  {#if post.tags}
    {#each post.tags as tag}
      <meta property="article:tag" content={tag} />
    {/each}
  {/if}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seoTitle} />
  <meta name="twitter:description" content={seoDescription} />
  {#if post.featuredImage}
    <meta name="twitter:image" content={`https://lbsunrise.com${post.featuredImage}`} />
  {/if}
  {#if post.imageAlt}
    <meta name="twitter:image:alt" content={post.imageAlt} />
  {/if}
</svelte:head>

<SchemaMarkup schema={createArticleSchema({
  headline: post.title,
  description: post.excerpt,
  image: post.featuredImage ? `https://lbsunrise.com${post.featuredImage}` : undefined,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt || post.publishedAt,
  author: post.author,
  publisher: 'LR Sunrise Construction',
  url: canonicalUrl,
  keywords: post.keywords || post.tags
})} />

<div class="min-h-screen bg-gray-50">
  <!-- Breadcrumb -->
  <nav class="bg-white border-b border-gray-200" aria-label="Breadcrumb">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <ol class="flex items-center space-x-2 text-sm text-gray-500" role="list">
        <li><a href="/" class="hover:text-primary">Home</a></li>
        <li><span class="mx-2" aria-hidden="true">/</span></li>
        <li><a href="/blog" class="hover:text-primary">Blog</a></li>
        <li><span class="mx-2" aria-hidden="true">/</span></li>
        <li class="text-gray-900 font-medium" aria-current="page">{post.title}</li>
      </ol>
    </div>
  </nav>

  <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Article Header -->
    <header class="mb-8">
      <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <span class="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
          {post.category}
        </span>
        <span>•</span>
        <time datetime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
        {#if post.readingTime}
          <span>•</span>
          <span>{post.readingTime} min read</span>
        {/if}
      </div>

      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {post.title}
      </h1>

      {#if post.excerpt}
        <p class="text-xl text-gray-600 mb-6">
          {post.excerpt}
        </p>
      {/if}

      <div class="flex items-center space-x-4 text-sm text-gray-500">
        <span>By {post.author}</span>
        {#if post.updatedAt && post.updatedAt !== post.publishedAt}
          <span>•</span>
          <span>Updated {new Date(post.updatedAt).toLocaleDateString()}</span>
        {/if}
      </div>
    </header>

    <!-- Featured Image -->
    {#if post.featuredImage}
      <div class="mb-8">
        <img
          src={post.featuredImage}
          alt={post.imageAlt || post.title}
          class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
        />
      </div>
    {/if}

    <!-- Article Content -->
    <div class="prose prose-lg max-w-none mb-8">
      {@html post.content}
    </div>

    <!-- Tags -->
    {#if post.tags && post.tags.length > 0}
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
        <div class="flex flex-wrap gap-2">
          {#each post.tags as tag}
            <a
              href="/blog?tag={encodeURIComponent(tag)}"
              class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary hover:text-white transition-colors duration-200"
            >
              {tag}
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Related Services -->
    {#if post.relatedServices && post.relatedServices.length > 0}
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="text-lg font-semibold text-blue-900 mb-3">Related Services</h3>
        <div class="flex flex-wrap gap-2">
          {#each post.relatedServices as service}
            <a
              href="/services/{encodeURIComponent(service)}"
              class="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors duration-200"
            >
              {slugToTitle(service)} Services
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Related Areas -->
    {#if post.relatedAreas && post.relatedAreas.length > 0}
      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="text-lg font-semibold text-green-900 mb-3">Service Areas</h3>
        <div class="flex flex-wrap gap-2">
          {#each post.relatedAreas as area}
            <a
              href="/service-areas/{area}"
              class="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors duration-200"
            >
              {slugToTitle(area)} Services
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </article>

  <!-- Related Posts -->
  {#if relatedPosts && relatedPosts.length > 0}
    <section class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {#each relatedPosts as relatedPost}
            <BlogPostCard post={relatedPost} />
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <!-- Call to Action -->
  <section class="bg-gradient-to-br from-primary to-secondary text-white py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">
        Ready to Start Your Project?
      </h2>
      <p class="text-lg mb-6 text-white/90">
        Get expert advice and a free estimate for your home improvement needs.
      </p>
      <a
        href="/contact"
        class="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        Get Free Estimate
      </a>
    </div>
  </section>
</div>

<style>
  .prose h1 {
    @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
  }
  .prose h2 {
    @apply text-xl font-semibold text-gray-900 mt-6 mb-3;
  }
  .prose h3 {
    @apply text-lg font-medium text-gray-900 mt-5 mb-2;
  }
  .prose p {
    @apply text-gray-700 leading-relaxed mb-4;
  }
  .prose ul {
    @apply list-disc list-inside text-gray-700 mb-4 space-y-1;
  }
  .prose ol {
    @apply list-decimal list-inside text-gray-700 mb-4 space-y-1;
  }
  .prose li {
    @apply leading-relaxed;
  }
  .prose strong {
    @apply font-semibold text-gray-900;
  }
</style>