<script lang="ts">
  import { BUSINESS_INFO, PROMOTIONAL_BADGES, SERVICE_OPTIONS } from '$lib/utils/constants';
  import { formatPhoneNumber } from '$lib/utils/format';
  import { fade, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { goto } from '$app/navigation';

  let selectedDateObj: Date | null = null;
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  let formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    message: ''
  };

  $: daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  $: firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function selectDate(day: number) {
    const date = new Date(currentYear, currentMonth, day);
    if (date < new Date(new Date().setHours(0, 0, 0, 0))) return;
    
    selectedDateObj = date;
    // Create local YYYY-MM-DD string to avoid timezone issues
    const year = selectedDateObj.getFullYear();
    const month = String(selectedDateObj.getMonth() + 1).padStart(2, '0');
    const dayStr = String(selectedDateObj.getDate()).padStart(2, '0');
    const localDateString = `${year}-${month}-${dayStr}`;
    
    formData.preferredDate = localDateString;
  }

  function prevMonth() {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
  }

  function handleSubmit() {
    // Clean formData by omitting empty values
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    );
    
    // Store in sessionStorage (with error handling)
    try {
      sessionStorage.setItem('contactFormData', JSON.stringify(cleanedData));
    } catch (err) {
      console.error('Failed to save contact form data to sessionStorage:', err);
    }
    
    // Navigate to contact page without query params
    goto('/contact');
  }
</script>

