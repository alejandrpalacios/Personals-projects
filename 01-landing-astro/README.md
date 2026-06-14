# TaskFlow — Landing Page (Astro)

Landing page SaaS oscura y moderna para un producto de gestión de proyectos.

## Stack
- **Astro 4** — genera HTML estático, cero JS por defecto
- **CSS nativo** con variables custom (sin dependencias)

## Levantar localmente
```bash
npm install
npm run dev       # http://localhost:4321
```

## Build para producción
```bash
npm run build     # carpeta dist/
npm run preview   # preview local del build
```

## Deploy
- **Netlify / Vercel**: conectar el repo y listo — detectan Astro automáticamente
- Build command: `npm run build`
- Publish directory: `dist`

## Personalizar
| Qué cambiar | Dónde |
|---|---|
| Colores de marca | `src/styles/global.css` → `:root` |
| Nombre del producto | `src/components/Header.astro`, `Footer.astro` |
| Planes de precios | `src/components/Pricing.astro` → array `plans` |
| Screenshot del producto | `src/components/Hero.astro` → `.hero__preview` |
| SEO / metadatos | `src/layouts/Layout.astro` |
