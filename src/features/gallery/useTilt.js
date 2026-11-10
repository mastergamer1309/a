import { useEffect } from 'react';
import { finePointer, reduceMotion } from '../../lib/env.js';

const SELECTOR = '.niche__btn';

/**
 * Inclinación 3D de los nichos al pasar el cursor. Un solo par de listeners
 * delegados en el contenedor; escribe variables CSS sin re-renderizar.
 */
export function useTilt(containerRef) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !finePointer || reduceMotion) return;

    const onMove = e => {
      const b = e.target.closest(SELECTOR);
      if (!b) return;
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      b.style.setProperty('--rx', ((0.5 - y) * 11).toFixed(2) + 'deg');
      b.style.setProperty('--ry', ((x - 0.5) * 13).toFixed(2) + 'deg');
      b.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      b.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    };
    const onOut = e => {
      const b = e.target.closest(SELECTOR);
      if (b && !b.contains(e.relatedTarget)) {
        b.style.removeProperty('--rx');
        b.style.removeProperty('--ry');
      }
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerout', onOut);
    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerout', onOut);
    };
  }, [containerRef]);
}
