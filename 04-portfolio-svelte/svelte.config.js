import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto detecta el host (Vercel, Netlify, etc.) y ajusta el build
    adapter: adapter(),
    alias: {
      // $lib es el alias estándar de SvelteKit para src/lib
      $lib: './src/lib',
    },
  },
};

export default config;
