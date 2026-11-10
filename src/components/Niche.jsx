import { memo } from 'react';
import Flame from './Flame.jsx';
import Portrait from './Portrait.jsx';
import { TYPE_LABEL } from '../lib/utils.js';

function Niche({ person: p, index, isLit, onOpen }) {
  return (
    <li className="niche reveal" data-type={p.tipo} style={{ '--h': p.hue, '--d': index % 4 }}>
      <button
        className={'niche__btn' + (isLit ? ' is-lit' : '')}
        type="button"
        data-id={p.id}
        aria-label={`Abrir la ficha de ${p.nombre}`}
        onClick={() => onOpen(p.id)}
      >
        <span className="niche__frame">
          <span className="niche__flame" aria-hidden="true"><Flame /></span>
          <span className="niche__window">
            <Portrait person={p} />
            <span className="niche__sum">{p.resumen}</span>
          </span>
        </span>
        <span className="niche__plaque">
          <span className="niche__type">{TYPE_LABEL[p.tipo]}</span>
          <strong className="niche__name">{p.nombre}</strong>
          <span className="niche__years">{p.anios}</span>
        </span>
      </button>
    </li>
  );
}

export default memo(Niche);
