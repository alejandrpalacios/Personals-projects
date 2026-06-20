import { defineConfig } from 'vite';

export default defineConfig(async () => {
  const { sveltekit } = await import('@sveltejs/kit/vite');
  return {
    plugins: [sveltekit()],
  };
});
