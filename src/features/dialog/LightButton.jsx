import { useEffect, useState } from 'react';
import { FlameIcon } from '../../components/icons.jsx';
import { reduceMotion } from '../../lib/env.js';
import { setLit, useIsLit } from '../../state/candles.js';

const SPARK_COUNT = 16;
const SPARK_LIFE_MS = 1100;

function makeSparks(seed) {
  return Array.from({ length: SPARK_COUNT }, (_, i) => {
    const a = Math.random() * Math.PI * 2;
    const d = 40 + Math.random() * 60;
    return {
      key: `${seed}-${i}`,
      style: {
        '--dx': Math.cos(a) * d + 'px',
        '--dy': Math.sin(a) * d - 20 + 'px',
        animationDelay: Math.random() * 0.12 + 's',
      },
    };
  });
}

/** Botón «Encender una vela» de la ficha, con chispas al encenderla. */
export function LightButton({ id }) {
  const lit = useIsLit(id);
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    if (!sparks.length) return;
    const t = setTimeout(() => setSparks([]), SPARK_LIFE_MS);
    return () => clearTimeout(t);
  }, [sparks]);

  const onClick = e => {
    const turnOn = !lit;
    setLit(id, turnOn);
    if (turnOn && !reduceMotion) setSparks(makeSparks(e.timeStamp));
  };

  return (
    <button className="btn btn--flame" type="button" aria-pressed={lit} onClick={onClick}>
      <FlameIcon />
      {lit ? 'Vela encendida' : 'Encender una vela'}
      {sparks.map(s => <i key={s.key} className="spark" style={s.style} />)}
    </button>
  );
}
