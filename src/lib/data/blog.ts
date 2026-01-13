import { marked } from 'marked';
import type { BlogPost } from '$types';

// Helper function to convert markdown to HTML (synchronous)
function md(content: string): string {
  return marked.parse(content, { async: false }) as string;
}

const rawBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Roof Shingles: When to Repair vs. Replace',
    slug: 'understanding-roof-shingles-repair-vs-replace',
    excerpt: 'Learn the key indicators that tell you whether your roof shingles need repair or complete replacement. Save money and avoid costly mistakes with this comprehensive guide.',
    content: `# Understanding Roof Shingles: When to Repair vs. Replace

Roof shingles are the first line of defense against Maine's harsh weather conditions. Understanding when to repair versus replace can save you thousands of dollars and prevent major water damage.

## Signs Your Roof Needs Repair

### Curling Shingles
When shingles curl at the edges, it usually indicates moisture damage. This can happen due to:
- Poor attic ventilation
- Ice dams in winter
- Manufacturing defects

### Missing or Damaged Shingles
Storm damage, high winds, or foot traffic can dislodge shingles. Even one missing shingle can allow water infiltration.

### Granule Loss
The protective granules on asphalt shingles can wear away over time, reducing the roof's ability to withstand UV rays and weather.

## When Replacement is Necessary

### Age-Related Deterioration
Most asphalt shingles last 15-25 years. If your roof is approaching this age range, replacement is often more cost-effective than repeated repairs.

### Widespread Damage
If more than 20-30% of your roof shows damage, replacement is typically recommended.

### Underlying Structural Issues
If you discover decking damage or other structural problems during inspection, a full replacement may be necessary.

## The LR Sunrise Construction Approach

We start with a comprehensive inspection to assess your roof's condition. Our certified technicians provide detailed reports with repair vs. replacement recommendations based on:
- Current roof condition
- Age of existing roof
- Local climate factors
- Your budget and timeline

## Cost Considerations

While repairs might seem cheaper initially, frequent repairs can cost more than replacement over time. We help you make informed decisions that protect your investment.

Contact us today for a free roof inspection and personalized recommendations.`,
    author: 'Mike Johnson',
    publishedAt: '2024-01-15',
    category: 'Roofing',
    tags: ['roof repair', 'roof replacement', 'shingles', 'roof maintenance'],
    featuredImage: '/images/roof-shingles-guide.webp',
    imageAlt: 'Roof shingles showing signs of wear and tear',
    readingTime: 5,
    relatedServices: ['roofing'],
    seoTitle: 'Roof Shingles: Repair vs Replace Guide | LR Sunrise Construction',
    seoDescription: 'Learn when to repair or replace roof shingles in Maine. Expert guidance on roof maintenance and replacement decisions.',
    keywords: ['roof repair Maine', 'roof replacement', 'shingle repair', 'roof maintenance']
  },
  {
    id: '2',
    title: 'Maine Winter Roofing: Protecting Your Home from Ice Dams',
    slug: 'maine-winter-roofing-ice-dams-protection',
    excerpt: 'Ice dams can cause thousands in damage to Maine homes. Learn how proper attic insulation and ventilation can prevent this common winter problem.',
    content: `# Maine Winter Roofing: Protecting Your Home from Ice Dams

Maine's cold winters bring unique challenges for homeowners. Ice dams form when snow melts on warmer parts of the roof and refreezes at the eaves, creating dangerous buildup that can damage your roof and home.

## How Ice Dams Form

1. **Heat Loss**: Warm air escapes through the attic, melting snow on the roof surface
2. **Refreezing**: Melted snow runs down and refreezes at the colder eaves
3. **Buildup**: Layers of ice accumulate, preventing proper drainage
4. **Backup**: Meltwater backs up under shingles, causing leaks and damage

## Prevention Strategies

### Proper Insulation
Ensure your attic has adequate insulation (R-30 to R-60) to minimize heat loss.

### Attic Ventilation
Install or improve soffit and ridge vents for proper airflow that carries away warm, moist air.

### Ice and Water Shield
Apply ice and water shield membrane along eaves and valleys for extra protection.

### Gutter Maintenance
Keep gutters clear and properly sloped to direct water away from the foundation.

## Signs of Ice Dam Problems

- Icicles hanging from eaves
- Water stains on interior ceilings
- Wet spots in insulation
- Musty odors in attic

## Professional Solutions

Our certified technicians specialize in Maine winter roofing challenges. We offer:
- Comprehensive attic inspections
- Ventilation system upgrades
- Ice and water shield installation
- Emergency ice dam removal

Don't wait for damage to occur. Schedule your winter roof inspection today and protect your Maine home from ice dams.`,
    author: 'Sarah Mitchell',
    publishedAt: '2024-01-08',
    category: 'Roofing',
    tags: ['ice dams', 'winter roofing', 'attic insulation', 'roof protection'],
    featuredImage: '/images/ice-dam-maine.webp',
    imageAlt: 'Ice dams forming on a Maine home roof during winter',
    readingTime: 6,
    relatedServices: ['roofing'],
    seoTitle: 'Maine Winter Roofing: Ice Dam Prevention | LR Sunrise Construction',
    seoDescription: 'Protect your Maine home from ice dams with proper roofing techniques. Learn prevention and repair strategies for winter weather.',
    keywords: ['ice dams Maine', 'winter roofing', 'roof protection', 'attic insulation']
  },
  {
    id: '3',
    title: 'Choosing the Right Siding Material for Maine Homes',
    slug: 'choosing-right-siding-material-maine-homes',
    excerpt: 'From vinyl to fiber cement, discover which siding material best suits your Maine home\'s needs, budget, and local climate conditions.',
    content: `# Choosing the Right Siding Material for Maine Homes

Selecting the right siding material is crucial for Maine homeowners. Our harsh climate demands materials that can withstand extreme cold, heavy snow, and salt-laden coastal air.

## Popular Siding Options

### Vinyl Siding
**Best For**: Budget-conscious homeowners, modern and traditional homes
**Pros**: Affordable, low maintenance, good insulation
**Cons**: Can fade in intense sun, less durable than premium options
**Maine Suitability**: Good for inland areas, may require UV protection near coast

### Fiber Cement
**Best For**: Homes needing durability and aesthetic appeal
**Pros**: Extremely durable, realistic wood appearance, fire-resistant
**Cons**: Higher cost, requires professional installation
**Maine Suitability**: Excellent for all Maine climates, withstands harsh weather

### Wood Siding
**Best For**: Historic homes, premium look desired
**Pros**: Natural beauty, good insulation, authentic appearance
**Cons**: High maintenance, susceptible to rot and insects
**Maine Suitability**: Good with proper maintenance, traditional in New England

### Metal Siding
**Best For**: Modern homes, commercial properties
**Pros**: Very durable, low maintenance, energy efficient
**Cons**: Higher cost, can dent if impacted
**Maine Suitability**: Excellent for coastal areas, resists salt air corrosion

## Maine-Specific Considerations

### Coastal vs. Inland
Coastal areas require materials resistant to salt air corrosion. Metal and fiber cement perform best in these conditions.

### Insulation Value
Maine's cold winters demand siding with good insulating properties to reduce heating costs.

### Maintenance Requirements
Consider your availability for maintenance when choosing materials.

## Professional Installation Matters

Regardless of material choice, professional installation ensures proper performance and warranty coverage. Our certified installers have extensive experience with Maine's unique climate challenges.

Contact us for a free siding consultation and material recommendations tailored to your home and location.`,
    author: 'David Chen',
    publishedAt: '2024-01-01',
    category: 'Siding',
    tags: ['siding materials', 'vinyl siding', 'fiber cement', 'wood siding'],
    featuredImage: '/images/siding-materials-maine.webp',
    imageAlt: 'Various siding materials suitable for Maine homes',
    readingTime: 7,
    relatedServices: ['siding'],
    seoTitle: 'Best Siding Materials for Maine Homes | LR Sunrise Construction',
    seoDescription: 'Choose the right siding material for your Maine home. Compare vinyl, fiber cement, wood, and metal options for durability and climate resistance.',
    keywords: ['siding Maine', 'vinyl siding', 'fiber cement siding', 'home siding']
  },
  {
    id: '4',
    title: 'Spring Home Maintenance Checklist for Maine Property Owners',
    slug: 'spring-home-maintenance-checklist-maine',
    excerpt: 'Prepare your Maine home for the changing seasons with this comprehensive spring maintenance checklist covering roofing, siding, and exterior repairs.',
    content: `# Spring Home Maintenance Checklist for Maine Property Owners

Spring is the perfect time to assess and repair winter damage in Maine. Our harsh winters can take a toll on homes, so thorough inspections and repairs are essential.

## Roof Inspection

### Check for Winter Damage
- Missing or damaged shingles from storms
- Ice dam evidence and water stains
- Attic moisture or mold issues

### Clean and Maintain
- Remove debris from gutters and downspouts
- Check for proper drainage
- Inspect flashing and seals

## Siding and Exterior

### Inspect for Damage
- Cracks, holes, or loose panels
- Fading or discoloration
- Moisture damage or rot

### Clean and Seal
- Power wash exterior surfaces
- Apply sealant to joints and seams
- Touch up paint as needed

## Foundation and Drainage

### Check Foundation
- Look for cracks or settling
- Ensure proper grading around foundation
- Inspect basement for water intrusion

### Improve Drainage
- Clean and repair drainage systems
- Ensure water flows away from foundation
- Consider French drains if needed

## Windows and Doors

### Inspect Seals
- Check for air leaks around frames
- Replace weatherstripping if worn
- Ensure proper operation

## HVAC and Ventilation

### Spring Preparation
- Clean and service HVAC system
- Check attic ventilation
- Inspect chimney and vents

## Landscaping and Yard

### Seasonal Cleanup
- Remove winter debris
- Trim trees and shrubs
- Repair landscape features

## Professional Services

While some maintenance can be DIY, certain repairs require professional expertise:
- Roof repairs and replacements
- Foundation work
- Electrical and plumbing issues
- Major structural repairs

Our certified technicians provide comprehensive spring inspections and repairs to ensure your Maine home is ready for the coming seasons.

Schedule your spring home maintenance inspection today!`,
    author: 'Jennifer Walsh',
    publishedAt: '2023-12-20',
    category: 'Maintenance',
    tags: ['spring maintenance', 'home inspection', 'seasonal care', 'roof inspection'],
    featuredImage: '/images/spring-maintenance-maine.webp',
    imageAlt: 'Spring home maintenance checklist for Maine homes',
    readingTime: 8,
    relatedServices: ['roofing', 'siding', 'carpentry'],
    seoTitle: 'Spring Home Maintenance Checklist for Maine | LR Sunrise Construction',
    seoDescription: 'Complete spring maintenance guide for Maine homeowners. Inspect and repair winter damage to protect your investment.',
    keywords: ['spring maintenance Maine', 'home inspection', 'seasonal maintenance', 'home repair']
  },
  {
    id: '5',
    title: 'Energy-Efficient Home Improvements for Maine Winters',
    slug: 'energy-efficient-home-improvements-maine-winters',
    excerpt: 'Reduce heating costs and improve comfort with energy-efficient upgrades designed for Maine\'s cold climate. From insulation to windows, discover cost-saving improvements.',
    content: `# Energy-Efficient Home Improvements for Maine Winters

Maine's long, cold winters make energy efficiency crucial for comfort and cost savings. Strategic home improvements can significantly reduce heating bills while improving indoor comfort.

## Insulation Upgrades

### Attic Insulation
Proper attic insulation (R-30 to R-60) prevents heat loss and reduces ice dam formation. We recommend cellulose or fiberglass insulation for optimal performance.

### Wall Insulation
Adding insulation to exterior walls can reduce heating costs by 15-20%. This is especially important for older Maine homes built before modern insulation standards.

### Basement and Crawl Space
Insulating below-grade spaces prevents cold air infiltration and reduces energy loss.

## Window and Door Improvements

### Energy-Efficient Windows
Replace single-pane windows with double or triple-pane models featuring low-E glass and argon gas fills. This can reduce heat loss by up to 50%.

### Weatherstripping and Seals
Properly sealed windows and doors prevent air leaks that can waste up to 30% of your heating energy.

## HVAC System Upgrades

### High-Efficiency Furnace
Consider upgrading to a 95%+ AFUE furnace for maximum efficiency. Proper sizing and installation are crucial for optimal performance.

### Ductwork Sealing
Leaky ducts can waste 20-30% of heating energy. Professional sealing and insulation ensure efficient delivery of warm air.

### Programmable Thermostat
Smart thermostats can reduce heating costs by 10% through automated temperature adjustments.

## Ventilation Improvements

### Heat Recovery Ventilators (HRV)
HRVs exchange stale indoor air with fresh outdoor air while recovering heat from exhaust air, improving indoor air quality without losing heating energy.

## Renewable Energy Options

### Solar Panels
Maine's solar incentives make photovoltaic panels increasingly viable for homeowners. Solar can offset winter heating costs and provide summer electricity.

### Wood Heating
For rural properties, high-efficiency wood stoves or pellet stoves can provide cost-effective supplemental heating.

## Professional Assessment

Our energy auditors use advanced tools to identify improvement opportunities and calculate potential savings. We provide detailed reports with prioritized recommendations and cost-benefit analysis.

Investing in energy efficiency not only reduces your utility bills but also increases your home's comfort and value. Contact us for a free energy assessment today!`,
    author: 'Robert Martinez',
    publishedAt: '2023-12-15',
    category: 'Energy Efficiency',
    tags: ['energy efficiency', 'insulation', 'heating costs', 'home improvements'],
    featuredImage: '/images/framing2.webp',
    imageAlt: 'Energy-efficient home improvements for Maine winters',
    readingTime: 9,
    relatedServices: ['insulation', 'windows', 'hvac'],
    seoTitle: 'Energy-Efficient Home Improvements for Maine Winters | LR Sunrise Construction',
    seoDescription: 'Reduce heating costs with energy-efficient upgrades for Maine homes. Insulation, windows, and HVAC improvements for cold climate comfort.',
    keywords: ['energy efficiency Maine', 'home insulation', 'heating costs', 'energy savings']
  },
  {
    id: '6',
    title: 'Historic Home Renovations: Preserving Maine\'s Architectural Heritage',
    slug: 'historic-home-renovations-preserving-maine-heritage',
    excerpt: 'Learn how to renovate historic Maine homes while preserving their architectural integrity and historical value. Expert tips for maintaining character during modern updates.',
    content: `# Historic Home Renovations: Preserving Maine's Architectural Heritage

Maine is home to thousands of historic homes that tell the story of our state's rich architectural heritage. Renovating these treasures requires balancing modern needs with historical preservation.

## Understanding Historic Styles

### Colonial (1700-1780)
Characterized by simple, symmetrical designs with clapboard siding, central chimneys, and multi-pane windows.

### Federal (1780-1830)
Features brick or clapboard exteriors, fanlights over doors, and elegant interior trim.

### Greek Revival (1830-1860)
Known for white clapboard, columns, and pediments inspired by ancient Greek architecture.

### Victorian (1860-1900)
Includes Queen Anne, Italianate, and Second Empire styles with ornate detailing and varied rooflines.

## Preservation Principles

### Respect Original Materials
When possible, repair rather than replace original materials. This maintains historical authenticity and value.

### Maintain Proportions
Preserve original window and door sizes, room layouts, and exterior proportions.

### Document Changes
Keep detailed records of renovations for future owners and historical societies.

## Modern Updates with Historic Sensitivity

### Kitchen and Bath Renovations
- Choose period-appropriate fixtures and finishes
- Preserve original cabinetry when possible
- Use historically accurate colors and materials

### Mechanical Systems
- Conceal modern HVAC and plumbing within existing architectural features
- Use historically appropriate vent covers and grilles

### Insulation and Energy Efficiency
- Add insulation without altering exterior appearance
- Use internal storm windows to maintain original window character

## Working with Historical Societies

Many Maine communities have historical societies that provide guidance and resources for historic renovations. We work closely with these organizations to ensure compliance with preservation standards.

## Permits and Regulations

Historic districts often have additional permitting requirements and design review processes. We handle all necessary paperwork and navigate local regulations.

## Our Historic Renovation Expertise

Our team has extensive experience with historic Maine homes, including:
- Period-appropriate material sourcing
- Traditional construction techniques
- Coordination with historical societies
- Preservation of architectural details

Preserving Maine's architectural heritage while creating comfortable, modern living spaces is our passion. Contact us for your historic home renovation project.`,
    author: 'Patricia Anderson',
    publishedAt: '2023-12-10',
    category: 'Historic Renovation',
    tags: ['historic homes', 'preservation', 'architecture', 'renovation'],
    featuredImage: '/images/construction-work-hero.webp',
    imageAlt: 'Historic Maine home undergoing sensitive renovation',
    readingTime: 10,
    relatedServices: ['carpentry', 'siding', 'roofing'],
    seoTitle: 'Historic Home Renovations in Maine | LR Sunrise Construction',
    seoDescription: 'Preserve Maine\'s architectural heritage with sensitive historic home renovations. Expert restoration and modernization services.',
    keywords: ['historic homes Maine', 'home preservation', 'architectural renovation', 'historic restoration']
  }
];

