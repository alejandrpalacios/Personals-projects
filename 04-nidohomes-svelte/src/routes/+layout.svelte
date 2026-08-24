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

    --color-bg:      #f7f7f5;
    --color-surface: #ffffff;
    --color-border:  #e4e4df;
    --color-text:    #1c1c1a;
    --color-muted:   #67675f;
    --color-accent:  #0f6d5f;
    --color-accent-2:#12a394;
    --color-gold:    #b8860b;

    --nav-h:    64px;
    --radius:   8px;
    --transition: 160ms ease;
    --shadow:   0 1px 2px rgba(20,20,15,0.06);
    --shadow-md:0 2px 8px rgba(20,20,15,0.08), 0 1px 2px rgba(20,20,15,0.04);
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

  :global(.sr-only) {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  main {
    padding-top: var(--nav-h);
  }
</style>
