import { Suspense, lazy, startTransition, useEffect, useState } from 'react';
import { Fireflies, ScrollProgress, Spotlight } from '../components/Ambient.jsx';
import { Footer } from '../components/Footer.jsx';
import { Nav } from '../components/Nav.jsx';
import { Altar } from '../features/altar/Altar.jsx';
import { Gallery } from '../features/gallery/Gallery.jsx';
import { Hero } from '../features/hero/Hero.jsx';
import { Intro } from '../features/intro/Intro.jsx';
import { Timeline } from '../features/timeline/Timeline.jsx';
import { useDialogOpen } from '../state/dialog.js';

/* La ficha no hace falta para el primer pintado: va en su propio chunk. */
const loadDialog = () => import('../features/dialog/PersonDialog.jsx');
const PersonDialog = lazy(loadDialog);

/** Precarga la ficha cuando el navegador está libre, para que abra al instante. */
function usePrefetchDialog() {
  useEffect(() => {
    const idle = window.requestIdleCallback ?? (cb => setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const handle = idle(() => { loadDialog(); });
    return () => cancel(handle);
  }, []);
}

/** Monta la ficha la primera vez que se abre y la mantiene montada después. */
function DialogHost() {
  const open = useDialogOpen();
  const [mounted, setMounted] = useState(false);
  if (open && !mounted) setMounted(true);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <PersonDialog />
    </Suspense>
  );
}

/**
 * El primer render solo pinta lo visible (portada). El resto de secciones se
 * monta justo después como transición, que React trocea y puede interrumpir:
 * así la animación de entrada no compite con un render largo.
 */
function useBelowFoldReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    startTransition(() => setReady(true));
  }, []);
  // Un enlace compartido con #seccion no encontraba el destino al cargar.
  useEffect(() => {
    if (!ready || !location.hash) return;
    document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  }, [ready]);
  return ready;
}

export function App() {
  usePrefetchDialog();
  const ready = useBelowFoldReady();
  return (
    <>
      <ScrollProgress />
      <Spotlight />
      <Fireflies />
      <Nav sectionsReady={ready} />
      <Hero />
      {ready && (
        <>
          <main>
            <Intro />
            <Gallery />
            <Timeline />
            <Altar />
          </main>
          <Footer />
          <DialogHost />
        </>
      )}
    </>
  );
}
