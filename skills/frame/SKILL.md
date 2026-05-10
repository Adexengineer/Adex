---
name: frame
version: 0.1.0
description: Design the system architecture and roadmap
invocation: /frame
author: Adexengineer
---

# Frame Skill — Design the system

## Purpose

`frame` is the architecture session. It reads `.project/idea.md` and collaborates with the user to design the full system. It produces:
- `.project/architecture.md`
- `.project/roadmap.md`
- `.project/conventions.md` (skeleton)
- `.project/harness.md` (skeleton)

It also updates `.project/index.md` and `.project/AGENTS.md` with the confirmed tech stack.

## On invocation

1. Check for `.project/` in the workspace root. If missing, tell the user: **"The `.project/` folder does not exist. Please run the `seed` skill first by typing `/seed`."** Then end the session.
2. Check for `.project/idea.md`. If missing, tell the user: **"No idea.md found. Please run the `seed` skill first by typing `/seed`."** Then end the session.
3. Read `.project/idea.md` **completely** before saying anything to the user.
4. Read `.project/index.md` to check if `architecture.md` already exists (look at the Files section or check if the file exists on disk).
   - If `architecture.md` exists: present a brief summary of the existing architecture and ask: **"An architecture.md already exists. Would you like to refine the existing architecture, or rebuild from scratch?"**
     - If refine: read the existing `architecture.md` and treat the conversation as deltas.
     - If rebuild: proceed as if starting fresh, overwriting on confirmation.
5. If `architecture.md` does not exist: proceed directly to the conversation flow.

## Conversation flow

`frame` does **not** ask a list of questions. It reads `idea.md`, forms a preliminary architecture view, and **presents it to the user as a starting point**. The session is collaborative — the agent proposes, the user accepts, rejects, or modifies.

`frame` must cover these topics, in roughly this order:

1. **Tech stack recommendation**: language, framework, runtime, database, hosting — with reasoning for every choice.
2. **Architecture pattern**: monolith vs modular monolith vs microservices — with recommendation and trade-offs explained.
3. **Services breakdown**: what are the major services or modules, and what does each own.
4. **Data models**: primary entities, their fields, their relationships.
5. **API design**: major endpoints or interfaces.
6. **Data flow**: how a core user action moves through the system end to end.
7. **External integrations**: what third-party services will be used.
8. **Security model**: auth strategy, data protection.
9. **Scalability considerations**: how the system grows.
10. **Roadmap**: what gets built first and why — ordered list of slices.

### Conversation rules

- For each topic, the agent **makes a recommendation**. The user can accept, reject, or modify.
- **Never let the user make an architectural decision without the agent explaining the trade-offs.**
- If the user makes a choice the agent disagrees with, state the concern **once** — clearly — then follow the user's decision. Do not argue, repeat, or hedge.
- Do not ask the user to re-explain the idea. Everything needed is in `idea.md`.
- The agent may recommend, but **the user decides**. Never override a user's explicit tech choice.

### Confirmation gate

After all 10 topics are covered, the agent produces a brief plain-English summary (5–8 bullet points) of the architecture covering:
- Tech stack
- Architecture pattern
- Major services/modules
- Data storage approach
- Auth/security model
- Build order (top 3 slices)

Then ask: **"Does this architecture sound right?"**

- If the user says **yes** or makes only minor corrections: apply corrections and proceed to "On confirmation."
- If the user says **no** or requests significant changes: revisit the relevant topics until agreement is reached, then ask the confirmation question again.

## On confirmation

1. Write `.project/architecture.md` using the template from `./templates/architecture.template.md`. For a medium-complexity project it must be a **minimum of 500 lines**. For a simple project it scales down proportionally. For a complex project it scales up with no upper bound.
2. Write `.project/roadmap.md` using the template from `./templates/roadmap.template.md`. Every slice must have a `parallel-safe` flag and dependency mapping.
3. Write `.project/conventions.md` using the template from `./templates/conventions.template.md`. Populate it based on the chosen tech stack. Leave placeholders for user-specific conventions.
4. Write `.project/harness.md` using the template from `./templates/harness.template.md`. Populate it with placeholder commands matching the chosen tech stack.
5. Update `.project/index.md`:
   - Fill in the **Summary** with 2–3 sentences describing the product and architecture.
   - Fill in the **Slices** table with all roadmap slices, status `planned`, and their parallel-safe flags.
   - Add key decisions to the **Key Decisions** list.
   - Update the **Files** section to reflect that `architecture.md` and `roadmap.md` now exist.
6. Update `.project/AGENTS.md`:
   - Replace the tech stack placeholders with the confirmed choices.
   - Replace the test/build/lint/type-check command placeholders with the actual commands (or leave as placeholders if the user hasn't provided exact commands yet).
   - Add any no-touch zones identified during the architecture session.
7. **Migration handling:** If `architecture.md` already existed and was updated (not created fresh), compute the blast radius of changes. Identify which slices in `roadmap.md` are affected by schema changes, service renames, API updates, or data model shifts. Inject a **Migration Slice** into `roadmap.md` immediately before any affected slices, with description: "Migrate codebase to match updated architecture.md — schema changes, service renames, API updates." Mark the migration slice as `parallel-safe: no` and `complexity: medium`.
8. End the session cleanly. Say: **"The frame skill is complete. architecture.md, roadmap.md, conventions.md, and harness.md have been created. Next step: run the `scope` skill to plan the first slice."**
9. Do **not** continue the conversation. Do **not** suggest next steps beyond naming the next skill.

## File templates

This skill reads its structural templates from `./templates/`:

- `./templates/architecture.template.md` — template for `.project/architecture.md`
- `./templates/roadmap.template.md` — template for `.project/roadmap.md`
- `./templates/conventions.template.md` — template for `.project/conventions.md`
- `./templates/harness.template.md` — template for `.project/harness.md`

The updated index.md and AGENTS.md patterns are minimal inline templates embedded in the skill logic above.

## Rules

- **Read `idea.md` completely before the first message.** Do not ask the user to re-explain the idea.
- **Never let the user make an architectural decision without explaining the trade-offs.**
- **The roadmap must include a `parallel-safe` flag for every slice.**
- **`architecture.md` must have a "No-Touch Zones" section** even if it is currently empty.
- **`architecture.md` must have a "Migration Rules" section** per master spec Section 5.5.
- **The agent may recommend but the user decides.** Never override a user's explicit tech choice.
- **Never write files before user confirmation.** Always present the summary and get explicit approval.
- **Never continue the session after files are written.** The session ends cleanly.
- **Always update `index.md` and `AGENTS.md`** when writing architecture outputs.
- **If refining an existing architecture**, read the existing `architecture.md` first and treat the conversation as deltas, not a blank slate.
- **If architecture is updated**, compute blast radius and inject a Migration Slice into `roadmap.md`.
- **Minimum 500 lines for `architecture.md`** on medium-complexity projects. Do not produce a 50-line architecture document for a non-trivial project.
