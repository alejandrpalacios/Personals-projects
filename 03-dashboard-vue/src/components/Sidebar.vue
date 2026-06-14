<template>
  <aside class="sidebar">
    <div class="sidebar__logo">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="6" fill="#3b82f6"/>
        <path d="M7 14l4 4 10-9" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>AdminPro</span>
    </div>

    <nav class="sidebar__nav">
      <ul role="list">
        <li v-for="item in mainNav" :key="item.name">
          <RouterLink :to="item.path" class="sidebar__link" active-class="sidebar__link--active">
            <span class="sidebar__icon" aria-hidden="true">{{ item.icon }}</span>
            <span>{{ t.value(item.labelKey) }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <hr class="sidebar__divider" />

    <RouterLink to="/configuracion" class="sidebar__link" active-class="sidebar__link--active">
      <span class="sidebar__icon" aria-hidden="true">⚙️</span>
      <span>{{ t.value('nav.settings') }}</span>
    </RouterLink>

    <div class="sidebar__user">
      <div class="sidebar__avatar" aria-hidden="true">AD</div>
      <div class="sidebar__user-info">
        <p class="sidebar__user-name">Admin Demo</p>
        <p class="sidebar__user-role">Administrator</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useLang } from '@/i18n/index.js';

const { t } = useLang();

const mainNav = [
  { name: 'Dashboard', path: '/dashboard',    icon: '📊', labelKey: 'nav.dashboard'  },
  { name: 'Pedidos',   path: '/pedidos',      icon: '📦', labelKey: 'nav.orders'     },
  { name: 'Productos', path: '/productos',    icon: '🏷️', labelKey: 'nav.products'   },
  { name: 'Clientes',  path: '/clientes',     icon: '👥', labelKey: 'nav.customers'  },
];
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  padding: 16px;
  z-index: 50;
  overflow-y: auto;
}

.sidebar__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 4px 20px;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
}

.sidebar__nav { flex: 1; }

.sidebar__nav ul { list-style: none; display: flex; flex-direction: column; gap: 2px; }

.sidebar__link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 6px;
  color: var(--sidebar-text);
  font-size: 13px;
  font-weight: 500;
  transition: background 150ms ease, color 150ms ease;
  text-decoration: none;
}

.sidebar__link:hover { background: rgba(255,255,255,0.07); color: var(--sidebar-text-active); }
.sidebar__link--active { background: rgba(59,130,246,0.15); color: #93c5fd; }

.sidebar__icon { font-size: 1rem; width: 20px; text-align: center; }

.sidebar__divider { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 12px 0; }

.sidebar__user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  margin-top: 8px;
  background: rgba(255,255,255,0.05);
}

.sidebar__avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--color-info);
  color: #fff;
  font-size: 11px; font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sidebar__user-name { font-size: 12px; font-weight: 600; color: #fff; }
.sidebar__user-role { font-size: 11px; color: var(--sidebar-text); }
</style>
