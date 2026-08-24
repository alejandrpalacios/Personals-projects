<template>
  <div>
    <div class="page-header">
      <h2 class="section-title" style="margin-bottom:0">All orders</h2>
      <button class="btn btn--primary" @click="showNewOrder = true"><Icon name="plus" :size="14" />New order</button>
    </div>

    <!-- Filtros -->
    <div class="filters card" style="margin-bottom:16px">
      <div class="filters__row">
        <input
          type="search"
          v-model="search"
          placeholder="Search by ID or customer..."
          class="filter-input"
        />
        <select v-model="statusFilter" class="filter-select">
          <option value="">All statuses</option>
          <option v-for="s in statusOptions" :key="s.code" :value="s.code">{{ s.label }}</option>
        </select>
        <input type="date" v-model="dateFilter" class="filter-select" />
        <button class="btn btn--ghost" @click="exportCsv"><Icon name="download" :size="14" />Export CSV</button>
      </div>
    </div>

    <!-- Tabla de pedidos -->
    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th><input type="checkbox" aria-label="Select all" /></th>
            <th>Order</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filtered" :key="order.id">
            <td><input type="checkbox" :aria-label="`Select order #${order.id}`" /></td>
            <td class="order-id">#{{ order.id }}</td>
            <td>{{ order.customer }}</td>
            <td>{{ formatDate(order.dateISO) }}</td>
            <td>${{ order.total }}</td>
            <td>
              <span class="badge" :class="statusBadge(order.status)">{{ statusLabel(order.status) }}</span>
            </td>
            <td>
              <div class="row-actions">
                <button class="action-btn" aria-label="View order" @click="viewOrder = order"><Icon name="eye" :size="15" /></button>
                <button class="action-btn" aria-label="Edit order" @click="openEdit(order)"><Icon name="edit" :size="15" /></button>
              </div>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="7" class="empty-row">No orders match your filters.</td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="pagination">
        <span class="pagination__info">
          Showing {{ filtered.length }} of {{ ORDERS.length }} orders
        </span>
        <div class="pagination__controls">
          <button class="btn btn--ghost" disabled>Previous</button>
          <button class="btn btn--ghost" disabled>Next</button>
        </div>
      </div>
    </div>

    <!-- Modal: nuevo pedido -->
    <Modal :open="showNewOrder" title="New order" @close="showNewOrder = false">
      <form class="form" @submit.prevent="createOrder">
        <div class="form-group">
          <label class="form-label">Customer name</label>
          <input v-model="newOrder.customer" type="text" class="form-field" required />
        </div>
        <div class="form-group">
          <label class="form-label">Total ($)</label>
          <input v-model="newOrder.total" type="number" step="0.01" min="0" class="form-field" required />
        </div>
        <div class="form-group">
          <label class="form-label">Status</label>
          <select v-model="newOrder.status" class="form-field">
            <option v-for="s in statusOptions" :key="s.code" :value="s.code">{{ s.label }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn--primary" style="width:100%; justify-content:center; margin-top:6px">Create order</button>
      </form>
    </Modal>

    <!-- Modal: ver pedido -->
    <Modal :open="!!viewOrder" title="Order details" @close="viewOrder = null">
      <div v-if="viewOrder" class="detail-list">
        <div class="detail-row"><span>Order</span><strong>#{{ viewOrder.id }}</strong></div>
        <div class="detail-row"><span>Customer</span><strong>{{ viewOrder.customer }}</strong></div>
        <div class="detail-row"><span>Date</span><strong>{{ formatDate(viewOrder.dateISO) }}</strong></div>
        <div class="detail-row"><span>Total</span><strong>${{ viewOrder.total }}</strong></div>
        <div class="detail-row">
          <span>Status</span>
          <span class="badge" :class="statusBadge(viewOrder.status)">{{ statusLabel(viewOrder.status) }}</span>
        </div>
      </div>
    </Modal>

    <!-- Modal: editar pedido -->
    <Modal :open="!!editOrder" title="Edit order" @close="editOrder = null">
      <form v-if="editOrder" class="form" @submit.prevent="saveEdit">
        <div class="form-group">
          <label class="form-label">Customer name</label>
          <input v-model="editOrder.customer" type="text" class="form-field" required />
        </div>
        <div class="form-group">
          <label class="form-label">Total ($)</label>
          <input v-model="editOrder.total" type="text" class="form-field" required />
        </div>
        <div class="form-group">
          <label class="form-label">Status</label>
          <select v-model="editOrder.status" class="form-field">
            <option v-for="s in statusOptions" :key="s.code" :value="s.code">{{ s.label }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn--primary" style="width:100%; justify-content:center; margin-top:6px">Save changes</button>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Icon from '@/components/Icon.vue';
import Modal from '@/components/Modal.vue';
import { ORDERS, statusLabel, statusBadge, genOrderId } from '@/data/mock.js';

const search = ref('');
const statusFilter = ref('');
const dateFilter = ref('');

const statusOptions = [
  { code: 'Pendiente', label: 'Pending'   },
  { code: 'Enviado',   label: 'Shipped'   },
  { code: 'Entregado', label: 'Delivered' },
  { code: 'Cancelado', label: 'Cancelled' },
];

const filtered = computed(() => ORDERS.filter(o => {
  const term = search.value.trim().toLowerCase();
  const matchesSearch = !term || o.id.includes(term) || o.customer.toLowerCase().includes(term);
  const matchesStatus = !statusFilter.value || o.status === statusFilter.value;
  const matchesDate   = !dateFilter.value || o.dateISO === dateFilter.value;
  return matchesSearch && matchesStatus && matchesDate;
}));

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ——— Ver pedido ———
const viewOrder = ref(null);

// ——— Editar pedido ———
const editOrder = ref(null);
function openEdit(order) {
  editOrder.value = { ...order };
}
function saveEdit() {
  const target = ORDERS.find(o => o.id === editOrder.value.id);
  if (target) Object.assign(target, editOrder.value);
  editOrder.value = null;
}

// ——— Nuevo pedido ———
const showNewOrder = ref(false);
const newOrder = ref({ customer: '', total: '', status: 'Pendiente' });

function createOrder() {
  ORDERS.unshift({
    id: genOrderId(),
    customer: newOrder.value.customer,
    dateISO: new Date().toISOString().slice(0, 10),
    total: Number(newOrder.value.total).toFixed(2),
    status: newOrder.value.status,
  });
  newOrder.value = { customer: '', total: '', status: 'Pendiente' };
  showNewOrder.value = false;
}

// Exporta el listado filtrado a un CSV real, generado 100% en el cliente
function exportCsv() {
  const headers = ['Order', 'Customer', 'Date', 'Total', 'Status'];

  const rows = filtered.value.map(o => [
    o.id,
    o.customer,
    o.dateISO,
    o.total,
    statusLabel(o.status),
  ]);

  const escape = (cell) => `"${String(cell).replace(/"/g, '""')}"`;
  const csv = [headers, ...rows].map(row => row.map(escape).join(',')).join('\r\n');

  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pedidos-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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

.filter-input,
.filter-select {
  padding: 7px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  background: var(--bg-page);
  color: var(--text-primary);
  outline: none;
  transition: border-color 150ms;
}

.filter-input { min-width: 220px; }
.filter-input:focus,
.filter-select:focus { border-color: var(--color-info); }

.order-id { font-weight: 600; color: var(--color-info); }

.row-actions { display: flex; gap: 6px; }

.action-btn {
  background: none;
  border: none;
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 4px;
  transition: background 150ms;
}
.action-btn:hover { background: var(--bg-page); }

.empty-row {
  text-align: center;
  color: var(--text-muted);
  padding: 32px 0 !important;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  margin-top: 8px;
  border-top: 1px solid var(--border);
}

.pagination__info {
  font-size: 12px;
  color: var(--text-muted);
}

.pagination__controls { display: flex; gap: 8px; }

/* Modales */
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

.detail-list { display: flex; flex-direction: column; gap: 12px; }
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.detail-row:last-child { border-bottom: none; padding-bottom: 0; }
.detail-row span { color: var(--text-muted); }
</style>
