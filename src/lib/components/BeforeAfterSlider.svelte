<script lang="ts">
  import { onMount } from 'svelte';

  export let beforeImage: string;
  export let afterImage: string;
  export let beforeAlt: string = 'Before';
  export let afterAlt: string = 'After';
  export let title: string = '';

  let sliderPosition = 50;
  let container: HTMLDivElement;
  let isDragging = false;

  function updateSliderPosition(clientX: number) {
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    sliderPosition = percentage;
  }

  function handleMouseDown(event: MouseEvent) {
    isDragging = true;
    updateSliderPosition(event.clientX);
  }

  function handleMouseMove(event: MouseEvent) {
    if (isDragging) {
      updateSliderPosition(event.clientX);
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleTouchStart(event: TouchEvent) {
    isDragging = true;
    if (event.touches[0]) {
      updateSliderPosition(event.touches[0].clientX);
    }
  }

  function handleTouchMove(event: TouchEvent) {
    if (isDragging && event.touches[0]) {
      event.preventDefault();
      updateSliderPosition(event.touches[0].clientX);
    }
  }

  function handleTouchEnd() {
    isDragging = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      sliderPosition = Math.max(0, sliderPosition - 5);
    } else if (event.key === 'ArrowRight') {
      sliderPosition = Math.min(100, sliderPosition + 5);
    }
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleTouchEnd);
      }
    };
  });
</script>

<div class="before-after-slider">
  {#if title}
    <h3 class="text-lg font-semibold text-gray-900 mb-3 text-center">{title}</h3>
  {/if}
  
  <div
    bind:this={container}
    class="relative aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none shadow-lg"
    role="slider"
    aria-label="Before and after comparison slider"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={Math.round(sliderPosition)}
    tabindex="0"
    on:mousedown={handleMouseDown}
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:keydown={handleKeydown}
  >
    <!-- After Image (Background) -->
    <img
      src={afterImage}
      alt={afterAlt}
      class="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />

    <!-- Before Image (Clipped) -->
    <div
      class="absolute inset-0 overflow-hidden"
      style="width: {sliderPosition}%"
    >
      <img
        src={beforeImage}
        alt={beforeAlt}
        class="absolute inset-0 w-full h-full object-cover"
        style="width: {container ? container.offsetWidth : 100}px; max-width: none"
        loading="lazy"
      />
    </div>

    <!-- Slider Handle -->
    <div
      class="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 cursor-ew-resize"
      style="left: {sliderPosition}%"
    >
      <!-- Handle Circle -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-primary">
        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
        </svg>
      </div>
    </div>

    <!-- Labels -->
    <div class="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
      Before
    </div>
    <div class="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
      After
    </div>
  </div>

  <p class="text-center text-gray-500 text-sm mt-2">
    Drag the slider to compare before and after
  </p>
</div>

<style>
  .before-after-slider img {
    pointer-events: none;
    user-select: none;
  }
</style>
