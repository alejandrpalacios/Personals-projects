import { Product } from './types';

// Sample data — replace with an API / CMS call (Shopify, Sanity, etc.)
export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'vestido-lino-arena',
    name: 'Sand Linen Dress',
    category: 'Dresses',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand', hex: '#d4b896' },
      { name: 'White', hex: '#f5f0ea' },
    ],
    description:
      '100% linen dress with a straight cut and midi length. Fresh, versatile and timeless.',
    details: ['100% Linen', 'Made in Portugal', 'Hand wash', 'Straight fit'],
    isNew: true,
  },
  {
    id: '2',
    slug: 'blazer-crudo-oversize',
    name: 'Oversized Raw Blazer',
    category: 'Jackets',
    price: 245,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Raw', hex: '#f0e8d8' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    description:
      'Oversized knit blazer with dropped shoulders. A key piece you can wear with almost anything.',
    details: ['70% Wool / 30% Cashmere', 'Made in Italy', 'Dry clean'],
    isNew: false,
  },
  {
    id: '3',
    slug: 'pantalon-sastre-negro',
    name: 'Black Tailored Trousers',
    category: 'Trousers',
    price: 165,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#0d0d0d' },
      { name: 'Charcoal', hex: '#4a4a52' },
    ],
    description:
      'Pleated trousers with a straight cut that fall perfectly. Formal without the effort.',
    details: ['80% Wool / 20% Polyester', 'Made in Spain', 'Inner lining'],
    isNew: false,
  },
  {
    id: '4',
    slug: 'camisa-popelin-blanca',
    name: 'White Poplin Shirt',
    category: 'Shirts',
    price: 110,
    images: [
      'https://images.unsplash.com/photo-1603251579431-8041402bdeda?w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Sky blue', hex: '#c8dde8' },
    ],
    description:
      'The perfect shirt in Egyptian cotton poplin. Collarless neckline and mother-of-pearl buttons.',
    details: ['100% Egyptian cotton', 'Made in Portugal', 'Iron on medium heat'],
    isNew: true,
  },
  {
    id: '5',
    slug: 'falda-plisada-midi',
    name: 'Pleated Midi Skirt',
    category: 'Skirts',
    price: 135,
    salePrice: 99,
    images: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Navy', hex: '#1e293b' },
      { name: 'Beige', hex: '#e7ddc9' },
    ],
    description:
      'Flowing pleated midi skirt. Wear it day or night, with any top.',
    details: ['100% Recycled polyester', 'Made in Portugal', 'Machine wash 30°'],
    isNew: false,
  },
  {
    id: '6',
    slug: 'jersey-cashmere-beige',
    name: 'Beige Cashmere Sweater',
    category: 'Sweaters',
    price: 290,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige', hex: '#e8dcc8' },
      { name: 'Pearl grey', hex: '#c9c9c9' },
    ],
    description:
      'Fine-knit 100% cashmere sweater. Light, warm and soft to the touch — a piece for life.',
    details: ['100% Cashmere', 'Made in Scotland', 'Hand wash'],
    isNew: true,
  },
  {
    id: '7',
    slug: 'abrigo-lana-camel',
    name: 'Camel Wool Coat',
    category: 'Coats',
    price: 320,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600',
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Camel', hex: '#c19a6b' },
    ],
    description:
      'Wool coat with a straight cut and a classic lapel. The perfect coat for winter.',
    details: ['90% Wool / 10% Cashmere', 'Made in Italy', 'Dry clean'],
    isNew: false,
    isSoldOut: true,
  },
  {
    id: '8',
    slug: 'vestido-saten-negro',
    name: 'Black Satin Dress',
    category: 'Dresses',
    price: 210,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#0d0d0d' },
    ],
    description:
      'Satin dress with a smooth, flowing fit. Elegant and simple, perfect for evening.',
    details: ['100% Viscose', 'Made in Spain', 'Hand wash'],
    isNew: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}
