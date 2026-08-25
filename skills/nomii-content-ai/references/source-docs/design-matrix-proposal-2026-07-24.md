# Propuesta de matriz design para carruseles NOMII

Fecha: 2026-07-24

## Lectura ejecutiva

El comentario del diseñador confirma que el sistema actual va bien encaminado: ya existen las familias de lamina correctas (`CoverSlide`, `CardTextSlide`, `ChatSlide`, `FiftyFiftySlide`, `FlatPauseSlide`, `PopoutSlide`, `CtaSlide`) y los tokens base de NOMII. La mejora importante es convertir esas piezas en una matriz de decision mas estricta para que la IA no elija plantillas por nombre ambiguo, sino por intencion, tipo de imagen, zona segura de texto y funcion narrativa dentro del carrusel.

La recomendacion principal es separar el sistema en tres capas:

1. **Matriz editorial**: que decide la secuencia del carrusel segun objetivo de contenido.
2. **Matriz visual**: que decide el tipo exacto de lamina, sus variantes, reglas de imagen y restricciones de texto.
3. **Checklist de validacion**: que bloquea errores antes de exportar, especialmente rostros tapados, covers mal nombrados, texto demasiado alto/bajo y CTA sin jerarquia.

## Principios tomados de referencias externas

Las herramientas y practicas mas fuertes de contenido con IA convergen en cuatro ideas:

- **Sistema antes que prompt**: Figma plantea que mientras mas claro y completo es el design system, mas probable es que la IA produzca piezas on-brand. Para NOMII esto significa que la matriz debe estar en la skill, no depender de memoria verbal.
- **Brand kit automatico**: Canva AI enfatiza crear con fuentes, colores y reglas de marca integradas. Para NOMII, colores, Rubik, logos, safe area y variantes de lamina deben estar codificados como decisiones cerradas.
- **Plantillas bloqueadas, contenido editable**: Figma Buzz permite que equipos creen assets manteniendo restricciones de marca. Para NOMII conviene bloquear layout, logo, paleta y zonas de texto; permitir editar copy, imagen, foco de imagen y variante.
- **Draft editable despues de IA**: Piktochart AI genera carruseles editables, no una imagen final cerrada. Para NOMII, la salida ideal debe conservar datos estructurados por lamina antes del render final.
- **Carrusel como mini landing page**: las guias actuales de estrategia de carruseles tratan portada, slide 2, desarrollo y CTA como una secuencia de micro-compromisos. NOMII debe usar cada lamina con una funcion narrativa explicita.

Referencias:

- Figma, "How design systems power AI workflows": https://www.figma.com/reports/design-systems-power-the-pace/
- Canva AI 2.0: https://www.canva.com/canva-ai/
- Figma Buzz: https://www.figma.com/buzz/
- Piktochart AI Carousel Maker: https://piktochart.com/ai-carousel-maker/
- TrueFuture Media, "Instagram Carousel Strategy 2026": https://www.truefuturemedia.com/articles/instagram-carousel-strategy-2026

## Nomenclatura recomendada

Hay que resolver la ambiguedad actual entre `Cover · Photo`, `Cover · Soft` y lo que el diseñador llama cover soft azul/blanco.

Propuesta canonica:

| Nombre nuevo en Notion / Skill | Alias actual probable | Uso |
| --- | --- | --- |
| `Portada tipo A · cover soft azul` | `Cover · Photo` / `cover photo` | Foto full-bleed, degradado azul inferior, texto abajo. Ideal con medico/persona protagonista. |
| `Portada tipo B · cover soft blanco` | `Cover · Soft` / `cover soft` | Foto full-bleed con degradado blanco superior, texto arriba bajo logo. Ideal con imagen amplia/generica. |
| `Interior · card text` | `Card + Text` | Imagen contextual en card redondeada + titulo/texto/lista. |
| `Interior · chat bubbles` | `Chat Lamina` | Burbujas tipo chat para dudas, objeciones, pensamientos o punteos cortos. |
| `Interior · 50/50` | `50/50 Lamina` | Imagen media lamina + texto centrado en la otra mitad. |
| `Intermedio · flat pause` | `Flat / Pause Lamina` | Pausa emocional o frase puente, solo fondo + texto. |
| `Interior · pop-up card` | `Pop-out Lamina` | Imagen en card + burbujas/chips de apoyo. |
| `Cierre · CTA` | `CTA Lamina` | Isotipo + bajada + llamada a accion. |

