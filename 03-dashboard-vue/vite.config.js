import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // Se sirve bajo /console en el dominio unificado del portafolio
  base: '/console/',
  plugins: [vue()],
  resolve: {
    alias: {
      // Alias para imports limpios: '@/components/...' en vez de '../../../'
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
