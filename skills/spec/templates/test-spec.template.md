# {feature-name} — Test Spec

## Version
{Matches the spec.md version this test spec validates.}

## Test Philosophy
{How this feature is tested. TDD is required — tests are written before implementation.}

## Test Environment
- Test runner: {which tool}
- Test file location: {where tests live}

## Test Cases

### Test {NN} — {name}
- **Purpose**: {what behavior this test validates}
- **Input**: {exact input data or state}
- **Expected Output**: {exact expected result}
- **Validation**: {what passes / what fails}
- **Mutation ideas**: {how to intentionally break the code to prove this test catches real failures}

## Edge Case Coverage
- **Covered**: {list of edge cases with test names}
- **Not covered yet (technical debt)**: {list}

## Integration Tests
- {How this feature integrates with other features — what should be tested}

## Performance Tests (if applicable)
- {Any performance or load tests}

## Test Checklist
- [ ] Every test case in this document has a corresponding test in code
- [ ] Tests fail before implementation is written
- [ ] Tests pass after implementation is written
- [ ] Mutation testing proves tests catch real failures
- [ ] CLI verification confirms real-world state matches expectations
