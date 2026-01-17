<script lang="ts">
  import { BUSINESS_INFO } from '$lib/utils/constants';

  export let address: string = BUSINESS_INFO.address;
  export let zoom: number = 14;
  export let height: string = '400px';
  export let title: string = 'Our Location';
  export let showDirections: boolean = true;

  // Encode address for URL
  $: encodedAddress = encodeURIComponent(address);
  
  // Google Maps embed URL (uses no API key for basic embed)
  $: mapUrl = `https://www.google.com/maps?q=${encodedAddress}&z=${zoom}&output=embed`;
  
  // Google Maps directions URL
  $: directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
</script>

<div class="google-map-container">
  {#if title}
    <h3 class="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
  {/if}
  
  <div class="relative rounded-xl overflow-hidden shadow-lg border border-gray-200" style="height: {height}">
    <iframe
      src={mapUrl}
      {title}
      class="w-full h-full border-0"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    ></iframe>
    
    <!-- Overlay gradient at bottom for cleaner look -->
    <div class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
  </div>

  {#if showDirections}
    <div class="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-md"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        Get Directions
      </a>
      
      <a
        href="tel:{BUSINESS_INFO.telephone}"
        class="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
        Call Us
      </a>
    </div>
  {/if}

  <div class="mt-4 text-center">
    <p class="text-gray-600 text-sm">
      <strong>Address:</strong> {address}
    </p>
    <p class="text-gray-500 text-sm mt-1">
      Serving {BUSINESS_INFO.serviceRadius} radius from Portland, ME
    </p>
  </div>
</div>