Regla importante: el nombre debe incluir **tipo narrativo + variante visual**. Por ejemplo: `Portada tipo A · cover soft azul`, no solo `Cover`.

## Matriz design por tipo de lamina

### 1. Portada tipo A · cover soft azul

**Funcion narrativa:** detener el scroll con una tension clara: dolor, insight o estadistica.

**Cuando usarla:**

- Hay una persona protagonista: medico, enfermero, residente, profesional en hospital.
- El hook necesita sentirse humano, emocional o aspiracional.
- El rostro debe ser el activo visual principal.

**Imagen:**

- Full-bleed en todo el canvas.
- Persona centrada o levemente desplazada arriba/centro.
- Rostro y torso superior sin texto encima.
- Foco de imagen recomendado: `center 35%` o ajuste manual por rostro.

**Texto:**

- Siempre abajo, dentro de la zona del degradado azul.
- Estructura: pill estadistica opcional + titulo fuerte + caption breve opcional.
- Maximo recomendado: 1 pill + 2 lineas de titulo + 1 caption.

**Color:**

- Degradado inferior azul `#104574` con transparencia.
- Texto blanco.
- Pill celeste `#77BFD0`.
- Logo blanco.

**Validacion IA:**

- Detectar cara/persona antes de ubicar texto.
- Mantener margen minimo de 120 px entre caja de texto y rostro.
- Si la imagen tiene cara baja o primer plano demasiado cerrado, rechazar o cambiar a `Card Text`.

**Cambios al sistema actual:**

- Renombrar `variant="photo"` a alias visible `coverSoftAzul`.
- Agregar propiedad `subjectSafeZone` o al menos `imageFocus`.
- Agregar prompt rule: "nunca cubrir cara, ojos, boca ni torso alto con texto".

### 2. Portada tipo B · cover soft blanco

**Funcion narrativa:** abrir con un concepto mas editorial, institucional o contextual.

**Cuando usarla:**

- Imagen amplia: hospital, ciudad alemana, pasillo clinico, grupo pequeno, manos, estetoscopio, documentos, viaje.
- El foco no debe depender de una cara individual.
- El texto necesita respirar en la zona superior.

**Imagen:**

- Full-bleed, pero con composicion amplia.
- Evitar retratos cerrados de medicos.
- Mejor con sujetos pequenos, contexto arquitectonico o detalle medico.

**Texto:**

- Arriba, bajo el logo.
- Nunca al nivel del logo ni por encima.
- Bloque centrado o alineado suave, entre 200 y 430 px desde arriba.

**Color:**

- Degradado superior gris claro/blanco hacia transparencia.
- Texto gris oscuro `#3C3C3B`.
- Caja de apoyo celeste solo si el copy lo pide.
- Logo azul.

**Validacion IA:**

- Si la imagen contiene rostro dominante, no usar esta variante salvo que el rostro este claramente fuera de la zona superior.
- Si el degradado corta cabeza/persona, cambiar a tipo A o buscar otra imagen.

**Cambios al sistema actual:**

- Mantener `variant="soft"`, pero renombrarlo publicamente a `coverSoftBlanco`.
- Actualizar descripcion de la card `lamina-cover-soft.card.html`.
- Agregar regla de seleccion de imagen amplia.

### 3. Interior · card text

**Funcion narrativa:** explicar una idea con apoyo visual contextual.

**Cuando usarla:**

- Hay una idea principal + explicacion corta.
- Sirve para expectativa vs realidad, definiciones, mini contexto, "lo que nadie te dice".
- Necesita foto, pero la foto no debe dominar toda la lamina.

**Imagen:**

- Card redondeada, ideal 16:10.
- Contextual al tema de la lamina.
- Puede ser persona, detalle medico, hospital, ciudad o documento.

**Texto:**

- Bajo la imagen.
- Titulo corto celeste.
- Cuerpo de 1 a 3 lineas o lista de 3 puntos.

**Color:**

