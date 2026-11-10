/* Un único listener de scroll/resize para toda la app.
   Cada suscriptor se ejecuta como mucho una vez por frame (rAF). */
const subscribers = new Set();
let ticking = false;

function run() {
  ticking = false;
  subscribers.forEach(fn => fn());
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
