import { useCallback, useEffect, useState } from 'react';
import { byId } from '../data-index.js';

const KEY = 'sala-memoria:velas';

function load() {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]').filter(id => byId[id])); }
  catch { return new Set(); }
}

/* Velas encendidas, guardadas en el navegador */
export function useLitCandles() {
  const [lit, setLitState] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify([...lit])); } catch { /* sin almacenamiento */ }
  }, [lit]);

  const setLit = useCallback((id, on) => {
    setLitState(prev => {
      if (prev.has(id) === on) return prev;
      const next = new Set(prev);
      if (on) next.add(id); else next.delete(id);
      return next;
    });
  }, []);

  return [lit, setLit];
}
