/* Capa ambiental fija: barra de progreso, foco de luz que sigue al cursor
   y luciérnagas. Todo se actualiza fuera del ciclo de render de React. */
import { useEffect, useRef } from 'react';
import { useFrame } from '../hooks/useFrame.js';
import { finePointer, reduceMotion } from '../lib/env.js';
import { clamp } from '../lib/text.js';
import './Ambient.css';

export function ScrollProgress() {
  const ref = useRef(null);
  useFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    ref.current.style.setProperty('--sp', max > 0 ? (scrollY / max).toFixed(4) : 0);
  });
  return <div className="progress" ref={ref} aria-hidden="true" />;
}

export function Spotlight() {
  const ref = useRef(null);
  useEffect(() => {
    if (!finePointer) return;
    const el = ref.current;
    const onMove = e => {
      el.style.setProperty('--mx', e.clientX + 'px');
      el.style.setProperty('--my', e.clientY + 'px');
    };
    addEventListener('pointermove', onMove, { passive: true });
    return () => removeEventListener('pointermove', onMove);
  }, []);
  return <div className="spot" ref={ref} aria-hidden="true" />;
}

function makeSprite() {
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 64;
  const sc = sprite.getContext('2d');
  const g = sc.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,240,170,1)');
  g.addColorStop(0.22, 'rgba(255,205,100,.6)');
  g.addColorStop(1, 'rgba(255,170,60,0)');
  sc.fillStyle = g;
  sc.fillRect(0, 0, 64, 64);
  return sprite;
}

export function Fireflies() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const sprite = makeSprite();
    let w = 0, h = 0, last = 0, raf = 0;
    const flies = [];
    const spawn = (anywhere = true) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 20,
      r: 5 + Math.random() * 13,
      vy: -(5 + Math.random() * 15),
      vx: (Math.random() - 0.5) * 10,
      ph: Math.random() * 6.28,
      sp: 0.5 + Math.random() * 1.3,
      a: 0.35 + Math.random() * 0.6,
    });

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(clamp((w * h) / 26000, 18, 70));
      while (flies.length < n) flies.push(spawn());
      flies.length = n;
    }

    function frame(t) {
      const dt = Math.min(0.05, (t - last) / 1000 || 0);
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (const f of flies) {
        f.ph += dt * f.sp;
        f.x += (f.vx + Math.sin(f.ph * 1.7) * 14) * dt;
        f.y += f.vy * dt;
        if (f.y < -30 || f.x < -30 || f.x > w + 30) Object.assign(f, spawn(false));
        const tw = 0.5 + 0.5 * Math.sin(f.ph * 2.2);
        ctx.globalAlpha = f.a * (0.25 + 0.75 * tw);
        ctx.drawImage(sprite, f.x - f.r, f.y - f.r, f.r * 2, f.r * 2);
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    addEventListener('resize', resize);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
    };
  }, []);

  if (reduceMotion) return null;
  return <canvas className="fireflies" ref={ref} aria-hidden="true" />;
}
