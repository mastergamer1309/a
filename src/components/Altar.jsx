import { memo, useEffect, useRef } from 'react';
import { PEOPLE } from '../data.js';
import { reduceMotion } from '../lib/utils.js';

const Candle = memo(function Candle({ person, isLit, onToggle }) {
  return (
    <button
      className={'candle' + (isLit ? ' lit' : '')}
      type="button"
      aria-pressed={isLit}
      aria-label={`Vela por ${person.nombre}`}
      onClick={() => onToggle(person.id, !isLit)}
    >
      <span className="candle__body"><span className="cflame" /></span>
      <span className="candle__label">{person.corto}</span>
    </button>
  );
});

export default function Altar({ lit, setLit }) {
  const timers = useRef([]);
  const n = lit.size;
  const all = n === PEOPLE.length;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function toggleAll() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (all) { PEOPLE.forEach(p => setLit(p.id, false)); return; }
    PEOPLE.filter(p => !lit.has(p.id)).forEach((p, i) => {
      timers.current.push(setTimeout(() => setLit(p.id, true), reduceMotion ? 0 : i * 110));
    });
  }

  return (
    <section className="section" id="velas">
      <div className="wrap narrow">
        <header className="center">
          <p className="kicker reveal">Un gesto de gratitud</p>
          <h2 className="title reveal" style={{ '--d': 1 }}>El altar de las velas</h2>
          <p className="sub reveal" style={{ '--d': 2 }}>Enciende una vela por cada persona que quieras recordar. Tus velas quedan guardadas en este navegador.</p>
        </header>
        <div className="altar reveal" style={{ '--d': 3, '--glow': (n / PEOPLE.length).toFixed(3) }}>
          <div className="candles">
            {PEOPLE.map(p => <Candle person={p} isLit={lit.has(p.id)} onToggle={setLit} key={p.id} />)}
          </div>
          <p className="altar__msg" aria-live="polite">
            {all ? 'Hoy, cada llama recuerda a quienes hicieron Nicaragua.' : n === 0 ? '' : 'Cada vela es un gracias.'}
          </p>
          <div className="altar__bar">
            <span className="altar__count"><b>{n}</b> velas encendidas</span>
            <button className="btn btn--flame" type="button" onClick={toggleAll}>{all ? 'Apagar todas' : 'Encender todas'}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
