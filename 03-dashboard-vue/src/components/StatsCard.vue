<template>
  <!-- Tarjeta de métrica — reutilizable en cualquier vista -->
  <div class="stats-card card">
    <div class="stats-card__header">
      <span class="stats-card__label">{{ label }}</span>
      <span class="stats-card__icon" aria-hidden="true">{{ icon }}</span>
    </div>
    <p class="stats-card__value">{{ value }}</p>
    <p class="stats-card__trend" :class="trendClass">
      <span aria-hidden="true">{{ trend >= 0 ? '▲' : '▼' }}</span>
      {{ Math.abs(trend) }}% vs mes anterior
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon:  { type: String, required: true },
  trend: { type: Number, default: 0 }, // positivo = crecimiento, negativo = caída
});

const trendClass = computed(() =>
  props.trend >= 0 ? 'stats-card__trend--up' : 'stats-card__trend--down'
);
</script>

<style scoped>
.stats-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stats-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-card__label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stats-card__icon {
  font-size: 1.2rem;
}

.stats-card__value {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.stats-card__trend {
  font-size: 12px;
  font-weight: 500;
}

.stats-card__trend--up   { color: var(--color-success); }
.stats-card__trend--down { color: var(--color-danger); }
</style>
