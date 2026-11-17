#!/usr/bin/env node
// This runs automatically via npm's prebuild hook on local and Cloudflare builds,
// before Astro compiles >100 captured Beschwerden leaves. Keep it dependency-free.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const exactBlob = 'fbcfb7ae3e934b245b3a2a622cbfd5fee765b5a2';
const actual = execFileSync('git', ['hash-object', 'src/data/standort-cards-legacy.html'], { encoding: 'utf8' }).trim();
if (actual !== exactBlob) {
  console.error('BUILD BLOCKED: src/data/standort-cards-legacy.html is an IMMUTABLE search template. Restore the protected file; edit generated clinic data, not the legacy match pattern.');
  process.exit(1);
}
const s = readFileSync('src/pages/standorte/index.astro','utf8');
const checks = [
  s.includes('length!==mainIds.length'),
  s.includes('length!==additionalIds.length'),
  s.includes("'+additionalIds.length+' Standorte anzeigen"),
];
if (!checks.every(Boolean)) {
  console.error('BUILD BLOCKED: /standorte/ clinic card counts must be dynamic and derive from mainIds/additionalIds. Do not hardcode 7 or 6.');
  process.exit(1);
}
console.log('Prebuild source invariants: PASS');
