<template>
  <div>
    <div class="page-header">
      <h2 class="section-title" style="margin-bottom:0">Todos los pedidos</h2>
      <button class="btn btn--primary">+ Nuevo pedido</button>
    </div>

    <!-- Filtros -->
    <div class="filters card" style="margin-bottom:16px">
      <div class="filters__row">
        <input type="search" placeholder="Buscar por ID o cliente..." class="filter-input" />
        <select class="filter-select">
          <option value="">Todos los estados</option>
          <option>Pendiente</option>
          <option>Enviado</option>
          <option>Entregado</option>
          <option>Cancelado</option>
        </select>
        <input type="date" class="filter-select" />
        <button class="btn btn--ghost">Exportar CSV</button>
      </div>
    </div>

    <!-- Tabla de pedidos -->
    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th><input type="checkbox" aria-label="Seleccionar todos" /></th>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td><input type="checkbox" :aria-label="`Seleccionar pedido ${order.id}`" /></td>
            <td class="order-id">#{{ order.id }}</td>
            <td>{{ order.customer }}</td>
            <td>{{ order.date }}</td>
            <td>${{ order.total }}</td>
            <td>
              <span class="badge" :class="statusBadge(order.status)">{{ order.status }}</span>
            </td>
            <td>
              <div class="row-actions">
                <button class="action-btn" aria-label="Ver pedido">👁️</button>
                <button class="action-btn" aria-label="Editar pedido">✏️</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="pagination">
        <span class="pagination__info">Mostrando 1–10 de 1,284 pedidos</span>
        <div class="pagination__controls">
          <button class="btn btn--ghost" disabled>Anterior</button>
          <button class="btn btn--ghost">Siguiente</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Datos de demo — reemplazar con fetch a la API real
const orders = [
  { id: '4821', customer: 'María García',    date: '14 jun 2025', total: '128.00', status: 'Enviado'   },
  { id: '4820', customer: 'Carlos López',    date: '14 jun 2025', total: '89.50',  status: 'Pendiente' },
  { id: '4819', customer: 'Laura Martínez',  date: '13 jun 2025', total: '245.00', status: 'Entregado' },
  { id: '4818', customer: 'Andrés Ruiz',     date: '13 jun 2025', total: '67.00',  status: 'Cancelado' },
  { id: '4817', customer: 'Sofia Jiménez',   date: '12 jun 2025', total: '312.80', status: 'Enviado'   },
  { id: '4816', customer: 'Pedro Navarro',   date: '12 jun 2025', total: '56.20',  status: 'Entregado' },
  { id: '4815', customer: 'Ana Rodríguez',   date: '11 jun 2025', total: '199.90', status: 'Pendiente' },
];

function statusBadge(status) {
  const map = { Enviado: 'badge--info', Pendiente: 'badge--warning', Entregado: 'badge--success', Cancelado: 'badge--danger' };
  return map[status] ?? '';
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
</style>
