---
name: map
version: 0.1.0
description: Design the system architecture, roadmap, and shared schemas
invocation: /map
author: Adexengineer
---

# Map Skill — Map the system

## Purpose

`map` is the architecture session. It reads `TheAnchor/idea.md` and `TheAnchor/product.md` and collaborates with the user to design the full system. It produces:
- `TheAnchor/architecture.md` — the system blueprint
- `TheAnchor/roadmap.md` — the dependency-based build sequence
- `TheAnchor/conventions.md` — coding style guide
- `TheAnchor/harness.md` — test/build commands + CLI verification tools
- `TheAnchor/schemas/` — shared data contracts directory (initialized)

It also updates `TheAnchor/index.md` and `TheAnchor/AGENTS.md` with the confirmed tech stack.

## On invocation

1. Check for `TheAnchor/` in the workspace root. If missing, tell the user: **"The Anchor does not exist. Please run the `explore` skill first by typing `/explore`."** Then end the session.
2. Check for `TheAnchor/idea.md`. If missing, tell the user: **"No idea.md found in The Anchor. Please run the `explore` skill first by typing `/explore`."** Then end the session.
3. Check for `TheAnchor/product.md`. If missing, tell the user: **"No product.md found in The Anchor. Please run the `shape` skill first by typing `/shape`."** Then end the session.
4. Read `TheAnchor/idea.md` and `TheAnchor/product.md` **completely** before saying anything to the user.
5. Read `TheAnchor/index.md` to check if `architecture.md` already exists.
   - If `architecture.md` exists: present a brief summary of the existing architecture and ask: **"An architecture.md already exists in The Anchor. Would you like to refine the existing architecture, or rebuild from scratch?"**
     - If refine: read the existing `architecture.md` and treat the conversation as deltas.
     - If rebuild: proceed as if starting fresh, overwriting on confirmation.
6. If `architecture.md` does not exist: proceed directly to the conversation flow.

## Conversation flow

`map` does **not** ask a list of questions. It reads `idea.md` and `product.md`, forms a preliminary architecture view, and **presents it to the user as a starting point**. The session is collaborative — the agent proposes, the user accepts, rejects, or modifies.

`map` must cover these topics, in roughly this order:

1. **Tech stack recommendation**: language, framework, runtime, database, hosting — with reasoning for every choice.
2. **Architecture pattern**: monolith vs modular monolith vs microservices — with recommendation and trade-offs explained.
3. **Services breakdown**: what are the major services or modules, and what does each own.
4. **Data models** (master level): primary entities, their fields, their relationships. These will be refined per-feature in `spec`, but `map` defines the shared schema contracts.
5. **API design** (master level): major endpoints or interfaces at the system boundary.
6. **Data flow**: how a core user action moves through the system end to end.
7. **External integrations**: what third-party services will be used.
8. **Security model**: auth strategy, data protection.
9. **Scalability considerations**: how the system grows.
10. **Roadmap**: what gets built first and why — ordered list of features with dependency mapping.

### Conversation rules

- For each topic, the agent **makes a recommendation**. The user can accept, reject, or modify.
- **Never let the user make an architectural decision without the agent explaining the trade-offs.**
- If the user makes a choice the agent disagrees with, state the concern **once** — clearly — then follow the user's decision. Do not argue, repeat, or hedge.
- Do not ask the user to re-explain the idea or product. Everything needed is in `idea.md` and `product.md`.
- The agent may recommend, but **the user decides**. Never override a user's explicit tech choice.

### Confirmation gate

After all 10 topics are covered, the agent produces a brief plain-English summary (5–8 bullet points) of the architecture covering:
- Tech stack
- Architecture pattern
- Major services/modules
- Data storage approach
- Auth/security model
- Build order (top 3 features)

Then ask: **"Does this architecture sound right?"**

- If the user says **yes** or makes only minor corrections: apply corrections and proceed to "On confirmation."
- If the user says **no** or requests significant changes: revisit the relevant topics until agreement is reached, then ask the confirmation question again.

