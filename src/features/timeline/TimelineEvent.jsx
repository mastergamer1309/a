import { memo } from 'react';
import { getPerson } from '../../data/index.js';
import { useInView } from '../../hooks/useInView.js';
import { openPerson } from '../../state/dialog.js';

/** Hecho de la línea del tiempo; entra desde su lado al aparecer en pantalla. */
export const TimelineEvent = memo(function TimelineEvent({ event: ev }) {
  const [ref, seen] = useInView();
  const people = ev.personas.map(getPerson).filter(Boolean);

  return (
    <article ref={ref} className={seen ? 'tl in' : 'tl'} data-type={ev.tipo}>
      <span className="tl__dot" />
      <div className="tl__card">
        <span className="tl__year">{ev.anio}</span>
        <h3>{ev.titulo}</h3>
        <p>{ev.texto}</p>
        {people.length > 0 && (
          <div className="tl__chips">
            {people.map(p => (
              <button key={p.id} className="chip" type="button" onClick={() => openPerson(p.id)}>
                {p.corto}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
});
