export const FLAME_PATH = 'M12 1C12 9 20 12 20 21a8 8 0 0 1-16 0C4 14 10 11 12 1z';

export default function Flame() {
  return <svg viewBox="0 0 24 32" aria-hidden="true"><path d={FLAME_PATH} /></svg>;
}
