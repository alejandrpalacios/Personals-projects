<script>
  import { lang } from '$lib/stores/lang.js';
  import { t } from '$lib/i18n/translations.js';
  import { PROPERTIES } from '$lib/data/properties.js';
  import PropertyCard from '$lib/components/PropertyCard.svelte';

  let activeFilter = 'all';

  const filters = ['all', 'casa', 'apartamento', 'local'];
  const filterKeys = {
    all: 'filter.all',
    casa: 'filter.casa',
    apartamento: 'filter.apt',
    local: 'filter.local',
  };

  $: filtered = activeFilter === 'all'
    ? PROPERTIES
    : PROPERTIES.filter(p => p.type === activeFilter);
</script>

<svelte:head>
  <title>Properties | NidoHomes</title>
  <meta name="description" content="Browse all available properties — houses, apartments and commercial spaces." />
</svelte:head>

<section class="section">
  <div class="container">
    <div class="page-header">
      <h1 class="page-title">{t($lang, 'props.title')}</h1>
      <p class="page-count">
        <strong>{filtered.length}</strong> {t($lang, 'props.results')}
      </p>
    </div>

    <!-- Filters -->
    <div class="filters" role="group" aria-label="Filter by type">
      {#each filters as f}
        <button
          class="filter-btn"
          class:filter-btn--active={activeFilter === f}
          on:click={() => activeFilter = f}
        >
          {t($lang, filterKeys[f])}
        </button>
      {/each}
    </div>

    <!-- Grid -->
    <div class="cards-grid">
      {#each filtered as property (property.id)}
        <PropertyCard {property} />
      {/each}
    </div>
  </div>
</section>

<style>
  .page-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .page-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    letter-spacing: -0.02em;
    color: var(--color-text);
  }

  .page-count {
    font-size: 0.9rem;
    color: var(--color-muted);
  }

  .filters {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .filter-btn {
    padding: 0.45rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-surface);
    color: var(--color-muted);
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all var(--transition);
  }

  .filter-btn:hover { border-color: var(--color-accent); color: var(--color-accent); }

  .filter-btn--active {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #fff;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 1.5rem;
  }
</style>
