<script>
  import { lang } from '$lib/stores/lang.js';
  import { t } from '$lib/i18n/translations.js';
  import { formatPrice } from '$lib/data/properties.js';

  export let property;
</script>

<a href="/propiedades/{property.slug}" class="card">
  <div class="card__img-wrap">
    <img
      src={property.image}
      alt={property.title}
      loading="lazy"
      width="400"
      height="260"
    />
    {#if property.isNew}
      <span class="badge badge--new">{t($lang, 'card.new')}</span>
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
      <span>{property.rooms} {t($lang, 'card.rooms')}</span>
      <span class="sep" aria-hidden="true">·</span>
      <span>{property.baths} {t($lang, 'card.baths')}</span>
      <span class="sep" aria-hidden="true">·</span>
      <span>{property.area} m²</span>
    </div>

    <span class="card__cta">{t($lang, 'card.view')}</span>
  </div>
</a>

<style>
  .card {
    display: block;
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
