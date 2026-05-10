# AdeX — Agent Driven Engineering Execution

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](package.json)
[![AgentSkills](https://img.shields.io/badge/AgentSkills-compatible-purple.svg)](https://agentskills.io)

**AdeX** is a skill-based framework for building software products with AI agents. It brings **persistent context**, **structured workflows**, and **disciplined engineering practices** to every AI-assisted project.

It is not a code generator. It is not a prompt template. It is a complete methodology — a way of thinking about, planning, and executing software using AI agents as first-class collaborators.

Works with **40+ AI agents** including Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Gemini CLI, OpenCode, and more. [See full list →](#supported-agents)

---

## Table of Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Installation](#installation)
- [Quick Start: Your First Project](#quick-start-your-first-project)
- [The 4-Skill Workflow Explained](#the-4-skill-workflow-explained)
- [Before vs After AdeX](#before-vs-after-adex)
- [The `.project` Folder](#the-project-folder)
- [Skills Reference](#skills-reference)
- [The PEV Loop](#the-pev-loop)
- [Core Principles](#core-principles)
- [Anti-Patterns AdeX Prevents](#anti-patterns-adex-prevents)
- [Inspirations](#inspirations)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## The Problem

Every AI coding session starts stateless. The agent knows nothing about:

- What decisions were made last session
- What mistakes happened and how they were fixed
- What needs to be built next
- What the architecture looks like
- What conventions the team follows

You spend the first 20 minutes of every session re-explaining the project. The agent asks the same questions. It forgets constraints. It re-introduces bugs that were already fixed. It hallucinates APIs that were already defined.

**AdeX fixes this by making context the primary artifact.**

## The Solution

AdeX maintains a living `.project` folder in your workspace root. This folder survives between sessions. It contains everything the agent needs to know — the product idea, the architecture, the roadmap, the mistakes and corrections, the conventions, the test commands, and detailed plans for each slice of work.

Any session, any day, on any machine — run an AdeX skill and the agent reads `.project/` and knows exactly where things stand.

---

## Installation

AdeX follows the [AgentSkills open standard](https://agentskills.io) and installs via the `npx skills` CLI.

### Prerequisites

- **Node.js 18+** (required to run `npx skills`)
- **Any AgentSkills-compatible AI agent** (see [Supported Agents](#supported-agents))

### Install All Skills (Recommended)

Install the complete AdeX framework with all four skills:

```bash
npx skills add Adexengineer/Adex --all
```

This installs `seed`, `frame`, `scope`, and `ship` to all detected agents.

### Install Individual Skills

Install only the skills you need:

```bash
# Install just seed
npx skills add Adexengineer/Adex --skill seed

# Install seed and frame
npx skills add Adexengineer/Adex --skill seed --skill frame

# Install scope and ship for an existing project
npx skills add Adexengineer/Adex --skill scope --skill ship
```

### Install to Specific Agents

If you use multiple agents, target specific ones:

```bash
# Install to Claude Code only
npx skills add Adexengineer/Adex --all -a claude-code

# Install to Cursor and Codex
npx skills add Adexengineer/Adex --all -a cursor -a codex

# Install globally (available in all projects)
npx skills add Adexengineer/Adex --all -g
```

### Verify Installation

List installed skills to confirm AdeX is available:

```bash
npx skills list
```

You should see `seed`, `frame`, `scope`, and `ship` in the output.

### Supported Agents

AdeX works with any agent that supports the AgentSkills standard. Verified compatibility:

| Agent | Project Path | Global Path |
|-------|-------------|-------------|
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| Cursor | `.cursor/skills/` | `~/.cursor/skills/` |
| OpenAI Codex | `.codex/skills/` | `~/.codex/skills/` |
| GitHub Copilot | `.github/skills/` | `~/.copilot/skills/` |
| Gemini CLI | `.gemini/skills/` | `~/.gemini/skills/` |
| OpenCode | `.opencode/skills/` | `~/.config/opencode/skills/` |
| Amp | `.agents/skills/` | `~/.config/amp/skills/` |
| Roo Code | `.roo-code/skills/` | `~/.roo-code/skills/` |
| Goose | `.goose/skills/` | `~/.goose/skills/` |
| Cline | `.cline/skills/` | `~/.cline/skills/` |
| Windsurf | `.windsurf/skills/` | `~/.windsurf/skills/` |
| Aider | `.aider/skills/` | `~/.aider/skills/` |
| And 25+ more... | | |

The `npx skills` CLI auto-detects which agents you have installed and installs to the correct directories.

---

## Quick Start: Your First Project

Here is a complete walkthrough using a real example: **a Task Manager CLI app**.

### Step 1 — Seed your idea

```bash
cd task-manager-cli
```

Invoke the `seed` skill by typing `/seed` (or just mention "seed" in your agent chat):

```
You: /seed

Agent: What problem are you solving, and who has this problem?
You: I need a simple CLI to track daily tasks. Target user is developers who work in the terminal.

Agent: What are the must-have features?
You: Add a task, list tasks, mark complete, delete task. Store in a local JSON file.

Agent: What platform?
You: CLI, Node.js + TypeScript.

... (seed asks up to 7 questions, one at a time)

Agent: Does this capture your idea accurately?
You: Yes.
```

**What happens:** The agent creates a `.project/` folder and writes:
- `idea.md` — your full product idea
- `AGENTS.md` — project metadata skeleton
- `index.md` — master map of project state
- `mistakes.md` — empty log, ready for errors

> **Existing code?** If you already have code and no `.project/` folder, `seed` offers **Reverse-Engineering Mode**. It scans your codebase and drafts `idea.md` for your confirmation.

### Step 2 — Frame the architecture

```
You: /frame

Agent: I have read your idea. Let me propose an architecture.

For storage, I recommend a local JSON file — simple, zero dependencies.
  Option A: JSON file (recommended)
  Option B: SQLite (more robust, but overkill for this)
You: A.

Agent: For CLI parsing, I recommend Commander.js — industry standard, well-typed.
  Option A: Commander.js (recommended)
  Option B: clipanion (more robust but steeper learning curve)
You: A.

... (frame covers tech stack, architecture pattern, data models, API design, data flow, security, scalability, roadmap)

Agent: Does this architecture sound right?
You: Yes.
```

**What happens:** The agent writes:
- `architecture.md` — full system design (500+ lines for medium projects)
- `roadmap.md` — ordered list of slices with parallel-safe flags and dependencies
- `conventions.md` — coding style guide
- `harness.md` — test commands + CLI verification tools

Then it updates `AGENTS.md` with the confirmed tech stack.

> **Updating architecture later?** If `architecture.md` already exists, `frame` computes the **blast radius** of changes and injects a **Migration Slice** into `roadmap.md` to safely refactor affected code.

### Step 3 — Scope the first slice

```
You: /scope

Agent: The next slice is storage-layer. Ready to plan it? Or would you like a different slice?
You: storage-layer is fine.

Agent: Approach: I recommend plain JSON read/write for simplicity.
  Option A: Plain JSON (recommended)
  Option B: Repository pattern (overkill for a CLI)
You: A.

Agent: Schema first. Here are the data types and function signatures for this slice...

... (scope defines schema, test cases, jaggedness flags, sub-tasks, file map, edge cases, integration points)

Agent: Here is the plan I am going to write. Does it look complete?
You: Yes.
```

**What happens:** The agent creates `.project/slices/storage-layer/` and writes `plan.md` with:
- Schema definitions (data types, function signatures, API contracts)
- Jaggedness flags (AI weak points that need human review)
- Numbered sub-tasks with acceptance criteria
- Test cases with input and expected output
- Edge cases and integration notes

Then it updates `roadmap.md` and `index.md` to mark the slice as "scoped."

### Step 4 — Ship the slice

```
You: /ship

Agent: Starting ship for storage-layer. Confirm?
You: Yes.

--- PEV Loop begins ---

[PLAN] Reading sub-task: Task type and helpers
[EXECUTE] Writing test first → running tests → FAIL (expected)
[EXECUTE] Writing implementation → running tests → PASS
[VERIFY] Terminal Evidence: raw logs shown to you
[VERIFY] Mutation Testing: intentionally broke code → test caught it ✓
[VERIFY] CLI Verification: ran harness command → real-world state confirmed ✓

[PLAN] Reading sub-task: JSON persistence
[EXECUTE] Writing test first → running tests → FAIL
[EXECUTE] Writing implementation → running tests → PASS
[VERIFY] Terminal Evidence: raw logs shown to you
[VERIFY] Mutation Testing: removed guard clause → test caught it ✓
[VERIFY] CLI Verification: ran file system check → JSON output confirmed ✓
```

**What happens:** The agent:
1. Writes all implementation code and tests (tests first, always)
2. Runs mutation testing to prove tests are real (not fake)
3. Runs CLI verification tools from `harness.md` to check real-world state
4. Commits each sub-task
5. Logs any mistakes to `.project/mistakes.md`
6. Writes `walkthrough.md` (what was built and why)
7. Writes `tested.md` (test results and coverage)
8. Updates `roadmap.md` and `index.md` to mark the slice as "complete"

### Step 5 — Repeat

Run `scope` then `ship` for the next slice (`cli-commands`), and again for `integration-test`. When all slices are complete, your roadmap is done.

**The entire cycle:**
```
seed → frame → scope → ship → scope → ship → scope → ship → ... (done)
```

---

## The 4-Skill Workflow Explained

```
┌──────────────────────────────────────────────────────────────────┐
│                        YOUR PROJECT DIRECTORY                     │
│                                                                  │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐     │
│   │  seed   │ →  │  frame  │ →  │  scope  │ →  │  ship   │     │
│   └─────────┘    └─────────┘    └─────────┘    └─────────┘     │
│       │              │              │              │             │
│       ▼              ▼              ▼              ▼             │
│   .project/      .project/      .project/      .project/       │
│   idea.md        architecture.md  slices/        slices/         │
│   AGENTS.md      roadmap.md      {name}/         {name}/         │
│   index.md       conventions.md   plan.md         walkthrough.md │
│   mistakes.md    harness.md                       tested.md      │
│                                                                  │
│   (scope + ship repeat until roadmap is complete)                │
└──────────────────────────────────────────────────────────────────┘
```

### Skill Dependencies

```
seed  →  frame  →  scope  →  ship
 │         │         │         │
 └─────────┴─────────┴─────────┘
         All read .project/AGENTS.md
         All read .project/index.md
         All read .project/mistakes.md
```

**Rules:**
- `frame` requires `seed` to have run first (needs `idea.md`)
- `scope` requires `frame` to have run first (needs `architecture.md` and `roadmap.md`)
- `ship` requires `scope` to have run first (needs `plan.md`)
- Every skill reads `AGENTS.md`, `index.md`, and `mistakes.md` before doing anything

### Running Skills Out of Order

If you try to run a skill before its prerequisites are met, the agent politely stops you:

```
You: /frame
Agent: No idea.md found. Please run the seed skill first by typing /seed.
```

```
You: /ship
Agent: No plan.md found for storage-layer. Please run the scope skill first by typing /scope.
```

---

## Before vs After AdeX

### Without AdeX

| Session | What Happens |
|---------|-------------|
| Day 1 | You explain the project. Agent builds a feature. |
| Day 2 | You explain the project AGAIN. Agent builds another feature. |
| Day 3 | Agent forgets Day 1 decisions. Suggests conflicting architecture. |
| Day 5 | Agent re-introduces a bug you fixed on Day 2. |
| Day 10 | You have 10 chat histories. None of them talk to each other. |

### With AdeX

| Session | What Happens |
|---------|-------------|
| Day 1 | `/seed` captures idea. `/frame` designs architecture. `/scope` plans slice 1. `/ship` builds it. All context written to `.project/`. |
| Day 2 | Agent reads `.project/`. Knows exactly where things stand. Continues from Day 1 seamlessly. |
| Day 5 | Agent reads `mistakes.md`. Knows what went wrong before. Avoids the same trap. |
| Day 10 | Every slice has a `plan.md`, `walkthrough.md`, and `tested.md`. The project is fully documented. |
| Day 100 | A new developer joins. Reads `.project/`. Understands the entire system in 30 minutes. |

---

## The `.project` Folder

The `.project` folder lives in your workspace root. It is the persistent brain of the project:

```
.project/
├── AGENTS.md              # Universal rules, always loaded first
├── index.md               # Master map: slice status, project summary
├── idea.md                # Product idea (from seed)
├── architecture.md        # Full system design (from frame)
├── roadmap.md             # Ordered build sequence
├── conventions.md         # Naming, patterns, anti-patterns
├── harness.md             # Test/lint/build + CLI verification commands
├── mistakes.md            # Errors and corrections (self-correcting memory)
├── prd/                   # Optional per-feature requirement docs
└── slices/                # One folder per buildable slice
    └── {slice-name}/
        ├── plan.md        # Ultra-detailed implementation plan
        ├── walkthrough.md # What was built and why
        └── tested.md      # Test results and coverage
```

### File Purpose

| File | Who Writes It | Who Reads It | Purpose |
|------|--------------|-------------|---------|
| `AGENTS.md` | seed (skeleton), frame (updates) | Every skill, every session | Universal rules: tech stack, commands, no-touch zones |
| `index.md` | seed (skeleton), all skills (updates) | Every skill, every session | Master map: current state, slice status, key decisions |
| `idea.md` | seed | frame, scope | Product concept: problem, users, features, constraints |
| `architecture.md` | frame | scope, ship | System design: tech stack, data models, API design, security |
| `roadmap.md` | frame (initial), scope/ship (updates) | scope | Ordered slices with parallel-safe flags and dependencies |
| `conventions.md` | frame | ship | Coding style: naming, error handling, anti-patterns |
| `harness.md` | frame | ship | Commands: test runner, build, lint, **CLI verification tools** |
| `mistakes.md` | seed (empty), ship (updates) | Every skill | Error log: what happened, why, correction, prevention rule |
| `plan.md` | scope | ship | Implementation contract: schema, sub-tasks, tests, edge cases |
| `walkthrough.md` | ship | Humans | Documentation: what was built, decisions, deviations |
| `tested.md` | ship | Humans | Test evidence: coverage, mutation testing results, edge cases |

---

## Skills Reference

### `seed` — Plant the Idea

**Purpose:** The entry point. Captures the product concept through a bounded 7-question conversation.

**Invocation:** `/seed`

**Conversation flow:**
1. Checks for existing code → offers Reverse-Engineering Mode if found
2. Creates `.project/` folder if missing
3. Asks up to 7 questions, one at a time, conversationally:
   - What problem are you solving, and who has it?
   - Who is the target user?
   - What are the must-have features?
   - What platform?
   - What does success look like?
   - What are the constraints?
   - What is explicitly out of scope?
4. Presents a summary and asks for confirmation
5. Writes files

**Key features:**
- **Reverse-Engineering Mode:** Scans existing codebases and drafts `idea.md`
- **Bounded conversation:** Never asks more than one question at a time. Never exceeds 7 core questions.
- **Confirmation gate:** Never writes files without your explicit "yes"

**Writes:** `idea.md`, `AGENTS.md` (skeleton), `index.md`, `mistakes.md`

**Next skill:** `/frame`

---

### `frame` — Design the System

**Purpose:** The architecture session. Collaborates with you to design the full system.

**Invocation:** `/frame`

**Conversation flow:**
1. Reads `idea.md` completely
2. Presents preliminary architecture view as a starting point
3. Covers 10 topics collaboratively:
   - Tech stack recommendation
   - Architecture pattern (monolith vs microservices)
   - Services/modules breakdown
   - Data models
   - API design
   - Data flow
   - External integrations
   - Security model
   - Scalability considerations
   - Roadmap (ordered slices)
4. Presents a summary and asks for confirmation
5. Writes files

**Key features:**
- **Advisor Mode:** Presents 2-3 options with trade-offs. You decide. The agent never overrides you.
- **Migration handling:** If `architecture.md` already exists, computes blast radius and injects a Migration Slice
- **Schema-first:** Architecture must define data models and APIs before any implementation logic

**Writes:** `architecture.md`, `roadmap.md`, `conventions.md`, `harness.md`, updates `AGENTS.md` and `index.md`

**Next skill:** `/scope`

---

### `scope` — Define the Contract

**Purpose:** Per-slice planning. Produces a `plan.md` so detailed that `ship` needs zero guessing.

**Invocation:** `/scope`

**Conversation flow:**
1. Reads `roadmap.md` and finds next unplanned slice
2. Presents the slice and asks if you want to plan it
3. Covers 9 topics:
   - Approach (with options and trade-offs)
   - Decision (recommended approach)
   - Schema (data types, signatures, APIs — **mandatory first**)
   - Tests (test cases with input and expected output)
   - Jaggedness flags (AI weak points)
   - Sub-tasks (2-4 hour chunks)
   - File map (exact paths from workspace root)
   - Edge cases
   - Integration points
4. Presents a summary and asks for confirmation
5. Writes files

**Key features:**
- **Goldilocks sizing:** Not a single function (too small), not an entire backend (too big)
- **Schema-first:** Data types and signatures defined BEFORE logic discussion
- **Jaggedness flags:** Explicitly marks AI weak points for human review during `ship`

**Writes:** `slices/{name}/plan.md`, updates `roadmap.md` and `index.md`

**Next skill:** `/ship`

---

### `ship` — Build, Test, and Document

**Purpose:** Execution. Reads the plan and builds the slice using the PEV loop.

**Invocation:** `/ship`

**What happens:**
1. Reads `AGENTS.md`, `mistakes.md`, `index.md`, and `plan.md`
2. Asks you to confirm the slice
3. Runs the PEV loop for each sub-task
4. Runs the review checklist after all sub-tasks
5. Writes `walkthrough.md` and `tested.md`
6. Updates `roadmap.md`, `index.md`, and `mistakes.md`

**Key features:**
- **PEV Loop:** Plan → Execute → Verify. Tests are written before implementation.
- **Mutation Testing:** Intentionally breaks code to prove tests catch the failure
- **Terminal Evidence:** Raw terminal logs shown to you — no "trust me, tests pass"
- **CLI Verification:** Runs `psql`/`curl`/`cat` from `harness.md` to check real-world state
- **Continuous Flow:** Context maintained across all sub-tasks within a slice

**Writes:** Code, `slices/{name}/walkthrough.md`, `slices/{name}/tested.md`, updates `roadmap.md`, `index.md`, and `mistakes.md`

**Next skill:** `/scope` (repeat until roadmap is complete)

---

## The PEV Loop

The inner loop of the `ship` skill. It runs for every sub-task in a slice.

### 1. Plan

The agent reads the sub-task from `plan.md`:
- Schema constraints
- Acceptance criteria
- Test cases
- Files to create or modify

If the sub-task has a **jaggedness flag**, the agent surfaces it to you:

```
Agent: This sub-task is flagged for jaggedness:
  Section: JSON file path resolution
  Why: AI often hardcodes paths instead of resolving them correctly
  Please review the path resolution before I proceed. Does this look correct?
```

You review and approve before the agent continues.

### 2. Execute (Test First)

The agent follows TDD strictly:

1. **Write failing tests** — from the test cases defined in `plan.md`
2. **Run tests** — confirm they fail for the right reason
3. **Write implementation** — code to make the tests pass
4. **Run tests again** — confirm they pass

```
[EXECUTE] Writing test: src/storage.test.ts
[EXECUTE] Running tests... FAIL (expected — no implementation yet)
[EXECUTE] Writing implementation: src/storage.ts
[EXECUTE] Running tests... PASS
```

### 3. Verify

The agent proves its work is real:

1. **Terminal Evidence** — Outputs raw terminal logs from test runs and harness commands. You see the actual output, not a summary.

2. **Mutation Testing** — Intentionally breaks the implementation (e.g., inverts a condition, removes a guard clause), runs the test to confirm it **fails**, then restores the code.

```
[VERIFY] Mutation Testing: Inverted return value in readTasks()
[VERIFY] Running tests... FAIL ✓ (test caught the mutation)
[VERIFY] Restoring code... done
```

If the test does NOT catch the mutation, the agent strengthens the test before proceeding.

3. **CLI Verification** — Runs CLI tools from `harness.md` to inspect the live environment:

```
[VERIFY] CLI Verification: cat task-db.json
[VERIFY] Output: [{"id":"1","description":"fix bug","completed":false}]
[VERIFY] Real-world state matches code logic ✓
```

4. **Commit** — The sub-task is committed.

5. **Mistake logging** — If anything unexpected happened, it is appended to `.project/mistakes.md`.

### Handling Failures

If a test fails 3 times with different fixes, the agent stops guessing and surfaces the full error context to you:

```
Agent: This test has failed 3 times with different fixes. Here is the full context:
  - Error: ...
  - Attempted fixes: ...
  - Current code: ...
  Please advise on how to proceed.
```

---

## Core Principles

### 1. Context is half the product

The `.project` folder is not a side artifact. It is the primary artifact. Everything the agent knows — decisions, architecture, mistakes, roadmap — lives here. A well-maintained `.project` folder means any session can be started cold and become productive in under 60 seconds.

### 2. Tests are the contract

Tests define what "done" means. They are written before implementation. Agents cannot claim "tests passed" without **Terminal Evidence** (raw logs) and **Mutation Testing** (proof that tests catch real failures).

### 3. Advisor Mode

The agent executes, but the human judges. The agent presents 2-3 options with trade-offs, makes a recommendation, and **waits for explicit confirmation** ("Yes, go with Option A") before writing anything to `.project/`.

### 4. Goldilocks Slices

Every unit of work is perfectly sized: not a single function (too small), and not an entire backend (too big). A slice is a **Complete User Flow or Feature Module**. This size is large enough to be meaningful and small enough to be verifiable in one session.

### 5. Continuous Flow

Once a slice begins, the agent retains the full conversation history across all sub-tasks. Modern LLMs have massive context windows (200k+ tokens). By keeping context intact, the agent retains critical nuances, variable states, and implicit architectural learnings. Context is only reset between slices, not within them.

### 6. Claim the leverage without compromising quality

AI agents provide enormous leverage. That leverage is only valuable if the output meets professional engineering standards. AdeX is the mechanism that makes both true simultaneously.

---

## Anti-Patterns AdeX Prevents

| Anti-Pattern | How It Happens Without AdeX | How AdeX Prevents It |
|-------------|---------------------------|---------------------|
| **AI Slop** | Unnecessary abstractions, hallucinated APIs, inconsistent naming | `conventions.md` enforces strict styling. `ship` runs an anti-slop review. |
| **Guessing** | Agent assumes variable names, data shapes, or API contracts | Schema-first requirement in `plan.md`. If it's not defined, the agent asks. |
| **Fake Tests** | Agent claims "tests passed" but tests don't actually verify anything | **Mutation Testing** — intentionally breaking code to prove tests catch failures. |
| **Ignoring Mistakes** | Same bug re-introduced in every session | `mistakes.md` is Tier-1 context. Every skill reads it before writing code. |
| **Context Loss** | Every session starts from zero | The `.project` folder survives between sessions. No more starting from zero. |
| **Scope Creep** | Agent builds more than what was asked | `plan.md` defines exact scope. `ship` checks "Does this solve what plan.md asked for?" |

---

## Inspirations

AdeX is built on principles from world-class AI builders:

- **Andrej Karpathy** — Parallel execution and jaggedness awareness. AI models are jagged — they solve hard problems brilliantly and fail at something obvious. AdeX marks slices as parallel-safe and flags jaggedness in every plan.

- **Boris Cherny** — Verification loops and self-correcting context. AdeX has `mistakes.md` as a living error log so mistakes don't repeat.

- **Simon Willison** — Schema-first and anti-slop. Every `plan.md` opens with a schema section defining data types and APIs before any logic. This prevents "AI slop" (hallucinated variables and redundant abstractions).

- **Peter Steinberger** — CLI verification tools. Agents cannot rely solely on unit tests. AdeX uses `harness.md` to store raw terminal commands (`psql`, `curl`, `cat`) that the agent runs to inspect the live environment and database state.

---

## Troubleshooting

### Skill not found after installation

**Problem:** You type `/seed` and the agent doesn't recognize it.

**Solutions:**
1. **Restart your agent session.** Most agents scan for new skills at startup.
2. **Verify installation:**
   ```bash
   npx skills list
   ```
3. **Check the skill directory exists:**
   ```bash
   # For Claude Code
   ls ~/.claude/skills/seed/
   
   # For Cursor
   ls ~/.cursor/skills/seed/
   
   # For Codex
   ls ~/.codex/skills/seed/
   ```
4. **Check SKILL.md frontmatter.** The file must have valid YAML frontmatter with `name` and `description` fields.

### Agent says "Please run seed first" but I already ran it

**Problem:** The agent cannot find `.project/idea.md`.

**Solutions:**
1. Check that you are in the correct project directory
2. Verify `.project/idea.md` exists:
   ```bash
   ls .project/idea.md
   ```
3. If the file exists but the agent still can't find it, the agent may have the wrong working directory. Try:
   ```bash
   pwd
   ```
   And confirm you are in the project root.

### I have existing code. How do I start?

Run `/seed` in your existing project directory. The agent will detect your code and offer **Reverse-Engineering Mode**:

```
Agent: I see existing code here. Should I scan the codebase and reverse-engineer
your idea.md and architecture.md, or do you want to define it manually via chat?
```

Choose "reverse-engineer" and the agent will analyze your codebase to produce draft `idea.md` and `architecture.md` files for your review and confirmation.

### How do I update an existing architecture?

Run `/frame` again. The agent will detect the existing `architecture.md` and ask:

```
Agent: An architecture.md already exists. Would you like to refine the existing
architecture, or rebuild from scratch?
```

Choose "refine" and the agent will treat the conversation as deltas. If you make changes that affect existing code, `frame` will compute the blast radius and inject a **Migration Slice** into `roadmap.md`.

### How do I skip a slice?

You don't. The `scope` skill picks the next unplanned slice automatically. If you want to work on a different slice, tell the agent when it asks:

```
Agent: Ready to plan storage-layer? Or would you like a different slice?
You: I want to plan cli-commands instead.
```

The agent will verify that all dependencies for `cli-commands` are marked complete before proceeding.

---

## Contributing

We welcome contributions. See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Skill format and required sections
- How to add a new skill
- How to extend an existing skill
- Testing changes

**Future skill ideas:** `review`, `debug`, `upgrade`, `prd`

**Report issues:** [GitHub Issues](https://github.com/Adexengineer/Adex/issues)

---

## Documentation

- [Master Specification](master_spec.md) — the complete AdeX framework specification
- [Contributing Guide](CONTRIBUTING.md) — how to add skills or extend the framework
- [AgentSkills Standard](https://agentskills.io) — the universal skill format AdeX follows

---

## License

MIT

---

**AdeX** — Context is half the product. 🧠
