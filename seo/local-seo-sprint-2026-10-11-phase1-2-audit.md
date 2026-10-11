# Local SEO Growth Sprint — Phase 1 + 2 Audit (11 Oct 2026)

Status: **audit and proposals only. No page, redirect, schema or copy has been changed.**
Basis: `main` at `4fe5029` (built locally), live checks on tcm.ch, repo data
(`src/data/locations.ts`, `src/data/standort-leaves/*`, `src/data/standort-cards.html`,
`seo/master-keyword-url-map.csv`). GSC figures are the verified baseline supplied in the brief.

Legend: **Confirmed** = measured in build/live/repo. **Owner check** = cannot be verified from here
(needs business data: legal entity, Google Business Profiles, real reviews, hours).

---

## 1. Executive summary

1. **Templated testimonials on 10 location pages (Confirmed, P0).** The same 12 review texts appear on
   Frauenfeld, Kreuzlingen, Rorschach, St. Gallen, Volketswil, Wil, Winterthur Münzgasse, Zürich Höngg
   and Zürich Oerlikon with only the place name swapped and the author names rotated (e.g. "Reto S.:
   *Lehrerin* mit Prüfungsängsten"). Winterthur Marktgasse carries 6 lightly edited variants. 141 cards
   in total. The not-yet-open Oerlikon clinic shows 15 of them. These cannot be genuine and must go.
2. **"★★★★★ 4.9 (Google Reviews)" badge on 20 pages (Confirmed, P0).** Same value everywhere, including
   Oerlikon (opens 1 Dec 2026) and Höngg (a Praxis Hwang practice). Only one Google profile is linked
   anywhere on the site (TCM.ch St. Gallen). Homepage stats "4.9 Ø Patientenbewertung · 94 %
   Weiterempfehlung · 500+ Patienten vermittelt · Ø 24h" are contradicted by the site's own
   `/ergebnisse/` page ("first reports follow once enough data is collected").
3. **Zürich pre-opening contradictions (Confirmed, P0).** Oerlikon (Ohmstrasse 14) opens 1 Dec 2026, but
   its page, meta description ("Mo–Sa geöffnet"), EN page (opening hours in schema), booking funnel and
   cross-page copy present it as operating. "Zürich City" does not exist yet but is described as a
   current practice on the cost and massage pages ("drei Praxen: City, Höngg, Oerlikon",
   "Wir sind in Höngg … und in der City").
4. **Business identity mixes TCM.ch and Praxis Hwang (Confirmed / Owner check).** The Zürich hub says
   Höngg and Oerlikon are currently run by *Praxis Hwang*; the Höngg page and its schema present the same
   address as "TCM.ch Zürich Höngg". Frauenfeld and Kreuzlingen are "Partnerklinik von Praxis Hwang" but
   schema says "TCM.ch Frauenfeld/Kreuzlingen". Reviews or ratings earned by Praxis Hwang must not be
   shown as TCM.ch reviews.
5. **Why the Zürich hub ranks at position 45 (Confirmed, SEO).** The hub owns "TCM/Akupunktur Zürich" but
   receives **7** internal content links; Oerlikon, City and Höngg receive **~170 each**, because the
   shared location-card block on 155 Beschwerden pages links to the spokes (including the pre-opening City
   page) and never to the hub. Spoke breadcrumbs also skip the hub (TCM.ch › Standorte › Zürich Oerlikon).
   One central file (`src/data/standort-cards.html`) controls this.

---

## 2. Phase 1 — Accuracy and trust audit

### 2.1 Testimonials and ratings

| Where | What | Count | Finding | Proposal |
|---|---|---|---|---|
| 9 location leaves (`src/data/standort-leaves/*.html`) | review cards | 15 each = 135 | Same 12 texts across pages, place name swapped, names rotated; gender/role mismatches | **Remove** all review cards and the "Erfahrungen in …" section |
| Winterthur Marktgasse leaf | review cards | 6 | Edited variants of the same 12 texts | **Remove** |
| `/standorte/` (`standorte-body.html`) | 3 cards | 3 | "14 Standorte … alle auf gleichem Niveau" (the site lists 15 location cards, several not open yet); generic platform praise | **Remove** |
| 20 pages (10 location pages, `/standorte/`, `/therapien/`, `/beschwerden/` hub, 7 Beschwerden pages) | "★★★★★ 4.9 (Google Reviews)" | 20 | No linked profile except St. Gallen; shown on unopened / Praxis Hwang locations | **Remove**; re-add only for a location with its *own* verified Google profile, linked, with the live value |
| Homepage (`home-body.html`) | 15 review cards + stats bar (4.9 ★, 94 %, 500+, Ø 24h) | 15 + 4 | Stats contradicted by `/ergebnisse/`; cards not attributable | **Remove** stats or replace with verifiable facts (EMR/ASCA, Tarif 590); remove cards unless sourced |
| `therapien-body.html` | 3 cards + badge | 3 | Not attributable | **Remove** |
| 103 Beschwerden pages | `cp-review-card` patient quotes | 309 (all unique) | Not attributable; several make outcome claims ("mehr geholfen als jede Hormontherapie") — health-advertising risk | **Owner check**; if no source/consent exists, remove (separate commit, P1) |
| Schema | `aggregateRating` / `Review` | 0 | None found in any JSON-LD | Keep it that way |

Rule for the future: a testimonial may only appear with a verifiable source (Google profile of the same
business, date, consent), on the page of the business that earned it. No transfer from Praxis Hwang to
TCM.ch pages.

### 2.2 Opening status, hours, availability

| Location | Repo / page state | Problem | Proposal |
|---|---|---|---|
| Zürich Oerlikon (Ohmstrasse 14) | Hero "Eröffnung 1. Dezember 2026"; but 15 reviews, "Zu unseren Patient:innen zählen Menschen aus …", "Unser Team begleitet dich hier vor Ort"; meta "Mo–Sa geöffnet"; `locations.ts` hours Mo–Fr 7:30–19:30 / Sa; EN page schema with hours; booking funnel offers Oerlikon (no `terminAb`) | Presented as operating | Pre-opening wording; meta without "geöffnet"; remove hours until opening; set `terminAb: '2026-12-01'`; point "until 30 Nov" CTA to Praxis Hwang Schulstrasse 3 (already mentioned on page) |
| Zürich City | Pre-opening page (348 words) | Other pages call it a current practice (Kosten Zürich, Massage Zürich, Höngg "Standorte in City, Oerlikon und Höngg", City page itself "bereits jetzt … Oerlikon") | Correct the copy on those pages; keep City as pre-opening page |
| Basel (Steinenvorstadt 73) | DE page "noch nicht eröffnet"; location card + `/akupunktur-in-der-naehe/` say "Termin prüfen"; schema `MedicalClinic` with address; EN "to be announced" | Mixed status | **Owner check**: open or not? If not, treat like Luzern consistently (card label, schema, `openingSoon`) |
| 8 locations | Identical hours Mo–Fr 7:30–19:30, Sa 7:30–16:30 | Looks templated | **Owner check** per location before keeping in schema/EN pages |
| Höngg | Meta "Termin oft in 24 Stunden"; body "Termine meist innert weniger Tage" | Inconsistent, unverified | Use one verified statement or drop |

### 2.3 Business identity and addresses

| Page | Schema name | Address | Copy says | Owner check |
|---|---|---|---|---|
| /standorte/zuerich-hoengg/ | TCM.ch Zürich Höngg | Limmattalstrasse 340, 8049 | Hub: "Bestehende Praxis unseres Netzwerks (Praxis Hwang)" | Which legal entity operates this address? |
| /akupunktur-tcm-zuerich/ | adds a second `MedicalClinic` "TCM.ch Zürich Höngg" | 8049 (no street) | same | Remove duplicate clinic node from hub; hub = organisation/area page |
| /standorte/zuerich-oerlikon/ | TCM Oerlikon – TCM.ch | Ohmstrasse 14 | Praxis Hwang at Schulstrasse 3 treats until opening | Confirm opening date and operator |
| /standorte/frauenfeld/, /kreuzlingen/ | TCM.ch Frauenfeld / Kreuzlingen | Rheinstrasse 25 / Romanshornerstrasse 1 | "Partnerklinik von Praxis Hwang" | Operator and correct business name |
| /standorte/st-gallen/ | TCM St. Gallen | Oberer Graben 22 | only page with a linked Google profile ("TCM.ch St Gallen") | Align name with the profile |
| Winterthur Marktgasse / Münzgasse | "TCM Winterthur – TCM.ch" / "TCM Praxis Winterthur Münzgasse – TCM.ch" | Marktgasse 78 / Münzgasse 2 | — | Operator, names |
| /standorte/bottighofen/ | TCM Pelican | Hauptstrasse 34, own phone | partner clinic | OK as partner; keep separate identity |

Naming is inconsistent across schema ("TCM St. Gallen", "TCM.ch Basel", "TCM Oerlikon – TCM.ch"). Proposal:
one pattern per operator, decided by the owner, and the same name as the Google profile where one exists.

### 2.4 Bellevue

- `/standorte/zuerich-bellevue/` was launched 20 Sep 2026 (pre-opening, Rössligasse 8) and retired in
  b81697c (06 Oct); it now 301s to `/standorte/zuerich-city/`. The no-slash form takes 2 hops (308 → 301).
- 0 rendered internal links, not in the sitemap. 8 Beschwerden leaf sources still contain the legacy
  Bellevue card, but it is replaced at build by `standort-cards.html` (harmless; source clean-up optional).
- Master map row for Bellevue has an empty owner status (should read RETIRED → redirect).
- Remaining Google visibility can't be measured from here: check the URL in GSC (inspection + Performance
  filtered by page). If impressions persist for "Bellevue/Zentrum" queries, the redirect target is right
  (City = central-Zürich intent). If City stays pre-opening for months, an alternative is to redirect to the
  hub. **No redirect change proposed now.**

