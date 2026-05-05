import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const SPEC_PATH = path.resolve(
  process.cwd(),
  '../docs/production/spec/production-spec.json',
)

const ALLOWED_VERIFICATION_TYPES = new Set([
  'unit_test',
  'integration_test',
  'contract_test',
  'e2e_test',
  'resilience_test',
  'security_test',
  'ci_check',
  'ops_drill',
  'artifact_check',
  'manual_review',
])

async function loadSpec() {
  const raw = await readFile(SPEC_PATH, 'utf-8')
  return JSON.parse(raw)
}

test('production spec contains all eight required phases', async () => {
  const spec = await loadSpec()
  assert.equal(Array.isArray(spec.phases), true)
  assert.equal(spec.phases.length, 8)
  const phaseIds = spec.phases.map((phase) => phase.id)
  assert.deepEqual(phaseIds, [
    'phase-1',
    'phase-2',
    'phase-3',
    'phase-4',
    'phase-5',
    'phase-6',
    'phase-7',
    'phase-8',
  ])
})

test('every phase has at least one acceptance criterion with stable ids', async () => {
  const spec = await loadSpec()
  const criteriaIds = new Set()

  for (const phase of spec.phases) {
    assert.equal(typeof phase.name, 'string')
    assert.ok(phase.name.length > 0)
    assert.equal(Array.isArray(phase.acceptanceCriteria), true)
    assert.ok(phase.acceptanceCriteria.length > 0)

    for (const criterion of phase.acceptanceCriteria) {
      assert.equal(typeof criterion.id, 'string')
      assert.match(criterion.id, /^P\d-AC\d+$/)
      assert.equal(criteriaIds.has(criterion.id), false)
      criteriaIds.add(criterion.id)
      assert.equal(typeof criterion.title, 'string')
      assert.ok(criterion.title.length > 0)
    }
  }
})

test('all verification methods are recognized and each criterion is testable', async () => {
  const spec = await loadSpec()

  for (const phase of spec.phases) {
    for (const criterion of phase.acceptanceCriteria) {
      assert.equal(Array.isArray(criterion.verification), true)
      assert.ok(criterion.verification.length > 0)
      for (const method of criterion.verification) {
        assert.equal(ALLOWED_VERIFICATION_TYPES.has(method), true)
      }
    }
  }
})

test('release gates are present and non-empty', async () => {
  const spec = await loadSpec()
  assert.equal(Array.isArray(spec.releaseGates), true)
  assert.ok(spec.releaseGates.length >= 4)
  for (const gate of spec.releaseGates) {
    assert.equal(typeof gate, 'string')
    assert.ok(gate.length > 0)
  }
})
