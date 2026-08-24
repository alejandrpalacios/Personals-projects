import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/products';
import CollectionGrid from './CollectionGrid';

export const metadata: Metadata = {
  title: 'Collection',
  description: 'Explore the full Lumière collection.',
};

export default function ColeccionPage() {
  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="category-badge mb-4">Season 2025</p>
        <h1 className="font-serif text-5xl">Full collection</h1>
      </div>

      {/* Filters + grid + pagination, all client-interactive */}
      <CollectionGrid products={PRODUCTS} />
    </div>
  );
}
