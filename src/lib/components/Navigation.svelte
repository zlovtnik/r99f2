<script lang="ts">
  import { page } from '$app/stores';
  import type { Service } from '$types';
  import { services } from '$data/services';

  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
  };
</script>

<nav class="sticky top-0 z-50 bg-white shadow">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <a href="/" class="text-2xl font-bold text-blue-600">LR Sunrise Construction</a>
      
      <button on:click={toggleMenu} class="md:hidden" aria-label="Toggle menu" aria-expanded={isOpen}>
        {#if isOpen}
          <span>✕</span>
        {:else}
          <span>☰</span>
        {/if}
      </button>
      
      <ul class="hidden md:flex gap-8">
        <li><a href="/" class:active={$page.url.pathname === '/'}>Home</a></li>
        <li><a href="/services" class:active={$page.url.pathname.startsWith('/services')}>Services</a></li>
        <li><a href="/service-areas" class:active={$page.url.pathname.startsWith('/service-areas')}>Service Areas</a></li>
        <li><a href="/about" class:active={$page.url.pathname === '/about'}>About</a></li>
        <li><a href="/contact" class="btn">Contact</a></li>
      </ul>
    </div>
    
    {#if isOpen}
      <div class="md:hidden border-t border-gray-200">
        <ul class="flex flex-col gap-4 py-4 px-4">
          <li><a href="/" class:active={$page.url.pathname === '/'} on:click={() => isOpen = false}>Home</a></li>
          <li><a href="/services" class:active={$page.url.pathname.startsWith('/services')} on:click={() => isOpen = false}>Services</a></li>
          <li><a href="/service-areas" class:active={$page.url.pathname.startsWith('/service-areas')} class:text-blue-600={$page.url.pathname.startsWith('/service-areas')} class:font-semibold={$page.url.pathname.startsWith('/service-areas')} on:click={() => isOpen = false}>Service Areas</a></li>
          <li><a href="/about" class:active={$page.url.pathname === '/about'} class:text-blue-600={$page.url.pathname === '/about'} class:font-semibold={$page.url.pathname === '/about'} on:click={() => isOpen = false}>About</a></li>
          <li><a href="/contact" class="btn" on:click={() => isOpen = false}>Contact</a></li>
        </ul>
      </div>
    {/if}
  </div>
</nav>


