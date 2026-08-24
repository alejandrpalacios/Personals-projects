<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { PROPERTIES } from '$lib/data/properties.js';
  import { savedProperties } from '$lib/stores/saved.js';
  import PropertyCard from '$lib/components/PropertyCard.svelte';

  const filters = ['all', 'casa', 'apartamento', 'local'];
  const filterLabels = {
    all: 'All',
    casa: 'Houses',
    apartamento: 'Apartments',
    local: 'Commercial',
  };

  let activeFilter = 'all';
  let query = '';
  let savedOnly = false;

  // Inicializa filtro y búsqueda desde los query params (?type=casa&q=marbella&saved=1)
  // — así los enlaces "Types" de la home, el buscador del hero y "Saved" del nav funcionan de verdad.
  $: {
    const urlType = $page.url.searchParams.get('type');
    activeFilter = urlType && filters.includes(urlType) ? urlType : 'all';
    query = $page.url.searchParams.get('q') ?? '';
    savedOnly = $page.url.searchParams.get('saved') === '1';
  }

  $: filtered = PROPERTIES.filter(p => {
    const matchesType = activeFilter === 'all' || p.type === activeFilter;
    const term = query.trim().toLowerCase();
    const matchesQuery = !term || p.title.toLowerCase().includes(term) || p.location.toLowerCase().includes(term);
    const matchesSaved = !savedOnly || $savedProperties.includes(p.id);
    return matchesType && matchesQuery && matchesSaved;
  });

  function selectFilter(f) {
    const url = new URL($page.url);
    if (f === 'all') url.searchParams.delete('type');
    else url.searchParams.set('type', f);
    goto(`${url.pathname}${url.search}`, { keepFocus: true, noScroll: true });
  }

  function toggleSavedOnly() {
    const url = new URL($page.url);
    if (savedOnly) url.searchParams.delete('saved');
    else url.searchParams.set('saved', '1');
    goto(`${url.pathname}${url.search}`, { keepFocus: true, noScroll: true });
  }
</script>

<svelte:head>
  <title>Properties | NidoHomes</title>
  <meta name="description" content="Browse all available properties — houses, apartments and commercial spaces." />
</svelte:head>

<section class="section">
  <div class="container">
    <div class="page-header">
      <h1 class="page-title">All Properties</h1>
      <p class="page-count">
        <strong>{filtered.length}</strong> results found
      </p>
    </div>

    <div class="toolbar">
      <!-- Filters -->
      <div class="filters" role="group" aria-label="Filter by type">
        {#each filters as f}
          <button
            class="filter-btn"
            class:filter-btn--active={activeFilter === f}
            on:click={() => selectFilter(f)}
          >
            {filterLabels[f]}
          </button>
        {/each}
        <button
          class="filter-btn filter-btn--saved"
          class:filter-btn--active={savedOnly}
          aria-pressed={savedOnly}
          on:click={toggleSavedOnly}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill={savedOnly ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Saved{$savedProperties.length ? ` (${$savedProperties.length})` : ''}
        </button>
      </div>

      <!-- Text search -->
      <input
        type="search"
        bind:value={query}
        placeholder="Filter by city or property name..."
        class="search-input"
        aria-label="Filter by city or property name..."
      />
    </div>

    <!-- Grid -->
    {#if filtered.length > 0}
      <div class="cards-grid">
        {#each filtered as property (property.id)}
          <PropertyCard {property} />
        {/each}
      </div>
    {:else if savedOnly}
      <p class="no-results">You haven't saved any properties yet. Tap the heart icon on a listing to save it here.</p>
    {:else}
      <p class="no-results">No properties match your search.</p>
    {/if}
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

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .filters {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
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

  .filter-btn--saved {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-left: 0.5rem;
    padding-left: 0.9rem;
    border-left: 1px solid var(--color-border);
  }

  .search-input {
    padding: 0.55rem 0.9rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    font-size: 0.875rem;
    font-family: inherit;
    background: var(--color-surface);
    color: var(--color-text);
    outline: none;
    min-width: 240px;
    transition: border-color var(--transition);
  }

  .search-input:focus { border-color: var(--color-accent); }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 1.5rem;
  }

  .no-results {
    text-align: center;
    color: var(--color-muted);
    padding: 3rem 0;
  }

  @media (max-width: 600px) {
    .toolbar { flex-direction: column; align-items: stretch; }
    .search-input { min-width: 0; }
  }
</style>
