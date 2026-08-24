import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-vercel optimiza el build específicamente para Vercel
    adapter: adapter(),
    alias: {
      $lib: './src/lib',
    },
    // Se sirve bajo /nidohomes en el dominio unificado del portafolio
    paths: {
      base: '/nidohomes',
    },
  },
};

export default config;
