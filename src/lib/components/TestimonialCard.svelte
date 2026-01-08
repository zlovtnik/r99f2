<script lang="ts">
  import type { Testimonial } from '$lib/types';

  export let testimonial: Testimonial;
</script>

<div class="bg-white rounded-lg shadow p-4 sm:p-6" role="article" aria-labelledby="testimonial-{testimonial.id}">
  <div class="flex items-center gap-1 mb-2 sm:mb-3" role="group" aria-label="Star rating: {testimonial.rating || 0} out of 5 stars">
    {#each Array(Math.max(0, Math.min(5, testimonial.rating || 0))) as _, i}
      <span 
        class="text-yellow-400 text-lg sm:text-xl" 
        aria-hidden="true"
      >★</span>
    {/each}
  </div>
  <blockquote class="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
    <p>"{testimonial.text}"</p>
  </blockquote>
  <footer class="flex items-center gap-3">
    {#if testimonial.imageUrl}
      <img 
        src={testimonial.imageUrl} 
        alt=""
        loading="lazy"
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
      />
    {/if}
    <div class="min-w-0">
      <p id="testimonial-{testimonial.id}" class="font-semibold text-gray-900 text-sm sm:text-base truncate">{testimonial.name}</p>
      <p class="text-xs sm:text-sm text-gray-600 truncate">{testimonial.service}</p>
    </div>
  </footer>
</div>
