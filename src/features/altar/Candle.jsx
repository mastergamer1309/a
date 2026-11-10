import { memo } from 'react';
import { toggleLit, useIsLit } from '../../state/candles.js';

/** Vela individual. Solo se re-renderiza cuando cambia su propio estado. */
export const Candle = memo(function Candle({ person }) {
  const lit = useIsLit(person.id);
  return (
    <button
      className={lit ? 'candle lit' : 'candle'}
      type="button"
      aria-pressed={lit}
      aria-label={`Vela por ${person.nombre}`}
      onClick={() => toggleLit(person.id)}
    >
      <span className="candle__body"><span className="cflame" /></span>
      <span className="candle__label">{person.corto}</span>
    </button>
  );
});
