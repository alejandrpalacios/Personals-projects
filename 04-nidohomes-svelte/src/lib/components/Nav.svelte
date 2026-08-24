<script>
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { savedProperties } from '$lib/stores/saved.js';

  let menuOpen = false;

  const links = [
    { label: 'Home',       href: `${base}/`              },
    { label: 'Properties', href: `${base}/propiedades`   },
    { label: 'Contact',    href: `${base}/contacto`      },
  ];

  $: if ($page.url.pathname) menuOpen = false;
</script>

<nav class="nav" aria-label="Main navigation">
  <div class="container nav__inner">
    <a href="{base}/" class="nav__logo" aria-label="NidoHomes home">
      <span>Nido<strong>Homes</strong></span>
    </a>

    <ul class="nav__links" role="list">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="nav__link"
            class:nav__link--active={$page.url.pathname === link.href ||
              ($page.url.pathname.startsWith(`${base}/propiedades`) && link.href === `${base}/propiedades`)}
            aria-current={$page.url.pathname === link.href ? 'page' : undefined}
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <div class="nav__right">
      <a href="{base}/propiedades?saved=1" class="nav__saved" aria-label="Saved properties">
        <svg width="19" height="19" viewBox="0 0 24 24" fill={$savedProperties.length ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        {#if $savedProperties.length}
          <span class="nav__saved-count">{$savedProperties.length}</span>
        {/if}
      </a>
      <a href="{base}/contacto" class="btn-cta">List property</a>
    </div>

    <button
      class="nav__toggle"
      on:click={() => menuOpen = !menuOpen}
      aria-label="Toggle menu"
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

  {#if menuOpen}
    <div class="nav__mobile">
      {#each links as link}
        <a href={link.href} class="nav__mobile-link">{link.label}</a>
      {/each}
      <a href="{base}/propiedades?saved=1" class="nav__mobile-link">
        Saved properties{$savedProperties.length ? ` (${$savedProperties.length})` : ''}
      </a>
      <a href="{base}/contacto" class="nav__mobile-cta">List property</a>
    </div>
  {/if}
</nav>

<style>
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow);
  }

  .nav__inner {
    display: flex;
    align-items: center;
    height: var(--nav-h);
    gap: 2rem;
  }

  .nav__logo {
    font-size: 1.15rem;
    font-family: var(--font-display);
    letter-spacing: -0.02em;
    color: var(--color-text);
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
    font-weight: 500;
  }

  .nav__link:hover,
  .nav__link--active { color: var(--color-accent); }

  .nav__right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .nav__saved {
    position: relative;
    display: flex;
    color: var(--color-muted);
    transition: color var(--transition);
  }

  .nav__saved:hover { color: #e11d48; }

  .nav__saved-count {
    position: absolute;
    top: -6px; right: -8px;
    min-width: 15px; height: 15px;
    padding-inline: 2px;
    border-radius: 999px;
    background: #e11d48;
    color: #fff;
    font-size: 0.62rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-cta {
    display: inline-block;
    padding: 0.5rem 1.1rem;
    background: var(--color-accent);
    color: #fff;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 6px;
    transition: opacity var(--transition);
    white-space: nowrap;
  }

  .btn-cta:hover { opacity: 0.88; }

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
    background: #fff;
    border-top: 1px solid var(--color-border);
    padding: 1rem 1.5rem;
    gap: 0;
  }

  .nav__mobile-link {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--color-border);
    font-size: 1rem;
    color: var(--color-muted);
    font-weight: 500;
  }

  .nav__mobile-cta {
    margin-top: 0.75rem;
    padding: 0.6rem 1rem;
    background: var(--color-accent);
    color: #fff;
    font-weight: 600;
    border-radius: 6px;
    text-align: center;
    font-size: 0.9rem;
  }

  @media (max-width: 700px) {
    .nav__links, .btn-cta { display: none; }
    .nav__toggle { display: flex; }
  }
</style>
