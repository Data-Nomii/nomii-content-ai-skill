# Avance tecnico semanal: sistema NOMII Content AI

Fecha: 2026-07-24  
Proyecto: NOMII Content AI  
Canal operativo: Discord `#nomii-content-ai`  
Base operativa: Notion `Design Systema AI`

## 1. Resumen ejecutivo

Durante esta semana se avanzo desde una entrega inicial de contenido y design system hacia un sistema operativo funcional para producir carruseles NOMII con IA, subirlos a Notion y dejarlos disponibles para validacion.

El sistema ya no opera como un generador aislado de imagenes. La arquitectura actual conecta:

- contenido aprobado en grilla;
- base de datos Notion;
- matriz de decision editorial, visual y de performance;
- skill NOMII;
- design system de marca;
- render de carruseles en laminas `1080x1440`;
- subida de imagenes generadas a Notion;
- decision de Figma como salida editable profesional;
- estados de validacion para seguimiento.

El objetivo del avance es transformar el proceso de carruseles en un flujo trazable, repetible y optimizable. Lo importante no es citar herramientas externas, sino documentar como estamos operando hoy: Notion concentra la grilla y la matriz, el agente consulta y optimiza la fila, la skill NOMII gobierna la marca, el render se genera como carrusel visual y el resultado se sube nuevamente a Notion para validacion.

Este sistema ademas deja preparada la etapa Step 2 de la estrategia: experimentar con Claude, APIs de imagen y modelos multimodales sin perder el control operativo de la matriz.

Decision posterior del mismo dia: para que los carruseles queden igual de profesionales pero editables por el disenador, la salida editable principal sera Figma. Canva queda como alternativa futura y Illustrator como fallback local.

## 2. Punto de partida del sistema

El flujo parte cuando la grilla de contenido esta lista y aprobada para produccion. Ese es el trigger operativo del sistema: una fila de Notion queda disponible para ser transformada en carrusel.

La entrada minima esperada es:

- titulo o tema del carrusel;
- formato, por ejemplo `Carrusel`;
- contenido base o brief;
- objetivo del contenido;
- estado de avance;
- CTA;
- imagenes o referencias cargadas, cuando existan;
- campo `Imagenes generadas AI` vacio, que indica que todavia no existe salida final generada por el sistema.

Con esa entrada, el sistema consulta Notion, identifica filas candidatas, completa columnas estrategicas si estan vacias, genera la estructura de laminas y deja el carrusel cargado nuevamente en Notion para revision.

## 3. Componentes construidos

### 3.1 Workspace tecnico del proyecto

Se creo y ordeno el workspace canonico:

```text
<project-root>
```

Dentro del proyecto se mantienen:

- `README.md`: descripcion del sistema y estructura del proyecto.
- `PROJECT_BRIEF.md`: objetivo, alcance, riesgos y fuentes del sistema.
- `SKILL.md`: entrada principal de la skill NOMII.
- `design-system/`: paquete completo de marca y carruseles.
- `workflows/notion-to-carousel.md`: flujo operativo Notion -> carrusel -> Notion.
- `docs/`: documentos de matriz, decisiones y avances.
- `outputs/`: carruseles generados localmente antes o despues de subir a Notion.
- `scripts/with-nomii-notion-env.sh`: wrapper para operar Notion con credenciales NOMII aisladas.
- `scripts/nomii-notion-preflight.sh`: validacion de acceso Notion.

### 3.2 Skill NOMII

La skill activa del proyecto es `nomii-design`. Su funcion es convertir las reglas de marca NOMII en instrucciones operativas para un agente o modelo.

La skill define invariantes que no se deben romper:

- formato de carrusel vertical `1080x1440`;
- safe area superior/inferior de `85px` y lateral de `63px`;
- logo top-right de `200px` en laminas regulares;
- isotipo centrado en lamina CTA;
- tipografia Rubik;
- prohibicion de bold y emoji;
- paleta oficial: celeste `#77BFD0`, azul `#104574`, gris oscuro `#3C3C3B`, gris claro `#F8F8F8`;
- tono en espanol, empatico y estrategico, hablando de `tu`;
- uso exclusivo de logos e isotipos oficiales.

### 3.3 Design system

El design system se conserva como fuente canonica de produccion visual. Incluye:

- assets de marca;
- logos e isotipos;
- fuentes Rubik;
- banco fotografico aprobado;
- key visuals de referencia;
- tokens CSS de color, layout y tipografia;
- componentes reutilizables;
- templates de carrusel;
- UI kit de laminas.

Las familias de lamina actualmente identificadas son:

