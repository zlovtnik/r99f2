<script lang="ts">
  import { page } from '$app/stores';
  import { onDestroy } from 'svelte';
  import { BUSINESS_INFO, FEATURED_AREAS } from '$utils/constants';
  import { featuredServices } from '$data/services';
  import { serviceAreas } from '$data/serviceAreas';
  import { slide } from 'svelte/transition';

  let isOpen = false;
  let servicesDropdownOpen = false;
  let areasDropdownOpen = false;
  let mobileServicesOpen = false;
  let mobileAreasOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
    // Prevent body scroll when menu is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
  };

  const closeMenu = () => {
    isOpen = false;
    mobileServicesOpen = false;
    mobileAreasOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (isOpen) closeMenu();
      servicesDropdownOpen = false;
      areasDropdownOpen = false;
    }
  };

  // Get featured areas for dropdown
  $: featuredAreasList = serviceAreas.filter(area => 
    FEATURED_AREAS.includes(area.name as typeof FEATURED_AREAS[number])
  );

  // Cleanup on component destroy to ensure body scroll is restored
  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<nav class="sticky top-0 z-50 bg-white shadow-md">
  <!-- Top bar with phone number (desktop) -->
  <div class="hidden md:block bg-primary text-white py-1.5">
    <div class="container mx-auto px-4 flex justify-between items-center text-sm">
      <span class="flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {BUSINESS_INFO.hoursDisplay}
      </span>
      <a href={`tel:${BUSINESS_INFO.telephone}`} class="flex items-center gap-2 font-semibold hover:text-neutral-light transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call: {BUSINESS_INFO.telephone}
      </a>
    </div>
  </div>

  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16 md:h-16">
      <!-- Logo with better mobile sizing -->
      <a href="/" class="text-xl sm:text-2xl font-bold text-primary truncate max-w-[200px] sm:max-w-none">
        LR Sunrise Construction
      </a>
      
      <!-- Mobile menu button with larger touch target -->
      <button 
        on:click={toggleMenu} 
        class="md:hidden flex items-center justify-center w-12 h-12 -mr-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors" 
        aria-label={isOpen ? 'Close menu' : 'Open menu'} 
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg class="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {#if isOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>
      
      <!-- Desktop navigation with dropdowns -->
      <ul class="hidden md:flex gap-2 lg:gap-4 items-center">
        <li><a href="/" class="nav-link" class:active={$page.url.pathname === '/'}>Home</a></li>
        
        <!-- Services Dropdown -->
        <li 
          class="relative"
          on:mouseenter={() => servicesDropdownOpen = true}
          on:mouseleave={() => servicesDropdownOpen = false}
        >
          <button 
            class="nav-link flex items-center gap-1"
            class:active={$page.url.pathname.startsWith('/services')}
            aria-expanded={servicesDropdownOpen}
            aria-haspopup="true"
            on:click={() => servicesDropdownOpen = !servicesDropdownOpen}
          >
            Services
            <svg class="w-4 h-4 transition-transform {servicesDropdownOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {#if servicesDropdownOpen}
            <div 
              class="absolute top-full left-0 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
              transition:slide={{ duration: 150 }}
            >
              {#each featuredServices.slice(0, 6) as service}
                <a 
                  href={`/services/${service.slug}`} 
                  class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  {service.name}
                </a>
              {/each}
              <div class="border-t border-gray-100 mt-2 pt-2">
                <a 
                  href="/services" 
                  class="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
                >
                  View All Services →
                </a>
              </div>
            </div>
          {/if}
        </li>
        
        <!-- Areas Dropdown -->
        <li 
          class="relative"
          on:mouseenter={() => areasDropdownOpen = true}
          on:mouseleave={() => areasDropdownOpen = false}
        >
          <button 
            class="nav-link flex items-center gap-1"
            class:active={$page.url.pathname.startsWith('/service-areas')}
            aria-expanded={areasDropdownOpen}
            aria-haspopup="true"
          >
            Areas
            <svg class="w-4 h-4 transition-transform {areasDropdownOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {#if areasDropdownOpen}
            <div 
              class="absolute top-full left-0 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
              transition:slide={{ duration: 150 }}
            >
              {#each featuredAreasList as area}
                <a 
                  href={`/service-areas/${area.slug}`} 
                  class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  {area.name}, ME
                </a>
              {/each}
              <div class="border-t border-gray-100 mt-2 pt-2">
                <a 
                  href="/service-areas" 
                  class="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
                >
                  All {serviceAreas.length} Areas →
                </a>
              </div>
            </div>
          {/if}
        </li>
        
        <li><a href="/gallery" class="nav-link" class:active={$page.url.pathname === '/gallery'}>Gallery</a></li>
        <li><a href="/blog" class="nav-link" class:active={$page.url.pathname.startsWith('/blog')}>Blog</a></li>
        <li><a href="/testimonials" class="nav-link" class:active={$page.url.pathname === '/testimonials'}>Reviews</a></li>
        <li><a href="/about" class="nav-link" class:active={$page.url.pathname === '/about'}>About</a></li>
        <li>
          <a href="/contact" class="btn bg-accent hover:bg-accent/90 text-white font-semibold px-4 py-2 rounded-lg transition-all hover:scale-105 shadow-md">
            Free Quote
          </a>
        </li>
      </ul>
    </div>
  </div>
  
  <!-- Mobile menu with slide animation -->
  <div 
    id="mobile-menu"
    class="md:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ease-in-out {isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}"
  >
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/50 transition-opacity {isOpen ? 'opacity-100' : 'opacity-0'}"
      on:click={closeMenu}
      on:keydown={(e) => {
        if (e.key === 'Enter') {
          closeMenu();
        } else if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          closeMenu();
        }
      }}
      role="button"
      tabindex="0"
      aria-label="Close menu"
    ></div>
    
    <!-- Menu panel -->
    <div class="absolute top-0 right-0 w-4/5 max-w-sm h-[calc(100vh-4rem)] bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-out {isOpen ? 'translate-x-0' : 'translate-x-full'}">
      <!-- Quick contact bar -->
      <div class="bg-primary text-white p-4">
        <a href={`tel:${BUSINESS_INFO.telephone}`} class="flex items-center gap-3 text-white hover:text-neutral-light">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span class="font-semibold">{BUSINESS_INFO.telephone}</span>
        </a>
      </div>
      
      <!-- Navigation links with collapsible sections -->
      <ul class="flex flex-col py-2">
        <li>
          <a href="/" class="mobile-nav-link" class:active={$page.url.pathname === '/'} on:click={closeMenu}>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Home
          </a>
        </li>
        
        <!-- Services with collapsible submenu -->
        <li class="border-b border-gray-100">
          <button 
            class="mobile-nav-link w-full justify-between"
            class:active={$page.url.pathname.startsWith('/services')}
            on:click={() => mobileServicesOpen = !mobileServicesOpen}
            aria-expanded={mobileServicesOpen}
          >
            <span class="flex items-center gap-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              Services
            </span>
            <svg class="w-5 h-5 transition-transform {mobileServicesOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {#if mobileServicesOpen}
            <div class="bg-gray-50 py-2" transition:slide={{ duration: 200 }}>
              {#each featuredServices.slice(0, 6) as service}
                <a 
                  href={`/services/${service.slug}`} 
                  class="block pl-14 pr-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-100"
                  on:click={closeMenu}
                >
                  {service.name}
                </a>
              {/each}
              <a 
                href="/services" 
                class="block pl-14 pr-4 py-2.5 text-sm font-semibold text-primary hover:bg-gray-100"
                on:click={closeMenu}
              >
                View All Services →
              </a>
            </div>
          {/if}
        </li>
        
        <!-- Service Areas with collapsible submenu -->
        <li class="border-b border-gray-100">
          <button 
            class="mobile-nav-link w-full justify-between"
            class:active={$page.url.pathname.startsWith('/service-areas')}
            on:click={() => mobileAreasOpen = !mobileAreasOpen}
            aria-expanded={mobileAreasOpen}
          >
            <span class="flex items-center gap-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Service Areas
            </span>
            <svg class="w-5 h-5 transition-transform {mobileAreasOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {#if mobileAreasOpen}
            <div class="bg-gray-50 py-2" transition:slide={{ duration: 200 }}>
              {#each featuredAreasList as area}
                <a 
                  href={`/service-areas/${area.slug}`} 
                  class="block pl-14 pr-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-100"
                  on:click={closeMenu}
                >
                  {area.name}, ME
                </a>
              {/each}
              <a 
                href="/service-areas" 
                class="block pl-14 pr-4 py-2.5 text-sm font-semibold text-primary hover:bg-gray-100"
                on:click={closeMenu}
              >
                All {serviceAreas.length} Areas →
              </a>
            </div>
          {/if}
        </li>
        
        <li>
          <a href="/gallery" class="mobile-nav-link" class:active={$page.url.pathname === '/gallery'} on:click={closeMenu}>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Gallery
          </a>
        </li>
        <li>
          <a href="/blog" class="mobile-nav-link" class:active={$page.url.pathname.startsWith('/blog')} on:click={closeMenu}>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Blog
          </a>
        </li>
        <li>
          <a href="/testimonials" class="mobile-nav-link" class:active={$page.url.pathname === '/testimonials'} on:click={closeMenu}>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            Testimonials
          </a>
        </li>
        <li>
          <a href="/about" class="mobile-nav-link" class:active={$page.url.pathname === '/about'} on:click={closeMenu}>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            About
          </a>
        </li>
        <li class="px-4 py-3">
          <a href="/contact" class="flex items-center justify-center gap-2 w-full bg-accent text-white text-center font-bold py-4 rounded-lg hover:bg-accent/90 transition-colors shadow-lg" on:click={closeMenu}>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Get Free Quote Now
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  .nav-link {
    @apply text-gray-700 hover:text-primary font-medium py-2 px-1 transition-colors;
  }
  .nav-link.active {
    @apply text-primary font-semibold;
  }
  .mobile-nav-link {
    @apply flex items-center gap-4 px-6 py-4 text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 border-b border-gray-100 transition-colors;
  }
  .mobile-nav-link.active {
    @apply text-primary bg-primary/5 border-l-4 border-l-primary;
  }
</style>


