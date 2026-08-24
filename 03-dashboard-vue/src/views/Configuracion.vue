<template>
  <div class="config-view">
    <h2 class="section-title">Settings</h2>

    <!-- Tabs de configuración -->
    <div class="config-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="config-tab"
        :class="{ 'config-tab--active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Perfil de la empresa -->
    <div v-if="activeTab === 'general'" class="card config-section">
      <h3 class="config-section__title">Company profile</h3>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Company name</label>
          <input type="text" class="form-field" v-model="company.name" />
        </div>
        <div class="form-group">
          <label class="form-label">Contact email</label>
          <input type="email" class="form-field" v-model="company.email" />
        </div>
        <div class="form-group">
          <label class="form-label">Phone</label>
          <input type="tel" class="form-field" v-model="company.phone" />
        </div>
        <div class="form-group">
          <label class="form-label">Currency</label>
          <select class="form-field" v-model="company.currency">
            <option>EUR (€)</option>
            <option>USD ($)</option>
            <option>GBP (£)</option>
          </select>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn--primary" @click="saveGeneral">Save changes</button>
        <button class="btn btn--ghost">Cancel</button>
        <span v-if="savedGeneral" class="save-confirm">Saved ✓</span>
      </div>
    </div>

    <!-- Notificaciones -->
    <div v-if="activeTab === 'notif'" class="card config-section">
      <h3 class="config-section__title">Notification preferences</h3>
      <div class="toggle-list">
        <div v-for="notif in notifications" :key="notif.label" class="toggle-item">
          <div>
            <p class="toggle-label">{{ notif.label }}</p>
            <p class="toggle-desc">{{ notif.desc }}</p>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="notif.enabled" />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- Pagos -->
    <div v-if="activeTab === 'payments'" class="config-section-group">
      <div class="card config-section">
        <h3 class="config-section__title">Current plan</h3>
        <div class="plan-row">
          <div>
            <p class="plan-name">Pro plan</p>
            <p class="plan-renew">Renews on 14 jul 2026</p>
          </div>
          <button class="btn btn--ghost">Change plan</button>
        </div>
      </div>

      <div class="card config-section">
        <h3 class="config-section__title">Payment method</h3>
        <div class="payment-method">
          <span class="payment-method__icon"><Icon name="credit-card" :size="20" /></span>
          <div>
            <p class="payment-method__number">•••• •••• •••• 4242</p>
            <p class="payment-method__exp">Exp. 09/28</p>
          </div>
          <button class="btn btn--ghost" style="margin-left:auto">Update</button>
        </div>
      </div>

      <div class="card config-section">
        <h3 class="config-section__title">Billing information</h3>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Tax ID</label>
            <input type="text" class="form-field" v-model="billing.taxId" />
          </div>
          <div class="form-group">
            <label class="form-label">Billing email</label>
            <input type="email" class="form-field" v-model="billing.email" />
          </div>
          <div class="form-group" style="grid-column: 1 / -1">
            <label class="form-label">Billing address</label>
            <input type="text" class="form-field" v-model="billing.address" />
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn--primary" @click="savedBilling = true">Save changes</button>
          <span v-if="savedBilling" class="save-confirm">Saved ✓</span>
        </div>
      </div>
    </div>

    <!-- Integraciones -->
    <div v-if="activeTab === 'integrations'" class="card config-section">
      <h3 class="config-section__title">Connected apps</h3>
      <p class="config-section__subtitle">Connect Console with the tools you already use.</p>
      <div class="integrations-grid">
        <div v-for="i in integrations" :key="i.name" class="integration-card">
          <div class="integration-card__head">
            <span class="integration-card__icon"><Icon :name="i.icon" :size="18" /></span>
            <div>
              <p class="integration-card__name">{{ i.name }}</p>
              <span class="badge" :class="i.connected ? 'badge--success' : ''">
                {{ i.connected ? 'Connected' : '' }}
              </span>
            </div>
          </div>
          <p class="integration-card__desc">{{ i.desc }}</p>
          <button
            class="btn"
            :class="i.connected ? 'btn--ghost' : 'btn--primary'"
            @click="i.connected = !i.connected"
          >
            {{ i.connected ? 'Disconnect' : 'Connect' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Seguridad -->
    <div v-if="activeTab === 'security'" class="config-section-group">
      <div class="card config-section">
        <h3 class="config-section__title">Change password</h3>
        <form class="form-grid" @submit.prevent="changePassword">
          <div class="form-group">
            <label class="form-label">Current password</label>
            <input type="password" class="form-field" v-model="security.current" required />
          </div>
          <div class="form-group"></div>
          <div class="form-group">
            <label class="form-label">New password</label>
            <input type="password" class="form-field" v-model="security.next" minlength="8" required />
          </div>
          <div class="form-group">
            <label class="form-label">Confirm new password</label>
            <input type="password" class="form-field" v-model="security.confirm" minlength="8" required />
          </div>
          <div class="form-actions" style="grid-column: 1 / -1">
            <button type="submit" class="btn btn--primary">Update password</button>
            <span v-if="securityError" class="save-error">{{ securityError }}</span>
            <span v-else-if="securitySuccess" class="save-confirm">Saved ✓</span>
          </div>
        </form>
      </div>

      <div class="card config-section">
        <div class="toggle-item" style="padding:0">
          <div>
            <p class="toggle-label">Two-factor authentication</p>
            <p class="toggle-desc">Require a verification code in addition to your password.</p>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="twoFactorEnabled" />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div class="card config-section">
        <h3 class="config-section__title">Active sessions</h3>
        <div class="session-list">
          <div v-for="(session, i) in sessions" :key="session.id" class="session-item">
            <div>
              <p class="session-device">{{ session.device }}</p>
              <p class="session-location">
                {{ session.location }}
                <span v-if="i === 0" class="session-current">· this device</span>
              </p>
            </div>
            <button v-if="i !== 0" class="action-link" @click="sessions.splice(i, 1)">Log out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Icon from '@/components/Icon.vue';

const tabs = [
  { id: 'general',      label: 'General' },
  { id: 'notif',         label: 'Notifications' },
  { id: 'payments',      label: 'Payments' },
  { id: 'integrations',  label: 'Integrations' },
  { id: 'security',      label: 'Security' },
];
const activeTab = ref('general');

// ——— General ———
const company = reactive({ name: 'Lumière Studio SL', email: 'hola@lumiere.com', phone: '+34 600 000 000', currency: 'EUR (€)' });
const savedGeneral = ref(false);
function saveGeneral() {
  savedGeneral.value = true;
  setTimeout(() => (savedGeneral.value = false), 2000);
}

// ——— Notificaciones ———
const notifications = reactive([
  { label: 'New order',       desc: 'Receive an email whenever a new order comes in.',        enabled: true  },
  { label: 'Order shipped',   desc: 'Notify when the carrier picks up a shipment.',            enabled: true  },
  { label: 'Low stock',       desc: 'Alert when a product has fewer than 5 units left.',       enabled: true  },
  { label: 'Weekly summary',  desc: 'Email with your business metrics every Monday.',          enabled: false },
  { label: 'Customer reviews',desc: 'Notify when a customer leaves a review.',                 enabled: false },
]);

// ——— Pagos ———
const billing = reactive({ taxId: 'B12345678', email: 'billing@lumiere.com', address: 'Carrer de Mallorca 401, Barcelona' });
const savedBilling = ref(false);

// ——— Integraciones ———
const integrations = reactive([
  { name: 'Stripe',           icon: 'credit-card',    desc: 'Process payments and sync transactions automatically.', connected: true  },
  { name: 'Slack',             icon: 'message-circle', desc: 'Get order and low-stock alerts in your team channel.',  connected: true  },
  { name: 'Mailchimp',         icon: 'mail',            desc: 'Sync customers to your email marketing lists.',        connected: false },
  { name: 'Google Analytics',  icon: 'trending-up',     desc: 'Track store traffic and conversion sources.',          connected: true  },
  { name: 'Zapier',            icon: 'zap',             desc: 'Connect Console to 5,000+ apps.',                      connected: false },
  { name: 'QuickBooks',        icon: 'file-text',       desc: 'Export invoices and expenses automatically.',          connected: false },
]);

// ——— Seguridad ———
const security = reactive({ current: '', next: '', confirm: '' });
const securityError = ref('');
const securitySuccess = ref(false);

function changePassword() {
  securitySuccess.value = false;
  if (security.next.length < 8) {
    securityError.value = 'Password must be at least 8 characters.';
    return;
  }
  if (security.next !== security.confirm) {
    securityError.value = 'Passwords do not match.';
    return;
  }
  securityError.value = '';
  securitySuccess.value = true;
  security.current = ''; security.next = ''; security.confirm = '';
  setTimeout(() => (securitySuccess.value = false), 2500);
}

const twoFactorEnabled = ref(true);

const sessions = reactive([
  { id: 1, device: 'Chrome · Windows', location: 'Madrid, Spain' },
  { id: 2, device: 'Safari · iPhone',  location: 'Barcelona, Spain' },
  { id: 3, device: 'Firefox · macOS',  location: 'Valencia, Spain' },
]);
</script>

<style scoped>
.config-view { max-width: 780px; }

.config-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 20px;
  flex-wrap: wrap;
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

.config-section-group { display: flex; flex-direction: column; gap: 16px; }

.config-section__title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
}

.config-section__subtitle {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 18px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 14px;
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
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.save-confirm { font-size: 12px; color: var(--color-success); font-weight: 600; }
.save-error   { font-size: 12px; color: var(--color-danger); font-weight: 600; }

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

.toggle-switch { position: relative; display: inline-block; width: 38px; height: 22px; cursor: pointer; flex-shrink: 0; }
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

/* Pagos */
.plan-row { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; }
.plan-name { font-size: 14px; font-weight: 700; }
.plan-renew { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

.payment-method { display: flex; align-items: center; gap: 12px; margin-top: 12px; }
.payment-method__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--bg-page);
  color: var(--text-secondary);
  flex-shrink: 0;
}
.payment-method__number { font-size: 13px; font-weight: 600; }
.payment-method__exp { font-size: 12px; color: var(--text-muted); }

/* Integraciones */
.integrations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.integration-card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.integration-card__head { display: flex; align-items: center; gap: 10px; }
.integration-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--bg-page);
  color: var(--color-info);
  flex-shrink: 0;
}
.integration-card__name { font-size: 13px; font-weight: 600; }
.integration-card__desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; flex: 1; }

/* Seguridad */
.session-list { display: flex; flex-direction: column; margin-top: 8px; }

.session-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}
.session-item:last-child { border-bottom: none; }

.session-device { font-size: 13px; font-weight: 500; }
.session-location { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.session-current { color: var(--color-success); font-weight: 600; }

.action-link {
  background: none;
  border: none;
  color: var(--color-danger);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

@media (max-width: 600px) {
  .form-grid { grid-template-columns: 1fr; }
}
</style>
