export const PROPERTIES = [
  {
    id: '1',
    slug: 'villa-sol-marbella',
    title: 'Villa Sol Marbella',
    type: 'casa',
    price: 895000,
    location: 'Marbella, Málaga',
    lat: 36.5099, lon: -4.8863,
    rooms: 5,
    baths: 4,
    area: 380,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    features: ['Private pool', 'Garden 800m²', 'Double garage', 'Sea views'],
    description: 'Spectacular luxury villa with top-quality finishes. Bright, spacious interiors, a lush garden and a private pool. Just 5 minutes from the beach.',
    isNew: true,
    isFeatured: true,
  },
  {
    id: '2',
    slug: 'apartamento-centro-madrid',
    title: 'Downtown Madrid Apartment',
    type: 'apartamento',
    price: 320000,
    location: 'Madrid, Spain',
    lat: 40.4168, lon: -3.7038,
    rooms: 2,
    baths: 1,
    area: 75,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    features: ['Elevator', 'Balcony', 'Renovated 2023', '2 min to metro'],
    description: 'Fully renovated apartment in the heart of Madrid. 5th floor with city views. Equipped kitchen and designer bathroom.',
    isNew: false,
    isFeatured: true,
  },
  {
    id: '3',
    slug: 'chalet-adosado-barcelona',
    title: 'Barcelona Townhouse',
    type: 'casa',
    price: 540000,
    location: 'Barcelona, Spain',
    lat: 41.3874, lon: 2.1686,
    rooms: 4,
    baths: 3,
    area: 180,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    features: ['Terrace 40m²', 'Parking', 'Storage room', 'Community pool'],
    description: 'Three-storey townhouse in a private development. Ideal for families. Quiet area with excellent transport links.',
    isNew: true,
    isFeatured: true,
  },
  {
    id: '4',
    slug: 'local-comercial-valencia',
    title: 'Valencia Commercial Unit',
    type: 'local',
    price: 180000,
    location: 'Valencia, Spain',
    lat: 39.4699, lon: -0.3763,
    rooms: 1,
    baths: 1,
    area: 120,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    features: ['Storefront', 'Storage', 'Brand new', 'High foot traffic'],
    description: 'Prime commercial unit in a top Valencia location. Open floor plan with a large storefront and storage. Perfect for retail or office use.',
    isNew: false,
    isFeatured: false,
  },
  {
    id: '5',
    slug: 'penthouse-malaga',
    title: 'Málaga Centre Penthouse',
    type: 'apartamento',
    price: 450000,
    location: 'Málaga, Spain',
    lat: 36.7213, lon: -4.4213,
    rooms: 3,
    baths: 2,
    area: 140,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    features: ['Terrace 60m²', 'Panoramic views', 'Community pool', 'Concierge'],
    description: 'Luxurious 12th-floor penthouse with a private 60m² terrace and 360° views over the historic centre and the sea. High-end finishes.',
    isNew: true,
    isFeatured: false,
  },
  {
    id: '6',
    slug: 'casa-rural-granada',
    title: 'Granada Country House',
    type: 'casa',
    price: 220000,
    location: 'Granada, Spain',
    lat: 37.1773, lon: -3.5986,
    rooms: 6,
    baths: 3,
    area: 320,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    features: ['5,000m² estate', 'Private well', 'Wine cellar', 'Sierra Nevada views'],
    description: 'Authentic Andalusian country house with a private estate. Perfect for residential or tourist use. 25 minutes from central Granada.',
    isNew: false,
    isFeatured: false,
  },
];

export function getPropertyBySlug(slug) {
  return PROPERTIES.find(p => p.slug === slug);
}

export function getFeaturedProperties() {
  return PROPERTIES.filter(p => p.isFeatured);
}

export function getPropertiesByType(type) {
  if (type === 'all') return PROPERTIES;
  return PROPERTIES.filter(p => p.type === type);
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
}
