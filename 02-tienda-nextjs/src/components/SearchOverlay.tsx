'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/products';

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus al abrir y limpiar la búsqueda al cerrar
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      setQuery('');
    }
  }, [open]);

  // Cierra con Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const term = query.trim().toLowerCase();
  const results = term
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)).slice(0, 6)
    : [];

  return (
    <>
      {/* Fondo oscurecido — clic fuera cierra el buscador */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} aria-hidden="true" />

      <div className="fixed top-16 left-0 right-0 z-50 bg-white border-b border-neutral-200 shadow-lg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3 border-b border-neutral-300 pb-3">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-neutral-400 shrink-0">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13.5 13.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 outline-none text-base placeholder:text-neutral-400"
            />
            <button onClick={onClose} aria-label="Close search" className="text-neutral-400 hover:text-neutral-900 transition-colors">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {term && results.length === 0 && (
            <p className="text-sm text-neutral-500 py-6 text-center">No results for &ldquo;{query}&rdquo;.</p>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-neutral-100 mt-2 max-h-[60vh] overflow-y-auto">
              {results.map(product => (
                <li key={product.id}>
                  <Link
                    href={`/producto/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 py-3 group"
                  >
                    <div className="relative w-14 h-18 bg-neutral-100 shrink-0 overflow-hidden">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-neutral-400 uppercase tracking-wide">{product.category}</p>
                      <p className="font-serif text-sm group-hover:underline truncate">{product.name}</p>
                    </div>
                    <p className="text-sm text-neutral-600 shrink-0">${product.salePrice ?? product.price}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!term && (
            <p className="text-sm text-neutral-400 py-6 text-center">Start typing to search the collection.</p>
          )}
        </div>
      </div>
    </>
  );
}
