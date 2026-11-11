# Baratie · El Rey Pirata

Carta digital (menú) pensada para verse en el celular, para el restaurante temático **Baratie "El Rey Pirata"**, inspirado en el anime *One Piece*.

> "El sabor de un verdadero Rey Pirata"

## Qué es

Una sola página web con scroll que muestra todo el menú del restaurante, con un estilo de manga en tonos café sobre un mapa antiguo de piratas:

- **Secciones:** Entradas, Hamburguesas, Hot Dogs, Otras Delicias, Especiales, Bebidas (Limonadas, Sodas Saborizadas, Granizados y Malteadas) y Helados.
- **Estilo:** tarjetas de platos como globos de diálogo de manga, banderines para los títulos, etiquetas de precio con el símbolo ฿, y secciones que se alternan entre izquierda y derecha.
- **Detalles:** pantalla de carga al entrar, sombras suaves arriba y abajo de la pantalla, fondo fijo con el mapa y el logo de Luffy, y espacios para personajes recortados junto a las tarjetas.

## Tecnologías

- [React](https://react.dev) + [Vite](https://vite.dev)
- CSS propio, sin librerías de estilos
- Íconos dibujados en SVG
- [Oxlint](https://oxc.rs) para el lint

## Cómo correrlo

```bash
npm install
npm run dev
```

Otros comandos:

```bash
npm run build     # genera la versión de producción en dist/
npm run preview   # sirve la versión de producción
npm run lint      # revisa el código
```

## Estructura

```text
public/
  fondo.jpg           Mapa antiguo del fondo
  logo.png            Logo de Luffy, centrado sobre el fondo
  personajes/         Imágenes de personajes (fotos de los círculos y PNG sin fondo)
src/
  menuData.js         Todo el contenido del menú: secciones, platos y precios
  App.jsx             Componentes de la carta
  Badge.jsx           Círculos tipo cartel "WANTED" y calavera del logo
  Icon.jsx            Íconos de las secciones
  styles.css          Estilos
```

## Cómo editar el menú

Todo el contenido está en [src/menuData.js](src/menuData.js). Ahí se cambian los nombres, los precios y las frases de cada sección.

- **Foto en el círculo de una sección:** agregar el campo `photo` con la ruta de la imagen, por ejemplo `/personajes/hamburguesas.jpg`.
- **Personaje junto a una sección:** agregar el campo `char` con un número del 1 al 6 y guardar el PNG sin fondo como `public/personajes/personaje-N.png`.
