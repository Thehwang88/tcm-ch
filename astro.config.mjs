import { defineConfig } from 'astro/config';

// Astro now owns the whole site (DE + EN). Canonical URL form is trailing-slash
// (matches Cloudflare Pages, which 308-redirects no-slash -> slash). Sitemap is
// generated from the built routes (scripts/gen-sitemap.mjs) to match exactly.
export default defineConfig({
  site: 'https://tcm.ch',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
