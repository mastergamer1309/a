import { normalize } from '../../lib/text.js';

/* Texto de búsqueda normalizado de cada persona, calculado una sola vez. */
const haystacks = new WeakMap();
function haystack(p) {
  let h = haystacks.get(p);
  if (h === undefined) {
    h = normalize([p.nombre, p.rol, p.resumen, p.anios, p.bio.join(' ')].join(' '));
    haystacks.set(p, h);
  }
  return h;
}

/**
 * Filtra personas por tipo ('todos' | 'martir' | 'influencia'), época
 * (0 = todas) y texto. Todas las palabras de la búsqueda deben aparecer,
 * sin distinguir mayúsculas ni tildes.
 */
export function filterPeople(people, { type = 'todos', era = 0, query = '' } = {}) {
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
  return people.filter(p => {
    if (type !== 'todos' && p.tipo !== type) return false;
    if (era && p.era !== era) return false;
    if (words.length) {
      const h = haystack(p);
      if (!words.every(w => h.includes(w))) return false;
    }
    return true;
  });
}