- Fondo gris claro `#F8F8F8`.
- Texto principal gris oscuro.
- Titulo o keywords en celeste.
- Logo azul.

**Validacion IA:**

- No mas de 65-75 palabras por lamina.
- Si hay mas de 3 bullets, dividir en dos laminas o cambiar a secuencia.

**Cambios al sistema actual:**

- Agregar variantes: `body`, `bullets`, `quote`.
- Añadir limite de copy al schema.

### 4. Interior · chat bubbles

**Funcion narrativa:** representar dudas internas, objeciones o preguntas del usuario.

**Cuando usarla:**

- El contenido funciona como pensamientos: "¿y si no me adapto?", "¿cuanto tarda?", "¿vale la pena?".
- Hay varias frases cortas que necesitan ritmo.
- Queremos empatizar antes de explicar.

**Imagen:**

- No usa imagen.

**Texto:**

- Lead breve opcional.
- 2 a 4 burbujas.
- Cada burbuja: maximo 1 idea, ideal 5-11 palabras.

**Color:**

- Variante A: fondo celeste, burbujas blancas o blanco/transparente con texto azul/gris.
- Variante B: fondo gris claro, burbujas celestes con texto blanco.
- Usar contraste claro; no burbujas celestes sobre fondo celeste sin cambio de valor.

**Validacion IA:**

- No convertir parrafos en burbujas largas.
- Si la lamina esta educando con pasos concretos, considerar `Card Text` o `Pop-up Card`.

**Cambios al sistema actual:**

- Hoy `ChatSlide` usa fondo celeste y burbujas por defecto. Agregar `tone="accent" | "neutral"` para alternar celeste/gris.
- Permitir burbuja `outline` o `filled` segun fondo.

### 5. Interior · 50/50

**Funcion narrativa:** contraste visual + una afirmacion equilibrada.

**Cuando usarla:**

- Se necesita dividir imagen y texto con peso similar.
- Buen formato para "antes/despues", "contexto/conclusion", "problema/camino".
- Ideal para laminas de transicion con contenido sustantivo.

**Imagen:**

- Ocupa mitad superior por defecto.
- Imagen centrada y completa dentro de su area.
- Puede ser persona, hospital, ciudad o escena de trabajo, porque el texto no la invade.

**Texto:**

- Mitad inferior.
- Centrado, equilibrado verticalmente.
- 2 a 4 lineas rich text.

**Color:**

- Fondo texto gris claro.
- Texto gris oscuro, keywords medium y giros emocionales en celeste italic.
- Logo azul en zona clara; si imagen queda arriba, logo sobre fondo puede requerir proteccion.

**Validacion IA:**

- No usar si el texto supera 45-55 palabras.
- Chequear que el logo no quede sobre una zona compleja de la foto.

**Cambios al sistema actual:**

- Agregar `imageFocus` a `FiftyFiftySlide`.
- Agregar modo `logoContrast="auto"` o elegir logo segun zona superior.

### 6. Intermedio · flat pause

**Funcion narrativa:** pausa, golpe emocional o frase puente.

**Cuando usarla:**

- Despues de una tension fuerte y antes de una solucion.
- Para destacar una frase que debe guardarse.
- Para respirar entre laminas con foto.

**Imagen:**

- No usa imagen.

**Texto:**

- Una sola frase.
- Maximo 12-18 palabras.
- Ideal en Rubik Medium Italic.

**Color:**

- Fondo azul, celeste, gris claro o blanco/gris claro.
- Si fondo es azul/celeste, texto blanco.
- Si fondo es gris claro, texto gris oscuro con keyword celeste.

**Validacion IA:**

- Si hay explicacion, no es pausa: usar `Card Text`.
- No repetir dos flat pause seguidas.

**Cambios al sistema actual:**

- Expandir `FlatPauseSlide` para soportar fondo gris claro con texto oscuro.
- Agregar variante `blue`, `accent`, `light`.

### 7. Interior · pop-up card

**Funcion narrativa:** combinar contexto visual con puntos destacados.

**Cuando usarla:**

- Hay una imagen que contextualiza y 2-4 claims/punteos que conviene destacar.
- Buen formato para procesos, requisitos, beneficios, checklist corto.
- Sirve muy bien para app/documentos/servicio si queremos mostrar "pruebas" o elementos alrededor.

