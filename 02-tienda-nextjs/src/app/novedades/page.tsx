import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/products';

export const metadata: Metadata = {
  title: 'New Arrivals',
  description: 'The latest additions to the Lumière collection.',
};

export default function NovedadesPage() {
  const newArrivals = PRODUCTS.filter(p => p.isNew);

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <p className="category-badge mb-4">Season 2025</p>
        <h1 className="font-serif text-5xl">New arrivals</h1>
        <p className="text-neutral-500 mt-4 max-w-lg mx-auto">
          The most recent pieces from the collection, just landed in the showroom.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {newArrivals.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
