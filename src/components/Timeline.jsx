import { TIMELINE } from '../data.js';
import { byId } from '../data-index.js';

export default function Timeline({ ref, onOpen }) {
  return (
    <section className="section" id="tiempo">
      <div className="wrap">
        <header className="center">
          <p className="kicker reveal">Quinientos años en una línea</p>
          <h2 className="title reveal" style={{ '--d': 1 }}>El camino de la memoria</h2>
          <p className="sub reveal" style={{ '--d': 2 }}>Los hechos que marcaron la patria. Toca un nombre para abrir su ficha.</p>
        </header>
        <div className="legend reveal" style={{ '--d': 3 }} aria-hidden="true">
          <span><i className="dot dot--martir" />Sacrificio</span>
          <span><i className="dot dot--hist" />Hecho histórico</span>
          <span><i className="dot dot--cultura" />Cultura</span>
        </div>
        <div className="timeline" ref={ref}>
          {TIMELINE.map(ev => (
            <article className="tl" data-type={ev.tipo} key={ev.anio + ev.titulo}>
              <span className="tl__dot" />
              <div className="tl__card">
                <span className="tl__year">{ev.anio}</span>
                <h3>{ev.titulo}</h3>
                <p>{ev.texto}</p>
                {ev.personas?.length > 0 && (
                  <div className="tl__chips">
                    {ev.personas.map(id => (
                      <button className="chip" type="button" key={id} onClick={() => onOpen(id)}>{byId[id].corto}</button>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
          <div className="timeline__fill" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
