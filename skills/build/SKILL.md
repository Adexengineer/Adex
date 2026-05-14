---
name: build
version: 0.1.0
description: Build, test, and document one feature using the PEV loop
invocation: /build
author: Adexengineer
---

# Build Skill — Build the feature

## Purpose

`build` is the execution skill. It reads `TheAnchor/specs/plans/{id}-{feature-name}/spec.md` and `test-spec.md` and builds the feature following the PEV loop (Plan → Execute → Verify). It writes tests first, implements to make them pass, runs mutation testing, performs CLI verification, and documents everything in `build.md`, `tested.md`, and `completed.md`.

**The Anchor is the single source of truth.** Before touching any code, the agent must verify that it is building exactly what `spec.md` says. If the spec and the codebase conflict, the agent surfaces the conflict to the user — it does not resolve it silently.

## On invocation

1. Check for `TheAnchor/` in the workspace root. If missing, tell the user: **"The Anchor does not exist. Please run the `explore` skill first by typing `/explore`."** Then end the session.
2. Check for `TheAnchor/AGENTS.md`. If missing, tell the user: **"No AGENTS.md found in The Anchor. Please run the `map` skill first by typing `/map`."** Then end the session.
3. Check for `TheAnchor/architecture.md`. If missing, tell the user: **"No architecture.md found in The Anchor. Please run the `map` skill first by typing `/map`."** Then end the session.
4. Check for `TheAnchor/conventions.md`. If missing, tell the user: **"No conventions.md found in The Anchor. Please run the `map` skill first by typing `/map`."** Then end the session.
5. Check for `TheAnchor/harness.md`. If missing, tell the user: **"No harness.md found in The Anchor. Please run the `map` skill first by typing `/map`."** Then end the session.
6. Read `TheAnchor/mistakes.md` **completely** before proceeding.
7. Read `TheAnchor/index.md` to identify which feature is being built (look for the feature with status `"specced"` or `"building"`).
8. Ask the user to confirm the feature: **"Starting build for {feature-name}. Confirm?"**
9. Check for `TheAnchor/specs/plans/{id}-{feature-name}/spec.md`. If missing, tell the user: **"No spec.md found for {feature-name}. Please run the `spec` skill first by typing `/spec`."** Then end the session.
10. Check for `TheAnchor/specs/plans/{id}-{feature-name}/test-spec.md`. If missing, tell the user: **"No test-spec.md found for {feature-name}. Please run the `spec` skill first by typing `/spec`."** Then end the session.
11. Read `TheAnchor/specs/plans/{id}-{feature-name}/spec.md` **completely** before writing any code.
12. Read `TheAnchor/specs/plans/{id}-{feature-name}/test-spec.md` **completely** before writing any code.

## Continuous Flow

Maintain the full conversation history across all sub-tasks within the feature. Modern LLMs have massive context windows (200k+ tokens). By keeping context intact, the agent retains critical nuances, variable states, and implicit architectural learnings. **Context is only reset when moving to an entirely new feature on the roadmap.**

## The PEV loop (inner loop — runs per sub-task)

For each sub-task in `spec.md`:

### PLAN
1. Read the sub-task schema, acceptance criteria, and test cases from `spec.md` and `test-spec.md`.
2. Check for jaggedness flag — if flagged, surface to the human and get explicit approval before proceeding.
3. Identify the exact files to create or modify.
4. **Spec compliance check**: Re-read the relevant section of `spec.md` to confirm you understand what must be built. If anything is unclear, ask the user before proceeding.

### EXECUTE
5. Write failing tests first (from the test cases defined in `test-spec.md`).
6. Run tests — confirm they fail for the right reason.
7. Write implementation code to make the tests pass.
8. Run tests again.

### VERIFY
9. **Terminal Evidence:** Output raw terminal logs from test runs and harness commands to the user. Never claim tests pass without showing the evidence.
10. **Mutation Testing:** For critical test cases, intentionally break the implementation code (e.g., invert a condition, remove a guard clause, change a return value), run the test to confirm it fails, then restore the code. If the test does not catch the mutation, strengthen the test before proceeding.
11. **CLI Verification:** Run CLI verification tools defined in `TheAnchor/harness.md` (e.g., `psql`, `curl`, `cat`, `docker exec`) to inspect the live environment and database state. Ensure real-world state matches the code logic.
12. **Spec compliance check:** Does this implementation do exactly what `spec.md` says? If not, fix it before proceeding.
13. If tests pass, mutation testing confirms the test contract, and spec compliance is verified: proceed.
14. If tests fail: analyze the failure, fix the implementation, run again.
15. If the same test fails 3 times with different fixes: surface to the human with full error context. Do not guess further.
16. Append any mistakes or unexpected issues to `TheAnchor/mistakes.md`.

