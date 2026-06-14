<script>
  import { PROJECTS } from '$lib/data/projects.js';
</script>

<svelte:head>
  <title>Proyectos | AlexDev</title>
  <meta name="description" content="Todos los proyectos de Alejandro — landing pages, tiendas, dashboards y portfolios." />
</svelte:head>

<section class="section">
  <div class="container">
    <header class="page-header">
      <h1 class="page-title">Proyectos</h1>
      <p class="page-subtitle">
        Trabajo seleccionado de los últimos años. Cada proyecto usa un stack diferente
        adaptado a las necesidades del cliente.
      </p>
    </header>

    <div class="projects-list">
      {#each PROJECTS as project (project.id)}
        <a href="/proyectos/{project.slug}" class="project-row">
          <div class="project-row__cover" style="background: {project.coverColor}">
            <span aria-hidden="true">
              {project.category === 'Landing Page' ? '🚀' :
               project.category === 'E-commerce'  ? '🛍️' :
               project.category === 'Dashboard'   ? '📊' : '✨'}
            </span>
          </div>
          <div class="project-row__content">
            <div class="project-row__top">
              <span class="category-label">{project.category}</span>
              <span class="year-label">{project.year}</span>
            </div>
            <h2 class="project-row__title">{project.title}</h2>
            <p class="project-row__desc">{project.description}</p>
            <div class="tags">
              {#each project.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          </div>
          <div class="project-row__links">
            {#if project.liveUrl !== '#'}
              <span class="link-chip">Demo ↗</span>
            {/if}
            {#if project.repoUrl !== '#'}
              <span class="link-chip">Repo ↗</span>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .page-header {
    margin-bottom: 3rem;
    max-width: 600px;
  }

  .page-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 4rem);
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
  }

  .page-subtitle {
    font-size: 1.05rem;
    color: var(--color-muted);
    line-height: 1.7;
  }

  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .project-row {
    display: grid;
    grid-template-columns: 120px 1fr auto;
    gap: 1.5rem;
    align-items: center;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--color-border);
    transition: background var(--transition);
    border-radius: var(--radius);
  }

  .project-row:hover {
    padding-inline: 1rem;
    background: var(--color-surface);
  }

  .project-row__cover {
    width: 120px;
    height: 80px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    flex-shrink: 0;
    border: 1px solid var(--color-border);
  }

  .project-row__top {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.35rem;
  }

  .category-label {
    font-size: 0.75rem;
    color: var(--color-accent);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .year-label {
    font-size: 0.75rem;
    color: var(--color-muted);
  }

  .project-row__title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.35rem;
  }

  .project-row__desc {
    font-size: 0.85rem;
    color: var(--color-muted);
    line-height: 1.5;
    margin-bottom: 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .tag {
    padding: 0.15rem 0.55rem;
    background: rgba(249, 115, 22, 0.1);
    color: var(--color-accent-2);
    border-radius: 4px;
    font-size: 0.72rem;
  }

  .project-row__links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .link-chip {
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    font-size: 0.78rem;
    color: var(--color-muted);
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    .project-row {
      grid-template-columns: 1fr;
    }

    .project-row__cover { width: 100%; height: 120px; }
    .project-row__links { flex-direction: row; }
  }
</style>
