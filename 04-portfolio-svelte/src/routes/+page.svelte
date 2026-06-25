<script>
  import { lang } from '$lib/stores/lang.js';
  import { t } from '$lib/i18n/translations.js';
  import { getFeaturedProperties } from '$lib/data/properties.js';
  import PropertyCard from '$lib/components/PropertyCard.svelte';

  const featured = getFeaturedProperties();
</script>

<svelte:head>
  <title>NidoHomes — Find your dream home</title>
  <meta name="description" content="Exclusive properties in the best locations across Spain." />
</svelte:head>

<!-- HERO -->
<section class="hero">
  <div class="hero__overlay"></div>
  <div class="container hero__content">
    <p class="hero__eyebrow">{t($lang, 'hero.eyebrow')}</p>
    <h1 class="hero__title">
      {t($lang, 'hero.title-1')}<br />
      <span class="hero__accent">{t($lang, 'hero.title-2')}</span>
    </h1>
    <p class="hero__sub">{t($lang, 'hero.subtitle')}</p>

    <div class="hero__search">
      <input
        type="text"
        placeholder={t($lang, 'hero.search')}
        class="search-input"
        aria-label={t($lang, 'hero.search')}
      />
      <a href="/propiedades" class="search-btn">{t($lang, 'hero.btn')}</a>
    </div>

    <div class="hero__stats">
      <div class="stat">
        <span class="stat__num">{t($lang, 'hero.stat1-num')}</span>
        <span class="stat__lbl">{t($lang, 'hero.stat1-lbl')}</span>
      </div>
      <div class="stat__divider" aria-hidden="true"></div>
      <div class="stat">
        <span class="stat__num">{t($lang, 'hero.stat2-num')}</span>
        <span class="stat__lbl">{t($lang, 'hero.stat2-lbl')}</span>
      </div>
      <div class="stat__divider" aria-hidden="true"></div>
      <div class="stat">
        <span class="stat__num">{t($lang, 'hero.stat3-num')}</span>
        <span class="stat__lbl">{t($lang, 'hero.stat3-lbl')}</span>
      </div>
    </div>
  </div>
</section>

<!-- FEATURED -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <div>
        <h2 class="section-title">{t($lang, 'featured.title')}</h2>
        <p class="section-sub">{t($lang, 'featured.sub')}</p>
      </div>
      <a href="/propiedades" class="section-link">{t($lang, 'featured.all')}</a>
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
    <h2 class="section-title" style="margin-bottom:2rem">{t($lang, 'types.title')}</h2>
    <div class="types-grid">
      <a href="/propiedades?type=casa" class="type-card">
        <span class="type-icon" aria-hidden="true">🏡</span>
        <h3 class="type-name">{t($lang, 'types.house')}</h3>
        <p class="type-count">{t($lang, 'types.house-n')}</p>
      </a>
      <a href="/propiedades?type=apartamento" class="type-card">
        <span class="type-icon" aria-hidden="true">🏢</span>
        <h3 class="type-name">{t($lang, 'types.apt')}</h3>
        <p class="type-count">{t($lang, 'types.apt-n')}</p>
      </a>
      <a href="/propiedades?type=local" class="type-card">
        <span class="type-icon" aria-hidden="true">🏪</span>
        <h3 class="type-name">{t($lang, 'types.comm')}</h3>
        <p class="type-count">{t($lang, 'types.comm-n')}</p>
      </a>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section section">
  <div class="container">
    <div class="cta-inner">
      <h2 class="cta-title">¿Quieres vender tu propiedad?</h2>
      <p class="cta-sub">Más de 500 compradores potenciales esperan. Publica gratis hoy.</p>
      <a href="/contacto" class="cta-btn">{t($lang, 'nav.cta')}</a>
    </div>
  </div>
</section>

<style>
  /* HERO */
  .hero {
    position: relative;
    min-height: 600px;
    display: flex;
    align-items: center;
    background-image: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80');
    background-size: cover;
    background-position: center;
    margin-top: calc(-1 * var(--nav-h));
    padding-top: var(--nav-h);
  }

  .hero__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(15,23,42,0.82) 0%, rgba(29,78,216,0.55) 100%);
  }

  .hero__content {
    position: relative;
    z-index: 1;
    padding-block: 5rem;
    color: #fff;
  }

  .hero__eyebrow {
    font-size: 0.82rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.7);
    margin-bottom: 1rem;
  }

  .hero__title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
  }

  .hero__accent { color: #fbbf24; }

  .hero__sub {
    font-size: 1.05rem;
    color: rgba(255,255,255,0.78);
    max-width: 44ch;
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  .hero__search {
    display: flex;
    gap: 0;
    max-width: 520px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow-md);
    margin-bottom: 2.5rem;
  }

  .search-input {
    flex: 1;
    padding: 0.85rem 1rem;
    border: none;
    font-size: 0.95rem;
    font-family: inherit;
    outline: none;
    background: #fff;
    color: var(--color-text);
  }

  .search-input::placeholder { color: var(--color-muted); }

  .search-btn {
    padding: 0.85rem 1.5rem;
    background: var(--color-gold);
    color: #fff;
    font-weight: 700;
    font-size: 0.9rem;
    white-space: nowrap;
    transition: opacity var(--transition);
  }

  .search-btn:hover { opacity: 0.9; }

  .hero__stats {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .stat { text-align: center; }

  .stat__num {
    display: block;
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 800;
    color: #fff;
    line-height: 1;
  }

  .stat__lbl {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.6);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .stat__divider {
    width: 1px;
    height: 32px;
    background: rgba(255,255,255,0.2);
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

  .type-icon { font-size: 2.5rem; display: block; margin-bottom: 0.75rem; }

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
  }
</style>
