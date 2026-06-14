# Portfolio Personal (SvelteKit)

Portfolio de desarrollador frontend con SvelteKit, CSS scoped y transiciones nativas.

## Stack
- **SvelteKit 2** — SSG / SSR híbrido
- **Svelte 4** — componentes con CSS encapsulado
- **adapter-auto** — detecta Vercel / Netlify automáticamente
- Sin dependencias de UI externas — todo CSS nativo

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
| Ruta | Archivo |
|---|---|
| `/` | `src/routes/+page.svelte` |
| `/proyectos` | `src/routes/proyectos/+page.svelte` |
| `/contacto` | `src/routes/contacto/+page.svelte` |

## Personalizar
| Qué cambiar | Dónde |
|---|---|
| Color de acento | `src/routes/+layout.svelte` → `--color-accent` |
| Proyectos | `src/lib/data/projects.js` → array `PROJECTS` |
| Nombre y bio | `src/routes/+page.svelte` → texto del hero |
| Formulario de contacto | `src/routes/contacto/+page.svelte` → `handleSubmit` |
| Fuentes | `src/routes/+layout.svelte` → `<svelte:head>` |

## Conectar el formulario de contacto
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
