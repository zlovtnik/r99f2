<script lang="ts">
  import { BUSINESS_INFO } from '$utils/constants';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  
  let visible = false;
  
  onMount(() => {
    // Show floating CTA after scrolling past hero section
    const handleScroll = () => {
      visible = window.scrollY > 400;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<!-- Mobile floating CTA buttons -->
{#if visible}
  <div 
    class="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-3 safe-area-inset-bottom"
    transition:fly={{ y: 100, duration: 300 }}
  >
    <div class="flex gap-2 max-w-lg mx-auto">
      <!-- Call button -->
      <a 
        href={`tel:${BUSINESS_INFO.telephone}`}
        class="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-semibold py-3 px-4 rounded-xl transition-colors"
        aria-label="Call LR Sunrise Construction"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span>Call Now</span>
      </a>
      
      <!-- Quote button -->
      <a 
        href="/contact"
        class="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg"
        aria-label="Get a free quote"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Free Quote</span>
      </a>
    </div>
  </div>
{/if}

<style>
  .safe-area-inset-bottom {
    padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
  }
</style>
