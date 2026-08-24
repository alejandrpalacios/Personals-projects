import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-vercel optimiza el build específicamente para Vercel
    // runtime fijo: evita que el adapter intente usar nodejs24.x (aún no
    // soportado como runtime de función) solo porque el build corre con Node 24
    adapter: adapter({ runtime: 'nodejs22.x' }),
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
