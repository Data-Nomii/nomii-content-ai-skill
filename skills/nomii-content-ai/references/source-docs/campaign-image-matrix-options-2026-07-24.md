# Tabla de decision: matriz de carruseles NOMII + contexto de campana + imagen IA/API

Fecha: 2026-07-24

## Estudio corto: como se construye mejor una imagen para LLM/API

Para un sistema como NOMII, la mejor forma de generar imagenes no es pedir "una imagen bonita para este post". Conviene separar el trabajo en dos pasos:

1. **LLM estrategico**: decide objetivo, hipotesis, buyer persona, insight, rol narrativo, lamina, tipo de imagen y restricciones.
2. **Modelo/API de imagen**: recibe un prompt visual cerrado, con composicion, sujeto, ambiente, estilo, restricciones y formato.

Esto coincide con la documentacion actual de OpenAI: la API permite generar o editar imagenes desde prompts de texto; para un solo render directo conviene Image API, y para experiencias conversacionales/iterativas conviene Responses API con herramienta de imagen. La referencia de OpenAI tambien permite controlar parametros como `quality`, `size`, `format`, compresion y fondo. Para `gpt-image-2`, la referencia indica soporte de tamanos flexibles como strings `WIDTHxHEIGHT`, siempre respetando limites y divisibilidad. La guia/cookbook de prompting recomienda separar claramente lo que cambia de lo que debe permanecer invariante, repetir invariantes en iteraciones y usar cambios pequenos cuando se edita una imagen.

Fuentes oficiales OpenAI:

- Image generation guide: https://developers.openai.com/api/docs/guides/image-generation
- Image generation tool: https://developers.openai.com/api/docs/guides/tools-image-generation
- Image API reference: https://developers.openai.com/api/reference/resources/images/methods/generate/
- GPT Image prompting guide: https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide
- GPT Image 2 model page: https://developers.openai.com/api/docs/models/gpt-image-2

## Arquitectura recomendada

La estructura optima es una matriz de 4 niveles:

1. **Campana**: para que existe el carrusel y que queremos aprender.
2. **Audiencia/insight**: a quien habla y que dolor o hipotesis activa.
3. **Diseno de lamina**: que pieza visual corresponde y con que reglas.
4. **Prompt/API de imagen**: como debe construirse la imagen concreta.

## Tabla comparativa para decidir columnas

