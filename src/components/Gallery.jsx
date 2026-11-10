import { useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ERAS, PEOPLE } from '../data.js';
import { searchText } from '../data-index.js';
import { finePointer, norm, reduceMotion } from '../lib/utils.js';
import { useReveal } from '../hooks/useReveal.js';
import Flame from './Flame.jsx';
import Niche from './Niche.jsx';

const TYPES = [['todos', 'Todos'], ['martir', 'Mártires'], ['influencia', 'Influencias']];

const HALLS = [
  {
    tipo: 'martir',
    title: 'Galería de los Mártires',
    text: 'Quienes dieron la vida por la libertad, la soberanía y la dignidad de Nicaragua.',
    icon: <span className="hall__icon hall__icon--flame" aria-hidden="true"><Flame /></span>
  },
  {
    tipo: 'influencia',
    title: 'Galería de las Influencias',
    text: 'Quienes forjaron nuestra identidad con su palabra, su obra y su ejemplo.',
    icon: (
      <span className="hall__icon hall__icon--star" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.3 5.8 21.1l1.6-7L2 9.3l7.1-.7z" /></svg>
      </span>
    )
  }
];

function Segmented({ value, onChange }) {
  const ref = useRef(null);

  // mueve la "píldora" bajo el botón activo
  useLayoutEffect(() => {
    const seg = ref.current;
    const move = () => {
      const on = seg.querySelector('button[aria-pressed="true"]');
      if (!on) return;
      seg.style.setProperty('--x', on.offsetLeft + 'px');
      seg.style.setProperty('--w', on.offsetWidth + 'px');
    };
    move();
    addEventListener('resize', move);
    document.fonts?.ready.then(move);
    return () => removeEventListener('resize', move);
  }, [value]);

  return (
    <div className="seg" ref={ref} role="group" aria-label="Filtrar por tipo">
      <span className="seg__thumb" aria-hidden="true" />
      {TYPES.map(([type, label]) => (
        <button type="button" key={type} aria-pressed={value === type} onClick={() => onChange(type)}>{label}</button>
      ))}
    </div>
  );
}

/* Inclinación 3D al pasar el cursor (delegada en la sección, sin renders) */
function useTilt(ref) {
  useEffect(() => {
    if (!finePointer || reduceMotion) return;
    const gallery = ref.current;
    const move = e => {
      const b = e.target.closest('.niche__btn');
      if (!b) return;
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      b.style.setProperty('--rx', ((.5 - y) * 11).toFixed(2) + 'deg');
      b.style.setProperty('--ry', ((x - .5) * 13).toFixed(2) + 'deg');
      b.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      b.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    };
    const out = e => {
      const b = e.target.closest('.niche__btn');
      if (b && !b.contains(e.relatedTarget)) { b.style.removeProperty('--rx'); b.style.removeProperty('--ry'); }
    };
    gallery.addEventListener('pointermove', move);
    gallery.addEventListener('pointerout', out);
    return () => {
      gallery.removeEventListener('pointermove', move);
      gallery.removeEventListener('pointerout', out);
    };
  }, [ref]);
}

export default function Gallery({ lit, onOpen, onVisibleChange }) {
  const [type, setType] = useState('todos');
  const [era, setEra] = useState(0);
  const [query, setQuery] = useState('');
  const q = norm(useDeferredValue(query).trim());
  const ref = useRef(null);

  const list = useMemo(() => PEOPLE.filter(p => {
    if (type !== 'todos' && p.tipo !== type) return false;
    if (era && p.era !== era) return false;
    if (q && !q.split(/\s+/).every(w => searchText[p.id].includes(w))) return false;
    return true;
  }), [type, era, q]);

  const halls = useMemo(
    () => HALLS.map(h => ({ ...h, items: list.filter(p => p.tipo === h.tipo) })),
    [list]
  );

  useEffect(() => { onVisibleChange(halls.flatMap(h => h.items)); }, [halls, onVisibleChange]);
  useReveal(ref, [list]);
  useTilt(ref);

  return (
    <section className="section" id="galeria" ref={ref}>
      <div className="wrap">
        <header className="center">
          <p className="kicker reveal">La sala</p>
          <h2 className="title reveal" style={{ '--d': 1 }}>Galería de la Memoria</h2>
        </header>

        <div className="controls reveal" style={{ '--d': 2 }}>
          <Segmented value={type} onChange={setType} />
          <div className="chips" role="group" aria-label="Filtrar por época">
            <button className="chip" type="button" aria-pressed={era === 0} onClick={() => setEra(0)}>Todas las épocas</button>
            {ERAS.map(e => (
              <button className="chip" type="button" key={e.id} aria-pressed={era === e.id} title={e.rango} onClick={() => setEra(e.id)}>{e.nombre}</button>
            ))}
          </div>
          <label className="search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
            <input
              type="search"
              placeholder="Buscar por nombre, año o palabra…"
              autoComplete="off"
              aria-label="Buscar en la galería"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </label>
          <p className="count" aria-live="polite">
            {list.length === PEOPLE.length
              ? `${PEOPLE.length} personas y memoriales en la sala`
              : `Mostrando ${list.length} de ${PEOPLE.length}`}
          </p>
        </div>

        {halls.map(h => (
          <section className="hall" id={'hall-' + h.tipo} aria-labelledby={'h-' + h.tipo} hidden={!h.items.length} key={h.tipo}>
            <header className="hall__head">
              {h.icon}
              <h3 id={'h-' + h.tipo}>{h.title}</h3>
              <p>{h.text}</p>
            </header>
            <ul className="niches">
              {h.items.map((p, i) => (
                <Niche person={p} index={i} isLit={lit.has(p.id)} onOpen={onOpen} key={p.id} />
              ))}
            </ul>
          </section>
        ))}

        <p className="empty" hidden={list.length > 0}>Nadie coincide con esa búsqueda. Prueba con otra palabra.</p>
      </div>
    </section>
  );
}
