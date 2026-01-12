<script lang="ts">
</script>

<section class="bg-gradient-to-r from-primary via-primary to-secondary text-white py-12 sm:py-20 relative overflow-hidden">
  <!-- Decorative background elements -->
  <div class="absolute inset-0 opacity-10" aria-hidden="true">
    <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
  </div>

  <div class="container mx-auto px-4 sm:px-6 relative z-10">
    <!-- Main CTA -->
    <div class="text-center mb-12 sm:mb-16">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
        Ready to Transform Your Space?
      </h2>
      <p class="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto font-medium">
        Get your free estimate today. Our team will assess your project and provide honest, transparent pricing.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="/contact" aria-label="Get your free estimate for your home improvement project" class="btn bg-accent hover:bg-accent/90 active:bg-accent/80 text-white font-bold px-8 sm:px-10 py-4 rounded-xl text-base sm:text-lg shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-200">
          Get Your Free Estimate
        </a>
        <a href="/contact" aria-label="Quick contact form for immediate inquiries" class="btn border-2 border-white text-white hover:bg-white/10 font-semibold px-8 sm:px-10 py-4 rounded-xl text-base sm:text-lg transition-all duration-200 hover:scale-105">
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Contact
          </span>
        </a>
      </div>
    </div>

    <!-- Divider with icon -->
    <div class="flex items-center gap-4 mb-12 sm:mb-16">
      <div class="flex-1 h-px bg-white/20"></div>
      <span class="text-white/60 text-sm font-medium uppercase tracking-wider">Or Explore</span>
      <div class="flex-1 h-px bg-white/20"></div>
    </div>

    <!-- Secondary CTA Links with Icons -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <!-- Services -->
      <a href="/services" class="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div class="relative z-10">
          <div class="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mb-4 group-hover:bg-accent/40 transition-colors">
            <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 class="text-lg font-bold mb-2">All Services</h3>
          <p class="text-sm text-white/80">Browse our complete range of construction and roofing services</p>
          <div class="flex items-center gap-2 mt-4 text-accent font-semibold group-hover:gap-3 transition-all">
            <span>Explore</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>

      <!-- Service Areas -->
      <a href="/service-areas" class="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div class="relative z-10">
          <div class="flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-lg mb-4 group-hover:bg-secondary/40 transition-colors">
            <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold mb-2">Service Areas</h3>
          <p class="text-sm text-white/80">Find services available in your Portland area and nearby communities</p>
          <div class="flex items-center gap-2 mt-4 text-secondary font-semibold group-hover:gap-3 transition-all">
            <span>Discover</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>

      <!-- Blog -->
      <a href="/blog" class="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div class="relative z-10">
          <div class="flex items-center justify-center w-12 h-12 bg-blue-300/20 rounded-lg mb-4 group-hover:bg-blue-300/40 transition-colors">
            <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-lg font-bold mb-2">Learn More</h3>
          <p class="text-sm text-white/80">Read expert tips, guides, and insights on home improvement</p>
          <div class="flex items-center gap-2 mt-4 text-blue-300 font-semibold group-hover:gap-3 transition-all">
            <span>Read</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>

      <!-- Gallery -->
      <a href="/gallery" class="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div class="relative z-10">
          <div class="flex items-center justify-center w-12 h-12 bg-pink-300/20 rounded-lg mb-4 group-hover:bg-pink-300/40 transition-colors">
            <svg class="w-6 h-6 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold mb-2">View Projects</h3>
          <p class="text-sm text-white/80">Browse our portfolio of completed residential projects</p>
          <div class="flex items-center gap-2 mt-4 text-pink-300 font-semibold group-hover:gap-3 transition-all">
            <span>Gallery</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>
