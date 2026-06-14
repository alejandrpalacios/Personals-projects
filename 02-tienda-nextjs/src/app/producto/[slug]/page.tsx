import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug, PRODUCTS } from '@/lib/products';

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
                  <Image src={img} alt={`${product.name} vista ${i + 1}`} fill className="object-cover" />
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

          {/* Selector de color */}
          <fieldset>
            <legend className="text-xs tracking-widest uppercase text-neutral-500 mb-2">
              Color
            </legend>
            <div className="flex gap-2">
              {product.colors.map(color => (
                <label key={color.name} className="cursor-pointer" title={color.name}>
                  <input type="radio" name="color" value={color.name} className="sr-only" />
                  <span
                    className="block w-8 h-8 rounded-full border-2 border-transparent hover:border-neutral-400 transition-colors"
                    style={{ backgroundColor: color.hex, outline: '1px solid #d4d4d4' }}
                  />
                </label>
              ))}
            </div>
          </fieldset>

          {/* Selector de talla */}
          <fieldset>
            <div className="flex justify-between items-center mb-2">
              <legend className="text-xs tracking-widest uppercase text-neutral-500">
                Talla
              </legend>
              <button className="text-xs underline text-neutral-400 hover:text-neutral-900">
                Guía de tallas
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <label key={size} className="cursor-pointer">
                  <input type="radio" name="size" value={size} className="sr-only" />
                  <span className="flex items-center justify-center w-12 h-10 border border-neutral-300 text-sm hover:border-neutral-900 transition-colors">
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Agregar al carrito */}
          <button
            className="btn-primary w-full py-4 text-sm"
            disabled={product.isSoldOut}
          >
            {product.isSoldOut ? 'Agotado' : 'Agregar al carrito'}
          </button>

          {/* Descripción */}
          <div className="space-y-2 pt-2 border-t border-neutral-200">
            <p className="text-neutral-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Detalles acordeón — simplificado, se puede ampliar con Headless UI */}
          <details className="border-t border-neutral-200 pt-4">
            <summary className="text-xs tracking-widest uppercase cursor-pointer list-none flex justify-between">
              Composición y cuidados
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
              Envíos y devoluciones
              <span>+</span>
            </summary>
            <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
              Envío gratuito en pedidos superiores a $150. Devoluciones gratuitas en 30 días.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
