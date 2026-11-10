import { useSyncExternalStore } from 'react';

/**
 * Store mínimo compatible con useSyncExternalStore.
 * Los componentes se suscriben con un selector y solo se vuelven a
 * renderizar cuando cambia el valor que seleccionan.
 */
export function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    get: () => state,
    set(next) {
      const value = typeof next === 'function' ? next(state) : next;
      if (Object.is(value, state)) return;
      state = value;
      listeners.forEach(l => l());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const identity = s => s;

/** El selector debe devolver primitivos o referencias estables. */
export function useStore(store, selector = identity) {
  const read = () => selector(store.get());
  return useSyncExternalStore(store.subscribe, read, read);
}
