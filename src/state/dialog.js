/* Ficha abierta: qué persona y con qué lista se navega (anterior / siguiente). */
import { createStore, useStore } from '../lib/createStore.js';
import { PEOPLE } from '../data/index.js';

const ALL_IDS = PEOPLE.map(p => p.id);

/** ids visibles en la galería según los filtros actuales. */
let visibleIds = ALL_IDS;
export function setVisibleIds(ids) { visibleIds = ids; }

const store = createStore({ open: false, ids: ALL_IDS, index: 0 });

/** Abre la ficha. Si la persona está en la galería filtrada, se navega por ella. */
export function openPerson(id) {
  const ids = visibleIds.includes(id) ? visibleIds : ALL_IDS;
  const index = ids.indexOf(id);
  if (index < 0) return;
  store.set({ open: true, ids, index });
}

export function stepPerson(dir) {
  store.set(s => ({ ...s, index: (s.index + dir + s.ids.length) % s.ids.length }));
}

export function closePerson() {
  store.set(s => (s.open ? { ...s, open: false } : s));
}

export const useDialogState = () => useStore(store);
export const useDialogOpen = () => useStore(store, s => s.open);
