<template>
  <header class="topbar">
    <h1 class="topbar__title">{{ currentTitle }}</h1>

    <div class="topbar__actions">
      <div class="topbar__search-wrap" ref="searchWrapRef">
        <div class="topbar__search">
          <Icon name="search" :size="14" />
          <input
            type="search"
            v-model="query"
            placeholder="Search orders, products, customers..."
            class="topbar__search-input"
            @focus="searchOpen = true"
          />
        </div>

        <div v-if="searchOpen && query.trim()" class="search-panel">
          <div v-if="results.orders.length" class="search-group">
            <p class="search-group__label">Orders</p>
            <RouterLink
              v-for="o in results.orders" :key="o.id"
              to="/pedidos" class="search-result" @click="closeSearch"
            >
              <span class="search-result__title">#{{ o.id }} — {{ o.customer }}</span>
              <span class="search-result__meta">${{ o.total }}</span>
            </RouterLink>
          </div>
          <div v-if="results.products.length" class="search-group">
            <p class="search-group__label">Products</p>
            <RouterLink
              v-for="p in results.products" :key="p.id"
              to="/productos" class="search-result" @click="closeSearch"
            >
              <span class="search-result__title">{{ p.name }}</span>
              <span class="search-result__meta">${{ p.price }}</span>
            </RouterLink>
          </div>
          <div v-if="results.clients.length" class="search-group">
            <p class="search-group__label">Customers</p>
            <RouterLink
              v-for="c in results.clients" :key="c.id"
              to="/clientes" class="search-result" @click="closeSearch"
            >
              <span class="search-result__title">{{ c.name }}</span>
              <span class="search-result__meta">{{ c.email }}</span>
            </RouterLink>
          </div>
          <p v-if="!results.orders.length && !results.products.length && !results.clients.length" class="search-empty">
            No results for &ldquo;{{ query }}&rdquo;.
          </p>
        </div>
      </div>

      <div class="topbar__notif-wrap" ref="notifWrapRef">
        <button class="topbar__icon-btn" aria-label="Notifications" @click="notifOpen = !notifOpen">
          <Icon name="bell" :size="17" />
          <span v-if="unreadCount > 0" class="topbar__notif-badge">{{ unreadCount }}</span>
        </button>

        <div v-if="notifOpen" class="notif-panel">
          <div class="notif-panel__header">
            <span>Notifications</span>
            <button v-if="unreadCount > 0" class="notif-panel__mark-all" @click="markAllRead">Mark all read</button>
          </div>
          <div v-if="NOTIFICATIONS.length === 0" class="search-empty">You're all caught up.</div>
          <button
            v-for="n in NOTIFICATIONS" :key="n.id"
            class="notif-item"
            :class="{ 'notif-item--unread': !n.read }"
            @click="n.read = true"
          >
            <span class="notif-item__dot" aria-hidden="true"></span>
            <span class="notif-item__body">
              <span class="notif-item__title">{{ n.title }}</span>
              <span class="notif-item__desc">{{ n.desc }}</span>
              <span class="notif-item__time">{{ n.time }}</span>
            </span>
          </button>
        </div>
      </div>

      <button class="topbar__profile" aria-label="User profile">
        <div class="topbar__avatar">AD</div>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Icon from './Icon.vue';
import { ORDERS, PRODUCTS, CLIENTS, NOTIFICATIONS } from '@/data/mock.js';

const route = useRoute();

// Mapea la ruta al título de la página
const navTitles = {
  Dashboard:     'Overview',
  Pedidos:       'Orders',
  Productos:     'Products',
  Clientes:      'Customers',
  Configuracion: 'Settings',
};

const currentTitle = computed(() => navTitles[route.name] ?? 'Overview');

// ——— Búsqueda global ———
const query = ref('');
const searchOpen = ref(false);
const searchWrapRef = ref(null);

