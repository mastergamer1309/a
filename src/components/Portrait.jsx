import { memo, useMemo, useState } from 'react';
import { art } from '../lib/art.js';
import { PHOTOS } from '../lib/photos.js';

/* Retrato ilustrado (SVG en línea para conservar sus animaciones) con la
   foto real encima si existe en src/assets/heroes/. */
function Portrait({ person }) {
  const svg = useMemo(() => ({ __html: art(person) }), [person]);
  const photo = PHOTOS[person.id];
  const [state, setState] = useState('loading');

  return (
    <span className="portrait">
      <span style={{ display: 'contents' }} dangerouslySetInnerHTML={svg} />
      {photo && state !== 'error' && (
        <img
          className={'photo' + (state === 'ok' ? ' ok' : '')}
          src={photo}
          alt={`Retrato de ${person.nombre}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
        />
      )}
    </span>
  );
}

export default memo(Portrait);
