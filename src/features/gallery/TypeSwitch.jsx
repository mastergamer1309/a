import { useCallback, useLayoutEffect, useRef } from 'react';

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

  useLayoutEffect(moveThumb, [value, moveThumb]);

  // El ancho de los botones cambia al redimensionar y al cargar las fuentes.
  useLayoutEffect(() => {
    addEventListener('resize', moveThumb);
    document.fonts?.ready.then(moveThumb);
    return () => removeEventListener('resize', moveThumb);
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
