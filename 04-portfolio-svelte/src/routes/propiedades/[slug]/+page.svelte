<script>
  import { page } from '$app/stores';
  import { lang } from '$lib/stores/lang.js';
  import { t } from '$lib/i18n/translations.js';
  import { getPropertyBySlug, formatPrice } from '$lib/data/properties.js';

  $: property = getPropertyBySlug($page.params.slug);

  let sent = false;
  let name = '', email = '', message = '';

  function handleSubmit(e) {
    e.preventDefault();
    sent = true;
  }
</script>

<svelte:head>
  <title>{property ? property.title + ' | NidoHomes' : 'Property | NidoHomes'}</title>
</svelte:head>

<section class="section">
  <div class="container">
    {#if property}
      <a href="/propiedades" class="back-link">{t($lang, 'detail.back')}</a>

      <div class="detail-layout">
        <!-- Left: Image + Info -->
        <div class="detail-main">
          <div class="detail-img-wrap">
            <img src={property.image} alt={property.title} width="700" height="460" />
            {#if property.isNew}
              <span class="badge-new">{t($lang, 'card.new')}</span>
            {/if}
          </div>

          <div class="detail-info">
            <div class="detail-top">
              <span class="detail-type">{property.type}</span>
              <span class="detail-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {property.location}
              </span>
            </div>

            <h1 class="detail-title">{property.title}</h1>
            <p class="detail-price">{formatPrice(property.price)}</p>

            <div class="detail-stats">
              <div class="detail-stat">
                <span class="stat-val">{property.rooms}</span>
                <span class="stat-lbl">{t($lang, 'card.rooms')}</span>
              </div>
              <div class="detail-stat">
                <span class="stat-val">{property.baths}</span>
                <span class="stat-lbl">{t($lang, 'card.baths')}</span>
              </div>
              <div class="detail-stat">
                <span class="stat-val">{property.area}</span>
                <span class="stat-lbl">m²</span>
              </div>
            </div>

            <div class="detail-section">
              <h2 class="detail-section-title">{t($lang, 'detail.desc')}</h2>
              <p class="detail-desc">{property.description}</p>
            </div>

            <div class="detail-section">
              <h2 class="detail-section-title">{t($lang, 'detail.features')}</h2>
              <ul class="features-list">
                {#each property.features as feat}
                  <li class="feature-item">
                    <span aria-hidden="true">✓</span>
                    {feat}
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>

        <!-- Right: Contact form -->
        <aside class="detail-aside">
          <div class="contact-card">
            <h2 class="contact-card-title">{t($lang, 'detail.contact')}</h2>
            <p class="contact-card-sub">{t($lang, 'detail.visit')}</p>

            {#if sent}
              <div class="success-msg" role="status">
                <span aria-hidden="true">✅</span>
                <p>{t($lang, 'contact.sent')}</p>
              </div>
            {:else}
              <form on:submit={handleSubmit} class="contact-form" novalidate>
                <div class="form-group">
                  <label for="name" class="form-label">{t($lang, 'contact.name')}</label>
                  <input id="name" type="text" bind:value={name} class="form-input" required />
                </div>
                <div class="form-group">
                  <label for="email" class="form-label">{t($lang, 'contact.email')}</label>
                  <input id="email" type="email" bind:value={email} class="form-input" required />
                </div>
                <div class="form-group">
                  <label for="msg" class="form-label">{t($lang, 'contact.msg')}</label>
                  <textarea id="msg" bind:value={message} class="form-input" rows="4"></textarea>
                </div>
                <button type="submit" class="submit-btn">{t($lang, 'detail.visit')}</button>
              </form>
            {/if}
          </div>
        </aside>
      </div>

    {:else}
      <div class="not-found">
        <h1>Property not found</h1>
        <a href="/propiedades" class="back-link">{t($lang, 'detail.back')}</a>
      </div>
    {/if}
  </div>
</section>

<style>
  .back-link {
    display: inline-block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-muted);
    margin-bottom: 1.5rem;
    transition: color var(--transition);
  }

  .back-link:hover { color: var(--color-accent); }

  .detail-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 2.5rem;
    align-items: start;
  }

  .detail-img-wrap {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-md);
  }

  .detail-img-wrap img {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
    object-fit: cover;
  }

  .badge-new {
    position: absolute;
    top: 16px; left: 16px;
    background: var(--color-accent);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.25rem 0.65rem;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .detail-top {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .detail-type {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .detail-location {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.85rem;
    color: var(--color-muted);
  }

  .detail-title {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2rem);
    letter-spacing: -0.02em;
    color: var(--color-text);
    margin-bottom: 0.5rem;
  }

  .detail-price {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-gold);
    letter-spacing: -0.02em;
    margin-bottom: 1.25rem;
  }

  .detail-stats {
    display: flex;
    gap: 1.5rem;
    padding: 1rem 0;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 1.5rem;
  }

  .detail-stat { text-align: center; }

  .stat-val {
    display: block;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .stat-lbl {
    font-size: 0.78rem;
    color: var(--color-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .detail-section { margin-bottom: 1.5rem; }

  .detail-section-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 0.6rem;
    letter-spacing: -0.01em;
  }

  .detail-desc {
    font-size: 0.95rem;
    color: var(--color-muted);
    line-height: 1.75;
  }

  .features-list {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text);
  }

  .feature-item span { color: var(--color-accent); font-weight: 700; }

  /* Aside */
  .detail-aside { position: sticky; top: calc(var(--nav-h) + 1.5rem); }

  .contact-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 1.75rem;
    box-shadow: var(--shadow-md);
  }

  .contact-card-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: var(--color-text);
    margin-bottom: 0.25rem;
  }

  .contact-card-sub {
    font-size: 0.82rem;
    color: var(--color-muted);
    margin-bottom: 1.25rem;
  }

  .contact-form { display: flex; flex-direction: column; gap: 0.9rem; }

  .form-group { display: flex; flex-direction: column; gap: 0.3rem; }

  .form-label {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-muted);
  }

  .form-input {
    padding: 0.65rem 0.8rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-bg);
    color: var(--color-text);
    font-size: 0.9rem;
    font-family: inherit;
    outline: none;
    transition: border-color var(--transition);
    resize: vertical;
    width: 100%;
  }

  .form-input:focus { border-color: var(--color-accent); }

  .submit-btn {
    padding: 0.75rem;
    background: var(--color-accent);
    color: #fff;
    font-weight: 600;
    font-size: 0.9rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-family: inherit;
    transition: opacity var(--transition);
    width: 100%;
  }

  .submit-btn:hover { opacity: 0.88; }

  .success-msg {
    text-align: center;
    padding: 1.5rem;
    color: var(--color-muted);
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }

  .success-msg span { font-size: 2rem; }

  .not-found { text-align: center; padding: 4rem 0; }

  @media (max-width: 900px) {
    .detail-layout { grid-template-columns: 1fr; }
    .detail-aside { position: static; }
    .features-list { grid-template-columns: 1fr; }
  }
</style>
