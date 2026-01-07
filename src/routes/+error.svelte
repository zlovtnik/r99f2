<script lang="ts">
  import { page } from '$app/stores';
  import { BUSINESS_INFO } from '$lib/utils/constants';
  import { goto } from '$app/navigation';

  // Log errors in development with sanitized data
  if (typeof window !== 'undefined' && import.meta.env.DEV) {
    console.error('Page error:', {
      status: $page.status,
      message: $page.error?.message || 'Unknown error'
    });
  }

  const sanitizedPhone = BUSINESS_INFO.telephone.replace(/[^+\d]/g, '');
  const telHref = `tel:${sanitizedPhone || BUSINESS_INFO.telephone}`;
  const emailHref = `mailto:${BUSINESS_INFO.email.trim()}`;

  function goBack() {
    if (typeof window !== 'undefined') {
      window.history.back();
    } else {
      goto('/');
    }
  }
</script>

<svelte:head>
  {#if $page.status === 404}
    <title>Page Not Found | {BUSINESS_INFO.name}</title>
    <meta name="description" content={`The page you're looking for doesn't exist. Contact ${BUSINESS_INFO.name} for professional roofing services.`} />
  {:else}
    <title>Server Error | {BUSINESS_INFO.name}</title>
    <meta name="description" content={`We're experiencing technical difficulties. Please contact ${BUSINESS_INFO.name} directly.`} />
  {/if}
</svelte:head>

<section class="min-h-screen bg-gray-50 flex items-center justify-center py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-2xl mx-auto text-center">
      {#if $page.status === 404}
        <!-- 404 Error -->
        <div class="mb-8">
          <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 class="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
          <p class="text-xl text-gray-600 mb-8">
            The page you're looking for doesn't exist. It might have been moved or you may have mistyped the URL.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 class="text-xl font-semibold mb-4 text-gray-900">What can you do?</h3>
          <div class="space-y-4 text-left max-w-md mx-auto">
            <p class="text-gray-700">• Go back to our <a href="/" class="text-blue-600 hover:underline">home page</a></p>
            <p class="text-gray-700">• Browse our <a href="/services" class="text-blue-600 hover:underline">services</a></p>
            <p class="text-gray-700">• Check our <a href="/service-areas" class="text-blue-600 hover:underline">service areas</a></p>
            <p class="text-gray-700">• <a href="/contact" class="text-blue-600 hover:underline">Contact us</a> for roofing services</p>
          </div>
        </div>
      {:else}
        <!-- 500 Error -->
        <div class="mb-8">
          <h1 class="text-6xl font-bold text-gray-900 mb-4">500</h1>
          <h2 class="text-3xl font-semibold text-gray-700 mb-6">Server Error</h2>
          <p class="text-xl text-gray-600 mb-8">
            We're experiencing technical difficulties. Our team has been notified and is working to resolve the issue.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 class="text-xl font-semibold mb-4 text-gray-900">Contact Us Directly</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <div>
                <p class="font-medium text-gray-900">Phone</p>
                <p class="text-gray-600">
                  <a href={telHref} class="hover:underline">{BUSINESS_INFO.telephone}</a>
                </p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <div>
                <p class="font-medium text-gray-900">Email</p>
                <p class="text-gray-600">
                  <a href={emailHref} class="hover:underline">{BUSINESS_INFO.email}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      {/if}

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/" class="btn btn-primary">Go Home</a>
        <button on:click={goBack} class="btn btn-secondary">Go Back</button>
      </div>
    </div>
  </div>
</section>