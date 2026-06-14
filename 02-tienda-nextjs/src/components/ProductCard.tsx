import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.salePrice !== undefined;
  const displayPrice = hasDiscount ? product.salePrice! : product.price;

  return (
    <article className="group">
      {/* Imagen del producto */}
      <Link href={`/producto/${product.slug}`} className="block overflow-hidden bg-neutral-100 aspect-[3/4] relative">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="category-badge bg-white">Nuevo</span>
          )}
          {hasDiscount && (
            <span className="category-badge bg-neutral-900 text-white border-neutral-900">Sale</span>
          )}
          {product.isSoldOut && (
            <span className="category-badge bg-neutral-200 border-neutral-300">Agotado</span>
          )}
        </div>

        {/* Acción rápida — visible en hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            className="btn-primary w-full text-xs py-2.5"
            disabled={product.isSoldOut}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {product.isSoldOut ? 'Agotado' : 'Agregar al carrito'}
          </button>
        </div>
      </Link>

      {/* Info del producto */}
      <div className="mt-3 space-y-1">
        <p className="text-xs text-neutral-400 tracking-widest uppercase">{product.category}</p>
        <h3 className="font-serif text-base">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${hasDiscount ? 'line-through text-neutral-400' : 'text-neutral-900'}`}>
            ${product.price}
          </span>
          {hasDiscount && (
            <span className="text-sm text-red-600 font-medium">${displayPrice}</span>
          )}
        </div>
      </div>
    </article>
  );
}
