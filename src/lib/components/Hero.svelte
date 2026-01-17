<script lang="ts">
  import { BUSINESS_INFO, PROMOTIONAL_BADGES, SERVICE_OPTIONS } from '$lib/utils/constants';
  import { formatPhoneNumber } from '$lib/utils/format';
  import { validateContactForm } from '$lib/utils/validation';
  import { fade, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { goto } from '$app/navigation';

  let errors: Record<string, string> = {};

  let formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };

  function handlePhoneInput(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const cursorStart = input.selectionStart ?? 0;
    const rawValue = input.value;
    const formatted = formatPhoneNumber(rawValue);
    
    // Calculate new cursor position by counting digits before cursor
    let digitsBeforeCursor = 0;
    for (let i = 0; i < cursorStart; i++) {
      if (/\d/.test(rawValue[i])) {
        digitsBeforeCursor++;
      }
    }
    
    // Find new position in formatted string
    let newPos = 0;
    if (digitsBeforeCursor === 0) {
      newPos = 0;
    } else {
      let digitsSeen = 0;
      for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted[i])) {
          digitsSeen++;
          if (digitsSeen >= digitsBeforeCursor) {
            newPos = i + 1;
            break;
          }
        }
      }
    }
    
    // Update input value and restore cursor
    input.value = formatted;
    input.setSelectionRange(newPos, newPos);
    formData.phone = formatted;
    errors = { ...errors, phone: '' };
    
  }

  function handleSubmit() {
    errors = validateContactForm({ ...formData, zipCode: '' });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Clean formData by omitting empty values
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    );
    
    // Store in sessionStorage (with error handling)
    try {
      sessionStorage.setItem('contactFormData', JSON.stringify(cleanedData));
      formData = {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      };
    } catch (err) {
      console.error('Failed to save contact form data to sessionStorage:', err);
    }
    
    // Navigate to contact page without query params
    goto('/contact');
  }
</script>

