import { Product } from './types';

// Datos de ejemplo — reemplazar con llamada a API / CMS (Shopify, Sanity, etc.)
export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'vestido-lino-arena',
    name: 'Vestido Lino Arena',
    category: 'Vestidos',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Arena', hex: '#d4b896' },
      { name: 'Blanco', hex: '#f5f0ea' },
    ],
    description:
      'Vestido de lino 100% de corte recto y largo midi. Fresco, versátil y atemporal.',
    details: ['100% Lino', 'Hecho en Portugal', 'Lavable a mano', 'Fit recto'],
    isNew: true,
  },
  {
    id: '2',
    slug: 'blazer-crudo-oversize',
    name: 'Blazer Crudo Oversize',
    category: 'Chaquetas',
    price: 245,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Crudo', hex: '#f0e8d8' },
      { name: 'Negro', hex: '#1a1a1a' },
    ],
    description:
      'Blazer oversize de punto con hombros caídos. La pieza estructurante de tu guardarropa cápsula.',
    details: ['70% Lana / 30% Cachemira', 'Hecho en Italia', 'Dry clean'],
    isNew: false,
  },
  {
    id: '3',
    slug: 'pantalon-sastre-negro',
    name: 'Pantalón Sastre Negro',
    category: 'Pantalones',
    price: 165,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4f9a?w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro', hex: '#0d0d0d' },
      { name: 'Gris marengo', hex: '#4a4a52' },
    ],
    description:
      'Pantalón de pinzas de corte recto con caída perfecta. Formal sin esfuerzo.',
    details: ['80% Lana / 20% Poliéster', 'Hecho en España', 'Entretela interior'],
    isNew: false,
  },
  {
    id: '4',
    slug: 'camisa-popelin-blanca',
    name: 'Camisa Popelín Blanca',
    category: 'Camisas',
    price: 110,
    images: [
      'https://images.unsplash.com/photo-1603251579431-8041402bdeda?w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Blanco', hex: '#ffffff' },
      { name: 'Celeste', hex: '#c8dde8' },
    ],
    description:
      'La camisa perfecta en popelín de algodón egipcio. Cuello sin cuello y botones nácar.',
    details: ['100% Algodón egipcio', 'Hecho en Portugal', 'Planchar a temperatura media'],
    isNew: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}
