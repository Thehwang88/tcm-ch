// Regression: homepage has a standalone layout, so changes to SpaPage alone are insufficient.
// Run: node scripts/check-patient-success-coverage.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

for (const page of [
  'src/pages/index.astro', // standalone homepage, previously missed
  'src/layouts/SpaPage.astro',
  'src/layouts/LayoutDe.astro',
  'src/layouts/Layout.astro',
]) {
  const source = readFileSync(page, 'utf8');
  assert.ok(source.includes('/patient-success.js'), page + ' must load the success handler');
  assert.ok(source.includes('/patient-success.css'), page + ' must load the success styling');
}
for (const handler of [
  'public/home.js',
  'public/kontakt-form.js',
  'public/concern-sheet.js',
]) {
  const source = readFileSync(handler, 'utf8');
  assert.ok(source.includes('tcmPatientSuccess.show'), handler + ' must show success after server confirmation');
}
for (const asset of [
  'public/patient-success.js',
  'public/patient-success.css',
  'public/images/logo/tcm-ch-email-logo.png',
]) {
  assert.ok(readFileSync(asset).length > 100, asset + ' missing or empty');
}
const modal = readFileSync('public/patient-success.js', 'utf8');
assert.ok(modal.includes('Carlos oder Emily'), 'shared caller acknowledgement missing');
console.log('PASS: success modal loaded in all four site entry layouts; handlers and assets present.');
