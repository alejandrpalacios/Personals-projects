<template>
  <div class="lang-selector" v-click-outside="closeMenu">
    <button
      class="lang-selector__toggle"
      @click="open = !open"
      :aria-expanded="open"
      aria-haspopup="listbox"
      aria-label="Select language"
    >
      <span>{{ languages[lang.value].flag }}</span>
      <span>{{ lang.value.toUpperCase() }}</span>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M1 3l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>

    <ul v-if="open" class="lang-selector__menu" role="listbox">
      <li v-for="(info, code) in languages" :key="code" role="option" :aria-selected="lang.value === code">
        <button
          class="lang-option"
          :class="{ 'lang-option--active': lang.value === code }"
          @click="select(code)"
        >
          {{ info.flag }} {{ info.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLang, languages } from '@/i18n/index.js';

const { lang, setLang } = useLang();
const open = ref(false);

function select(code) {
  setLang(code);
  open.value = false;
}

function closeMenu() {
  open.value = false;
}
</script>

<!-- Directiva click-outside registrada en main.js -->

<style scoped>
.lang-selector { position: relative; }

.lang-selector__toggle {
  display: flex;
  align-items: center;
  gap: 5px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: border-color 150ms, color 150ms;
}

.lang-selector__toggle:hover {
  border-color: var(--color-info);
  color: var(--text-primary);
}

.lang-selector__menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  list-style: none;
  padding: 4px;
  min-width: 140px;
  z-index: 200;
  box-shadow: var(--shadow-md);
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 7px 10px;
  border-radius: 5px;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  transition: background 150ms, color 150ms;
}

.lang-option:hover,
.lang-option--active {
  background: rgba(59, 130, 246, 0.08);
  color: var(--color-info);
  font-weight: 600;
}
</style>
