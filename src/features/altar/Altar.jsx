import { useEffect, useRef } from 'react';
import { Reveal } from '../../components/Reveal.jsx';
import { SectionHeader } from '../../components/SectionHeader.jsx';
import { PEOPLE } from '../../data/index.js';
import { reduceMotion } from '../../lib/env.js';
import { clearAll, setLit, unlitIds, useLitCount } from '../../state/candles.js';
import { Candle } from './Candle.jsx';
import './Altar.css';

const TOTAL = PEOPLE.length;
const STAGGER_MS = 110;

function message(n) {
  if (n === TOTAL) return 'Hoy, cada llama recuerda a quienes hicieron Nicaragua.';
  return n === 0 ? '' : 'Cada vela es un gracias.';
}

export function Altar() {
  const count = useLitCount();
  const allLit = count === TOTAL;
  const timers = useRef([]);

  const cancelStagger = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => cancelStagger, []);

  const toggleAll = () => {
    cancelStagger();
    if (allLit) { clearAll(); return; }
    // Las velas se encienden una tras otra.
    timers.current = unlitIds().map((id, i) =>
      setTimeout(() => setLit(id, true), reduceMotion ? 0 : i * STAGGER_MS),
    );
  };

  return (
    <section className="section section--lazy" id="velas">
      <div className="wrap narrow">
        <SectionHeader
          kicker="Un gesto de gratitud"
          title="El altar de las velas"
          sub="Enciende una vela por cada persona que quieras recordar. Tus velas quedan guardadas en este navegador."
        />
        <Reveal className="altar" delay={3} style={{ '--glow': (count / TOTAL).toFixed(3) }}>
          <div className="candles">
            {PEOPLE.map(p => <Candle key={p.id} person={p} />)}
          </div>
          <p className="altar__msg" aria-live="polite">{message(count)}</p>
          <div className="altar__bar">
            <span className="altar__count"><b>{count}</b> velas encendidas</span>
            <button className="btn btn--flame" type="button" onClick={toggleAll}>
              {allLit ? 'Apagar todas' : 'Encender todas'}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
