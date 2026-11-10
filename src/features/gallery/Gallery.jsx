import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Reveal } from '../../components/Reveal.jsx';
import { SectionHeader } from '../../components/SectionHeader.jsx';
import { FlameIcon, SearchIcon, StarIcon } from '../../components/icons.jsx';
import { PEOPLE } from '../../data/index.js';
import { setVisibleIds } from '../../state/dialog.js';
import { EraChips } from './EraChips.jsx';
import { Hall } from './Hall.jsx';
import { TypeSwitch } from './TypeSwitch.jsx';
import { filterPeople } from './filterPeople.js';
import { useTilt } from './useTilt.js';
import './Gallery.css';

const HALLS = [
  {
    tipo: 'martir',
    title: 'Galería de los Mártires',
    text: 'Quienes dieron la vida por la libertad, la soberanía y la dignidad de Nicaragua.',
    icon: <span className="hall__icon hall__icon--flame" aria-hidden="true"><FlameIcon /></span>,
  },
  {
    tipo: 'influencia',
    title: 'Galería de las Influencias',
    text: 'Quienes forjaron nuestra identidad con su palabra, su obra y su ejemplo.',
    icon: <span className="hall__icon hall__icon--star" aria-hidden="true"><StarIcon /></span>,
  },
];

export function Gallery() {
  const [type, setType] = useState('todos');
  const [era, setEra] = useState(0);
  const [query, setQuery] = useState('');
  // La escritura en el buscador nunca se bloquea: el filtrado va detrás.
  const deferredQuery = useDeferredValue(query);

  const list = useMemo(
    () => filterPeople(PEOPLE, { type, era, query: deferredQuery }),
    [type, era, deferredQuery],
  );
  const byHall = useMemo(
    () => HALLS.map(h => ({ ...h, people: list.filter(p => p.tipo === h.tipo) })),
    [list],
  );

  // La ficha navega (anterior/siguiente) por lo que se ve en la galería.
  useEffect(() => {
    setVisibleIds(byHall.flatMap(h => h.people.map(p => p.id)));
  }, [byHall]);

  const sectionRef = useRef(null);
  useTilt(sectionRef);

  const count = list.length === PEOPLE.length
    ? `${PEOPLE.length} personas y memoriales en la sala`
    : `Mostrando ${list.length} de ${PEOPLE.length}`;

  return (
    <section className="section section--lazy" id="galeria" ref={sectionRef}>
      <div className="wrap">
        <SectionHeader kicker="La sala" title="Galería de la Memoria" />

        <Reveal className="controls" delay={2}>
          <TypeSwitch value={type} onChange={setType} />
          <EraChips value={era} onChange={setEra} />
          <label className="search">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar por nombre, año o palabra…"
              autoComplete="off"
              aria-label="Buscar en la galería"
            />
          </label>
          <p className="count" aria-live="polite">{count}</p>
        </Reveal>

        {byHall.map(h => (
          <Hall key={h.tipo} {...h} />
        ))}

        {list.length === 0 && (
          <p className="empty">Nadie coincide con esa búsqueda. Prueba con otra palabra.</p>
        )}
      </div>
    </section>
  );
}