// Convert all markdown content to HTML
const processedBlogPosts = rawBlogPosts.map(post => ({
  ...post,
  content: md(post.content)
}));

export { processedBlogPosts as blogPosts };

// Derive categories from blogPosts to keep them in sync
export const blogCategories = [
  ...new Set(processedBlogPosts.map(post => post.category))
];

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return processedBlogPosts.filter(post => post.category === category);
};

export const getBlogPostsByTag = (tag: string): BlogPost[] => {
  return processedBlogPosts.filter(post => post.tags.includes(tag));
};

export const getRelatedBlogPosts = (currentPostId: string, limit: number = 3): BlogPost[] => {
  const currentPost = processedBlogPosts.find(post => post.id === currentPostId);
  if (!currentPost) return [];

  // Calculate relevance score for each candidate post
  const candidatesWithScores = processedBlogPosts
    .filter(post => post.id !== currentPostId)
    .map(post => {
      let score = 0;

      // Same category: +10 points
      if (post.category === currentPost.category) {
        score += 10;
      }

      // Shared tags: +5 points per tag
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      score += sharedTags.length * 5;

      // Shared relatedServices: +3 points per service
      const sharedServices = post.relatedServices?.filter(service =>
        currentPost.relatedServices?.includes(service)
      ) || [];
      score += sharedServices.length * 3;

      return { post, score };
    });

  // Sort by score (descending), then by publish date (newest first) as tie-breaker
  candidatesWithScores.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
  });

  // Return top limit items
  return candidatesWithScores.slice(0, limit).map(item => item.post);
};