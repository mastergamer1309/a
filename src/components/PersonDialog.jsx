import { useEffect, useRef, useState } from 'react';
import { eraOf } from '../data-index.js';
import { reduceMotion, TYPE_LABEL } from '../lib/utils.js';
import Flame from './Flame.jsx';
import Portrait from './Portrait.jsx';

const TOUR_MS = 14000;

function sparks(btn) {
  if (reduceMotion || !btn) return;
  for (let i = 0; i < 16; i++) {
    const s = document.createElement('i');
    s.className = 'spark';
    const a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 60;
    s.style.setProperty('--dx', Math.cos(a) * d + 'px');
    s.style.setProperty('--dy', Math.sin(a) * d - 20 + 'px');
    s.style.animationDelay = Math.random() * .12 + 's';
    btn.appendChild(s);
    setTimeout(() => s.remove(), 1100);
  }
}

/* Ficha de una persona. `view` = { list, index } o null si está cerrada. */
export default function PersonDialog({ view, setView, lit, setLit }) {
  const dlg = useRef(null);
  const lightBtn = useRef(null);
  const [tour, setTour] = useState(false);
  const open = !!view;
  const p = view ? view.list[view.index] : null;

  const step = dir => setView(v => v && { ...v, index: (v.index + dir + v.list.length) % v.list.length });
  const close = () => setView(null);

  // abrir / cerrar el <dialog> nativo
  useEffect(() => {
    const d = dlg.current;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    if (!open) setTour(false);
  }, [open]);

  // recorrido automático
  useEffect(() => {
    if (!tour || !open) return;
    const t = setTimeout(() => step(1), TOUR_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour, open, view?.index]);

  // flechas del teclado
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // volver arriba al cambiar de persona
  useEffect(() => {
    dlg.current?.querySelector('.dlg')?.scrollTo(0, 0);
  }, [p?.id]);

  const isLit = p && lit.has(p.id);
  let k = 0;

  return (
    <dialog
      ref={dlg}
      aria-labelledby="dlgTitle"
      onClose={close}
      onClick={e => { if (e.target === dlg.current) close(); }}
    >
      {p && (
        <div className="dlg" style={{ '--h': p.hue }} key={p.id + ':' + tour}>
          {tour && <div className="dlg__tour" aria-hidden="true"><i style={{ '--t': TOUR_MS + 'ms' }} /></div>}
          <button className="round dlg__close" type="button" aria-label="Cerrar ficha" onClick={close}>
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div className="dlg__grid">
            <div className="dlg__art">
              <span className="niche__frame"><span className="niche__window"><Portrait person={p} /></span></span>
            </div>
            <div className="dlg__body">
              <p className={'dlg__badge ' + p.tipo} style={{ '--k': k++ }}><i />{TYPE_LABEL[p.tipo]} · {eraOf(p.era).nombre}</p>
              <h3 className="dlg__title" id="dlgTitle" style={{ '--k': k++ }}>{p.nombre}</h3>
              <p className="dlg__meta" style={{ '--k': k++ }}>{p.anios} · {p.rol}</p>
              <p className="dlg__lead" style={{ '--k': k++ }}>{p.resumen}</p>
              <div className="dlg__bio" style={{ '--k': k++ }}>{p.bio.map((t, i) => <p key={i}>{t}</p>)}</div>
              <dl className="facts" style={{ '--k': k++ }}>
                {p.datos.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}
              </dl>
              {p.frase && (
                <blockquote className="dlg__quote" style={{ '--k': k++ }}>«{p.frase.t}»<cite>{p.frase.a}</cite></blockquote>
              )}
              <div className="dlg__actions" style={{ '--k': k++ }}>
                <button
                  className="btn btn--flame"
                  type="button"
                  ref={lightBtn}
                  aria-pressed={isLit}
                  onClick={() => { setLit(p.id, !isLit); if (!isLit) sparks(lightBtn.current); }}
                >
                  <Flame />{isLit ? 'Vela encendida' : 'Encender una vela'}
                </button>
                <button className="btn btn--ghost" type="button" aria-pressed={tour} onClick={() => setTour(t => !t)}>
                  {tour ? 'Detener recorrido' : 'Recorrido automático'}
                </button>
              </div>
            </div>
          </div>
          <div className="dlg__bar">
            <button className="round" type="button" aria-label="Anterior" onClick={() => step(-1)}><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg></button>
            <span className="dlg__count">{view.index + 1} / {view.list.length}</span>
            <button className="round" type="button" aria-label="Siguiente" onClick={() => step(1)}><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      )}
    </dialog>
  );
}
