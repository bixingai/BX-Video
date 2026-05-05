# Production Readiness Roadmap

## Phase 1 — Product + Platform Specification Baseline
- Freeze v1 scope (UX, render modes, provider matrix, BYOK behavior).
- Define non-functional requirements (security, latency, uptime, cost controls, retention).
- Define acceptance criteria for all user-visible and operator-visible capabilities.

## Phase 2 — Cloud Architecture Redesign
- Remove local/WSL coupling and define deployable services.
- Define environment contract (configuration, service discovery, secret handling).
- Define reproducible staging/prod topology and deployment expectations.

## Phase 3 — BYOK as First-Class Capability
- Define secure key onboarding, encryption, rotation, revocation, and scoped usage.
- Route provider calls using user-owned keys only when BYOK is selected.
- Record provider usage/audit trails for per-user cost transparency.

## Phase 4 — Provider Abstraction for Voice/Video
- Standardize provider capability contracts and metadata.
- Implement adapter-driven provider routing with fallback policies.
- Publish compatibility matrix (quality, latency, cost, limits).

## Phase 5 — Security + Compliance Hardening
- Define authN/authZ boundaries and abuse controls.
- Move secrets to managed secret stores; remove unsafe defaults.
- Track threat model findings and mandatory remediation gates.

## Phase 6 — Fully Testable Quality System
- Unit tests for core logic and adapters.
- Contract tests per provider.
- End-to-end tests for seed-to-render workflows.
- Resilience/load/security checks with explicit pass/fail thresholds.

## Phase 7 — CI/CD and Release Governance
- Enforce PR gates (lint, typecheck, tests, security, build artifact integrity).
- Define promotion and rollback policy.
- Enforce go/no-go release checklist tied to acceptance criteria.

## Phase 8 — Observability + Operations Readiness
- Define logs, traces, metrics, alerting, and render-job telemetry.
- Define SLOs and runbooks for common incidents.
- Define post-launch review and tuning loop for quality/cost/reliability.
