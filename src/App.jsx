import { useCallback, useRef, useState } from 'react';
import { PEOPLE } from './data.js';
import { useLitCandles } from './hooks/useLitCandles.js';
import { useReveal } from './hooks/useReveal.js';
import { useScrollFx } from './hooks/useScrollFx.js';
import Altar from './components/Altar.jsx';
import Fireflies from './components/Fireflies.jsx';
import Gallery from './components/Gallery.jsx';
import Hero from './components/Hero.jsx';
import Intro from './components/Intro.jsx';
import Nav from './components/Nav.jsx';
import PersonDialog from './components/PersonDialog.jsx';
import Timeline from './components/Timeline.jsx';

export default function App() {
  const [lit, setLit] = useLitCandles();
  const [view, setView] = useState(null);
  const visible = useRef(PEOPLE);

  const refs = {
    progress: useRef(null),
    nav: useRef(null),
    hero: useRef(null),
    heroContent: useRef(null),
    timeline: useRef(null),
    spot: useRef(null)
  };
  useScrollFx(refs);
  useReveal(null, []);

  const onVisibleChange = useCallback(list => { visible.current = list; }, []);

  // abre la ficha navegando dentro de lo que se ve en la galería
  const openPerson = useCallback(id => {
    const list = visible.current.some(p => p.id === id) ? visible.current : PEOPLE;
    const index = list.findIndex(p => p.id === id);
    if (index >= 0) setView({ list, index });
  }, []);

  return (
    <>
      <div className="progress" ref={refs.progress} aria-hidden="true" />
      <div className="spot" ref={refs.spot} aria-hidden="true" />
      <Fireflies />
      <Nav ref={refs.nav} />
      <Hero ref={refs.hero} contentRef={refs.heroContent} />

      <main>
        <Intro />
        <Gallery lit={lit} onOpen={openPerson} onVisibleChange={onVisibleChange} />
        <Timeline ref={refs.timeline} onOpen={openPerson} />
        <Altar lit={lit} setLit={setLit} />
      </main>

      <footer className="foot">
        <div className="orn" aria-hidden="true"><i /><b /><i /></div>
        <p className="foot__quote">Honrar la memoria es mantener viva la patria.</p>
        <p className="foot__note">Contenido de apoyo para estudio. Contrasta las fechas y datos con tu libro de texto.</p>
      </footer>

      <PersonDialog view={view} setView={setView} lit={lit} setLit={setLit} />
    </>
  );
}
