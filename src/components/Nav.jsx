import { useEffect, useState } from 'react';
import { useFrame } from '../hooks/useFrame.js';
import { FlameIcon } from './icons.jsx';
import './Nav.css';

const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'galeria', label: 'Galería' },
  { id: 'tiempo', label: 'Historia' },
  { id: 'velas', label: 'Velas' },
];

/* Secciones observadas; 'entrada' (bienvenida) cuenta como 'inicio'. */
const SECTIONS = { inicio: 'inicio', entrada: 'inicio', galeria: 'galeria', tiempo: 'tiempo', velas: 'velas' };

/** `sectionsReady`: las secciones bajo la portada se montan después del primer render. */
export function Nav({ sectionsReady = true }) {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('inicio');

  useFrame(() => {
    const s = scrollY > 40;
    return () => setSolid(s);
  });

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) setActive(SECTIONS[en.target.id]); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(SECTIONS).forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sectionsReady]);

  return (
    <nav className={solid ? 'nav solid' : 'nav'} aria-label="Principal">
      <a className="brand" href="#inicio">
        <FlameIcon />
        <span>Sala de la Memoria</span>
      </a>
      <ul>
        {LINKS.map(({ id, label }) => (
          <li key={id}>
            <a
              className={active === id ? 'link on' : 'link'}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
