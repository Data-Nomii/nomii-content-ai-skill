# NOMII Carousel Builder — Figma plugin

Convierte el `carousel.figma.json` que genera la skill NOMII en **láminas editables**
(1080×1440) dentro de Figma, con la paleta, safe areas, Rubik y capas nombradas de
forma estable para que el diseñador ajuste sin rehacer nada.

## Por qué existe

Figma **no** puede crear diseño editable desde afuera (la REST API no escribe frames/capas).
El único camino soportado es un **plugin** que corra dentro de Figma. Este es ese plugin.

- Subir un PNG a Figma → imagen plana, **no editable**.
- Este plugin → frames con textos, formas y capas nombradas, **100% editables**.

## Instalar (modo desarrollo, gratis, sin publicar)

1. Figma Desktop → menú **Plugins → Development → Import plugin from manifest…**
2. Selecciona `manifest.json` de esta carpeta.
3. Listo: aparece en **Plugins → Development → NOMII Carousel Builder**.

No requiere plan pago ni acceso de red — corre 100% local.

## Usar

1. Genera el carrusel con la skill → obtienes `carousel.figma.json`.
2. En Figma, corre **NOMII Carousel Builder**.
3. Pega el JSON (o pulsa **Cargar ejemplo**) y pulsa **Construir carrusel**.
4. Se crean las láminas `slide_01`, `slide_02`, … junto al centro del lienzo.

## Capas que genera (nombres estables)

```
background   image        logo         isotipo
title        subtitle     caption      pill
body         bullet_1..3  chat_1..4    cta
```

Frames: `slide_01`, `slide_02`, …

## Templates soportados

| template (en el JSON)            | resultado                                  |
|----------------------------------|--------------------------------------------|
| `Portada tipo A - cover soft azul` | foto full-bleed + gradiente azul + texto blanco |
| `Portada tipo B - cover soft blanco` | foto + difuminado blanco superior + texto oscuro |
| `Interior - card text`           | imagen en card + título + bullets           |
| `Interior - chat bubbles`        | 2–4 burbujas de chat                        |
| `Interior - 50/50`               | imagen arriba / texto abajo                 |
| `Intermedio - flat pause`        | fondo azul + frase corta centrada           |
| `Interior - pop-up card`         | imagen + chips                              |
| `Cierre - CTA`                   | isotipo + frase + pill de CTA               |

Un template desconocido cae en `card text` como fallback seguro.

## Notas de marca

- Las capas `logo` / `isotipo` se crean como **placeholders posicionados y nombrados**
  (no se dibuja/aproxima la marca). El diseñador pega el asset oficial encima.
- Las capas `image` son placeholders celeste con etiqueta "IMAGEN · reemplazar";
  el diseñador coloca la foto real del banco aprobado.
- Tipografía: **Rubik** (Light / Medium / Medium Italic). Debe estar disponible en Figma.
- Paleta: celeste `#77BFD0`, azul `#104574`, texto `#3C3C3B`, fondo `#F8F8F8`.

## Contrato de entrada

Ver `templates/carousel/figma-carousel.schema.json` y valida con
`scripts/validate-carousel-json.js` antes de pegar el JSON.
