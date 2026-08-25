# Decision tecnica: Figma como salida editable para carruseles NOMII

Fecha: 2026-07-24  
Proyecto: NOMII Content AI  
Decision: usar Figma como capa editable principal para el disenador.

## 1. Decision

Se define Figma como la mejor via para dejar los carruseles NOMII editables, manteniendo el mismo nivel visual que estamos generando hoy con la skill y el design system.

La razon principal es que Figma permite:

- editar texto, imagenes, posiciones, estilos y capas;
- trabajar colaborativamente con el disenador;
- mantener componentes maestros por tipo de lamina;
- exportar PNG finales para redes;
- guardar links editables en Notion;
- conservar un archivo maestro vivo del sistema visual NOMII.

Canva queda como alternativa futura para operacion marketing/no-code. Illustrator queda como fallback local, no como pipeline principal.

## 2. Objetivo operativo

El objetivo no es reemplazar la matriz actual. El objetivo es agregar una salida editable.

Flujo deseado:

```text
Notion Design Systema AI
-> agente NOMII
-> matriz editorial/visual/performance
-> JSON estructurado de carrusel
-> Figma Plugin NOMII
-> archivo Figma editable
-> export PNG
-> link Figma + PNG final en Notion
```

Esto mantiene Notion como centro de control y Figma como superficie editable de diseno.

## 3. Arquitectura recomendada

### 3.1 Archivo maestro Figma

Crear un archivo llamado:

```text
NOMII Carousel System
```

Dentro del archivo debe existir una pagina para componentes base:

```text
01 Components
```

Y una pagina para carruseles generados:

```text
02 Generated Carousels
```

### 3.2 Componentes maestros

Crear un componente por tipo de lamina:

```text
Portada tipo A - cover soft azul
Portada tipo B - cover soft blanco
Interior - card text
Interior - chat bubbles
Interior - 50/50
Intermedio - flat pause
Interior - pop-up card
Cierre - CTA
```

Cada componente debe respetar:

- frame `1080x1440`;
- safe area superior/inferior `85px`;
- safe area lateral `63px`;
- logo top-right `200px`;
- Rubik como tipografia;
- paleta NOMII;
- fondos, cards, bubbles y CTA del design system;
- capas nombradas de forma estable.

### 3.3 Convencion de nombres de capas

Las capas editables deben tener nombres consistentes para que el plugin pueda encontrarlas:

```text
title
subtitle
caption
pill
body
bullet_1
bullet_2
bullet_3
chat_1
chat_2
chat_3
cta
image
logo
isotipo
background
```

Para carruseles, cada frame generado puede usar:

```text
slide_01
slide_02
slide_03
slide_04
slide_05
slide_06
```

## 4. Por que Plugin API y no solo REST API

La REST API de Figma es util para integraciones externas: autenticacion, lectura de archivos, metadata, comentarios, versionado y exportacion.

Pero para construir diseno editable con capas modificables, el camino recomendado es un plugin de Figma, porque la Plugin API tiene acceso de lectura y escritura al editor. Eso permite:

- crear frames;
- duplicar componentes;
- cambiar textos;
- cargar imagenes;
- aplicar fills;
- ajustar posiciones;
- exportar frames;
- dejar el resultado dentro del archivo Figma.

Conclusion: el sistema debe usar una combinacion:

```text
Figma Plugin API = crear/modificar diseno editable
Figma REST API = consultar/exportar/sincronizar desde fuera cuando aplique
```

## 5. JSON puente entre Notion y Figma

El agente NOMII debe transformar cada fila de Notion en un JSON estructurado. Ese JSON es el contrato entre Notion, la skill y Figma.

Ejemplo:

```json
{
  "carousel": {
    "id": "el-camino-medico-tradicional-vs-nuevas-alternativas",
    "title": "El camino medico tradicional vs nuevas alternativas",
    "objective": "Consideracion",
    "buyer_persona": "Medico chileno con techo profesional",
    "kpi": "Guardados",
    "figma_file": "NOMII Carousel System"
  },
  "slides": [
    {
      "number": 1,
      "template": "Portada tipo A - cover soft azul",
      "role": "hook",
      "text_zone": "bottom",
      "face_safe_required": true,
      "image_focus": "center 36%",
      "fields": {
        "pill": "Medicos Chile",
        "title": "Ser un buen medico en Chile... ya no te diferencia",
        "caption": "Cada vez hay mas profesionales bien formados.",
        "image": "assets/banco/banco-5.jpg"
      }
    },
    {
      "number": 2,
      "template": "Interior - card text",
      "role": "context",
      "fields": {
        "title": "Cada vez hay mas profesionales bien formados.",
        "bullet_1": "Los casos que ves",
        "bullet_2": "El nivel de exigencia",
        "bullet_3": "El entorno donde te formas",
        "image": "assets/banco/banco-8.jpg"
      }
    }
  ]
}
```