<section class="text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
  <div class="absolute inset-0">
    <img
      src="/images/General-Contractor-1.webp"
      alt=""
      class="absolute inset-0 w-full h-full object-cover"
      fetchpriority="high"
      decoding="async"
      aria-hidden="true"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-primary/70 to-secondary/70"></div>
    <div class="absolute inset-0 bg-black/30"></div>
  </div>
  <!-- Animated background elements -->
  <div class="absolute inset-0" aria-hidden="true">
    <div class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style="animation-delay: 0s; animation-duration: 3s;"></div>
    <div class="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce" style="animation-delay: 1s; animation-duration: 4s;"></div>
    <div class="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce" style="animation-delay: 2s; animation-duration: 3.5s;"></div>
  </div>
  <div class="container mx-auto px-3 sm:px-6 relative z-10">
    <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-stretch lg:items-start">
      <!-- Left side: Hero text - No transitions on LCP elements to avoid render delay -->
      <div class="text-center lg:text-left lg:flex-1 w-full lg:w-auto">
        <div>
          <p class="text-white/90 uppercase tracking-wider text-xs sm:text-sm font-medium mb-2 sm:mb-3">
            General Contractor • {BUSINESS_INFO.city}, {BUSINESS_INFO.state}
          </p>
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Protect Your Home. Boost Your Curb Appeal.
          </h1>
        </div>
        <div>
          <p class="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 text-white/95 font-medium">
            Portland's trusted choice for siding, roofing &amp; expert craftsmanship.
          </p>
          <p class="text-sm sm:text-base mb-4 sm:mb-6 text-white/90">
            10+ years serving Maine homeowners. Free estimates within 24 hours. Same-day emergency response available.
          </p>
        </div>
        
        <!-- Badges - scrollable on mobile -->
        <div in:slide={{ duration: 500, delay: 600, easing: quintOut }} class="flex flex-nowrap gap-2 mb-4 sm:mb-6 justify-center lg:justify-start overflow-x-auto pb-2 sm:pb-0 -mx-3 px-3 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:flex-wrap">
          {#each PROMOTIONAL_BADGES as badge, i (`${badge.title}|${badge.subtitle}`)}
            <div
              class="bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-1.5 sm:py-2 border border-white/20 flex-shrink-0 snap-start text-xs sm:text-sm hover:bg-white/20 transition-colors duration-200"
              in:fade={{ duration: 300, delay: 700 + i * 50, easing: quintOut }}
            >
              <span class="font-bold">{badge.title}</span> <span class="whitespace-nowrap">{badge.subtitle}</span>
            </div>
          {/each}
        </div>

        <!-- CTA buttons - stacked on mobile with proper sizing -->
        <div in:slide={{ duration: 500, delay: 800, easing: quintOut }} class="flex flex-col gap-2 sm:flex-row sm:gap-3 justify-center lg:justify-start">
          <a href="/contact" class="btn bg-accent text-neutral-900 hover:bg-accent/90 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-center transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm sm:text-base shadow-lg flex-1 sm:flex-none group">
            <span class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse motion-reduce:animate-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Free Quote in 24 Hours
            </span>
          </a>
          <a href={`tel:${BUSINESS_INFO.telephone}`} class="btn border-2 border-white text-white hover:bg-white/10 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-center transition-all duration-200 hover:scale-105 text-xs sm:text-sm flex-1 sm:flex-none">
            <span class="flex items-center justify-center gap-1 sm:gap-2">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="hidden sm:inline">Call Now:</span> {formatPhoneNumber(BUSINESS_INFO.telephone)}
            </span>
          </a>
        </div>
      </div>

      <!-- Right: Form -->
      <div in:slide={{ duration: 600, delay: 1000, easing: quintOut }} class="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 w-full sm:max-w-md lg:max-w-sm mx-auto lg:mx-0">
        <h2 class="text-base sm:text-lg font-bold mb-3 text-white text-center">Schedule Your FREE Estimate Today!</h2>
        <form on:submit|preventDefault={handleSubmit} class="space-y-2 w-full">
          <div>
            <label for="name" class="sr-only">Name</label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
              autocomplete="name"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              class="w-full px-2 sm:px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent text-sm sm:text-base"
              placeholder="Your name"
            />
            {#if errors.name}
              <p id="name-error" class="mt-1 text-xs text-white/90" aria-live="polite">{errors.name}</p>
            {/if}
          </div>
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              required
              autocomplete="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              class="w-full px-2 sm:px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent text-sm sm:text-base"
              placeholder="your@email.com"
            />
            {#if errors.email}
              <p id="email-error" class="mt-1 text-xs text-white/90" aria-live="polite">{errors.email}</p>
            {/if}
          </div>
          <div>
            <label for="phone" class="sr-only">Phone</label>
            <input
              type="tel"
              id="phone"
              bind:value={formData.phone}
              on:input={handlePhoneInput}
              required
              autocomplete="tel"
              inputmode="tel"
              title="Enter a valid US phone number (e.g., (207) 123-4567 or 2071234567)"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              class="w-full px-2 sm:px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent text-sm sm:text-base"
              placeholder="(207) 123-4567"
            />
            {#if errors.phone}
              <p id="phone-error" class="mt-1 text-xs text-white/90" aria-live="polite">{errors.phone}</p>
            {/if}
          </div>
          <div>
            <label for="service" class="sr-only">Service</label>
            <select
              id="service"
              bind:value={formData.service}
              required
              autocomplete="off"
              aria-invalid={errors.service ? 'true' : 'false'}
              aria-describedby={errors.service ? 'service-error' : undefined}
              class="w-full px-2 sm:px-3 py-2 bg-white/20 border border-white/30 rounded text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent text-xs sm:text-sm"
            >
              <option value="" disabled>Choose service</option>
              {#each SERVICE_OPTIONS as service}
                <option value={service}>{service}</option>
              {/each}
            </select>
            {#if errors.service}
              <p id="service-error" class="mt-1 text-xs text-white/90" aria-live="polite">{errors.service}</p>
            {/if}
          </div>
          <div>
            <label for="message" class="sr-only">Message</label>
            <textarea
              id="message"
              bind:value={formData.message}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              class="w-full px-2 sm:px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent text-xs sm:text-sm"
              placeholder="Tell us about your project..."
              rows="3"
            ></textarea>
            {#if errors.message}
              <p id="message-error" class="mt-1 text-xs text-white/90" aria-live="polite">{errors.message}</p>
            {/if}
          </div>
          <button
            type="submit"
            class="w-full bg-accent text-neutral-900 font-bold py-2.5 px-3 sm:px-4 rounded transition-all duration-200 hover:bg-accent/90 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent text-xs sm:text-sm shadow-lg"
            aria-label="Get Your Free Quote Now"
          >
            <span class="flex items-center justify-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Your Free Quote Now
            </span>
          </button>
          <p class="text-center text-xs text-white/70 mt-1">Same-day response guaranteed</p>
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

</style>
