/* Punto de entrada único de los datos de la sala, con índices derivados
   calculados una sola vez al cargar el módulo. */
import { ERAS } from './eras.js';
import { PEOPLE } from './people.js';
import { TIMELINE } from './timeline.js';

export { ERAS, PEOPLE, TIMELINE };

export const TIPOS = /** @type {const} */ (['martir', 'influencia']);

export const TYPE_LABEL = { martir: 'Mártir', influencia: 'Influencia' };

export const PEOPLE_BY_ID = new Map(PEOPLE.map(p => [p.id, p]));

export const ERAS_BY_ID = new Map(ERAS.map(e => [e.id, e]));

export const getPerson = id => PEOPLE_BY_ID.get(id);
