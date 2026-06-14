<script>
  import { page } from '$app/stores';
  let menuOpen = false;

  const links = [
    { label: 'Inicio',     href: '/'          },
    { label: 'Proyectos',  href: '/proyectos'  },
    { label: 'Sobre mí',   href: '/sobre-mi'   },
    { label: 'Contacto',   href: '/contacto'   },
  ];

  // Cierra el menú al navegar
  $: if ($page.url.pathname) menuOpen = false;
</script>

<nav class="nav" aria-label="Navegación principal">
  <div class="container nav__inner">
    <!-- Logo / firma -->
    <a href="/" class="nav__logo" aria-label="Ir al inicio">
      <span class="logo-dot" aria-hidden="true"></span>
      <!-- Reemplazar con nombre real -->
      <span>Alex<strong>Dev</strong></span>
    </a>

    <!-- Links desktop -->
    <ul class="nav__links" role="list">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="nav__link"
            class:nav__link--active={$page.url.pathname === link.href}
            aria-current={$page.url.pathname === link.href ? 'page' : undefined}
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <!-- CTA desktop -->
    <a href="/contacto" class="btn-cta">Hablemos →</a>

    <!-- Toggle móvil -->
    <button
      class="nav__toggle"
      on:click={() => menuOpen = !menuOpen}
      aria-label="Abrir menú"
      aria-expanded={menuOpen}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        {#if menuOpen}
          <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        {:else}
          <line x1="3" y1="7"  x2="19" y2="7"  stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="3" y1="15" x2="19" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        {/if}
      </svg>
    </button>
  </div>

  <!-- Menú móvil -->
  {#if menuOpen}
    <div class="nav__mobile">
      {#each links as link}
        <a href={link.href} class="nav__mobile-link">{link.label}</a>
      {/each}
    </div>
  {/if}
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--nav-h);
    z-index: 100;
    background: rgba(9, 9, 11, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
  }

  .nav__inner {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 2rem;
  }

  .nav__logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-family: var(--font-display);
    letter-spacing: -0.02em;
  }

  .logo-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-accent);
  }

  .nav__links {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    margin-inline: auto;
  }

  .nav__link {
    font-size: 0.9rem;
    color: var(--color-muted);
    transition: color var(--transition);
  }

  .nav__link:hover,
  .nav__link--active {
    color: var(--color-text);
  }

  .btn-cta {
    display: inline-block;
    padding: 0.5rem 1.1rem;
    background: var(--color-accent);
    color: #fff;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 6px;
    transition: opacity var(--transition), transform var(--transition);
    white-space: nowrap;
  }

  .btn-cta:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .nav__toggle {
    display: none;
    background: none;
    border: none;
    color: var(--color-text);
    cursor: pointer;
    margin-left: auto;
  }

  .nav__mobile {
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
    padding: 1rem 1.5rem;
  }

  .nav__mobile-link {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--color-border);
    font-size: 1rem;
    color: var(--color-muted);
  }

  .nav__mobile-link:last-child { border-bottom: none; }

  @media (max-width: 700px) {
    .nav__links,
    .btn-cta { display: none; }

    .nav__toggle { display: flex; }

    .nav {
      height: auto;
      min-height: var(--nav-h);
    }
  }
</style>
