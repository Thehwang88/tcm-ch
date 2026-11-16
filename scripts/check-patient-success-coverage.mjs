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
// The action must remain outside the independently scrollable content area.
const js = readFileSync('public/patient-success.js', 'utf8');
const css = readFileSync('public/patient-success.css', 'utf8');
assert.ok(js.indexOf("'<div class=\"tps-content\">'") >= 0, 'receipt content scroll region missing');
assert.ok(js.indexOf("'<div class=\"tps-footer\">'") >= 0, 'persistent receipt footer missing');
assert.ok(js.indexOf("'<div class=\"tps-footer\">'") > js.indexOf("'<div class=\"tps-content\">'"), 'action must follow scrollable content');
assert.ok(css.includes('.tcm-patient-success .tps-content {') && css.includes('overflow-y:auto'), 'receipt text must scroll independently');
assert.ok(css.includes('.tcm-patient-success .tps-footer {') && css.includes('flex:0 0 auto'), 'receipt action must not shrink or scroll away');
assert.ok(css.includes('100dvh') && css.includes('@media(max-width:540px)'), 'compact and viewport-aware mobile rules missing');
console.log('PASS: all site layouts covered; compact scrollable receipt and pinned action present.');
