---
name: shape
version: 0.1.0
description: Structure the raw idea into a clear, formal product specification
invocation: /shape
author: Adexengineer
---

# Shape Skill — Structure the product

## Purpose

`shape` takes the raw vision from `TheAnchor/idea.md` and transforms it into a structured, unambiguous product specification: `TheAnchor/product.md`. This is where we define exactly what the product does, who it serves, and what success looks like — in language so clear that any future agent can read it and understand the full intent.

`shape` is a collaborative session. The agent reads `idea.md`, identifies ambiguities, and asks the user to clarify them. It does not invent features. It does not suggest architecture. It makes the implicit explicit.

## On invocation

1. Check for `TheAnchor/` in the workspace root. If missing, tell the user: **"The Anchor does not exist. Please run the `explore` skill first by typing `/explore`."** Then end the session.
2. Check for `TheAnchor/idea.md`. If missing, tell the user: **"No idea.md found in The Anchor. Please run the `explore` skill first by typing `/explore`."** Then end the session.
3. Read `TheAnchor/idea.md` **completely** before saying anything to the user.
4. Check for `TheAnchor/product.md`. If it exists:
   - Read it completely.
   - Present a brief summary to the user.
   - Ask: **"A product.md already exists. Would you like to refine it, or rebuild from scratch?"**
     - If refine: treat the conversation as deltas. Ask about what has changed.
     - If rebuild: proceed as if starting fresh, overwriting on confirmation.
5. If `product.md` does not exist: proceed directly to the conversation flow.

## Conversation flow

`shape` reads `idea.md`, identifies what is clear and what is ambiguous, and **asks clarifying questions** — one at a time, conversationally.

### Clarification topics

For each of these, the agent reads `idea.md` and determines if it is already clear. If clear, skip the topic. If ambiguous, ask the user:

1. **Feature boundaries** — Are there features mentioned in `idea.md` that need to be broken down into sub-features? What is the MVP vs v2 vs later?
2. **User flows** — For each core feature, what is the step-by-step user flow? What does the user see, click, type, receive?
3. **User personas** — Are there different types of users? What can each type do? What can they NOT do?
4. **Success criteria** — How do we measure success for each feature? What metrics, what behavior, what observable outcome?
5. **Edge cases at the product level** — What should happen when the user does X instead of Y? What about error states?
6. **Constraints and non-goals** — Are the constraints in `idea.md` complete? Any hidden constraints the user hasn't stated?

### Conversation rules

- **Never ask more than one question at a time.**
- If the user gives a detailed answer that resolves multiple ambiguities, skip the resolved topics.
- Do **not** suggest architecture, tech stack, or implementation. `shape` is about WHAT the product does, not HOW it is built.
- Do **not** add features the user did not mention. If you think a feature is missing, ask: *"I noticed you didn't mention [feature]. Is that intentional?"*

### Confirmation gate

After all ambiguities are resolved, the agent produces a concise product summary (5–8 bullet points) covering:
- The core value proposition
- The target user(s)
- The complete feature list (MMP + v2)
- Key user flows (2-3 sentences each)
- Success criteria per feature
- Explicit non-goals

Then ask: **"Does this product spec capture everything accurately?"**

- If the user says **yes** or makes only minor corrections: apply corrections and proceed to "On confirmation."
- If the user says **no** or requests significant changes: revisit the relevant topics until agreement is reached, then ask the confirmation question again.

## On confirmation

1. Write `TheAnchor/product.md` using the template from `./templates/product.template.md`. Populate it with all information from `idea.md` plus all clarifications from the conversation.
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
- **Never add features the user did not mention.** Ask for confirmation if you think something is missing.
- **Never suggest architecture, tech stack, or implementation.** `shape` is product-only.
- **Never write files before user confirmation.** Always present the summary and get explicit approval.
- **Never continue the session after files are written.** The session ends cleanly.
- **Always update `index.md`** when writing `product.md`.
- **If refining an existing product**, read the existing `product.md` first and treat the conversation as deltas, not a blank slate.
- **Multi-session safe:** If the user pauses, write a draft `product.md` with a `draft` flag and end cleanly.
