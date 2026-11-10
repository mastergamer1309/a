/* Iconos SVG reutilizables. */
export const FLAME_PATH = 'M12 1C12 9 20 12 20 21a8 8 0 0 1-16 0C4 14 10 11 12 1z';

export function FlameIcon(props) {
  return (
    <svg viewBox="0 0 24 32" aria-hidden="true" {...props}>
      <path d={FLAME_PATH} />
    </svg>
  );
}

export function StarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.3 5.8 21.1l1.6-7L2 9.3l7.1-.7z" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </svg>
  );
}

export function CloseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>;
}

export function PrevIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>;
}

export function NextIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>;
}
