<template>
  <div>
    <div class="page-header">
      <h2 class="section-title" style="margin-bottom:0">Customers</h2>
      <button class="btn btn--primary" @click="showAdd = true"><Icon name="plus" :size="14" />Add client</button>
    </div>

    <div class="filters card" style="margin-bottom:16px">
      <div class="filters__row">
        <input type="search" v-model="search" placeholder="Search by name or email..." class="filter-input" />
      </div>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Orders</th>
            <th>Total spent</th>
            <th>Last order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="client in filtered" :key="client.id">
            <tr>
              <td>
                <div class="client-cell">
                  <div class="client-avatar">{{ initials(client.name) }}</div>
                  <span>{{ client.name }}</span>
                </div>
              </td>
              <td>{{ client.email }}</td>
              <td>{{ client.orders }}</td>
              <td>${{ client.spent }}</td>
              <td>{{ client.lastOrder }}</td>
              <td>
                <button class="action-link" @click="toggle(client.id)">
                  {{ expanded === client.id ? 'Hide profile' : 'View profile' }}
                </button>
              </td>
            </tr>
            <tr v-if="expanded === client.id" class="detail-row">
              <td colspan="6">
                <div class="detail-panel">
                  <div class="detail-item">
                    <span class="detail-label">Member since</span>
                    <span class="detail-value">{{ client.memberSince }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Average order</span>
                    <span class="detail-value">${{ avgOrder(client) }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Favorite category</span>
                    <span class="detail-value">{{ client.favoriteCategory }}</span>
                  </div>
                  <RouterLink to="/pedidos" class="detail-link">View all →</RouterLink>
                </div>
              </td>
            </tr>
          </template>
          <tr v-if="filtered.length === 0">
            <td colspan="6" class="empty-row">No customers match your search.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal: nuevo cliente -->
    <Modal :open="showAdd" title="Add client" @close="showAdd = false">
      <form class="form" @submit.prevent="createClient">
        <div class="form-group">
          <label class="form-label">Full name</label>
          <input v-model="newClient.name" type="text" class="form-field" required />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input v-model="newClient.email" type="email" class="form-field" required />
        </div>
        <button type="submit" class="btn btn--primary" style="width:100%; justify-content:center; margin-top:6px">Add client</button>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Icon from '@/components/Icon.vue';
import Modal from '@/components/Modal.vue';
import { CLIENTS, genClientId } from '@/data/mock.js';

const search = ref('');
const expanded = ref(null);

const filtered = computed(() => CLIENTS.filter(c => {
  const term = search.value.trim().toLowerCase();
  return !term || c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term);
}));

function toggle(id) {
  expanded.value = expanded.value === id ? null : id;
}

function initials(name) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

function avgOrder(client) {
  const spent = Number(String(client.spent).replace(/,/g, ''));
  return client.orders > 0 ? (spent / client.orders).toFixed(2) : '0.00';
}

// ——— Nuevo cliente ———
const showAdd = ref(false);
const newClient = ref({ name: '', email: '' });

function createClient() {
  CLIENTS.unshift({
    id: genClientId(),
    name: newClient.value.name,
    email: newClient.value.email,
    orders: 0,
    spent: '0.00',
    lastOrder: '—',
    memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    favoriteCategory: '—',
  });
  newClient.value = { name: '', email: '' };
  showAdd.value = false;
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filters__row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.filter-input {
  padding: 7px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  background: var(--bg-page);
  color: var(--text-primary);
  outline: none;
  min-width: 260px;
  transition: border-color 150ms;
}
.filter-input:focus { border-color: var(--color-info); }

.client-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.client-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-info);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-link {
  background: none;
  border: none;
  color: var(--color-info);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

.detail-row td { padding: 0; border-bottom: 1px solid var(--border); }

.detail-panel {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 14px 12px;
  background: var(--bg-page);
  flex-wrap: wrap;
}

.detail-item { display: flex; flex-direction: column; gap: 2px; }

.detail-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}

.detail-value { font-size: 13px; font-weight: 600; color: var(--text-primary); }

.detail-link {
  margin-left: auto;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-info);
}

.empty-row {
  text-align: center;
  color: var(--text-muted);
  padding: 32px 0 !important;
}

/* Modal */
.form { display: flex; flex-direction: column; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-size: 12px; font-weight: 500; color: var(--text-secondary); }
.form-field {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  background: var(--bg-page);
  color: var(--text-primary);
  outline: none;
  font-family: inherit;
  transition: border-color 150ms;
}
.form-field:focus { border-color: var(--color-info); }
</style>
