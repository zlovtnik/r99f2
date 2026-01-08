<script lang="ts">
  import { BUSINESS_INFO } from '$lib/utils/constants';
</script>

<footer class="bg-gray-900 text-white py-12">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div>
        <h3 class="text-2xl font-bold mb-4">LR Sunrise Construction</h3>
        <p class="text-gray-300">Professional roofing services serving Portland, Maine and surrounding areas.</p>
      </div>
      
      <div>
        <h4 class="text-lg font-bold mb-4">Quick Links</h4>
        <ul class="space-y-2 text-gray-300">
          <li><a href="/services" class="hover:text-white">Services</a></li>
          <li><a href="/service-areas" class="hover:text-white">Service Areas</a></li>
          <li><a href="/about" class="hover:text-white">About</a></li>
          <li><a href="/contact" class="hover:text-white">Contact</a></li>
        </ul>
      </div>
      
      <div>
        <h4 class="text-lg font-bold mb-4">Contact Info</h4>
        <p class="text-gray-300 mb-2">
          <strong>Phone:</strong> <a href={`tel:${BUSINESS_INFO.telephone}`} class="hover:text-white">{BUSINESS_INFO.telephone}</a>
        </p>
        <p class="text-gray-300 mb-2">
          <strong>Email:</strong> <a href={`mailto:${BUSINESS_INFO.email}`} class="hover:text-white">{BUSINESS_INFO.email}</a>
        </p>
        <p class="text-gray-300">
          <strong>Address:</strong> {BUSINESS_INFO.address}, {BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zipCode}
        </p>
      </div>
    </div>
    
    <div class="border-t border-gray-700 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400">&copy; 2026 LR Sunrise Construction. All rights reserved.</p>
        <div class="flex gap-4 mt-4 md:mt-0">
          <span class="text-gray-400 cursor-not-allowed" aria-disabled="true">Privacy Policy</span>
          <span class="text-gray-400 cursor-not-allowed" aria-disabled="true">Terms & Conditions</span>
          <span class="text-gray-400 cursor-not-allowed" aria-disabled="true">Accessibility</span>
        </div>
      </div>
    </div>
  </div>
</footer>
