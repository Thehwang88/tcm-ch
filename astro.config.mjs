import { defineConfig } from 'astro/config';

// Staged migration shell:
// - Astro owns /en/* (and future ported routes), built to dist/.
// - The DE SPA lives verbatim in public/ (public/index.html -> dist/index.html).
// - No src/pages/index.astro => Astro never emits dist/index.html, so the SPA root survives.
// - Sitemap stays manual (public/sitemap.xml) — no @astrojs/sitemap integration.
export default defineConfig({
  site: 'https://tcm.ch',
  output: 'static',
  build: { format: 'directory' },
});
