import { describe, expect, it } from 'vitest';
import { PEOPLE } from '../../data/index.js';
import { filterPeople } from './filterPeople.js';

const ids = list => list.map(p => p.id);

describe('filterPeople', () => {
  it('sin filtros devuelve a todos en el mismo orden', () => {
    expect(filterPeople(PEOPLE)).toEqual(PEOPLE);
  });

  it('filtra por tipo', () => {
    const martires = filterPeople(PEOPLE, { type: 'martir' });
    expect(martires.length).toBeGreaterThan(0);
    expect(martires.every(p => p.tipo === 'martir')).toBe(true);
  });

  it('filtra por época', () => {
    expect(filterPeople(PEOPLE, { era: 3 }).every(p => p.era === 3)).toBe(true);
  });

  it('busca sin distinguir tildes ni mayúsculas', () => {
    expect(ids(filterPeople(PEOPLE, { query: 'RUBEN DARIO' }))).toContain('ruben-dario');
    expect(ids(filterPeople(PEOPLE, { query: 'zeledón' }))).toContain('benjamin-zeledon');
  });

  it('exige todas las palabras', () => {
    const r = filterPeople(PEOPLE, { query: 'sandino 1934' });
    expect(ids(r)).toContain('augusto-sandino');
    expect(filterPeople(PEOPLE, { query: 'sandino zzzz' })).toEqual([]);
  });

  it('ignora espacios sobrantes', () => {
    expect(filterPeople(PEOPLE, { query: '   ' })).toEqual(PEOPLE);
  });

  it('combina filtros', () => {
    const r = filterPeople(PEOPLE, { type: 'influencia', era: 2 });
    expect(r.every(p => p.tipo === 'influencia' && p.era === 2)).toBe(true);
  });
});
