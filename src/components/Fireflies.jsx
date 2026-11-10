import { useEffect, useRef } from 'react';
import { clamp, reduceMotion } from '../lib/utils.js';

/* Luciérnagas en canvas. Se pausa cuando la pestaña no está visible. */
export default function Fireflies() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 64;
    const sc = sprite.getContext('2d');
    const g = sc.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,240,170,1)');
    g.addColorStop(.22, 'rgba(255,205,100,.6)');
    g.addColorStop(1, 'rgba(255,170,60,0)');
    sc.fillStyle = g;
    sc.fillRect(0, 0, 64, 64);

    let w = 0, h = 0, last = 0, raf = 0;
    const flies = [];
    const spawn = (anywhere = true) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 20,
      r: 5 + Math.random() * 13,
      vy: -(5 + Math.random() * 15),
      vx: (Math.random() - .5) * 10,
      ph: Math.random() * 6.28,
      sp: .5 + Math.random() * 1.3,
      a: .35 + Math.random() * .6
    });
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(clamp(w * h / 26000, 18, 70));
      while (flies.length < n) flies.push(spawn());
      flies.length = n;
    }
    function frame(t) {
      const dt = Math.min(.05, (t - last) / 1000 || 0);
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (const f of flies) {
        f.ph += dt * f.sp;
        f.x += (f.vx + Math.sin(f.ph * 1.7) * 14) * dt;
        f.y += f.vy * dt;
        if (f.y < -30 || f.x < -30 || f.x > w + 30) Object.assign(f, spawn(false));
        const tw = .5 + .5 * Math.sin(f.ph * 2.2);
        ctx.globalAlpha = f.a * (.25 + .75 * tw);
        ctx.drawImage(sprite, f.x - f.r, f.y - f.r, f.r * 2, f.r * 2);
      }
      raf = requestAnimationFrame(frame);
    }
    function onVisibility() {
      cancelAnimationFrame(raf);
      if (!document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); }
    }

    resize();
    addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  if (reduceMotion) return null;
  return <canvas id="fireflies" ref={ref} aria-hidden="true" />;
}