---

## 3. Phase 2 — Zürich

### 3.1 Baseline (GSC 11 Sep–8 Oct 2026) and page metrics

| Page | Owner keyword | Clicks / Impr. / Pos. | Words | Inbound content links (from daily-crawled pages) | Status |
|---|---|---|---|---|---|
| /akupunktur-tcm-zuerich/ | tcm zürich, akupunktur zürich | 1 / 461 / 45.3 | 1696 | **7 (5)** | hub |
| /standorte/zuerich-oerlikon/ | tcm zürich oerlikon | 19 / 1265 / 14.4 | 1795 | 172 (157) | opens 1 Dec 2026 |
| /standorte/zuerich-city/ | tcm zürich city | 2 / 453 / 41.6 | 348 | 167 (155) | pre-opening |
| /standorte/zuerich-hoengg/ | tcm zürich höngg | 4 / 159 / 30.0 | 1585 | 173 (157) | operating (Praxis Hwang?) |
| /standorte/zuerich/kosten/ | akupunktur kosten zürich | — | 943 | 4 (3) | |
| /massage-zuerich/, /massage-oerlikon/ | massage zürich / oerlikon | — | 1203 / 1123 | 2 / 3 | |

Ownership in `seo/master-keyword-url-map.csv` already matches the brief (hub = citywide, spokes = quarter).
No change to ownership is proposed.

