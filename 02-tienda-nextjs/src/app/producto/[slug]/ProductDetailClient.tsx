'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();

  const [color, setColor] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (!color || !size) {
      setError(true);
      return;
    }
    setError(false);
    addItem(product, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      {/* Selector de color */}
      <fieldset>
        <legend className="text-xs tracking-widest uppercase text-neutral-500 mb-2">
          Color{color ? ` — ${color}` : ''}
        </legend>
        <div className="flex gap-2">
          {product.colors.map(c => (
            <label key={c.name} className="cursor-pointer" title={c.name}>
              <input
                type="radio" name="color" value={c.name} className="sr-only"
                checked={color === c.name}
                onChange={() => setColor(c.name)}
              />
              <span
                className="block w-8 h-8 rounded-full border-2 transition-colors"
                style={{
                  backgroundColor: c.hex,
                  outline: '1px solid #d4d4d4',
                  borderColor: color === c.name ? '#171717' : 'transparent',
                }}
              />
            </label>
          ))}
        </div>
      </fieldset>

      {/* Selector de talla */}
      <fieldset>
        <div className="flex justify-between items-center mb-2">
          <legend className="text-xs tracking-widest uppercase text-neutral-500">
            Size
          </legend>
          <button type="button" className="text-xs underline text-neutral-400 hover:text-neutral-900">
            Size guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map(s => (
            <label key={s} className="cursor-pointer">
              <input
                type="radio" name="size" value={s} className="sr-only"
                checked={size === s}
                onChange={() => setSize(s)}
              />
              <span
                className="flex items-center justify-center w-12 h-10 border text-sm transition-colors"
                style={{ borderColor: size === s ? '#171717' : '#d4d4d4', fontWeight: size === s ? 600 : 400 }}
              >
                {s}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Agregar al carrito */}
      <div>
        <button
          className="btn-primary w-full py-4 text-sm"
          disabled={product.isSoldOut}
          onClick={handleAdd}
        >
          {product.isSoldOut ? 'Sold out' : added ? 'Added ✓' : 'Add to cart'}
        </button>
        {error && <p className="text-xs text-red-600 mt-2">Please select a color and size.</p>}
        {added && (
          <button
            type="button"
            onClick={() => router.push('/carrito')}
            className="text-xs underline text-neutral-500 hover:text-neutral-900 mt-2"
          >
            Go to cart →
          </button>
        )}
      </div>
    </>
  );
}
