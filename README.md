# AdeX — Agent Driven Engineering Execution

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)](package.json)
[![AgentSkills](https://img.shields.io/badge/AgentSkills-compatible-purple.svg)](https://agentskills.io)
[![Discord](https://img.shields.io/badge/discord-join-blue.svg)](https://discord.gg/adex) *(optional)*

> **Context is half the product. The Anchor holds it.**

**AdeX** is a skill-based framework for building software products with AI agents. It brings **Spec-Driven Development (SDD)**, **Test-Driven Development (TDD)**, **persistent context**, **structured workflows**, and **disciplined engineering practices** to every AI-assisted project.

It is not a code generator. It is not a prompt template. It is a complete methodology — a way of thinking about, planning, and executing software using AI agents as first-class collaborators.

**The Anchor** is our answer to context loss: a persistent, structured directory in your workspace that survives between sessions, machines, and agents. Any agent can open it and know exactly where things stand.

Works with **40+ AI agents** including Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Gemini CLI, OpenCode, and more. [See full list →](#supported-agents)

---

## Table of Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Who Should Use AdeX](#who-should-use-adex)
- [What Makes AdeX Different](#what-makes-adex-different)
- [Installation](#installation)
- [Quick Start: Your First Project](#quick-start-your-first-project)
- [The 5-Skill Workflow Explained](#the-5-skill-workflow-explained)
- [Before vs After AdeX](#before-vs-after-adex)
- [The Anchor](#the-anchor)
- [Skills Reference](#skills-reference)
- [The PEV Loop](#the-pev-loop)
- [SDD + TDD: How They Work Together](#sdd--tdd-how-they-work-together)
- [Advanced Patterns](#advanced-patterns)
- [Configuration Guide](#configuration-guide)
- [Real-World Recipes](#real-world-recipes)
- [Core Principles](#core-principles)
- [Anti-Patterns AdeX Prevents](#anti-patterns-adex-prevents)
- [Framework Roadmap](#framework-roadmap)
- [Inspirations](#inspirations)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Community](#community)
- [Security](#security)
- [License](#license)

---

## The Problem

Every AI coding session starts stateless. The agent knows nothing about:

- What decisions were made last session
- What mistakes happened and how they were fixed
- What needs to be built next
- What the architecture looks like
- What conventions the team follows
- What the spec says — the single source of truth

You spend the first 20 minutes of every session re-explaining the project. The agent asks the same questions. It forgets constraints. It re-introduces bugs that were already fixed. It hallucinates APIs that were already defined. It vibes around the spec instead of building to it.

**AdeX fixes this by making The Anchor the primary artifact.**

---

## The Solution

AdeX maintains a living `TheAnchor/` folder in your workspace root. This folder survives between sessions. It contains everything the agent needs to know — the product idea, the architecture, the roadmap, the mistakes and corrections, the conventions, the test commands, and detailed specs for each feature.

**The rule is simple: The Anchor is the single source of truth.**

If the spec says X and the code does Y, the code is wrong. Change the spec first (with a changelog entry), then change the code.

Any session, any day, on any machine — run an AdeX skill and the agent reads `TheAnchor/` and knows exactly where things stand.

---

## Who Should Use AdeX

AdeX is designed for **applied AI engineers** — people who use AI agents to build real software, not toys or demos.

| You are... | AdeX helps you... |
|-----------|-------------------|
| **A solo founder** building a product with AI | Keep context across days/weeks. Never re-explain the project. |
| **A senior engineer** pair-programming with AI | Enforce discipline. Prevent AI slop. Maintain professional standards. |
| **A team lead** managing AI-assisted development | Standardize how your team works with AI. Review specs, not just code. |
| **An agency** shipping client projects with AI | Hand off projects between agents. The Anchor contains everything. |
| **A learner** leveling up your AI engineering skills | Learn SDD + TDD by doing. Build real projects with structure. |

**You should NOT use AdeX if:**
- You want a one-shot code generator ("build me a React app")
- You enjoy re-explaining your project every session
- You believe "vibe coding" is sufficient for production software

---

## What Makes AdeX Different

| | **AdeX** | **Prompt Templates** | **Vibe Coding** | **Traditional TDD** |
|---|---|---|---|---|
| **Context persistence** | `TheAnchor/` survives sessions | None | Chat history only | Human memory only |
| **Spec as source of truth** | `spec.md` is law | No spec | No spec | Tests only |
| **Human review gates** | Agent stops for approval | None | None | Code review |
| **Mutation testing** | Required in `build` | None | None | Optional |
| **CLI verification** | `harness.md` tools | None | None | Rare |
| **Multi-session safe** | Yes, by design | No | No | N/A |
| **Agent-agnostic** | Works with 40+ agents | Usually 1-2 agents | 1 agent | N/A |
| **Anti-slop guardrails** | `conventions.md` + review | None | None | Linting |

---

## Installation

AdeX follows the [AgentSkills open standard](https://agentskills.io) and installs via the `npx skills` CLI.

### Prerequisites

- **Node.js 18+** (required to run `npx skills`)
- **Any AgentSkills-compatible AI agent** (see [Supported Agents](#supported-agents))

### Install All Skills (Recommended)

Install the complete AdeX framework with all five skills:

```bash
npx skills add Adexengineer/Adex --all
```

This installs `explore`, `shape`, `map`, `spec`, and `build` to all detected agents.

### Install Individual Skills

Install only the skills you need:

```bash
# Install just explore
npx skills add Adexengineer/Adex --skill explore

# Install explore and shape
npx skills add Adexengineer/Adex --skill explore --skill shape

# Install spec and build for an existing project
npx skills add Adexengineer/Adex --skill spec --skill build
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

You should see `explore`, `shape`, `map`, `spec`, and `build` in the output.

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

### Step 1 — Explore your idea

```bash
cd task-manager-cli
```

Invoke the `explore` skill by typing `/explore` (or just mention "explore" in your agent chat):

```
You: /explore

Agent: What problem are you solving, and who has this problem?
You: I need a simple CLI to track daily tasks. Target user is developers who work in the terminal.

Agent: What are the must-have features?
You: Add a task, list tasks, mark complete, delete task. Store in a local JSON file.

Agent: What platform?
You: CLI, Node.js + TypeScript.

... (explore asks up to 7 questions, one at a time)

Agent: Does this capture your idea accurately?
You: Yes.
```

**What happens:** The agent creates a `TheAnchor/` folder and writes:
- `idea.md` — your full product idea
- `AGENTS.md` — project metadata skeleton
- `index.md` — master map of project state
- `mistakes.md` — empty log, ready for errors

> **Existing code?** If you already have code and no `TheAnchor/` folder, `explore` offers **Reverse-Engineering Mode**. It scans your codebase and drafts `idea.md` for your confirmation.

### Step 2 — Shape the product spec

```
You: /shape

Agent: I have read your idea. Let me structure it into a clear product spec.

I see you mentioned "store in a local JSON file." Is the data meant to be 
private to the machine, or should it support syncing across devices?
You: Private to the machine for MVP. Sync later.

Agent: What about task priorities? Is that MVP or later?
You: Later.

... (shape asks clarifying questions about features, flows, constraints)

Agent: Does this product spec capture everything accurately?
You: Yes.
```

**What happens:** The agent writes:
- `product.md` — structured product specification with feature list, user flows, success criteria, non-goals

Then it updates `index.md`.

### Step 3 — Map the architecture

```
You: /map

Agent: I have read your idea and product spec. Let me propose an architecture.

For storage, I recommend a local JSON file — simple, zero dependencies.
  Option A: JSON file (recommended)
  Option B: SQLite (more robust, but overkill for this)
You: A.

Agent: For CLI parsing, I recommend Commander.js — industry standard, well-typed.
  Option A: Commander.js (recommended)
  Option B: clipanion (more robust but steeper learning curve)
You: A.

... (map covers tech stack, architecture pattern, data models, API design, data flow, security, scalability, roadmap)

Agent: Does this architecture sound right?
You: Yes.
```

**What happens:** The agent writes:
- `architecture.md` — full system design (500+ lines for medium projects)
- `roadmap.md` — ordered list of features with parallel-safe flags and dependencies
- `conventions.md` — coding style guide
- `harness.md` — test commands + CLI verification tools
- `schemas/` — shared data contracts directory

Then it updates `AGENTS.md` with the confirmed tech stack.

> **Updating architecture later?** If `architecture.md` already exists, `map` computes the **blast radius** of changes and flags affected features in `roadmap.md` and `index.md`.

### Step 4 — Spec the first feature

```
You: /spec

Agent: The next feature is 01-storage-layer. Ready to spec it? Or would you like a different feature?
You: 01-storage-layer is fine.

Agent: Let's discuss how to build this. Approach: I recommend plain JSON read/write for simplicity.
  Option A: Plain JSON (recommended)
  Option B: Repository pattern (overkill for a CLI)
You: A.

Agent: Schema first. Here are the data types and function signatures for this feature...

... (spec defines schema, test cases, jaggedness flags, sub-tasks, file map, edge cases, integration points)

Agent: I am about to write the spec for 01-storage-layer. This spec will be the single source of truth for this feature. Any code written later must match this spec. Do you approve this approach, or do you want to discuss anything further?
You: Approved.

Agent: Here is the summary of the spec I am about to write. Does it look complete?
You: Yes.
```

**What happens:** The agent creates `TheAnchor/specs/plans/01-storage-layer/` and writes:
- `discussion.md` — deep dive notes, decisions, rejected options
- `spec.md` — the contract (schema, sub-tasks, file map, edge cases, integration)
- `test-spec.md` — test plan with inputs, expected outputs, mutation ideas
- `changelog.md` — spec version tracking

Then it updates `roadmap.md` and `index.md` to mark the feature as "specced."

> **The agent STOPS after writing the spec.** It does not offer to build. The human must review the spec before `/build` is run.

### Step 5 — Build the feature

```
You: /build

Agent: Starting build for 01-storage-layer. Confirm?
You: Yes.

--- PEV Loop begins ---

[PLAN] Reading sub-task: Task type and helpers
[EXECUTE] Writing test first → running tests → FAIL (expected)
[EXECUTE] Writing implementation → running tests → PASS
[VERIFY] Terminal Evidence: raw logs shown to you
[VERIFY] Mutation Testing: intentionally broke code → test caught it ✓
[VERIFY] CLI Verification: ran harness command → real-world state confirmed ✓
[SPEC COMPLIANCE] Code does exactly what spec.md says ✓

[PLAN] Reading sub-task: JSON persistence
[EXECUTE] Writing test first → running tests → FAIL
[EXECUTE] Writing implementation → running tests → PASS
[VERIFY] Terminal Evidence: raw logs shown to you
[VERIFY] Mutation Testing: removed guard clause → test caught it ✓
[VERIFY] CLI Verification: ran file system check → JSON output confirmed ✓
[SPEC COMPLIANCE] Code does exactly what spec.md says ✓
```

**What happens:** The agent:
1. Reads `spec.md` and `test-spec.md` completely before writing any code
2. Writes all implementation code and tests (tests first, always)
3. Runs mutation testing to prove tests are real (not fake)
4. Runs CLI verification tools from `harness.md` to check real-world state
5. Runs spec compliance checks to verify code matches the spec exactly
6. Logs any mistakes to `TheAnchor/mistakes.md`
7. Writes `build.md` (implementation log, deviations, reasoning)
8. Writes `tested.md` (test results, mutation testing evidence, CLI logs)
9. Writes `completed.md` (summary of what was built and why)
10. Updates `roadmap.md` and `index.md` to mark the feature as "complete"

### Step 6 — Repeat

Run `spec` then `build` for the next feature (`02-cli-commands`), and again for `03-integration-test`). When all features are complete, your roadmap is done.

**The entire cycle:**
```
explore → shape → map → spec → build → spec → build → spec → build → ... (done)
```

---

## The 5-Skill Workflow Explained

```
┌────────────────────────────────────────────────────────────────────────────┐
│                          YOUR PROJECT DIRECTORY                             │
│                                                                            │
│   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐     │
│   │ explore │ → │  shape  │ → │   map   │ → │   spec  │ → │  build  │     │
│   └─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘     │
│       │              │              │              │              │       │
│       ▼              ▼              ▼              ▼              ▼       │
│   TheAnchor/     TheAnchor/     TheAnchor/     TheAnchor/     TheAnchor/  │
│   idea.md        product.md     architecture.md  specs/        specs/      │
│   AGENTS.md      (updates)     roadmap.md        plans/        plans/       │
│   index.md       index.md      conventions.md     {id-name}/     {id-name}/  │
│   mistakes.md    (updates)     harness.md         spec.md       build.md    │
│                  (updates)     schemas/            test-spec.md   tested.md   │
│                                index.md            changelog.md   completed.md│
│                                AGENTS.md           discussion.md  (updates)   │
│                                                                            │
│   (spec + build repeat until roadmap is complete)                          │
└────────────────────────────────────────────────────────────────────────────┘
```

### Skill Dependencies

```
explore → shape → map → spec → build
   │         │       │       │       │
   └─────────┴───────┴───────┴───────┘
          All read TheAnchor/AGENTS.md
          All read TheAnchor/index.md
          All read TheAnchor/mistakes.md
```

**Rules:**
- `shape` requires `explore` to have run first (needs `idea.md`)
- `map` requires `shape` to have run first (needs `product.md`)
- `spec` requires `map` to have run first (needs `architecture.md` and `roadmap.md`)
- `build` requires `spec` to have run first (needs `spec.md` and `test-spec.md`)
- Every skill reads `AGENTS.md`, `index.md`, and `mistakes.md` before doing anything

### Running Skills Out of Order

If you try to run a skill before its prerequisites are met, the agent politely stops you:

```
You: /map
Agent: No product.md found in The Anchor. Please run the shape skill first by typing /shape.
```

```
You: /build
Agent: No spec.md found for 01-storage-layer. Please run the spec skill first by typing /spec.
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
| Day 1 | `/explore` captures idea. `/shape` structures product. `/map` designs architecture. `/spec` plans feature 1. `/build` builds it. All context written to `TheAnchor/`. |
| Day 2 | Agent reads `TheAnchor/`. Knows exactly where things stand. Continues from Day 1 seamlessly. |
| Day 5 | Agent reads `mistakes.md`. Knows what went wrong before. Avoids the same trap. |
| Day 10 | Every feature has a `spec.md`, `test-spec.md`, `completed.md`, and `tested.md`. The project is fully documented. |
| Day 100 | A new developer joins. Reads `TheAnchor/`. Understands the entire system in 30 minutes. |

---

## The Anchor

The `TheAnchor/` folder lives in your workspace root. It is the persistent brain of the project:

```
TheAnchor/
├── AGENTS.md              # Universal rules, always loaded first
├── index.md               # Master map: feature status, project summary, next action
├── idea.md                # Product idea (from explore)
├── product.md             # Structured product spec (from shape)
├── architecture.md        # Full system design (from map)
├── roadmap.md             # Ordered build sequence with dependencies
├── conventions.md         # Naming, patterns, anti-patterns
├── harness.md             # Test/lint/build + CLI verification commands
├── mistakes.md            # Errors and corrections (self-correcting memory)
├── schemas/               # Shared data contracts
│   ├── user.schema.md
│   └── README.md
└── specs/
    └── plans/
        └── {id}-{feature-name}/
            ├── discussion.md    # Deep dive notes, decisions, rejected options
            ├── spec.md          # THE CONTRACT (SDD source of truth)
            ├── test-spec.md     # Test plan written BEFORE code
            ├── changelog.md     # Every spec change tracked with rationale
            ├── build.md         # Implementation log, deviations, reasoning
            ├── tested.md        # Terminal evidence (raw logs, no summaries)
            └── completed.md     # Summary: "What was built and why"
```

### File Purpose

| File | Who Writes It | Who Reads It | Purpose |
|------|--------------|-------------|---------|
| `AGENTS.md` | explore (skeleton), map (updates) | Every skill, every session | Universal rules: tech stack, commands, no-touch zones |
| `index.md` | explore (skeleton), all skills (updates) | Every skill, every session | Master map: current state, feature status, key decisions |
| `idea.md` | explore | shape, map | Product concept: problem, users, features, constraints |
| `product.md` | shape | map, spec | Structured spec: feature list, user flows, success criteria |
| `architecture.md` | map | spec, build | System design: tech stack, data models, API design, security |
| `roadmap.md` | map (initial), spec/build (updates) | spec | Ordered features with parallel-safe flags and dependencies |
| `conventions.md` | map | build | Coding style: naming, error handling, anti-patterns |
| `harness.md` | map | build | Commands: test runner, build, lint, **CLI verification tools** |
| `mistakes.md` | explore (empty), build (updates) | Every skill | Error log: what happened, why, correction, prevention rule |
| `schemas/` | map (initial), spec/build (updates) | spec, build | Shared data contracts: one source of truth for data types |
| `spec.md` | spec | build | Implementation contract: schema, sub-tasks, tests, edge cases |
| `test-spec.md` | spec | build | Test plan: every case with input, expected output, mutation ideas |
| `discussion.md` | spec | Humans | Deep dive: options considered, decisions, rejected alternatives |
| `changelog.md` | spec (initial), spec/build (updates) | build, Humans | Spec versions & rationale for every change |
| `build.md` | build | Humans | Implementation log: sub-tasks, deviations, reasoning |
| `tested.md` | build | Humans | Test evidence: coverage, mutation testing results, CLI logs |
| `completed.md` | build | Humans | Summary: what was built, why, and how it works |

---

## Skills Reference

### `explore` — Discover the Idea

**Purpose:** The entry point. Captures the product concept through a bounded 7-question conversation.

**Invocation:** `/explore`

**Conversation flow:**
1. Checks for existing code → offers Reverse-Engineering Mode if found
2. Creates `TheAnchor/` folder if missing
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
- **Multi-session safe:** Can pause and resume anytime. The Anchor holds all context.
- **Confirmation gate:** Never writes files without your explicit "yes"

**Writes:** `idea.md`, `AGENTS.md` (skeleton), `index.md`, `mistakes.md`

**Next skill:** `/shape`

---

### `shape` — Structure the Product

**Purpose:** Transforms the raw idea into a structured, unambiguous product specification.

**Invocation:** `/shape`

**Conversation flow:**
1. Reads `idea.md` completely
2. Asks clarifying questions about feature boundaries, user flows, personas, success criteria, edge cases
3. Structures everything into a formal `product.md`
4. Presents a summary and asks for confirmation
5. Writes files

**Key features:**
- **Makes the implicit explicit:** Identifies ambiguities and resolves them
- **Does not add features:** Only structures what the user described
- **Multi-session safe:** Can pause and resume

**Writes:** `product.md`, updates `index.md`

**Next skill:** `/map`

---

### `map` — Map the System

**Purpose:** The architecture session. Collaborates with you to design the full system.

**Invocation:** `/map`

**Conversation flow:**
1. Reads `idea.md` and `product.md` completely
2. Presents preliminary architecture view as a starting point
3. Covers 10 topics collaboratively:
   - Tech stack recommendation
   - Architecture pattern (monolith vs microservices)
   - Services/modules breakdown
   - Data models (master level)
   - API design (system boundary)
   - Data flow
   - External integrations
   - Security model
   - Scalability considerations
   - Roadmap (ordered features with dependencies)
4. Presents a summary and asks for confirmation
5. Writes files

**Key features:**
- **Advisor Mode:** Presents 2-3 options with trade-offs. You decide. The agent never overrides you.
- **Migration handling:** If `architecture.md` already exists, computes blast radius and flags affected features
- **Schema-first:** Architecture defines shared data models before any implementation logic
- **Dependency roadmap:** Every feature has a `parallel-safe` flag and dependency mapping

**Writes:** `architecture.md`, `roadmap.md`, `conventions.md`, `harness.md`, `schemas/`, updates `AGENTS.md` and `index.md`

**Next skill:** `/spec`

---

### `spec` — Spec the Feature

**Purpose:** Per-feature planning. Produces a `spec.md` so detailed that `build` needs zero guessing.

**Invocation:** `/spec`

**Conversation flow:**
1. Reads `roadmap.md` and finds next unplanned feature
2. Presents the feature and asks if you want to spec it
3. Deep-dive conversation loop about ONE feature:
   - Feature context
   - Approach (with options and trade-offs)
   - Decision (recommended approach)
   - Schema (data types, signatures, APIs — **mandatory first**)
   - Test plan (test cases with input and expected output)
   - Jaggedness flags (AI weak points)
   - Sub-tasks (2-4 hour chunks)
   - File map (exact paths from workspace root)
   - Edge cases
   - Integration points
4. **Human review gate:** Agent STOPS and asks for approval before writing the spec
5. Presents a summary and asks for confirmation
6. Writes files

**Key features:**
- **Goldilocks sizing:** Not a single function (too small), not an entire backend (too big)
- **Schema-first:** Data types and signatures defined BEFORE logic discussion
- **Jaggedness flags:** Explicitly marks AI weak points for human review during `build`
- **Human review gate:** Agent must STOP and get approval before writing the spec
- **The spec is the single source of truth:** Code must match the spec. If they conflict, the spec wins.

**Writes:** `specs/plans/{id-name}/discussion.md`, `spec.md`, `test-spec.md`, `changelog.md`, updates `roadmap.md` and `index.md`

**Next skill:** `/build`

---

### `build` — Build the Feature

**Purpose:** Execution. Reads the spec and builds the feature using the PEV loop.

**Invocation:** `/build`

**What happens:**
1. Reads `AGENTS.md`, `mistakes.md`, `index.md`, `spec.md`, and `test-spec.md`
2. Asks you to confirm the feature
3. Runs the PEV loop for each sub-task
4. Runs the review checklist after all sub-tasks
5. Writes `build.md`, `tested.md`, and `completed.md`
6. Updates `roadmap.md`, `index.md`, `mistakes.md`, and `changelog.md`

**Key features:**
- **PEV Loop:** Plan → Execute → Verify. Tests are written before implementation.
- **Spec Compliance:** Code must do exactly what `spec.md` says — not just pass tests.
- **Mutation Testing:** Intentionally breaks code to prove tests catch the failure
- **Terminal Evidence:** Raw terminal logs shown to you — no "trust me, tests pass"
- **CLI Verification:** Runs `psql`/`curl`/`cat` from `harness.md` to check real-world state
- **Continuous Flow:** Context maintained across all sub-tasks within a feature

**Writes:** Code, `specs/plans/{id-name}/build.md`, `tested.md`, `completed.md`, updates `roadmap.md`, `index.md`, `mistakes.md`, `changelog.md`

**Next skill:** `/spec` (repeat until roadmap is complete)

---

## The PEV Loop

The inner loop of the `build` skill. It runs for every sub-task in a feature.

### 1. Plan

The agent reads the sub-task from `spec.md`:
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

1. **Write failing tests** — from the test cases defined in `test-spec.md`
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

3. **Spec Compliance** — The agent verifies: *"Does this code do exactly what `spec.md` says?"* Not just "tests pass = done."

4. **CLI Verification** — Runs CLI tools from `harness.md` to inspect the live environment:

```
[VERIFY] CLI Verification: cat task-db.json
[VERIFY] Output: [{"id":"1","description":"fix bug","completed":false}]
[VERIFY] Real-world state matches code logic ✓
```

5. **Commit** — The sub-task is committed.

6. **Mistake logging** — If anything unexpected happened, it is appended to `TheAnchor/mistakes.md`.

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

## SDD + TDD: How They Work Together

### Spec-Driven Development (SDD)

Before any code is written, the feature is fully specified in `spec.md`:
- What it does
- What the schema is
- What the sub-tasks are
- What the edge cases are
- How it integrates with the rest of the system

The spec is written in a **deep-dive conversation** between agent and human. The agent suggests, the human decides. The spec is the contract.

**The Rule: Spec First, Always**

```
Human: "Change the login flow."
Agent: "Which spec should I update?"
Human: "TheAnchor/specs/plans/03-auth/spec.md"
→ Agent EDITS spec.md first, writes changelog.md entry
→ Agent UPDATES test-spec.md with new test cases
→ Agent UPDATES schemas/ if data model changes
→ Agent UPDATES architecture.md if system design changes
→ ONLY THEN does Agent touch code.
```

### Test-Driven Development (TDD)

Inside every feature folder, `test-spec.md` is written before any code:
- What to test
- Input data
- Expected output
- How to mutate the code to prove the test is real

Then in `build`:
- Write tests from `test-spec.md` → **watch them fail**
- Implement to make tests pass
- Run mutation testing (break code, ensure tests catch it)
- Run CLI verification from `harness.md`
- Run spec compliance check ("Does this code do exactly what `spec.md` says?")
- Write `tested.md` with raw terminal logs

---

## Advanced Patterns

### Multi-Session Projects

The Anchor makes multi-session work seamless:

**Session 1: Idea**
```
User: "I want a SaaS..."
Agent (explore): *asks deep questions*
→ Writes idea.md
→ Updates index.md: "Next: shape"
```

**Session 2: Product Spec (3 days later)**
```
User: "Continue"
Agent: *reads index.md, sees "Next: shape"*
→ Reads idea.md
→ Structures product.md
→ Updates index.md: "Next: map"
```

**Session 3: Architecture**
```
Agent (map): *discusses tech stack, draws dependency graph*
→ Writes architecture.md, roadmap.md, schemas/
→ Updates index.md: "Next: spec"
```

**Session 4: Feature Deep Dive**
```
User: "Let's discuss feature 03-auth"
Agent (spec): *reads roadmap.md, sees auth is 3rd*
→ Deep-dive conversation: "JWT or sessions?" "What about OAuth?"
→ Human decides
→ Writes discussion.md, spec.md, test-spec.md
→ Stops: "Human, approve this spec before I build."
```

**Session 5: Build**
```
User: "Approved. Build it."
Agent (build): *reads spec.md, test-spec.md*
→ Writes tests (watches them fail)
→ Implements
→ Mutation tests
→ CLI verification
→ Writes tested.md, completed.md, build.md
→ Updates index.md: "03-auth: complete. Next: spec (feature 04)"
```

**This is possible because The Anchor holds all context. The agent is stateless; The Anchor is permanent.**

### Parallel Feature Work

Two features marked `parallel-safe: yes` in `roadmap.md` can be specced and built simultaneously by different agents:

```
Agent A: /spec → works on 02-cli-commands
Agent B: /spec → works on 03-error-handling
```

Both read the same `TheAnchor/`. Both respect the shared `schemas/` and `architecture.md`. When both are complete, `index.md` shows both as "complete."

### Spec Evolution

A feature changes after it's built. The correct flow:

1. **Update the spec first:**
   ```
   You: "Change the auth timeout from 1 hour to 24 hours"
   Agent: *updates TheAnchor/specs/plans/03-auth/spec.md*
   → Writes changelog.md entry: "v1.1.0 — Extended auth timeout"
   → Updates test-spec.md with new timeout test cases
   ```

2. **Then update the code:**
   ```
   Agent: *updates code to match new spec*
   → Runs tests
   → Runs mutation testing
   → Updates tested.md and completed.md
   ```

**Never change code without changing the spec first.**

### Adding a New Feature Mid-Project

1. Add the feature to `roadmap.md` with the next available ID
2. Update `index.md` to show the new feature as "planned"
3. Run `/spec` to plan it
4. Run `/build` to implement it

### Onboarding a New Agent

A new agent opens the project:

```
Agent: *reads TheAnchor/AGENTS.md* → knows tech stack and rules
Agent: *reads TheAnchor/index.md* → knows current state and next action
Agent: *reads TheAnchor/mistakes.md* → knows what not to do
Agent: *reads TheAnchor/architecture.md* → knows system design
Agent: *reads TheAnchor/roadmap.md* → knows what to build next
```

In under 60 seconds, the new agent is fully oriented and ready to work.

---

## Configuration Guide

### AGENTS.md

`AGENTS.md` is the first file every agent reads. Keep it under 100 lines. It contains:

- **Tech Stack** — language, framework, runtime, database
- **Commands** — exact test, build, lint, type-check commands
- **Key Files** — where to find architecture, specs, conventions
- **No-Touch Zones** — files agents must never modify
- **Rules** — global behavioral constraints

**Example:**

```markdown
# MyApp
A task manager CLI for developers.

## Tech Stack
- Language: TypeScript
- Framework: Node.js + Commander.js
- Runtime: Node.js 20
- Package Manager: npm
- Database: JSON file (local)

## Commands
- Test: `npm test`
- Build: `npm run build`
- Lint: `npm run lint`
- Type Check: `npx tsc --noEmit`

## Key Files
- Architecture: `TheAnchor/architecture.md`
- Product Spec: `TheAnchor/product.md`
- Roadmap: `TheAnchor/roadmap.md`
- Conventions: `TheAnchor/conventions.md`
- Mistakes Log: `TheAnchor/mistakes.md`
- Current State: `TheAnchor/index.md`

## No-Touch Zones
- `src/legacy/` — do not refactor without explicit approval
- `package.json` — do not add dependencies without approval

## Rules
- Always read `TheAnchor/index.md` before starting work.
- Always read `TheAnchor/mistakes.md` before writing code.
- The Anchor is the single source of truth. If code and The Anchor conflict, The Anchor is correct.
- If you need to change behavior, change The Anchor first, then change the code.
- Keep this file under 100 lines. Bloat degrades reasoning.
```

### index.md

`index.md` is the dashboard. Any agent can read it and know exactly where the project stands.

Key sections:
- **Status** — which skills are complete, which is next
- **Features** — table of all features with status and parallel-safe flags
- **Key Decisions** — architectural and product decisions
- **Active Jaggedness Flags** — sections needing human review
- **Impact Warnings** — notes about architecture changes affecting existing features
- **Files** — quick reference to all Anchor files

### conventions.md

Define your team's coding standards. This prevents AI slop:

- Naming conventions
- Folder structure
- Error handling patterns
- Testing conventions
- Anti-patterns to avoid

The agent reads this before writing code and checks every file against it.

### harness.md

Define the commands the agent uses to verify its work:

- Test runner commands
- Build commands
- **CLI Verification Tools** — raw terminal commands to inspect real-world state

Example:
```markdown
## CLI Verification Tools
- Database state: `psql -d mydb -c "SELECT * FROM users LIMIT 5"`
- API health: `curl http://localhost:3000/health`
- File system: `cat data/tasks.json`
```

---

## Real-World Recipes

### Recipe: Web App (Next.js + PostgreSQL)

**Stack:** Next.js 14, TypeScript, Tailwind, Prisma, PostgreSQL, Vercel

**Flow:**
1. `/explore` → "I need a SaaS dashboard for tracking project metrics"
2. `/shape` → Define features: auth, dashboard, projects, metrics, settings
3. `/map` → Next.js app router, Prisma ORM, PostgreSQL on Neon, deployed to Vercel
4. `/spec` → Feature 01: Auth with NextAuth.js
5. `/build` → Implement auth with tests
6. `/spec` → Feature 02: Dashboard layout and navigation
7. `/build` → Implement dashboard
8. Continue until roadmap is complete

**Key note:** Prisma schema goes in `TheAnchor/schemas/` so all features reference the same data model.

### Recipe: API-First Backend (FastAPI + PostgreSQL)

**Stack:** Python 3.11, FastAPI, SQLAlchemy, PostgreSQL, Docker, pytest

**Flow:**
1. `/explore` → "I need a REST API for an e-commerce platform"
2. `/shape` → Define features: products, cart, checkout, orders, users
3. `/map` → FastAPI with SQLAlchemy, PostgreSQL, Docker Compose, pytest
4. `/spec` → Feature 01: User registration and auth
5. `/build` → Implement auth with pytest + mutation testing
6. `/spec` → Feature 02: Product catalog
7. `/build` → Implement products
8. Continue until roadmap is complete

**Key note:** API contracts in `TheAnchor/schemas/api-contracts.md` are shared across all features.

### Recipe: CLI Tool (Go + Cobra)

**Stack:** Go 1.22, Cobra, SQLite, GitHub Actions

**Flow:**
1. `/explore` → "I need a CLI for managing Docker containers"
2. `/shape` → Define features: list, start, stop, logs, exec
3. `/map` → Go with Cobra, SQLite for local state, GitHub Actions for releases
4. `/spec` → Feature 01: Container listing and filtering
5. `/build` → Implement with Go tests + mutation testing
6. Continue until roadmap is complete

### Recipe: Mobile App (React Native + Supabase)

**Stack:** React Native, TypeScript, Supabase, Expo

**Flow:**
1. `/explore` → "I need a habit tracker mobile app"
2. `/shape` → Define features: auth, habits, tracking, streaks, reminders
3. `/map` → React Native with Expo, Supabase for backend/auth, local SQLite cache
4. `/spec` → Feature 01: Auth with Supabase
5. `/build` → Implement auth with Jest tests
6. Continue until roadmap is complete

### Recipe: Data Pipeline (Python + Airflow)

**Stack:** Python 3.11, Apache Airflow, PostgreSQL, Pandas, Docker

**Flow:**
1. `/explore` → "I need an ETL pipeline for processing daily sales data"
2. `/shape` → Define features: extraction, transformation, validation, loading, monitoring
3. `/map` → Airflow DAGs, PostgreSQL for metadata, Pandas for transforms, Docker
4. `/spec` → Feature 01: Data extraction from CSV + API
5. `/build` → Implement with pytest + data validation tests
6. Continue until roadmap is complete

---

## Core Principles

### 1. The Anchor is the single source of truth

The `TheAnchor/` folder is not a side artifact. It is the primary artifact. Everything the agent knows — decisions, architecture, mistakes, roadmap, specs — lives here. A well-maintained Anchor means any session can be started cold and become productive in under 60 seconds.

### 2. Spec first, always

The spec (`spec.md`) is written before any code. If behavior needs to change, the spec changes first (with a changelog entry), then the code changes. If code and spec conflict, the spec wins.

### 3. Tests are the contract

Tests define what "done" means. They are written before implementation. Agents cannot claim "tests passed" without **Terminal Evidence** (raw logs) and **Mutation Testing** (proof that tests catch real failures).

### 4. Advisor Mode

The agent executes, but the human judges. The agent presents 2-3 options with trade-offs, makes a recommendation, and **waits for explicit confirmation** ("Yes, go with Option A") before writing anything to `TheAnchor/`.

### 5. Goldilocks Features

Every unit of work is perfectly sized: not a single function (too small), and not an entire backend (too big). A feature is a **Complete User Flow or Feature Module**. This size is large enough to be meaningful and small enough to be verifiable in one session.

### 6. Continuous Flow

Once a feature begins, the agent retains the full conversation history across all sub-tasks. Modern LLMs have massive context windows (200k+ tokens). By keeping context intact, the agent retains critical nuances, variable states, and implicit architectural learnings. Context is only reset between features, not within them.

### 7. Human review gates

After `spec` writes the spec, the agent **stops** and asks for human approval before any code is written. This prevents the agent from "vibe coding" past the spec.

### 8. Claim the leverage without compromising quality

AI agents provide enormous leverage. That leverage is only valuable if the output meets professional engineering standards. AdeX is the mechanism that makes both true simultaneously.

---

## Anti-Patterns AdeX Prevents

| Anti-Pattern | How It Happens Without AdeX | How AdeX Prevents It |
|-------------|---------------------------|---------------------|
| **AI Slop** | Unnecessary abstractions, hallucinated APIs, inconsistent naming | `conventions.md` enforces strict styling. `build` runs an anti-slop review. |
| **Guessing** | Agent assumes variable names, data shapes, or API contracts | Schema-first requirement in `spec.md`. If it's not defined, the agent asks. |
| **Fake Tests** | Agent claims "tests passed" but tests don't actually verify anything | **Mutation Testing** — intentionally breaking code to prove tests catch failures. |
| **Ignoring Mistakes** | Same bug re-introduced in every session | `mistakes.md` is Tier-1 context. Every skill reads it before writing code. |
| **Context Loss** | Every session starts from zero | `TheAnchor/` survives between sessions. No more starting from zero. |
| **Scope Creep** | Agent builds more than what was asked | `spec.md` defines exact scope. `build` checks "Does this solve what spec.md asked for?" |
| **Spec Drift** | Code evolves but the spec is never updated | **Changelog.md** tracks every spec change. **Spec compliance checks** verify code matches spec. |
| **Vibe Coding** | Agent ignores the spec and builds whatever feels right | **Human review gate** stops the agent after spec writing. **Spec compliance checks** during build. |
| **Silent Conflicts** | Agent resolves spec/code conflicts without telling you | **Explicit conflict surfacing** — agent asks user when spec and code diverge. |

---

## Framework Roadmap

AdeX is actively developed. Here is what is planned:

| Skill | Status | Description |
|-------|--------|-------------|
| `explore` | ✅ Released | Discover the product idea |
| `shape` | ✅ Released | Structure the product spec |
| `map` | ✅ Released | Design architecture and roadmap |
| `spec` | ✅ Released | Deep-dive feature planning |
| `build` | ✅ Released | TDD implementation with PEV loop |
| `review` | 🚧 Planned | Post-build quality and security review |
| `debug` | 🚧 Planned | Diagnose errors without building |
| `upgrade` | 🚧 Planned | Handle refactors and dependency upgrades |
| `prd` | 🚧 Planned | Generate per-feature requirement docs |
| `test` | 🚧 Planned | Standalone test-running and verification skill |
| `docs` | 🚧 Planned | Auto-generate user-facing documentation |

**Want to contribute a skill?** See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Inspirations

AdeX is built on principles from world-class AI builders:

- **Andrej Karpathy** — Parallel execution and jaggedness awareness. AI models are jagged — they solve hard problems brilliantly and fail at something obvious. AdeX marks features as parallel-safe and flags jaggedness in every spec.

- **Boris Cherny** — Verification loops and self-correcting context. AdeX has `mistakes.md` as a living error log so mistakes don't repeat.

- **Simon Willison** — Schema-first and anti-slop. Every `spec.md` opens with a schema section defining data types and APIs before any logic. This prevents "AI slop" (hallucinated variables and redundant abstractions).

- **Peter Steinberger** — CLI verification tools. Agents cannot rely solely on unit tests. AdeX uses `harness.md` to store raw terminal commands (`psql`, `curl`, `cat`) that the agent runs to inspect the live environment and database state.

- **Swyx (AI Engineer)** — Agentic loops and conversation over one-shot. `spec` is a **conversation loop**, not a one-shot spec generator. Agent asks questions until clarity.

- **Jeremy Howard** — Interactive exploration. `explore` and `spec` allow multi-turn exploration. Agent can say: *"I need to understand X before proposing Y."*

---

## FAQ

### Why "The Anchor"?

In naval architecture, an anchor holds a vessel to a fixed point so it doesn't drift with the wind or current. In AI engineering, our context drifts with every new session. **The Anchor** is the persistent structure that holds your entire project to reality — across sessions, across agents, across time.

### Can I use AdeX with my existing project?

Yes. Run `/explore` in your project directory. The agent will detect existing code and offer **Reverse-Engineering Mode**. It scans your codebase and drafts `idea.md` and `architecture.md` for your review.

### Do I need to use all 5 skills?

No. You can start at any point:
- Have an idea but no spec? Use `/explore` then `/shape`.
- Have a spec but no architecture? Use `/map`.
- Have architecture but need to plan features? Use `/spec`.
- Have a spec and just need to build? Use `/build`.

Each skill checks prerequisites and tells you what to run if something is missing.

### Can I pause a session and resume later?

Yes. This is one of AdeX's core strengths. Every skill is **multi-session safe**. The Anchor holds all context. When you resume, the agent reads `index.md` and knows exactly where things stand.

### What if I disagree with the agent's recommendation?

**The human decides, always.** The agent presents options with trade-offs and makes a recommendation. But it never overrides your explicit choice. If you say "Use Option B," the agent follows Option B — even if it disagrees.

### How long should a feature take to build?

A feature should be a **complete user flow or feature module** that can be specced in one session and built in one session. Typically 2-6 hours of focused work. Not a single function (too small), not an entire backend (too big).

### Can multiple agents work on the same project?

Yes. Because The Anchor is the single source of truth, any agent can open the project and know where things stand. Features marked `parallel-safe: yes` can even be worked on simultaneously by different agents.

### What happens if the spec is wrong?

Update the spec first. Write a changelog entry explaining the change. Then update the code to match the new spec. The spec is the contract — if the contract changes, both parties (spec and code) must reflect it.

### Do I need to commit TheAnchor/ to git?

**Yes.** The Anchor is part of your project. Commit it to version control so that:
- Other developers can understand the project
- CI/CD can read specs for automated testing
- You have a history of architectural decisions
- New agents can clone and immediately understand the project

Add this to your `.gitignore` if you want to exclude agent session artifacts:
```
TheAnchor/.session/
```

### Can I use AdeX for non-software projects?

AdeX is optimized for software engineering, but the principles apply to any complex project that requires:
- Persistent context across sessions
- Structured planning before execution
- Verification and testing of outputs

Documentation projects, data analysis pipelines, and infrastructure-as-code are all good fits.

---

## Troubleshooting

### Skill not found after installation

**Problem:** You type `/explore` and the agent doesn't recognize it.

**Solutions:**
1. **Restart your agent session.** Most agents scan for new skills at startup.
2. **Verify installation:**
   ```bash
   npx skills list
   ```
3. **Check the skill directory exists:**
   ```bash
   # For Claude Code
   ls ~/.claude/skills/explore/
   
   # For Cursor
   ls ~/.cursor/skills/explore/
   
   # For Codex
   ls ~/.codex/skills/explore/
   ```
4. **Check SKILL.md frontmatter.** The file must have valid YAML frontmatter with `name` and `description` fields.

### Agent says "Please run explore first" but I already ran it

**Problem:** The agent cannot find `TheAnchor/idea.md`.

**Solutions:**
1. Check that you are in the correct project directory
2. Verify `TheAnchor/idea.md` exists:
   ```bash
   ls TheAnchor/idea.md
   ```
3. If the file exists but the agent still can't find it, the agent may have the wrong working directory. Try:
   ```bash
   pwd
   ```
   And confirm you are in the project root.

### I have existing code. How do I start?

Run `/explore` in your existing project directory. The agent will detect your code and offer **Reverse-Engineering Mode**:

```
Agent: I see existing code here. Should I scan the codebase and reverse-engineer
your idea.md and architecture.md, or do you want to define it manually via chat?
```

Choose "reverse-engineer" and the agent will analyze your codebase to produce draft `idea.md` and `architecture.md` files for your review and confirmation.

### How do I update an existing architecture?

Run `/map` again. The agent will detect the existing `architecture.md` and ask:

```
Agent: An architecture.md already exists in The Anchor. Would you like to refine the existing
architecture, or rebuild from scratch?
```

Choose "refine" and the agent will treat the conversation as deltas. If you make changes that affect existing code, `map` will compute the blast radius and flag affected features in `roadmap.md` and `index.md`.

### How do I skip a feature?

You don't. The `spec` skill picks the next unplanned feature automatically. If you want to work on a different feature, tell the agent when it asks:

```
Agent: Ready to spec 01-storage-layer? Or would you like a different feature?
You: I want to spec 02-cli-commands instead.
```

The agent will verify that all dependencies for `02-cli-commands` are marked complete before proceeding.

### How do I change a feature after it's built?

**The Anchor is the single source of truth.** Update the spec first:

```
You: I need to change how task deletion works in 01-storage-layer.
Agent: I'll update the spec first. Reading TheAnchor/specs/plans/01-storage-layer/spec.md...
→ Updates spec.md with new behavior
→ Writes changelog.md entry explaining the change
→ Updates test-spec.md with new test cases
→ Then updates the code to match the new spec
```

---

## Contributing

We welcome contributions from the community. Whether you want to add a skill, improve documentation, fix a bug, or share a recipe, we would love your help.

### Ways to Contribute

1. **Report bugs** — Open an issue on GitHub with reproduction steps
2. **Suggest features** — Open an issue describing the skill or enhancement
3. **Add skills** — Follow the skill format in [CONTRIBUTING.md](CONTRIBUTING.md)
4. **Share recipes** — Add real-world examples to the README
5. **Improve docs** — Fix typos, clarify explanations, add examples
6. **Answer questions** — Help others in discussions

### Development Setup

1. Fork the repository
2. Clone your fork
3. Make your changes
4. Test your changes on a sample project
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Skill format and required sections
- How to add a new skill
- How to extend an existing skill
- Testing changes
- Code of conduct

**Future skill ideas:** `review`, `debug`, `upgrade`, `prd`, `test`, `docs`

**Report issues:** [GitHub Issues](https://github.com/Adexengineer/Adex/issues)

**Start a discussion:** [GitHub Discussions](https://github.com/Adexengineer/Adex/discussions)

---

## Community

- **GitHub:** [Adexengineer/Adex](https://github.com/Adexengineer/Adex)
- **Issues:** [Report bugs or request features](https://github.com/Adexengineer/Adex/issues)
- **Discussions:** [Ask questions, share recipes, show off projects](https://github.com/Adexengineer/Adex/discussions)
- **Discord:** *(coming soon)*

**Show us what you built with AdeX.** We love seeing real projects using The Anchor.

---

## Security

### Handling Secrets

- **Never commit secrets to TheAnchor/.** Use environment variables or a secrets manager.
- `AGENTS.md` should reference secret locations, not contain them.
- If an agent accidentally writes a secret to a spec or build log, delete it immediately and rotate the credential.

### Agent Permissions

- The agent follows the **No-Touch Zones** defined in `AGENTS.md`.
- If an agent suggests modifying a no-touch zone, it must ask for explicit approval.
- Review `build.md` and `completed.md` after each build to ensure no unauthorized changes were made.

### Reporting Security Issues

If you discover a security vulnerability in AdeX itself, please open a private issue or email the maintainer directly. Do not disclose security issues publicly until they are resolved.

---

## Documentation

- [Contributing Guide](CONTRIBUTING.md) — how to add skills or extend the framework
- [AgentSkills Standard](https://agentskills.io) — the universal skill format AdeX follows
- [Master Specification](master_spec.md) — the complete AdeX framework specification (local reference)

---

## License

MIT

---

**AdeX** — The Anchor holds everything. 🏛️
