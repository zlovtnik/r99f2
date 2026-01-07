<script lang="ts">
  import type { Testimonial } from '$lib/types';

  export let testimonial: Testimonial;
</script>

<div class="bg-white rounded-lg shadow p-6" role="article" aria-labelledby="testimonial-{testimonial.id}">
  <div class="flex items-center gap-1 mb-3" role="group" aria-label="Star rating: {testimonial.rating || 0} out of 5 stars">
    {#each Array(Math.max(0, Math.min(5, testimonial.rating || 0))) as _, i}
      <span 
        class="text-yellow-400" 
        aria-hidden="true"
        role="img"
        aria-label="{i + 1} star"
      >★</span>
    {/each}
  </div>
  <blockquote class="text-gray-700 mb-4">
    <p>"{testimonial.text}"</p>
  </blockquote>
  <footer class="flex items-center gap-3">
    {#if testimonial.imageUrl}
      <img 
        src={testimonial.imageUrl} 
        alt=""
        loading="lazy"
        class="w-12 h-12 rounded-full object-cover"
      />
    {/if}
    <div>
      <p id="testimonial-{testimonial.id}" class="font-semibold text-gray-900">{testimonial.name}</p>
      <p class="text-sm text-gray-600">{testimonial.service}</p>
    </div>
  </footer>
</div>
