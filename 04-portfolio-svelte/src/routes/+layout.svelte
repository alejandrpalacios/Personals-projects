<script>
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <!-- Fuente — se puede mover a app.html si se prefiere -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Nav />

<!-- Contenido de cada ruta se inyecta aquí -->
<main>
  <slot />
</main>

<Footer />

<style>
  /* =============================================
     TOKENS DE DISEÑO GLOBALES
     ============================================= */
  :global(:root) {
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-display: 'Syne', sans-serif;

    --color-bg:        #09090b;
    --color-surface:   #141418;
    --color-border:    #27272a;
    --color-text:      #fafafa;
    --color-muted:     #71717a;
    --color-accent:    #f97316;      /* naranja — cambiar fácilmente al color del cliente */
    --color-accent-2:  #fb923c;

    --nav-h: 64px;
    --radius: 10px;
    --transition: 220ms ease;
  }

  :global(*, *::before, *::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(html) {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  :global(body) {
    font-family: var(--font-sans);
    background: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  :global(a) {
    color: inherit;
    text-decoration: none;
  }

  :global(img) {
    max-width: 100%;
    display: block;
  }

  /* Contenedor estándar */
  :global(.container) {
    width: 100%;
    max-width: 1100px;
    margin-inline: auto;
    padding-inline: 1.5rem;
  }

  :global(.section) {
    padding-block: 5rem;
  }

  main {
    padding-top: var(--nav-h);
  }
</style>
