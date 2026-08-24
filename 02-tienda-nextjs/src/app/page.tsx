'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/products';

export default function HomePage() {
  const newArrivals = PRODUCTS.filter(p => p.isNew);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  }

  return (
    <>
      {/* ——— HERO — full-bleed editorial, no split genérico de plantilla ——— */}
      <section className="relative h-[92vh] min-h-[560px] max-h-[880px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Model wearing linen dress from the summer collection"
          fill priority
          className="object-cover object-[70%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

        <div className="relative z-10 w-full px-6 md:px-16 lg:px-20 pb-14 md:pb-20">
          <p className="inline-block category-badge mb-5 bg-white/95 border-white/95">New collection — Summer 2025</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-[5.5rem] leading-[0.95] tracking-tight text-white max-w-2xl">
            Dress with intention
          </h1>
          <p className="mt-5 text-white/90 text-lg max-w-md leading-relaxed">
            Timeless pieces made to last more than one season. Natural materials, made responsibly, with easy, everyday style.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/coleccion" className="btn-primary bg-white text-neutral-900 hover:bg-neutral-200">Shop collection</Link>
            <Link href="/nosotros"  className="btn-outline border-white text-white hover:bg-white hover:text-neutral-900">Our story</Link>
          </div>
        </div>
      </section>

      {/* ——— NOVEDADES ——— */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="category-badge mb-3">Just arrived</p>
            <h2 className="font-serif text-4xl">New arrivals</h2>
          </div>
          <Link href="/novedades" className="nav-link hidden md:block">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* ——— BANNER ——— */}
      <section className="bg-neutral-900 text-white py-20 px-8 text-center">
        <p className="category-badge text-neutral-400 border-neutral-700 mb-4">Philosophy</p>
        <h2 className="font-serif text-4xl md:text-5xl max-w-2xl mx-auto leading-tight">
          "Less, but better"
        </h2>
        <p className="mt-4 text-neutral-400 max-w-lg mx-auto">Every Lumière piece is designed to be the last one you'll need of its kind.</p>
        <Link href="/nosotros" className="inline-block mt-8 btn-outline border-white text-white hover:bg-white hover:text-neutral-900">
          Learn more
        </Link>
      </section>

      {/* ——— COLECCIÓN COMPLETA ——— */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="category-badge mb-3">All styles</p>
            <h2 className="font-serif text-4xl">The collection</h2>
          </div>
          <Link href="/coleccion" className="nav-link hidden md:block">View full collection →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* ——— NEWSLETTER ——— */}
      <section className="border-t border-neutral-200 py-20 px-8">
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-serif text-3xl mb-3">Be the first to know</h2>
          <p className="text-neutral-500 text-sm mb-6">Early access to new collections, private events and limited editions.</p>
          {subscribed ? (
            <p className="text-sm text-neutral-900 font-medium">You're subscribed! Welcome to Lumière.</p>
          ) : (
            <form className="flex gap-2" onSubmit={handleNewsletter}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="form-input flex-1"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
