// Proyectos del portfolio — reemplazar con los reales

export const PROJECTS = [
  {
    id: 1,
    slug: 'taskflow-landing',
    title: 'TaskFlow — Landing SaaS',
    category: 'Landing Page',
    description:
      'Landing page de alto impacto para una plataforma SaaS de gestión de proyectos. Diseño oscuro, animaciones CSS y enfoque en conversión.',
    tags: ['Astro', 'CSS', 'Performance'],
    liveUrl: '#',    // reemplazar con URL real
    repoUrl: '#',    // reemplazar con GitHub
    coverColor: '#1a1a2e',
    year: '2025',
    featured: true,
  },
  {
    id: 2,
    slug: 'lumiere-store',
    title: 'Lumière — Tienda de Moda',
    category: 'E-commerce',
    description:
      'Tienda online minimalista para boutique de moda con Next.js 14. App Router, SSG, carrito de compra y páginas de producto dinámicas.',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    liveUrl: '#',
    repoUrl: '#',
    coverColor: '#1c1208',
    year: '2025',
    featured: true,
  },
  {
    id: 3,
    slug: 'adminpro-dashboard',
    title: 'AdminPro — Dashboard',
    category: 'Dashboard',
    description:
      'Panel de administración completo con Vue 3 Composition API. Tablas, KPIs, filtros y routing con lazy loading por vista.',
    tags: ['Vue 3', 'Vue Router', 'Vite'],
    liveUrl: '#',
    repoUrl: '#',
    coverColor: '#0a1628',
    year: '2025',
    featured: true,
  },
  {
    id: 4,
    slug: 'portfolio-svelte',
    title: 'Este Portfolio',
    category: 'Portfolio',
    description:
      'Portfolio personal construido con SvelteKit. Transiciones nativas, CSS scoped por componente y build estático optimizado.',
    tags: ['SvelteKit', 'Svelte', 'CSS'],
    liveUrl: '#',
    repoUrl: '#',
    coverColor: '#1a0a00',
    year: '2025',
    featured: false,
  },
];

export const SKILLS = [
  { category: 'Frontend',    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript'] },
  { category: 'Frameworks', items: ['React / Next.js', 'Vue 3', 'Astro', 'SvelteKit'] },
  { category: 'Herramientas', items: ['Vite', 'Git', 'Figma', 'Tailwind CSS'] },
  { category: 'Backend / APIs', items: ['Node.js', 'REST APIs', 'Supabase', 'Firebase'] },
];
