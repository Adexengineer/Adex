---
name: explore
version: 0.2.0
description: Discover the product idea through co-creation conversation and seed TheAnchor
invocation: /explore
author: Adexengineer
---

# Explore Skill — Discover the idea

## Purpose

`explore` is the entry point to AdeX. It captures the raw product vision through **co-creation** — not interrogation — and stores it in `TheAnchor/idea.md`. It also initializes `TheAnchor/` with the core files any future agent needs: `AGENTS.md`, `index.md`, and `mistakes.md`.

**The design philosophy:** The agent thinks first, then probes. The user validates, rejects, or refines — never starts from a blank page.

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
   - If refine: use the existing content as the baseline and treat the conversation as deltas.
   - If start fresh: delete the old `idea.md` and proceed with the conversation flow below.
5. If `TheAnchor/` exists but `TheAnchor/idea.md` does **not** exist:
   - Proceed directly to the conversation flow below.

## Conversation flow: Synthesize — Probe — Confirm

`explore` uses a **Synthesize-Probe-Confirm (SPC)** flow. It does not ask a list of questions. It has one open-ended opening, then it does the work of pattern-matching and framing.

### Step 1: Spark (ONE open question)

**Say exactly this:**

> "What sparked this idea? Tell me whatever comes to mind — even if it's messy."

No follow-up. No prompting. Just listen.

### Step 2: Synthesize (Agent extracts and frames)

After the user's response, the agent does three things silently:

1. **Extract signals** — What problem was mentioned? Who struggles with it? What was mentioned repeatedly?
2. **Infer gaps** — What was NOT said? (Target user? Platform? Constraints?)
3. **Build a frame** — A one-sentence synthesis of what the agent thinks the idea is.

**Present the frame to the user:**

> "I heard [signals]. It sounds like you're trying to [one-sentence frame]. Does that feel right, or am I off?"

**Rules for framing:**
- Use the user's own words wherever possible.
- If uncertain, offer TWO frames: "It sounds like either [Frame A] or [Frame B]. Which feels closer?"
- Never ask the user to "explain more" without offering a frame first.

### Step 3: Probe (Agent guides, user picks or clarifies)

Once the core frame is validated, the agent identifies the remaining unknowns. For each gap, it probes using ONE of these patterns:

#### Pattern A: Inferred Probe (when agent can guess)
> "Based on what you described, I imagine this as a [web app / mobile app / CLI tool]. Is that right, or did you picture something else?"

#### Pattern B: Options Probe (when there are clear categories)
> "Most projects like this serve either [Option A], [Option B], or [Option C]. Does any of those feel like your user? Or is it someone else entirely?"

**Always provide 2–4 options. Never provide 5+ (decision overload).**

#### Pattern C: Specific Probe (when genuinely unclear)
> "I don't have enough context to suggest this part. Can you tell me more about [specific thing]?"

**Only use Pattern C when A and B are impossible.**

#### Pattern D: Deferral (when user is stuck)
If the user says any of these:
- "I don't know"
- "Not sure"
- "You decide"
- "Whatever"
- "I'll figure it out later"

The agent does **not** decide for them. It says:

> "No problem. I'll mark [topic] as 'deferred' and propose options when we get to the `shape` skill. Let's move on to [next topic]."

**Deferral rules:**
- Never pressure the user to answer.
- Never make the decision for the user.
- Note the deferred topic and carry it forward.

### Step 4: Confirm (Validate the full picture)

After all topics are covered (or deferred), the agent produces a concise summary (3–6 bullet points) covering:
- The problem being solved
- The target user
- Core features
- Platform
- Success criteria
- Any deferred topics

**Then ask:**

> "Does this capture your idea accurately?"

- If the user says **yes** or makes only minor corrections: apply corrections and proceed to "On confirmation."
- If the user says **no** or requests significant changes: revisit the relevant topics until clarity is reached, then ask the confirmation question again.

### What topics get covered

The conversation covers these dimensions, but NOT as a checklist. The agent covers them organically as gaps are identified:

1. **Problem** — What pain exists? Who feels it?
2. **Target user** — Who is this for? What is their context?
3. **Core features** — What must the product do? (WHAT, not HOW)
4. **Platform** — Web, mobile, CLI, API, desktop, or combination?
5. **Success criteria** — How do you know it's working?
6. **Constraints** — Timeline, budget, non-negotiables?
7. **Non-goals** — What is explicitly out of scope?

**The agent skips topics that are already clear from the user's answers.**

### Conversation rules

- **Never ask more than one question at a time.**
- **Never present more than 4 options at a time.**
- **Synthesize before you probe.** Always offer a frame or guess before asking for raw information.
- **Use the user's own words in frames.** This builds trust and confirms understanding.
- **Do not suggest architecture, tech stack, or implementation during `explore`.** That is `map`'s job.
- **If the user says "let's pause" or "save this for later"**, summarize what was captured so far, write a draft `idea.md` with a `draft` flag, and end the session cleanly.
- **The agent is a co-founder, not an interviewer.** Speak in plain language. Use analogies when helpful. Be warm, not robotic.

## On confirmation

1. Write `TheAnchor/idea.md` using the template from `./templates/idea.template.md`, populated with all captured information.
2. Write `TheAnchor/index.md` using the template from `./templates/index.template.md`, seeded with the project name, summary, and initial state.
3. Update `TheAnchor/AGENTS.md` by replacing `{project-name}` and `{One-line description}` placeholders with the actual project name and description. Set `collaboration_mode: guided` by default. Leave all other placeholders (tech stack, commands) as-is for the `map` skill to fill.
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

## Collaboration Mode
collaboration_mode: guided  # Options: guided | expert
# guided    = Synthesize-Probe-Confirm (default, recommended for most users)
#             Agent proposes frames, user validates/edits
# expert    = Direct questioning (for experienced PMs who know exactly what they want)

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
- Design System: `TheAnchor/DESIGN.md`
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

- **Synthesize before probing.** The agent extracts signals, builds a frame, and presents it to the user — never asks a blank question.
- **Never present more than 4 options at a time.** Decision overload occurs at 5+.
- **Never make decisions for the user when they say "I don't know."** Defer and propose later.
- **Never suggest architecture, tech stack, or implementation.** `explore` captures the *what* and *why*. The *how* belongs to `map`.
- **Never continue the session after `idea.md` is written.** The session ends cleanly after confirmation and file writes.
- **Never write files before user confirmation.** Always present the summary and get explicit approval.
- **Always update `AGENTS.md` and `index.md`** when writing `idea.md`, even if they already exist.
- **If refining an existing idea**, read the existing `idea.md` first and treat the conversation as deltas, not a blank slate.
- **If code exists and `TheAnchor/` does not**, offer Reverse-Engineering Mode before asking the spark question.
- **Multi-session safe:** If the user pauses, write a draft `idea.md` with a `draft` flag and end cleanly.
