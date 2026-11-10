import { Niche } from './Niche.jsx';

/** Pasillo de la galería (mártires o influencias). Se oculta si está vacío. */
export function Hall({ tipo, title, text, icon, people }) {
  const headingId = `h-${tipo}`;
  return (
    <section className="hall" id={`hall-${tipo}`} aria-labelledby={headingId} hidden={people.length === 0}>
      <header className="hall__head">
        {icon}
        <h3 id={headingId}>{title}</h3>
        <p>{text}</p>
      </header>
      <ul className="niches">
        {people.map((p, i) => (
          <Niche key={p.id} person={p} index={i} />
        ))}
      </ul>
    </section>
  );
}
