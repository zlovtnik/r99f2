export const BUSINESS_INFO = {
  name: 'LB Sunrise',
  telephone: '(978) 519-9774',
  email: 'LEMADILAN5@gmail.com',
  address: '44 Veranda St',
  city: 'Portland',
  state: 'ME',
  zipCode: '04101',
  lat: 43.6612,
  lng: -70.2556,
  hours: {
    'Monday-Friday': '8:00 AM - 6:00 PM',
    'Saturday': '9:00 AM - 4:00 PM',
    'Sunday': 'Closed'
  },
  serviceRadius: 'Portland Metro Area and surrounding Maine communities'
} as const;

export const KEYWORDS = {
  primary: ['roof repair', 'roof replacement', 'roofing contractor', 'roof inspection'],
  location: ['Portland ME', 'Westbrook ME', 'Cumberland ME', 'Maine roofing'],
  long_tail: ['emergency roof repair', 'commercial roofing', 'residential roofing', 'roof leak repair']
} as const;

export const SERVICE_AREAS = [
  'Portland',
  'Westbrook',
  'Cumberland',
  'Cape Elizabeth',
  'Falmouth'
] as const;

export const SERVICE_OPTIONS: readonly string[] = [
  'Roof Repair',
  'Roof Replacement',
  'Roof Inspection'
] as const;

export const SITE_URL = 'https://lbsunrise.com' as const;
export const LOGO_URL = '/images/logo.svg' as const;
export const OG_IMAGE_URL = '/images/og-image.jpg' as const;

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/lbsunrise',
  instagram: 'https://instagram.com/lbsunrise',
  google: 'https://g.page/lbsunrise'
} as const;
