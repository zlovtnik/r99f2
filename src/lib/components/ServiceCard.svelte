<script lang="ts">
  import type { Service } from '$lib/types';

  export let service: Service;
</script>

<div class="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow transition-transform duration-300 hover:-translate-y-1" role="article">
  <div class="relative overflow-hidden">
    <img
      src={service.imageUrl}
      alt={service.imageAlt}
      width="400"
      height="192"
      class="w-full h-40 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
      loading="lazy"
      decoding="async"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
  <div class="p-4 sm:p-6">
    <h3 class="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">{service.name}</h3>
    <p class="text-gray-600 mb-4 text-sm sm:text-base">{service.description}</p>
    
    <h4 class="font-semibold mb-2 text-sm sm:text-base">Benefits:</h4>
    <ul class="list-disc list-inside text-xs sm:text-sm text-gray-700 mb-4 sm:mb-6">
      {#each service.benefits as benefit}
        <li class="py-0.5">{benefit}</li>
      {/each}
    </ul>
    
    {#if service.warranty}
      <p class="text-xs sm:text-sm text-green-800 font-semibold mb-4">{service.warranty}</p>
    {/if}
    
    <a href="/services/{service.slug}" class="btn btn-primary block text-center py-3 sm:py-2 hover:scale-105 transition-transform duration-200">
      {service.cta}
    </a>
  </div>
</div>
