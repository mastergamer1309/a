# Sala de la Memoria Nacional

Sala virtual en honor a los mártires y a las mayores influencias de Nicaragua.
Hecha con React 19 y Vite.

## Uso

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # sirve dist/ localmente
npm test          # tests (Vitest)
npm run lint      # ESLint
```

El build usa rutas relativas (`base: './'`), así que `dist/` funciona en
cualquier carpeta o subruta (GitHub Pages, un servidor estático, etc.).

## Estructura

```
src/
  main.jsx              arranque: fuentes, estilos globales y <App/>
  app/App.jsx           composición de la página; carga diferida de la ficha
  data/                 contenido de la sala (personas, épocas, línea del tiempo)
  features/             una carpeta por sección, con sus componentes y su CSS
    hero/               portada con parallax y título letra a letra
    intro/              bienvenida y cifras animadas
    gallery/            filtros, pasillos y nichos (+ filterPeople, testeado)
    portrait/           retrato ilustrado (SVG) y fotos reales optimizadas
    timeline/           línea del tiempo
    altar/              altar de velas
    dialog/             ficha de cada persona (chunk aparte)
  components/           piezas compartidas: Nav, Footer, Reveal, iconos…
  hooks/                useFrame (scroll por rAF), useInView (apariciones)
  state/                stores globales: velas encendidas y ficha abierta
  lib/                  utilidades sin React (createStore, frameLoop, texto)
  styles/               variables, base, animaciones y fuentes
  assets/portraits/     fotos reales <id>.jpg
```

## Añadir contenido

- **Una persona:** copia un bloque en `src/data/people.js` y cambia sus campos
  (la cabecera del archivo explica cada uno).
- **Un hecho histórico:** añade una entrada en `src/data/timeline.js`; `personas`
  enlaza con los `id` de `people.js`.
- **Una foto real:** guarda `src/assets/portraits/<id>.jpg`. No hay que registrarla
  (ver `src/assets/portraits/LEEME.md`).

`npm test` comprueba que los ids sean únicos, que la línea del tiempo solo
enlace personas existentes y que cada foto corresponda a alguien.

## Rendimiento

- Las fotos se convierten en el build a AVIF, WebP y JPEG en 320, 480 y 720 px
  y se sirven con `srcset` y carga diferida.
- Fuentes alojadas en la app (solo subconjunto latino), sin peticiones a terceros.
- La ficha se carga con `React.lazy` y se precarga cuando el navegador está libre.
- React, los datos y el código de la app van en chunks separados para que
  la caché del navegador sobreviva a los cambios de contenido.
- Las velas usan `useSyncExternalStore`: encender una solo re-renderiza su vela
  y su nicho.
- Scroll, parallax e inclinación escriben variables CSS en un único bucle
  `requestAnimationFrame`, sin pasar por el render de React.
- Se respeta `prefers-reduced-motion`.
- La animación de entrada solo anima `opacity` y `transform` (la GPU la mueve
  aunque el hilo principal esté ocupado); sin `filter`, `backdrop-filter` ni
  `mix-blend-mode` en elementos animados.
- La portada se pinta primero y el resto se monta en una transición de React.
  Las secciones largas usan `content-visibility: auto`: el navegador no las
  maqueta hasta que se acercan a la pantalla.
- Mientras carga una foto se muestra un degradado ligero, no la ilustración SVG.

## Publicación

La sala se publica en **GitHub Pages**: <https://mastergamer1309.github.io/a/>

Cada push a `main` ejecuta `.github/workflows/deploy.yml`: lint, tests, build y
despliegue. Si algo falla, no se publica.

Configuración inicial (una sola vez, la hace el dueño del repositorio):
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

La URL pública se define en `.env` (`VITE_SITE_URL`) y se usa en las etiquetas
para compartir (Open Graph); en GitHub Actions se toma automáticamente.
La imagen de vista previa es `public/og.jpg` (1200 × 630).
