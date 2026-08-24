'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CarritoPage() {
  const { items, total, updateQty, removeItem, clear } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  function handleCheckout() {
    clear();
    setCheckedOut(true);
  }

  if (checkedOut) {
    return (
      <div className="pt-32 pb-24 max-w-lg mx-auto px-4 text-center">
        <p className="text-5xl mb-4">✓</p>
        <h1 className="font-serif text-3xl mb-3">Thank you for your order!</h1>
        <p className="text-neutral-500 text-sm mb-8">This is a demo checkout — no payment was processed. We'll be in touch by email.</p>
        <Link href="/coleccion" className="btn-primary">Continue shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 max-w-lg mx-auto px-4 text-center">
        <h1 className="font-serif text-3xl mb-3">Your cart is empty</h1>
        <p className="text-neutral-500 text-sm mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/coleccion" className="btn-primary">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl mb-10">Your cart</h1>

      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        {items.map(item => {
          const price = item.product.salePrice ?? item.product.price;
          return (
            <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 py-6">
              <div className="relative w-24 h-32 bg-neutral-100 shrink-0 overflow-hidden">
                <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="96px" />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-serif text-base">{item.product.name}</p>
                  <p className="text-xs text-neutral-400 mt-1">{item.size} · {item.color}</p>
                  <p className="text-sm mt-1">${price}</p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-neutral-300">
                    <button
                      className="w-8 h-8 text-sm hover:bg-neutral-100 transition-colors"
                      aria-label="Decrease quantity"
                      onClick={() => updateQty(item.product.id, item.size, item.color, item.quantity - 1)}
                    >−</button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      className="w-8 h-8 text-sm hover:bg-neutral-100 transition-colors"
                      aria-label="Increase quantity"
                      onClick={() => updateQty(item.product.id, item.size, item.color, item.quantity + 1)}
                    >+</button>
                  </div>

                  <button
                    className="text-xs underline text-neutral-400 hover:text-neutral-900 transition-colors"
                    onClick={() => removeItem(item.product.id, item.size, item.color)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <p className="text-sm font-medium">${(price * item.quantity).toFixed(2)}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="flex justify-between w-full sm:w-64 text-base">
          <span className="text-neutral-500">Subtotal</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        <button className="btn-primary w-full sm:w-64 py-4" onClick={handleCheckout}>
          Checkout
        </button>
        <Link href="/coleccion" className="text-xs underline text-neutral-500 hover:text-neutral-900">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
