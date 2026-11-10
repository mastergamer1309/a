/* Ficha de una persona en un <dialog> modal nativo.
   Este módulo se carga de forma diferida (React.lazy) desde App. */
import { useEffect, useRef, useState } from 'react';
import { CloseIcon, NextIcon, PrevIcon } from '../../components/icons.jsx';
import { ERAS_BY_ID, TYPE_LABEL, getPerson } from '../../data/index.js';
import { closePerson, stepPerson, useDialogState } from '../../state/dialog.js';
import { Portrait } from '../portrait/Portrait.jsx';
import { LightButton } from './LightButton.jsx';
import './PersonDialog.css';

const TOUR_MS = 14000;
const SIZES = '(max-width: 760px) 62vw, 330px';

export default function PersonDialog() {
  const { open, ids, index } = useDialogState();
  const [tour, setTour] = useState(false);
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const person = getPerson(ids[index]);

  // Sincroniza el estado con el <dialog> nativo.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (open && !dlg.open) dlg.showModal();
    else if (!open && dlg.open) dlg.close();
  }, [open]);

  // Todo cierre (botón, Esc, fondo, closePerson) pasa por el evento close.
  const onClose = () => {
    setTour(false);
    closePerson();
  };

  // Cada ficha nueva empieza arriba.
  useEffect(() => { panelRef.current?.scrollTo(0, 0); }, [index, ids]);

  // Recorrido automático: avanza solo cada TOUR_MS.
  useEffect(() => {
    if (!open || !tour) return;
    const t = setTimeout(() => stepPerson(1), TOUR_MS);
    return () => clearTimeout(t);
  }, [open, tour, index, ids]);

  // Flechas del teclado para navegar.
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'ArrowRight') stepPerson(1);
      else if (e.key === 'ArrowLeft') stepPerson(-1);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  const era = person && ERAS_BY_ID.get(person.era);
  let k = 0; // orden de la animación escalonada

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="dlgTitle"
      onClose={onClose}
      onClick={e => { if (e.target === e.currentTarget) closePerson(); }}
    >
      {open && person && (
        <div className="dlg" ref={panelRef} style={{ '--h': person.hue }}>
          {tour && (
            <div className="dlg__tour" aria-hidden="true">
              <i key={person.id} style={{ '--t': `${TOUR_MS}ms` }} />
            </div>
          )}
          <button className="round dlg__close" type="button" onClick={closePerson} aria-label="Cerrar ficha">
            <CloseIcon />
          </button>

          {/* key: al cambiar de persona se reinician las animaciones de entrada */}
          <div className="dlg__grid" key={person.id}>
            <div className="dlg__art">
              <span className="niche__frame">
                <span className="niche__window"><Portrait person={person} sizes={SIZES} eager /></span>
              </span>
            </div>
            <div className="dlg__body">
              <p className={`dlg__badge ${person.tipo}`} style={{ '--k': k++ }}>
                <i />{TYPE_LABEL[person.tipo]} · {era?.nombre}
              </p>
              <h3 className="dlg__title" id="dlgTitle" style={{ '--k': k++ }}>{person.nombre}</h3>
              <p className="dlg__meta" style={{ '--k': k++ }}>{person.anios} · {person.rol}</p>
              <p className="dlg__lead" style={{ '--k': k++ }}>{person.resumen}</p>
              <div className="dlg__bio" style={{ '--k': k++ }}>
                {person.bio.map((t, i) => <p key={i}>{t}</p>)}
              </div>
              <dl className="facts" style={{ '--k': k++ }}>
                {person.datos.map(([a, b]) => (
                  <div key={a}><dt>{a}</dt><dd>{b}</dd></div>
                ))}
              </dl>
              {person.frase && (
                <blockquote className="dlg__quote" style={{ '--k': k++ }}>
                  «{person.frase.t}»<cite>{person.frase.a}</cite>
                </blockquote>
              )}
              <div className="dlg__actions" style={{ '--k': k }}>
                <LightButton id={person.id} />
                <button className="btn btn--ghost" type="button" aria-pressed={tour} onClick={() => setTour(t => !t)}>
                  {tour ? 'Detener recorrido' : 'Recorrido automático'}
                </button>
              </div>
            </div>
          </div>

          <div className="dlg__bar">
            <button className="round" type="button" onClick={() => stepPerson(-1)} aria-label="Anterior"><PrevIcon /></button>
            <span className="dlg__count">{index + 1} / {ids.length}</span>
            <button className="round" type="button" onClick={() => stepPerson(1)} aria-label="Siguiente"><NextIcon /></button>
          </div>
        </div>
      )}
    </dialog>
  );
}
