import { afterEach, describe, expect, it } from 'vitest';
import { PEOPLE } from '../data/index.js';
import { clearAll, isLit, litCount, setLit, toggleLit, unlitIds } from './candles.js';

const KEY = 'sala-memoria:velas';
const [a, b] = PEOPLE.map(p => p.id);

afterEach(() => clearAll());

describe('velas', () => {
  it('enciende, apaga y alterna', () => {
    setLit(a, true);
    expect(isLit(a)).toBe(true);
    toggleLit(a);
    expect(isLit(a)).toBe(false);
  });

  it('persiste en localStorage', () => {
    setLit(a, true);
    setLit(b, true);
    expect(JSON.parse(localStorage.getItem(KEY)).sort()).toEqual([a, b].sort());
  });

  it('cuenta y lista las apagadas', () => {
    setLit(a, true);
    expect(litCount()).toBe(1);
    expect(unlitIds()).not.toContain(a);
    expect(unlitIds()).toHaveLength(PEOPLE.length - 1);
  });

  it('no cambia el estado si ya estaba así', () => {
    setLit(a, false);
    expect(litCount()).toBe(0);
  });
});
