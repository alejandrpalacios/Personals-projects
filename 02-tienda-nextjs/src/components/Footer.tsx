import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Marca */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-2xl tracking-widest mb-4">Lumière</p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Moda consciente hecha para durar. Diseñada en Barcelona, confeccionada en Europa.
            </p>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-semibold mb-4">Tienda</h4>
            <ul className="space-y-2">
              {['Novedades', 'Colección', 'Vestidos', 'Chaquetas', 'Pantalones'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-2">
              {['Guía de tallas', 'Envíos', 'Devoluciones', 'Contacto', 'FAQ'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {['Nuestra historia', 'Sostenibilidad', 'Prensa', 'Trabaja con nosotros'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-200 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Lumière Studio SL. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-neutral-400 hover:text-neutral-900">Privacidad</Link>
            <Link href="#" className="text-xs text-neutral-400 hover:text-neutral-900">Cookies</Link>
            <Link href="#" className="text-xs text-neutral-400 hover:text-neutral-900">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
