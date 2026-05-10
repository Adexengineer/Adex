---
name: ship
version: 0.1.0
description: Build, test, and document each slice using the PEV loop
invocation: /ship
author: Adexengineer
---

# Ship Skill — Build, test, and document

## Purpose

`ship` is the execution skill. It reads `.project/slices/{slice-name}/plan.md` and builds the slice following the PEV loop (Plan → Execute → Verify). It writes tests first. It commits after each sub-task. It documents everything in `walkthrough.md` and `tested.md`.

## On invocation

1. Check for `.project/` in the workspace root. If missing, tell the user: **"The `.project/` folder does not exist. Please run the `seed` skill first by typing `/seed`."** Then end the session.
2. Check for `.project/AGENTS.md`. If missing, tell the user: **"No AGENTS.md found. Please run the `frame` skill first by typing `/frame`."** Then end the session.
3. Check for `.project/architecture.md`. If missing, tell the user: **"No architecture.md found. Please run the `frame` skill first by typing `/frame`."** Then end the session.
4. Check for `.project/conventions.md`. If missing, tell the user: **"No conventions.md found. Please run the `frame` skill first by typing `/frame`."** Then end the session.
5. Check for `.project/harness.md`. If missing, tell the user: **"No harness.md found. Please run the `frame` skill first by typing `/frame`."** Then end the session.
6. Read `.project/mistakes.md` **completely** before proceeding.
7. Read `.project/index.md` to identify which slice is being built (look for the slice with status `"scoped"` or `"building"`).
8. Ask the user to confirm the slice: **"Starting ship for {slice-name}. Confirm?"**
9. Check for `.project/slices/{slice-name}/plan.md`. If missing, tell the user: **"No plan.md found for {slice-name}. Please run the `scope` skill first by typing `/scope`."** Then end the session.
10. Read `.project/slices/{slice-name}/plan.md` **completely** before writing any code.

## Continuous Flow

Maintain the full conversation history across all sub-tasks within the slice. Modern LLMs have massive context windows (200k+ tokens). By keeping context intact, the agent retains critical nuances, variable states, and implicit architectural learnings. **Context is only reset when moving to an entirely new slice on the roadmap.**

## The PEV loop (inner loop — runs per sub-task)

For each sub-task in `plan.md`:

### PLAN
1. Read the sub-task schema, acceptance criteria, and test cases.
2. Check for jaggedness flag — if flagged, surface to the human and get explicit approval before proceeding.
3. Identify the exact files to create or modify.

### EXECUTE
4. Write failing tests first (from the test cases defined in `plan.md`).
5. Run tests — confirm they fail for the right reason.
6. Write implementation code to make the tests pass.
7. Run tests again.

### VERIFY
8. **Terminal Evidence:** Output raw terminal logs from test runs and harness commands to the user. Never claim tests pass without showing the evidence.
9. **Mutation Testing:** For critical test cases, intentionally break the implementation code (e.g., invert a condition, remove a guard clause, change a return value), run the test to confirm it fails, then restore the code. If the test does not catch the mutation, strengthen the test before proceeding.
10. **CLI Verification:** Run CLI verification tools defined in `.project/harness.md` (e.g., `psql`, `curl`, `cat`, `docker exec`) to inspect the live environment and database state. Ensure real-world state matches the code logic.
11. If tests pass and mutation testing confirms the test contract: proceed.
12. If tests fail: analyze the failure, fix the implementation, run again.
13. If the same test fails 3 times with different fixes: surface to the human with full error context. Do not guess further.
14. Commit the sub-task result.
15. Append any mistakes or unexpected issues to `.project/mistakes.md`.

## The review checklist (runs after all sub-tasks complete)

Before writing `walkthrough.md`, the `ship` skill runs through this checklist. Any issue found must be fixed before `walkthrough.md` is written.

1. **Security check**: Are there any exposed secrets, unvalidated inputs, or broken auth assumptions?
2. **Slop check**: Are there unnecessary abstractions, over-engineered patterns, or hallucinated APIs?
3. **Conventions check**: Does every new file follow the patterns in `conventions.md`?
4. **Integration check**: Does the slice connect to existing code the way `architecture.md` specifies?
5. **Problem check**: Does the implemented slice actually solve what `plan.md` asked for?
6. **CLI verification check**: Did the agent run the CLI verification tools from `harness.md` and confirm real-world state matches expectations?

## On completion

1. Write `.project/slices/{slice-name}/walkthrough.md` using the template from `./templates/walkthrough.template.md`.
2. Write `.project/slices/{slice-name}/tested.md` using the template from `./templates/tested.template.md`.
3. Update `.project/roadmap.md`:
   - Mark this slice's status as `"complete"`.
   - Add an entry to the Completion Log.
4. Update `.project/index.md`:
   - Mark the slice's status as `"complete"`.
   - Add a one-line description of what was built.
   - Update progress metrics.
5. If mistakes were logged during this session, append them to `.project/mistakes.md`.
6. End the session cleanly. Say: **"The ship skill is complete. {slice-name} has been built, tested, and documented. Check walkthrough.md and tested.md for details."**
7. Do **not** continue the conversation. Do **not** suggest next steps.

## File templates

This skill reads its structural templates from `./templates/`:

- `./templates/walkthrough.template.md` — template for `.project/slices/{slice-name}/walkthrough.md`
- `./templates/tested.template.md` — template for `.project/slices/{slice-name}/tested.md`

## Rules

- **Never write implementation code before writing failing tests.**
- **Never modify files outside the slice's defined scope** without explicit user approval.
- **Never skip the review checklist before writing walkthrough.md.**
- **Never write walkthrough.md before passing the review checklist.**
- **Always surface jaggedness-flagged sections to the human before proceeding.**
- **If `plan.md` and the actual codebase state conflict**, surface the conflict to the user — do not resolve silently.
- **If the same test fails 3 times with different fixes**, surface to the human with full error context. Do not guess further.
- **Always update `roadmap.md` and `index.md`** when completing a slice.
- **Always read `mistakes.md` before starting work.** Acknowledge the most recent mistakes.
- **Always provide Terminal Evidence** — raw terminal logs — when claiming tests pass.
- **Always perform Mutation Testing** on critical test cases to prove the test contract is real.
- **Always run CLI Verification Tools** from `harness.md` to confirm real-world state.
