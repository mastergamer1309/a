import { memo } from 'react';
import { Reveal } from '../../components/Reveal.jsx';
import { FlameIcon } from '../../components/icons.jsx';
import { TYPE_LABEL } from '../../data/index.js';
import { useIsLit } from '../../state/candles.js';
import { openPerson } from '../../state/dialog.js';
import { Portrait } from '../portrait/Portrait.jsx';

/* Ancho real del retrato: 2 columnas en móvil, ~214-300 px en escritorio. */
const SIZES = '(max-width: 560px) 46vw, 300px';

/** Nicho arqueado con retrato, placa y llama si su vela está encendida. */
export const Niche = memo(function Niche({ person: p, index }) {
  const lit = useIsLit(p.id);
  return (
    <Reveal as="li" className="niche" data-type={p.tipo} style={{ '--h': p.hue }} delay={index % 4}>
      <button
        className={lit ? 'niche__btn is-lit' : 'niche__btn'}
        type="button"
        onClick={() => openPerson(p.id)}
        aria-label={`Abrir la ficha de ${p.nombre}`}
      >
        <span className="niche__frame">
          <span className="niche__flame" aria-hidden="true"><FlameIcon /></span>
          <span className="niche__window">
            <Portrait person={p} sizes={SIZES} />
            <span className="niche__sum">{p.resumen}</span>
          </span>
        </span>
        <span className="niche__plaque">
          <span className="niche__type">{TYPE_LABEL[p.tipo]}</span>
          <strong className="niche__name">{p.nombre}</strong>
          <span className="niche__years">{p.anios}</span>
        </span>
      </button>
    </Reveal>
  );
});
