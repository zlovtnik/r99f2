<script lang="ts">
  import type { BlogPost } from '$types';

  export let post: BlogPost;
  export let featured: boolean = false;
</script>

{#if featured}
  <!-- Featured Post Layout -->
  <div class="flex flex-col lg:flex-row">
    {#if post.featuredImage}
      <div class="lg:w-1/2 mb-6 lg:mb-0 lg:mr-8">
        <img
          src={post.featuredImage}
          alt={post.imageAlt || post.title}
          class="w-full h-64 lg:h-full object-cover rounded-lg"
        />
      </div>
    {/if}
    <div class="{post.featuredImage ? 'lg:w-1/2' : 'lg:w-full'} flex flex-col justify-center">
      <div class="flex items-center space-x-2 text-sm text-gray-500 mb-3">
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

      <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors duration-200">
        <a href="/blog/{post.slug}">{post.title}</a>
      </h2>

      <p class="text-gray-600 mb-4 text-lg leading-relaxed">
        {post.excerpt}
      </p>

      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">By {post.author}</span>
        <a
          href="/blog/{post.slug}"
          class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
        >
          Read More
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
{:else}
  <!-- Regular Post Card Layout -->
  <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
    {#if post.featuredImage}
      <div class="aspect-w-16 aspect-h-9">
        <img
          src={post.featuredImage}
          alt={post.imageAlt || post.title}
          class="w-full object-cover"
        />
      </div>
    {/if}

    <div class="p-6">
      <div class="flex items-center space-x-2 text-sm text-gray-500 mb-3">
        <span class="px-2 py-1 bg-primary/10 text-primary rounded-full font-medium text-xs">
          {post.category}
        </span>
        <span>•</span>
        <time datetime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </time>
        {#if post.readingTime}
          <span>•</span>
          <span>{post.readingTime} min</span>
        {/if}
      </div>

      <h3 class="text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors duration-200">
        <a href="/blog/{post.slug}">{post.title}</a>
      </h3>

      <p class="text-gray-600 mb-4 line-clamp-3">
        {post.excerpt}
      </p>

      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">By {post.author}</span>
        <a
          href="/blog/{post.slug}"
          class="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
        >
          Read More →
        </a>
      </div>

      {#if post.tags && post.tags.length > 0}
        <div class="mt-4 flex flex-wrap gap-1">
          {#each post.tags.slice(0, 3) as tag}
            <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              {tag}
            </span>
          {/each}
          {#if post.tags.length > 3}
            <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              +{post.tags.length - 3} more
            </span>
          {/if}
        </div>
      {/if}
    </div>
  </article>
{/if}

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .aspect-w-16 {
    position: relative;
    padding-bottom: 56.25%;
  }

  .aspect-w-16 > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>