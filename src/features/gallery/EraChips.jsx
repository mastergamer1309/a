import { ERAS } from '../../data/index.js';

/** Filtro por época. `value` 0 significa todas. */
export function EraChips({ value, onChange }) {
  return (
    <div className="chips" role="group" aria-label="Filtrar por época">
      <button className="chip" type="button" aria-pressed={value === 0} onClick={() => onChange(0)}>
        Todas las épocas
      </button>
      {ERAS.map(e => (
        <button
          key={e.id}
          className="chip"
          type="button"
          title={e.rango}
          aria-pressed={value === e.id}
          onClick={() => onChange(e.id)}
        >
          {e.nombre}
        </button>
      ))}
    </div>
  );
}