- `CoverSlide`;
- `CardTextSlide`;
- `ChatSlide`;
- `FiftyFiftySlide`;
- `FlatPauseSlide`;
- `PopoutSlide`;
- `CtaSlide`.

Estas familias fueron conectadas con la nomenclatura de diseno definida junto al feedback del disenador.

## 4. Base de datos Notion: `Design Systema AI`

La base `Design Systema AI` funciona como centro de control del sistema.

Esta base no solo almacena posts. Ahora opera como una matriz de produccion, estrategia, diseno y aprendizaje. La logica es que Notion tenga suficiente informacion para que el LLM no genere imagenes genericas, sino piezas alineadas a campaña, insight, buyer persona, layout y performance.

### 4.1 Columnas agregadas u ordenadas

Se agregaron y ordenaron columnas nuevas con prefijos numericos para mantener agrupacion logica:

```text
01 Objetivo de campana
02 Subobjetivo
03 KPI principal
04 KPI secundario
05 Hipotesis
06 Insight / dolor
07 Buyer persona
08 Nivel de conciencia
09 Variable a testear
10 Resultado esperado
11 Rol narrativo
12 Tipo de imagen
13 Zona de texto
14 Face-safe required
15 Image focus
16 CTA tipo
17 Estado diseno
18 Estado performance
19 Learning
20 Variante A/B
```

### 4.2 Funcion de las columnas

Las columnas 01 a 10 conectan la pieza con estrategia y performance.  
Las columnas 11 a 16 conectan la estrategia con decisiones visuales concretas.  
Las columnas 17 a 20 permiten controlar estado, validacion y aprendizaje posterior.

Esto permite que cada carrusel tenga una hipotesis clara:

- que se quiere probar;
- a que dolor responde;
- que buyer persona activa;
- que imagen corresponde;
- que variable se esta testeando;
- que KPI se va a mirar despues.

## 5. Matriz de diseno IA

La matriz de diseno convierte el comentario del disenador en reglas ejecutables para IA.

La decision principal fue no dejar nombres ambiguos como `Cover Photo` o `Cover Soft` sin contexto. Se propuso una nomenclatura canonica:

| Nombre canonico | Alias previo | Uso |
| --- | --- | --- |
| `Portada tipo A · cover soft azul` | `Cover Photo` / `cover photo` | Foto full bleed, degradado azul inferior, texto abajo, ideal para doctores o personas protagonistas. |
| `Portada tipo B · cover soft blanco` | `Cover Soft` / `cover soft` | Foto full bleed con degradado blanco superior, texto arriba bajo logo, ideal para hospitales, ciudad, grupos, manos o imagenes amplias. |
| `Interior · card text` | `Card Text` | Imagen contextual en card redondeada + texto o bullets. |
| `Interior · chat bubbles` | `Chat Lamina` | Burbujas para dudas, objeciones o pensamientos del buyer. |
| `Interior · 50/50` | `50/50 Lamina` | Imagen y texto con peso equilibrado. |
| `Intermedio · flat pause` | `Flat / Pause` | Pausa emocional, solo fondo + texto. |
| `Interior · pop-up card` | `Popout Card` | Imagen en card + burbujas/chips destacados. |
| `Cierre · CTA` | `CTA` | Cierre con isotipo, bajada y llamada a la accion. |

## 6. Como operamos hoy para construir un carrusel

La generacion del carrusel no empieza con un prompt suelto. Empieza con una fila de Notion y una matriz estructurada. El agente toma esa fila, completa contexto, decide como debe construirse cada lamina y despues produce el artefacto visual.

El orden operativo actual es:

1. Leer fila de Notion.
2. Confirmar que la fila esta lista para produccion.
3. Completar o inferir campos de matriz si estan vacios.
4. Definir objetivo de campana.
5. Definir hipotesis, insight y buyer persona.
6. Definir KPI principal y variable a testear.
7. Elegir rol narrativo de cada lamina.
8. Elegir plantilla visual.
9. Determinar tipo de imagen, safe area, face-safe y foco visual.
10. Construir prompt visual o seleccionar imagen del banco.
11. Renderizar en HTML/CSS usando el design system.
12. Exportar laminas `1080x1440`.
13. Subir las imagenes a Notion.
14. Actualizar estados de diseno y performance.
15. Dejar la pagina lista para validacion humana.

Esta separacion evita que el sistema produzca imagenes bonitas pero desconectadas del objetivo real. La IA primero entiende la pieza y despues renderiza.

## 7. Modelo y capa IA que usamos actualmente

La operacion actual corre desde OpenClaw/Codex con el siguiente modelo principal:

