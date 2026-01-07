<script lang="ts">
  import type { Service } from '$lib/types';

  export let service: Service;
</script>

<div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
  <img
    src={service.imageUrl}
    alt={service.imageAlt}
    class="w-full h-48 object-cover"
  />
  <div class="p-6">
    <h3 class="text-2xl font-bold mb-2">{service.name}</h3>
    <p class="text-gray-600 mb-4">{service.description}</p>
    
    <h4 class="font-semibold mb-2">Benefits:</h4>
    <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
      {#each service.benefits as benefit}
        <li>{benefit}</li>
      {/each}
    </ul>
    
    {#if service.warranty}
      <p class="text-sm text-green-600 font-semibold mb-4">{service.warranty}</p>
    {/if}
    
    <a href="/services/{service.slug}" class="btn btn-primary">
      {service.cta}
    </a>
  </div>
</div>
