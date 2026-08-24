<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-panel" role="dialog" aria-modal="true" :aria-label="title">
          <div class="modal-header">
            <h3 class="modal-title">{{ title }}</h3>
            <button class="modal-close" @click="$emit('close')" aria-label="Close dialog">
              <Icon name="x" :size="16" />
            </button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue';
import Icon from './Icon.vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, required: true },
});
const emit = defineEmits(['close']);

// Cierra con Escape
function handleKey(e) {
  if (e.key === 'Escape') emit('close');
}

watch(() => props.open, (isOpen) => {
  if (isOpen) document.addEventListener('keydown', handleKey);
  else document.removeEventListener('keydown', handleKey);
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 14, 23, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
}

.modal-panel {
  background: var(--bg-card);
  border-radius: 10px;
  width: 100%;
  max-width: 440px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(10, 14, 23, 0.2);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--bg-card);
}

.modal-title { font-size: 15px; font-weight: 600; }

.modal-close {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  transition: background 150ms, color 150ms;
}
.modal-close:hover { background: var(--bg-page); color: var(--text-primary); }

.modal-body { padding: 20px; }

.modal-enter-active, .modal-leave-active { transition: opacity 150ms ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-panel, .modal-leave-active .modal-panel { transition: transform 150ms ease; }
.modal-enter-from .modal-panel, .modal-leave-to .modal-panel { transform: scale(0.97) translateY(4px); }
</style>
