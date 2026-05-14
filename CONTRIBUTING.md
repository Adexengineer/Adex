# Contributing to AdeX

Thank you for your interest in improving AdeX. This document covers how to add new skills, extend existing ones, and test your changes.

## Skill Format

Every AdeX skill is a `SKILL.md` file located in `skills/{skill-name}/SKILL.md`. It follows the [AgentSkills open standard](https://agentskills.io) with YAML frontmatter.

```markdown
---
name: {skill-name}
version: 0.1.0
description: {One-line purpose}
invocation: /{skill-name}
author: {your-name}
---

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
- Valid YAML frontmatter with `name`, `version`, `description`, `invocation`, `author`
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
2. Create `skills/{skill-name}/templates/` if the skill writes files.
3. Follow the existing skill structure (`explore`, `shape`, `map`, `spec`, `build`) as a reference.
4. Ensure the skill checks for prerequisites and politely asks the user to run missing prerequisite skills (e.g., "Please run `/explore` first").
5. Update `TheAnchor/index.md` logic if the new skill affects project state.
6. Add the skill to the README.md skill list and framework roadmap.
7. Update package.json version if you are releasing.

## Extending an Existing Skill

1. Read the existing `SKILL.md` completely.
2. Make minimal, focused changes.
3. Ensure all existing rules still apply.
4. Update this document if you add new conventions.
5. Test the skill on a sample project before submitting.

## Testing Changes

Before submitting changes:

1. Run the skill on a sample project.
2. Verify all files are created in the correct locations (`TheAnchor/` not `.project/`).
3. Verify the conversation flow follows the skill rules.
4. Check that `index.md` and `roadmap.md` are updated correctly.
5. Verify YAML frontmatter is valid.
6. Check that templates render correctly.

## Code of Conduct

- Be respectful and constructive in all interactions.
- Focus on the problem, not the person.
- Assume good intent.
- Help others learn and grow.

## Anti-Patterns to Avoid

- **Context bloat** — keep `AGENTS.md` under 100 lines.
- **Undocumented decisions** — every architectural choice must be logged.
- **Skipping confirmation** — never write files before the user confirms.
- **Open-ended sessions** — skills must end cleanly after their job is done.
- **Breaking The Anchor format** — maintain backward compatibility for existing projects.

## Future Skill Ideas

The following skills are planned for future versions of AdeX:

- **`review`** — Reviews completed features for quality, security, and adherence to conventions.
- **`debug`** — Diagnoses errors or failing tests without building anything.
- **`upgrade`** — Handles planned refactors or dependency upgrades.
- **`prd`** — Produces per-feature requirement documents before architecture sessions.
- **`test`** — Standalone test-running and verification skill.
- **`docs`** — Auto-generate user-facing documentation from specs.

If you implement one of these, please follow the skill format above and open a pull request.

## Questions?

Open an issue or start a discussion. We are building AdeX in the open.

**Thank you for contributing to the future of AI engineering.**
