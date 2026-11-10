import { useEffect, useState } from 'react';
import { FLAME_PATH } from './Flame.jsx';

const LINKS = [
  ['inicio', 'Inicio'],
  ['galeria', 'Galería'],
  ['tiempo', 'Historia'],
  ['velas', 'Velas']
];

export default function Nav({ ref }) {
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) setActive(en.target.id === 'entrada' ? 'inicio' : en.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['inicio', 'entrada', 'galeria', 'tiempo', 'velas'].forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="nav" ref={ref} aria-label="Principal">
      <a className="brand" href="#inicio">
        <svg viewBox="0 0 24 32" aria-hidden="true"><path d={FLAME_PATH} /></svg>
        <span>Sala de la Memoria</span>
      </a>
      <ul>
        {LINKS.map(([id, label]) => (
          <li key={id}><a className={'link' + (active === id ? ' on' : '')} href={'#' + id}>{label}</a></li>
        ))}
      </ul>
    </nav>
  );
}
