import { useEffect, useRef } from 'react';
import { ERAS, PEOPLE } from '../data.js';
import { clamp, reduceMotion } from '../lib/utils.js';

const martires = PEOPLE.filter(p => p.tipo === 'martir').length;
const STATS = [
  [martires, 'mártires y memoriales'],
  [PEOPLE.length - martires, 'influencias nacionales'],
  [ERAS.length, 'épocas de la historia'],
  [500, 'años de historia', '+']
];

/* Cuenta animada: escribe en el DOM con requestAnimationFrame, sin renders */
function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const b = ref.current;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      if (reduceMotion) { b.textContent = to + suffix; return; }
      const t0 = performance.now(), dur = 1600;
      const step = t => {
        const k = clamp((t - t0) / dur, 0, 1);
        b.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: .6 });
    io.observe(b);
    return () => io.disconnect();
  }, [to, suffix]);
  return <b ref={ref}>0{suffix}</b>;
}

export default function Intro() {
  return (
    <section className="section intro" id="entrada">
      <div className="wrap narrow">
        <p className="kicker reveal">Bienvenido a la sala</p>
        <h2 className="title reveal" style={{ '--d': 1 }}>Quien olvida su historia<br />pierde su camino</h2>
        <div className="orn reveal" style={{ '--d': 2 }} aria-hidden="true"><i /><b /><i /></div>
        <p className="intro__text reveal" style={{ '--d': 3 }}>
          Aquí descansan, en nichos de luz, los <strong>mártires</strong> que ofrendaron su vida por la soberanía y la libertad de Nicaragua,
          y las <strong>mayores influencias nacionales</strong>: caciques, heroínas, poetas y artistas que dieron forma a nuestra identidad.
          Pasa el cursor por cada retrato, ábrelo para conocer su historia y enciende una vela en su memoria.
        </p>
        <ul className="stats">
          {STATS.map(([n, label, suf], i) => (
            <li className="reveal" style={{ '--d': i + 4 }} key={label}>
              <Counter to={n} suffix={suf} /><span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