**Imagen:**

- Card redondeada, ideal persona o detalle.
- Puede tener sujeto saliendo del marco si la imagen lo permite.

**Texto:**

- Titulo breve.
- 2 a 4 burbujas/chips alrededor o debajo.
- Cada chip debe tener maximo 2 lineas.

**Color:**

- Fondo gris claro.
- Card blanca o imagen directa con sombra suave.
- Chips celestes o outline celeste/azul segun contraste.

**Validacion IA:**

- No poner burbujas encima de rostros.
- No cubrir manos/documentos si son el punto de la imagen.

**Cambios al sistema actual:**

- `PopoutSlide` hoy usa chips debajo. Crear variante `overlayChips` para ubicar chips alrededor con reglas de zonas.
- Reutilizar `ChatBubble` y `OutlinePill` como opciones.

### 8. Cierre · CTA

**Funcion narrativa:** cerrar con proxima accion clara, no con mas informacion.

**Cuando usarla:**

- Ultima lamina siempre.
- Cierre de conversacion: guardar, comentar, escribir, postular, revisar ZAI.

**Imagen:**

- No usa imagen en la version base.

**Texto:**

- Isotipo protagonista.
- Bajada emocional/estrategica.
- CTA en burbuja/pastilla.
- Maximo: 1 frase + 1 CTA.

**Color:**

- Preferido: fondo celeste `#77BFD0`, isotipo blanco, texto blanco.
- Alternativas: azul con blanco, gris claro con texto gris oscuro y pastilla celeste.

**Validacion IA:**

- CTA debe tener verbo.
- No meter bullets ni informacion nueva.

**Cambios al sistema actual:**

- Agregar variante `light` para CTA sobre gris claro.
- Permitir `ctaTone="pillFilled" | "outline"` segun fondo.

## Matriz editorial de secuencia

### Carrusel educativo / awareness

1. Portada tipo A o B: dolor o pregunta.
2. Chat bubbles: dudas reales del profesional.
3. Card text: contexto/explicacion.
4. 50/50: contraste problema vs oportunidad.
5. Pop-up card: requisitos o puntos clave.
6. Flat pause: frase memorable.
7. CTA: siguiente paso.

### Carrusel de objeciones

1. Portada tipo A: objecion fuerte.
2. Chat bubbles: pensamientos del usuario.
3. Card text: responder objecion 1.
4. Card text o 50/50: responder objecion 2.
5. Pop-up card: prueba/beneficios.
6. CTA.

### Carrusel de proceso ZAI

1. Portada tipo B: contexto institucional.
2. Card text: que es ZAI.
3. Pop-up card: pasos o beneficios.
4. 50/50: antes/despues del proceso.
5. Card text: requisitos.
6. Flat pause: "no tienes que resolverlo solo".
7. CTA.

### Carrusel emocional / carrera medica

1. Portada tipo A con medico/persona.
2. Chat bubbles.
3. Flat pause.
4. 50/50.
5. Card text.
6. CTA.

## Reglas globales para la IA

### Seleccion de lamina

La IA debe elegir la lamina usando estas preguntas:

1. ¿La lamina abre, desarrolla, pausa o cierra?
2. ¿Necesita rostro protagonista?
3. ¿El texto debe invadir la imagen o vivir separado?
4. ¿La idea es emocional, explicativa, comparativa o accionable?
5. ¿La imagen disponible permite la variante elegida?

### Seleccion de imagen

- Rostro/persona protagonista: usar portada tipo A, card text, 50/50 o pop-up card.
- Imagen amplia/generica: usar portada tipo B, card text o 50/50.
- Documento, estetoscopio, manos, pasillo, hospital: ideal para portada tipo B o pop-up card.
- Si hay primer plano de rostro y se necesita mucho texto: no usar cover blanco.

### Copy por lamina

- Portada: 7-14 palabras en titulo, mas pill opcional.
- Chat bubbles: 2-4 burbujas, 5-11 palabras cada una.
- Card text: 1 titulo + cuerpo corto o 3 bullets.
- 50/50: 2-4 lineas, maximo 55 palabras.
- Flat pause: 12-18 palabras.
- CTA: 1 frase + 1 accion.

