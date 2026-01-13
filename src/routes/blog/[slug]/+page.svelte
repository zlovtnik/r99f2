<script lang="ts">
  import type { BlogPost } from "$types";
  import BlogPostCard from "$components/BlogPostCard.svelte";
  import { createArticleSchema } from "$utils/seo";
  import SchemaMarkup from "$components/SchemaMarkup.svelte";
  import { siteConfig } from "$config/siteConfig";

  export let data: { post: BlogPost; relatedPosts: BlogPost[] };

  $: ({ post, relatedPosts } = data);

  // Normalize image path to ensure leading slash
  function normalizeImagePath(path: string): string {
    return path.startsWith("/") ? path : `/${path}`;
  }

  // Convert slug to title: split on non-alphanumeric, capitalize each word, join with spaces
  function slugToTitle(slug: string): string {
    return slug
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  // SEO metadata
  $: seoTitle = post.seoTitle || `${post.title} | LR Sunrise Construction Blog`;
  $: seoDescription = post.seoDescription || post.excerpt;
  $: canonicalUrl = `${siteConfig.siteUrl}/blog/${post.slug}`;
  $: ogImageUrl = post.featuredImage ? `${siteConfig.siteUrl}${normalizeImagePath(post.featuredImage)}` : undefined;
</script>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={seoDescription} />
  {#if post.keywords}
    <meta name="keywords" content={post.keywords.join(", ")} />
  {/if}
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={seoDescription} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="article" />
  {#if post.featuredImage}
    <meta
      property="og:image"
      content={ogImageUrl}
    />
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
    <meta
      name="twitter:image"
      content={`${siteConfig.siteUrl}${post.featuredImage}`}
    />
  {/if}
  {#if post.imageAlt}
    <meta name="twitter:image:alt" content={post.imageAlt} />
  {/if}
</svelte:head>

<SchemaMarkup
  schema={createArticleSchema({
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage
      ? `${siteConfig.siteUrl}${post.featuredImage}`
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: post.author,
    publisher: "LR Sunrise Construction",
    url: canonicalUrl,
    keywords: post.keywords || post.tags,
  })}
/>

<div class="min-h-screen bg-gray-50">
  <!-- Breadcrumb -->
  <nav class="bg-white border-b border-gray-200" aria-label="Breadcrumb">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <ol class="flex items-center space-x-2 text-sm text-gray-500" role="list">
        <li><a href="/" class="hover:text-primary">Home</a></li>
        <li><span class="mx-2" aria-hidden="true">/</span></li>
        <li><a href="/blog" class="hover:text-primary">Blog</a></li>
        <li><span class="mx-2" aria-hidden="true">/</span></li>
        <li class="text-gray-900 font-medium" aria-current="page">
          {post.title}
        </li>
      </ol>
    </div>
  </nav>

  <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Article Header -->
    <header class="mb-8">
      <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <span
          class="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
        >
          {post.category}
        </span>
        <span>•</span>
        <time datetime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
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
          <span>Updated {new Date(post.updatedAt).toLocaleDateString("en-US")}</span>
        {/if}
      </div>
    </header>

    <!-- Featured Image -->
    {#if post.featuredImage}
      <div class="mb-8">
        <img
          src={post.featuredImage}
          alt={post.imageAlt || post.title}
          class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg post-featured-image"
        />
      </div>
    {/if}

    <!-- Article Content -->
    <div class="article-content mb-8">
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
        <h3 class="text-lg font-semibold text-blue-900 mb-3">
          Related Services
        </h3>
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
  :global(.article-content) {
    font-size: 1.0625rem;
    line-height: 1.75;
    color: rgb(55, 65, 81);
  }

  :global(.article-content h1) {
    font-size: 2rem;
    font-weight: 700;
    color: rgb(17, 24, 39);
    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  :global(.article-content h2) {
    font-size: 1.5rem;
    font-weight: 600;
    color: rgb(17, 24, 39);
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }

  :global(.article-content h3) {
    font-size: 1.25rem;
    font-weight: 600;
    color: rgb(17, 24, 39);
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
  }

  :global(.article-content h4) {
    font-size: 1.125rem;
    font-weight: 600;
    color: rgb(17, 24, 39);
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  :global(.article-content p) {
    margin-bottom: 1.25rem;
    line-height: 1.75;
  }

  :global(.article-content a) {
    color: rgb(76, 175, 80);
    text-decoration: underline;
    transition: color 0.2s;
  }

  :global(.article-content a:hover) {
    color: rgb(56, 142, 60);
  }

  :global(.article-content strong) {
    font-weight: 600;
    color: rgb(17, 24, 39);
  }

  :global(.article-content em) {
    font-style: italic;
  }

  :global(.article-content code) {
    background-color: rgb(243, 244, 246);
    color: rgb(17, 24, 39);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: "Courier New", monospace;
    font-size: 0.9em;
  }

  :global(.article-content pre) {
    background-color: rgb(31, 41, 55);
    color: rgb(243, 244, 246);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1.25rem;
    font-family: "Courier New", monospace;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  :global(.article-content pre code) {
    background-color: transparent;
    color: inherit;
    padding: 0;
    font-size: 1em;
  }

  :global(.article-content ul) {
    list-style-type: disc;
    list-style-position: outside;
    margin-left: 1.5rem;
    margin-bottom: 1.25rem;
  }

  :global(.article-content ul li) {
    margin-bottom: 0.5rem;
  }

  :global(.article-content ol) {
    list-style-type: decimal;
    list-style-position: outside;
    margin-left: 1.5rem;
    margin-bottom: 1.25rem;
  }

  :global(.article-content ol li) {
    margin-bottom: 0.5rem;
  }

  :global(.article-content li) {
    line-height: 1.75;
  }

  :global(.article-content blockquote) {
    border-left: 4px solid rgb(76, 175, 80);
    padding-left: 1rem;
    margin-left: 0;
    margin-bottom: 1.25rem;
    color: rgb(107, 114, 128);
    font-style: italic;
  }

  :global(.article-content img) {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    filter: none !important;
  }

  :global(.article-content table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.25rem;
    border: 1px solid rgb(229, 231, 235);
  }

  :global(.article-content th) {
    background-color: rgb(243, 244, 246);
    font-weight: 600;
    padding: 0.75rem;
    text-align: left;
    border: 1px solid rgb(229, 231, 235);
  }

  :global(.article-content td) {
    padding: 0.75rem;
    border: 1px solid rgb(229, 231, 235);
  }

  :global(.article-content tr:nth-child(even)) {
    background-color: rgb(249, 250, 251);
  }

  :global(.article-content hr) {
    border: none;
    border-top: 2px solid rgb(229, 231, 235);
    margin: 2rem 0;
  }

  /* Ensure post images are never blurred */
  .post-featured-image {
    filter: none !important;
  }

  .post-featured-image.loaded {
    filter: none !important;
  }
</style>
