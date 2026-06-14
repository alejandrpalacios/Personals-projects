<script>
  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__left">
      <p class="footer__logo">AlexDev</p>
      <p class="footer__copy">&copy; {year} — Hecho con SvelteKit</p>
    </div>

    <nav class="footer__nav" aria-label="Footer nav">
      <a href="/proyectos">Proyectos</a>
      <a href="/sobre-mi">Sobre mí</a>
      <a href="/contacto">Contacto</a>
    </nav>

    <!-- Redes — reemplazar hrefs -->
    <div class="footer__social">
      <a href="#" aria-label="LinkedIn" class="footer__social-link">LinkedIn</a>
      <a href="#" aria-label="GitHub"   class="footer__social-link">GitHub</a>
    </div>
  </div>
</footer>

<style>
  .footer {
    border-top: 1px solid var(--color-border);
    margin-top: 4rem;
  }

  .footer__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 1.5rem;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .footer__logo {
    font-family: var(--font-display);
    font-weight: 700;
    margin-bottom: 0.2rem;
  }

  .footer__copy {
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
  }

  .footer__nav a:hover { color: var(--color-text); }

  .footer__social {
    display: flex;
    gap: 1rem;
  }

  .footer__social-link {
    font-size: 0.82rem;
    color: var(--color-muted);
    transition: color var(--transition);
  }

  .footer__social-link:hover { color: var(--color-accent); }

  @media (max-width: 600px) {
    .footer__inner { flex-direction: column; align-items: flex-start; }
  }
</style>
