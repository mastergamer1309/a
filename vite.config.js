import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  // Rutas relativas: el build funciona en cualquier subcarpeta (GitHub Pages, USB, etc.)
  base: './',
  plugins: [react(), imagetools()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    assetsInlineLimit: 0,
    rolldownOptions: {
      output: {
        // Chunks estables para la caché del navegador: editar textos de la
        // sala no invalida React, y actualizar React no invalida los datos.
        codeSplitting: {
          groups: [
            { name: 'react', test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: 'data', test: /[\\/]src[\\/]data[\\/]/ },
          ],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{js,jsx}'],
  },
});
