<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { BUSINESS_INFO } from '$utils/constants';

  export let enabled: boolean = true;
  export let delay: number = 0; // Delay in ms before exit intent is active
  export let cookieDays: number = 7; // Don't show again for X days after closing

  let isVisible = false;
  let hasTriggered = false;
  let isActive = false;
  let closeButtonRef: HTMLButtonElement;
  let previousActiveElement: HTMLElement | null = null;

  const COOKIE_NAME = 'lrsunrise_exit_popup_dismissed';

  function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function setCookie(name: string, value: string, days: number) {
    if (typeof document === 'undefined') return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  }

  function handleMouseLeave(event: MouseEvent) {
    if (!isActive || hasTriggered || !enabled) return;
    
    // Only trigger when mouse leaves through the top of the viewport
    if (event.clientY <= 0) {
      showPopup();
    }
  }

  function showPopup() {
    if (hasTriggered || getCookie(COOKIE_NAME)) return;
    hasTriggered = true;
    // Store current focus to restore on close
    previousActiveElement = document.activeElement as HTMLElement;
    isVisible = true;
    // Focus the close button after popup renders
    tick().then(() => {
      closeButtonRef?.focus();
    });
  }

  function closePopup() {
    isVisible = false;
    setCookie(COOKIE_NAME, 'true', cookieDays);
    // Restore focus to previous element
    previousActiveElement?.focus();
    previousActiveElement = null;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isVisible) {
      closePopup();
    }
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closePopup();
    }
  }

  onMount(() => {
    if (!enabled || getCookie(COOKIE_NAME)) return;

    // Activate exit intent after delay
    const timer = setTimeout(() => {
      isActive = true;
    }, delay);

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      clearTimeout(timer);
    };
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleKeydown);
    }
  });
</script>

{#if isVisible}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-labelledby="exit-popup-title"
    tabindex="-1"
    transition:fade={{ duration: 200 }}
    on:click={handleBackdropClick}
    on:keydown={handleKeydown}
  >
    <div
      class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
      transition:scale={{ duration: 300, easing: quintOut, start: 0.9 }}
    >
      <!-- Close button -->
      <button
        bind:this={closeButtonRef}
        on:click={closePopup}
        class="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
        aria-label="Close popup"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Header with gradient -->
      <div class="bg-gradient-to-r from-primary to-secondary px-6 py-8 text-center text-white">
        <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 id="exit-popup-title" class="text-2xl font-bold mb-2">Wait! Don't Miss Out</h2>
        <p class="text-white/90">Get a free, no-obligation quote before you go</p>
      </div>

      <!-- Content -->
      <div class="p-6 text-center">
        <div class="space-y-4 mb-6">
          <div class="flex items-center gap-3 text-left p-3 bg-green-50 rounded-lg">
            <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-900">Free Quote in 24 Hours</p>
              <p class="text-sm text-gray-600">No obligation, no pressure</p>
            </div>
          </div>

          <div class="flex items-center gap-3 text-left p-3 bg-blue-50 rounded-lg">
            <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-900">15% Senior Discount</p>
              <p class="text-sm text-gray-600">Ask about our special offers</p>
            </div>
          </div>

          <div class="flex items-center gap-3 text-left p-3 bg-orange-50 rounded-lg">
            <div class="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-900">Same-Day Response</p>
              <p class="text-sm text-gray-600">We're ready to help today</p>
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="space-y-3">
          <a
            href="/contact"
            class="block w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-center"
          >
            Get Your Free Quote Now
          </a>
          
          <a
            href="tel:{BUSINESS_INFO.telephone}"
            class="block w-full py-3 px-6 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-all text-center"
          >
            <span class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              Call {BUSINESS_INFO.telephone}
            </span>
          </a>
        </div>

        <button
          on:click={closePopup}
          class="mt-4 text-gray-500 hover:text-gray-700 text-sm underline"
        >
          No thanks, I'll continue browsing
        </button>
      </div>
    </div>
  </div>
{/if}
