<script>
  import { PROJECTS, SKILLS } from '$lib/data/projects.js';

  const featured = PROJECTS.filter(p => p.featured);
</script>

<svelte:head>
  <title>AlexDev — Desarrollador Frontend</title>
  <meta name="description" content="Desarrollador frontend especializado en React, Next.js, Vue y SvelteKit. Construyo interfaces rápidas, accesibles y escalables." />
</svelte:head>

<!-- ——— HERO ——— -->
<section class="hero section">
  <div class="container">
    <p class="hero__eyebrow">
      <span class="dot" aria-hidden="true"></span>
      Disponible para proyectos freelance
    </p>

    <h1 class="hero__title">
      Construyo<br />
      <em class="hero__title--accent">interfaces</em> que<br />
      <em class="hero__title--accent">funcionan</em>.
    </h1>

    <p class="hero__bio">
      Hola, soy <strong>Alejandro</strong> — desarrollador frontend con foco en
      Next.js, Vue y SvelteKit. Creo páginas rápidas, accesibles y listas para escalar.
      {/* Reemplazar con tu descripción real */}
    </p>

    <div class="hero__cta">
      <a href="/proyectos" class="btn">Ver proyectos</a>
      <a href="/contacto" class="btn btn--outline">Hablemos →</a>
    </div>

    <!-- Stack tecnológico condensado -->
    <div class="tech-stack" aria-label="Tecnologías">
      {#each ['Astro', 'Next.js', 'Vue 3', 'SvelteKit', 'TypeScript', 'Tailwind'] as tech}
        <span class="tech-tag">{tech}</span>
      {/each}
    </div>
  </div>
</section>

<!-- ——— PROYECTOS DESTACADOS ——— -->
<section class="section" id="proyectos">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Proyectos destacados</h2>
      <a href="/proyectos" class="section-link">Ver todos →</a>
    </div>

    <div class="projects-grid">
      {#each featured as project (project.id)}
        <a href="/proyectos/{project.slug}" class="project-card" style="--card-color: {project.coverColor}">
          <!-- Cover del proyecto — reemplazar con screenshot real -->
          <div class="project-card__cover">
            <span class="project-card__emoji" aria-hidden="true">
              {project.category === 'Landing Page' ? '🚀' :
               project.category === 'E-commerce'  ? '🛍️' :
               project.category === 'Dashboard'   ? '📊' : '✨'}
            </span>
          </div>
          <div class="project-card__body">
            <div class="project-card__meta">
              <span class="project-category">{project.category}</span>
              <span class="project-year">{project.year}</span>
            </div>
            <h3 class="project-card__title">{project.title}</h3>
            <p class="project-card__desc">{project.description}</p>
            <div class="project-tags">
              {#each project.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- ——— SKILLS ——— -->
<section class="section skills-section" id="skills">
  <div class="container">
    <h2 class="section-title" style="margin-bottom: 2.5rem">Stack técnico</h2>
    <div class="skills-grid">
      {#each SKILLS as group}
        <div class="skill-group">
          <h3 class="skill-group__title">{group.category}</h3>
          <ul class="skill-group__list">
            {#each group.items as skill}
              <li class="skill-item">{skill}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ——— CTA FINAL ——— -->
<section class="cta-banner section">
  <div class="container">
    <div class="cta-inner">
      <h2 class="cta-title">¿Tienes un proyecto en mente?</h2>
      <p class="cta-sub">Cuéntame de qué se trata — respondo en menos de 24 horas.</p>
      <a href="/contacto" class="btn">Escribirme →</a>
    </div>
  </div>
</section>

<style>
  /* ——— HERO ——— */
  .hero {
    min-height: calc(100vh - var(--nav-h));
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  /* Fondo decorativo */
  .hero::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero__eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: var(--color-muted);
    margin-bottom: 1.5rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e; /* verde = disponible */
    box-shadow: 0 0 6px #22c55e;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .hero__title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 6rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
  }

  .hero__title--accent {
    font-style: normal;
    -webkit-text-stroke: 1px var(--color-accent);
    color: transparent;
  }

  .hero__bio {
    font-size: 1.1rem;
    color: var(--color-muted);
    max-width: 46ch;
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  .hero__bio strong { color: var(--color-text); }

  .hero__cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2.5rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: var(--color-accent);
    color: #fff;
    font-weight: 600;
    font-size: 0.95rem;
    border-radius: var(--radius);
    transition: opacity var(--transition), transform var(--transition);
  }

  .btn:hover { opacity: 0.9; transform: translateY(-1px); }

  .btn--outline {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text);
  }

  .btn--outline:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-tag {
    padding: 0.3rem 0.8rem;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    font-size: 0.78rem;
    color: var(--color-muted);
  }

  /* ——— SECCIÓN PROJECTS ——— */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2rem;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2rem);
    letter-spacing: -0.02em;
  }

  .section-link {
    font-size: 0.9rem;
    color: var(--color-accent);
    transition: opacity var(--transition);
  }

  .section-link:hover { opacity: 0.75; }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.25rem;
  }

  .project-card {
    display: block;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: border-color var(--transition), transform var(--transition);
  }

  .project-card:hover {
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }

  .project-card__cover {
    height: 180px;
    background: var(--card-color, var(--color-surface));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }

  .project-card__body {
    padding: 1.25rem;
    background: var(--color-surface);
  }

  .project-card__meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .project-category {
    font-size: 0.75rem;
    color: var(--color-accent);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .project-year {
    font-size: 0.75rem;
    color: var(--color-muted);
  }

  .project-card__title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
  }

  .project-card__desc {
    font-size: 0.85rem;
    color: var(--color-muted);
    line-height: 1.6;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .tag {
    padding: 0.2rem 0.6rem;
    background: rgba(249, 115, 22, 0.1);
    color: var(--color-accent-2);
    border-radius: 4px;
    font-size: 0.72rem;
    font-weight: 500;
  }

  /* ——— SKILLS ——— */
  .skills-section {
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .skill-group__title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-muted);
    margin-bottom: 1rem;
  }

  .skill-group__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .skill-item {
    font-size: 0.92rem;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .skill-item::before {
    content: '—';
    color: var(--color-accent);
    font-weight: 700;
  }

  /* ——— CTA FINAL ——— */
  .cta-inner {
    text-align: center;
    max-width: 600px;
    margin-inline: auto;
  }

  .cta-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    letter-spacing: -0.02em;
    margin-bottom: 0.75rem;
  }

  .cta-sub {
    color: var(--color-muted);
    margin-bottom: 1.5rem;
    font-size: 1.05rem;
  }
</style>
