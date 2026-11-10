/* Fotografías reales.
   Cualquier `src/assets/portraits/<id>.jpg` se registra sola y se optimiza
   en el build: AVIF y WebP en tres anchos más un JPEG de respaldo, con
   srcset para que cada pantalla descargue solo lo que necesita. */
const modules = import.meta.glob('../../assets/portraits/*.jpg', {
  eager: true,
  import: 'default',
  query: { w: '320;480;720', format: 'avif;webp;jpg', as: 'picture' },
});

export const PHOTOS = new Map(
  Object.entries(modules).map(([path, picture]) => [path.match(/([^/]+)\.jpg$/)[1], picture]),
);

export const getPhoto = id => PHOTOS.get(id);
