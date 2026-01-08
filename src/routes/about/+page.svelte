<script lang="ts">
  import { SITE_URL } from '$lib/utils/constants';

  const baseUrl = SITE_URL;

  // SEO metadata
  $: seo = {
    title: 'About Us | LR Sunrise Construction',
    description: 'Learn about LR Sunrise Construction, your trusted roofing experts serving the community with quality craftsmanship and reliable service.',
    keywords: 'roofing company, about us, roofing experts, quality craftsmanship',
    url: `${baseUrl}/about`,
    image: `${baseUrl}/images/og-about.jpg`
  };
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />

  <!-- Open Graph -->
  <meta property="og:title" content={seo.title} />
  <meta property="og:description" content={seo.description} />
  <meta property="og:url" content={seo.url} />
  <meta property="og:image" content={seo.image} />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seo.title} />
  <meta name="twitter:description" content={seo.description} />
  <meta name="twitter:image" content={seo.image} />
</svelte:head>

<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-900">About LR Sunrise Construction</h1>

      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="prose prose-lg max-w-none">
          <p class="text-xl text-gray-700 mb-6">
            Welcome to LR Sunrise Construction, your trusted partner for all your roofing needs. With years of experience
            in the roofing industry, we pride ourselves on delivering exceptional quality and service to our valued customers.
          </p>

          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p class="text-gray-700 mb-6">
            Our mission is to provide top-quality roofing services that protect and enhance your home or business.
            We believe in building lasting relationships with our customers through honest communication, reliable service,
            and outstanding craftsmanship.
          </p>

          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
          <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li><strong>Experienced Professionals:</strong> Our team consists of certified and experienced roofing specialists</li>
            <li><strong>Quality Materials:</strong> We use only the highest quality materials and products</li>
            <li><strong>Customer Satisfaction:</strong> Your satisfaction is our top priority</li>
            <li><strong>Competitive Pricing:</strong> Fair and transparent pricing with no hidden fees</li>
            <li><strong>Local Expertise:</strong> Deep knowledge of local building codes and weather conditions</li>
          </ul>

          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
          <p class="text-gray-700 mb-6">
            At LR Sunrise Construction, we're committed to excellence in everything we do. From initial consultation
            to project completion, we work closely with you to ensure your roofing project meets your expectations
            and exceeds industry standards.
          </p>

          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mt-8">
            <p class="text-blue-800 font-medium">
              Ready to work with the best? Contact us today for a free consultation and quote!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>