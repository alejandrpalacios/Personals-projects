import { writable } from 'svelte/store';
import { defaultLang } from '$lib/i18n/translations.js';
import { browser } from '$app/environment';

// Lee el idioma guardado en localStorage (solo en el browser)
const saved = browser ? (localStorage.getItem('lang') || defaultLang) : defaultLang;

export const lang = writable(saved);

// Sincroniza cambios con localStorage y el atributo lang del HTML
lang.subscribe(value => {
  if (browser) {
    localStorage.setItem('lang', value);
    document.documentElement.lang = value;
  }
});
