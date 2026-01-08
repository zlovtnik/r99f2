const envEmail = import.meta.env.VITE_BUSINESS_EMAIL;
const envPhone = import.meta.env.VITE_BUSINESS_PHONE;
const envSiteUrl = import.meta.env.VITE_SITE_URL;

export const BUSINESS_INFO = {
  name: 'LR Sunrise Construction',
  telephone: envPhone || '(978) 519-9774',
  email: envEmail || 'LEMADILAN5@gmail.com',
  address: '1234 SE Main St, Suite 100',
  city: 'Portland',
  state: 'ME',
  zipCode: '04103',
  lat: 43.6612,
  lng: -70.2556,
  hours: {
    'Monday': '7:00 AM - 5:00 PM',
    'Tuesday': '7:00 AM - 5:00 PM',
    'Wednesday': '7:00 AM - 5:00 PM',
    'Thursday': '7:00 AM - 5:00 PM',
    'Friday': '7:00 AM - 5:00 PM',
    'Saturday': '7:00 AM - 5:00 PM',
    'Sunday': '7:00 AM - 5:00 PM'
  },
  hoursDisplay: 'Open 7 Days: 7:00 AM - 5:00 PM',
  serviceAreas: 'Portland, ME and surrounding areas within 200 miles',
  serviceRadius: '200 miles',
  foundedYear: 2015,
  yearsOfExperience: 10,
  emergencyResponseTime: 'Same-day emergency response available',
  discounts: {
    senior: '15% Discount for Seniors',
    military: '15% Discount for Military',
    newCustomers: '15% Discount for New Customers'
  },
  paymentMethods: ['Cash', 'Check']
} as const;

// Derive businessHours from hours for backward compatibility
export const BUSINESS_HOURS = Object.entries(BUSINESS_INFO.hours).map(([day, hours]) => `${day}: ${hours}`);

export const PROMOTIONAL_BADGES = [
  { title: '10 Years', subtitle: 'Of Experience' },
  { title: '15% Discount', subtitle: 'For Seniors' },
  { title: '15% Discount', subtitle: 'For Military' },
  { title: '15% Discount', subtitle: 'For New Customers' }
] as const;

export const STATS = {
  yearsOfExperience: BUSINESS_INFO.yearsOfExperience,
  projectsCompleted: 500,
  satisfactionRate: 100,
  starRating: 5.0
} as const;

export const KEYWORDS = {
  primary: ['general contractor', 'construction company', 'siding installation', 'carpentry services', 'roof installation', 'shingle repair'],
  location: ['Portland ME', 'Brunswick ME', 'Biddeford ME', 'Westbrook ME', 'Falmouth ME', 'Kennebunk ME'],
  long_tail: ['residential construction', 'commercial construction', 'exterior remodeling', 'house framing', 'emergency repair']
} as const;

export const SERVICE_AREAS = [
  'Portland',
  'Brunswick',
  'Biddeford',
  'Westbrook',
  'Falmouth',
  'Kennebunk',
  'Standish',
  'Yarmouth',
  'Freeport',
  'Buxton',
  'Gray',
  'Waterboro',
  'Poland',
  'New Gloucester',
  'North Windham',
  'Raymond',
  'Lisbon Falls',
  'Limington',
  'Casco',
  'Alfred',
  'Lake Arrowhead'
] as const;

export const SERVICE_OPTIONS: readonly string[] = [
  'Siding Installation',
  'Carpentry Services',
  'Shingle Repair',
  'Roof Installation',
  'House Framing',
  'Exterior Remodeling',
  'Flooring Services',
  'Roof Replacement',
  'Painting',
  'Emergency Repair',
  'Gutter Services',
  'Reversal Siding'
] as const;

export const STANDARD_SERVICES = SERVICE_OPTIONS;

export const SITE_URL = envSiteUrl || 'https://constructioncompanyme.com';
export const LOGO_URL = '/images/logo.svg' as const;
export const OG_IMAGE_URL = '/images/og-image.jpg' as const;

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/lrsunriseconstruction',
  instagram: 'https://instagram.com/lrsunriseconstruction',
  google: 'https://g.page/lrsunriseconstruction'
} as const;
