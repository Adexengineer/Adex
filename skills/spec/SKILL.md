---
name: spec
version: 0.1.0
description: Deep-dive conversation and spec writing for one roadmap feature
invocation: /spec
author: Adexengineer
---

# Spec Skill — Spec the feature

## Purpose

`spec` is the per-feature planning session. It takes one feature from the roadmap and produces a complete specification in `TheAnchor/specs/plans/{id}-{feature-name}/` so detailed that the `build` skill needs zero guessing during implementation.

This is where **SDD (Spec-Driven Development)** happens. The spec is the single source of truth for this feature. If code and the spec conflict, the spec wins — and the code must be updated to match.

**Critical rule:** The agent must STOP after writing the spec and get explicit human approval before any code is written. This is the human review gate.

## On invocation

1. Check for `TheAnchor/` in the workspace root. If missing, tell the user: **"The Anchor does not exist. Please run the `explore` skill first by typing `/explore`."** Then end the session.
2. Check for `TheAnchor/idea.md`. If missing, tell the user: **"No idea.md found in The Anchor. Please run the `explore` skill first by typing `/explore`."** Then end the session.
3. Check for `TheAnchor/product.md`. If missing, tell the user: **"No product.md found in The Anchor. Please run the `shape` skill first by typing `/shape`."** Then end the session.
4. Check for `TheAnchor/architecture.md`. If missing, tell the user: **"No architecture.md found in The Anchor. Please run the `map` skill first by typing `/map`."** Then end the session.
5. Check for `TheAnchor/roadmap.md`. If missing, tell the user: **"No roadmap.md found in The Anchor. Please run the `map` skill first by typing `/map`."** Then end the session.
6. Read `TheAnchor/index.md` to identify the current roadmap position.
7. Read `TheAnchor/roadmap.md` and find the next feature with status `"planned"` that has all dependencies marked `"complete"`.
   - If no such feature exists, tell the user: **"All features are either specced or complete. Nothing left to plan."** Then end the session.
8. Present that feature to the user and confirm: **"Ready to spec {feature-name}? Or would you like a different feature?"**
   - If the user wants a different feature: let them name it, verify it exists in `roadmap.md` and has all dependencies complete, then proceed with that feature.

## Conversation flow

`spec` is a focused, deep technical discussion about **one feature**. It is a conversation loop — the agent asks, suggests, discusses. The human decides. This is not a one-shot generation.

The conversation covers these topics, in roughly this order:

1. **Feature context** — What does this feature do? Why does it exist? How does it fit into the product?
2. **Approach**: What are the different ways to build this feature? The agent presents options with trade-offs.
3. **Decision**: What is the recommended approach and why? The user confirms or chooses an alternative.
4. **Schema** (mandatory, must happen before any logic discussion): Define all data types, function signatures, and API contracts for this feature. Be precise. Reference `TheAnchor/schemas/` for shared contracts.
5. **Test plan**: What test cases must be written? The agent lists every case with input, expected output, and what it validates.
6. **Jaggedness flags**: Which parts of this feature are known AI weak points? Mark them explicitly with reasoning.
7. **Sub-tasks**: Break the feature into 2–4 hour chunks of work. Each chunk must be independently verifiable.
8. **File map**: For every sub-task, list the exact files to create or modify with their paths (absolute from workspace root).
9. **Edge cases**: What could go wrong? How should each case be handled?
10. **Integration**: How does this feature connect to existing code, shared schemas, and other features?

### Conversation rules

- **Schema comes first.** Do not discuss implementation logic before data types, signatures, and contracts are defined.
- For each topic, the agent **makes a recommendation**. The user can accept, reject, or modify.
- If the user makes a choice the agent disagrees with, state the concern **once** — clearly — then follow the user's decision. Do not argue, repeat, or hedge.
- Ask follow-up clarifications if an answer is vague, but keep the conversation bounded.
- The conversation is a **loop**, not a checklist. The agent can return to earlier topics if new information changes a prior decision.
- **Reference the architecture.** If a decision conflicts with `architecture.md`, surface it to the user.

### Human review gate — STOP before writing

After the deep-dive conversation is complete, the agent **MUST STOP** and say:

