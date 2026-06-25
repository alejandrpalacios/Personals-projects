export const PROPERTIES = [
  {
    id: '1',
    slug: 'villa-sol-marbella',
    title: 'Villa Sol Marbella',
    type: 'casa',
    price: 895000,
    location: 'Marbella, Málaga',
    rooms: 5,
    baths: 4,
    area: 380,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    features: ['Piscina privada', 'Jardín 800m²', 'Garaje doble', 'Vistas al mar'],
    description: 'Espectacular villa de lujo con acabados de primera calidad. Amplios espacios con luz natural, jardín exuberante y piscina privada. A 5 minutos de la playa.',
    isNew: true,
    isFeatured: true,
  },
  {
    id: '2',
    slug: 'apartamento-centro-madrid',
    title: 'Apartamento Centro Madrid',
    type: 'apartamento',
    price: 320000,
    location: 'Madrid, España',
    rooms: 2,
    baths: 1,
    area: 75,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    features: ['Ascensor', 'Balcón', 'Reformado 2023', 'Metro 2 min'],
    description: 'Apartamento completamente reformado en el corazón de Madrid. Planta 5ª con vistas a la ciudad. Cocina equipada y baño de diseño.',
    isNew: false,
    isFeatured: true,
  },
  {
    id: '3',
    slug: 'chalet-adosado-barcelona',
    title: 'Chalet Adosado Barcelona',
    type: 'casa',
    price: 540000,
    location: 'Barcelona, España',
    rooms: 4,
    baths: 3,
    area: 180,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    features: ['Terraza 40m²', 'Parking', 'Trastero', 'Piscina comunitaria'],
    description: 'Chalet adosado de tres plantas en urbanización privada. Ideal para familias. Zona tranquila con excelentes comunicaciones.',
    isNew: true,
    isFeatured: true,
  },
  {
    id: '4',
    slug: 'local-comercial-valencia',
    title: 'Local Comercial Valencia',
    type: 'local',
    price: 180000,
    location: 'Valencia, España',
    rooms: 1,
    baths: 1,
    area: 120,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    features: ['Escaparate', 'Almacén', 'A estrenar', 'Alto tráfico'],
    description: 'Espléndido local en zona prime de Valencia. Planta diáfana con gran escaparate y almacén. Perfecto para retail u oficina.',
    isNew: false,
    isFeatured: false,
  },
  {
    id: '5',
    slug: 'penthouse-malaga',
    title: 'Penthouse Málaga Centro',
    type: 'apartamento',
    price: 450000,
    location: 'Málaga, España',
    rooms: 3,
    baths: 2,
    area: 140,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    features: ['Terraza 60m²', 'Vistas panorámicas', 'Piscina comunitaria', 'Concierge'],
    description: 'Lujoso penthouse en planta 12 con terraza privada de 60m² y vistas 360° al centro histórico y al mar. Acabados de alta gama.',
    isNew: true,
    isFeatured: false,
  },
  {
    id: '6',
    slug: 'casa-rural-granada',
    title: 'Casa Rural Granada',
    type: 'casa',
    price: 220000,
    location: 'Granada, España',
    rooms: 6,
    baths: 3,
    area: 320,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    features: ['Finca 5000m²', 'Pozo propio', 'Bodega', 'Vistas a Sierra Nevada'],
    description: 'Auténtica casa rural andaluza con finca privada. Perfecta para uso residencial o turístico. A 25 minutos del centro de Granada.',
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
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
}
