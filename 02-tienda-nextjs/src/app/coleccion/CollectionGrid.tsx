'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/types';

const PAGE_SIZE = 6;

export default function CollectionGrid({ products }: { products: Product[] }) {
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(products.map(p => p.category)))],
    [products]
  );
  const [activeCategory, setActiveCategory] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory)),
    [products, activeCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function selectCategory(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  return (
    <>
      {/* Filtros de categoría */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`category-badge cursor-pointer transition-colors ${
              activeCategory === cat
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'hover:bg-neutral-900 hover:text-white hover:border-neutral-900'
            }`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      {paged.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paged.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-500 py-16">No products match this filter.</p>
      )}

      {/* Paginación — real, calculada sobre el resultado filtrado */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-16">
          <button
            className="px-4 py-2 border border-neutral-300 text-sm hover:border-neutral-900 transition-colors disabled:opacity-40 disabled:hover:border-neutral-300"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`px-4 py-2 text-sm transition-colors ${
                p === page ? 'bg-neutral-900 text-white' : 'border border-neutral-300 hover:border-neutral-900'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            className="px-4 py-2 border border-neutral-300 text-sm hover:border-neutral-900 transition-colors disabled:opacity-40 disabled:hover:border-neutral-300"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
