import type { ServiceArea } from '$types';
import { BUSINESS_INFO } from '$utils/constants';

export const serviceAreas: ServiceArea[] = [
  {
    id: 'portland',
    name: 'Portland',
    slug: 'portland',
    description: 'Comprehensive general contractor services in Portland, Maine. We provide siding installation, carpentry, roofing, and more for residential and commercial properties.',
    zipCodes: ['04101', '04102', '04103', '04104'],
    keywords: ['general contractor Portland Maine', 'construction company Portland ME', 'siding Portland'],
    state: 'Maine',
    featured: true,
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Portland experiences a humid continental climate with cold, snowy winters and warm, humid summers. The city\'s coastal location brings frequent fog and precipitation, making durable roofing and siding materials essential for withstanding salt air corrosion and heavy snow loads.',
    architecturalNotes: 'Portland\'s historic districts feature Victorian and Queen Anne architecture, while modern developments showcase contemporary designs. Many homes have cedar shake roofs that require regular maintenance due to the wet climate.',
    seasonalTips: [
      'Winter: Schedule roof inspections before heavy snowfall; ensure proper attic ventilation to prevent ice dams',
      'Spring: Address any winter damage promptly; plan exterior painting before summer humidity',
      'Summer: Ideal time for major renovations; take advantage of longer daylight hours',
      'Fall: Prepare for winter by sealing windows and checking gutters for leaf buildup'
    ],
    localFaqs: [
      {
        id: 'portland-1',
        question: 'How does Portland\'s coastal climate affect roofing needs?',
        answer: 'Portland\'s salt-laden air and frequent fog can accelerate corrosion of metal roofing components. We recommend marine-grade materials and regular inspections to maintain roof integrity in this environment.',
        category: 'Roofing'
      },
      {
        id: 'portland-2',
        question: 'What permits are required for construction work in Portland?',
        answer: 'Most exterior work requires permits from the City of Portland. We handle all permitting for you, including applications for roofing, siding, and structural modifications.',
        category: 'Permits'
      }
    ],
    testimonials: [
      {
        id: 'portland-1',
        name: 'Sarah Mitchell',
        service: 'Roof Replacement',
        text: 'LR Sunrise Construction did an excellent job replacing our historic home\'s roof in Portland\'s Old Port district. They understood the unique challenges of working on a 150-year-old building and completed the work without damaging the original architecture.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'portland-1',
        title: 'Historic Home Renovation',
        category: 'Roofing',
        description: 'Complete roof replacement on a Victorian home in Portland\'s historic district',
        image: '/images/services/roofing-1.jpg'
      }
    ],
  },
  {
    id: 'brunswick',
    name: 'Brunswick',
    slug: 'brunswick',
    description: 'Professional construction and remodeling services in Brunswick, Maine. Expert siding, roofing, carpentry, and exterior remodeling.',
    zipCodes: ['04011'],
    keywords: ['general contractor Brunswick Maine', 'construction Brunswick ME'],
    state: 'Maine',
    featured: true,
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Brunswick experiences Maine\'s typical coastal climate with cold winters, warm summers, and significant precipitation. The area\'s proximity to the Atlantic Ocean brings salt-laden air that can affect exterior materials, while occasional nor\'easters bring heavy winds and snow.',
    architecturalNotes: 'Brunswick features a mix of historic Federal and Greek Revival homes, Bowdoin College architecture, and modern residential developments. Many properties have clapboard siding and asphalt shingles that require regular maintenance in the coastal environment.',
    seasonalTips: [
      'Winter: Monitor for ice dam formation on older homes; schedule inspections after major storms',
      'Spring: Address any winter water damage promptly; ideal time for exterior painting',
      'Summer: Perfect for major renovations; take advantage of college town energy',
      'Fall: Prepare for winter by sealing windows and checking roof drainage systems'
    ],
    localFaqs: [
      {
        id: 'brunswick-1',
        question: 'How does Brunswick\'s coastal location affect construction materials?',
        answer: 'Brunswick\'s proximity to the coast means salt air can corrode metal components and degrade certain materials faster. We recommend marine-grade fasteners and corrosion-resistant materials for optimal longevity.',
        category: 'Materials'
      },
      {
        id: 'brunswick-2',
        question: 'What are the permitting requirements for Brunswick construction projects?',
        answer: 'The Town of Brunswick requires permits for most exterior work. We handle all permitting processes and ensure compliance with local building codes and historic district regulations where applicable.',
        category: 'Permits'
      }
    ],
    testimonials: [
      {
        id: 'brunswick-1',
        name: 'Dr. Michael Chen',
        service: 'Siding Replacement',
        text: 'As a Bowdoin College professor, I needed a contractor who understood the importance of maintaining historic character while ensuring modern durability. LR Sunrise Construction delivered exactly that for our 19th-century home.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'brunswick-1',
        title: 'Historic Home Restoration',
        category: 'Siding',
        description: 'Complete siding replacement on a Federal-style home in Brunswick\'s historic district',
        image: '/images/services/siding-1.jpg'
      }
    ],
  },
  {
    id: 'biddeford',
    name: 'Biddeford',
    slug: 'biddeford',
    description: 'Quality construction services in Biddeford, Maine. Residential and commercial siding, roofing, and renovation projects.',
    zipCodes: ['04005'],
    keywords: ['general contractor Biddeford Maine', 'construction Biddeford ME'],
    state: 'Maine',
    featured: true,
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Biddeford has a temperate coastal climate with cold, snowy winters and mild summers. The city\'s location along the Saco River and Atlantic coast brings frequent fog, high humidity, and occasional flooding concerns during heavy rain events.',
    architecturalNotes: 'Biddeford boasts Victorian-era homes, mill buildings, and modern developments. The historic downtown features brick and stone construction, while residential areas showcase a mix of architectural styles from different eras.',
    seasonalTips: [
      'Winter: Watch for river flooding during thaws; inspect foundations after heavy snow',
      'Spring: Address any flood-related damage; schedule exterior work before tourist season',
      'Summer: Peak tourist season - plan projects around vacation schedules',
      'Fall: Prepare for winter by reinforcing flood-prone areas and checking drainage'
    ],
    localFaqs: [
      {
        id: 'biddeford-1',
        question: 'How does Biddeford\'s proximity to the Saco River affect construction?',
        answer: 'The Saco River can cause flooding during heavy rain or spring thaws. We incorporate flood-resistant materials and elevated construction techniques where appropriate to protect against water damage.',
        category: 'Flood Protection'
      },
      {
        id: 'biddeford-2',
        question: 'What permits are needed for work in Biddeford\'s historic districts?',
        answer: 'Biddeford has designated historic districts requiring special permitting and design review. We work closely with the city\'s historic preservation office to ensure compliance while maintaining property value.',
        category: 'Historic Districts'
      }
    ],
    testimonials: [
      {
        id: 'biddeford-1',
        name: 'Jennifer Walsh',
        service: 'Roof Repair',
        text: 'After a bad storm damaged our Victorian home in Biddeford, LR Sunrise Construction responded quickly and handled all the insurance paperwork. Their expertise with historic roofing was invaluable.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'biddeford-1',
        title: 'Victorian Home Renovation',
        category: 'Roofing',
        description: 'Storm damage repair on a historic Victorian home in Biddeford',
        image: '/images/services/roofing-2.jpg'
      }
    ],
  },
  {
    id: 'westbrook',
    name: 'Westbrook',
    slug: 'westbrook',
    description: 'Expert construction and renovation services in Westbrook, Maine. Specializing in siding, roofing, and carpentry.',
    zipCodes: ['04092'],
    keywords: ['general contractor Westbrook Maine', 'construction Westbrook ME'],
    state: 'Maine',
    featured: true,
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Westbrook experiences Maine\'s inland coastal climate with cold winters, warm summers, and moderate precipitation. The area\'s location provides some protection from the harshest coastal storms while still experiencing significant snowfall and occasional flooding.',
    architecturalNotes: 'Westbrook features a mix of mid-20th century suburban homes, newer developments, and some historic properties. The area has seen significant growth with modern residential construction alongside established neighborhoods.',
    seasonalTips: [
      'Winter: Monitor for frost heave in newer developments; schedule inspections before deep snow',
      'Spring: Check for water damage from snowmelt; ideal for foundation work',
      'Summer: Good time for major renovations; avoid peak heat for roofing work',
      'Fall: Prepare for winter by sealing foundations and checking drainage systems'
    ],
    localFaqs: [
      {
        id: 'westbrook-1',
        question: 'What construction challenges are common in Westbrook\'s newer developments?',
        answer: 'Many newer Westbrook homes were built in the 1990s-2000s and may need foundation repairs or window replacements. We specialize in working with these construction eras and their specific material challenges.',
        category: 'Modern Construction'
      },
      {
        id: 'westbrook-2',
        question: 'How does Westbrook\'s growth affect construction timelines?',
        answer: 'Westbrook\'s rapid growth means busy permitting offices and material suppliers. We maintain strong local relationships to ensure timely project completion despite high demand.',
        category: 'Project Timeline'
      }
    ],
    testimonials: [
      {
        id: 'westbrook-1',
        name: 'Robert Martinez',
        service: 'Kitchen Renovation',
        text: 'LR Sunrise Construction transformed our 2005 home in Westbrook with a complete kitchen renovation. Their attention to detail and understanding of modern home construction was outstanding.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'westbrook-1',
        title: 'Modern Home Update',
        category: 'Carpentry',
        description: 'Kitchen renovation in a contemporary Westbrook home',
        image: '/images/services/carpentry-1.jpg'
      }
    ],
  },
  {
    id: 'falmouth',
    name: 'Falmouth',
    slug: 'falmouth',
    description: 'Premium construction services in Falmouth, Maine. Quality siding installation, roof work, and exterior remodeling.',
    zipCodes: ['04105'],
    keywords: ['general contractor Falmouth Maine', 'construction Falmouth ME'],
    state: 'Maine',
    featured: true,
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Falmouth enjoys a mild coastal climate with cold winters and warm summers. The area\'s proximity to Casco Bay brings marine influences while being somewhat sheltered from the harshest ocean storms.',
    architecturalNotes: 'Falmouth is known for its affluent residential character with large lot sizes and high-quality construction. Properties range from historic Colonials to modern waterfront homes, with an emphasis on premium materials and craftsmanship.',
    seasonalTips: [
      'Winter: Schedule work during milder periods; monitor waterfront properties for ice damage',
      'Spring: Address any winter storm damage; prepare for busy summer season',
      'Summer: Peak season for renovations; coordinate around vacation schedules',
      'Fall: Ideal time for exterior work before winter; prepare waterfront properties'
    ],
    localFaqs: [
      {
        id: 'falmouth-1',
        question: 'What are the special considerations for waterfront properties in Falmouth?',
        answer: 'Waterfront homes require special attention to moisture protection, foundation waterproofing, and corrosion-resistant materials. We have extensive experience with these high-value properties.',
        category: 'Waterfront Construction'
      },
      {
        id: 'falmouth-2',
        question: 'How do Falmouth\'s strict zoning regulations affect construction?',
        answer: 'Falmouth has detailed zoning ordinances and design review requirements. We navigate these complex regulations to ensure your project meets all local standards while achieving your vision.',
        category: 'Zoning & Permits'
      }
    ],
    testimonials: [
      {
        id: 'falmouth-1',
        name: 'Dr. Elizabeth Thornton',
        service: 'Exterior Renovation',
        text: 'Our Falmouth waterfront home needed extensive exterior work, and LR Sunrise Construction handled everything from permitting to final inspection. Their expertise with high-end finishes was exactly what we needed.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'falmouth-1',
        title: 'Waterfront Home Renovation',
        category: 'Siding',
        description: 'Complete exterior renovation of a waterfront property in Falmouth',
        image: '/images/services/siding-2.jpg'
      }
    ],
  },
  {
    id: 'kennebunk',
    name: 'Kennebunk',
    slug: 'kennebunk',
    description: 'Reliable general contractor services in Kennebunk, Maine. Siding, roofing, carpentry, and complete renovations.',
    zipCodes: ['04043'],
    keywords: ['general contractor Kennebunk Maine', 'construction Kennebunk ME'],
    state: 'Maine',
    featured: true,
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Kennebunk has a classic Maine coastal climate with cold winters, warm summers, and frequent fog. The area\'s location along the Kennebunk River brings additional moisture considerations and occasional river flooding.',
    architecturalNotes: 'Kennebunk is famous for its historic architecture, including colonial and Federal-style homes. The downtown historic district features brick buildings and cobblestone streets, while surrounding areas have a mix of historic and modern construction.',
    seasonalTips: [
      'Winter: Monitor river flooding during thaws; protect historic masonry from freeze-thaw cycles',
      'Spring: Address any flood damage promptly; schedule work before tourist season',
      'Summer: Peak tourist season - plan around vacation rentals and busy schedules',
      'Fall: Prepare historic buildings for winter; check drainage around foundations'
    ],
    localFaqs: [
      {
        id: 'kennebunk-1',
        question: 'What special considerations are needed for historic homes in Kennebunk?',
        answer: 'Kennebunk\'s historic district requires preservation techniques and period-appropriate materials. We specialize in maintaining the character of these valuable properties while ensuring modern functionality.',
        category: 'Historic Preservation'
      },
      {
        id: 'kennebunk-2',
        question: 'How does Kennebunk\'s tourism season affect construction scheduling?',
        answer: 'Summer tourism means many homeowners are away. We offer flexible scheduling and can work around rental periods to minimize disruption while taking advantage of the extended daylight hours.',
        category: 'Seasonal Scheduling'
      }
    ],
    testimonials: [
      {
        id: 'kennebunk-1',
        name: 'Margaret Sullivan',
        service: 'Historic Restoration',
        text: 'LR Sunrise Construction beautifully restored our 1780s colonial home in Kennebunk. They understood the importance of preserving historic details while making necessary modern updates. Absolutely outstanding work.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'kennebunk-1',
        title: 'Historic Colonial Restoration',
        category: 'Carpentry',
        description: 'Restoration work on an 18th-century colonial home in Kennebunk',
        image: '/images/services/carpentry-2.jpg'
      }
    ],
  },
  {
    id: 'standish',
    name: 'Standish',
    slug: 'standish',
    description: 'Professional construction services in Standish, Maine. Expert siding, roofing, and remodeling for homes and businesses.',
    zipCodes: ['04084'],
    keywords: ['general contractor Standish Maine', 'construction Standish ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Standish has a continental climate with cold winters and warm summers. Located inland, it experiences more extreme temperature variations and heavier snowfall than coastal areas.',
    architecturalNotes: 'Standish features rural Maine architecture with farmhouses, capes, and modern homes. Many properties have large lots and detached garages, with construction spanning from historic farmhouses to contemporary builds.',
    seasonalTips: [
      'Winter: Heavy snowfall requires strong roof structures; monitor for ice dams',
      'Spring: Address snowmelt damage; good time for foundation work',
      'Summer: Ideal for major projects; take advantage of rural setting',
      'Fall: Prepare for winter by reinforcing structures against heavy snow loads'
    ],
    localFaqs: [
      {
        id: 'standish-1',
        question: 'How do heavy snow loads affect construction in Standish?',
        answer: 'Standish receives significant snowfall, requiring stronger roof structures and snow load calculations. We design and reinforce roofs to handle Maine\'s winter conditions.',
        category: 'Snow Load'
      },
      {
        id: 'standish-2',
        question: 'What are the benefits of rural construction in Standish?',
        answer: 'Rural properties often have more space for staging materials and equipment. We can work efficiently on larger projects while respecting the peaceful community atmosphere.',
        category: 'Rural Construction'
      }
    ],
    testimonials: [
      {
        id: 'standish-1',
        name: 'Tom Richardson',
        service: 'Barn Restoration',
        text: 'LR Sunrise Construction restored our historic barn in Standish, converting it into a beautiful guest house. Their understanding of rural Maine construction and attention to traditional details was perfect.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'standish-1',
        title: 'Barn Restoration',
        category: 'Carpentry',
        description: 'Historic barn conversion in rural Standish',
        image: '/images/services/carpentry-3.jpg'
      }
    ],
  },
  {
    id: 'yarmouth',
    name: 'Yarmouth',
    slug: 'yarmouth',
    description: 'Quality construction and renovation services in Yarmouth, Maine. Specializing in exterior and interior improvements.',
    zipCodes: ['04096'],
    keywords: ['general contractor Yarmouth Maine', 'construction Yarmouth ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Yarmouth experiences a moderate coastal climate with cold winters and pleasant summers. The town\'s location provides some coastal influence while being inland enough to avoid the harshest marine conditions.',
    architecturalNotes: 'Yarmouth has a charming small-town character with historic homes, Victorian architecture, and modern developments. The area features well-maintained properties with a mix of architectural styles.',
    seasonalTips: [
      'Winter: Monitor for moderate snowfall; schedule inspections during milder periods',
      'Spring: Address any winter damage; prepare for community events',
      'Summer: Good time for renovations; coordinate around local festivals',
      'Fall: Prepare for winter; ideal time for exterior painting and sealing'
    ],
    localFaqs: [
      {
        id: 'yarmouth-1',
        question: 'What makes construction in Yarmouth unique?',
        answer: 'Yarmouth\'s small-town atmosphere means we work closely with neighbors and local officials. Our team understands the community\'s expectations for quality and maintains the town\'s high standards.',
        category: 'Community Standards'
      },
      {
        id: 'yarmouth-2',
        question: 'How do Yarmouth\'s design review requirements work?',
        answer: 'Yarmouth has design review boards for certain areas. We help navigate these requirements to ensure your project complements the neighborhood character while meeting your needs.',
        category: 'Design Review'
      }
    ],
    testimonials: [
      {
        id: 'yarmouth-1',
        name: 'Susan Parker',
        service: 'Home Addition',
        text: 'LR Sunrise Construction added a beautiful sunroom to our Yarmouth home. They worked seamlessly with our neighbors and the local design review board. The result exceeded our expectations.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'yarmouth-1',
        title: 'Sunroom Addition',
        category: 'Carpentry',
        description: 'Custom sunroom addition to a historic Yarmouth home',
        image: '/images/services/carpentry-4.jpg'
      }
    ],
  },
  {
    id: 'freeport',
    name: 'Freeport',
    slug: 'freeport',
    description: 'Trusted construction services in Freeport, Maine. From siding to roofing, we deliver quality craftsmanship.',
    zipCodes: ['04032'],
    keywords: ['general contractor Freeport Maine', 'construction Freeport ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Freeport has a coastal climate with cold winters, warm summers, and frequent fog. The town\'s location brings marine influences while being somewhat protected by its inland waterways.',
    architecturalNotes: 'Freeport is known for its outlet shopping but also features beautiful historic homes and waterfront properties. The area combines commercial development with residential charm.',
    seasonalTips: [
      'Winter: Monitor waterfront properties for ice; schedule work during milder periods',
      'Spring: Address any coastal storm damage; prepare for tourist season',
      'Summer: Peak tourist season - coordinate around busy shopping periods',
      'Fall: Prepare waterfront properties for winter; check drainage systems'
    ],
    localFaqs: [
      {
        id: 'freeport-1',
        question: 'What special considerations are needed for waterfront construction in Freeport?',
        answer: 'Freeport\'s waterways require attention to moisture protection and corrosion resistance. We use marine-grade materials and understand the unique challenges of waterfront properties.',
        category: 'Waterfront Construction'
      },
      {
        id: 'freeport-2',
        question: 'How does Freeport\'s tourism affect construction scheduling?',
        answer: 'Summer tourism means many homeowners use their properties seasonally. We offer flexible scheduling to work around vacation periods and minimize disruption to the local community.',
        category: 'Seasonal Scheduling'
      }
    ],
    testimonials: [
      {
        id: 'freeport-1',
        name: 'David Chen',
        service: 'Waterfront Renovation',
        text: 'Our Freeport waterfront cottage needed major updates, and LR Sunrise Construction handled everything perfectly. Their expertise with coastal properties and attention to detail was outstanding.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'freeport-1',
        title: 'Waterfront Cottage Renovation',
        category: 'Siding',
        description: 'Complete renovation of a waterfront cottage in Freeport',
        image: '/images/services/siding-3.jpg'
      }
    ],
  },
  {
    id: 'buxton',
    name: 'Buxton',
    slug: 'buxton',
    description: 'Dependable construction services in Buxton, Maine. Residential and commercial projects with attention to detail.',
    zipCodes: ['04093'],
    keywords: ['general contractor Buxton Maine', 'construction Buxton ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Buxton experiences Maine\'s inland climate with cold winters and warm summers. The area receives significant snowfall and has occasional flooding concerns from local waterways.',
    architecturalNotes: 'Buxton features rural Maine architecture with farmhouses, modern homes, and some commercial buildings. The area has a mix of established properties and newer developments.',
    seasonalTips: [
      'Winter: Heavy snowfall requires strong roof structures; monitor for flooding during thaws',
      'Spring: Address water damage from snowmelt; check foundations',
      'Summer: Good time for major renovations; rural setting allows efficient work',
      'Fall: Prepare for winter by reinforcing structures and checking drainage'
    ],
    localFaqs: [
      {
        id: 'buxton-1',
        question: 'What construction challenges are common in rural Buxton?',
        answer: 'Rural properties often require longer travel times and may have limited utility access. We plan projects carefully to accommodate these factors while maintaining quality standards.',
        category: 'Rural Construction'
      }
    ],
    testimonials: [
      {
        id: 'buxton-1',
        name: 'Karen Mitchell',
        service: 'Roof Replacement',
        text: 'LR Sunrise Construction replaced our roof in Buxton efficiently and professionally. They understood our rural location and worked around our farm schedule. Excellent service.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'buxton-1',
        title: 'Farmhouse Roof Replacement',
        category: 'Roofing',
        description: 'Complete roof replacement on a Buxton farmhouse',
        image: '/images/services/roofing-3.jpg'
      }
    ],
  },
  {
    id: 'gray',
    name: 'Gray',
    slug: 'gray',
    description: 'Expert construction and renovation in Gray, Maine. Quality siding, roofing, and carpentry services.',
    zipCodes: ['04039'],
    keywords: ['general contractor Gray Maine', 'construction Gray ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Gray has a continental climate with cold winters and warm summers. The area experiences significant snowfall and occasional severe weather from its inland location.',
    architecturalNotes: 'Gray features a mix of rural homes, modern developments, and some commercial properties. The area has grown significantly in recent years with new residential construction.',
    seasonalTips: [
      'Winter: Monitor for heavy snow loads; schedule inspections before major storms',
      'Spring: Address any winter damage; good time for foundation repairs',
      'Summer: Ideal for renovations; take advantage of longer daylight hours',
      'Fall: Prepare for winter by checking roofs and sealing structures'
    ],
    localFaqs: [
      {
        id: 'gray-1',
        question: 'What are the construction trends in growing areas like Gray?',
        answer: 'Gray\'s growth means newer construction with modern materials. We handle both new construction challenges and renovations of established homes with equal expertise.',
        category: 'Modern Construction'
      }
    ],
    testimonials: [
      {
        id: 'gray-1',
        name: 'Mark Johnson',
        service: 'Siding Installation',
        text: 'Our new home in Gray needed siding, and LR Sunrise Construction delivered exceptional work. They handled the modern construction perfectly and finished ahead of schedule.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'gray-1',
        title: 'New Construction Siding',
        category: 'Siding',
        description: 'Siding installation on a new home in Gray',
        image: '/images/services/siding-4.jpg'
      }
    ],
  },
  {
    id: 'waterboro',
    name: 'Waterboro',
    slug: 'waterboro',
    description: 'Professional construction services in Waterboro, Maine. Complete renovation and repair solutions.',
    zipCodes: ['04087'],
    keywords: ['general contractor Waterboro Maine', 'construction Waterboro ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Waterboro has a continental climate with cold winters and warm summers. The area receives substantial snowfall and has some flood risk from local waterways.',
    architecturalNotes: 'Waterboro features rural Maine architecture with farmhouses, modern homes, and established properties. The area maintains a small-town character with quality construction.',
    seasonalTips: [
      'Winter: Heavy snowfall requires strong structures; monitor for ice dams',
      'Spring: Check for flood damage; address water-related issues promptly',
      'Summer: Good time for major projects; rural setting allows efficient work',
      'Fall: Prepare for winter; reinforce structures against snow loads'
    ],
    localFaqs: [
      {
        id: 'waterboro-1',
        question: 'How does Waterboro\'s location affect construction planning?',
        answer: 'Waterboro\'s rural setting means we plan for longer travel times and coordinate carefully with local suppliers. This ensures efficient project completion despite the location.',
        category: 'Rural Planning'
      }
    ],
    testimonials: [
      {
        id: 'waterboro-1',
        name: 'Linda Thompson',
        service: 'Home Renovation',
        text: 'LR Sunrise Construction completely renovated our Waterboro home. They handled the rural location perfectly and delivered beautiful results. Highly recommend their work.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'waterboro-1',
        title: 'Complete Home Renovation',
        category: 'Carpentry',
        description: 'Full renovation of a Waterboro home',
        image: '/images/services/carpentry-5.jpg'
      }
    ],
  },
  {
    id: 'poland',
    name: 'Poland',
    slug: 'poland',
    description: 'Quality construction services in Poland, Maine. Siding, roofing, and exterior improvements.',
    zipCodes: ['04274'],
    keywords: ['general contractor Poland Maine', 'construction Poland ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Poland experiences Maine\'s inland continental climate with very cold winters and warm summers. The area receives heavy snowfall and has distinct seasonal changes.',
    architecturalNotes: 'Poland features rural Maine architecture with farmhouses, modern homes, and some lakefront properties. The area has a mix of established rural properties and newer developments.',
    seasonalTips: [
      'Winter: Extreme cold requires special material considerations; monitor for heavy snow loads',
      'Spring: Address snowmelt damage; check foundations thoroughly',
      'Summer: Ideal for major renovations; take advantage of rural setting',
      'Fall: Prepare for harsh winter; reinforce structures and seal thoroughly'
    ],
    localFaqs: [
      {
        id: 'poland-1',
        question: 'What special preparations are needed for Poland\'s harsh winters?',
        answer: 'Poland\'s cold climate requires extra attention to insulation, sealing, and structural reinforcement. We use materials rated for extreme cold and ensure proper winterization.',
        category: 'Winter Preparation'
      }
    ],
    testimonials: [
      {
        id: 'poland-1',
        name: 'George Wilson',
        service: 'Roof Installation',
        text: 'LR Sunrise Construction installed a new roof on our Poland home that handles Maine winters perfectly. Their expertise with cold climate construction is outstanding.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'poland-1',
        title: 'Cold Climate Roofing',
        category: 'Roofing',
        description: 'Roof installation designed for Poland\'s harsh winters',
        image: '/images/services/roofing-4.jpg'
      }
    ],
  },
  {
    id: 'new-gloucester',
    name: 'New Gloucester',
    slug: 'new-gloucester',
    description: 'Trusted construction services in New Gloucester, Maine. Expert craftsmanship for all projects.',
    zipCodes: ['04260'],
    keywords: ['general contractor New Gloucester Maine', 'construction New Gloucester ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'New Gloucester has a continental climate with cold winters and warm summers. The rural setting brings significant snowfall and occasional severe weather.',
    architecturalNotes: 'New Gloucester features classic rural Maine architecture with farmhouses, modern homes, and established properties maintaining traditional character.',
    seasonalTips: [
      'Winter: Heavy snow requires strong roof structures; monitor rural access',
      'Spring: Address winter damage; check rural water systems',
      'Summer: Good for major projects; rural setting allows efficient work',
      'Fall: Prepare for winter; reinforce rural structures'
    ],
    localFaqs: [
      {
        id: 'new-gloucester-1',
        question: 'What are the challenges of rural construction in New Gloucester?',
        answer: 'Rural properties may have limited utility access and longer travel times. We plan carefully and use efficient methods to ensure quality results.',
        category: 'Rural Construction'
      }
    ],
    testimonials: [
      {
        id: 'new-gloucester-1',
        name: 'Barbara Davis',
        service: 'Siding Replacement',
        text: 'Our New Gloucester farmhouse got beautiful new siding from LR Sunrise Construction. They understood rural Maine living and delivered perfect results.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'new-gloucester-1',
        title: 'Farmhouse Siding',
        category: 'Siding',
        description: 'Siding replacement on a New Gloucester farmhouse',
        image: '/images/services/siding-5.jpg'
      }
    ],
  },
  {
    id: 'north-windham',
    name: 'North Windham',
    slug: 'north-windham',
    description: 'Reliable construction services in North Windham, Maine. Comprehensive renovation and construction solutions.',
    zipCodes: ['04062'],
    keywords: ['general contractor North Windham Maine', 'construction North Windham ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'North Windham experiences Maine\'s inland climate with cold winters and warm summers. The area receives substantial snowfall and has moderate weather patterns.',
    architecturalNotes: 'North Windham features suburban and rural architecture with modern homes, established properties, and some commercial developments.',
    seasonalTips: [
      'Winter: Monitor for moderate snowfall; schedule work during milder periods',
      'Spring: Address any winter damage; prepare for growing season',
      'Summer: Good time for renovations; take advantage of daylight hours',
      'Fall: Prepare for winter; check drainage and sealing'
    ],
    localFaqs: [
      {
        id: 'north-windham-1',
        question: 'What construction trends are we seeing in North Windham?',
        answer: 'North Windham is growing with new developments and renovations. We handle both modern construction challenges and updates to established homes.',
        category: 'Growth & Development'
      }
    ],
    testimonials: [
      {
        id: 'north-windham-1',
        name: 'Patricia Anderson',
        service: 'Kitchen Renovation',
        text: 'LR Sunrise Construction transformed our North Windham kitchen beautifully. Their attention to detail and professional work was outstanding.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'north-windham-1',
        title: 'Modern Kitchen Renovation',
        category: 'Carpentry',
        description: 'Complete kitchen renovation in North Windham',
        image: '/images/services/carpentry-6.jpg'
      }
    ],
  },
  {
    id: 'raymond',
    name: 'Raymond',
    slug: 'raymond',
    description: 'Professional construction and remodeling in Raymond, Maine. Quality workmanship guaranteed.',
    zipCodes: ['04071'],
    keywords: ['general contractor Raymond Maine', 'construction Raymond ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Raymond has a moderate inland climate with cold winters and pleasant summers. The area experiences typical Maine weather patterns with significant snowfall.',
    architecturalNotes: 'Raymond features lakeside and rural architecture with modern homes, cottages, and established properties. The area has a mix of year-round and seasonal residences.',
    seasonalTips: [
      'Winter: Monitor lakeside properties for ice; schedule work during milder periods',
      'Spring: Address any winter damage; prepare for recreation season',
      'Summer: Peak season for renovations; coordinate around lake activities',
      'Fall: Prepare waterfront properties for winter; check drainage systems'
    ],
    localFaqs: [
      {
        id: 'raymond-1',
        question: 'What special considerations are needed for lakeside properties in Raymond?',
        answer: 'Lakeside homes require moisture protection and may have seasonal access considerations. We understand these unique requirements and plan accordingly.',
        category: 'Lakeside Construction'
      }
    ],
    testimonials: [
      {
        id: 'raymond-1',
        name: 'James Peterson',
        service: 'Deck Construction',
        text: 'Our Raymond lakeside deck from LR Sunrise Construction is beautiful and built to last. They understood the waterfront challenges perfectly.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'raymond-1',
        title: 'Lakeside Deck',
        category: 'Carpentry',
        description: 'Custom deck construction for a Raymond lakeside home',
        image: '/images/services/carpentry-7.jpg'
      }
    ],
  },
  {
    id: 'lisbon-falls',
    name: 'Lisbon Falls',
    slug: 'lisbon-falls',
    description: 'Expert construction services in Lisbon Falls, Maine. Residential and commercial projects.',
    zipCodes: ['04252'],
    keywords: ['general contractor Lisbon Falls Maine', 'construction Lisbon Falls ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Lisbon Falls has a continental climate with cold winters and warm summers. The Androscoggin River location brings additional moisture considerations.',
    architecturalNotes: 'Lisbon Falls features mill town architecture with historic buildings, modern homes, and a mix of residential and commercial properties.',
    seasonalTips: [
      'Winter: Monitor river flooding during thaws; protect historic buildings',
      'Spring: Address any flood damage; check foundations thoroughly',
      'Summer: Good time for renovations; coordinate around community events',
      'Fall: Prepare for winter; reinforce structures against cold and moisture'
    ],
    localFaqs: [
      {
        id: 'lisbon-falls-1',
        question: 'How does the Androscoggin River affect construction in Lisbon Falls?',
        answer: 'The river brings moisture and occasional flooding concerns. We incorporate appropriate drainage and moisture protection measures in our work.',
        category: 'River & Flood Protection'
      }
    ],
    testimonials: [
      {
        id: 'lisbon-falls-1',
        name: 'Robert Miller',
        service: 'Historic Renovation',
        text: 'LR Sunrise Construction beautifully renovated our historic Lisbon Falls home. They respected the building\'s character while making necessary modern updates.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'lisbon-falls-1',
        title: 'Historic Home Renovation',
        category: 'Carpentry',
        description: 'Renovation of a historic home in Lisbon Falls',
        image: '/images/services/carpentry-8.jpg'
      }
    ],
  },
  {
    id: 'limington',
    name: 'Limington',
    slug: 'limington',
    description: 'Dependable construction services in Limington, Maine. Quality craftsmanship for every project.',
    zipCodes: ['04049'],
    keywords: ['general contractor Limington Maine', 'construction Limington ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Limington experiences Maine\'s inland continental climate with cold winters and warm summers. The rural setting brings significant snowfall and weather variations.',
    architecturalNotes: 'Limington features rural Maine architecture with farmhouses, modern homes, and established properties. The area maintains a traditional small-town character.',
    seasonalTips: [
      'Winter: Heavy snowfall requires strong structures; monitor rural access',
      'Spring: Address snowmelt damage; check rural water systems',
      'Summer: Ideal for major projects; rural setting allows efficient work',
      'Fall: Prepare for winter; reinforce rural structures thoroughly'
    ],
    localFaqs: [
      {
        id: 'limington-1',
        question: 'What are the benefits of rural construction in Limington?',
        answer: 'Rural properties often allow for more flexible scheduling and larger work areas. We take advantage of these benefits while maintaining high quality standards.',
        category: 'Rural Construction'
      }
    ],
    testimonials: [
      {
        id: 'limington-1',
        name: 'Thomas Wright',
        service: 'Barn Construction',
        text: 'LR Sunrise Construction built a beautiful barn for our Limington property. Their expertise with rural construction and traditional methods was perfect.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'limington-1',
        title: 'Custom Barn Construction',
        category: 'Carpentry',
        description: 'New barn construction in rural Limington',
        image: '/images/services/carpentry-9.jpg'
      }
    ],
  },
  {
    id: 'casco',
    name: 'Casco',
    slug: 'casco',
    description: 'Professional construction services in Casco, Maine. Siding, roofing, and renovation experts.',
    zipCodes: ['04015'],
    keywords: ['general contractor Casco Maine', 'construction Casco ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Casco has a moderate inland climate with cold winters and warm summers. The area experiences typical Maine weather with significant seasonal variations.',
    architecturalNotes: 'Casco features lakeside and rural architecture with modern homes, cottages, and established properties. The area has a mix of year-round and seasonal residences.',
    seasonalTips: [
      'Winter: Monitor lakeside properties; schedule work during milder periods',
      'Spring: Address winter damage; prepare for recreation season',
      'Summer: Peak season for projects; coordinate around lake activities',
      'Fall: Prepare waterfront properties; check drainage systems'
    ],
    localFaqs: [
      {
        id: 'casco-1',
        question: 'What makes lakeside construction in Casco unique?',
        answer: 'Lakeside properties require special attention to moisture protection and may have seasonal access. We specialize in these waterfront challenges.',
        category: 'Lakeside Construction'
      }
    ],
    testimonials: [
      {
        id: 'casco-1',
        name: 'Nancy Collins',
        service: 'Siding Replacement',
        text: 'Our Casco cottage got beautiful new siding from LR Sunrise Construction. They handled the lakeside location perfectly and the results are stunning.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'casco-1',
        title: 'Lakeside Siding',
        category: 'Siding',
        description: 'Siding replacement on a Casco lakeside cottage',
        image: '/images/services/siding-6.jpg'
      }
    ],
  },
  {
    id: 'alfred',
    name: 'Alfred',
    slug: 'alfred',
    description: 'Quality construction and renovation services in Alfred, Maine. Trusted local contractor.',
    zipCodes: ['04002'],
    keywords: ['general contractor Alfred Maine', 'construction Alfred ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Alfred experiences Maine\'s inland climate with cold winters and warm summers. The area receives substantial snowfall and has moderate weather patterns.',
    architecturalNotes: 'Alfred features rural and small-town architecture with modern homes, established properties, and some commercial buildings maintaining local character.',
    seasonalTips: [
      'Winter: Monitor for moderate snowfall; schedule inspections during milder periods',
      'Spring: Address any winter damage; prepare for community activities',
      'Summer: Good time for renovations; coordinate around local events',
      'Fall: Prepare for winter; check drainage and sealing systems'
    ],
    localFaqs: [
      {
        id: 'alfred-1',
        question: 'What construction standards are important in Alfred?',
        answer: 'Alfred values quality craftsmanship and community standards. We maintain these high standards while using modern techniques and materials.',
        category: 'Community Standards'
      }
    ],
    testimonials: [
      {
        id: 'alfred-1',
        name: 'Michael Brown',
        service: 'Roof Repair',
        text: 'LR Sunrise Construction fixed our Alfred home\'s roof quickly and professionally. They understood our community and delivered excellent work.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'alfred-1',
        title: 'Roof Repair',
        category: 'Roofing',
        description: 'Emergency roof repair in Alfred',
        image: '/images/services/roofing-5.jpg'
      }
    ],
  },
  {
    id: 'lake-arrowhead',
    name: 'Lake Arrowhead',
    slug: 'lake-arrowhead',
    description: 'Expert construction services in Lake Arrowhead, Maine. Residential projects and renovations.',
    zipCodes: ['04049'],
    keywords: ['general contractor Lake Arrowhead Maine', 'construction Lake Arrowhead ME'],
    state: 'Maine',
    emergencyResponseTime: BUSINESS_INFO.emergencyResponseTime,
    climateContext: 'Lake Arrowhead has a moderate inland climate with cold winters and pleasant summers. The lakeside location brings additional moisture and weather considerations.',
    architecturalNotes: 'Lake Arrowhead features lakeside architecture with modern homes, cottages, and waterfront properties. The area specializes in vacation and recreational properties.',
    seasonalTips: [
      'Winter: Monitor waterfront properties for ice damage; schedule during off-season',
      'Spring: Address winter damage; prepare for recreation season',
      'Summer: Peak season - coordinate around heavy usage; focus on off-peak work',
      'Fall: Prepare properties for winter; check drainage and sealing'
    ],
    localFaqs: [
      {
        id: 'lake-arrowhead-1',
        question: 'What special considerations are needed for vacation properties in Lake Arrowhead?',
        answer: 'Vacation properties often need seasonal preparation and may have limited access during peak times. We work around these schedules to minimize disruption.',
        category: 'Vacation Property Construction'
      }
    ],
    testimonials: [
      {
        id: 'lake-arrowhead-1',
        name: 'Sarah Johnson',
        service: 'Deck Renovation',
        text: 'Our Lake Arrowhead vacation home\'s deck renovation by LR Sunrise Construction is beautiful. They understood the seasonal nature of our property perfectly.',
        rating: 5
      }
    ],
    galleryItems: [
      {
        id: 'lake-arrowhead-1',
        title: 'Lakeside Deck Renovation',
        category: 'Carpentry',
        description: 'Deck renovation for a Lake Arrowhead vacation home',
        image: '/images/services/carpentry-10.jpg'
      }
    ],
  }
];


/**
 * Pre-filtered featured service areas for homepage display.
 * This avoids the need to import and filter the full serviceAreas array,
 * reducing main thread blocking on initial page load.
 */
export const featuredServiceAreas = serviceAreas.filter(area => area.featured);

/**
 * Lightweight version of featured areas for homepage cards.
 * Contains only the fields needed for rendering service area cards,
 * reducing JavaScript parsing and execution time.
 */
export const featuredServiceAreasMinimal = featuredServiceAreas.map(area => ({
  id: area.id,
  name: area.name,
  slug: area.slug,
  description: area.description,
  featured: area.featured
}));
