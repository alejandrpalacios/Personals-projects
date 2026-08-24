'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem, Product } from '@/lib/types';

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue>({
  items: [],
  count: 0,
  total: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
  clear: () => {},
});

const STORAGE_KEY = 'cart';

function sameLine(a: CartItem, productId: string, size: string, color: string) {
  return a.product.id === productId && a.size === size && a.color === color;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Lee el carrito guardado al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // localStorage corrupto o no disponible — arranca con carrito vacío
    }
    setHydrated(true);
  }, []);

  // Persiste cada cambio (evita sobrescribir con [] antes de terminar de hidratar)
  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(product: Product, size: string, color: string, quantity = 1) {
    setItems(prev => {
      const existing = prev.find(i => sameLine(i, product.id, size, color));
      if (existing) {
        return prev.map(i =>
          sameLine(i, product.id, size, color) ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, size, color, quantity }];
    });
  }

  function removeItem(productId: string, size: string, color: string) {
    setItems(prev => prev.filter(i => !sameLine(i, productId, size, color)));
  }

  function updateQty(productId: string, size: string, color: string, quantity: number) {
    if (quantity < 1) return removeItem(productId, size, color);
    setItems(prev => prev.map(i =>
      sameLine(i, productId, size, color) ? { ...i, quantity } : i
    ));
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, count, total, addItem, removeItem, updateQty, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
