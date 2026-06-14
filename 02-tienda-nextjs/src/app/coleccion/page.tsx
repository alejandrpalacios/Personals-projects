import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Colección',
  description: 'Explora la colección completa de Lumière.',
};

// Categorías únicas extraídas de los productos
const ALL_CATEGORIES = ['Todos', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

export default function ColeccionPage() {
  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="text-center mb-14">
        <p className="category-badge mb-4">Temporada 2025</p>
        <h1 className="font-serif text-5xl">Colección completa</h1>
      </div>

      {/* Filtros de categoría — conectar con estado para filtrar en cliente */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {ALL_CATEGORIES.map(cat => (
          <button
            key={cat}
            className="category-badge cursor-pointer hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
            aria-label={`Filtrar por ${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Paginación — conectar con lógica real */}
      <div className="flex justify-center gap-2 mt-16">
        <button className="px-4 py-2 border border-neutral-300 text-sm hover:border-neutral-900 transition-colors" disabled>
          Anterior
        </button>
        <button className="px-4 py-2 bg-neutral-900 text-white text-sm">1</button>
        <button className="px-4 py-2 border border-neutral-300 text-sm hover:border-neutral-900 transition-colors">
          Siguiente
        </button>
      </div>
    </div>
  );
}
