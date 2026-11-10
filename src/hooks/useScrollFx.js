import { useEffect } from 'react';
import { clamp, finePointer, reduceMotion } from '../lib/utils.js';

/* Barra de progreso, nav sólida, parallax de la portada, foco del cursor y
   relleno de la línea del tiempo. Todo se escribe directo en estilos dentro
   de un único requestAnimationFrame: cero renders de React al hacer scroll. */
export function useScrollFx({ progress, nav, hero, heroContent, timeline, spot }) {
  useEffect(() => {
    const layers = [...(hero.current?.querySelectorAll('.layer[data-near]') || [])];
    let mx = 0, my = 0, ticking = false;

    function update() {
      ticking = false;
      const sy = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.current?.style.setProperty('--sp', max > 0 ? (sy / max).toFixed(4) : 0);
      nav.current?.classList.toggle('solid', sy > 40);

      if (sy < innerHeight * 1.2 && !reduceMotion) {
        layers.forEach(l => {
          const near = +l.dataset.near;
          const x = -mx * near * 26;
          const y = sy * (0.5 - near * 0.45) - my * near * 12;
          l.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        });
        const hc = heroContent.current;
        if (hc) {
          const k = clamp(sy / (innerHeight * .7), 0, 1);
          hc.style.opacity = (1 - k).toFixed(3);
          hc.style.transform = `translateY(${(sy * .22).toFixed(1)}px)`;
        }
      }

      const tl = timeline.current;
      if (tl) {
        const r = tl.getBoundingClientRect();
        const p = clamp((innerHeight * .6 - r.top) / r.height, 0, 1);
        tl.style.setProperty('--p', p.toFixed(4));
      }
    }
    const schedule = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

    function onPointer(e) {
      spot.current?.style.setProperty('--mx', e.clientX + 'px');
      spot.current?.style.setProperty('--my', e.clientY + 'px');
      mx = e.clientX / innerWidth - .5;
      my = e.clientY / innerHeight - .5;
      if (scrollY < innerHeight) schedule();
    }

    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    if (finePointer) addEventListener('pointermove', onPointer, { passive: true });
    update();
    return () => {
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      removeEventListener('pointermove', onPointer);
    };
  }, [progress, nav, hero, heroContent, timeline, spot]);
}
