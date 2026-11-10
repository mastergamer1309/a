import { useInView } from '../hooks/useInView.js';

/**
 * Envoltorio que aparece con un fundido al entrar en pantalla.
 * `delay` es un escalón de 90 ms (variable CSS --d).
 */
export function Reveal({ as: Tag = 'div', className = '', delay, style, children, ...rest }) {
  const [ref, seen] = useInView();
  const cls = `${className} reveal${seen ? ' in' : ''}`.trim();
  const st = delay == null ? style : { ...style, '--d': delay };
  return (
    <Tag ref={ref} className={cls} style={st} {...rest}>
      {children}
    </Tag>
  );
}
