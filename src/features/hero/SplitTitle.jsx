import { Fragment, useMemo } from 'react';

/** Divide las líneas en palabras y letras con un índice global por letra. */
function split(lines) {
  let i = 0;
  return lines.map(line =>
    line.split(' ').map(word => [...word].map(ch => ({ ch, i: i++ }))),
  );
}

/**
 * Título que aparece letra por letra. Cada letra recibe su índice (--i)
 * para escalonar la animación; los lectores de pantalla leen el
 * aria-label del h1 en lugar de las letras sueltas.
 */
export function SplitTitle({ lines }) {
  const parts = useMemo(() => split(lines), [lines]);
  return (
    <h1 className="split" aria-label={lines.join(' ')}>
      {parts.map((words, l) => (
        <span className="line" aria-hidden="true" key={l}>
          {words.map((letters, w) => (
            <Fragment key={w}>
              {w > 0 && ' '}
              <span className="word">
                {letters.map(({ ch, i }) => (
                  <span className="ch" key={i} style={{ '--i': i }}>{ch}</span>
                ))}
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </h1>
  );
}
