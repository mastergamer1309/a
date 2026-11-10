import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: el build funciona igual en GitHub Pages o abriendo dist/ desde un servidor estático
export default defineConfig({
  base: './',
  plugins: [react()]
});
