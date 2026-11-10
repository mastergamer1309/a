import { memo, useEffect, useRef, useState } from 'react';
import { PortraitArt } from './PortraitArt.jsx';
import { getPhoto } from './photos.js';
import './Portrait.css';

const MIME = { avif: 'image/avif', webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png' };

/**
 * Retrato de una persona. Dibuja la ilustración y, si hay foto real, la
 * superpone con un fundido. Cuando la foto ya es visible se retira la
 * ilustración para aligerar el DOM; si la foto falla, queda la ilustración.
 *
 * @param {{ person: object, sizes: string, eager?: boolean }} props
 */
export const Portrait = memo(function Portrait({ person, sizes, eager = false }) {
  const photo = getPhoto(person.id);
  const [status, setStatus] = useState('loading'); // loading | loaded | shown | error
  const imgRef = useRef(null);

  // Si la imagen ya estaba en caché, onLoad pudo dispararse antes de hidratar.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth) setStatus(s => (s === 'loading' ? 'loaded' : s));
  }, []);

  const visible = status === 'loaded' || status === 'shown';

  return (
    <span className="portrait">
      {status !== 'shown' && <PortraitArt person={person} />}
      {photo && status !== 'error' && (
        <picture>
          {Object.entries(photo.sources).map(([format, srcSet]) => (
            <source key={format} type={MIME[format]} srcSet={srcSet} sizes={sizes} />
          ))}
          <img
            ref={imgRef}
            className={visible ? 'photo ok' : 'photo'}
            src={photo.img.src}
            width={photo.img.w}
            height={photo.img.h}
            alt={`Retrato de ${person.nombre}`}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            style={person.fotoPosicion ? { objectPosition: person.fotoPosicion } : undefined}
            onLoad={() => setStatus(s => (s === 'loading' ? 'loaded' : s))}
            onError={() => setStatus('error')}
            onTransitionEnd={e => { if (e.propertyName === 'opacity') setStatus('shown'); }}
          />
        </picture>
      )}
    </span>
  );
});
