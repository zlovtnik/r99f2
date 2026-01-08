export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Complete Roof Replacement',
    category: 'roofing',
    description: 'Full architectural shingle installation on a colonial home',
    image: '/images/services/roof-replacement.jpg'
  },
  {
    id: 2,
    title: 'Vinyl Siding Installation',
    category: 'siding',
    description: 'Modern vinyl siding upgrade with improved insulation',
    image: '/images/Siding-Installation.webp'
  },
  {
    id: 3,
    title: 'Custom Deck Build',
    category: 'carpentry',
    description: 'Pressure-treated lumber deck with built-in seating',
    image: '/images/Carpentry-Services.webp'
  },
  {
    id: 4,
    title: 'House Framing Project',
    category: 'framing',
    description: 'New construction framing for a 2,500 sq ft home',
    image: '/images/gallery/framing-1.jpg'
  },
  {
    id: 5,
    title: 'Kitchen Remodel',
    category: 'remodeling',
    description: 'Complete kitchen renovation with modern finishes',
    image: '/images/gallery/remodeling-1.jpg'
  },
  {
    id: 6,
    title: 'Hardwood Floor Installation',
    category: 'flooring',
    description: 'Oak hardwood flooring throughout the main level',
    image: '/images/gallery/flooring-1.jpg'
  },
  {
    id: 7,
    title: 'Emergency Roof Repair',
    category: 'roofing',
    description: 'Storm damage repair with matching shingles',
    image: '/images/services/roof-repair.jpg'
  },
  {
    id: 8,
    title: 'Cedar Shake Siding',
    category: 'siding',
    description: 'Natural cedar shake siding installation',
    image: '/images/gallery/siding-2.jpg'
  },
  {
    id: 9,
    title: 'Custom Trim Work',
    category: 'carpentry',
    description: 'Detailed crown molding and trim carpentry',
    image: '/images/gallery/carpentry-2.jpg'
  }
];