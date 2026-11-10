import { ERAS, PEOPLE } from './data.js';
import { norm } from './lib/utils.js';

export const byId = Object.fromEntries(PEOPLE.map(p => [p.id, p]));
export const eraOf = id => ERAS.find(e => e.id === id);

// texto de búsqueda normalizado, calculado una sola vez
export const searchText = Object.fromEntries(
  PEOPLE.map(p => [p.id, norm([p.nombre, p.rol, p.resumen, p.anios, p.bio.join(' ')].join(' '))])
);
