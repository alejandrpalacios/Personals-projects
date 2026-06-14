<template>
  <div class="config-view">
    <h2 class="section-title">Configuración</h2>

    <!-- Tabs de configuración -->
    <div class="config-tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="config-tab"
        :class="{ 'config-tab--active': activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Perfil de la empresa -->
    <div v-if="activeTab === 'General'" class="card config-section">
      <h3 class="config-section__title">Perfil de la empresa</h3>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Nombre de la empresa</label>
          <input type="text" class="form-field" value="Lumière Studio SL" />
        </div>
        <div class="form-group">
          <label class="form-label">Email de contacto</label>
          <input type="email" class="form-field" value="hola@lumiere.com" />
        </div>
        <div class="form-group">
          <label class="form-label">Teléfono</label>
          <input type="tel" class="form-field" value="+34 600 000 000" />
        </div>
        <div class="form-group">
          <label class="form-label">Moneda</label>
          <select class="form-field">
            <option>EUR (€)</option>
            <option>USD ($)</option>
            <option>GBP (£)</option>
          </select>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn--primary">Guardar cambios</button>
        <button class="btn btn--ghost">Cancelar</button>
      </div>
    </div>

    <!-- Notificaciones -->
    <div v-if="activeTab === 'Notificaciones'" class="card config-section">
      <h3 class="config-section__title">Preferencias de notificación</h3>
      <div class="toggle-list">
        <div v-for="notif in notifications" :key="notif.label" class="toggle-item">
          <div>
            <p class="toggle-label">{{ notif.label }}</p>
            <p class="toggle-desc">{{ notif.desc }}</p>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" :checked="notif.enabled" />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- Placeholder para otras tabs -->
    <div v-if="!['General', 'Notificaciones'].includes(activeTab)" class="card config-section">
      <p style="color: var(--text-muted); text-align: center; padding: 40px 0;">
        Sección "{{ activeTab }}" — contenido por implementar
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tabs = ['General', 'Notificaciones', 'Pagos', 'Integraciones', 'Seguridad'];
const activeTab = ref('General');

const notifications = [
  { label: 'Nuevo pedido',         desc: 'Recibir email cuando llegue un pedido nuevo.',    enabled: true  },
  { label: 'Pedido enviado',       desc: 'Notificar cuando el transportista recoja el envío.', enabled: true  },
  { label: 'Stock bajo',           desc: 'Alertar cuando un producto tenga menos de 5 unidades.', enabled: true  },
  { label: 'Resumen semanal',      desc: 'Email con métricas del negocio cada lunes.',       enabled: false },
  { label: 'Comentarios clientes', desc: 'Notificar cuando un cliente deje una reseña.',     enabled: false },
];
</script>

<style scoped>
.config-view { max-width: 780px; }

.config-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 20px;
}

.config-tab {
  background: none;
  border: none;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 150ms, border-color 150ms;
}

.config-tab:hover { color: var(--text-primary); }
.config-tab--active { color: var(--color-info); border-bottom-color: var(--color-info); }

.config-section__title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group { display: flex; flex-direction: column; gap: 6px; }

.form-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
}

.form-field {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  background: var(--bg-page);
  color: var(--text-primary);
  outline: none;
  transition: border-color 150ms;
}
.form-field:focus { border-color: var(--color-info); }

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

/* Toggle switches */
.toggle-list { display: flex; flex-direction: column; gap: 0; }

.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}
.toggle-item:last-child { border-bottom: none; }

.toggle-label { font-size: 13px; font-weight: 500; }
.toggle-desc  { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

.toggle-switch { position: relative; display: inline-block; width: 38px; height: 22px; cursor: pointer; }
.toggle-switch input { opacity: 0; width: 0; height: 0; }

.toggle-slider {
  position: absolute;
  inset: 0;
  background: var(--border);
  border-radius: 999px;
  transition: background 200ms;
}
.toggle-slider::before {
  content: '';
  position: absolute;
  left: 3px;
  top: 3px;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  transition: transform 200ms;
}
.toggle-switch input:checked + .toggle-slider { background: var(--color-success); }
.toggle-switch input:checked + .toggle-slider::before { transform: translateX(16px); }

@media (max-width: 600px) {
  .form-grid { grid-template-columns: 1fr; }
}
</style>