> **"I am about to write the spec for {feature-name}. This spec will be the single source of truth for this feature. Any code written later must match this spec. Do you approve this approach, or do you want to discuss anything further?"**

- If the user says **"let's discuss more"**: continue the conversation loop.
- If the user approves: proceed to "On confirmation."

### Confirmation gate

After human approval, the agent says: **"Here is the summary of the spec I am about to write. Does it look complete?"**

It presents a concise summary covering:
- Feature name and description
- Recommended approach
- Number of sub-tasks
- Key files to create or modify
- Any jaggedness flags

- If the user says **yes** or makes only minor corrections: apply corrections and proceed to "On confirmation."
- If the user says **no** or requests significant changes: revisit the relevant topics until agreement is reached, then ask the confirmation question again.

## On confirmation

1. Create `TheAnchor/specs/plans/{id}-{feature-name}/` directory. Use the feature ID from `roadmap.md`.
2. Write `TheAnchor/specs/plans/{id}-{feature-name}/discussion.md` using the template from `./templates/discussion.template.md`. Capture the full conversation: options considered, decisions made, rejected alternatives, and reasoning.
3. Write `TheAnchor/specs/plans/{id}-{feature-name}/spec.md` using the template from `./templates/spec.template.md`. The spec must be complete enough that a competent developer with no project context could read it and implement the feature correctly.
4. Write `TheAnchor/specs/plans/{id}-{feature-name}/test-spec.md` using the template from `./templates/test-spec.template.md`. Every test case from the conversation must be documented here with input, expected output, and validation target.
5. Write `TheAnchor/specs/plans/{id}-{feature-name}/changelog.md` using the template from `./templates/changelog.template.md`. Initialize with version 1.0.0.
6. Update `TheAnchor/roadmap.md`:
   - Mark this feature's status as `"specced"`.
   - Update the "Current Feature" marker if this is the next feature to build.
7. Update `TheAnchor/index.md`:
   - Update the feature's status to `"specced"`.
   - Add a one-line description of the feature.
   - Update the **Files** section to reflect the new spec folder.
   - Update the **Status** to show `next: build`.
8. **STOP.** End the session cleanly. Say: **"The spec skill is complete. spec.md, test-spec.md, discussion.md, and changelog.md have been created for {feature-name} in TheAnchor/specs/plans/{id}-{feature-name}/. This spec is now the single source of truth for this feature. Next step: run the `build` skill to implement it — but only after you have reviewed and approved the spec."**
9. Do **not** continue the conversation. Do **not** suggest next steps beyond naming the next skill. Do **not** offer to start building.

## File templates

This skill reads its structural templates from `./templates/`:

- `./templates/discussion.template.md` — template for `discussion.md`
- `./templates/spec.template.md` — template for `spec.md`
- `./templates/test-spec.template.md` — template for `test-spec.md`
- `./templates/changelog.template.md` — template for `changelog.md`

## Rules for spec.md quality

- **The schema section must come first**, before any logic discussion.
- **Every sub-task must have acceptance criteria** — not just a description.
- **Jaggedness flags must be explicit**: mark the section, state why it is flagged, state what the human should review.
- **File paths in spec.md must be absolute** from the workspace root.
- **Logic descriptions must be in plain English** — not pseudocode, not code snippets.
- **Every test case in test-spec.md must have**: name, input, expected output, and what it validates.
- **spec.md is complete when a competent developer with no project context could read it and implement the feature correctly.**
- **The spec is the single source of truth.** Code must match the spec. If they conflict, the spec wins.

## Rules

- **Never ask more than one question at a time.**
- **Never suggest architecture changes.** `spec` plans within the architecture defined by `map`. If the architecture is insufficient, surface that to the user and suggest running `map` to refine it.
- **Never write files before user confirmation.** Always present the summary and get explicit approval.
- **Never continue the session after the spec files are written.** The session ends cleanly.
- **Always update `roadmap.md` and `index.md`** when writing spec outputs.
- **Always STOP and ask for human approval** after the deep-dive conversation and before writing the spec files.
- **If refining an existing spec**, read the existing `spec.md`, `test-spec.md`, and `changelog.md` first. Treat the conversation as deltas, not a blank slate. Increment the version in `changelog.md`.
