<script lang="ts">
  import { validateContactForm } from '$lib/utils/validation';
  import { services } from '$data/services';
  import type { ContactFormData } from '$lib/types';

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

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    errors = validateContactForm(formData);
    
    if (Object.keys(errors).length === 0) {
      submitted = true;
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
  <div>
    <label for="name" class="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Your Name</label>
    <input
      id="name"
      type="text"
      placeholder="Enter your full name"
      bind:value={formData.name}
      class="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
      aria-required="true"
      aria-describedby={errors.name ? "name-error" : undefined}
    />
    {#if errors.name}
      <p id="name-error" class="text-red-500 text-sm mt-1">{errors.name}</p>
    {/if}
  </div>

  <div>
    <label for="email" class="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Your Email</label>
    <input
      id="email"
      type="email"
      placeholder="Enter your email address"
      bind:value={formData.email}
      class="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
      aria-required="true"
      aria-describedby={errors.email ? "email-error" : undefined}
    />
    {#if errors.email}
      <p id="email-error" class="text-red-500 text-sm mt-1">{errors.email}</p>
    {/if}
  </div>

  <div>
    <label for="phone" class="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Your Phone</label>
    <input
      id="phone"
      type="tel"
      placeholder="Enter your phone number"
      bind:value={formData.phone}
      class="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
      aria-required="true"
      aria-describedby={errors.phone ? "phone-error" : undefined}
    />
    {#if errors.phone}
      <p id="phone-error" class="text-red-500 text-sm mt-1">{errors.phone}</p>
    {/if}
  </div>

  <div>
    <label for="service" class="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Service Needed</label>
    <select 
      id="service"
      bind:value={formData.service} 
      class="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-colors appearance-none bg-white"
      aria-required="true"
      aria-describedby={errors.service ? "service-error" : undefined}
    >
      <option value="">Select a Service</option>
      {#each services as service}
        <option value={service.slug}>{service.name}</option>
      {/each}
    </select>
    {#if errors.service}
      <p id="service-error" class="text-red-500 text-sm mt-1">{errors.service}</p>
    {/if}
  </div>

  <div>
    <label for="zipCode" class="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Your ZIP Code</label>
    <input
      id="zipCode"
      type="text"
      inputmode="numeric"
      placeholder="Enter your ZIP code"
      bind:value={formData.zipCode}
      class="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
      aria-required="true"
      aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
    />
    {#if errors.zipCode}
      <p id="zipCode-error" class="text-red-500 text-sm mt-1">{errors.zipCode}</p>
    {/if}
  </div>

  <div>
    <label for="message" class="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Your Message</label>
    <textarea
      id="message"
      placeholder="Tell us about your project needs"
      bind:value={formData.message}
      class="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-y"
      rows="4"
      aria-required="true"
      aria-describedby={errors.message ? "message-error" : undefined}
    ></textarea>
    {#if errors.message}
      <p id="message-error" class="text-red-500 text-sm mt-1">{errors.message}</p>
    {/if}
  </div>

  <button type="submit" class="btn btn-primary w-full py-3 text-base sm:text-lg font-semibold rounded-lg shadow-md active:scale-[0.98] transition-transform">
    Send Message
  </button>

  {#if submitted}
    <div class="bg-green-50 border border-green-200 rounded-lg p-4" role="status" aria-live="polite" aria-atomic="true">
      <p class="text-green-700 font-semibold text-center">✓ Thank you! We'll contact you soon.</p>
    </div>
  {/if}
</form>
