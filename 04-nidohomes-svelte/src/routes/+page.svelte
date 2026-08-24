<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { getFeaturedProperties } from '$lib/data/properties.js';
  import PropertyCard from '$lib/components/PropertyCard.svelte';

  const featured = getFeaturedProperties();

  let searchQuery = '';
  let searchType = 'all';

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchType !== 'all') params.set('type', searchType);
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    const qs = params.toString();
    goto(`${base}/propiedades${qs ? `?${qs}` : ''}`);
  }
</script>

<svelte:head>
  <title>NidoHomes — Find your dream home</title>
  <meta name="description" content="Exclusive properties in the best locations across Spain." />
</svelte:head>

<!-- HERO — buscador como protagonista, sin foto de stock con overlay -->
<section class="hero">
  <div class="container hero__content">
    <p class="hero__eyebrow">Trusted real estate agency</p>
    <h1 class="hero__title">
      Find your <span class="hero__accent">dream home</span>
    </h1>
    <p class="hero__sub">Exclusive properties in the best locations across Spain.</p>

    <form class="search-card" on:submit={handleSearch}>
      <div class="search-card__field search-card__field--select">
        <label for="heroType" class="sr-only">Browse by type</label>
        <select id="heroType" bind:value={searchType} class="search-select">
          <option value="all">All</option>
          <option value="casa">Houses</option>
          <option value="apartamento">Apartments</option>
          <option value="local">Commercial</option>
        </select>
      </div>
      <div class="search-card__divider" aria-hidden="true"></div>
      <div class="search-card__field search-card__field--text">
        <svg class="search-card__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by city or reference..."
          class="search-input"
          aria-label="Search by city or reference..."
        />
      </div>
      <button type="submit" class="search-btn">Search</button>
    </form>

    <div class="hero__stats">
      <div class="stat">
        <span class="stat__num">500+</span>
        <span class="stat__lbl">Properties</span>
      </div>
      <div class="stat__divider" aria-hidden="true"></div>
      <div class="stat">
        <span class="stat__num">12</span>
        <span class="stat__lbl">Cities</span>
      </div>
      <div class="stat__divider" aria-hidden="true"></div>
      <div class="stat">
        <span class="stat__num">98%</span>
        <span class="stat__lbl">Happy clients</span>
      </div>
    </div>
  </div>
</section>