## The review checklist (runs after all sub-tasks complete)

Before writing `completed.md`, the `build` skill runs through this checklist. Any issue found must be fixed before `completed.md` is written.

1. **Spec compliance check**: Does every implemented behavior match what `spec.md` says? If the spec says "return X" and the code returns Y, the code is wrong.
2. **Security check**: Are there any exposed secrets, unvalidated inputs, or broken auth assumptions?
3. **Slop check**: Are there unnecessary abstractions, over-engineered patterns, or hallucinated APIs?
4. **Conventions check**: Does every new file follow the patterns in `conventions.md`?
5. **Integration check**: Does the feature connect to existing code the way `architecture.md` and `spec.md` specify?
6. **Problem check**: Does the implemented feature actually solve what `spec.md` asked for?
7. **CLI verification check**: Did the agent run the CLI verification tools from `harness.md` and confirm real-world state matches expectations?

## On completion

1. Write `TheAnchor/specs/plans/{id}-{feature-name}/build.md` using the template from `./templates/build.template.md`. Log every sub-task, any deviations from the spec, and reasoning for each deviation.
2. Write `TheAnchor/specs/plans/{id}-{feature-name}/tested.md` using the template from `./templates/tested.template.md`. Include raw terminal evidence, mutation testing results, and CLI verification logs.
3. Write `TheAnchor/specs/plans/{id}-{feature-name}/completed.md` using the template from `./templates/completed.template.md`. Summarize what was built, why, how it works, and any known limitations.
4. Update `TheAnchor/specs/plans/{id}-{feature-name}/changelog.md`:
   - Add an entry for the implementation.
5. Update `TheAnchor/roadmap.md`:
   - Mark this feature's status as `"complete"`.
   - Add an entry to the Completion Log.
6. Update `TheAnchor/index.md`:
   - Mark the feature's status as `"complete"`.
   - Add a one-line description of what was built.
   - Update progress metrics.
   - Update the **Status** to show `next: spec` (for the next feature) or `project: complete`.
7. If mistakes were logged during this session, append them to `TheAnchor/mistakes.md`.
8. End the session cleanly. Say: **"The build skill is complete. {feature-name} has been built, tested, and documented. Check completed.md, tested.md, and build.md for details. The spec remains the single source of truth — if you need to change this feature, update the spec first."**
9. Do **not** continue the conversation. Do **not** suggest next steps.

## File templates

This skill reads its structural templates from `./templates/`:

- `./templates/build.template.md` — template for `build.md`
- `./templates/tested.template.md` — template for `tested.md`
- `./templates/completed.template.md` — template for `completed.md`

## Rules

- **Never write implementation code before writing failing tests.**
- **Never modify files outside the feature's defined scope** without explicit user approval.
- **Never skip the review checklist before writing completed.md.**
- **Never write completed.md before passing the review checklist.**
- **Always surface jaggedness-flagged sections to the human before proceeding.**
- **If `spec.md` and the actual codebase state conflict**, surface the conflict to the user — do not resolve silently.
- **If the same test fails 3 times with different fixes**, surface to the human with full error context. Do not guess further.
- **Always update `roadmap.md`, `index.md`, and `mistakes.md`** when completing a feature.
- **Always read `mistakes.md` before starting work.** Acknowledge the most recent mistakes.
- **Always provide Terminal Evidence** — raw terminal logs — when claiming tests pass.
- **Always perform Mutation Testing** on critical test cases to prove the test contract is real.
- **Always run CLI Verification Tools** from `harness.md` to confirm real-world state.
- **Always perform Spec Compliance Checks** — verify that code does exactly what `spec.md` says, not just that tests pass.
- **The Anchor is the single source of truth.** If code and spec conflict, the spec wins. Change the spec first, then change the code.