| Grupo | Variable actual / comun | Variable de diseno ya definida | Iteracion con ultimo comentario | Version optimizada recomendada | Uso IA/API |
| --- | --- | --- | --- | --- | --- |
| Identificacion | `Nombre del post` / `Titulo` | `Tipo de lamina` | Mantener titulo, pero vincularlo a campana. | `ID campana`, `Nombre carrusel`, `Numero lamina`. | Sirve para trazabilidad y versionado. |
| Objetivo | Tema general del carrusel. | Rol narrativo implicito por plantilla. | Agregar objetivo de campana: alcance, conversion, dossier, consideracion, prueba de insight. | `Objetivo de campana` como select cerrado + `Subobjetivo`. | El LLM elige secuencia y tono segun objetivo. |
| Performance | No siempre existe o queda implicito en "conseguir leads". | No existe en la matriz visual. | Agregar objetivos de performance secundarios. | `KPI principal`, `KPI secundario`, `Evento medible`, `Meta esperada`. | Permite decidir CTA, hook y densidad informativa. |
| Hipotesis | No existe como campo formal. | No existe. | Agregar de donde nace la campana y que se quiere probar. | `Hipotesis`, `Variable a testear`, `Resultado esperado`. | El LLM evita imagenes genericas y diseña para aprender. |
| Insight | Dolor o idea puede estar en copy. | Se refleja en portada/chat/pause. | Agregar dolor o insight desde entrevistas/investigacion. | `Insight validado`, `Dolor principal`, `Tension emocional`, `Fuente del insight`. | Define sujeto, expresion, ambiente y tono visual. |
| Buyer persona | Puede estar en brief suelto. | No existe en diseno. | Agregar buyer persona o puntos principales. | `Buyer persona`, `Nivel de conciencia`, `Pais/mercado`, `Profesion`, `Momento vital`. | Ajusta escena: medico joven, especialista, enfermera, migracion, hospital, estudio, etc. |
| Angulo creativo | Hook/copy principal. | Portada tipo A/B, chat, flat pause. | Conectar angulo a objetivo e insight. | `Angulo`, `Promesa`, `Objecion que responde`, `Emocion dominante`. | Determina si la imagen debe ser humana, institucional, aspiracional o explicativa. |
| Tipo de lamina | Select general: Cover, Card Text, Chat, 50/50, Popout, Flat, CTA. | Nombres nuevos: portada A/B, interiores, pausa, CTA. | Mantener, pero elegir segun campana. | `Rol narrativo` + `Tipo de lamina canonico` + `Variante visual`. | El LLM escoge layout antes de generar imagen. |
| Portadas | `Cover Photo` / `Cover Soft`. | `Portada tipo A · cover soft azul`, `Portada tipo B · cover soft blanco`. | Reforzar reglas de rostro y tipo de imagen. | `Tipo portada`, `Zona texto`, `Tipo imagen permitido`, `Face-safe required`. | Evita tapar caras y evita retratos en cover blanco. |
| Imagen | Imagen contextual, banco o IA. | Reglas por lamina: full-bleed, card, 50/50, sin imagen. | Imagen debe responder al objetivo y al insight. | `Tipo de imagen`, `Sujeto`, `Escena`, `Ambiente`, `Accion`, `Foco visual`, `Restricciones`. | Base del prompt de imagen. |
| Composicion | Generalmente manual/visual. | Texto arriba/abajo/card/centrado segun lamina. | Integrar safe areas segun portada y objetivo. | `Composicion`, `Plano`, `Encuadre`, `Image focus`, `Zona libre de texto`. | Reduce errores en API: rostro tapado, corte raro, logo ilegible. |
| Marca | Paleta, Rubik, logos. | Tokens NOMII: celeste, azul, gris oscuro, gris claro, Rubik. | Sin cambios, pero debe ser obligatorio. | `Brand lock`: paleta, tipografia, logos oficiales, no emoji, no bold. | Invariantes repetidos en cada prompt/render. |
| Copy | Titulo, bajada, bullets, CTA. | Limites por lamina definidos en matriz. | Copy debe servir al test de campana. | `Hook`, `Mensaje principal`, `Support copy`, `CTA`, `Copy length QA`. | El LLM genera copy con limites y relacion a KPI. |
| CTA | CTA final simple. | `Cierre · CTA`. | Diferenciar CTA segun objetivo de campana. | `Tipo CTA`: guardar, comentar, DM, link, postulacion, dossier, agendar. | Conversion: CTA directo; alcance: CTA de comentario/guardado. |
| Testing | No formal. | QA visual basico. | Medir que hook/imagen/elemento visual responde mejor. | `Variante A/B`, `Elemento testeado`, `Hipotesis de aprendizaje`, `Resultado`. | Permite iterar prompts y plantillas con datos. |
| Estado | Pendiente/aprobado/exportado. | `Estado QA` propuesto. | Agregar revision por objetivo/performance. | `Estado contenido`, `Estado diseno`, `Estado performance`, `Learning logged`. | Cierra loop para optimizar futuras imagenes. |

## Columnas recomendadas por prioridad

### Minimo viable

| Columna | Tipo sugerido | Por que entra |
| --- | --- | --- |
| `Objetivo de campana` | Select | Sin esto la IA no sabe si optimiza para alcance, consideracion o conversion. |
| `Hipotesis` | Texto | Obliga a que el carrusel pruebe algo. |
| `Insight / dolor` | Texto | Da direccion emocional y visual. |
| `Buyer persona` | Select/relacion | Define a quien se le habla. |
| `KPI principal` | Select | Conecta diseno con performance. |
| `Variable a testear` | Select | Aisla aprendizaje: hook, imagen, CTA, dolor, beneficio. |
| `Tipo de lamina canonico` | Select | Conecta Notion con el design system. |
| `Tipo de imagen` | Select | Evita usar imagen incorrecta para portada/blanco/persona. |
| `Restricciones visuales` | Texto/multi-select | Evita errores criticos. |

### Ideal para operar bien

