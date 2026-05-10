# {slice-name} — Plan

## Description
{What this slice does and why it exists.}

## Dependencies
{What must exist before this slice can be built. List specific slices, files, or infrastructure.}

## Schema
{All data types, API contracts, and function signatures defined in precise language. This section must come before any logic discussion.}

### Data Types
- `{TypeName}`: {definition}

### API Contracts
- `{endpoint or function}`: {signature and contract}

### Function Signatures
- `{functionName}({params}) -> {returnType}`: {description}

## Jaggedness Flags
{Sections where AI is known to be unreliable. Each flag must state:}
- **Section**: {which part of the slice}
- **Why flagged**: {why AI tends to get this wrong}
- **Human should review**: {what specifically to check}

## Sub-Tasks

### Sub-Task {NN} — {name}
- **Description**: {what this sub-task does}
- **Files to create or modify**:
  - `{absolute/path/from/workspace/root}`
- **Test cases** (write these first):
  - **{test name}**: Input `{input}`, Expected `{output}`, Validates `{what behavior}`
- **Acceptance criteria**: {how we know this sub-task is done}
- **Edge cases to handle**: {list}

## Integration Notes
{How this slice connects to existing code and other slices.}

## Known Risks
{Things that could go wrong and how to handle them.}

## Out of Scope
{What this slice explicitly does not do.}