```text
Modelo principal: openai/gpt-5.5
Runtime: OpenAI Codex
```

En la practica, este modelo funciona como capa de razonamiento y orquestacion del sistema. Actualmente se usa para:

- interpreta la fila de Notion;
- completa campos estrategicos cuando faltan;
- decide layout y rol de cada lamina;
- transforma feedback del disenador en reglas;
- genera estructura de carrusel;
- produce HTML/CSS usando la skill NOMII;
- coordina exportacion y subida a Notion.

La capa visual actual no depende de pedir una imagen final cerrada a una API externa. Hoy el flujo produce carruseles a partir de:

- assets oficiales del design system;
- banco fotografico aprobado;
- reglas de composicion de cada lamina;
- HTML/CSS controlado;
- exportacion a PNG;
- carga final a Notion.

Esto es clave: actualmente la IA no queda libre para inventar una pieza completa. La IA opera dentro de una skill y un design system. Esa es la diferencia entre "generar imagenes" y construir un sistema de produccion.

Para la siguiente etapa, cuando se prueben APIs de imagen, el mismo modelo puede construir prompts estructurados para un motor de imagen. En ese caso, el proveedor de imagen podria ser OpenAI, Claude conectado a otra herramienta, u otra API. Pero la operacion base seguiria igual: Notion y la matriz definen la intencion; la skill NOMII define la marca; la API solo genera o edita la imagen cuando corresponde.

## 8. Flujo actual Notion -> optimizacion -> carrusel -> Notion

El flujo actual probado funciona asi:

### 8.1 Consulta Notion

El sistema usa el wrapper del proyecto para acceder a Notion con credenciales NOMII aisladas:

```bash
scripts/with-nomii-notion-env.sh
```

Esto evita mezclar credenciales de otros proyectos y mantiene el token de NOMII fuera del chat, fuera del repositorio y fuera de archivos globales.

### 8.2 Identificacion de candidatos

Se consultan filas con:

- formato `Carrusel`;
- imagenes o referencia cargada;
- campo `Imagenes generadas AI` vacio;
- estado compatible con produccion o validacion.

Tambien se ordenan por fecha para priorizar los carruseles mas recientes.

En la corrida actual se identificaron carruseles que ya tenian estructura o insumos visuales, pero no tenian imagen final generada por IA. Esa condicion permite saber que filas estan listas para ser procesadas sin duplicar outputs.

### 8.3 Optimizacion de la base

Cuando una fila no tiene todas las columnas nuevas completas, el sistema puede rellenar las faltantes desde el contenido disponible.

Ejemplo de campos inferibles:

- objetivo de campana;
- subobjetivo;
- KPI principal;
- hipotesis;
- insight/dolor;
- buyer persona;
- nivel de conciencia;
- variable a testear;
- rol narrativo;
- tipo de imagen;
- zona de texto;
- face-safe;
- image focus;
- tipo de CTA;
- estado de diseno;
- estado performance.

Este paso es parte central de la operacion actual. La base no se usa solo como repositorio, sino como brief vivo. Si la fila trae contenido suficiente pero le faltan campos nuevos, el agente completa esos campos para que el carrusel quede conectado a campana, performance y diseno.

### 8.4 Creacion del carrusel

Con la fila completa, el sistema usa la skill NOMII y el design system local para generar una salida visual.

La salida local queda en:

```text
outputs/{slug-del-carrusel}/
```

Cada carpeta puede incluir:

- `index.html`: maqueta/render fuente del carrusel;
- `lamina-1.png`;
- `lamina-2.png`;
- `lamina-3.png`;
- `lamina-4.png`;
- `lamina-5.png`;
- `lamina-6.png`;
- archivos `upload-*.json` con metadata de carga.

La generacion actual se realiza como una maqueta HTML controlada por CSS y assets oficiales. Esto nos da control sobre safe areas, logo, tipografia, paleta, jerarquia y ubicacion de texto. Luego se exporta cada lamina como imagen final.

### 8.5 Subida a Notion

Luego se suben los PNG finales al campo `Imagenes generadas AI` y se insertan tambien en la pagina del carrusel para revision visual.

Despues de la carga, se actualizan estados como:

```text
Estado AI: Diseno generado
17 Estado diseno: Aprobado diseno
18 Estado performance: No publicado / Publicado sin datos
```

La pagina queda lista para que el equipo revise, apruebe o pida ajustes.

## 9. Piloto validado

Se ejecuto un piloto real con la fila:

```text
El camino medico tradicional vs nuevas alternativas
```

Resultado:

