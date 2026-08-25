# Boundaries

This skill is meant to be safe to share in GitHub or with another AI agent. It must not include private project memory, credentials, or unrelated project access.

## Allowed In This Skill

- NOMII brand rules.
- NOMII design-system rules.
- Notion schema guidance.
- Image design database schema and workflow.
- Carousel production process.
- Figma JSON handoff contract.
- Sanitized templates and validation scripts.
- Official brand assets approved for this workflow.

## Not Allowed

- Agent memory.
- `AGENTS.md`.
- private project `PROJECT_ACCESS.md` with local operational details unless redacted.
- OAuth codes, callback URLs, tokens, API keys, or service account files.
- Local secret paths that imply credential sharing as an instruction for external users.
- Raw full logs.
- Unrelated project context.
- Credentials or routes for PUC, Campus Digital, ToK, or any non-NOMII project.

## Notion Safety

If live Notion access is required, the execution environment must provide the credential securely. The user should not paste secrets into chat.

The agent should verify:

- the database belongs to NOMII;
- the schema matches the expected grid or image database;
- the task authorizes reads or writes;
- writes are limited to the requested rows/fields.

If not verified, produce a local `notion-update.md` instead of writing live.

## Static Export Mode

When operating from a CSV/JSON/Markdown export, do not claim that Notion has been updated. Produce:

- the generated carousel assets;
- the image usage change proposal;
- the exact fields to update;
- open questions.

## Sharing Rule

Share the skill package, not the project repo. The project repo may contain operational scripts, outputs, logs, memory, and private context that are not needed by another AI.
