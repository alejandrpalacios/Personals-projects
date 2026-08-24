# NidoHomes — Inmobiliaria (SvelteKit)

Plataforma inmobiliaria con listado de propiedades, búsqueda, filtros por tipo, ficha de detalle y formulario de contacto — construida con SvelteKit y CSS scoped por componente.

## Stack
- **SvelteKit 2** — SSG / SSR híbrido
- **Svelte 4** — componentes con CSS encapsulado
- **adapter-auto** — detecta Vercel / Netlify automáticamente
- Sin dependencias de UI externas — todo CSS nativo
- i18n propio (EN / ES / FR) vía store `lang` + diccionario plano

## Levantar localmente
```bash
npm install
npm run dev       # http://localhost:5173
```

## Build para producción
```bash
npm run build
npm run preview
```

## Deploy
- **Vercel** (recomendado): conectar repo, detecta SvelteKit solo
- **Netlify**: igual, adapter-auto lo maneja

## Estructura de rutas
| Ruta | Archivo | Descripción |
|---|---|---|
| `/` | `src/routes/+page.svelte` | Hero con buscador, propiedades destacadas, tipos, CTA |
| `/propiedades` | `src/routes/propiedades/+page.svelte` | Listado completo con filtro por tipo y búsqueda de texto (soporta `?type=` y `?q=` en la URL) |
| `/propiedades/[slug]` | `src/routes/propiedades/[slug]/+page.svelte` | Ficha de propiedad + formulario de contacto validado |
| `/contacto` | `src/routes/contacto/+page.svelte` | Formulario de contacto general, validado |

## Personalizar
| Qué cambiar | Dónde |
|---|---|
| Color de acento | `src/routes/+layout.svelte` → `--color-accent` |
| Propiedades | `src/lib/data/properties.js` → array `PROPERTIES` |
| Textos e idiomas | `src/lib/i18n/translations.js` |
| Nombre y branding | `src/lib/components/Nav.svelte`, `Footer.svelte` |
| Fuentes | `src/routes/+layout.svelte` → `<svelte:head>` |

## Conectar el formulario de contacto a un backend real
Los formularios de `/contacto` y de la ficha de propiedad ya validan campos requeridos y formato de email en el cliente; para que el envío llegue a algún lado, conecta el `handleSubmit` a un servicio:

```js
// Opción A — Formspree (más fácil)
fetch('https://formspree.io/f/TU_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message }),
});

// Opción B — Resend + SvelteKit API route
// Crear src/routes/api/contact/+server.js
```
