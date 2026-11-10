import { useEffect } from 'react';

/* Observador compartido para las animaciones de aparición (.reveal y .tl).
   La clase "in" se añade directamente al DOM: no provoca renders. */
let io = null;
function observer() {
  if (!io) {
    io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  }
  return io;
}

export function observeReveals(root = document) {
  root.querySelectorAll('.reveal:not(.in), .tl:not(.in)').forEach(el => observer().observe(el));
}

export function useReveal(ref, deps = []) {
  useEffect(() => {
    observeReveals(ref?.current || document);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
