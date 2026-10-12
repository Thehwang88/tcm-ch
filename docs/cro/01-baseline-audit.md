# TCM.ch Conversion Engine V2 — Phase A: Baseline Audit (read-only)

Stand 12.10.2026 · Branch `feat/tcm-conversion-engine-v2` · Baseline `origin/main` **2b06a955** (the brief named d25d0a2c; main has moved 57 commits since, including EN V2 Waves 1–3, PR #33 parity and PR #34 locations grid).
Scope: German homepage, all German location pages, English homepage/locations, homepage-to-clinic funnel. Nothing in this phase touched production code.

Companion documents: `02-design-proposal.md` (Phase B, rollout, approval list), `franca-tracking-recommendations.md` (findings only, not an instruction).

---

## 1. Homepage `/` — CRO diagnosis

Rendered at 1440×900 and 390×844 from a clean build of 2b06a955 (screenshots in the session scratchpad `cro/`).

| Fact | Measurement / source |
|---|---|
| Page height | 12,457 px desktop · ~15,800 px mobile |
| Hero | Approved Softriver `.sr-hero` (HERO REFINEMENT 02), full viewport, team photo, H1 "Moderne TCM für eine neue Generation.", CTAs "Termin finden" (scrolls to form) + "Beschwerden entdecken", trust "EMR/ASCA anerkannt · Qualifizierte Therapeut:innen · Standorte schweizweit" |
| Inquiry form `#home-contact-form` | at **9,907 px** (79 % down the page); fields name*, email*, telefon*, standort (select), anliegen, Turnstile |
| Clinic finder `#s-standorte` | directly below hero: Zürich box (2 cards + "nächster freier Termin") + 12 "Weitere Standorte" cards; cards navigate to `/standorte/<slug>/`; **selection is not carried into the form** (only `?standort=` URL param, `home.js:181`) |
| Card order (before) | Winterthur Münzgasse (**status review**) in the first slot, Luzern/Bern (planned) mixed into the grid |
| Competing conversion surfaces | finder (14 cards), Selbsttest banner, "Yuna" WhatsApp concierge section (textarea + 6 pills), treatments, Kräuter/Massage, Gesundheitsbibliothek, FAQ (CTA → `/kontakt/`, leaves the page), insurance strip + insurance section, "Starte ohne Risiko" offer, form, Yuna CTA band → **7 CTA surfaces before/around one form** |
| Claims | insurance strip headline "In der Regel zahlst du nichts selbst." contradicts the hedged insurance section below it; offer block carries "Ehrlichkeits-Garantie" and a scarcity sentence ("Ersttermin-Slots pro Woche und Standort sind begrenzt"); services copy "Krankenkassenzertifiziert" |
| Trust | no practitioners, no photos of clinics, no verified credentials beyond the trust line; no reviews (deliberately removed, see `transparenz.ts`) |
| Mobile | sticky bar (Termin abklären → form, WhatsApp, Anrufen) appears after the hero; hero 1,061 px; 14 full-width cards = long scroll before any treatment or insurance info |
| Tracking on `/` | GTM `GTM-PZ92Q3KJ` via `HeadAnalytics`; `formular_senden` after HTTP-ok (`home.js:48`); `wa_click` delegated; `homepage_zurich_*` inline onclicks (`home-body.html` L29–31) |

**Diagnosis.** The hero is strong and brand-compliant. Below it the page asks the visitor to do five different things before it offers the form, and the form itself sits 10,000 px down. The finder is the right first step for the "ready to book" journey but does not distinguish bookable clinics from under-review/planned ones at a glance, and it cannot hand the chosen clinic to the inquiry. The "still researching" journey (treatments → insurance → request) is scattered across sections 4–11 with inconsistent insurance claims.

GA4 (14.9.–11.10.), expressed as **events per 100 landing sessions**, not as a session conversion rate (one session can fire several events; GA4's own session key-event rate was not available in this session): homepage 706 sessions, 44 key events = 6.2 per 100 sessions, 6 form-submit events = 0.85 per 100. St. Gallen 178 sessions, 34 key events = 19.1 per 100, 7 form-submit events = 3.9 per 100. The homepage therefore produces contact events at about a third of St. Gallen's density and form events at about a quarter, while receiving four times the sessions. Part of this is intent mix (brand/general vs local), part is the page structure above. H3 is supported as "unrealised potential", not proven.

## 2. Location pages — diagnosis per location

Source of truth: `src/data/locations.ts` (status), `src/data/standorte.ts` (content, `cro`/`v2` flags), `src/data/therapeuten.ts` (team), `src/pages/standorte/[slug].astro` (template). Full inventory in the session report; key facts:

| Slug | Status | Operator | Template | Team shown | Hours | Form | Journey matches status? | Issues |
|---|---|---|---|---|---|---|---|---|
| st-gallen | operational | TCM.ch | **legacy leaf + HeroLaunchSG** | Corinna Reinhart, Astrid Lenggenhager | yes (incl. Sunday) | 3 paths: hero offer form, `#kontakt` form, OneDoc | yes | 3 competing booking paths with different primary CTA per placement; dead scarcity script (`GRATIS_REST`); hidden field `Seite=/standort/st-gallen` (wrong path); meta description "beim Bahnhof" vs Altstadt address; no FAQ/FAQPage; not in `standorte.ts` (no status logic, no v2 flow) |
| basel | operational (pinned, hours unconfirmed) | TCM.ch | data-driven cro+v2 | Janine Trebes ("vorgesehen"/"Designierte Standortleiterin") | none | KontaktForm, standort preselected | yes | "Symbolbild" hero; team intro says "vorgesehen" on an operational page (verify wording with owner) |
| frauenfeld | operational | Praxis Hwang | data-driven cro+v2 | 4 practitioners | yes | yes | yes | — |
| winterthur-marktgasse | operational | TCM.ch | data-driven cro+v2 | none (Team hidden) | yes | yes | yes | no practitioner trust |
| kreuzlingen | operational | Praxis Hwang | data-driven cro | Ken Uehara | yes | yes | yes | Hwang phone appears only in sidebar/schema; non-v2 order (form after SEO blocks) |
| zuerich-hoengg | operational | Praxis Hwang | data-driven cro | none | yes | yes | yes | no team; non-v2 |
| volketswil | operational | TCM.ch | data-driven cro | none | yes | yes | yes | no team; non-v2 |
| rorschach | operational | TCM.ch | data-driven cro | none | yes | yes | yes | no team; non-v2 |
| wil | operational | TCM.ch | data-driven cro | none | yes | yes | yes | no team; non-v2 |
| bottighofen | operational | independent (TCM Pelican) | **legacy leaf** | Emanuela Pelican (injected) | clinic only | leaf form | yes | legacy leaf, own hero/H1 "TCM Pelican" |
| zuerich-oerlikon | **planned** (1.12.2026, not final) | TCM.ch (+ Hwang Schulstrasse 3 interim) | data-driven cro+v2+extraBlock | none | none | "Register interest" + Hwang option | yes (banner, two-practice chooser) | — |
| winterthur-muenzgasse | **review** | TCM.ch | data-driven cro | **5 practitioners rendered** | none | yes | partly | Team has no status check → practitioners shown on an under-review page |
| luzern | planned 2027 | — | hand-authored page | none | none | waitlist form | yes | separate page system |
| bern | planned | — | hand-authored page | none | none | interest form | yes | separate page system |
| zuerich-city | no clinic entry | — | hand-authored | — | — | — | n/a | hub-like page, outside location data |

Cross-cutting findings:
- **Three template generations coexist**: data-driven (10), legacy leaf (2), hand-authored (3). Only 4 of 10 data-driven pages use the `v2` order (form before SEO prose).
- **Operational partner pages** (Praxis Hwang) are presented correctly ("Partnerpraxis im TCM.ch Netzwerk" eyebrow, Hwang schema entity).
- **Practitioner trust exists for 5 of 11 operational pages**; the others fall back to the generic "Erfahrene TCM-Therapeut:innen" line.
- **No ratings anywhere** (by decision); St. Gallen links to Google reviews.
- **Status-driven forms** work (`expandStandort`, `PLANNED_PRESELECT`), but `home.js:30` sends the option *label* not the value to `/api/anfrage` (see tracking doc, finding T5) — a lead-routing detail for the team, not a UX issue.
- **Mobile CTA bar** exists on all data-driven pages (WhatsApp, Termin anfragen, call).

## 3. Hwang vs TCM.ch benchmark — with limitations

| Metric layer | Hwang | TCM.ch | Comparable? |
|---|---|---|---|
| Google Ads CVR, brand Search | 11.7 % (158 clicks) | no brand campaign in the data | no: brand intent is not a landing-page effect |
| Google Ads CVR, non-brand Search | 4.3–7.0 % (Akupunktur allg., TCM allg., Winterthur) | 0.8–3.4 % (Therapien, Allgemein, St. Gallen) | partly: "TCM.ch Therapien" (0.8 %) lands on informational therapy pages, Hwang's land on practice pages |
| PMax | 0.7 % (2,698 clicks) | 3.2 % (617 clicks) | no: TCM.ch PMax is geo-scoped (SG + Winterthur), Hwang PMax is broad |
| GA4 form-submit events per 100 landing sessions (event density, not session CVR) | not available in this session | Home 0.85, SG 3.9, Standortübersicht 2.8; Oerlikon 2/25, Marktgasse 1/35, Kreuzlingen 1/14, Basel 0/13 | sample sizes below ~100 sessions are not interpretable; GA4 session conversion rate must be read in GA4 itself |
| Confirmed appointments / new patients | not available | not available | the only metric that matters is missing on both sides |

What the data supports: (a) local, practice-level landing pages convert to contact events far better than the national homepage (H1); (b) Hwang's non-brand Search converts roughly 2× TCM.ch's comparable Search (H2), but campaign targeting, ad copy, landing pages and practice age differ simultaneously, so no single cause can be attributed; (c) "TCM.ch Therapien Search" at 0.8 % confirms H7 (informational pages lack a local booking transition).
What is unavailable here: GA4 device mix, paid/organic split, engagement, seasonality, Hwang page-level GA4 (no analytics connector in this session; verify access separately). No page-level conversion rates were derived from Ads data.

## 4. Hypotheses — evidence, uncertainty, safe test

| H | Evidence now | Uncertain | Safe test |
|---|---|---|---|
| H1 local intent converts better | SG 19 contact events per 100 sessions vs home 6 | intent mix, paid share per page | compare per landing page × source/medium in GA4 (read-only) after the pilot |
| H2 established trust (Hwang) | Hwang non-brand Search 2× | targeting/ad/landing differences | qualitative: practitioner + photo blocks on TCM.ch pages that lack them; before/after on SG |
| H3 homepage potential | 706 sessions, 6 forms, form at 79 % depth | how many sessions continue to location pages (path data unavailable) | reorder pilot; monitor home form submits + location-page entries from `/` |
| H4 simpler clinic selection | finder cannot preselect; review clinic in slot 1 | whether users prefer city vs clinic | status-first card order now; preselect carry-over as approval item (needs `openContactForm(null,id)` wiring, already supported by `home.js:9-17`) |
| H5 visible trust | 6/11 operational pages lack practitioners | content availability | add verified practitioner data where it exists (therapeuten.ts); never invent |
| H6 mobile friction | mobile home 15,800 px; 14 cards before treatments | WhatsApp vs form share by device (unavailable) | mobile section order pilot; read `wa_click` vs `formular_senden` by device in GA4 |
| H7 info → local booking | Therapien Search 0.8 % | which therapy pages Ads lands on | add a "nearest clinic" module to therapy/condition pages in a later phase (SEO ownership preserved) |
| H8 status-specific journeys | implemented via status system; Münzgasse team leak | — | fix Team status check (approval: content rule) |

## 5. Components and switches to reuse (no parallel system)

- Hero: DE `.sr-hero` (home), `.lsr-hero` via `src/components/standort/Hero.astro` (all data-driven locations), EN `HeroSplit`.
- Location sections: `UspGrid`, `Team`, `Beschwerden`, `Therapien`, `Ablauf`, `Transparenz`, `KrankenkassenTeam`, `IntroNap` (sticky sidebar CTAs), `FAQ` (inline), `UeberPraxis`, `WeitereStandorte`, `FinalCta`, `KontaktForm` (+ `expandStandort`, `PLANNED_PRESELECT`), mobile CTA bar in `[slug].astro:378`.
- Flags: `cro` (section order), `v2` (form before SEO prose, trust checklist, slim UeberPraxis), `extraBlockVorFormular`, `LSR_SLUGS`, status (`operational|planned|review`) from `locations.ts`.
- Shell: `DeHeader` (`#navCtaBtn` → on-page form), `Footer` → `WhatsAppFab`, `WhatsAppConcierge` (`#wac`), `StickyCtaBar`.
- Buttons: `.sr-btn`, `.lsr-btn-primary/-ghost`, `.tcm-btn` (ui.css), legacy `.btn-primary` pill-remapped on `/` and locations.
- EN: `ClinicFinder`, `AppointmentForm`, `Practitioners`, `StatusBanner`, `CtaBand`, `EnAnalytics` (do not modify).
- Gates: `check-clinic-status.mjs`, `check-standort-ux.mjs`, `check-i18n.mjs`, `test-en-analytics.mjs`, `check-professional.mjs`.

## 6. Softriver brand compliance

| Surface | Compliant | Deviations |
|---|---|---|
| Home hero | yes (tokens, Figtree 800, pill CTAs, Mint surface + Rich Black) | — |
| Home sections below hero | partly | legacy `--blue` on `.wa-concierge-submit`, legacy `.btn-primary` remapped by Wave 6, inline-styled insurance strip, mixed `tcm-btn--mint` (Zürich box) vs Rich Black CTAs elsewhere |
| Data-driven location pages | yes | `FinalCta .sg-merged-cta` photo block fine; non-v2 pages show mint band + long SEO prose before form |
| St. Gallen | hero yes (`.lsr-hero`) | offer card and repeats use legacy `.btn-primary` / `--blue-dark` links; three CTA styles on one page |
| EN | yes (Wave 1–3 + parity) | — |

## 7. Form UX audit (user-facing only)

| Form | Visible fields | Required | Placement | Preselect | Notes |
|---|---|---|---|---|---|
| Home `#home-contact-form` | 5 + Turnstile | name, email, telefon | 79 % depth | via `?standort=` only | 3 required contact fields; "Los geht's" label; WhatsApp/tel alternatives below |
| Location `KontaktForm` | 5 + Turnstile | name, telefon, email | v2: after insurance; non-v2: after SEO prose | yes (status-aware) | trust checklist on v2 |
| SG hero offer form | 4 | name, telefon | above the fold | n/a | no Turnstile widget in the card (token fallback) — verify with the API owner |
| SG `#kontakt` | 5 + Turnstile | name, telefon | bottom | — | duplicate of the hero path |
| EN `AppointmentForm` | 5 + Turnstile | name, email, telefon, anliegen | after FAQ | yes | — |

## 8. Tracking-risk inventory (summary)

One GTM container `GTM-PZ92Q3KJ` (`HeadAnalytics.astro`), no `gtag` config in code, no Ads IDs in code (Ads lives in GTM), GA4 `G-NHZ8Y6V840` only inside the OneDoc embed. Event sources: `formular_senden` (`home.js:48`, after HTTP-ok), `form_submit` (`TerminForm.astro:208`, **before** fetch), `wa_click` (`home.js:274`, SpaPage/index only), `whatsapp_click`, `hilfeerhalten_click`, `zh_*`, `homepage_zurich_*`, EN `cta_click`/`form_submit*`. Protected files and selectors are listed in `franca-tracking-recommendations.md` §A and were not modified in this project. CRO changes must keep ids/classes used for `quelle` mapping (`#home-contact-form`, `.contact-section-inline`, `.wa-section`, `.home-cta-merged`, `#wac`, `.scb-bar`, `#siteDrawer`, `#kontakt`, `#online-buchen`, `#zh-funnel`).

## 9. Prioritised opportunities

| P | Change | Evidence | Hypothesis | SEO risk | Tracking risk | Validation |
|---|---|---|---|---|---|---|
| P0 | Homepage: form moved from position 11 to 7 (after treatments + insurance), concierge/selbsttest/library below | form at 79 % depth; 0.85 form events per 100 sessions | H3/H6 | none (content retained, ids kept) | none (ids/classes unchanged) | home form submits, time-to-form, sticky-bar clicks |
| P0 | Finder: operational clinics first, review/planned last | review clinic in slot 1 | H4/H8 | none | none (Zürich tracked block untouched) | location-page entries from `/` by slug |
| P1 | Insurance strip claim replaced by policy/recognition-dependent wording ("Viele Zusatzversicherungen beteiligen sich an den Kosten – je nach Police und Anerkennung deiner Therapeut:in.") | "In der Regel zahlst du nichts selbst." contradicted the hedged section | H5 | none | none | qualitative |
| P1 | St. Gallen: one primary journey (hero offer form) for all repeat CTAs | 3 paths, inconsistent primary | H4 | none | none (hrefs only; forms + OneDoc untouched) | SG form submits by `quelle` |
| P1 | Practitioner blocks on operational pages lacking them (where verified data exists) | 6/11 pages without team | H5 | none | none | before/after contact events |
| P1 | Non-v2 operational pages → v2 order (form before SEO prose) | 6 pages still non-v2 | H6 | none (prose kept) | none (`v2` flag only) | contact events per page |
| P2 | Remove scarcity sentence + "Ehrlichkeits-Garantie" wording | brand rule | — | none | none | approval (copy, also sliced into 2 other pages) |
| P2 | Finder → form preselect carry-over on `/` | selection lost today | H4 | none | **touches `openContactForm` wiring** → approval | — |
| P2 | Therapy/condition pages: nearest-clinic module | Therapien Search 0.8 % | H7 | ownership rules | none | later phase |
| P2 | St. Gallen migration to the data-driven v2 template | 3 template generations | maintainability | metadata/H1 must be preserved | OneDoc injection + offer form must move 1:1 → approval | separate PR |

## 10. Items requiring separate approval (not implemented)

1. Any change to tracking code, event timing or payloads (see Franca document).
2. Finder → form preselect carry-over (requires wiring `nav()`/`openContactForm(null,id)` on `/`).
3. Removal/rewording of "Ersttermin-Slots … begrenzt" and "Ehrlichkeits-Garantie" (offer block is reused on `/therapien/shiatsu/` and `/akupunktur-in-der-naehe/`).
4. St. Gallen meta description correction ("beim Bahnhof" → Altstadt) and hidden `Seite` field path (`HeroLaunchSG.astro:57`, inside the form payload → tracking-adjacent).
5. Team visibility on `review` locations (Winterthur Münzgasse).
6. Basel "vorgesehen"/"designierte Standortleiterin" wording on an operational page (owner verification).
7. St. Gallen free-first-appointment offer ("30 Min. gratis", "Dein erster Termin ist gratis", "Erster Termin für Neupatient:innen kostenlos", `angebot`/`formular` payload fields) — validity to be confirmed by the owner; the dead `GRATIS_REST=14` counter script (dated 20.07.2026) renders no element but still ships in the page source. Existing claims left untouched.
8. St. Gallen migration to the data-driven template.
9. Hours for Basel; opening date for Oerlikon (data owner).
