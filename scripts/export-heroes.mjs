/* Exporta el retrato ilustrado de cada persona de src/data.js a
   src/assets/heroes/<id>.svg.   Uso: npm run heroes */
import { mkdir, writeFile } from 'node:fs/promises';
import { PEOPLE } from '../src/data.js';
import { art } from '../src/lib/art.js';

const dir = new URL('../src/assets/heroes/', import.meta.url);
await mkdir(dir, { recursive: true });

for (const p of PEOPLE) {
  const svg = art(p, 'p')
    .replace('<svg class="art"', '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"')
    .replace(' aria-hidden="true" focusable="false"', ` role="img" aria-label="${p.nombre}"`)
    .replace(/\n\s*/g, '');
  await writeFile(new URL(`${p.id}.svg`, dir), `<?xml version="1.0" encoding="UTF-8"?>\n<!-- ${p.nombre} (${p.anios}) -->\n${svg}\n`);
}
console.log(`${PEOPLE.length} retratos exportados en src/assets/heroes/`);
