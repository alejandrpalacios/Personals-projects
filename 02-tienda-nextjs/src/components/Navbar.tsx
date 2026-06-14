'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Colección', href: '/coleccion' },
  { label: 'Novedades', href: '/novedades' },
  { label: 'Sobre nosotros', href: '/nosotros' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // TODO: reemplazar con estado global de carrito (Zustand, Context, etc.)
  const cartCount = 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="font-serif text-2xl tracking-widest uppercase">
            Lumière
          </Link>

          {/* Navegación desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            {/* Búsqueda */}
            <button
              aria-label="Buscar"
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13.5 13.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Carrito con contador */}
            <Link href="/carrito" className="relative text-neutral-600 hover:text-neutral-900 transition-colors">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M6 2L3 6v14a2 2 0 002 2h12a2 2 0 002-2V6l-3-4zM3 6h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10a5 5 0 01-10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-neutral-900 text-white text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburguesa móvil */}
            <button
              className="md:hidden text-neutral-900"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                {mobileOpen ? (
                  <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                ) : (
                  <>
                    <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="3" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Menú móvil desplegable */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white">
          <ul className="flex flex-col py-4 px-6 gap-4">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link block py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
