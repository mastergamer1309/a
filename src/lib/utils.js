export const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

const mq = q => typeof matchMedia === 'function' && matchMedia(q).matches;
export const reduceMotion = mq('(prefers-reduced-motion: reduce)');
export const finePointer = mq('(hover: hover) and (pointer: fine)');

export const TYPE_LABEL = { martir: 'Mártir', influencia: 'Influencia' };
