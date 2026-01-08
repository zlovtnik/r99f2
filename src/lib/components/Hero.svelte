<script lang="ts">
  import { BUSINESS_INFO, PROMOTIONAL_BADGES } from '$lib/utils/constants';
  import { formatPhoneNumber } from '$lib/utils/format';
  import { fade, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
</script>

<section class="bg-gradient-to-r from-primary to-secondary text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
  <div class="absolute inset-0 bg-black/20"></div>
  <!-- Animated background elements -->
  <div class="absolute inset-0">
    <div class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style="animation-delay: 0s; animation-duration: 3s;"></div>
    <div class="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce" style="animation-delay: 1s; animation-duration: 4s;"></div>
    <div class="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce" style="animation-delay: 2s; animation-duration: 3.5s;"></div>
  </div>
  <div class="container mx-auto px-4 sm:px-6 relative z-10">
    <div class="max-w-3xl mx-auto text-center">
      <div in:fade={{ duration: 800, easing: quintOut }}>
        <p class="text-white/90 uppercase tracking-wider text-sm sm:text-base font-medium mb-3 sm:mb-4">
          General Contractor • {BUSINESS_INFO.city}, {BUSINESS_INFO.state}
        </p>
      </div>
      <div in:slide={{ duration: 600, delay: 200, easing: quintOut }}>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          Exceptional General Contractor Solutions for Your Projects
        </h1>
      </div>
      <div in:fade={{ duration: 600, delay: 400, easing: quintOut }}>
        <p class="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-neutral-light">
          Isn't it time to transform your home or business with reliable expertise?
        </p>
        <p class="text-base sm:text-lg mb-6 sm:mb-8 text-neutral-light/90 px-2">
          A skilled general contractor can make all the difference in your property improvement journey. At LR Sunrise Construction, we specialize in creating tailored solutions that meet local needs.
        </p>
      </div>
      
      <!-- Badges - scrollable on mobile -->
      <div in:slide={{ duration: 500, delay: 600, easing: quintOut }} class="flex flex-nowrap gap-2 sm:gap-4 mb-6 sm:mb-8 justify-start sm:justify-center overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:flex-wrap">
        {#each PROMOTIONAL_BADGES as badge, i (`${badge.title}|${badge.subtitle}`)}
          <div
            class="bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 border border-white/20 flex-shrink-0 snap-start text-sm sm:text-base hover:bg-white/20 transition-colors duration-200"
            in:fade={{ duration: 300, delay: 700 + i * 50, easing: quintOut }}
          >
            <span class="font-bold">{badge.title}</span> <span class="whitespace-nowrap">{badge.subtitle}</span>
          </div>
        {/each}
      </div>

      <!-- CTA buttons - stacked on mobile with proper sizing -->
      <div in:slide={{ duration: 500, delay: 800, easing: quintOut }} class="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center px-2 sm:px-0">
        <a href="/contact" class="btn bg-accent text-white hover:bg-accent/90 font-semibold px-6 sm:px-8 py-3 rounded-lg text-center transition-all duration-200 hover:scale-105 hover:shadow-lg text-base sm:text-lg shadow-lg">
          Get Free Estimate
        </a>
        <a href={`tel:${BUSINESS_INFO.telephone}`} class="btn border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 rounded-lg text-center transition-all duration-200 hover:scale-105 text-base sm:text-lg">
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now: {formatPhoneNumber(BUSINESS_INFO.telephone)}
          </span>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* Respect users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .animate-bounce {
      animation: none !important;
    }
  }
</style>
