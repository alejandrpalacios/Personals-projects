import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'saved-properties';

function loadInitial() {
  if (!browser) return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

const { subscribe, update } = writable(loadInitial());

function persist(ids) {
  if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export const savedProperties = {
  subscribe,
  toggle(id) {
    update(ids => {
      const next = ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id];
      persist(next);
      return next;
    });
  },
  isSaved(ids, id) {
    return ids.includes(id);
  },
};
