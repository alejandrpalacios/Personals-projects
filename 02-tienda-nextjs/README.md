# Lumière — Tienda Online (Next.js 14)

Tienda de moda minimalista con App Router, TypeScript y Tailwind CSS.

## Stack
- **Next.js 14** con App Router
- **TypeScript** — tipos en `src/lib/types.ts`
- **Tailwind CSS** — clases utilitarias + componentes en `globals.css`
- `next/image` y `next/font` optimizados

## Levantar localmente
```bash
npm install
npm run dev       # http://localhost:3000
```

## Build para producción
```bash
npm run build
npm run start
```

## Deploy
- **Vercel** (recomendado para Next.js): conectar repo y `vercel deploy`
- **Netlify**: `npm run build` → publicar carpeta `.next`

## Personalizar
| Qué cambiar | Dónde |
|---|---|
| Productos del catálogo | `src/lib/products.ts` → array `PRODUCTS` |
| Colores de Tailwind | `tailwind.config.ts` → `colors.brand` |
| Fuentes | `src/app/layout.tsx` → imports de `next/font` |
| SEO global | `src/app/layout.tsx` → `metadata` |
| Imágenes externas permitidas | `next.config.js` → `remotePatterns` |

## Integrar carrito / pagos
1. Estado global: Zustand o Context API
2. Pagos: Stripe, MercadoPago o Conekta
3. CMS de productos: Shopify Storefront API, Sanity, o Contentful