- se completo la matriz estrategica y visual de la fila;
- se genero un carrusel de 6 laminas;
- se exportaron PNG `1080x1440`;
- se subieron 6 archivos a `Imagenes generadas AI`;
- se insertaron las laminas en la pagina de Notion;
- se actualizo el estado de IA y diseno;
- se dejo la pagina lista para validacion.

Pagina Notion del piloto:

```text
https://app.notion.com/p/El-camino-m-dico-tradicional-vs-nuevas-alternativas-76b4f31adda382eba4fd812de91a3e9b
```

## 10. Por que esto funciona para la estrategia Step 2

La estrategia Step 2 plantea experimentar con nuevas plataformas, como Claude y APIs de imagen, y construir un banco inteligente de imagenes.

La operacion actual ya crea la base para eso porque separa tres capas que normalmente se mezclan:

1. Estrategia de campana.
2. Decision visual.
3. Produccion tecnica de imagen.

Eso permite probar plataformas sin perder control de marca. Claude, OpenAI, una Image API u otro proveedor pueden entrar como motores de generacion, pero la matriz NOMII sigue definiendo:

- que se esta testeando;
- que imagen corresponde;
- que plantilla se usa;
- donde va el texto;
- que reglas de marca son obligatorias;
- como se mide el resultado.

En otras palabras: el sistema no depende de una sola herramienta. La herramienta genera, pero la matriz gobierna. Por eso podemos probar Claude, OpenAI u otra API sin rehacer el flujo: la entrada sigue siendo Notion, la decision sigue estando en la matriz y la validacion sigue ocurriendo en Notion.

## 11. Banco inteligente de imagenes

El banco inteligente de imagenes deberia evolucionar desde un banco estatico hacia una base aprendible.

Hoy el proyecto ya tiene un banco fotografico aprobado en:

```text
design-system/assets/banco/
```

La siguiente evolucion es etiquetar cada imagen o generacion con metadata util:

| Campo | Funcion |
| --- | --- |
| `Tipo de imagen` | Persona, hospital, ciudad, detalle medico, grupo, documento, Alemania, proceso. |
| `Buyer persona` | Medico joven, especialista, enfermera, profesional con familia, postulante ZAI. |
| `Insight asociado` | Techo profesional, miedo a emigrar, falta de guia, busqueda de estabilidad, vocacion. |
| `Uso recomendado` | Portada A, portada B, card text, 50/50, pop-up. |
| `Face-safe` | Indica si permite texto sin tapar rostro. |
| `Image focus` | Punto de encuadre recomendado. |
| `Performance historica` | Guardados, clicks, DM, comentarios, retencion. |
| `Estado legal/marca` | Aprobada, generada por IA, pendiente revision, descartada. |

Con esto, el sistema podria elegir entre:

- usar una imagen existente del banco;
- editar una imagen existente;
- generar una nueva con API;
- proponer una variante A/B;
- guardar el aprendizaje para futuros carruseles.

## 12. Estado actual del sistema

El sistema ya puede:

- leer y operar con la base Notion de NOMII;
- crear y ordenar columnas estrategicas de matriz;
- identificar carruseles con formato imagen/carrusel y sin imagen generada;
- completar campos vacios desde el contenido disponible;
- aplicar la skill NOMII;
- construir carruseles visuales en HTML/CSS;
- exportar laminas PNG;
- subir imagenes generadas a Notion;
- actualizar estados de control;
- dejar una pagina lista para validacion.

## 13. Pendientes recomendados

Para la siguiente iteracion conviene formalizar:

- estado exacto que activa produccion automatica;
- estado exacto que bloquea produccion;
- plantilla de brief minimo por fila;
- reglas para elegir banco existente vs generacion por API;
- archivo maestro Figma `NOMII Carousel System`;
- componentes Figma por tipo de lamina;
- plugin/importador Figma desde JSON de carrusel;
- columna `Link Figma editable` en Notion;
- registro de variantes A/B;
- formato de aprendizaje posterior a publicacion;
- QA visual automatico para rostro, safe area, logo, contraste y longitud de copy;
- comparativa controlada entre Claude, OpenAI y APIs de imagen.

## 14. Conclusion tecnica

El avance convierte el proceso de carruseles NOMII en una primera version funcional de sistema de contenido con IA.

La clave no es solo generar laminas. La clave es que cada lamina queda conectada a una hipotesis, un objetivo, un buyer persona, una decision de diseno y una validacion en Notion.

Esto deja preparada la base para experimentar con modelos y plataformas sin perder consistencia visual ni trazabilidad de aprendizaje.
