<template>
  <header class="topbar">
    <h1 class="topbar__title">{{ currentTitle }}</h1>

    <div class="topbar__actions">
      <div class="topbar__search">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <input type="search" :placeholder="t.value('topbar.search')" class="topbar__search-input" />
      </div>

      <!-- Selector de idioma -->
      <LangSelector />

      <button class="topbar__icon-btn" aria-label="Notifications">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="topbar__notif-badge">3</span>
      </button>

      <button class="topbar__profile" aria-label="User profile">
        <div class="topbar__avatar">AD</div>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useLang } from '@/i18n/index.js';
import LangSelector from './LangSelector.vue';

const route = useRoute();
const { t } = useLang();

// Mapea la ruta al label traducido
const navKeys = {
  Dashboard:     'nav.dashboard',
  Pedidos:       'nav.orders',
  Productos:     'nav.products',
  Clientes:      'nav.customers',
  Configuracion: 'nav.settings',
};

const currentTitle = computed(() => {
  const key = navKeys[route.name] ?? 'nav.dashboard';
  return t.value(key);
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
  width: 180px;
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
  width: 14px; height: 14px;
  background: var(--color-danger);
  color: #fff;
  font-size: 9px; font-weight: 700;
  border-radius: 50%;
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
</style>
