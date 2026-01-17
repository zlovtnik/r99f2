<script lang="ts">
  import { validateContactForm } from '$lib/utils/validation';
  import { SERVICE_OPTIONS, KNOWN_ACRONYMS, BUSINESS_INFO } from '$lib/utils/constants';
  import type { ContactFormData } from '$lib/types';

  export let areaName: string = '';
  export let preselectedService: string = '';
  export let compact: boolean = false;

  let formData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    service: preselectedService,
    message: areaName ? `I'm interested in services for my property in ${areaName}.` : '',
    zipCode: ''
  };

  let errors: Record<string, string> = {};
  let submitted = false;
  let isSubmitting = false;

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
        if (KNOWN_ACRONYMS.includes(word.toUpperCase() as typeof KNOWN_ACRONYMS[number])) {
          return word.toUpperCase();
        }
        return word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
      })
      .join(' ');
  }

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    errors = validateContactForm(formData);
    
    if (Object.keys(errors).length === 0) {
      isSubmitting = true;
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            source: `Service Area Page: ${areaName}`
          })
        });

        if (response.ok) {
          submitted = true;
          formData = {
            name: '',
            email: '',
            phone: '',
            service: '',
            message: '',
            zipCode: ''
          };
        } else {
          errors = { form: 'Something went wrong. Please try again or call us directly.' };
        }
      } catch {
        errors = { form: 'Network error. Please try again or call us directly.' };
      } finally {
        isSubmitting = false;
      }
    }
  };
</script>

<div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
  <div class="text-center mb-6">
    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
      Get Your Free Quote {areaName ? `in ${areaName}` : ''}
    </h3>
    <p class="text-gray-600 text-sm">
      Fill out the form below and we'll respond within 24 hours
    </p>
  </div>

  {#if submitted}
    <div class="bg-gradient-to-r from-green-50 to-secondary/10 border-2 border-green-300 rounded-xl p-6 text-center" role="status" aria-live="polite">
      <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <p class="text-green-700 font-bold text-lg mb-2">Thank you!</p>
      <p class="text-green-600">We'll contact you within 24 hours to discuss your project.</p>
      <p class="text-gray-500 text-sm mt-4">
        Need immediate assistance? Call <a href="tel:{BUSINESS_INFO.telephone}" class="text-primary font-semibold hover:underline">{BUSINESS_INFO.telephone}</a>
      </p>
    </div>
  {:else}
    <form on:submit={handleSubmit} class="space-y-4">
      {#if errors.form}
        <div class="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          {errors.form}
        </div>
      {/if}

      <div class="grid grid-cols-1 {compact ? '' : 'sm:grid-cols-2'} gap-4">
        <!-- Name -->
        <div>
          <label for="mini-name" class="block text-sm font-semibold text-gray-700 mb-1.5">Name *</label>
          <input
            id="mini-name"
            type="text"
            placeholder="Your name"
            bind:value={formData.name}
            class="w-full px-4 py-2.5 border-2 {errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary'} rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            aria-required="true"
          />
          {#if errors.name}<p class="text-red-500 text-xs mt-1">{errors.name}</p>{/if}
        </div>

        <!-- Phone -->
        <div>
          <label for="mini-phone" class="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
          <input
            id="mini-phone"
            type="tel"
            placeholder="(XXX) XXX-XXXX"
            bind:value={formData.phone}
            class="w-full px-4 py-2.5 border-2 {errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary'} rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            aria-required="true"
          />
          {#if errors.phone}<p class="text-red-500 text-xs mt-1">{errors.phone}</p>{/if}
        </div>
      </div>

      <!-- Email -->
      <div>
        <label for="mini-email" class="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
        <input
          id="mini-email"
          type="email"
          placeholder="your@email.com"
          bind:value={formData.email}
          class="w-full px-4 py-2.5 border-2 {errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary'} rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
          aria-required="true"
        />
        {#if errors.email}<p class="text-red-500 text-xs mt-1">{errors.email}</p>{/if}
      </div>

      <!-- Service -->
      <div>
        <label for="mini-service" class="block text-sm font-semibold text-gray-700 mb-1.5">Service Needed *</label>
        <select
          id="mini-service"
          bind:value={formData.service}
          class="w-full px-4 py-2.5 border-2 {errors.service ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary'} rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all appearance-none bg-white cursor-pointer"
          aria-required="true"
        >
          <option value="">Select a service</option>
          {#each serviceOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
        {#if errors.service}<p class="text-red-500 text-xs mt-1">{errors.service}</p>{/if}
      </div>

      <!-- ZIP Code -->
      <div>
        <label for="mini-zip" class="block text-sm font-semibold text-gray-700 mb-1.5">ZIP Code *</label>
        <input
          id="mini-zip"
          type="text"
          inputmode="numeric"
          placeholder="04101"
          bind:value={formData.zipCode}
          class="w-full px-4 py-2.5 border-2 {errors.zipCode ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary'} rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
          aria-required="true"
        />
        {#if errors.zipCode}<p class="text-red-500 text-xs mt-1">{errors.zipCode}</p>{/if}
      </div>

      <!-- Message (optional, shorter) -->
      <div>
        <label for="mini-message" class="block text-sm font-semibold text-gray-700 mb-1.5">Project Details</label>
        <textarea
          id="mini-message"
          placeholder="Briefly describe your project..."
          bind:value={formData.message}
          rows="2"
          class="w-full px-4 py-2.5 border-2 {errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary'} rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none"
        ></textarea>
        {#if errors.message}<p class="text-red-500 text-xs mt-1">{errors.message}</p>{/if}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        class="w-full py-3 text-base font-bold rounded-xl shadow-lg transition-all bg-gradient-to-r from-primary via-primary to-secondary text-white hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {#if isSubmitting}
          <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Sending...</span>
        {:else}
          <span>Get Free Quote</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        {/if}
      </button>

      <p class="text-center text-xs text-gray-500 mt-3">
        Or call us now: <a href="tel:{BUSINESS_INFO.telephone}" class="text-primary font-semibold hover:underline">{BUSINESS_INFO.telephone}</a>
      </p>
    </form>
  {/if}
</div>
