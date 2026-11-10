/* Un único listener de scroll/resize para toda la app.
   Cada suscriptor se ejecuta como mucho una vez por frame (rAF).

   Para evitar layout thrashing, el trabajo va en dos fases: primero todos
   los suscriptores LEEN (getBoundingClientRect, scrollHeight…) y pueden
   devolver una función que ESCRIBE (estilos); las escrituras se aplican
   juntas al final, así el navegador maqueta una sola vez por frame. */
const subscribers = new Set();
let ticking = false;

function run() {
  ticking = false;
  const writes = [];
  subscribers.forEach(fn => {
    const write = fn();
    if (typeof write === 'function') writes.push(write);
  });
  writes.forEach(w => w());
}

export function requestFrame() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(run);
}

export function subscribeFrame(fn) {
  subscribers.add(fn);
  if (subscribers.size === 1) {
    addEventListener('scroll', requestFrame, { passive: true });
    addEventListener('resize', requestFrame);
  }
  requestFrame();
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      removeEventListener('scroll', requestFrame);
      removeEventListener('resize', requestFrame);
    }
  };
}