## On confirmation

1. Write `TheAnchor/architecture.md` using the template from `./templates/architecture.template.md`. For a medium-complexity project it must be a **minimum of 500 lines**. For a simple project it scales down proportionally. For a complex project it scales up with no upper bound.
2. Write `TheAnchor/roadmap.md` using the template from `./templates/roadmap.template.md`. Every feature must have a `parallel-safe` flag and dependency mapping.
3. Write `TheAnchor/conventions.md` using the template from `./templates/conventions.template.md`. Populate it based on the chosen tech stack. Leave placeholders for user-specific conventions.
4. Write `TheAnchor/harness.md` using the template from `./templates/harness.template.md`. Populate it with placeholder commands matching the chosen tech stack.
5. Create `TheAnchor/schemas/` directory. Write an initial `schemas/README.md` explaining that shared data contracts live here and are imported by feature specs.
6. Update `TheAnchor/index.md`:
   - Fill in the **Summary** with 2–3 sentences describing the product and architecture.
   - Fill in the **Features** table with all roadmap features, status `planned`, and their parallel-safe flags.
   - Add key decisions to the **Key Decisions** list.
   - Update the **Status** to show `explore: complete, shape: complete, map: complete, next: spec`.
7. Update `TheAnchor/AGENTS.md`:
   - Replace the tech stack placeholders with the confirmed choices.
   - Replace the test/build/lint/type-check command placeholders with the actual commands (or leave as placeholders if the user hasn't provided exact commands yet).
   - Add any no-touch zones identified during the architecture session.
8. **Migration handling:** If `architecture.md` already existed and was updated (not created fresh), compute the blast radius of changes. Identify which features in `roadmap.md` are affected by schema changes, service renames, API updates, or data model shifts. For each affected feature:
   - Mark its status back to `planned` or `stale`.
   - Add a note in `index.md` under **Impact Warnings**.
   - If the blast radius is large, inject a **Migration Feature** into `roadmap.md` immediately before any affected features, with description: "Migrate codebase to match updated architecture.md — schema changes, service renames, API updates." Mark it as `parallel-safe: no` and `complexity: medium`.
9. End the session cleanly. Say: **"The map skill is complete. architecture.md, roadmap.md, conventions.md, and harness.md have been created in TheAnchor/. Next step: run the `spec` skill to plan the first feature."**
10. Do **not** continue the conversation. Do **not** suggest next steps beyond naming the next skill.

## File templates

This skill reads its structural templates from `./templates/`:

- `./templates/architecture.template.md` — template for `TheAnchor/architecture.md`
- `./templates/roadmap.template.md` — template for `TheAnchor/roadmap.md`
- `./templates/conventions.template.md` — template for `TheAnchor/conventions.md`
- `./templates/harness.template.md` — template for `TheAnchor/harness.md`

## Rules

- **Read `idea.md` and `product.md` completely before the first message.** Do not ask the user to re-explain the idea.
- **Never let the user make an architectural decision without explaining the trade-offs.**
- **The roadmap must include a `parallel-safe` flag for every feature.**
- **`architecture.md` must have a "No-Touch Zones" section** even if it is currently empty.
- **`architecture.md` must have a "Migration Rules" section** per master spec Section 5.5.
- **The agent may recommend but the user decides.** Never override a user's explicit tech choice.
- **Never write files before user confirmation.** Always present the summary and get explicit approval.
- **Never continue the session after files are written.** The session ends cleanly.
- **Always update `index.md` and `AGENTS.md`** when writing architecture outputs.
- **If refining an existing architecture**, read the existing `architecture.md` first and treat the conversation as deltas, not a blank slate.
- **If architecture is updated**, compute blast radius and flag affected features in `roadmap.md` and `index.md`.
- **Minimum 500 lines for `architecture.md`** on medium-complexity projects. Do not produce a 50-line architecture document for a non-trivial project.
