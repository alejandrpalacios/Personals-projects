<script>
  import { lang } from '$lib/stores/lang.js';
  import { t } from '$lib/i18n/translations.js';
  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <p class="footer__logo">🏠 NidoHomes</p>
      <p class="footer__tagline">{t($lang, 'footer.tagline')}</p>
    </div>

    <nav class="footer__nav" aria-label="Footer navigation">
      <a href="/">{t($lang, 'nav.home')}</a>
      <a href="/propiedades">{t($lang, 'nav.properties')}</a>
      <a href="/contacto">{t($lang, 'nav.contact')}</a>
    </nav>

    <p class="footer__rights">{t($lang, 'footer.rights')}</p>
  </div>
</footer>

<style>
  .footer {
    border-top: 1px solid var(--color-border);
    background: var(--color-surface);
    margin-top: 4rem;
  }

  .footer__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 1.75rem;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .footer__logo {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 0.25rem;
    color: var(--color-text);
  }

  .footer__tagline {
    font-size: 0.8rem;
    color: var(--color-muted);
  }

  .footer__nav {
    display: flex;
    gap: 1.5rem;
  }

  .footer__nav a {
    font-size: 0.85rem;
    color: var(--color-muted);
    transition: color var(--transition);
    font-weight: 500;
  }

  .footer__nav a:hover { color: var(--color-accent); }

  .footer__rights {
    font-size: 0.78rem;
    color: var(--color-muted);
  }

  @media (max-width: 600px) {
    .footer__inner { flex-direction: column; align-items: flex-start; gap: 1rem; }
  }
</style>