### Control visual

- Logo siempre dentro de safe area.
- No usar bold.
- No usar emoji.
- No usar blanco puro como fondo interior salvo dentro de card/pill; el fondo base debe ser `#F8F8F8`.
- Maximo 1-2 fondos dominantes por carrusel.
- Alternar ritmo: no mas de 2 laminas seguidas con el mismo tipo visual.

## Adaptacion concreta de lo que tenemos

### 1. Actualizar nombres en manifest/cards

Cambiar nombres visibles:

- `Cover · Photo` -> `Portada tipo A · cover soft azul`
- `Cover · Soft` -> `Portada tipo B · cover soft blanco`
- `Card + Text` -> `Interior · card text`
- `Chat Lamina` -> `Interior · chat bubbles`
- `50/50 Lamina` -> `Interior · 50/50`
- `Flat / Pause Lamina` -> `Intermedio · flat pause`
- `Pop-out Lamina` -> `Interior · pop-up card`
- `CTA Lamina` -> `Cierre · CTA`

### 2. Actualizar `CoverSlide.jsx`

- Mantener compatibilidad con `variant="photo"` y `variant="soft"`.
- Agregar aliases:
  - `variant="coverSoftAzul"` equivalente a `photo`.
  - `variant="coverSoftBlanco"` equivalente a `soft`.
- Agregar props:
  - `imageFocus`
  - `textZone="bottom" | "top"`
  - `subjectKind="person" | "wide_context" | "detail"`
- Validar/documentar:
  - `coverSoftAzul` acepta `person`, `wide_context`, `detail`.
  - `coverSoftBlanco` prefiere `wide_context` y `detail`; evita `person` dominante.

### 3. Actualizar `ChatSlide.jsx`

- Agregar `variant="accent" | "neutral"`.
- `accent`: fondo celeste/azul, burbujas blancas u outline claro.
- `neutral`: fondo gris claro, burbujas celestes con texto blanco.
- Limitar burbujas a 4 por defecto.

### 4. Actualizar `FlatPauseSlide.jsx`

- Agregar variantes de fondo:
  - `accent`: celeste + blanco.
  - `institutional`: azul + blanco.
  - `light`: gris claro + gris oscuro/celeste.
- Soportar rich text simple para palabra en celeste cuando fondo es claro.

### 5. Actualizar `CtaSlide.jsx`

- Agregar variantes:
  - `accent`: celeste, isotipo blanco, texto blanco, pill outline blanco.
  - `institutional`: azul, isotipo blanco, texto blanco.
  - `light`: gris claro, isotipo celeste, texto gris oscuro, CTA pill celeste.

### 6. Agregar un schema de lamina

Cada lamina generada deberia guardar una estructura antes del render:

```json
{
  "slide_number": 1,
  "role": "cover | context | empathy | explain | contrast | pause | cta",
  "template": "coverSoftAzul",
  "image_kind": "person | wide_context | detail | none",
  "image_focus": "center 35%",
  "text_zone": "bottom",
  "copy": {
    "pill": "4 de cada 5 médicos",
    "title": "no quedan en el ENARM",
    "caption": "(no lo decimos nosotros, lo dicen las estadísticas)"
  },
  "validation": {
    "face_clear": true,
    "safe_area_ok": true,
    "copy_length_ok": true,
    "brand_ok": true
  }
}
```

### 7. Agregar checks automaticos

Antes de exportar:

- Verificar dimensiones 1080 x 1440.
- Verificar que logo/isotipo exista y no fue redibujado.
- Verificar que no haya `font-weight: 700`.
- Verificar que no haya emoji.
- Verificar cantidad de palabras por lamina.
- Para portadas con persona: marcar validacion manual/visual de rostro libre.
- Para cover blanco: marcar si la imagen es retrato cerrado y sugerir reemplazo.

## Propuesta de columnas Notion

Campos minimos para mejorar la generacion:

