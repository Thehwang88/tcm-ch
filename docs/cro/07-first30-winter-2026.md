# TCM.ch FIRST 30 · Pre-Christmas Edition 2026 — St. Gallen (campaign operations)

Branch `feat/first30-winter-2026-sg` · scope `/standorte/st-gallen/` only · status: draft PR, not released. Internal campaign identifier stays `FIRST30_WINTER_2026_SG` (stable key for reporting); the public name is "FIRST 30 · Pre-Christmas Edition 2026 / Dein exklusives Vorweihnachtsgeschenk".

## Live-page reconciliation (12.10.2026, main d72c857c)
The production St. Gallen page does **not** advertise a free 30-minute appointment in visible copy: hero "Dein Ersttermin in St. Gallen", regular first-appointment funnel (PR #35). The only "Gratis/30min" remnant is the tracking-bearing form identifier `Hero-Gratis-30min-StGallen` and the hidden `Angebot="Ersttermin-Anfrage (Hero St. Gallen)"`. The experiment therefore replaces the regular hero with the gift hero (bundled change), and the baseline for comparison is the regular funnel measured per `docs/cro/04-st-gallen-measurement-plan.md`.

## What the page offers
30-minute personal TCM introductory experience on site, CHF 0, five services (conversation, short TCM assessment, a first short application *if clinically and time-wise possible*, three everyday recommendations, help with the supplementary-insurance check). New patients only, once per person, no obligation to continue, appointment confirmed personally by the practice, not a full initial treatment, no outcome promise (card disclaimer). Requestable immediately; nothing waits until Christmas.

## Post-launch V2 adjustment — Sticky add-on + desktop balance

The regular mobile `.scb-bar` (first appointment request, WhatsApp, phone, plus OneDoc on St. Gallen) is **never suppressed by the seasonal campaign**. The previously used `bar.classList.add('scb-off')` removed all normal contact choices and left no CTA after FIRST-30 dismissal. Fix: the small FIRST-30 promo chip is moved with `bar.insertBefore(mobileFloat, bar.firstChild)` into the **existing** `.scb-bar` on initialization. The sitewide sticky handles its own entrance/exiting from the hero viewport. The chip only appears when the campaign card and contact section are out of view and no form is focused.

- Mobile: one compact light-ivory/pine gift strip **above** the site's unmodified normal sticky controls; the offer WhatsApp link is the existing canonical deep link and retains `first30_whatsapp_click` / `floating_mobile` attribution. The separate green fixed overlay has been removed.
- Desktop: existing seasonal floating pill stays separate, but slimmer. Normal booking and the site's WhatsApp FAB are unchanged.
- Dismiss (X): hides **only** the promo strip/pill for the current session, with existing `first30_cta_dismiss` event; it does not change `.scb-bar` classes, primary CTA destinations, session-wide normal bar state, or OneDoc. With the promo hidden, the sticky keeps working.
- Active first-load hero: the sticky and its seasonal child use the existing hero/intersection rules; no duplicate CTA when the gift card is in view. If `IntersectionObserver` is unavailable, the seasonal add-on remains hidden, while the existing regular bar's fallback still works.
- Desktop hero: left introductory content and benefit list shift up 40 px **only** at widths ≥1024 px. Gift card padding and lower-section gaps are reduced modestly; privacy text sizes, content, eligibility and conditions remain untouched.

**QA regression:** alongside the usual FIRST-30 state/build gate, inspect the final 390 px sticky both before and after tapping X. Confirm normal “Ersttermin anfragen”, “Termin online buchen”, WhatsApp and “Anrufen” remain visible and clickable, no overlap, the gift strip is not layered above the bar, and no empty strip space remains after dismissal. Verify normal closed/soldout state, and that other clinics are unchanged. The build gate checks the integration/invariants statically; a browser interaction harness must verify actual runtime behavior.

## Hero design V2 (brand-aligned, PR feat/first30-sg-brand-aligned-v2)
Architecture = the regular St. Gallen hero (`.lsr-hero` mint surface, Figtree 800 headline, Nunito italic accent, black pill buttons from `public/home.css`), 50/50: left eyebrow "FIRST 30 · Vorweihnachts-Edition", H1 "Weihnachten kommt dieses Jahr früher. / 30 Minuten TCM in St. Gallen geschenkt.", one lead sentence, three benefits, one trust line; right the compact gift card in pine green `#14532D` / ivory with mint CTAs, one price anchor "30 Minuten · CHF 0.–", the availability indicator, then the CTAs. Gold/burgundy survive only in the small corner ribbon. Mobile (≤900px): intro → card → benefits; the WhatsApp button is the only primary CTA in the first viewport, the phone form stays an expandable fallback. Visible disclaimer is one line; the full conditions sit in an accessible `<details>` ("Alle Konditionen") inside the card. The floating CTA and the bottom selector's gift option use the same pine/mint theme.

## Conversion paths on the page
| Path | Element | Payload / event |
|---|---|---|
| WhatsApp (mobile primary, desktop secondary) | integrated gift button "🎁 Ja, ich will mein Geschenk!" in the pine-green card (mobile primary; on desktop a secondary outline button "Geschenk per WhatsApp anfragen →" below the phone field); floating mobile gift card | `wa.me/41775236122?text=…` with the prefilled message below; dataLayer `first30_whatsapp_click {cta_position: hero | floating_mobile}` — outbound intent only, no proof of a sent message or booking |
| Phone-only form (fallback, desktop primary) | one field "Deine Telefonnummer" in the same card (collapsed on mobile until "Lieber ohne WhatsApp? Telefonnummer hinterlassen"; button "🎁 Ja, ich möchte mein Geschenk!") | `/api/anfrage` with `angebot_id=FIRST30_WINTER_2026_SG`, `telefon`, no name; existing `formular_senden {form_type:'allgemein', quelle:'launch-hero-sg'}` once after `ok:true`, plus `first30_phone_form_submit` |
| Bottom form with selector | "Wie möchtest du starten?" regular (default) / 🎁 FIRST 30 Vorweihnachtsgeschenk, above the unchanged bottom form | hidden `angebot_id` + `Angebot` mirrored from the selection; existing `formular_senden {quelle:'sg-kontakt-bottom'}` from home.js, plus `first30_bottom_form_submit` when FIRST 30; `first30_bottom_select` on change |
| Regular OneDoc booking | unchanged widget `#online-buchen`; "Lieber regulär buchen? Online-Termin wählen" | unchanged; a OneDoc booking is never a FIRST 30 appointment |
| Desktop floating pill | "Dein FIRST 30 Geschenk · 30 Min · CHF 0.–" bottom right (left of the WhatsApp FAB) | scrolls to the phone form; `first30_cta_click {cta_position:'floating_desktop'}` |

Prefilled WhatsApp message (both WhatsApp CTAs, URL-encoded incl. emoji/umlauts): "Hallo TCM.ch! 🎁 Ich möchte gerne das FIRST 30 Vorweihnachtsgeschenk in St. Gallen anfragen (30 Minuten, CHF 0.–). Ist noch eines verfügbar? Vielen Dank!" — no health data requested. Recipient = `site.whatsapp` (41775236122), the number the St. Gallen page already uses; **the owner must confirm this reaches the St. Gallen appointment team**.

Page CTAs further down (`data-offer="first30"`, href `#kontakt`) scroll to the bottom form with FIRST 30 preselected; `?first30=1` or `#first30-kontakt` preselect it without submitting. Regular CTAs (`data-offer="regular"`) never select the gift. The regular sticky bar is replaced on this page (`scb-off`) by the floating gift card, which appears only after the gift card has scrolled out of view, hides while the card or the bottom form is visible or a form field is focused, and can be dismissed for the browser session (×, sessionStorage).

## Single source of truth: `src/data/first30.ts`
| Field | Meaning | Who changes it |
|---|---|---|
| `totalAllocation: 30` | Owner-selected cap of 30 complimentary packages (not per week). The clinic must confirm 30 genuinely available appointments before launch; gate pins 30. | owner / St. Gallen team |
| `confirmedClaims: null` | Confirmed FIRST 30 appointments verified against the clinic agenda. `null` → indicator "30 limitierte Willkommensgeschenke", no bar, no percentage or remaining count. Verified `27` → **27/30** and three remaining; verified `28` → **28/30** and two remaining. These figures must not be fabricated or automatically jump on scroll; scrolling may animate 0 to the currently verified value. `30` → real waitlist, while the campaign remains manually open. | clinic team (`verifiedAt`, `verifiedBy` required) |
| `campaignActive: true` | false once the edition has officially ended → the page renders the **regular St. Gallen hero** (`HeroStandardSG.astro`, identical to main), no gift CTAs, no bottom selector, regular sticky bar; OneDoc and the bottom form keep working | owner |
| **No automatic expiry** | The owner alone closes the campaign by setting `campaignActive:false`, rebuilding and deploying. Christmas and New Year do not automatically close the offer. Valid late inquiries continue to reach staff for human review (not booked until confirmed). | owner |
| `waitlistEnabled: true` | when all packages are confirmed (`confirmedClaims >= totalAllocation`): true = explicitly labelled waitlist state (hero, floating CTA, bottom selector), false = campaign hero removed, regular hero | owner |

Campaign states (`first30State().campaign`): `active` · `soldout-waitlist` · `soldout-closed` · `closed`. Only `active` and `soldout-waitlist` render the campaign; the other two restore the regular page. States are distinguishable in markup (`data-first30="max-only|verified|soldout"` on the campaign hero; the regular hero has no campaign attribute).
| `onceAYearApproved: false` | enables "The Once-a-Year Edition" ribbon / "jährlich" wording | owner |
| `dailyCutoff.approved: false` | enables the live countdown strip inside the WhatsApp button ("Heutige Anfragefrist · HH:MM", Europe/Zurich, `time`, `days`). Only when the team confirms same-day review of requests received before the cutoff. Off → no strip at all; capacity is stated only by the availability indicator ("30 limitierte Willkommensgeschenke"). After the cutoff / on non-cutoff days: "Anfragen weiterhin möglich · Bearbeitung am nächsten Arbeitstag", CTA stays. Processing deadline, never an offer expiry; nothing resets at midnight. | clinic team |

Update procedure (team): count confirmed FIRST 30 appointments in the agenda → edit `confirmedClaims`, `verifiedAt`, `verifiedBy` → commit on a branch → `npm run build && node scripts/check-first30.mjs` → merge. No other place holds the number; no counter runs in the browser; nothing is random or reset on refresh.

**Release gate for ongoing campaign operations:** `scripts/check-first30.mjs` is **state-aware**, and must pass for all approved production states rather than only the first launch build: (a) `active` + `confirmedClaims:null` (maximum only, no invented progress); (b) `active` + a real verified number such as 27/30 or 28/30 (requires `verifiedAt`/`verifiedBy`); (c) `soldout-waitlist` at 30/30 while `waitlistEnabled:true` (clearly labelled waitlist, no available gift promised); (d) `soldout-closed` with `waitlistEnabled:false` (ordinary St. Gallen hero); and (e) `closed` with `campaignActive:false` (ordinary hero until manually reopened). The gate also checks regular OneDoc/contact booking when closed, correct CTAs, scope and analytics-bearing identifiers. For every genuine update, change the clinic-verified configuration, rebuild, run the gate, then follow the normal review and deployment process. For **illustrative** states, use the ignored preview builds only; preview values must never reach a production commit and the production gate deliberately fails on preview data.

The gate verifies that a count is documented and internally consistent. It cannot independently validate that the underlying bookings really exist: the clinic agenda remains authoritative. Design preview only (never production): set `src/data/first30.preview.json` to `{"claims": 27, "cutoff": true, "campaignActive": null}` or `claims: 28`, run `npx astro build --outDir dist-preview`, then restore `{"claims": null, "cutoff": false, "campaignActive": null}`; preview builds carry `data-first30-preview="1"` and the gate fails if the file or the build is not in production state.

## Offer identifiers (form → `/api/anfrage` → e-mail)
| `angebot_id` | `angebot` (server-canonical) | E-mail |
|---|---|---|
| `FIRST30_WINTER_2026_SG` | FIRST 30 Pre-Christmas Edition 2026 – kostenloser 30-Minuten-Termin – St. Gallen | first rows Anfrageart **FIRST 30 PRE-CHRISTMAS EDITION** · Terminart Kostenloser 30-Minuten-Termin · Angebots-ID; header line; subject suffix " · FIRST 30" |
| `FIRST30_WINTER_2026_SG_WARTELISTE` | FIRST 30 Pre-Christmas Edition 2026 – Warteliste – St. Gallen | Anfrageart **FIRST 30 WARTELISTE** |
| `ERSTTERMIN_REGULAER_SG` | Regulärer Ersttermin – St. Gallen | Anfrageart **REGULÄRER ERSTTERMIN** · Terminart Reguläre kostenpflichtige Erstanfrage |

Server rules: the ID is resolved against the whitelist, client-supplied `angebot` text is replaced, unknown IDs → 422 `invalid_offer`. Phone-only acceptance (no name) applies **only** to `quelle=launch-hero-sg` with a FIRST 30 ID and a valid phone number (7–15 digits, optional +, separators; else 422 `invalid_phone`); every other form and location keeps its rules. Honeypot `website` and Turnstile unchanged. Scope: every offer ID is bound to St. Gallen — accepted only with `standort = "St. Gallen"` **and** `quelle ∈ {launch-hero-sg, sg-kontakt-bottom}`; any other combination (forged IDs from other locations/forms) → 422 `invalid_offer_scope`, no e-mail. Client-supplied text for price, eligibility or capacity is never used.

**Capacity is a manually maintained build-time value, not real-time inventory.** A WhatsApp click is not a claimed appointment, a phone-only submission is not a reservation, remaining places are never guaranteed (stated in the card disclaimer). `confirmedClaims` stays `null` until independently verified. The allocation of 30 does not imply that 27 or 28 reservations exist; those are illustration-only counts until confirmed by the clinic.

**Rate limiting — deployment requirement (not in code):** the Worker has no KV/Durable Object, so request throttling must be configured as a Cloudflare WAF rate-limiting rule before launch, e.g. `(http.request.uri.path eq "/api/anfrage" and http.request.method eq "POST")` → 10 requests per 10 minutes per IP → block for 10 minutes; plus the existing Turnstile and honeypot. Owner/Franca to confirm in the Cloudflare dashboard; the gate cannot verify this. Requests without an ID (all other forms) are unchanged.

## Tracking (see franca-tracking-recommendations.md T9)
Unchanged: form name, `quelle` values, `Quelle`/`Seite`, `formular_senden`/`form_type`, GTM/GA4/Ads. New dataLayer events (not mapped in GTM until Franca approves): `first30_whatsapp_click`, `first30_cta_click`, `first30_cta_dismiss`, `first30_bottom_select`, `first30_phone_form_submit`, `first30_bottom_form_submit` (each with `campaign`, `standort`, `source_path`, `cta_position`/`angebot_id`). Attribution after switching to WhatsApp is not automatic: UTM/GA client data do not travel into the chat; matching conversations to patients needs the team to ask "Wie hast du uns gefunden?" or a coded message (feasibility noted, not built).

## Measurement (bundled experiment, by path)
Primary: attended new patients per 100 landing sessions. Per path (WhatsApp, phone form, bottom form FIRST 30, bottom form regular, OneDoc): WhatsApp clicks (intent), conversations actually received, contactable leads, inquiries, confirmed appointments, cancellations, no-shows, attended, subsequent paid treatments, cost per attended patient. A click, request or reserved appointment is never counted as attended. Use `st-gallen-weekly-log-template.csv` columns once per path.

## SEO during the campaign
Title, meta description, canonical, hreflang and all JSON-LD nodes of `/standorte/st-gallen/` are unchanged (gate-asserted against the main build). The H1 becomes "Weihnachten kommt dieses Jahr früher. 30 Minuten TCM in St. Gallen geschenkt." so the page keeps "TCM" and "St. Gallen" in its H1 while the campaign runs; the regular H1 "Akupunktur & TCM in St. Gallen" returns automatically only after explicit `campaignActive:false` and redeploy. Internal links to and from the page are untouched.

## Manual lifecycle and delayed requests

The campaign has **no automatic expiry**. It stays visible until the owner explicitly closes it with `campaignActive:false` and deploys the new site build. Because the site is statically generated, changing source code without deploying cannot change the live page. At a verified 30/30, use the clearly labelled waitlist rather than offering an unbookable gift. The backend may still receive valid requests from stale browser tabs and should route them to staff for review instead of rejecting them merely because of the date or manual closure. These are inquiries, never guaranteed reservations.

If the promotion continues after Christmas, revisit the seasonal public-facing brand name manually; do not auto-end or silently roll over the year.

## Owner launch decision — 12 October 2026

**Supersedes the original 9 November baseline-release recommendation.** The owner explicitly requested an immediate FIRST 30 launch on 12 October 2026, accepting the interruption of the 12.10.–8.11. regular-funnel measurement window. This experiment starts on the actual production release date; retain the partial pre-launch observations, but do not present them as a completed 4-week baseline.

**Operational checks that remain necessary:** confirm that St. Gallen can honor up to 30 complimentary 30-minute appointments, verify that WhatsApp +41 77 523 61 22 reaches the St. Gallen appointment team, test phone-only submissions and the Resend mailbox, review Swiss health-service advertising/billing and consent handling, review Franca's GTM event mapping, and configure Cloudflare WAF rate limiting on POST /api/anfrage. None of these dashboard/team verifications is performed by a GitHub merge. Record the outcome and any incident in the clinic launch log. The page must never state an unverified 27/30 or 28/30 claimed count; `confirmedClaims:null` stays in production until agenda-backed verification.

**Release verification:** Full local production build (767 pages), existing gates and UI QA (134 PASS / 0 FAIL) were reported green on code head `8a16ab26`. The changes to application source after that SHA are comments only; new commits change the code-side release gate and documentation. Syntax of the new release-gate script was checked; the full build and runtime QA were not independently rerun on the last draft head. Owner elected to proceed with the current release candidate.

## Baseline protection
The owner explicitly elected immediate launch on 12.10.2026, overriding the original 9.11. review hold. Preserve partial pre-launch data separately; evaluate this campaign by actual confirmed and attended new-patient appointments, cancellations, no-shows, and follow-on paid care.

## Approvals still open before release
free appointment offer · exact 30-minute scope · 30 genuinely available slots (to be verified operationally) · WhatsApp number routing to the St. Gallen team · once-a-year claim · daily processing cutoff (countdown) · patient confirmation / no-show process · Swiss healthcare advertising and billing compliance (free medical service) · Franca GTM/mailbox review (T9) · rate limiting on `/api/anfrage`.
