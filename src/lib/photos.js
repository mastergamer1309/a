/* Fotos reales opcionales: cualquier src/assets/heroes/<id>.jpg|jpeg|png|webp
   se detecta en el build y se superpone al retrato ilustrado. */
const files = import.meta.glob('../assets/heroes/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
});

export const PHOTOS = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace(/\.\w+$/, ''), url])
);
