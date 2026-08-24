import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug, PRODUCTS } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: { slug: string };
}

// Genera las rutas estáticas para todos los productos
export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ——— GALERÍA ——— */}
        <div className="space-y-3">
          {/* Imagen principal */}
          <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Miniaturas — mostrar cuando haya más imágenes */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <div key={i} className="relative aspect-square bg-neutral-100 overflow-hidden cursor-pointer">
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ——— DETALLE ——— */}
        <div className="lg:sticky lg:top-28 self-start space-y-6">
          <div>
            <p className="category-badge">{product.category}</p>
            <h1 className="font-serif text-4xl mt-3">{product.name}</h1>
            <p className="text-2xl mt-3">${product.price}</p>
          </div>

          {/* Selector de color / talla / agregar al carrito — interactivo, en client component */}
          <ProductDetailClient product={product} />

          {/* Descripción */}
          <div className="space-y-2 pt-2 border-t border-neutral-200">
            <p className="text-neutral-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Accordion details — simplified, can be extended with Headless UI */}
          <details className="border-t border-neutral-200 pt-4">
            <summary className="text-xs tracking-widest uppercase cursor-pointer list-none flex justify-between">
              Composition & care
              <span>+</span>
            </summary>
            <ul className="mt-3 space-y-1">
              {product.details.map(detail => (
                <li key={detail} className="text-sm text-neutral-500">— {detail}</li>
              ))}
            </ul>
          </details>

          <details className="border-t border-neutral-200 pt-4">
            <summary className="text-xs tracking-widest uppercase cursor-pointer list-none flex justify-between">
              Shipping & returns
              <span>+</span>
            </summary>
            <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
              Free shipping on orders over $150. Free returns within 30 days.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
