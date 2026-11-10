import { useCallback, useState } from 'react';

/* Un IntersectionObserver compartido por cada configuración distinta,
   en lugar de uno por elemento. */
const observers = new Map();

function getObserver(threshold, rootMargin) {
  const key = `${threshold}|${rootMargin}`;
  let entry = observers.get(key);
  if (!entry) {
    const callbacks = new WeakMap();
    const io = new IntersectionObserver(entries => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        io.unobserve(en.target);
        callbacks.get(en.target)?.();
      }
    }, { threshold, rootMargin });
    entry = { io, callbacks };
    observers.set(key, entry);
  }
  return entry;
}

/**
 * Devuelve [ref, visto]. `visto` pasa a true la primera vez que el
 * elemento entra en pantalla y ya no vuelve a cambiar.
 */
export function useInView({ threshold = 0.12, rootMargin = '0px 0px -6% 0px' } = {}) {
  const [seen, setSeen] = useState(false);
  const ref = useCallback(el => {
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const { io, callbacks } = getObserver(threshold, rootMargin);
    callbacks.set(el, () => setSeen(true));
    io.observe(el);
    return () => { io.unobserve(el); callbacks.delete(el); };
  }, [threshold, rootMargin]);
  return [ref, seen];
}
