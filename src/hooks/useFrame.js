import { useEffect, useRef } from 'react';
import { subscribeFrame } from '../lib/frameLoop.js';

/**
 * Ejecuta `callback` en cada frame en que haya habido scroll o resize.
 * El callback debe solo leer el DOM y devolver, si hace falta, una función
 * que escriba (ver lib/frameLoop.js).
 */
export function useFrame(callback) {
  const ref = useRef(callback);
  useEffect(() => { ref.current = callback; });
  useEffect(() => subscribeFrame(() => ref.current()), []);
}
