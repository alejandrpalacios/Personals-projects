<script>
  import { lang } from '$lib/stores/lang.js';
  import { t } from '$lib/i18n/translations.js';

  let name = '', email = '', phone = '', message = '';
  let sent = false;

  function handleSubmit(e) {
    e.preventDefault();
    sent = true;
  }
</script>

<svelte:head>
  <title>Contact | NidoHomes</title>
  <meta name="description" content="Get in touch with NidoHomes — we'll help you find your perfect property." />
</svelte:head>

<section class="section">
  <div class="container">
    <div class="contact-layout">
      <!-- Info -->
      <div class="contact-info">
        <h1 class="contact-title">{t($lang, 'contact.title')}</h1>
        <p class="contact-sub">{t($lang, 'contact.sub')}</p>

        <div class="info-items">
          <div class="info-item">
            <span class="info-icon" aria-hidden="true">📍</span>
            <div>
              <p class="info-label">Office</p>
              <p class="info-val">Calle Gran Vía 42, Madrid</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon" aria-hidden="true">📞</span>
            <div>
              <p class="info-label">Phone</p>
              <a href="tel:+34900000000" class="info-val info-link">+34 900 000 000</a>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon" aria-hidden="true">📧</span>
            <div>
              <p class="info-label">Email</p>
              <a href="mailto:hola@nidohomes.com" class="info-val info-link">hola@nidohomes.com</a>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon" aria-hidden="true">🕐</span>
            <div>
              <p class="info-label">Hours</p>
              <p class="info-val">Mon–Fri: 9:00 – 19:00</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="form-wrap">
        {#if sent}
          <div class="success" role="status">
            <span class="success-icon" aria-hidden="true">🏠</span>
            <h2>Message sent!</h2>
            <p>{t($lang, 'contact.sent')}</p>
            <a href="/propiedades" class="btn-back">Browse properties</a>
          </div>
        {:else}
          <form on:submit={handleSubmit} class="form" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="name" class="form-label">{t($lang, 'contact.name')}</label>
                <input id="name" type="text" bind:value={name} class="form-input" required />
              </div>
              <div class="form-group">
                <label for="email" class="form-label">{t($lang, 'contact.email')}</label>
                <input id="email" type="email" bind:value={email} class="form-input" required />
              </div>
            </div>

            <div class="form-group">
              <label for="phone" class="form-label">{t($lang, 'contact.phone')}</label>
              <input id="phone" type="tel" bind:value={phone} class="form-input" />
            </div>

            <div class="form-group">
              <label for="msg" class="form-label">{t($lang, 'contact.msg')}</label>
              <textarea id="msg" bind:value={message} class="form-input" rows="5" required></textarea>
            </div>

            <button type="submit" class="submit-btn">{t($lang, 'contact.send')}</button>
          </form>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .contact-layout {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 4rem;
    align-items: start;
  }

  .contact-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 2.8rem);
    letter-spacing: -0.03em;
    color: var(--color-text);
    margin-bottom: 0.75rem;
    line-height: 1.1;
  }

  .contact-sub {
    font-size: 1rem;
    color: var(--color-muted);
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  .info-items { display: flex; flex-direction: column; gap: 1.25rem; }

  .info-item { display: flex; gap: 1rem; align-items: flex-start; }

  .info-icon { font-size: 1.2rem; margin-top: 1px; }

  .info-label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-muted);
    margin-bottom: 0.15rem;
  }

  .info-val { font-size: 0.9rem; font-weight: 500; color: var(--color-text); }

  .info-link { transition: color var(--transition); }
  .info-link:hover { color: var(--color-accent); }

  /* Form */
  .form-wrap {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 14px;
    padding: 2.25rem;
    box-shadow: var(--shadow);
  }

  .form { display: flex; flex-direction: column; gap: 1.1rem; }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  .form-group { display: flex; flex-direction: column; gap: 0.35rem; }

  .form-label {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-muted);
  }

  .form-input {
    padding: 0.7rem 0.9rem;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-bg);
    color: var(--color-text);
    font-size: 0.92rem;
    font-family: inherit;
    outline: none;
    transition: border-color var(--transition);
    resize: vertical;
    width: 100%;
  }

  .form-input:focus { border-color: var(--color-accent); }

  .submit-btn {
    padding: 0.8rem 1.5rem;
    background: var(--color-accent);
    color: #fff;
    font-weight: 600;
    font-size: 0.95rem;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    font-family: inherit;
    transition: opacity var(--transition);
    width: 100%;
  }

  .submit-btn:hover { opacity: 0.88; }

  /* Success */
  .success {
    text-align: center;
    padding: 2.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .success-icon { font-size: 3rem; }

  .success h2 {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--color-text);
  }

  .success p { color: var(--color-muted); font-size: 0.9rem; }

  .btn-back {
    margin-top: 0.25rem;
    padding: 0.6rem 1.25rem;
    background: var(--color-accent);
    color: #fff;
    font-weight: 600;
    font-size: 0.875rem;
    border-radius: 6px;
    transition: opacity var(--transition);
  }

  .btn-back:hover { opacity: 0.88; }

  @media (max-width: 800px) {
    .contact-layout { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
  }
</style>