- `Tipo de lamina`: nombre canonico de la matriz.
- `Rol narrativo`: portada, empatia, contexto, explicacion, contraste, pausa, CTA.
- `Variante visual`: azul, blanco, neutral, accent, institutional, light.
- `Tipo de imagen`: persona, contexto amplio, detalle medico, hospital/ciudad, ninguna.
- `Zona de texto`: arriba, abajo, separado, centrado.
- `Copy principal`: titulo/frase.
- `Copy apoyo`: caption, cuerpo o bajada.
- `Pill/CTA`: estadistica, chip o llamada a accion.
- `Restricciones visuales`: rostro libre, evitar retrato, logo blanco/azul, etc.
- `Estado QA`: pendiente, revisar diseno, aprobado, exportado.

## Iteracion recomendada

### Iteracion 1: ordenar la matriz

- Renombrar tipos de lamina en Notion/skill.
- Agregar descripciones claras por tipo.
- Crear 1 ejemplo canonico por cada tipo.

### Iteracion 2: endurecer componentes

- Agregar aliases y variantes a componentes existentes.
- Incorporar limites de texto y opciones de fondo.
- Agregar `imageFocus` donde falte.

### Iteracion 3: mejorar seleccion IA

- Pedir a la IA que primero genere el schema estructurado.
- Luego renderizar segun template.
- Luego validar contra checklist.

### Iteracion 4: QA visual

- Exportar carrusel de prueba usando las 8 laminas.
- Revisar con el diseñador:
  - covers con rostro,
  - covers blancos con imagen amplia,
  - alternancia de fondos,
  - CTA final.

## Decision propuesta

Aceptar el comentario del diseñador como direccion correcta, con un ajuste: no llamaria todo "cover soft" porque confunde. Dejaria `cover soft azul` y `cover soft blanco` como nombres humanos visibles, pero internamente usaria `coverSoftAzul` y `coverSoftBlanco`. Asi se conserva lo que el diseñador necesita y se vuelve mas facil para la skill/IA elegir sin ambiguedad.

## Addendum: contexto de campana para mejorar imagen y testing

El segundo comentario del diseñador agrega una capa estrategica clave: la matriz no debe construir la imagen solo desde la lamina, sino desde la intencion de la campana. Esto permite aprender despues que combinaciones de hook, imagen, insight, dolor y formato visual responden mejor.

La recomendacion es agregar una capa previa llamada **brief de campana**. Esa capa alimenta a la matriz editorial y visual.

### Nuevas variables recomendadas

| Variable | Para que sirve | Donde deberia vivir |
| --- | --- | --- |
| `Objetivo de campana` | Define si el carrusel busca alcance, consideracion, conversion, dossier, remarketing, prueba de insight, educacion o autoridad. | Columna Notion obligatoria. |
| `Hipotesis de campana` | Explica que creemos que va a pasar y por que vale la pena testearlo. | Columna Notion obligatoria. |
| `Insight / dolor` | Conecta el contenido con una tension real descubierta en entrevistas/investigacion. | Columna Notion obligatoria. |
| `Buyer persona` | Define a quien se le habla: medico joven, especialista, enfermera, profesional frustrado, etc. | Columna Notion obligatoria o relacion a base de personas. |
| `Momento de conciencia` | Ordena si la persona aun no sabe del problema, ya lo reconoce, compara opciones o esta lista para actuar. | Columna Notion recomendada. |
| `Objetivo de performance` | Define que queremos medir: guardados, comentarios, clicks, leads, DM, finalizacion del carrusel, shares. | Columna Notion obligatoria. |
| `Variable a testear` | Aisla el aprendizaje: hook, imagen, persona, CTA, dolor, beneficio, formato de lamina. | Columna Notion obligatoria. |
| `Promesa / angulo` | Resume la idea que debe dominar el carrusel. | Columna Notion recomendada. |
| `Restriccion creativa` | Evita errores: no usar retrato, no tapar rostro, usar hospital amplio, no tono alarmista, etc. | Columna Notion recomendada. |

### Como entra esto en el flujo

1. La IA lee el brief de campana.
2. Selecciona el rol narrativo de cada lamina.
3. Selecciona el tipo de lamina.
4. Define el tipo de imagen ideal por lamina.
5. Genera o elige imagen segun hipotesis, buyer persona y objetivo.
6. Valida si la imagen realmente sirve para aprender algo medible.

### Regla de oro

Si una imagen no ayuda a testear la hipotesis o reforzar el dolor/insight, aunque se vea bonita, no deberia pasar QA.
