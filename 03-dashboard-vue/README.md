# AdminPro — Dashboard (Vue 3 + Vite)

Panel de administración con Vue 3 Composition API, Vue Router y Vite.

## Stack
- **Vue 3** (Composition API con `<script setup>`)
- **Vue Router 4** — lazy loading por vista
- **Vite 5** — build ultrarrápido
- CSS nativo con variables (`src/assets/main.css`)

## Levantar localmente
```bash
npm install
npm run dev       # http://localhost:5173
```

## Build para producción
```bash
npm run build     # carpeta dist/
npm run preview
```

## Deploy
- **Netlify**: Build command `npm run build`, publish `dist`
- **Vercel**: detecta Vite automáticamente

## Estructura de rutas
| Ruta | Vista | Archivo |
|---|---|---|
| `/dashboard` | KPIs + tabla | `src/views/Dashboard.vue` |
| `/pedidos` | Tabla con filtros | `src/views/Pedidos.vue` |
| `/productos` | Grid de productos | `src/views/Productos.vue` |
| `/clientes` | Tabla de clientes | `src/views/Clientes.vue` |
| `/configuracion` | Formularios y toggles | `src/views/Configuracion.vue` |

## Personalizar
| Qué cambiar | Dónde |
|---|---|
| Colores del sidebar | `src/assets/main.css` → `--sidebar-bg`, `--sidebar-accent` |
| Datos de ejemplo | Cada vista → array de datos al inicio del `<script setup>` |
| Rutas y secciones | `src/router/index.js` |
| Gráficos reales | Dashboard.vue → instalar `npm install vue3-apexcharts apexcharts` |
