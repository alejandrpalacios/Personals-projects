<template>
  <!-- Gráfico de barras en SVG hecho a mano — sin dependencias externas -->
  <div class="sales-chart">
    <svg
      viewBox="0 0 100 52"
      preserveAspectRatio="none"
      class="sales-chart__svg"
      role="img"
      :aria-label="ariaLabel"
    >
      <line
        v-for="gy in gridLines"
        :key="gy"
        x1="0" :x2="100" :y1="gy" :y2="gy"
        class="sales-chart__grid"
      />
      <rect
        v-for="(point, i) in points"
        :key="point.label"
        :x="barX(i)"
        :y="barY(point.value)"
        :width="barWidth"
        :height="barHeight(point.value)"
        rx="1.4"
        class="sales-chart__bar"
        :class="{ 'sales-chart__bar--peak': point.value === maxValue }"
      >
        <title>{{ point.label }}: {{ formatValue(point.value) }}</title>
      </rect>
    </svg>

    <div class="sales-chart__labels">
      <span v-for="point in points" :key="point.label">{{ point.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  points: { type: Array, required: true }, // [{ label: 'Jan', value: 32000 }, ...]
  ariaLabel: { type: String, default: 'Sales chart' },
});

const maxValue = computed(() => Math.max(...props.points.map(p => p.value), 1));

// Layout: eje de 0 a 100 (ancho) x 0 a 52 (alto), base de barras en y=48
const baseline = 48;
const top = 4;
const slot = computed(() => 100 / props.points.length);
const barWidth = computed(() => slot.value * 0.5);

function barX(i) {
  return i * slot.value + (slot.value - barWidth.value) / 2;
}

function barHeight(value) {
  const ratio = value / maxValue.value;
  return ratio * (baseline - top);
}

function barY(value) {
  return baseline - barHeight(value);
}

const gridLines = [baseline, (baseline - top) / 2 + top, top];

function formatValue(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}
</script>

<style scoped>
.sales-chart { display: flex; flex-direction: column; gap: 8px; height: 100%; }

.sales-chart__svg {
  width: 100%;
  height: 220px;
  overflow: visible;
}

.sales-chart__grid {
  stroke: var(--border);
  stroke-width: 0.3;
}

.sales-chart__bar {
  fill: var(--color-info);
  opacity: 0.55;
  transition: opacity 150ms;
}

.sales-chart__bar:hover { opacity: 0.85; }
.sales-chart__bar--peak { fill: var(--color-info); opacity: 0.9; }

.sales-chart__labels {
  display: flex;
  justify-content: space-between;
  padding-inline: 2px;
  font-size: 11px;
  color: var(--text-muted);
}
</style>
