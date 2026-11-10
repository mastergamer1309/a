// @vitest-environment node
/* Integridad de los datos: protege contra ids duplicados, enlaces rotos
   y campos con valores no válidos al añadir personas o hechos. */
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { ERAS, PEOPLE, TIMELINE, PEOPLE_BY_ID, TIPOS } from './index.js';

const FIGURAS = ['hombre', 'mujer', 'trio', 'dos', 'mascara'];
const ACCESORIOS = ['sombrero', 'plumas', 'boina', 'cuello', null, undefined];
const TIPOS_HECHO = ['martir', 'hist', 'cultura'];

describe('personas', () => {
  it('tienen ids únicos en kebab-case', () => {
    const ids = PEOPLE.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach(id => expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it.each(PEOPLE.map(p => [p.id, p]))('%s tiene campos válidos', (_, p) => {
    expect(TIPOS).toContain(p.tipo);
    expect(ERAS.map(e => e.id)).toContain(p.era);
    expect(FIGURAS).toContain(p.figura);
    expect(ACCESORIOS).toContain(p.acc);
    expect(p.hue).toBeGreaterThanOrEqual(0);
    expect(p.hue).toBeLessThanOrEqual(360);
    for (const key of ['nombre', 'corto', 'anios', 'rol', 'resumen']) {
      expect(typeof p[key]).toBe('string');
      expect(p[key].length).toBeGreaterThan(0);
    }
    expect(p.bio.length).toBeGreaterThan(0);
    p.datos.forEach(d => expect(d).toHaveLength(2));
    if (p.frase) expect(p.frase).toEqual({ t: expect.any(String), a: expect.any(String) });
  });
});

describe('línea del tiempo', () => {
  it('solo enlaza personas existentes', () => {
    TIMELINE.forEach(ev => ev.personas.forEach(id => expect(PEOPLE_BY_ID.has(id), id).toBe(true)));
  });

  it('usa tipos de hecho conocidos', () => {
    TIMELINE.forEach(ev => expect(TIPOS_HECHO).toContain(ev.tipo));
  });

  it('no repite la misma clave (año + título)', () => {
    const keys = TIMELINE.map(ev => `${ev.anio}-${ev.titulo}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe('fotos', () => {
  it('cada archivo de src/assets/portraits corresponde a una persona', () => {
    const dir = fileURLToPath(new URL('../assets/portraits/', import.meta.url));
    const ids = readdirSync(dir).filter(f => f.endsWith('.jpg')).map(f => f.slice(0, -4));
    ids.forEach(id => expect(PEOPLE_BY_ID.has(id), `${id}.jpg no tiene persona`).toBe(true));
  });
});
