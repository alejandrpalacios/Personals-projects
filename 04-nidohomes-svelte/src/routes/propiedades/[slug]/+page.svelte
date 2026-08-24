<script>
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { getPropertyBySlug, formatPrice } from '$lib/data/properties.js';
  import { savedProperties } from '$lib/stores/saved.js';
  import PropertyMap from '$lib/components/PropertyMap.svelte';

  $: property = getPropertyBySlug($page.params.slug);
  $: saved = property ? $savedProperties.includes(property.id) : false;

  let sent = false;
  let name = '', email = '', message = '';
  let errors = {};

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = 'This field is required.';
    if (!email.trim()) errs.email = 'This field is required.';
    else if (!emailRe.test(email)) errs.email = 'Enter a valid email address.';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    errors = validate();
    if (Object.keys(errors).length === 0) sent = true;
  }
</script>

<svelte:head>
  <title>{property ? property.title + ' | NidoHomes' : 'Property | NidoHomes'}</title>
</svelte:head>

<section class="section">
  <div class="container">
    {#if property}
      <div class="detail-topbar">
        <a href="{base}/propiedades" class="back-link">← Back to properties</a>
        <button
          class="save-btn"
          class:save-btn--active={saved}
          aria-pressed={saved}
          on:click={() => savedProperties.toggle(property.id)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {saved ? 'Saved' : 'Save property'}
        </button>
      </div>

      <div class="detail-layout">
        <!-- Left: Image + Info -->
        <div class="detail-main">
          <div class="detail-img-wrap">
            <img src={property.image} alt={property.title} width="700" height="460" />
            {#if property.isNew}
              <span class="badge-new">New</span>
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
                <span class="stat-lbl">rooms</span>
              </div>
              <div class="detail-stat">
                <span class="stat-val">{property.baths}</span>
                <span class="stat-lbl">baths</span>
              </div>
              <div class="detail-stat">
                <span class="stat-val">{property.area}</span>
                <span class="stat-lbl">m²</span>
              </div>
            </div>

            <div class="detail-section">
              <h2 class="detail-section-title">Description</h2>
              <p class="detail-desc">{property.description}</p>
            </div>

            <div class="detail-section">
              <h2 class="detail-section-title">Features</h2>
              <ul class="features-list">
                {#each property.features as feat}
                  <li class="feature-item">
                    <span aria-hidden="true">✓</span>
                    {feat}
                  </li>
                {/each}
              </ul>
            </div>

            <div class="detail-section">
              <h2 class="detail-section-title">Location</h2>
              {#if property.lat && property.lon}
                <PropertyMap lat={property.lat} lon={property.lon} />
              {:else}
                <p class="detail-desc">{property.location}</p>
              {/if}
            </div>
          </div>
        </div>

        <!-- Right: Contact form -->
        <aside class="detail-aside">
          <div class="contact-card">
            <h2 class="contact-card-title">Interested in this property?</h2>
            <p class="contact-card-sub">Request a visit</p>

            {#if sent}
              <div class="success-msg" role="status">
                <span class="success-msg__icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <p>Message sent! We'll get back to you within 24 hours.</p>
              </div>
            {:else}
              <form on:submit={handleSubmit} class="contact-form" novalidate>
                <div class="form-group">
                  <label for="name" class="form-label">Full name</label>
                  <input
                    id="name" type="text" bind:value={name}
                    class="form-input" class:form-input--error={errors.name}
                    aria-invalid={!!errors.name}
                  />
                  {#if errors.name}<span class="field-error">{errors.name}</span>{/if}
                </div>
                <div class="form-group">
                  <label for="email" class="form-label">Email address</label>
                  <input
                    id="email" type="email" bind:value={email}
                    class="form-input" class:form-input--error={errors.email}
                    aria-invalid={!!errors.email}
                  />
                  {#if errors.email}<span class="field-error">{errors.email}</span>{/if}
                </div>
                <div class="form-group">
                  <label for="msg" class="form-label">Tell us what you're looking for</label>
                  <textarea id="msg" bind:value={message} class="form-input" rows="4"></textarea>
                </div>
                <button type="submit" class="submit-btn">Request a visit</button>
              </form>
            {/if}
          </div>
        </aside>
      </div>

    {:else}
      <div class="not-found">
        <h1>Property not found</h1>
        <a href="{base}/propiedades" class="back-link">← Back to properties</a>
      </div>
    {/if}
  </div>
</section>

<style>
  .detail-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  .back-link {
    display: inline-block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-muted);
    transition: color var(--transition);
  }

  .save-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.9rem;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: border-color var(--transition), color var(--transition);
  }

  .save-btn:hover { border-color: #e11d48; }
  .save-btn--active { color: #e11d48; border-color: #e11d48; }

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
  .form-input--error { border-color: #dc2626; }

  .field-error {
    font-size: 0.76rem;
    color: #dc2626;
  }

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

  .success-msg__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--color-accent);
  }

  .not-found { text-align: center; padding: 4rem 0; }

  @media (max-width: 900px) {
    .detail-layout { grid-template-columns: 1fr; }
    .detail-aside { position: static; }
    .features-list { grid-template-columns: 1fr; }
  }
</style>
