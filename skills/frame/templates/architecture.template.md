# {project-name} — Architecture

## System Overview
{What the system is and how it works at the highest level. 3–5 paragraphs.}

## Tech Stack

### Language
{Chosen language and why.}

### Framework
{Chosen framework and why.}

### Runtime
{Runtime version and why.}

### Database
{Chosen database and why.}

### Hosting / Infrastructure
{Where it runs and why.}

### Other Key Dependencies
{Any other significant libraries or tools with reasoning.}

## Services

### {service-name}
{Responsibility, boundaries, and what it owns.}

## Data Models

### {entity-name}
- `{field}`: {type} — {description}

## API Design

### {endpoint or interface name}
- Method: {GET / POST / etc.}
- Path: {/api/v1/...}
- Request: {schema}
- Response: {schema}
- Errors: {possible error responses}

## Data Flow
{How a core user action moves through the system end to end. Use a numbered list or diagram description.}

## Architecture Patterns
{Monolith vs modular monolith vs microservices. Reasoning for the choice. Trade-offs considered.}

## External Integrations
{Third-party services, APIs, SDKs used. What they do. Why they were chosen.}

## Security Model
{Auth strategy, data protection, access control. How credentials are handled. How sensitive data is protected.}

## Scalability Strategy
{How the system grows under load. Horizontal scaling, caching, database scaling, etc.}

## Trade-offs
{What was considered and rejected, and why. Every significant alternative should be listed with reasoning.}

## No-Touch Zones
{Parts of the system agents must not modify or refactor. Even if empty, this section must exist.}

## Migration Rules
{If this architecture is updated after initial seeding, agents must generate a strict database migration plan before modifying any production schema. Agents cannot arbitrarily alter production schemas.}

## Architecture Decisions Log

### {YYYY-MM-DD} — {decision title}
- **Context**: {what was the situation}
- **Decision**: {what was decided}
- **Consequences**: {what this means for the project}
