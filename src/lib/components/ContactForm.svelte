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

<form on:submit={handleSubmit} class="space-y-4">
  <div>
    <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
    <input
      id="name"
      type="text"
      placeholder="Enter your full name"
      bind:value={formData.name}
      class="w-full p-2 border rounded"
      aria-required="true"
      aria-describedby={errors.name ? "name-error" : undefined}
    />
    {#if errors.name}
      <p id="name-error" class="text-red-500 text-sm">{errors.name}</p>
    {/if}
  </div>

  <div>
    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
    <input
      id="email"
      type="email"
      placeholder="Enter your email address"
      bind:value={formData.email}
      class="w-full p-2 border rounded"
      aria-required="true"
      aria-describedby={errors.email ? "email-error" : undefined}
    />
    {#if errors.email}
      <p id="email-error" class="text-red-500 text-sm">{errors.email}</p>
    {/if}
  </div>

  <div>
    <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">Your Phone</label>
    <input
      id="phone"
      type="tel"
      placeholder="Enter your phone number"
      bind:value={formData.phone}
      class="w-full p-2 border rounded"
      aria-required="true"
      aria-describedby={errors.phone ? "phone-error" : undefined}
    />
    {#if errors.phone}
      <p id="phone-error" class="text-red-500 text-sm">{errors.phone}</p>
    {/if}
  </div>

  <div>
    <label for="service" class="block text-sm font-semibold text-gray-700 mb-2">Service Needed</label>
    <select 
      id="service"
      bind:value={formData.service} 
      class="w-full p-2 border rounded"
      aria-required="true"
      aria-describedby={errors.service ? "service-error" : undefined}
    >
      <option value="">Select a Service</option>
      {#each services as service}
        <option value={service.slug}>{service.name}</option>
      {/each}
    </select>
    {#if errors.service}
      <p id="service-error" class="text-red-500 text-sm">{errors.service}</p>
    {/if}
  </div>

  <div>
    <label for="zipCode" class="block text-sm font-semibold text-gray-700 mb-2">Your ZIP Code</label>
    <input
      id="zipCode"
      type="text"
      placeholder="Enter your ZIP code"
      bind:value={formData.zipCode}
      class="w-full p-2 border rounded"
      aria-required="true"
      aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
    />
    {#if errors.zipCode}
      <p id="zipCode-error" class="text-red-500 text-sm">{errors.zipCode}</p>
    {/if}
  </div>

  <div>
    <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
    <textarea
      id="message"
      placeholder="Tell us about your roofing needs"
      bind:value={formData.message}
      class="w-full p-2 border rounded"
      rows="5"
      aria-required="true"
      aria-describedby={errors.message ? "message-error" : undefined}
    ></textarea>
    {#if errors.message}
      <p id="message-error" class="text-red-500 text-sm">{errors.message}</p>
    {/if}
  </div>

  <button type="submit" class="btn btn-primary w-full">
    Send Message
  </button>

  {#if submitted}
    <p class="text-green-600 font-semibold">Thank you! We'll contact you soon.</p>
  {/if}
</form>
