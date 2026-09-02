# TCM.ch — Project Context for Claude

## Repo
- Astro 5 multi-page app (`.astro` pages under src/pages/, components in src/components/)
- Build: `npm run build` → static `dist/` + Worker bundle. Deployed as Cloudflare Worker project **tcm-ch-2** (old single-file `index.html` SPA and the tcm-ch Pages project are dead)
- Push to main = live in ~60 sec
- Routing: Astro file-based + `_redirects`
- Home hero markup lives in src/data/home-body.html (imported `?raw` into index.astro), styled by public/home.css

## Working Style — MANDATORY
- Surgeon, not archaeologist. Smallest valid change.
- Never rewrite full sections unless explicitly asked.
- Targeted str_replace edits only, no full-file rereads.
- Give ONE best option, not multiple alternatives.
- No teaching, no explaining, no restating the request.
- Return only the changed block / exact fix / final code.

## Communication
- Terse, mixed German/English fine
- Direct, sharp, practical
- No filler, no motivational language

## Brand & Design
- Primary green: #2D9B6F (--blue) — CTAs only
- Dark green: #1F7A54 (--blue-dark)
- Light green: #E8F5EE (--blue-light)
- Fonts: Figtree (primary, 800 for headings), Nunito italic (accents)
- Aesthetic: Swiss-minimal premium
- Max content width: --max: 1280px

## Voice & Copy
- German Du-form throughout
- NEVER use Qi, Yin-Yang, Meridiane, spiritual/energetic language
- TCM positioning: medical, EMR/ASCA-anerkannt, Krankenkasse 80-100%
- Tone: factual, premium, modern healthcare — not wellness
- Avoid healing promises

## Conversion Channels
- Primary: WhatsApp wa.me/41798374681 (currently placeholder +41000000000)
- Secondary: inline form (submitInlineFormGeneric() — stub)
- Tertiary: tel: links

## Routing
- History API SPA: buildRoute / parseRoute / renderRoute / pageMap
- Page IDs: home, symptom, symptomStandort, therapie, therapieStandort, standort, beschwerden, therapien, standorte, krankenkasse, partnerpraxen
- Programmatic routes:
  - /therapien/[tid]/[lid] → renderTherapieStandort
  - /beschwerden/[sid]/[lid] → renderSymptomStandort

## Data Structures
- THERAPIES[] — 11 therapies
- SYMPTOMS[] — 410+ entries
- LOCATIONS[] — 11 standorte
- REVIEWS{} — keyed by location/therapy ID

## File Layout
- Astro pages in src/pages/; shared UI in src/components/; page data in src/data/
- Standorte are becoming **data-driven** via src/data/standorte.ts — migrate slugs to the canonical data-driven flow rather than hand-authoring per-location `.astro` (see recent `refactor(standorte)` commits)
- buildTherapyLd() helper exists — reuse, don't duplicate

## Pre-Launch Blockers
- Replace +41000000000 placeholders
- Wire submitInlineFormGeneric() to real endpoint (Cloudflare Worker)
- Upload favicons + og-image to repo root
- Add GTM/GA4 + DSG consent banner
- ~~Generate sitemap.xml + robots.txt~~ ✅ done (live at /sitemap.xml, 119 URLs; robots references it)
- ~~Submit sitemap to Google Search Console~~ ✅ done 2026-06-15 (GSC: Success)

## SEO — New Pages
- Every new indexable page gets appended to `seo/index-queue.md` under "Offen" **in the same commit that ships it**. No exceptions, no "later".
- A daily scheduled task (09:00) works that queue in Search Console, up to 10 URLs/day, then tops up from the GSC "not indexed" reports.
- Do NOT queue: `noindex` pages, and pages that canonicalise elsewhere (currently /haut/rosacea/ → /beschwerden/rosacea/).
- Internal links matter more than the queue: a new page needs links from pages Google crawls daily (Standorte, Beschwerden-Leaves) or it stays "Gefunden – nicht indexiert". See `src/data/haut-links.ts` for the pattern.

## What NOT to Do
- No blog
- Don't pursue generic TCM ranking terms
- Don't refactor to React/Vue without explicit ask
- Don't add features outside immediate request scope
- Don't future-proof, don't over-abstract

## Decision Defaults
- Cheapest correct edit > exhaustive edit
- Inline patches > new files
- str_replace > regex > Python > full rewrites
- One commit per logical change