<section class="bg-gradient-to-r from-primary to-secondary text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
  <div class="absolute inset-0 bg-black/20"></div>
  <!-- Animated background elements -->
  <div class="absolute inset-0" aria-hidden="true">
    <div class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style="animation-delay: 0s; animation-duration: 3s;"></div>
    <div class="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce" style="animation-delay: 1s; animation-duration: 4s;"></div>
    <div class="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce" style="animation-delay: 2s; animation-duration: 3.5s;"></div>
  </div>
  <div class="container mx-auto px-4 sm:px-6 relative z-10">
    <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
      <!-- Left side: Hero text -->
      <div class="text-center lg:text-left lg:flex-grow-[0.5]">
        <div in:fade={{ duration: 800, easing: quintOut }}>
          <p class="text-white/90 uppercase tracking-wider text-sm sm:text-base font-medium mb-3 sm:mb-4">
            General Contractor • {BUSINESS_INFO.city}, {BUSINESS_INFO.state}
          </p>
        </div>
        <div in:slide={{ duration: 600, delay: 200, easing: quintOut }}>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
            Expert Siding & Roof Installation Services in Portland
          </h1>
        </div>
        <div in:fade={{ duration: 600, delay: 400, easing: quintOut }}>
          <p class="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-neutral-light">
            Your trusted general contractor for quality construction and remodeling.
          </p>
          <p class="text-base sm:text-lg mb-6 sm:mb-8 text-neutral-light/90 px-2 lg:px-0">
            LR Sunrise Construction specializes in siding installation, roof replacement, and property improvements. Transform your home with our expert craftsmanship.
          </p>
        </div>
        
        <!-- Badges - scrollable on mobile -->
        <div in:slide={{ duration: 500, delay: 600, easing: quintOut }} class="flex flex-nowrap gap-2 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:flex-wrap">
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
        <div in:slide={{ duration: 500, delay: 800, easing: quintOut }} class="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center lg:justify-start px-2 sm:px-0">
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

      <!-- Middle: Calendar Widget -->
      <div in:slide={{ duration: 600, delay: 1000, easing: quintOut }} class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 max-w-sm mx-auto lg:flex-grow-1">
        <h3 class="text-lg font-bold mb-3 text-white text-center">Select Preferred Date</h3>
        
        <!-- Calendar Header -->
        <div class="flex items-center justify-between mb-3">
          <button 
            on:click={prevMonth}
            class="p-1.5 hover:bg-white/20 rounded transition-colors"
            aria-label="Previous month"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h4 class="text-white font-semibold text-base">
            {monthNames[currentMonth]} {currentYear}
          </h4>
          
          <button 
            on:click={nextMonth}
            class="p-1.5 hover:bg-white/20 rounded transition-colors"
            aria-label="Next month"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Day Names -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          {#each dayNames as dayName}
            <div class="text-center text-white/70 text-sm font-medium py-1">
              {dayName}
            </div>
          {/each}
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-1">
          <!-- Empty cells for days before the first day of the month -->
          {#each Array(firstDayOfMonth) as _}
            <div class="aspect-square"></div>
          {/each}
          
          <!-- Days of the month -->
          {#each Array(daysInMonth) as _, i}
            {@const day = i + 1}
            {@const date = new Date(currentYear, currentMonth, day)}
            {@const isToday = new Date().toDateString() === date.toDateString()}
            {@const isSelected = selectedDateObj && selectedDateObj.getFullYear() === currentYear && selectedDateObj.getMonth() === currentMonth && selectedDateObj.getDate() === day}
            {@const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))}
            
            <button
              on:click={() => selectDate(day)}
              disabled={isPast}
              class="aspect-square flex items-center justify-center text-sm font-medium rounded-md transition-all duration-200 hover:bg-accent/80 hover:text-white {isSelected ? 'bg-accent text-white' : isToday ? 'bg-white/25 text-white' : 'text-white/80 hover:bg-white/15'} {isPast ? 'opacity-50 cursor-not-allowed' : ''}"
              aria-label="Select {monthNames[currentMonth]} {day}, {currentYear}"
            >
              {day}
            </button>
          {/each}
        </div>

        {#if selectedDateObj}
          <div class="mt-3 p-2 bg-accent/15 rounded text-center">
            <p class="text-white text-sm">
              {selectedDateObj.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        {/if}
      </div>

      <!-- Right: Combined Form -->
      <div in:slide={{ duration: 600, delay: 1200, easing: quintOut }} class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 max-w-sm mx-auto lg:flex-grow-1">
        <h3 class="text-lg font-bold mb-3 text-white text-center">Get Free Estimate</h3>
        <form on:submit|preventDefault={handleSubmit} class="space-y-3">
          <div>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
              class="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent text-sm"
              placeholder="Your name"
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              required
              class="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent text-sm"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <input
              type="tel"
              id="phone"
              bind:value={formData.phone}
              required
              class="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent text-sm"
              placeholder="(207) 123-4567"
            />
          </div>
          <div>
            <select
              id="service"
              bind:value={formData.service}
              required
              class="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent text-sm"
            >
              <option value="" disabled>Choose service</option>
              {#each SERVICE_OPTIONS as service}
                <option value={service}>{service}</option>
              {/each}
            </select>
          </div>
          <div>
            <textarea
              id="message"
              bind:value={formData.message}
              class="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent text-sm"
              placeholder="Tell us about your project..."
              rows="3"
            ></textarea>
          </div>
          {#if selectedDateObj}
            <div aria-live="polite" id="selected-date-display" class="mt-2 p-2 bg-accent/15 rounded">
              <p class="text-white text-sm font-medium">Selected Date: {selectedDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          {/if}
          <input type="hidden" name="preferredDate" value={selectedDateObj ? selectedDateObj.toISOString().split('T')[0] : ''} />
          <button
            type="submit"
            class="w-full bg-accent text-white font-semibold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-1 focus:ring-offset-transparent text-sm"
            aria-describedby={selectedDateObj ? 'selected-date-display' : undefined}
          >
            Get Free Estimate
          </button>
        </form>
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

  /* Improve select dropdown option contrast */
  select option {
    color: #000 !important;
    background-color: #fff !important;
  }

  /* Webkit-specific overrides for better cross-browser support */
  select::-webkit-listbox option {
    color: #000 !important;
    background-color: #fff !important;
  }
</style>
