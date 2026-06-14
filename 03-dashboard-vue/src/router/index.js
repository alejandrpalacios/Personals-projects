import { createRouter, createWebHistory } from 'vue-router';

// Lazy loading — cada vista se carga solo cuando se navega a ella
const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { title: 'Resumen', icon: '📊' },
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: () => import('@/views/Pedidos.vue'),
    meta: { title: 'Pedidos', icon: '📦' },
  },
  {
    path: '/productos',
    name: 'Productos',
    component: () => import('@/views/Productos.vue'),
    meta: { title: 'Productos', icon: '🏷️' },
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: () => import('@/views/Clientes.vue'),
    meta: { title: 'Clientes', icon: '👥' },
  },
  {
    path: '/configuracion',
    name: 'Configuracion',
    component: () => import('@/views/Configuracion.vue'),
    meta: { title: 'Configuración', icon: '⚙️' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll al top al cambiar de ruta
  scrollBehavior: () => ({ top: 0 }),
});

// Actualiza el título del documento con cada navegación
router.afterEach(to => {
  document.title = to.meta.title ? `${to.meta.title} | AdminPro` : 'AdminPro';
});

export default router;