## 6. Operacion del plugin Figma

El plugin NOMII deberia tener un flujo simple:

1. El usuario abre el archivo `NOMII Carousel System`.
2. Ejecuta el plugin `NOMII Carousel Builder`.
3. Pega o carga el JSON generado por el agente.
4. El plugin valida que existan los componentes requeridos.
5. Duplica el componente correspondiente por cada lamina.
6. Rellena textos en capas nombradas.
7. Reemplaza imagenes en capas `image`.
8. Aplica ajustes como `image_focus`, safe area o face-safe.
9. Ordena las laminas horizontalmente.
10. Exporta PNG si el usuario lo pide.

## 7. Actualizacion de Notion

Agregar o usar columnas para cerrar el flujo:

```text
Link Figma editable
Estado Figma
Fecha generacion Figma
Version Figma
Export PNG final
```

Estados recomendados:

```text
Pendiente Figma
Generado en Figma
En ajuste diseno
Aprobado diseno
Exportado final
```

## 8. Roles del sistema

### Notion

Centro de control. Guarda:

- grilla;
- matriz estrategica;
- campos visuales;
- estado;
- links;
- learning.

### Agente NOMII

Capa de razonamiento. Decide:

- objetivo;
- hipotesis;
- buyer;
- KPI;
- tipo de lamina;
- copy por lamina;
- imagen sugerida;
- JSON para Figma.

### Figma

Capa editable. Permite:

- ajuste manual del disenador;
- control fino de composicion;
- comentarios;
- aprobacion visual;
- export final.

## 9. Primer MVP recomendado

El MVP debe evitar una integracion demasiado grande al inicio.

### Fase 1: manual asistida

- Crear archivo maestro Figma.
- Crear 8 componentes base.
- Crear JSON desde una fila Notion.
- Ejecutar plugin pegando JSON manualmente.
- Generar un carrusel editable.
- Exportar PNG desde Figma.
- Guardar link Figma en Notion.

### Fase 2: semiautomatica

- El agente genera archivo JSON por carrusel en `outputs/{slug}/carousel.figma.json`.
- El plugin permite importar ese JSON.
- El plugin exporta PNG.
- El agente sube PNG a Notion.

### Fase 3: integrada

- OAuth Figma o token seguro.
- Lectura/export desde Figma REST API.
- Sincronizacion de links/versiones con Notion.
- QA automatizado de frames exportados.

## 10. Riesgos y decisiones pendientes

Riesgos:

- Figma REST API no debe asumirse como editor principal de archivos.
- Hay que nombrar capas de forma estricta.
- El disenador debe mantener componentes base sin romper nombres internos.
- Las fuentes Rubik deben estar disponibles en Figma.
- Si las imagenes se generan por IA, deben pasar por revision antes de quedar como banco aprobado.

Pendientes:

- definir si el plugin sera local privado o publicable;
- crear el archivo maestro Figma;
- crear los 8 componentes base;
- confirmar cuenta/workspace Figma;
- instalar/conectar el plugin Figma cuando este disponible;
- agregar columnas Figma a Notion.

## 11. Decision final

Para NOMII, Figma queda definido como la salida editable principal.

La operacion actual de carruseles no cambia: Notion y la matriz siguen mandando. Lo que cambia es el formato de salida: ademas de PNG final, el sistema debera producir un archivo Figma editable para que el disenador pueda ajustar sin rehacer el carrusel.

Esto deja al proyecto con una arquitectura mas profesional:

```text
Notion = control y estrategia
Skill NOMII = reglas de marca
Agente = razonamiento y generacion estructurada
Figma = edicion profesional
PNG = publicacion / validacion final
```

## 12. Fuentes tecnicas revisadas

- Figma Plugin API: https://developers.figma.com/docs/plugins/
- Figma REST API: https://developers.figma.com/docs/rest-api/
- Comparacion de APIs Figma: https://developers.figma.com/compare-apis/
- Export API en plugins: https://developers.figma.com/docs/plugins/api/properties/nodes-exportasync/
- Export settings Figma: https://developers.figma.com/docs/plugins/api/ExportSettings/
