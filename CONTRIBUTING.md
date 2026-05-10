# Contributing to AdeX

Thank you for your interest in improving AdeX. This document covers how to add new skills, extend existing ones, and test your changes.

## Skill Format

Every AdeX skill is a `SKILL.md` file located in `skills/{skill-name}/SKILL.md`. It follows this structure:

```markdown
# {Skill Name} — {One-line purpose}

## Purpose
{What this skill does and why it exists.}

## On invocation
{Step-by-step behavior when the skill is loaded.}

## Conversation flow
{How the conversation with the user proceeds.}

## On confirmation
{What files are written after the user confirms.}

## File templates
{Any templates the skill writes.}

## Rules
{Non-negotiable constraints for this skill.}
```

### Required sections

Every skill **must** have:
- `## Purpose` — clear one-paragraph explanation
- `## On invocation` — what happens when the skill starts
- `## Conversation flow` — how the agent talks to the user
- `## On confirmation` — what gets written after approval
- `## Rules` — constraints that prevent anti-patterns

### Optional sections

- `## File templates` — if the skill writes files, include the templates
- `## Confirmation gate` — if the skill has a user confirmation step before writing

## Adding a New Skill

1. Create `skills/{skill-name}/SKILL.md`.
2. Follow the existing skill structure (`seed`, `frame`, `scope`, `ship`) as a reference.
3. Ensure the skill checks for prerequisites and politely asks the user to run missing prerequisite skills (e.g., "Please run `/seed` first").
4. Update `.project/index.md` logic if the new skill affects project state.
5. Add the skill to the README.md skill list.

## Extending an Existing Skill

1. Read the existing `SKILL.md` completely.
2. Make minimal, focused changes.
3. Ensure all existing rules still apply.
4. Update this document if you add new conventions.

## Testing Changes

Before submitting changes:

1. Run the skill on a sample project.
2. Verify all files are created in the correct locations.
3. Verify the conversation flow follows the skill rules.
4. Check that `index.md` and `roadmap.md` are updated correctly.

## Anti-Patterns to Avoid

- **Context bloat** — keep `AGENTS.md` under 100 lines.
- **Undocumented decisions** — every architectural choice must be logged.
- **Skipping confirmation** — never write files before the user confirms.
- **Open-ended sessions** — skills must end cleanly after their job is done.

## Future Skill Ideas

The following skills are planned for future versions of AdeX:

- **`review`** — Reviews completed slices for quality, security, and adherence to conventions.
- **`debug`** — Diagnoses errors or failing tests without building anything.
- **`upgrade`** — Handles planned refactors or dependency upgrades.
- **`prd`** — Produces per-feature requirement documents before architecture sessions.

If you implement one of these, please follow the skill format above and open a pull request.

## Questions?

Open an issue or start a discussion. We are building AdeX in the open.
