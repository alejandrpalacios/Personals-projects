import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/products';

export default function HomePage() {
  const newArrivals = PRODUCTS.filter(p => p.isNew);
  const allProducts = PRODUCTS;

  return (
    <>
      {/* ——— HERO ——— */}
      <section className="pt-16 min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Texto */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24">
          <p className="category-badge mb-6 self-start">Nueva colección — Verano 2025</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight">
            Viste con <em>intención</em>
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-md leading-relaxed">
            Piezas atemporales diseñadas para durar más de una temporada. Materiales
            naturales, confección ética y estilo sin complicaciones.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link href="/coleccion" className="btn-primary">
              Ver colección
            </Link>
            <Link href="/nosotros" className="btn-outline">
              Nuestra historia
            </Link>
          </div>
        </div>

        {/* Imagen hero — reemplazar con foto real del cliente */}
        <div className="relative bg-neutral-100 min-h-[60vw] lg:min-h-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900"
            alt="Modelo con vestido lino de la colección verano"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* ——— NOVEDADES ——— */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="category-badge mb-3">Recién llegado</p>
            <h2 className="font-serif text-4xl">Novedades</h2>
          </div>
          <Link href="/novedades" className="nav-link hidden md:block">
            Ver todo →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ——— BANNER INTERMEDIO ——— */}
      <section className="bg-neutral-900 text-white py-20 px-8 text-center">
        <p className="category-badge text-neutral-400 border-neutral-700 mb-4">
          Filosofía
        </p>
        <h2 className="font-serif text-4xl md:text-5xl max-w-2xl mx-auto leading-tight">
          "Menos, pero mejor"
        </h2>
        <p className="mt-4 text-neutral-400 max-w-lg mx-auto">
          Cada pieza de Lumière se diseña para ser la última que necesitas de su tipo.
        </p>
        <Link href="/nosotros" className="inline-block mt-8 btn-outline border-white text-white hover:bg-white hover:text-neutral-900">
          Conocer más
        </Link>
      </section>

      {/* ——— COLECCIÓN COMPLETA ——— */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="category-badge mb-3">Todos los estilos</p>
            <h2 className="font-serif text-4xl">La colección</h2>
          </div>
          <Link href="/coleccion" className="nav-link hidden md:block">
            Ver colección completa →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ——— NEWSLETTER ——— */}
      <section className="border-t border-neutral-200 py-20 px-8">
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-serif text-3xl mb-3">Sé el primero en saber</h2>
          <p className="text-neutral-500 text-sm mb-6">
            Acceso anticipado a nuevas colecciones, eventos privados y ediciones limitadas.
          </p>
          {/* Reemplazar el onSubmit con integración real (Mailchimp, Klaviyo, etc.) */}
          <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="tu@email.com"
              className="form-input flex-1"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
