/* Velas encendidas: estado global persistido en localStorage y
   sincronizado entre pestañas. */
import { createStore, useStore } from '../lib/createStore.js';
import { PEOPLE, PEOPLE_BY_ID } from '../data/index.js';

const KEY = 'sala-memoria:velas';

function load() {
  try {
    const ids = JSON.parse(localStorage.getItem(KEY) || '[]');
    return new Set(Array.isArray(ids) ? ids.filter(id => PEOPLE_BY_ID.has(id)) : []);
  } catch {
    return new Set();
  }
}

const store = createStore(load());

store.subscribe(() => {
  try { localStorage.setItem(KEY, JSON.stringify([...store.get()])); } catch { /* sin almacenamiento */ }
});

if (typeof window !== 'undefined') {
  addEventListener('storage', e => { if (e.key === KEY) store.set(load()); });
}

export function setLit(id, on) {
  store.set(prev => {
    if (prev.has(id) === on) return prev;
    const next = new Set(prev);
    if (on) next.add(id); else next.delete(id);
    return next;
  });
}

export const toggleLit = id => setLit(id, !store.get().has(id));
export const isLit = id => store.get().has(id);
export const litCount = () => store.get().size;
export const unlitIds = () => PEOPLE.filter(p => !store.get().has(p.id)).map(p => p.id);
export const clearAll = () => store.set(new Set());

/** true si la vela de `id` está encendida. Solo re-renderiza si cambia. */
export const useIsLit = id => useStore(store, s => s.has(id));
export const useLitCount = () => useStore(store, s => s.size);
