# Fotos reales

La sala usa retratos ilustrados por defecto. Para mostrar una fotografía real:

1. Guarda la imagen en esta carpeta con el `id` de la persona y extensión `.jpg`
   (los ids están en `src/data/people.js`), por ejemplo `ruben-dario.jpg`.
   Recomendado: formato vertical 3:4 (por ejemplo 600 × 800 px).
2. Listo. No hay que registrarla en ningún sitio: al compilar se genera
   automáticamente en AVIF, WebP y JPEG a 320, 480 y 720 px de ancho.

Si la foto queda mal encuadrada, añade `fotoPosicion: "center 20%"` (cualquier
valor de `object-position`) a la persona en `people.js`.

Las imágenes incluidas provienen de Wikimedia Commons o Wikipedia; revisa la
licencia de cualquier imagen nueva antes de distribuirla.
