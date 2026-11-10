import { useEffect, useRef } from 'react';
import { useFrame } from '../../hooks/useFrame.js';
import { requestFrame } from '../../lib/frameLoop.js';
import { finePointer, reduceMotion } from '../../lib/env.js';
import { clamp } from '../../lib/text.js';
import { SplitTitle } from './SplitTitle.jsx';
import './Hero.css';

/* Cordilleras del paisaje. `near` (0-1) controla cuánto se desplaza cada capa. */
const RIDGES = [
  {
    near: 0.3, cls: 'ridge--back', viewBox: '0 0 1440 420',
    d: 'M0 420V300C90 285 170 262 250 278C320 292 370 300 420 240C450 200 470 170 495 140C505 128 525 128 535 140C560 172 590 215 620 262C660 320 720 300 800 290C880 280 940 240 1010 252C1080 264 1130 300 1200 280C1270 260 1320 215 1370 228C1400 236 1425 250 1440 258V420Z',
  },
  {
    near: 0.55, cls: 'ridge--mid', viewBox: '0 0 1440 320',
    d: 'M0 320V210C80 190 150 140 220 120C250 112 270 114 290 128C340 165 380 215 450 230C540 250 600 200 680 190C760 180 800 225 880 232C970 240 1030 170 1100 140C1135 125 1160 125 1185 142C1240 182 1300 215 1370 210C1405 208 1425 200 1440 195V320Z',
  },
  {
    near: 0.85, cls: 'ridge--front', viewBox: '0 0 1440 200',
    d: 'M0 200V120C120 100 220 130 340 125C460 120 520 80 640 90C760 100 820 140 960 138C1100 136 1200 90 1320 96C1370 98 1410 108 1440 118V200Z',
  },
];
const SUN_NEAR = 0.1;
const TITLE = ['Sala de la', 'Memoria Nacional'];

export function Hero() {
  const layers = useRef([]);
  const content = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!finePointer) return;
    const onMove = e => {
      pointer.current = { x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 };
      if (scrollY < innerHeight) requestFrame();
    };
    addEventListener('pointermove', onMove, { passive: true });
    return () => removeEventListener('pointermove', onMove);
  }, []);

  useFrame(() => {
    const sy = scrollY;
    if (reduceMotion || sy >= innerHeight * 1.2) return;
    const vh = innerHeight;
    const { x: mx, y: my } = pointer.current;
    // Solo escrituras: se aplican tras las lecturas del resto de suscriptores.
    return () => {
      layers.current.forEach(el => {
        if (!el) return;
        const near = +el.dataset.near;
        const x = -mx * near * 26;
        const y = sy * (0.5 - near * 0.45) - my * near * 12;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
      const k = clamp(sy / (vh * 0.7), 0, 1);
      content.current.style.opacity = (1 - k).toFixed(3);
      content.current.style.transform = `translateY(${(sy * 0.22).toFixed(1)}px)`;
    };
  });

  return (
    <header className="hero" id="inicio">
      <div className="hero__sky" />

      <div className="layer layer--sun" data-near={SUN_NEAR} ref={el => { layers.current[0] = el; }}>
        <div className="sun" />
      </div>
      {RIDGES.map((r, i) => (
        <div className="layer" data-near={r.near} key={r.cls} ref={el => { layers.current[i + 1] = el; }}>
          <svg viewBox={r.viewBox} preserveAspectRatio="none" className={`ridge ${r.cls}`} aria-hidden="true">
            <path d={r.d} />
          </svg>
        </div>
      ))}

      <div className="hero__content" ref={content}>
        <p className="eyebrow fade-in" style={{ '--d': '.2s' }}>Nicaragua · Memoria viva</p>
        <SplitTitle lines={TITLE} />
        <p className="lead fade-in" style={{ '--d': '1.9s' }}>
          Un hogar de luz para quienes entregaron la vida por la patria y para quienes la hicieron grande con su palabra, su valentía y su ejemplo.
        </p>
        <div className="fade-in" style={{ '--d': '2.3s' }}>
          <a className="btn" href="#galeria">Entrar a la sala</a>
        </div>
      </div>

      <a className="cue" href="#entrada" aria-label="Seguir bajando"><span /></a>
    </header>
  );
}
