import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Fuentes tipadas para Next.js — se generan como variables CSS
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Lumière',
    default: 'Lumière — Moda consciente y atemporal',
  },
  description:
    'Descubre piezas diseñadas para durar. Moda minimalista de autor con materiales sostenibles.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    // url y images: reemplazar con los reales del cliente
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