| Columna | Tipo sugerido | Por que entra |
| --- | --- | --- |
| `Subobjetivo` | Select | Ej: guardar, comentar, enviar DM, click, lectura completa. |
| `Nivel de conciencia` | Select | Ajusta tono: educar vs convertir. |
| `Angulo creativo` | Texto | Sintetiza la promesa de la pieza. |
| `Objecion que responde` | Texto | Muy util para contenido de conversion. |
| `Pais/mercado` | Select | Cambia referencias: Chile, Mexico, LATAM. |
| `Profesion` | Select | Medico, enfermera, especialista, residente. |
| `Escena visual deseada` | Texto | Prompt visual humano: hospital, ciudad, consulta, papeles, equipo. |
| `Composicion` | Select | Primer plano, plano medio, plano abierto, detalle. |
| `Image focus` | Texto | Control fino para render/crop. |
| `Face-safe required` | Checkbox | Obligatorio para portada tipo A con persona. |
| `CTA tipo` | Select | Alinea cierre con objetivo. |
| `Learning / resultado` | Texto | Guarda que aprendimos despues de publicar. |

## Prompt visual optimizado para API

Usar este orden al construir prompts:

1. **Objetivo**: que debe lograr la imagen en la campana.
2. **Audiencia**: buyer persona y contexto emocional.
3. **Sujeto**: quien o que aparece.
4. **Escena**: lugar, ambiente, accion.
5. **Composicion**: plano, encuadre, posicion del sujeto, espacio libre.
6. **Estilo NOMII**: clinico, limpio, aspiracional, luz natural fria, sin filtros pesados.
7. **Restricciones de marca**: no texto embebido si el layout lo agrega despues; no tapar rostro; no objetos raros; evitar estetica stock generica.
8. **Formato tecnico**: 1080 x 1440 o generacion vertical equivalente, alta calidad, salida PNG/WebP/JPEG segun flujo.

### Template de prompt

```text
Genera una imagen vertical para un carrusel NOMII.

Objetivo de campana: {objetivo_de_campana}.
Hipotesis/insight: {hipotesis_insight}.
Buyer persona: {buyer_persona}.
Lamina: {tipo_lamina} / {variante_visual}.

Imagen requerida:
- Sujeto: {sujeto}.
- Escena: {escena}.
- Accion/estado emocional: {accion_emocion}.
- Composicion: {plano_encuadre}.
- Zona libre: dejar {zona_libre} limpia para texto y logo.
- Foco visual: {image_focus}.

Estilo:
fotografia clinica, limpia, aspiracional, luz natural fria, colores sobrios, ambiente medico profesional latinoamericano/europeo segun contexto NOMII.

Restricciones:
sin texto dentro de la imagen, sin logos inventados, sin graficos decorativos, sin filtros dramaticos, sin blanco y negro, sin tapar rostro ni torso superior cuando haya persona protagonista.
```

## Prompt estructurado recomendado para LLM interno

Antes de pedir imagen a la API, el LLM deberia producir este JSON:

```json
{
  "campaign": {
    "objective": "conversion",
    "subobjective": "DM",
    "primary_kpi": "mensajes iniciados",
    "secondary_kpi": "guardados",
    "hypothesis": "Los medicos que sienten techo profesional responden mejor a imagen humana + hook aspiracional que a imagen institucional.",
    "test_variable": "tipo de imagen de portada",
    "buyer_persona": "medico joven latinoamericano con frustracion de crecimiento",
    "insight": "Tiene vocacion y formacion, pero siente que el sistema local no le permite avanzar."
  },
  "slide": {
    "role": "cover",
    "template": "coverSoftAzul",
    "image_kind": "person",
    "text_zone": "bottom",
    "face_safe_required": true,
    "image_focus": "center 35%"
  },
  "image_prompt_parts": {
    "subject": "medico latinoamericano joven con bata o scrubs",
    "scene": "hospital moderno, luminoso, tonos frios",
    "emotion": "sereno, profesional, mirando hacia el futuro",
    "composition": "plano medio, rostro centrado en tercio superior, zona inferior libre para texto",
    "negative_constraints": [
      "sin texto dentro de la imagen",
      "sin logos inventados",
      "no cubrir rostro",
      "no estetica stock exagerada"
    ]
  }
}
```

## Mi recomendacion final

No agregaria todas las columnas como campos visibles desde el primer dia, porque Notion se puede volver pesado. Haría dos capas:

- **Columnas visibles obligatorias**: objetivo de campana, hipotesis, insight/dolor, buyer persona, KPI principal, variable a testear, tipo de lamina, tipo de imagen, restricciones visuales.
- **Campos internos generados por IA**: composicion, image focus, zona libre, prompt visual, validaciones, variantes de CTA, learning despues de publicar.

Asi Edward y el equipo llenan estrategia sin volverse operadores de prompt, y la IA transforma esa estrategia en decisiones visuales consistentes.
