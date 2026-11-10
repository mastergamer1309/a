import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const OPTIONS = [
  { value: 'todos', label: 'Todos' },
  { value: 'martir', label: 'Mártires' },
  { value: 'influencia', label: 'Influencias' },
];

/** Selector segmentado con una píldora dorada que se desliza a la opción activa. */
export function TypeSwitch({ value, onChange }) {
  const ref = useRef(null);

  const moveThumb = useCallback(() => {
    const seg = ref.current;
    const on = seg?.querySelector('button[aria-pressed="true"]');
    if (!on) return;
    seg.style.setProperty('--x', on.offsetLeft + 'px');
    seg.style.setProperty('--w', on.offsetWidth + 'px');
  }, []);

  // Al montar no se mide aquí: forzaría un layout síncrono de toda la página.
  // El ResizeObserver de abajo hace la primera medición cuando el layout ya existe.
  const mounted = useRef(false);
  useLayoutEffect(() => {
    if (mounted.current) moveThumb();
    mounted.current = true;
  }, [value, moveThumb]);

  // También cubre el cambio de ancho al redimensionar y al cargar las fuentes.
  useEffect(() => {
    // Ancho 0 = la galería aún no se ha maquetado (content-visibility): medir
    // ahora forzaría su layout completo. Se repite al hacerse visible.
    const ro = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) moveThumb();
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [moveThumb]);

  return (
    <div className="seg" ref={ref} role="group" aria-label="Filtrar por tipo">
      <span className="seg__thumb" aria-hidden="true" />
      {OPTIONS.map(o => (
        <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
