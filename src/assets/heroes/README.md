# Imágenes de los héroes nacionales

Esta carpeta guarda la imagen de **cada héroe, mártir e influencia** que aparece en la Sala de la Memoria. El nombre de cada archivo es el `id` de la persona en `src/data.js`.

| Archivo | Persona |
|---|---|
| `benjamin-zeledon.svg` | Benjamín Zeledón |
| `augusto-sandino.svg` | Augusto C. Sandino |
| `rigoberto-lopez-perez.svg` | Rigoberto López Pérez |
| `carlos-fonseca.svg` | Carlos Fonseca Amador |
| `pedro-joaquin-chamorro.svg` | Pedro Joaquín Chamorro |
| `leonel-rugama.svg` | Leonel Rugama |
| `julio-buitrago.svg` | Julio Buitrago |
| `luisa-amanda-espinoza.svg` | Luisa Amanda Espinoza |
| `gaspar-garcia-laviana.svg` | Gaspar García Laviana |
| `estudiantes-1959.svg` | Los estudiantes de León |
| `masacre-1967.svg` | Mártires del 22 de enero |
| `nicarao.svg` | Cacique Nicarao |
| `diriangen.svg` | Cacique Diriangén |
| `rafaela-herrera.svg` | Rafaela Herrera |
| `el-gueguense.svg` | El Güegüense |
| `miguel-larreynaga.svg` | Miguel Larreynaga |
| `san-jacinto.svg` | Héroes de San Jacinto |
| `jose-santos-zelaya.svg` | José Santos Zelaya |
| `ruben-dario.svg` | Rubén Darío |
| `pablo-antonio-cuadra.svg` | Pablo Antonio Cuadra |
| `ernesto-cardenal.svg` | Ernesto Cardenal |
| `carlos-mejia-godoy.svg` | Carlos Mejía Godoy |
| `sergio-ramirez.svg` | Sergio Ramírez |
| `gioconda-belli.svg` | Gioconda Belli |

## Retratos ilustrados (`.svg`)

Son los mismos retratos que se ven en la galería, exportados como archivos. Si cambias a alguien en `src/data.js` o añades una persona nueva, regenéralos con:

```bash
npm run heroes
```

## Fotos reales (`.jpg`, `.png`, `.webp`)

Para mostrar una fotografía real, guárdala aquí con el `id` de la persona, por ejemplo `augusto-sandino.jpg`. La aplicación la detecta sola al compilar y la muestra encima del retrato ilustrado; no hay que tocar ningún otro archivo.

- Formato recomendado: vertical 3:4 (por ejemplo 600 × 800 px), menos de 200 KB.
- Usa imágenes de dominio público o con licencia libre (por ejemplo, de Wikimedia Commons) y anota la fuente y el autor en este archivo.
