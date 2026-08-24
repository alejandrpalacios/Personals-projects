import { defineConfig } from 'astro/config';

export default defineConfig({
  // Sitio en producción — reemplazar con el dominio real
  site: 'https://taskflow.com',
  // Se sirve bajo /taskflow en el dominio unificado del portafolio
  base: '/taskflow',
});