<!-- FEATURED -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <div>
        <h2 class="section-title">Featured Properties</h2>
        <p class="section-sub">Handpicked by our experts</p>
      </div>
      <a href="{base}/propiedades" class="section-link">View all properties →</a>
    </div>

    <div class="cards-grid">
      {#each featured as property (property.id)}
        <PropertyCard {property} />
      {/each}
    </div>
  </div>
</section>

<!-- TYPES -->
<section class="types-section section">
  <div class="container">
    <h2 class="section-title" style="margin-bottom:2rem">Browse by type</h2>
    <div class="types-grid">
      <a href="{base}/propiedades?type=casa" class="type-card">
        <span class="type-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </span>
        <h3 class="type-name">Houses</h3>
        <p class="type-count">3 available</p>
      </a>
      <a href="{base}/propiedades?type=apartamento" class="type-card">
        <span class="type-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </span>
        <h3 class="type-name">Apartments</h3>
        <p class="type-count">2 available</p>
      </a>
      <a href="{base}/propiedades?type=local" class="type-card">
        <span class="type-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </span>
        <h3 class="type-name">Commercial</h3>
        <p class="type-count">1 available</p>
      </a>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section section">
  <div class="container">
    <div class="cta-inner">
      <h2 class="cta-title">Want to sell your property?</h2>
      <p class="cta-sub">Over 500 potential buyers are waiting. List for free today.</p>
      <a href="{base}/contacto" class="cta-btn">List property</a>
    </div>
  </div>
</section>

<style>
  /* HERO — sección clara, foco en el buscador (referencia: Idealista) */
  .hero {
    position: relative;
    background: linear-gradient(180deg, #eef4f2 0%, var(--color-bg) 65%);
    margin-top: calc(-1 * var(--nav-h));
    padding-top: calc(var(--nav-h) + 3.5rem);
  }

  .hero__content {
    padding-block: 3rem 3.5rem;
    text-align: center;
  }

  .hero__eyebrow {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-accent);
    margin-bottom: 0.9rem;
  }

  .hero__title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.4rem);
    line-height: 1.08;
    letter-spacing: -0.03em;
    color: var(--color-text);
    margin-bottom: 0.9rem;
  }

  .hero__accent { color: var(--color-accent); }

  .hero__sub {
    font-size: 1.02rem;
    color: var(--color-muted);
    max-width: 46ch;
    line-height: 1.7;
    margin-inline: auto;
    margin-bottom: 2.25rem;
  }

  /* Search card — tarjeta blanca elevada, no franja de color */
  .search-card {
    display: flex;
    align-items: stretch;
    max-width: 680px;
    margin-inline: auto;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    box-shadow: var(--shadow-md);
    margin-bottom: 2.75rem;
  }

  .search-card__field {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
  }

  .search-card__field--select { flex: 0 0 auto; }
  .search-card__field--text   { flex: 1; }

  .search-select {
    border: none;
    background: transparent;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text);
    outline: none;
    cursor: pointer;
    padding-block: 0.6rem;
  }

  .search-card__divider {
    width: 1px;
    background: var(--color-border);
    margin-block: 0.6rem;
  }

  .search-card__icon { color: var(--color-muted); flex-shrink: 0; }

  .search-input {
    flex: 1;
    border: none;
    font-size: 0.92rem;
    font-family: inherit;
    outline: none;
    background: transparent;
    color: var(--color-text);
    padding-block: 0.85rem;
  }

  .search-input::placeholder { color: var(--color-muted); }

  .search-btn {
    flex-shrink: 0;
    padding: 0 1.75rem;
    background: var(--color-accent);
    color: #fff;
    font-weight: 600;
    font-size: 0.9rem;
    font-family: inherit;
    border: none;
    border-radius: 0 11px 11px 0;
    cursor: pointer;
    white-space: nowrap;
    transition: background var(--transition);
  }

  .search-btn:hover { background: var(--color-accent-2); }

  .hero__stats {
    display: flex;
    justify-content: center;
    gap: 1.75rem;
    align-items: center;
  }

  .stat { text-align: center; }

  .stat__num {
    display: block;
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    line-height: 1;
  }

  .stat__lbl {
    font-size: 0.75rem;
    color: var(--color-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .stat__divider {
    width: 1px;
    height: 28px;
    background: var(--color-border);
  }

  /* SECTION HEADER */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: var(--color-text);
    letter-spacing: -0.02em;
  }

  .section-sub {
    font-size: 0.9rem;
    color: var(--color-muted);
    margin-top: 0.25rem;
  }

  .section-link {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-accent);
    white-space: nowrap;
    transition: opacity var(--transition);
    margin-top: 0.4rem;
  }

  .section-link:hover { opacity: 0.75; }

  /* CARDS */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  /* TYPES */
  .types-section { background: var(--color-surface); }

  .types-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .type-card {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 2rem 1.5rem;
    text-align: center;
    transition: border-color var(--transition), box-shadow var(--transition);
    box-shadow: var(--shadow);
  }

  .type-card:hover {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-md);
  }

  .type-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin: 0 auto 1rem;
    border-radius: 50%;
    background: rgba(15, 109, 95, 0.08);
    color: var(--color-accent);
  }

  .type-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 0.25rem;
  }

  .type-count {
    font-size: 0.82rem;
    color: var(--color-muted);
  }

  /* CTA */
  .cta-section { background: var(--color-accent); }

  .cta-inner {
    text-align: center;
    color: #fff;
  }

  .cta-title {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 3.5vw, 2.2rem);
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
  }

  .cta-sub {
    font-size: 1rem;
    color: rgba(255,255,255,0.8);
    margin-bottom: 1.5rem;
  }

  .cta-btn {
    display: inline-block;
    padding: 0.8rem 2rem;
    background: #fff;
    color: var(--color-accent);
    font-weight: 700;
    font-size: 0.95rem;
    border-radius: var(--radius);
    transition: opacity var(--transition);
  }

  .cta-btn:hover { opacity: 0.9; }

  @media (max-width: 640px) {
    .types-grid { grid-template-columns: 1fr; }
    .hero__stats { gap: 1rem; }

    .search-card {
      flex-direction: column;
      border-radius: 12px;
    }
    .search-card__divider { display: none; }
    .search-card__field--select { border-bottom: 1px solid var(--color-border); }
    .search-btn { border-radius: 0 0 11px 11px; padding: 0.85rem; }
  }
</style>
