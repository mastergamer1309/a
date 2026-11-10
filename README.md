# Sala de la Memoria Nacional · Nicaragua

Sala virtual en honor a los mártires y a las mayores influencias de Nicaragua, hecha con **React + Vite**.

## Uso

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # compila a dist/
npm run preview   # sirve el build
npm run heroes    # regenera los retratos de src/assets/heroes/
```

## Estructura

```
src/
  data.js              personas, épocas y línea del tiempo
  App.jsx              composición de la página
  components/          Nav, Hero, Intro, Gallery, Niche, Timeline, Altar, PersonDialog…
  hooks/               efectos de scroll, apariciones y velas guardadas
  lib/art.js           generador de retratos ilustrados (SVG)
  assets/heroes/       imágenes de todos los héroes nacionales (ver su README)
```

Para añadir a alguien copia un bloque de `PEOPLE` en `src/data.js` y ejecuta `npm run heroes`.
