---
name: scope
version: 0.1.0
description: Plan each slice in detail with schema-first contracts
invocation: /scope
author: Adexengineer
---

# Scope Skill — Plan each slice in detail

## Purpose

`scope` is the per-slice planning session. It takes one slice from the roadmap and produces a `.project/slices/{slice-name}/plan.md` so detailed that the `ship` skill needs zero guessing during implementation.

## On invocation

1. Check for `.project/` in the workspace root. If missing, tell the user: **"The `.project/` folder does not exist. Please run the `seed` skill first by typing `/seed`."** Then end the session.
2. Check for `.project/idea.md`. If missing, tell the user: **"No idea.md found. Please run the `seed` skill first by typing `/seed`."** Then end the session.
3. Check for `.project/architecture.md`. If missing, tell the user: **"No architecture.md found. Please run the `frame` skill first by typing `/frame`."** Then end the session.
4. Check for `.project/roadmap.md`. If missing, tell the user: **"No roadmap.md found. Please run the `frame` skill first by typing `/frame`."** Then end the session.
5. Read `.project/index.md` to identify the current roadmap position.
6. Read `.project/roadmap.md` and find the next slice with status `"planned"` that has all dependencies marked `"complete"`.
   - If no such slice exists, tell the user: **"All slices are either scoped or complete. Nothing left to plan."** Then end the session.
7. Present that slice to the user and confirm: **"Ready to plan {slice-name}? Or would you like a different slice?"**
   - If the user wants a different slice: let them name it, verify it exists in `roadmap.md` and has all dependencies complete, then proceed with that slice.

## Conversation flow

`scope` is a focused technical discussion about **one slice**. The conversation covers these topics, in roughly this order:

1. **Approach**: What are the different ways to build this slice? The agent presents options with trade-offs.
2. **Decision**: What is the recommended approach and why? The user confirms or chooses an alternative.
3. **Schema** (mandatory, must happen before any logic discussion): Define all data types, function signatures, and API contracts for this slice. Be precise.
4. **Tests**: What test cases must be written? The agent lists every case with input and expected output.
5. **Jaggedness flags**: Which parts of this slice are known AI weak points? Mark them explicitly with reasoning.
6. **Sub-tasks**: Break the slice into 2–4 hour chunks of work. Each chunk must be independently verifiable.
7. **File map**: For every sub-task, list the exact files to create or modify with their paths (absolute from workspace root).
8. **Edge cases**: What could go wrong? How should each case be handled?
9. **Integration**: How does this slice connect to existing code and other slices?

### Conversation rules

- **Schema comes first.** Do not discuss implementation logic before data types, signatures, and contracts are defined.
- For each topic, the agent **makes a recommendation**. The user can accept, reject, or modify.
- If the user makes a choice the agent disagrees with, state the concern **once** — clearly — then follow the user's decision. Do not argue, repeat, or hedge.
- Ask follow-up clarifications if an answer is vague, but keep the conversation bounded.

### Confirmation gate

After all 9 topics are covered, the agent says: **"Here is the plan I am going to write. Does it look complete?"**

It presents a concise summary (not the full plan) covering:
- Slice name and description
- Recommended approach
- Number of sub-tasks
- Key files to create or modify
- Any jaggedness flags

- If the user says **yes** or makes only minor corrections: apply corrections and proceed to "On confirmation."
- If the user says **no** or requests significant changes: revisit the relevant topics until agreement is reached, then ask the confirmation question again.

## On confirmation

1. Create `.project/slices/{slice-name}/` directory.
2. Write `.project/slices/{slice-name}/plan.md` using the template from `./templates/plan.template.md`. The plan must be complete enough that a competent developer with no project context could read it and implement the slice correctly.
3. Update `.project/roadmap.md`:
   - Mark this slice's status as `"scoped"`.
   - Update the "Current Slice" marker if this is the next slice to build.
4. Update `.project/index.md`:
   - Update the slice's status to `"scoped"`.
   - Add a one-line description of the slice.
   - Update the **Files** section to reflect the new `plan.md`.
5. End the session cleanly. Say: **"The scope skill is complete. plan.md has been created for {slice-name}. Next step: run the `ship` skill to build this slice."**
6. Do **not** continue the conversation. Do **not** suggest next steps beyond naming the next skill.

## File templates

This skill reads its structural template from `./templates/`:

- `./templates/plan.template.md` — template for `.project/slices/{slice-name}/plan.md`

## Rules for plan.md quality

- **The schema section must come first**, before any logic discussion.
- **Every sub-task must have acceptance criteria** — not just a description.
- **Jaggedness flags must be explicit**: mark the section, state why it is flagged, state what the human should review.
- **File paths in plan.md must be absolute** from the workspace root.
- **Logic descriptions must be in plain English** — not pseudocode, not code snippets.
- **Every test case must have**: name, input, expected output, and what it validates.
- **plan.md is complete when a competent developer with no project context could read it and implement the slice correctly.**

## Rules

- **Never ask more than one question at a time.**
- **Never suggest architecture changes.** `scope` plans within the architecture defined by `frame`. If the architecture is insufficient, surface that to the user and suggest running `frame` to refine it.
- **Never write files before user confirmation.** Always present the summary and get explicit approval.
- **Never continue the session after plan.md is written.** The session ends cleanly.
- **Always update `roadmap.md` and `index.md`** when writing `plan.md`.