### 3.2 Root causes

1. **Link equity bypasses the hub.** Central card block → spokes only; spoke breadcrumbs skip the hub.
2. **The pre-opening City page is over-promoted** (167 links, card "Standort ansehen"), competing with
   the hub for "Zürich Zentrum/City" while having no clinic, address or content depth.
3. **Trust signals are not credible** (templated reviews, uniform 4.9 badge) — a quality risk for a
   YMYL health business regardless of rankings.
4. **Oerlikon ranks (pos. 14) on a page that describes a clinic that isn't open** — conversions from it
   currently need to go to Praxis Hwang Schulstrasse 3; the page doesn't make that path primary.

### 3.3 Proposed changes (for approval)

**A. Central / cross-page (highest leverage, small diffs)**

| # | Change | Files | Effect |
|---|---|---|---|
| A1 | Replace the City card in the shared location-card block with a **"Zürich – alle Praxen"** card linking to `/akupunktur-tcm-zuerich/` (City stays reachable from the hub) | `src/data/standort-cards.html` | Hub gains ~155 contextual links; City stops collecting links meant for "Zürich" |
| A2 | Spoke breadcrumbs: TCM.ch › Standorte › **Zürich** (hub) › Oerlikon / Höngg / City | location template / leaves | Hub in every spoke's breadcrumb + BreadcrumbList |
| A3 | Remove all templated review cards and the 4.9 badge (location leaves, `Reviews.astro`, `standorte-body.html`, `therapien-body.html`, homepage cards + stats bar) | ~15 files | Removes fabricated trust signals |
| A4 | `locations.ts`: Oerlikon `terminAb: '2026-12-01'`, no opening hours until opening; Basel status per owner answer | `src/data/locations.ts` | Funnel/EN/schema consistent with reality |

