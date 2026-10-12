# TCM.ch Conversion Engine V2 — Phase B: Design Proposal, Rollout, Protection Plan

Stand 12.10.2026 · Branch `feat/tcm-conversion-engine-v2` · Baseline 2b06a955. Reuses the approved Softriver system (tokens.css, `.sr-hero`/`.lsr-hero`, pill CTAs, Figtree/Nunito, Mint as surface only). No new design system, no new tracking.

## 1. German homepage — proposed structure

Two journeys, one form.

| # | Section (id) | Desktop | Mobile | Change vs current |
|---|---|---|---|---|
| 1 | Hero `#heroPatient` | unchanged approved hero | unchanged | none |
| 2 | Clinic finder `#s-standorte` | Zürich box unchanged; "Weitere Standorte" cards ordered **operational first** (Winterthur Marktgasse, Volketswil, Frauenfeld, Kreuzlingen, Bottighofen, St. Gallen, Rorschach, Wil, Basel), then Münzgasse (in Prüfung), Luzern (2027), Bern (in Vorbereitung) | same order, single column | **order only** (markup, hrefs, onclicks untouched) |
| 3 | Treatments `#s-behandlungen` | unchanged | unchanged | moved up from 5 to 3 |
| 4 | Insurance strip + `#krankenkasse` | strip headline hedged: "Zusatzversicherung: meist 80–100 % der Kosten übernommen." | same | moved up from 9/10 to 4; one claim corrected |
| 5 | Offer `#s-offer` | unchanged (scarcity sentence flagged for approval) | same | moved up |
| 6 | **Form `#home-contact-form`** | unchanged markup, fields, Turnstile, handler | same; sticky bar still scrolls here | moved up from 11 to 6 (≈ 45 % depth instead of 79 %) |
| 7 | FAQ `#haeufige-fragen` | unchanged | same | below the form |
| 8 | Gesundheitsbibliothek | unchanged | same | below the form |
| 9 | Kräuter/Massage `.kt-wrap` | unchanged | same | below |
| 10 | Selbsttest banner | unchanged | same | below |
| 11 | Yuna concierge `.wa-section` | unchanged | same | below the form (secondary channel) |
| 12 | Yuna CTA band, marquee | unchanged | same | end of page |

What stays exactly as is: hero, all copy except one headline, all ids/classes used by `home.js` for `quelle` mapping, all onclick tracking strings, the form, Turnstile, `openContactForm()`, sticky bar, concierge widget, mint-nav experiment.
Why this and not a new hero/finder: the hero is approved and parity-verified; the form and finder already exist and are tracked; the measured problem is order and claim consistency, not components.

Deferred design options (approval): finder card → form preselect (uses existing `openContactForm(null,id)`), compact practitioner strip on the home (requires verified cross-location data), removing the scarcity line.

## 2. St. Gallen — proposed structure

Phase D-1 (tracking-safe, implemented on the branch): one primary journey. Every repeat CTA ("Gratis Termin anfragen" ×2, mobile "Gratis anfragen") now targets the above-the-fold offer form `#offer-form` instead of the bottom `#kontakt` form. Both forms and the OneDoc widget remain in the DOM, their handlers, `quelle` values and events untouched. Desktop and mobile hero unchanged.

Phase D-2 (approval required): migrate St. Gallen to the data-driven `v2` template with the offer card as `extraBlockVorFormular`, the OneDoc widget injected unchanged after the form, FAQ data added (FAQPage), practitioners from `therapeuten.ts`, meta description corrected, dead scarcity script removed. Benefit: one template, status logic, consistent pill CTAs; risk: OneDoc/G-NHZ8Y6V840 bridge and offer form must move 1:1 (tracking-adjacent), H1/title/canonical must be byte-equal.

## 3. English

`/en/` already follows the DE hero (parity PR #33) and lists clinics with status; `/en/locations/` fixed in PR #34. Proposed: mirror the DE homepage order (finder → treatments → insurance → form) in a later EN wave; the EN form component already preselects and is status-aware. No EN changes in this branch.

## 4. Rollout plan

| Phase | Scope | Gate |
|---|---|---|
| C (this branch) | Homepage reorder + finder order + hedged claim | build, gates, DE diff limited to `/` (+ pages that slice `#s-offer`: unchanged bytes), screenshots 390/768/1280/1440, form smoke test with mocked API, tracking diff = 0 |
| D-1 (this branch) | St. Gallen CTA unification | same; `/standorte/st-gallen/` only |
| D-2 | St. Gallen template migration | separate PR, owner approval |
| E | v2 order on the 6 non-v2 operational pages; practitioner blocks where data exists; Team status check on review pages | one location per push, byte-diff of all other routes, clinic-status gate |
| EN | same order on `/en/` | after DE pilot evaluation |
| F | evaluation 4 weeks after each release from existing GA4 (read-only): form submits, `wa_click`, phone events, location-page entries from `/`, by device | no analytics changes |

## 5. Franca tracking-preservation plan (release gate)

1. `git diff origin/main -- <protected files>` must be empty: `HeadAnalytics.astro`, `EnAnalytics.astro`, `home.js`, `TerminForm.astro`, `AppointmentForm.astro`, `StickyCta*.astro`, `care*.ts`, `akupunktur-tcm-zuerich-body.html`, OneDoc blocks, `functions/api/*`, `_headers`.
2. Grep diff of `dataLayer`, `gtag`, `GTM-`, `G-`, `onclick=` strings across `src/` and `public/` before/after → identical sets.
3. Built HTML of `/` and `/standorte/st-gallen/`: identical count and content of `onclick` attributes, `GTM-PZ92Q3KJ` once, form `name` attributes and `data-contact-form`/`data-sg-hero-form` unchanged.
4. `scripts/test-en-analytics.mjs` 47/47; `check-clinic-status`, `check-standort-ux`, `check-i18n --strict`.
5. Manual DE form smoke test in the local build with `/api/*` mocked and Turnstile stubbed: `formular_senden` still pushed after HTTP-ok with the same payload keys.
