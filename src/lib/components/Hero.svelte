<script lang="ts">
  import { BUSINESS_INFO } from '$lib/utils/constants';

  const badges = [
    { title: '10 Years', subtitle: 'Of Experience' },
    { title: '15% Discount', subtitle: 'For Seniors' },
    { title: '15% Discount', subtitle: 'For Military' },
    { title: '15% Discount', subtitle: 'For New Customers' }
  ];
</script>

<section class="bg-gradient-to-r from-primary to-secondary text-white py-20 relative overflow-hidden">
  <div class="absolute inset-0 bg-black/20"></div>
  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-3xl mx-auto text-center">
      <p class="text-white uppercase tracking-wider text-base font-medium mb-4">General Contractor • {BUSINESS_INFO.city}, {BUSINESS_INFO.state}</p>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        Exceptional General Contractor Solutions for Your Projects
      </h1>
      <p class="text-xl md:text-2xl mb-6 text-neutral-light">
        Isn't it time to transform your home or business with reliable expertise?
      </p>
      <p class="text-lg mb-8 text-neutral-light/90">
        A skilled general contractor can make all the difference in your property improvement journey. At LR Sunrise Construction, we specialize in creating tailored solutions that meet local needs, whether it's enhancing curb appeal, restoring functionality, or modernizing interiors and exteriors.
      </p>
      
      <!-- Badges -->
      <div class="flex flex-wrap gap-4 mb-8 justify-center">
        {#each badges as badge (`${badge.title}|${badge.subtitle}`)}
          <div class="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
            <span class="font-bold">{badge.title}</span> {badge.subtitle}
          </div>
        {/each}
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/contact" class="btn bg-accent text-white hover:bg-accent/90 font-semibold px-8 py-3 rounded-lg text-center transition-colors">
          Get Free Estimate
        </a>
        <a href={`tel:${BUSINESS_INFO.telephone}`} class="btn border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg text-center transition-colors">
          Call Now: {BUSINESS_INFO.telephone}
        </a>
      </div>
    </div>
  </div>
</section>
