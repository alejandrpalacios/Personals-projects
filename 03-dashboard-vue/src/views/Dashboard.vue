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
      <!-- Gráfico de ventas -->
      <div class="card">
        <div class="card-header">
          <h2 class="section-title" style="margin-bottom:0">Monthly sales</h2>
          <span class="chart-total">{{ formatTotal(monthlyTotal) }}</span>
        </div>
        <SalesChart :points="chartPoints" aria-label="Monthly sales" />
      </div>

      <!-- Pedidos recientes -->
      <div class="card">
        <div class="card-header">
          <h2 class="section-title" style="margin-bottom:0">Recent orders</h2>
          <RouterLink to="/pedidos" class="btn btn--ghost">View all</RouterLink>
        </div>
        <table class="data-table" style="margin-top:14px">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id">
              <td>#{{ order.id }}</td>
              <td>{{ order.customer }}</td>
              <td>${{ order.total }}</td>
              <td>
                <span class="badge" :class="statusBadge(order.status)">
                  {{ statusLabel(order.status) }}
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
import { computed } from 'vue';
import StatsCard from '@/components/StatsCard.vue';
import SalesChart from '@/components/SalesChart.vue';
import { ORDERS, statusLabel, statusBadge } from '@/data/mock.js';

// Datos de demo — reemplazar con llamada a API
const stats = [
  { label: 'Total revenue', value: '$48,295', icon: 'dollar-sign', trend: 12.4 },
  { label: 'Orders',        value: '1,284',   icon: 'package',     trend: 8.1  },
  { label: 'New customers', value: '340',     icon: 'users',       trend: -3.2 },
  { label: 'Conversion rate', value: '3.8%',  icon: 'trending-up', trend: 0.6  },
];

const recentOrders = ORDERS.slice(0, 5);

// Ventas de los últimos 6 meses — reemplazar con datos reales
const monthlyValues = [32000, 35500, 31000, 38900, 41200, 48295];
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const chartPoints = computed(() =>
  monthlyValues.map((value, i) => ({ label: monthLabels[i], value }))
);

const monthlyTotal = computed(() => monthlyValues.reduce((sum, v) => sum + v, 0));

function formatTotal(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
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

.chart-total {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
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
