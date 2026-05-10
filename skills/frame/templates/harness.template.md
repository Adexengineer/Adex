# {project-name} — Harness

## Commands
- Test runner: `{exact command}`
- Watch mode: `{exact command}`
- Build: `{exact command}`
- Lint: `{exact command}`
- Type check: `{exact command}`
- Coverage: `{exact command}`
- Single test file: `{exact command}`
- Single test by name: `{exact command}`

## CLI Verification Tools
{Raw terminal commands the agent must run to inspect the live environment and database state. Examples: `psql`, `curl`, `docker exec`, `cat`, `ls`. These verify that code actually works in reality, not just in unit tests.}
- Database state: `{exact command, e.g., psql -c "SELECT ..."}`
- API health check: `{exact command, e.g., curl http://localhost:3000/health}`
- File system check: `{exact command, e.g., cat storage.json}`
- Container check: `{exact command, e.g., docker ps}`

## Post-Tool-Use Hooks
{Which hooks fire on file write, on test failure, on build error.}

## Environment Setup
{Any required env vars for tests to run.}
