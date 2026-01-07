<script lang="ts">
  import { BUSINESS_INFO } from '$lib/utils/constants';
</script>

<section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
  <div class="container mx-auto px-4">
    <div class="max-w-2xl">
      <h1 class="text-5xl font-bold mb-6">
        Professional Roofing Services in Portland, Maine
      </h1>
      <p class="text-xl mb-8 text-blue-100">
        Expert roof repair, replacement, and inspection. Available 24/7 for emergency services.
      </p>
      <div class="flex gap-4">
        <a href="/contact" class="btn btn-primary bg-white text-blue-600 hover:bg-gray-100">
          Get Free Estimate
        </a>
        <a href={`tel:${BUSINESS_INFO.telephone}`} class="btn btn-secondary border-2 border-white text-white hover:bg-white/10">
          Call Now
        </a>
      </div>
    </div>
  </div>
</section>
