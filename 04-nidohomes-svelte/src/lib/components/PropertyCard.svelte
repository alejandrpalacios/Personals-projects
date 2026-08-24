<script>
  import { base } from '$app/paths';
  import { formatPrice } from '$lib/data/properties.js';
  import { savedProperties } from '$lib/stores/saved.js';

  export let property;

  $: saved = $savedProperties.includes(property.id);
</script>

<div class="card">
  <button
    class="card__save"
    class:card__save--active={saved}
    aria-label={saved ? 'Remove from saved' : 'Save property'}
    aria-pressed={saved}
    on:click={() => savedProperties.toggle(property.id)}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  </button>

  <a href="{base}/propiedades/{property.slug}" class="card__link">
    <div class="card__img-wrap">
      <img
        src={property.image}
        alt={property.title}
        loading="lazy"
        width="400"
        height="260"
      />
      {#if property.isNew}
        <span class="badge badge--new">New</span>
      {/if}
      <span class="badge badge--type">{property.type}</span>
    </div>

    <div class="card__body">
      <p class="card__price">{formatPrice(property.price)}</p>
      <h3 class="card__title">{property.title}</h3>
      <p class="card__location">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        {property.location}
      </p>

      <div class="card__stats">
        <span>{property.rooms} rooms</span>
        <span class="sep" aria-hidden="true">·</span>
        <span>{property.baths} baths</span>
        <span class="sep" aria-hidden="true">·</span>
        <span>{property.area} m²</span>
      </div>

      <span class="card__cta">View details →</span>
    </div>
  </a>
</div>

<style>
  .card {
    position: relative;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: box-shadow var(--transition), transform var(--transition);
    box-shadow: var(--shadow);
  }

  .card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-3px);
  }

  .card__link { display: block; }

  .card__save {
    position: absolute;
    top: 12px; right: 12px;
    z-index: 2;
    width: 30px; height: 30px;
    border-radius: 50%;
    background: rgba(255,255,255,0.92);
    border: none;
    color: var(--color-text);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform var(--transition), color var(--transition);
    box-shadow: var(--shadow);
  }

  .card__save:hover { transform: scale(1.08); }
  .card__save--active { color: #e11d48; }

  .card__img-wrap {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4 / 3;
  }

  .card__img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 400ms ease;
  }

  .card:hover .card__img-wrap img { transform: scale(1.04); }

  .badge {
    position: absolute;
    top: 12px;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .badge--new {
    left: 12px;
    background: var(--color-accent);
    color: #fff;
  }

  .badge--type {
    top: 50px;
    right: 12px;
    background: rgba(255,255,255,0.92);
    color: var(--color-text);
    text-transform: capitalize;
  }

  .card__body {
    padding: 1.1rem 1.25rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .card__price {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-gold);
    letter-spacing: -0.02em;
  }

  .card__title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.3;
  }

  .card__location {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.82rem;
    color: var(--color-muted);
  }

  .card__stats {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    color: var(--color-muted);
    margin-top: 0.3rem;
    padding-top: 0.6rem;
    border-top: 1px solid var(--color-border);
  }

  .sep { color: var(--color-border); }

  .card__cta {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-accent);
    transition: opacity var(--transition);
  }

  .card:hover .card__cta { opacity: 0.75; }
</style>
