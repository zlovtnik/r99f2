<script lang="ts">
  import { validateContactForm } from '$lib/utils/validation';
  import { SERVICE_OPTIONS, KNOWN_ACRONYMS } from '$lib/utils/constants';
  import type { ContactFormData } from '$lib/types';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ErrorMessage from '$components/ErrorMessage.svelte';

  let formData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    zipCode: ''
  };

  let errors: Record<string, string> = {};
  let submitted = false;

  onMount(() => {
    // Try to read from sessionStorage first (from hero form)
    const storedData = sessionStorage.getItem('contactFormData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (typeof parsedData === 'object' && parsedData !== null && !Array.isArray(parsedData)) {
          const allowedKeys: Array<keyof ContactFormData> = ['name', 'email', 'phone', 'service', 'message', 'zipCode'];
          const safeData: Partial<ContactFormData> = {};
          for (const key of allowedKeys) {
            const value = parsedData[key];
            if (typeof value !== 'string') {
              continue;
            }

            if (key === 'service') {
              if (SERVICE_OPTIONS.includes(value)) {
                safeData.service = value;
              }
              continue;
            }

            const nonServiceKey = key as Exclude<keyof ContactFormData, 'service'>;
            safeData[nonServiceKey] = value;
          }
          formData = { ...formData, ...safeData };
        } else {
          console.warn('Invalid sessionStorage data for contactFormData in onMount, skipping merge into formData');
        }
        // Clear the stored data after use
        sessionStorage.removeItem('contactFormData');
      } catch (error) {
        console.error('Error parsing stored contact form data:', error);
      }
    } else {
      // Fallback to URL params for backward compatibility
      const urlParams = $page.url.searchParams;
      const maxLength = 500; // Reasonable limit for form fields
      formData.name = (urlParams.get('name') || '').slice(0, maxLength);
      formData.email = (urlParams.get('email') || '').slice(0, maxLength);
      formData.phone = (urlParams.get('phone') || '').slice(0, maxLength);
      const serviceParam = (urlParams.get('service') || '').slice(0, maxLength);
      formData.service = SERVICE_OPTIONS.includes(serviceParam) ? serviceParam : '';
      formData.message = (urlParams.get('message') || '').slice(0, 1000);
      formData.zipCode = (urlParams.get('zipCode') || '').slice(0, 10);
      // Also check for preferredDate and append to message if present
      const preferredDate = urlParams.get('preferredDate');
      if (preferredDate && formData.message) {
        formData.message = (formData.message + `\n\nPreferred Date: ${preferredDate}`).slice(0, 1000);
      } else if (preferredDate) {
        formData.message = `Preferred Date: ${preferredDate.slice(0, 100)}`;
      }
    }
  });

  const serviceOptions = SERVICE_OPTIONS.map((value) => ({
    value,
    label: formatServiceLabel(value)
  }));

  function formatServiceLabel(value: string): string {
    return value
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map((word) => {
        // Check if word is a known acronym (all uppercase in original)
        if (KNOWN_ACRONYMS.includes(word.toUpperCase() as typeof KNOWN_ACRONYMS[number])) {
          return word.toUpperCase();
        }
        // Otherwise, title case the word
        return word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
      })
      .join(' ');
  }

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    errors = validateContactForm(formData);
    
    if (Object.keys(errors).length === 0) {
      submitted = true;
      // Clear URL search params to prevent repopulation on reload
      window.history.replaceState({}, '', window.location.pathname);
      // Reset form after successful submission
      formData = {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        zipCode: ''
      };
    }
  };
</script>

