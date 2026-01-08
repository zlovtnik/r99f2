<script lang="ts">
  import { BUSINESS_INFO } from '$utils/constants';
  import { services } from '$data/services';
  import ContactCard from './ContactCard.svelte';
</script>

<footer class="bg-gray-900 text-white">
  <!-- Large Contact Section -->
  <div class="bg-gradient-to-r from-primary to-secondary py-10 sm:py-16">
    <div class="container mx-auto px-4 sm:px-6 text-center">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Your Project?</h2>
      <p class="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-neutral-light">Contact us today for a free consultation and estimate</p>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 max-w-4xl mx-auto">
        <!-- Phone -->
        <ContactCard
          type="Call Us"
          icon="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          href={`tel:${BUSINESS_INFO.telephone}`}
          content={BUSINESS_INFO.telephone}
          ariaLabel="Call LR Sunrise Construction"
        />

        <!-- Email -->
        <ContactCard
          type="Email Us"
          icon="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          href={`mailto:${BUSINESS_INFO.email}`}
          content={BUSINESS_INFO.email}
          ariaLabel="Email LR Sunrise Construction"
        />

        <!-- Location -->
        <ContactCard
          type="Visit Us"
          icon="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          content="{BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zipCode}"
          ariaLabel="Location of LR Sunrise Construction"
        />
      </div>

      <!-- Hours -->
      <div class="mt-6 sm:mt-8 text-center">
        <p class="text-base sm:text-lg font-semibold text-white mb-2">Business Hours</p>
        <p class="text-lg sm:text-xl font-bold text-white">{BUSINESS_INFO.hoursDisplay}</p>
      </div>
    </div>
  </div>

  <!-- Existing Footer Content -->
  <div class="py-8 sm:py-12 px-4 sm:px-6">
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div>
        <h3 class="text-2xl font-bold mb-4">{BUSINESS_INFO.name}</h3>
        <p class="text-gray-300 mb-4">Professional general contractor services serving {BUSINESS_INFO.city}, {BUSINESS_INFO.state} and surrounding areas within {BUSINESS_INFO.serviceRadius}.</p>
        <div class="flex gap-2">
          <span class="bg-primary text-white text-xs px-2 py-1 rounded">{BUSINESS_INFO.yearsOfExperience}+ Years</span>
          <span class="bg-green-600 text-white text-xs px-2 py-1 rounded">{BUSINESS_INFO.discounts.senior}</span>
        </div>
      </div>
      
      <div>
        <h4 class="text-lg font-bold mb-4">Quick Links</h4>
        <ul class="space-y-1 text-gray-300">
          <li><a href="/services" class="hover:text-white transition-colors block py-2 sm:py-1">Services</a></li>
          <li><a href="/service-areas" class="hover:text-white transition-colors block py-2 sm:py-1">Service Areas</a></li>
          <li><a href="/gallery" class="hover:text-white transition-colors block py-2 sm:py-1">Gallery</a></li>
          <li><a href="/testimonials" class="hover:text-white transition-colors block py-2 sm:py-1">Testimonials</a></li>
          <li><a href="/faq" class="hover:text-white transition-colors block py-2 sm:py-1">FAQ</a></li>
          <li><a href="/about" class="hover:text-white transition-colors block py-2 sm:py-1">About</a></li>
          <li><a href="/contact" class="hover:text-white transition-colors block py-2 sm:py-1">Contact</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-lg font-bold mb-4">Our Services</h4>
        <ul class="space-y-1 text-gray-300">
          {#each services.slice(0, 6) as service}
            <li><a href={`/services/${service.slug}`} class="hover:text-white transition-colors block py-2 sm:py-1">{service.name}</a></li>
          {/each}
        </ul>
      </div>
      
      <div>
        <h4 class="text-lg font-bold mb-4">Contact Info</h4>
        <div class="space-y-3 text-gray-300">
          <p class="flex items-center gap-2">
            <svg class="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <a href={`tel:${BUSINESS_INFO.telephone}`} class="hover:text-white">{BUSINESS_INFO.telephone}</a>
          </p>
          <p class="flex items-center gap-2">
            <svg class="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <a href={`mailto:${BUSINESS_INFO.email}`} class="hover:text-white">{BUSINESS_INFO.email}</a>
          </p>
          <p class="flex items-start gap-2">
            <svg class="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>{BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zipCode}</span>
          </p>
          <p class="flex items-center gap-2">
            <svg class="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{BUSINESS_INFO.hoursDisplay}</span>
          </p>
        </div>
      </div>
    </div>
    
    <div class="border-t border-gray-700 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400">&copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
        <div class="flex gap-4 mt-4 md:mt-0">
          <span class="text-gray-400 cursor-not-allowed">Privacy Policy</span>
          <span class="text-gray-400 cursor-not-allowed">Terms & Conditions</span>
          <span class="text-gray-400 cursor-not-allowed">Accessibility</span>
        </div>
      </div>
    </div>
  </div>
</footer>
