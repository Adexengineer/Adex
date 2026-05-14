# {feature-name} — Spec

## Version
{Version number, e.g., 1.0.0}

## Description
{What this feature does and why it exists.}

## Dependencies
{What must exist before this feature can be built. List specific features, files, or infrastructure.}

## Schema
{All data types, API contracts, and function signatures defined in precise language. This section must come before any logic discussion. Reference TheAnchor/schemas/ for shared contracts.}

### Data Types
- `{TypeName}`: {definition}

### API Contracts
- `{endpoint or function}`: {signature and contract}

### Function Signatures
- `{functionName}({params}) -> {returnType}`: {description}

## Jaggedness Flags
{Sections where AI is known to be unreliable. Each flag must state:}
- **Section**: {which part of the feature}
- **Why flagged**: {why AI tends to get this wrong}
- **Human should review**: {what specifically to check}

## Sub-Tasks

### Sub-Task {NN} — {name}
- **Description**: {what this sub-task does}
- **Files to create or modify**:
  - `{absolute/path/from/workspace/root}`
- **Acceptance criteria**: {how we know this sub-task is done}
- **Edge cases to handle**: {list}

## Integration Notes
{How this feature connects to existing code, shared schemas, and other features.}

## Known Risks
{Things that could go wrong and how to handle them.}

## Out of Scope
{What this feature explicitly does not do.}

## Spec Compliance Rules
- Code must implement exactly what this spec says.
- If code and spec conflict, the spec wins. Update the spec first (with a changelog entry), then update the code.
- Every sub-task must pass its acceptance criteria before the feature is considered complete.
