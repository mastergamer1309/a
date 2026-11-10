import { useCallback, useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView.js';
import { reduceMotion } from '../../lib/env.js';
import { clamp } from '../../lib/text.js';

const DURATION = 1600;
const COUNT_VIEW = { threshold: 0.6, rootMargin: '0px' };

/** Cifra que cuenta desde 0 (con desaceleración) cuando entra en pantalla. */
export function Stat({ value, label, suffix = '', delay }) {
  const [revealRef, revealed] = useInView();
  const [countRef, counting] = useInView(COUNT_VIEW);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!counting || reduceMotion) return;
    const t0 = performance.now();
    let raf = 0;
    const step = t => {
      const k = clamp((t - t0) / DURATION, 0, 1);
      setShown(Math.round(value * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [counting, value]);

  const ref = useCallback(el => {
    const a = revealRef(el);
    const b = countRef(el);
    return () => { a?.(); b?.(); };
  }, [revealRef, countRef]);

  return (
    <li ref={ref} className={revealed ? 'reveal in' : 'reveal'} style={{ '--d': delay }}>
      <b>{(reduceMotion && counting ? value : shown) + suffix}</b>
      <span>{label}</span>
    </li>
  );
}
