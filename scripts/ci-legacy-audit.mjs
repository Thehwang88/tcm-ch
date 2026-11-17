#!/usr/bin/env node
// Non-blocking regression inventory: the previous production baseline has
// failing legacy suites. Never hide their failure output or call them green.
// Leave this reporter informational until test expectations are corrected.
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = 'ci-legacy-results';
mkdirSync(outDir, { recursive: true });
const tests = [
  ['clinic-status', 'scripts/check-clinic-status.mjs', 5 * 60_000],
  ['kontakt-static-and-api', 'scripts/check-kontakt-formular.mjs', 5 * 60_000],
  ['kontakt-browser', 'scripts/test-kontakt-formular.mjs', 8 * 60_000],
  ['form-prefill-browser', 'scripts/test-formular-vorauswahl.mjs', 8 * 60_000],
  ['hero-video-browser', 'scripts/test-hero-video.mjs', 9 * 60_000],
];
const baseline = {
  'clinic-status': 3, 'kontakt-static-and-api': 22,
  'kontakt-browser': 3, 'form-prefill-browser': 2, 'hero-video-browser': 14,
}; // From PR #342 report vs PR #340. Reference only; NOT a waiver.
const results = [];
for (const [name, script, timeout] of tests) {
  console.log('\n── ' + name + ' ──');
  const result = spawnSync(process.execPath, [script], {
    encoding: 'utf8', timeout, maxBuffer: 20 * 1024 * 1024,
    env: { ...process.env, CI: 'true' },
  });
  const output = (result.stdout || '') + '\n' + (result.stderr || '') +
    (result.error ? '\n' + result.error.message : '');
  writeFileSync(join(outDir, name + '.log'), output);
  const failureLines = output.split('\n').filter((line) =>
    /^\s*(?:✗|FAIL(?:\s|$)|Error:|[0-9]+\s+FAIL)/.test(line)
  );
  const failed = result.status !== 0 || !!result.error;
  results.push({ name, status: result.status, failed, failureLines, baseline: baseline[name] });
  console.log(failed ? 'FAIL (recorded, not waived): ' + name : 'PASS: ' + name);
  if (failureLines.length) console.log(failureLines.slice(0, 8).join('\n'));
}
const summary = [
  '## Legacy suite inventory (informational)',
  '',
  'The production build and deterministic contracts are the blocking CI gate.',
  'Historical failures are **not fixed or waived** by this report. Review logs and correct',
  'assertions or functionality before enabling these suites as mandatory checks.',
  '',
  '| Suite | Result | Failure lines | Prior baseline (PR #340) |',
  '| --- | --- | ---: | ---: |',
  ...results.map((r) =>
    '| ' + r.name + ' | ' + (r.failed ? 'FAIL' : 'PASS') +
    ' | ' + r.failureLines.length + ' | ' + r.baseline + ' |'),
  '',
  'Browser tests can be timing-sensitive; compare actual failed assertions and rerun',
  'flaky failures. Never treat a count match as proof of no regression.',
  '',
];
writeFileSync(join(outDir, 'summary.md'), summary.join('\n'));
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary.join('\n'));
console.log(summary.join('\n'));
process.exit(results.some((r) => r.failed) ? 1 : 0);