**B. Hub `/akupunktur-tcm-zuerich/`**
- Meta description to ≤155 characters, factual: e.g. "Akupunktur & TCM in Zürich: Praxen in Höngg und Oerlikon, neuer Standort beim Bahnhof Oerlikon ab 1. Dezember 2026. EMR/ASCA, Zusatzversicherung." (final wording after identity decision).
- Schema: remove the duplicate `MedicalClinic` "TCM.ch Zürich Höngg"; keep the hub as organisation/area page with `areaServed`, linking the location pages.
- Keep the approved CREW/Brand-Signature section unchanged.
- Add contextual links *to* the hub from Zürich-specific pages only (Kosten Zürich, Massage Zürich already link; add from Oerlikon/Höngg intro copy where "Zürich" is named — already present once each).

**C. Oerlikon `/standorte/zuerich-oerlikon/`**
- Remove reviews + badge; rewrite pre-opening sentences ("Zu unseren Patient:innen zählen …", "Unser Team begleitet dich hier vor Ort", "Alle Therapeut:innen sind EMR- und ASCA-anerkannt") into future tense or verified facts.
- Primary CTA until 30 Nov: "Heute schon in Oerlikon: Praxis Hwang, Schulstrasse 3" + "Für 1. Dezember vormerken".
- Meta: drop "Mo–Sa geöffnet"; add "Eröffnung 1. Dezember 2026".
- Fix wording "krankenkassenzertifiziert" (methods are not certified; therapists are EMR/ASCA-registered).
- Add a contextual link to Höngg (currently only mentioned).

**D. Höngg `/standorte/zuerich-hoengg/`**
- Identity per owner answer (Praxis Hwang vs. TCM.ch) in H1 area, schema name and copy; no TCM.ch reviews.
- Remove "mit Standorten in City, Oerlikon und Höngg" → accurate list.
- One verified availability statement (meta vs. body).
- Real photos of the practice if available (currently generic images with keyword alt text such as "Reizdarm mit TCM behandeln in Zürich Höngg").
- Add contextual link to Oerlikon.

**E. City `/standorte/zuerich-city/`**
- Keep pre-opening, limited to location-specific intent; correct "bereits jetzt … Oerlikon" (TCM.ch Oerlikon not open yet).
- No new content until an address is confirmed.

**F. Kosten Zürich / Massage Zürich**
- "Ein Tarif für alle drei Praxen (City, Höngg, Oerlikon)" and "an drei Adressen … in Höngg und in der City" → accurate current list.

**G. Validation per page** (to run during implementation): canonical self, BreadcrumbList incl. hub, no
`aggregateRating`, sitemap unchanged, mobile + desktop screenshots of hub/Oerlikon/Höngg/City
(375 px and 1280 px), CTA visible above the fold on mobile.

---

## 4. Owner questions (blocking for C, D and the identity part of A4)

1. Which legal entity operates **Limmattalstrasse 340 (Höngg)**, **Schulstrasse 3 (Oerlikon)**,
   **Rheinstrasse 25 (Frauenfeld)**, **Romanshornerstrasse 1 (Kreuzlingen)**, and the two Winterthur
   addresses — TCM.ch or Praxis Hwang? Which business name should schema use?
2. Which **Google Business Profiles** exist (per address), with current rating and count? Are any of
   the site's testimonials real, with source and consent?
3. **Opening hours** per operating location (8 locations currently show identical hours).
4. **Oerlikon**: is 1 Dec 2026 confirmed? Who will treat there?
5. **Basel**: open or in preparation?
6. **Real photos** available for Höngg and Oerlikon (or Praxis Hwang Schulstrasse)?

## 5. Recommended order

1. A3 (remove fabricated reviews/badge/stats) — no owner input needed, pure risk removal.
2. Oerlikon/City/Kosten/Massage factual corrections (C, E, F) + A4 Oerlikon gating.
3. A1 + A2 (hub linking) — then measure for 28 days.
4. Identity alignment (D, hub schema, partner pages) after owner answers.

## 6. 28-day measurement plan (after deploy)

- GSC, page filter, 28 days vs. this baseline: hub impressions/position for "akupunktur zürich",
  "tcm zürich"; Oerlikon/City/Höngg clicks and positions; St. Gallen, Winterthur Marktgasse, Frauenfeld,
  Kreuzlingen, Basel as controls (no Zürich changes should move them).
- Expectation is directional only: hub impressions and position should improve after A1/A2; spokes may
  lose some generic "Zürich" impressions to the hub (intended).
- Conversion: WhatsApp/form events per Zürich page (GA4 `dataLayer` events already in place).
