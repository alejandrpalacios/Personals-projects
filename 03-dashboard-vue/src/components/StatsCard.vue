<template>
  <!-- Tarjeta de métrica — reutilizable en cualquier vista -->
  <div class="stats-card card">
    <div class="stats-card__header">
      <span class="stats-card__label">{{ label }}</span>
      <span class="stats-card__icon"><Icon :name="icon" :size="15" /></span>
    </div>
    <p class="stats-card__value">{{ value }}</p>
    <p class="stats-card__trend" :class="trendClass">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
        <polyline v-if="trend >= 0" points="4 16 10 8 14 12 20 4" />
        <polyline v-else points="4 8 10 16 14 12 20 20" />
      </svg>
      {{ Math.abs(trend) }}% vs mes anterior
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Icon from './Icon.vue';

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
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: var(--bg-hover);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats-card__value {
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.stats-card__trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
}

.stats-card__trend--up   { color: var(--color-success); }
.stats-card__trend--down { color: var(--color-danger); }
</style>
