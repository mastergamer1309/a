import { useEffect, useRef } from 'react';
import { requestFrame } from '../lib/frameLoop.js';

/**
 * Devuelve un ref cuyo `.current` indica si el elemento de `targetRef` está
 * cerca de la pantalla. No provoca renders: sirve para que los callbacks de
 * useFrame no lean la geometría de secciones ocultas (eso forzaría su layout
 * aunque tengan content-visibility: auto).
 */
export function useOnScreenRef(targetRef, rootMargin = '200px 0px') {
  const onScreen = useRef(false);
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting;
      if (entry.isIntersecting) requestFrame();
    }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [targetRef, rootMargin]);
  return onScreen;
}
