# Production Readiness Program

This directory implements a spec-driven, paced rollout for taking BX-Video from demo state to production readiness.

## Scope

- Product and platform specifications
- Self-contained cloud deployment design
- BYOK key-management requirements
- Provider abstraction requirements
- Security/compliance hardening requirements
- Fully testable quality system
- CI/CD release governance
- Observability and operational readiness

## Source of truth

- Human-readable plan: `docs/production/roadmap.md`
- Machine-readable spec: `docs/production/spec/production-spec.json`
- Validation tests: `web/tests/production-spec.test.mjs`

## How to validate

From `/home/runner/work/BX-Video/BX-Video/web`:

```bash
npm run spec:validate
```
