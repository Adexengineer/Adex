# Integration Test Plan

## Objective

Run a full end-to-end test of AdeX on a real simple project to verify all skills create correct files, the PEV loop runs, and the output is production-quality.

## Test Project

A small CLI tool: a task manager that runs in the terminal.

- **Features**: add task, list tasks, complete task, delete task
- **Platform**: CLI (Node.js / TypeScript)
- **Storage**: local JSON file

## Test Procedure

### Phase 1 — Seed

1. Open a new empty directory.
2. Run `/seed`.
3. Answer the 7 questions with the task manager idea.
4. Confirm the summary.

**Expected outputs:**
- `.project/AGENTS.md` created with project name
- `.project/index.md` created with summary
- `.project/idea.md` created with full idea
- `.project/mistakes.md` created (empty)

### Phase 2 — Frame

1. Run `/frame`.
2. Collaborate on architecture:
   - Tech stack: TypeScript + Commander.js
   - Storage: JSON file
   - No external services
3. Confirm the architecture summary.

**Expected outputs:**
- `.project/architecture.md` created (100+ lines for this simple project)
- `.project/roadmap.md` created with 3–4 slices
- `.project/conventions.md` created (skeleton)
- `.project/harness.md` created (skeleton)
- `.project/AGENTS.md` updated with TypeScript stack
- `.project/index.md` updated with slices table

### Phase 3 — Scope

1. Run `/scope`.
2. Plan the first slice (e.g., `storage-layer`).
3. Confirm the plan summary.

**Expected outputs:**
- `.project/slices/storage-layer/` created
- `.project/slices/storage-layer/plan.md` created with schema, sub-tasks, tests
- `.project/roadmap.md` updated (slice marked "scoped")
- `.project/index.md` updated

### Phase 4 — Ship

1. Run `/ship`.
2. Confirm the slice.
3. Let the PEV loop run through all sub-tasks.

**Expected outputs:**
- Tests written first, then implementation
- `.project/slices/storage-layer/walkthrough.md` created
- `.project/slices/storage-layer/tested.md` created
- `.project/roadmap.md` updated (slice marked "complete")
- `.project/index.md` updated
- `.project/mistakes.md` updated if any mistakes occurred

### Phase 5 — Verification

1. Run the test suite manually and verify all tests pass.
2. Run the CLI manually and verify add/list/complete/delete work.
3. Read `walkthrough.md` and confirm it accurately describes what was built.
4. Read `tested.md` and confirm it accurately describes test coverage.

## Success Criteria

- [ ] All expected files exist in correct locations
- [ ] No files are created before user confirmation
- [ ] `index.md` accurately reflects project state after each skill
- [ ] Tests are written before implementation in `ship`
- [ ] Context reset happens between sub-tasks in `ship`
- [ ] Jaggedness flags are surfaced to the user in `ship`
- [ ] `AGENTS.md` stays under 100 lines
- [ ] The CLI tool actually works when run manually

## Failure Handling

If any phase fails:
1. Document the failure in `.project/mistakes.md`.
2. Fix the relevant `SKILL.md`.
3. Re-run the integration test from Phase 1.
