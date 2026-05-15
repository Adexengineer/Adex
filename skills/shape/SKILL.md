---
name: shape
version: 0.2.0
description: Structure the raw idea into a clear, formal product specification
invocation: /shape
author: Adexengineer
---

# Shape Skill — Structure the product

## Purpose

`shape` takes the raw vision from `TheAnchor/idea.md` and transforms it into a structured, unambiguous product specification: `TheAnchor/product.md`.

**The design philosophy:** The agent does the structuring work. The user edits a draft, not a blank page. This is **Propose-Edit-Confirm** — not interrogation.

`shape` is a collaborative session. The agent reads `idea.md`, identifies ambiguities, and **proposes resolutions** — not asks questions. The user accepts, rejects, or modifies.

## On invocation

1. Check for `TheAnchor/` in the workspace root. If missing, tell the user: **"The Anchor does not exist. Please run the `explore` skill first by typing `/explore`."** Then end the session.
2. Check for `TheAnchor/idea.md`. If missing, tell the user: **"No idea.md found in The Anchor. Please run the `explore` skill first by typing `/explore`."** Then end the session.
3. Read `TheAnchor/idea.md` **completely** before saying anything to the user.
4. Check for `TheAnchor/product.md`. If it exists:
   - Read it completely.
   - Present a brief summary to the user.
   - Ask: **"A product.md already exists. Would you like to refine it, or rebuild from scratch?"**
     - If refine: treat the conversation as deltas. Use the existing content as baseline and propose changes.
     - If rebuild: proceed as if starting fresh, overwriting on confirmation.
5. If `product.md` does not exist: proceed directly to the Propose-Edit-Confirm flow.

## Propose-Edit-Confirm Flow

`shape` does **not** ask the user to define anything. It **proposes** a complete product structure based on `idea.md`, then invites the user to edit it.

### Step 1: Propose (Agent structures the product)

The agent reads `idea.md` and builds a **complete product proposal** — silently, before the first message to the user.

The proposal includes:

1. **Value Proposition** — One clear sentence: what this product does and for whom.
2. **MVP Feature List** — 3–7 features, with reasoning for each ("I included this because...")
3. **v2 Feature List** — Nice-to-haves that didn't make MVP
4. **Later** — Explicitly out-of-scope features
5. **User Flows** — Step-by-step for the top 2–3 user journeys
6. **Success Criteria** — How we measure that the product works
7. **Edge Cases** — What happens when things go wrong at the product level
8. **Resolved Deferred Topics** — Any topics marked "deferred" in `idea.md` get proposed here with the agent's best guess

**Present the proposal to the user as a structured draft:**

> "I read your idea.md. Here's what I think the product looks like. I've made some assumptions — tell me what's right, what's wrong, and what's missing."

Then present the full proposal in a clean format:
- Value proposition (1 sentence)
- MVP features (bulleted, with brief reasoning)
- v2 features (brief)
- User flows (numbered steps)
- Success criteria (bullet list)
- Edge cases (bullet list)
- Resolved deferred topics (if any)

### Step 2: Edit (User modifies the proposal)

The user responds with edits. They might say:
- "That's perfect."
- "Change X to Y."
- "Add Z."
- "Remove W."
- "You got [topic] wrong — it's actually..."
- "I don't agree with [assumption]."

**The agent accepts all edits without argument.** It applies them to the proposal and presents the updated version.

**If the user is vague:** "That feature feels wrong" — the agent does not ask "what do you mean?" It says:
> "Got it. I assumed [thing]. Is it more like [Option A] or [Option B]?"

**If the user rejects a core assumption:** The agent updates the proposal and re-presents it. No persuasion. No "but I think..." Just: "Updated. Here's the revised version."

### Step 3: Confirm (Lock the spec)

After edits settle, the agent presents a **final concise summary** (5–8 bullet points) covering:
- The core value proposition
- The target user(s)
- The complete feature list (MVP + v2)
- Key user flows (2-3 sentences each)
- Success criteria per feature
- Explicit non-goals

**Then ask:** **"Does this product spec capture everything accurately?"**

- If the user says **yes** or makes only minor corrections: apply corrections and proceed to "On confirmation."
- If the user says **no** or requests significant changes: apply edits and re-present the summary, then ask the confirmation question again.

### Handling deferred topics from `explore`

If `idea.md` contains deferred topics, `shape` MUST address them in the proposal:

- For each deferred topic, the agent makes its **best guess** and presents it with reasoning.
- The user can accept, reject, or modify.
- If the user still doesn't know: mark it "deferred to `map`" and move on. Do not stall.

### Conversation rules

- **Never ask the user to define something without proposing it first.** Always present a draft.
- **Never add features the user did not mention.** If you think a feature is missing, include it in the proposal but mark it as "suggested — confirm or remove."
- **Never suggest architecture, tech stack, or implementation.** `shape` is about WHAT the product does, not HOW it is built.
- **Never argue with the user's edits.** Accept and re-present.
- **If the user says "let's pause" or "save this for later"**, summarize what was captured so far, write a draft `product.md` with a `draft` flag, and end the session cleanly.
- **The agent is a product partner, not a product manager.** It structures the user's intent, it does not impose its own.

## On confirmation

1. Write `TheAnchor/product.md` using the template from `./templates/product.template.md`. Populate it with all information from `idea.md` plus all edits from the conversation.
2. Update `TheAnchor/index.md`:
   - Fill in the **Summary** with 2–3 sentences describing the product and its current state.
   - Update the **Files** section to reflect that `product.md` now exists.
   - Update the **Status** to show `explore: complete, shape: complete, next: map`.
3. End the session cleanly. Say: **"The shape skill is complete. product.md has been created in TheAnchor/. Next step: run the `map` skill to design the system architecture."**
4. Do **not** continue the conversation. Do **not** suggest next steps beyond naming the next skill.

## File templates

This skill reads its structural template from `./templates/`:

- `./templates/product.template.md` — template for `TheAnchor/product.md`

## Rules

- **Read `idea.md` completely before the first message.** Do not ask the user to re-explain the idea.
- **Propose first, ask second.** Always present a draft structure before asking for clarification.
- **Never add features the user did not mention.** Ask for confirmation if you think something is missing.
- **Never suggest architecture, tech stack, or implementation.** `shape` is product-only.
- **Never write files before user confirmation.** Always present the final summary and get explicit approval.
- **Never continue the session after files are written.** The session ends cleanly.
- **Always update `index.md`** when writing `product.md`.
- **If refining an existing product**, read the existing `product.md` first and treat the conversation as deltas, not a blank slate.
- **Multi-session safe:** If the user pauses, write a draft `product.md` with a `draft` flag and end cleanly.