<form on:submit={handleSubmit} class="space-y-5">
  <div class="group">
    <label for="name" class="block text-sm sm:text-base font-semibold text-neutral-700 mb-2 group-focus-within:text-primary transition-colors">Your Name</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg class="w-5 h-5 text-neutral-400 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      </div>
      <input
        id="name"
        type="text"
        placeholder="Enter your full name"
        bind:value={formData.name}
        class={`w-full pl-12 pr-4 py-3 sm:py-3 border-2 ${errors.name ? 'border-red-400 bg-red-50' : 'border-neutral-200 hover:border-primary/40 focus:border-primary'} rounded-xl text-base focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all bg-neutral-50 focus:bg-white`}
        aria-required="true"
        aria-describedby={errors.name ? "name-error" : undefined}
      />
    </div>
    {#if errors.name}
      <ErrorMessage id="name-error" message={errors.name} />
    {/if}
  </div>

  <div class="group">
    <label for="email" class="block text-sm sm:text-base font-semibold text-neutral-700 mb-2 group-focus-within:text-primary transition-colors">Your Email</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg class="w-5 h-5 text-neutral-400 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      </div>
      <input
        id="email"
        type="email"
        placeholder="Enter your email address"
        bind:value={formData.email}
        class={`w-full pl-12 pr-4 py-3 sm:py-3 border-2 ${errors.email ? 'border-red-400 bg-red-50' : 'border-neutral-200 hover:border-primary/40 focus:border-primary'} rounded-xl text-base focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all bg-neutral-50 focus:bg-white`}
        aria-required="true"
        aria-describedby={errors.email ? "email-error" : undefined}
      />
    </div>
    {#if errors.email}
      <ErrorMessage id="email-error" message={errors.email} />
    {/if}
  </div>

  <div class="group">
    <label for="phone" class="block text-sm sm:text-base font-semibold text-neutral-700 mb-2 group-focus-within:text-primary transition-colors">Your Phone</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg class="w-5 h-5 text-neutral-400 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
      </div>
      <input
        id="phone"
        type="tel"
        placeholder="Enter your phone number"
        bind:value={formData.phone}
        class={`w-full pl-12 pr-4 py-3 sm:py-3 border-2 ${errors.phone ? 'border-red-400 bg-red-50' : 'border-neutral-200 hover:border-primary/40 focus:border-primary'} rounded-xl text-base focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all bg-neutral-50 focus:bg-white`}
        aria-required="true"
        aria-describedby={errors.phone ? "phone-error" : undefined}
      />
    </div>
    {#if errors.phone}
      <ErrorMessage id="phone-error" message={errors.phone} />
    {/if}
  </div>

  <div class="group">
    <label for="service" class="block text-sm sm:text-base font-semibold text-neutral-700 mb-2 group-focus-within:text-primary transition-colors">Service Needed</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg class="w-5 h-5 text-neutral-400 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
      </div>
      <select 
        id="service"
        bind:value={formData.service} 
        class={`w-full pl-12 pr-10 py-3 sm:py-3 border-2 ${errors.service ? 'border-red-400 bg-red-50' : 'border-neutral-200 hover:border-primary/40 focus:border-primary'} rounded-xl text-base focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all appearance-none bg-neutral-50 focus:bg-white cursor-pointer`}
        aria-required="true"
        aria-describedby={errors.service ? "service-error" : undefined}
      >
        <option value="">Select a Service</option>
        {#each serviceOptions as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
      <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
    {#if errors.service}
      <ErrorMessage id="service-error" message={errors.service} />
    {/if}
  </div>

  <div class="group">
    <label for="zipCode" class="block text-sm sm:text-base font-semibold text-neutral-700 mb-2 group-focus-within:text-primary transition-colors">Your ZIP Code</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg class="w-5 h-5 text-neutral-400 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      </div>
      <input
        id="zipCode"
        type="text"
        inputmode="numeric"
        placeholder="Enter your ZIP code"
        bind:value={formData.zipCode}
        class={`w-full pl-12 pr-4 py-3 sm:py-3 border-2 ${errors.zipCode ? 'border-red-400 bg-red-50' : 'border-neutral-200 hover:border-primary/40 focus:border-primary'} rounded-xl text-base focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all bg-neutral-50 focus:bg-white`}
        aria-required="true"
        aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
      />
    </div>
    {#if errors.zipCode}
      <ErrorMessage id="zipCode-error" message={errors.zipCode} />
    {/if}
  </div>

  <div class="group">
    <label for="message" class="block text-sm sm:text-base font-semibold text-neutral-700 mb-2 group-focus-within:text-primary transition-colors">Your Message</label>
    <div class="relative">
      <div class="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none">
        <svg class="w-5 h-5 text-neutral-400 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
      </div>
      <textarea
        id="message"
        placeholder="Tell us about your project needs"
        bind:value={formData.message}
        class={`w-full pl-12 pr-4 py-3 sm:py-3 border-2 ${errors.message ? 'border-red-400 bg-red-50' : 'border-neutral-200 hover:border-primary/40 focus:border-primary'} rounded-xl text-base focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all resize-y min-h-[120px] bg-neutral-50 focus:bg-white`}
        rows="4"
        aria-required="true"
        aria-describedby={errors.message ? "message-error" : undefined}
      ></textarea>
    </div>
    {#if errors.message}
      <ErrorMessage id="message-error" message={errors.message} />
    {/if}
  </div>

  <button type="submit" class="w-full py-4 text-base sm:text-lg font-bold rounded-xl shadow-lg transition-all bg-gradient-to-r from-primary via-primary to-secondary text-white hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/30 flex items-center justify-center gap-2 group">
    <span>Send Message</span>
    <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
  </button>

  {#if submitted}
    <div class="bg-gradient-to-r from-green-50 to-secondary/10 border-2 border-green-300 rounded-xl p-5" role="status" aria-live="polite" aria-atomic="true">
      <p class="text-green-700 font-bold text-center flex items-center justify-center gap-2">
        <span class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </span>
        Thank you! We'll contact you soon.
      </p>
    </div>
  {/if}
</form>
