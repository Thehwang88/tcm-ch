#!/usr/bin/env node
// Deployment fingerprint: writes dist/version.json with the Git commit this build
// was made from. Production verification (.github/workflows/verify-production-deploy.yml)
// polls https://tcm.ch/version.json to prove a merge actually reached Cloudflare.
// Cloudflare Workers Builds provides WORKERS_CI_COMMIT_SHA; GitHub Actions GITHUB_SHA;
// locally the checked-out HEAD is used. Never fails the build.
import { writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const git = (...args) => { try { return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };
const env = process.env;
const commit = env.WORKERS_CI_COMMIT_SHA || env.GITHUB_SHA || git('rev-parse', 'HEAD') || 'unknown';
const branch = env.WORKERS_CI_BRANCH || env.GITHUB_REF_NAME || git('rev-parse', '--abbrev-ref', 'HEAD') || 'unknown';
const info = {
  commit,
  branch,
  builtAt: new Date().toISOString(),
  builder: env.WORKERS_CI ? 'cloudflare-workers-builds' : env.GITHUB_ACTIONS ? 'github-actions' : 'local',
  buildId: env.WORKERS_CI_BUILD_UUID || null,
};
if (!existsSync('dist')) { console.error('write-build-version: dist/ missing, run after astro build'); process.exit(0); }
writeFileSync('dist/version.json', JSON.stringify(info) + '\n');
console.log('dist/version.json', info.commit.slice(0, 12), info.branch, info.builder);
