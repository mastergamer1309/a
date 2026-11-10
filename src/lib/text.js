/** Minúsculas y sin tildes, para búsquedas tolerantes. */
export const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