const results = computed(() => {
  const term = query.value.trim().toLowerCase();
  if (!term) return { orders: [], products: [], clients: [] };
  return {
    orders: ORDERS.filter(o => o.id.includes(term) || o.customer.toLowerCase().includes(term)).slice(0, 4),
    products: PRODUCTS.filter(p => p.name.toLowerCase().includes(term)).slice(0, 4),
    clients: CLIENTS.filter(c => c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term)).slice(0, 4),
  };
});

function closeSearch() {
  searchOpen.value = false;
  query.value = '';
}

// ——— Notificaciones ———
const notifOpen = ref(false);
const notifWrapRef = ref(null);
const unreadCount = computed(() => NOTIFICATIONS.filter(n => !n.read).length);

function markAllRead() {
  NOTIFICATIONS.forEach(n => (n.read = true));
}

// Cierra ambos paneles al hacer clic fuera o presionar Escape
function handleClickOutside(e) {
  if (searchWrapRef.value && !searchWrapRef.value.contains(e.target)) searchOpen.value = false;
  if (notifWrapRef.value && !notifWrapRef.value.contains(e.target)) notifOpen.value = false;
}
function handleEscape(e) {
  if (e.key === 'Escape') { searchOpen.value = false; notifOpen.value = false; }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscape);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscape);
});
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0; left: var(--sidebar-width); right: 0;
  height: var(--header-h);
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 24px;
  z-index: 40;
}

.topbar__title { font-size: 1rem; font-weight: 600; }

.topbar__actions { display: flex; align-items: center; gap: 12px; }

.topbar__search-wrap, .topbar__notif-wrap { position: relative; }

.topbar__search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-page);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 7px 12px;
  color: var(--text-muted);
}

.topbar__search-input {
  border: none;
  background: transparent;
  font-size: 13px;
  color: var(--text-primary);
  outline: none;
  width: 220px;
}

.topbar__icon-btn {
  position: relative;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: background 150ms;
  cursor: pointer;
}

.topbar__icon-btn:hover { background: var(--bg-page); }

.topbar__notif-badge {
  position: absolute;
  top: 2px; right: 2px;
  min-width: 14px; height: 14px;
  padding-inline: 2px;
  background: var(--color-danger);
  color: #fff;
  font-size: 9px; font-weight: 700;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--bg-card);
}

.topbar__profile { background: none; border: none; cursor: pointer; }

.topbar__avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--color-info);
  color: #fff;
  font-size: 11px; font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Panel de búsqueda */
.search-panel {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 340px;
  max-height: 60vh;
  overflow-y: auto;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  padding: 6px;
  z-index: 100;
}

.search-group { margin-bottom: 4px; }
.search-group__label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  padding: 8px 10px 4px;
}

.search-result {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-primary);
  transition: background 120ms;
}
.search-result:hover { background: var(--bg-page); }
.search-result__title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.search-result__meta { color: var(--text-muted); font-size: 12px; flex-shrink: 0; }

.search-empty { padding: 14px 10px; font-size: 13px; color: var(--text-muted); text-align: center; }

/* Panel de notificaciones */
.notif-panel {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  width: 320px;
  max-height: 70vh;
  overflow-y: auto;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  z-index: 100;
}

.notif-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  font-weight: 600;
  position: sticky;
  top: 0;
  background: var(--bg-card);
}

.notif-panel__mark-all {
  background: none;
  border: none;
  color: var(--color-info);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 12px 14px;
  background: none;
  border: none;
  border-bottom: 1px solid var(--border);
  text-align: left;
  cursor: pointer;
  transition: background 120ms;
  font-family: inherit;
}
.notif-item:last-child { border-bottom: none; }
.notif-item:hover { background: var(--bg-page); }

.notif-item__dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
  background: transparent;
}
.notif-item--unread .notif-item__dot { background: var(--color-info); }

.notif-item__body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.notif-item__title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.notif-item--unread .notif-item__title { font-weight: 700; }
.notif-item__desc { font-size: 12px; color: var(--text-secondary); line-height: 1.4; }
.notif-item__time { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

@media (max-width: 700px) {
  .topbar__search-input { width: 140px; }
  .search-panel, .notif-panel { width: 280px; }
}
</style>
