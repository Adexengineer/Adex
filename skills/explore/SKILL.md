---
name: explore
version: 0.1.0
description: Discover the product idea through deep conversation and seed TheAnchor
invocation: /explore
author: Adexengineer
---

# Explore Skill — Discover the idea

## Purpose

`explore` is the entry point to AdeX. It captures the raw product vision through a deep, bounded conversation and stores it in `TheAnchor/idea.md`. It also initializes `TheAnchor/` with the core files any future agent needs: `AGENTS.md`, `index.md`, and `mistakes.md`.

This is a multi-session friendly skill. The conversation can pause and resume anytime. The Anchor holds all context.

## On invocation

1. **Reverse-Engineering Check.** Scan the workspace root for existing source code files (excluding `.git/`, `node_modules/`, `TheAnchor/`, build artifacts). If code files exist AND `TheAnchor/` does not exist, trigger Reverse-Engineering Mode. Ask: **"I see existing code here. Should I scan the codebase and reverse-engineer your idea.md and architecture.md, or do you want to define it manually via chat?"**
   - If the user chooses reverse-engineering: scan the codebase to identify the problem being solved, the tech stack, the target users, and the core features. Produce draft `idea.md` and `architecture.md` content. Present the drafts to the user for confirmation before writing.
   - If the user chooses manual: proceed to step 2.
2. Check for `TheAnchor/` folder in the workspace root.
3. If `TheAnchor/` does **not** exist:
   - Create `TheAnchor/`
   - Create `TheAnchor/schemas/` (empty)
   - Create `TheAnchor/specs/` (empty)
   - Write `TheAnchor/AGENTS.md` using the **AGENTS.md skeleton template** below.
   - Write `TheAnchor/index.md` using the **index.md skeleton template** below.
   - Create empty `TheAnchor/mistakes.md` using the **mistakes.md skeleton template** below.
4. If `TheAnchor/` exists and `TheAnchor/idea.md` exists:
   - Read `idea.md` completely.
   - Present a one-paragraph summary to the user.
   - Ask: "An idea.md already exists for this project. Would you like to refine the existing idea, or start fresh?"
   - If refine: use the existing content as the baseline and ask the 7 questions as deltas ("Has anything changed about...").
   - If start fresh: delete the old `idea.md` and proceed with the full questioning flow below.
5. If `TheAnchor/` exists but `TheAnchor/idea.md` does **not** exist:
   - Proceed directly to the conversation flow below.

## Conversation flow

`explore` asks a **maximum of 7 questions**. It does **not** ask all 7 as a list. It asks them **one at a time**, conversationally, letting the user's answer inform the next question.

### The 7 questions

1. **What problem are you solving, and who has this problem?**
2. **Who is the target user — what is their context, what do they struggle with, and what do they want?**
3. **What are the must-have features?** (Capture WHAT the product does, not HOW it is built.)
4. **What platform does this live on — web, mobile, CLI, API, desktop, or a combination?**
5. **What does success look like — how do you know the product is working?**
6. **What are the constraints — timeline, budget, tech preferences, non-negotiables?**
7. **What is explicitly out of scope for this product?**

### Conversation rules

- **Never ask more than one question at a time.**
- If the user gives a detailed answer that covers multiple questions, do **not** ask the covered questions again. Move to the next uncovered question.
- Do **not** suggest architecture, tech stack, or implementation during `explore` — that is `map`'s job.
- Ask follow-up clarifications if an answer is vague or incomplete, but do not exceed 7 core questions.
- If the user says "let's pause" or "save this for later", summarize what was captured so far, write a draft `idea.md` with a `draft` flag, and end the session cleanly.

### Confirmation gate

After the 7 questions (or when the agent judges it has enough clarity), produce a concise summary (3–6 bullet points) covering:
- The problem being solved
- The target user
- Core features
- Platform
- Success criteria

Then ask: **"Does this capture your idea accurately?"**

- If the user says **yes** or makes only minor corrections: apply corrections and proceed to "On confirmation."
- If the user says **no** or requests significant changes: repeat the relevant questions until clarity is reached, then ask the confirmation question again.

## On confirmation

1. Write `TheAnchor/idea.md` using the template from `./templates/idea.template.md`, populated with all captured information.
2. Write `TheAnchor/index.md` using the template from `./templates/index.template.md`, seeded with the project name, summary, and initial state.
3. Update `TheAnchor/AGENTS.md` by replacing `{project-name}` and `{One-line description}` placeholders with the actual project name and description. Leave all other placeholders (tech stack, commands) as-is for the `map` skill to fill.
4. End the session cleanly. Say: "The explore skill is complete. idea.md, index.md, and AGENTS.md have been created in TheAnchor/. Next step: run the `shape` skill to structure the product."
5. Do **not** continue the conversation. Do **not** suggest next steps beyond naming the next skill.

## File templates

This skill reads its structural templates from `./templates/`:

- `./templates/idea.template.md` — template for `TheAnchor/idea.md`
- `./templates/index.template.md` — template for `TheAnchor/index.md`

The AGENTS.md and mistakes.md skeletons below are minimal inline templates embedded directly in the skill logic.

### AGENTS.md skeleton template

```markdown
# {project-name}
{One-line description of the project.}

## Tech Stack
- Language: {e.g., TypeScript, Python, Go}
- Framework: {e.g., Next.js, FastAPI, Gin}
- Runtime: {e.g., Node.js 20, Python 3.11}
- Package Manager: {e.g., npm, pip, go mod}
- Database: {e.g., PostgreSQL, SQLite}

## Commands
- Test: `{exact test command}`
- Build: `{exact build command}`
- Lint: `{exact lint command}`
- Type Check: `{exact type check command}`

## Key Files
- Architecture: `TheAnchor/architecture.md`
- Product Spec: `TheAnchor/product.md`
- Roadmap: `TheAnchor/roadmap.md`
- Conventions: `TheAnchor/conventions.md`
- Mistakes Log: `TheAnchor/mistakes.md`
- Current State: `TheAnchor/index.md`

## No-Touch Zones
- {List files or directories agents must never modify}

## Rules
- Always read `TheAnchor/index.md` before starting work.
- Always read `TheAnchor/mistakes.md` before writing code.
- Always read `TheAnchor/AGENTS.md` before starting work.
- The Anchor is the single source of truth. If code and The Anchor conflict, The Anchor is correct.
- If you need to change behavior, change The Anchor first, then change the code.
- Keep this file under 100 lines. Bloat degrades reasoning.
```

### mistakes.md skeleton template

```markdown
# Mistakes Log

This file tracks errors made during build sessions and the corrections applied.

Format per entry:

```
## {date} — {feature-name}
- what happened: [describe what the agent did wrong]
- why it happened: [wrong assumption, missing context, etc.]
- correction applied: [what was done to fix it]
- prevention: [rule to prevent this in future sessions]
```

## Entries

```

## Rules

- **Never ask more than one question at a time.**
- **Never suggest architecture, tech stack, or implementation.** `explore` captures the *what* and *why*. The *how* belongs to `map`.
- **Never continue the session after `idea.md` is written.** The session ends cleanly after confirmation and file writes.
- **Never write files before user confirmation.** Always present the summary and get explicit approval.
- **Always update `AGENTS.md` and `index.md`** when writing `idea.md`, even if they already exist.
- **If refining an existing idea**, read the existing `idea.md` first and treat the conversation as a delta, not a blank slate.
- **If code exists and `TheAnchor/` does not**, offer Reverse-Engineering Mode before asking the 7 questions.
- **Multi-session safe:** If the user pauses, write a draft `idea.md` with a `draft` flag and end cleanly.
