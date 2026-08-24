<template>
  <aside class="sidebar">
    <div class="sidebar__logo">
      <span>Console</span>
    </div>

    <nav class="sidebar__nav">
      <ul role="list">
        <li v-for="item in mainNav" :key="item.name">
          <RouterLink :to="item.path" class="sidebar__link" active-class="sidebar__link--active">
            <Icon :name="item.icon" :size="17" class="sidebar__icon" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <hr class="sidebar__divider" />

    <RouterLink to="/configuracion" class="sidebar__link" active-class="sidebar__link--active">
      <Icon name="settings" :size="17" class="sidebar__icon" />
      <span>Settings</span>
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
import Icon from './Icon.vue';

const mainNav = [
  { name: 'Dashboard', path: '/dashboard',    icon: 'grid',    label: 'Overview'  },
  { name: 'Pedidos',   path: '/pedidos',      icon: 'package', label: 'Orders'     },
  { name: 'Productos', path: '/productos',    icon: 'tag',     label: 'Products'   },
  { name: 'Clientes',  path: '/clientes',     icon: 'users',   label: 'Customers'  },
];
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 16px 14px;
  z-index: 50;
  overflow-y: auto;
}

.sidebar__logo {
  padding: 6px 6px 22px;
  color: var(--sidebar-text-active);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
}

.sidebar__nav { flex: 1; }

.sidebar__nav ul { list-style: none; display: flex; flex-direction: column; gap: 1px; }

.sidebar__link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius);
  color: var(--sidebar-text);
  font-size: 13px;
  font-weight: 500;
  transition: background 120ms ease, color 120ms ease;
  text-decoration: none;
}

.sidebar__link:hover { background: var(--sidebar-hover); color: var(--sidebar-text-active); }
.sidebar__link--active { background: rgba(80, 70, 229, 0.08); color: var(--sidebar-accent); }

.sidebar__icon { flex-shrink: 0; }

.sidebar__divider { border: none; border-top: 1px solid var(--border); margin: 12px 4px; }

.sidebar__user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 8px;
  border-radius: var(--radius);
  margin-top: 10px;
  border: 1px solid var(--border);
}

.sidebar__avatar {
  width: 30px; height: 30px;
  border-radius: 50%;
  background: var(--sidebar-accent);
  color: #fff;
  font-size: 11px; font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sidebar__user-name { font-size: 12px; font-weight: 600; color: var(--sidebar-text-active); }
.sidebar__user-role { font-size: 11px; color: var(--sidebar-text); }
</style>
