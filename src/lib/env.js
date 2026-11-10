/* Preferencias del dispositivo, leídas una sola vez al arrancar. */
const mq = query =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(query).matches
    : false;

export const reduceMotion = mq('(prefers-reduced-motion: reduce)');
export const finePointer = mq('(hover: hover) and (pointer: fine)');
