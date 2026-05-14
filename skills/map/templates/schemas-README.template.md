# Shared Schemas

This directory contains shared data contracts used across all features.

## Purpose

The `schemas/` directory is the single source of truth for data types, entities, and API contracts that multiple features depend on. When a feature spec needs to reference a data type, it imports it from here — it does not redefine it.

## Rules

- **One file per entity** (e.g., `user.schema.md`, `order.schema.md`).
- **Every schema file must include**: entity name, fields with types and descriptions, relationships, validation rules, and examples.
- **Schema changes require a changelog entry** in the file itself.
- **If a feature needs a new shared type**, it is defined here first, then referenced in the feature spec.
- **If a feature needs a private type**, it can be defined in the feature's `spec.md` schema section.

## Schema Files

- `{entity-name}.schema.md` — shared data contract

## Format

```markdown
# {EntityName}

## Fields
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| {name} | {type} | {yes/no} | {description} | {example} |

## Relationships
- {EntityName} has one/many {OtherEntity}

## Validation Rules
- {rule}

## Examples
{Example JSON or data structure}

## Changelog
- v1.0.0 {YYYY-MM-DD}: Initial schema
```
