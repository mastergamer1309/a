import { Reveal } from './Reveal.jsx';

/** Cabecera centrada de sección: antetítulo, título y subtítulo opcional. */
export function SectionHeader({ kicker, title, sub }) {
  return (
    <header className="center">
      <Reveal as="p" className="kicker">{kicker}</Reveal>
      <Reveal as="h2" className="title" delay={1}>{title}</Reveal>
      {sub && <Reveal as="p" className="sub" delay={2}>{sub}</Reveal>}
    </header>
  );
}
