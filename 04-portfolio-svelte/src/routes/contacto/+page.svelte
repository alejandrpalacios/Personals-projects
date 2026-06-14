<script>
  let name = '';
  let email = '';
  let budget = '';
  let message = '';
  let sent = false;

  // Conectar con Formspree, Resend, EmailJS, etc.
  // El action del form debería apuntar al endpoint real
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: enviar datos a la API de tu preferencia
    // Ejemplo con Formspree: fetch('https://formspree.io/f/TU_ID', { method: 'POST', ... })
    sent = true;
  }
</script>

<svelte:head>
  <title>Contacto | AlexDev</title>
  <meta name="description" content="Hablemos de tu proyecto. Respondo en menos de 24 horas." />
</svelte:head>

<section class="section">
  <div class="container contact-layout">

    <!-- Columna izquierda — info -->
    <div class="contact-info">
      <h1 class="contact-title">Hablemos de<br /><em>tu proyecto</em></h1>
      <p class="contact-subtitle">
        ¿Tienes una idea, un sitio por construir o algo que mejorar?
        Cuéntame — respondo en menos de 24 horas.
      </p>

      <div class="contact-details">
        <div class="contact-item">
          <span class="contact-icon" aria-hidden="true">📧</span>
          <div>
            <p class="contact-label">Email</p>
            <!-- Reemplazar con email real -->
            <a href="mailto:hola@alexdev.com" class="contact-value">hola@alexdev.com</a>
          </div>
        </div>

        <div class="contact-item">
          <span class="contact-icon" aria-hidden="true">⏱️</span>
          <div>
            <p class="contact-label">Tiempo de respuesta</p>
            <p class="contact-value">Menos de 24 horas</p>
          </div>
        </div>

        <div class="contact-item">
          <span class="contact-icon" aria-hidden="true">🌍</span>
          <div>
            <p class="contact-label">Zona horaria</p>
            <!-- Reemplazar con la tuya -->
            <p class="contact-value">GMT-5 (Colombia)</p>
          </div>
        </div>
      </div>

      <!-- Redes sociales — reemplazar hrefs -->
      <div class="social-links" aria-label="Redes sociales">
        <a href="#" class="social-btn" aria-label="LinkedIn">LinkedIn</a>
        <a href="#" class="social-btn" aria-label="GitHub">GitHub</a>
        <a href="#" class="social-btn" aria-label="Twitter">Twitter / X</a>
      </div>
    </div>

    <!-- Columna derecha — formulario -->
    <div class="contact-form-wrap">
      {#if sent}
        <div class="success-msg" role="status">
          <span class="success-icon" aria-hidden="true">✅</span>
          <h2>¡Mensaje enviado!</h2>
          <p>Te responderé pronto. Mientras tanto, echa un vistazo a mis proyectos.</p>
          <a href="/proyectos" class="btn">Ver proyectos</a>
        </div>
      {:else}
        <form class="contact-form" on:submit={handleSubmit} novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="name" class="form-label">Tu nombre *</label>
              <input
                id="name"
                type="text"
                bind:value={name}
                class="form-input"
                placeholder="María García"
                required
              />
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Tu email *</label>
              <input
                id="email"
                type="email"
                bind:value={email}
                class="form-input"
                placeholder="maria@empresa.com"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="budget" class="form-label">Presupuesto aproximado</label>
            <select id="budget" bind:value={budget} class="form-input">
              <option value="">Seleccionar rango</option>
              <option value="500-1500">$500 – $1,500</option>
              <option value="1500-3000">$1,500 – $3,000</option>
              <option value="3000+">$3,000+</option>
              <option value="open">Hablemos primero</option>
            </select>
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Cuéntame de tu proyecto *</label>
            <textarea
              id="message"
              bind:value={message}
              class="form-input"
              rows="5"
              placeholder="¿Qué tipo de sitio necesitas? ¿Cuándo lo necesitas? ¿Tienes referentes de diseño?"
              required
            ></textarea>
          </div>

          <button type="submit" class="btn submit-btn">
            Enviar mensaje →
          </button>
        </form>
      {/if}
    </div>
  </div>
</section>

<style>
  .contact-layout {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 4rem;
    align-items: start;
  }

  /* ——— COLUMNA INFO ——— */
  .contact-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 1rem;
  }

  .contact-title em {
    font-style: normal;
    color: var(--color-accent);
  }

  .contact-subtitle {
    color: var(--color-muted);
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  .contact-details {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  .contact-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .contact-icon { font-size: 1.2rem; }

  .contact-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-muted);
    margin-bottom: 0.2rem;
  }

  .contact-value {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--color-text);
  }

  a.contact-value { transition: color var(--transition); }
  a.contact-value:hover { color: var(--color-accent); }

  .social-links {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .social-btn {
    padding: 0.4rem 0.9rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    font-size: 0.82rem;
    color: var(--color-muted);
    transition: border-color var(--transition), color var(--transition);
  }

  .social-btn:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  /* ——— FORMULARIO ——— */
  .contact-form-wrap {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 14px;
    padding: 2rem;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-label {
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--color-muted);
  }

  .form-input {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 0.7rem 0.9rem;
    color: var(--color-text);
    font-size: 0.92rem;
    font-family: inherit;
    outline: none;
    transition: border-color var(--transition);
    resize: vertical;
    width: 100%;
  }

  .form-input:focus { border-color: var(--color-accent); }
  .form-input::placeholder { color: var(--color-muted); }

  .btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: var(--color-accent);
    color: #fff;
    font-weight: 600;
    font-size: 0.95rem;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    transition: opacity var(--transition);
    font-family: inherit;
    text-decoration: none;
  }

  .btn:hover { opacity: 0.85; }

  .submit-btn { width: 100%; justify-content: center; }

  /* ——— ÉXITO ——— */
  .success-msg {
    text-align: center;
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .success-icon { font-size: 3rem; }

  .success-msg h2 {
    font-family: var(--font-display);
    font-size: 1.5rem;
  }

  .success-msg p { color: var(--color-muted); }

  /* Responsive */
  @media (max-width: 800px) {
    .contact-layout { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
  }
</style>
