<script>
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Nav />

<main>
  <slot />
</main>

<Footer />

<style>
  :global(:root) {
    --font-sans:    'Inter', system-ui, sans-serif;
    --font-display: 'Syne', sans-serif;

    --color-bg:      #f8fafc;
    --color-surface: #ffffff;
    --color-border:  #e2e8f0;
    --color-text:    #0f172a;
    --color-muted:   #64748b;
    --color-accent:  #1d4ed8;
    --color-accent-2:#3b82f6;
    --color-gold:    #d97706;

    --nav-h:    64px;
    --radius:   10px;
    --transition: 200ms ease;
    --shadow:   0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md:0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06);
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
