# NOMII Content AI Skill

Repositorio de skill para trabajar NOMII Content AI desde Claude Code.

Este repo no es el proyecto operativo completo. Es el paquete mínimo para que una IA o una persona de diseño pueda:

- mantener identidad visual NOMII;
- leer una grilla/base de contenidos de Notion o un export;
- usar la BBDD Imagen Design clasificada;
- generar o revisar carruseles;
- preparar salida editable para Figma;
- preparar actualización de vuelta a Notion.

## Estructura

```text
.claude-plugin/marketplace.json
skills/nomii-content-ai/SKILL.md
skills/nomii-content-ai/references/
skills/nomii-content-ai/assets/
skills/nomii-content-ai/design-system/
skills/nomii-content-ai/templates/
skills/nomii-content-ai/scripts/
```

## Instalar En Claude Code

Desde Claude Code:

```text
/plugin marketplace add <owner>/<repo>
/plugin install nomii-content-ai@nomii-content-ai-skills
```

Ejemplo si el repo queda como `nomii/nomii-content-ai-skill`:

```text
/plugin marketplace add nomii/nomii-content-ai-skill
/plugin install nomii-content-ai@nomii-content-ai-skills
```

## Uso Recomendado Para Diseño

Abrir Claude Code en una carpeta de trabajo que tenga:

- exports o acceso controlado a la grilla de Notion;
- outputs/carruseles existentes si se quieren revisar;
- acceso a Figma si se va a crear la versión editable.

Prompt inicial recomendado:

```text
Usa la skill nomii-content-ai.

Primero lee la skill y sus referencias:
- references/overview.md
- references/notion-workflow.md
- references/image-design-database.md
- references/brand-and-design.md
- references/carousel-system.md
- references/figma-editable-output.md

Luego revisa los carruseles o filas disponibles y arma un dry-run:
- qué carruseles están listos;
- qué campos faltan;
- qué imagenes recomienda desde la BBDD Imagen Design;
- qué generaría para Figma;
- qué actualización prepararía para Notion.

No escribas en Notion todavía. No subas nada sin confirmación.
```

## Flujo Para Subir Carruseles

1. Claude Code lee la grilla o export de Notion.
2. Identifica carruseles listos para producción.
3. Revisa la BBDD Imagen Design o su export clasificado.
4. Selecciona imágenes por objetivo, rol de lámina, safe area, tono visual y uso previo.
5. Genera `copy.md`, assets visuales y `carousel.figma.json`.
6. Usa Figma para crear la versión editable.
7. Prepara `notion-update.md`.
8. Solo después de aprobación humana actualiza Notion.

## Archivos Clave

- `skills/nomii-content-ai/SKILL.md`: entrada principal de la skill.
- `skills/nomii-content-ai/references/notion-workflow.md`: grilla, campos y actualización Notion.
- `skills/nomii-content-ai/references/image-design-database.md`: clasificación y ranking de imágenes.
- `skills/nomii-content-ai/references/brand-and-design.md`: identidad NOMII.
- `skills/nomii-content-ai/references/carousel-system.md`: láminas y narrativa.
- `skills/nomii-content-ai/references/figma-editable-output.md`: contrato Figma.
- `skills/nomii-content-ai/references/source-docs/`: documentos fuente resumidos/sanitizados.

## Seguridad

Este repo no debe contener:

- tokens;
- OAuth codes;
- callback URLs;
- credenciales;
- archivos `.env`;
- memoria privada de agentes;
- repos de otros proyectos.

Si se necesita operar Notion en vivo, la credencial debe estar configurada de forma segura en el entorno local de la persona que ejecuta Claude Code. No pegar secretos en el chat.

