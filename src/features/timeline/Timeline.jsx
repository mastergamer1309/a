import { useRef } from 'react';
import { Reveal } from '../../components/Reveal.jsx';
import { SectionHeader } from '../../components/SectionHeader.jsx';
import { TIMELINE } from '../../data/index.js';
import { useFrame } from '../../hooks/useFrame.js';
import { clamp } from '../../lib/text.js';
import { TimelineEvent } from './TimelineEvent.jsx';
import './Timeline.css';

export function Timeline() {
  const ref = useRef(null);

  // La línea dorada se rellena a medida que se recorre la sección.
  useFrame(() => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const p = clamp((innerHeight * 0.6 - r.top) / r.height, 0, 1);
    el.style.setProperty('--p', p.toFixed(4));
  });

  return (
    <section className="section" id="tiempo">
      <div className="wrap">
        <SectionHeader
          kicker="Quinientos años en una línea"
          title="El camino de la memoria"
          sub="Los hechos que marcaron la patria. Toca un nombre para abrir su ficha."
        />
        <Reveal className="legend" delay={3} aria-hidden="true">
          <span><i className="dot dot--martir" />Sacrificio</span>
          <span><i className="dot dot--hist" />Hecho histórico</span>
          <span><i className="dot dot--cultura" />Cultura</span>
        </Reveal>
        <div className="timeline" ref={ref}>
          {TIMELINE.map(ev => (
            <TimelineEvent key={`${ev.anio}-${ev.titulo}`} event={ev} />
          ))}
          <div className="timeline__fill" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
