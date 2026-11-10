import { useEffect, useRef } from 'react';
import { subscribeFrame } from '../lib/frameLoop.js';

/** Ejecuta `callback` en cada frame en que haya habido scroll o resize. */
export function useFrame(callback) {
  const ref = useRef(callback);
  useEffect(() => { ref.current = callback; });
  useEffect(() => subscribeFrame(() => ref.current()), []);
}
