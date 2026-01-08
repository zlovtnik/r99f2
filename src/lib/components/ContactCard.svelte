<script lang="ts">
  export let type: string;
  export let icon: string;
  export let href: string | undefined = undefined;
  export let content: string;
  export let ariaLabel: string;
</script>

<div class="flex flex-col items-center">
  <svg class="w-10 h-10 sm:w-12 sm:h-12 text-white mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icon}></path>
  </svg>
  <h3 class="text-lg sm:text-xl font-bold mb-2">{type}</h3>
  {#if href}
    <a {href} class="text-base sm:text-lg font-semibold text-white hover:text-accent transition-colors break-words min-h-[44px] flex items-center px-3 py-2 rounded-lg active:bg-white/10" aria-label={ariaLabel}>
      {content}
    </a>
  {:else}
    <p class="text-base sm:text-lg font-semibold text-white text-center">
      {content}
    </p>
  {/if}
</div>