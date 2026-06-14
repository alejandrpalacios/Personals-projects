<template>
  <div class="view-dashboard">
    <!-- Stats KPI -->
    <div class="kpi-grid">
      <StatsCard
        v-for="stat in stats"
        :key="stat.label"
        :label="stat.label"
        :value="stat.value"
        :icon="stat.icon"
        :trend="stat.trend"
      />
    </div>

    <!-- Fila inferior: gráfico + pedidos recientes -->
    <div class="bottom-row">
      <!-- Gráfico de ventas — reemplazar con Chart.js, ApexCharts, etc. -->
      <div class="card chart-placeholder">
        <h2 class="section-title">Ventas mensuales</h2>
        <div class="chart-area" aria-label="Área para gráfico de ventas">
          <p>[ Gráfico de barras — integrar Chart.js o ApexCharts aquí ]</p>
          <code>npm install apexcharts vue3-apexcharts</code>
        </div>
      </div>

      <!-- Pedidos recientes -->
      <div class="card">
        <div class="card-header">
          <h2 class="section-title" style="margin-bottom:0">Pedidos recientes</h2>
          <RouterLink to="/pedidos" class="btn btn--ghost">Ver todos</RouterLink>
        </div>
        <table class="data-table" style="margin-top:14px">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id">
              <td>#{{ order.id }}</td>
              <td>{{ order.customer }}</td>
              <td>${{ order.total }}</td>
              <td>
                <span class="badge" :class="statusBadge(order.status)">
                  {{ order.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import StatsCard from '@/components/StatsCard.vue';

// Datos de demo — reemplazar con llamada a API
const stats = [
  { label: 'Ingresos totales', value: '$48,295', icon: '💰', trend: 12.4 },
  { label: 'Pedidos',          value: '1,284',   icon: '📦', trend: 8.1  },
  { label: 'Clientes nuevos',  value: '340',     icon: '👥', trend: -3.2 },
  { label: 'Tasa conversión',  value: '3.8%',    icon: '📈', trend: 0.6  },
];

const recentOrders = [
  { id: '4821', customer: 'María García',    total: '128.00', status: 'Enviado'   },
  { id: '4820', customer: 'Carlos López',    total: '89.50',  status: 'Pendiente' },
  { id: '4819', customer: 'Laura Martínez',  total: '245.00', status: 'Entregado' },
  { id: '4818', customer: 'Andrés Ruiz',     total: '67.00',  status: 'Cancelado' },
  { id: '4817', customer: 'Sofia Jiménez',   total: '312.80', status: 'Enviado'   },
];

function statusBadge(status) {
  const map = {
    Enviado:   'badge--info',
    Pendiente: 'badge--warning',
    Entregado: 'badge--success',
    Cancelado: 'badge--danger',
  };
  return map[status] ?? '';
}
</script>

<style scoped>
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.bottom-row {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 16px;
}

.chart-area {
  height: 260px;
  background: var(--bg-page);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--text-muted);
  font-size: 13px;
  border: 2px dashed var(--border);
}

.chart-area code {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 900px) {
  .bottom-row { grid-template-columns: 1fr; }
}
</style>
