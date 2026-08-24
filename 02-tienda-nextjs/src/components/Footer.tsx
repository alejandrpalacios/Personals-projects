import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-2xl tracking-widest mb-4">Lumière</p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Conscious fashion made to last. Designed in Barcelona, crafted in Europe.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {[
                { label: 'New arrivals', href: '/novedades' },
                { label: 'Collection', href: '/coleccion' },
                { label: 'Dresses', href: '/coleccion' },
                { label: 'Jackets', href: '/coleccion' },
                { label: 'Trousers', href: '/coleccion' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              {['Size guide', 'Shipping', 'Returns', 'Contact', 'FAQ'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'Our story', href: '/nosotros' },
                { label: 'Sustainability', href: '/nosotros' },
                { label: 'Press', href: '#' },
                { label: 'Careers', href: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-200 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Lumière Studio SL. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-neutral-400 hover:text-neutral-900">Privacy</Link>
            <Link href="#" className="text-xs text-neutral-400 hover:text-neutral-900">Cookies</Link>
            <Link href="#" className="text-xs text-neutral-400 hover:text-neutral-900">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
