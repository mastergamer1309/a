import { memo, useEffect, useRef, useState } from 'react';
import { PortraitArt } from './PortraitArt.jsx';
import { getPhoto } from './photos.js';
import './Portrait.css';

const MIME = { avif: 'image/avif', webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png' };

/**
 * Retrato de una persona.
 * - Con foto real: mientras carga se ve un degradado ligero con su color
 *   (un solo nodo) y la foto aparece con un fundido.
 * - Sin foto, o si la foto falla: retrato ilustrado en SVG.
 * Dibujar la ilustración completa solo como relleno de carga costaba ~1000
 * nodos SVG en la galería y trababa la animación inicial.
 *
 * @param {{ person: object, sizes: string, eager?: boolean }} props
 */
export const Portrait = memo(function Portrait({ person, sizes, eager = false }) {
  const photo = getPhoto(person.id);
  const [status, setStatus] = useState('loading'); // loading | loaded | error
  const imgRef = useRef(null);

  // Si la imagen ya estaba en caché, onLoad pudo dispararse antes de hidratar.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth) setStatus(s => (s === 'loading' ? 'loaded' : s));
  }, []);

  if (!photo || status === 'error') {
    return <span className="portrait"><PortraitArt person={person} /></span>;
  }

  return (
    <span className="portrait">
      <span className="portrait__placeholder" style={{ '--ph': person.hue }} />
      <picture>
        {Object.entries(photo.sources).map(([format, srcSet]) => (
          <source key={format} type={MIME[format]} srcSet={srcSet} sizes={sizes} />
        ))}
        <img
          ref={imgRef}
          className={status === 'loaded' ? 'photo ok' : 'photo'}
          src={photo.img.src}
          width={photo.img.w}
          height={photo.img.h}
          alt={`Retrato de ${person.nombre}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          style={person.fotoPosicion ? { objectPosition: person.fotoPosicion } : undefined}
          onLoad={() => setStatus(s => (s === 'loading' ? 'loaded' : s))}
          onError={() => setStatus('error')}
        />
      </picture>
    </span>
  );
});
