import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About us',
  description: 'The story and values behind Lumière.',
};

// Iconos de línea (estilo Feather) — sin emoji
function ValueIcon({ paths }: { paths: string[] }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

const values = [
  {
    paths: ['M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z', 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12'],
    title: 'Natural materials',
    text: 'Linen, wool, cashmere and organic cotton. No synthetics that won\'t break down over time.',
  },
  {
    paths: ['M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'],
    title: 'Ethical production',
    text: 'We work with family-run workshops in Portugal, Spain and Italy under verified labor conditions.',
  },
  {
    paths: ['M23 4v6h-6', 'M1 20v-6h6', 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'],
    title: 'Less, but better',
    text: 'Two collections a year, not twelve. Pieces designed to last seasons, not weeks.',
  },
];

export default function NosotrosPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24">
          <p className="category-badge mb-6 self-start">Our story</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">
            Fashion made to <em>last</em>, not to discard
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-md leading-relaxed">
            Lumière was born in 2019 in Barcelona with a simple idea: fewer garments, better made,
            designed to stay with you for more than one season.
          </p>
        </div>
        <div className="relative bg-neutral-100 min-h-[50vw] lg:min-h-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900"
            alt="Lumière craftsmanship workshop"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <p className="category-badge mb-3">What guides us</p>
          <h2 className="font-serif text-4xl">Our values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {values.map(v => (
            <div key={v.title} className="text-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-100 text-brand-600 mb-4">
                <ValueIcon paths={v.paths} />
              </span>
              <h3 className="font-serif text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 text-white py-20 px-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl max-w-xl mx-auto leading-tight">
          Discover pieces made to stay
        </h2>
        <Link href="/coleccion" className="inline-block mt-8 btn-outline border-white text-white hover:bg-white hover:text-neutral-900">
          View the collection
        </Link>
      </section>
    </div>
  );
}
