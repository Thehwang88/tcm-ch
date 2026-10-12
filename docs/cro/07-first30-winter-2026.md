# TCM.ch FIRST 30 · Pre-Christmas Edition 2026 — St. Gallen (campaign operations)

Branch `feat/first30-winter-2026-sg` · scope `/standorte/st-gallen/` only · status: draft PR, not released. Internal campaign identifier stays `FIRST30_WINTER_2026_SG` (stable key for reporting); the public name is "FIRST 30 · Pre-Christmas Edition 2026 / Dein exklusives Vorweihnachtsgeschenk".

## Live-page reconciliation (12.10.2026, main d72c857c)
The production St. Gallen page does **not** advertise a free 30-minute appointment in visible copy: hero "Dein Ersttermin in St. Gallen", regular first-appointment funnel (PR #35). The only "Gratis/30min" remnant is the tracking-bearing form identifier `Hero-Gratis-30min-StGallen` and the hidden `Angebot="Ersttermin-Anfrage (Hero St. Gallen)"`. The experiment therefore replaces the regular hero with the gift hero (bundled change), and the baseline for comparison is the regular funnel measured per `docs/cro/04-st-gallen-measurement-plan.md`.

## What the page offers
30-minute personal TCM introductory experience on site, CHF 0, five services (conversation, short TCM assessment, a first short application *if clinically and time-wise possible*, three everyday recommendations, help with the supplementary-insurance check). New patients only, once per person, no obligation to continue, appointment confirmed personally by the practice, not a full initial treatment, no outcome promise (card disclaimer). Requestable immediately; nothing waits until Christmas.

## Conversion paths on the page
| Path | Element | Payload / event |
|---|---|---|
| WhatsApp (mobile primary, desktop secondary) | integrated gift button "Ja, ich will mein Geschenk!" in the burgundy card; floating mobile gift card | `wa.me/41775236122?text=…` with the prefilled message below; dataLayer `first30_whatsapp_click {cta_position: hero | floating_mobile}` — outbound intent only, no proof of a sent message or booking |
| Phone-only form (fallback, desktop primary) | one field "Deine Telefonnummer" in the same card (collapsed on mobile until "Lieber ohne WhatsApp? Kurzes Kontaktformular nutzen") | `/api/anfrage` with `angebot_id=FIRST30_WINTER_2026_SG`, `telefon`, no name; existing `formular_senden {form_type:'allgemein', quelle:'launch-hero-sg'}` once after `ok:true`, plus `first30_phone_form_submit` |
| Bottom form with selector | "Wie möchtest du starten?" regular (default) / 🎁 FIRST 30 Vorweihnachtsgeschenk, above the unchanged bottom form | hidden `angebot_id` + `Angebot` mirrored from the selection; existing `formular_senden {quelle:'sg-kontakt-bottom'}` from home.js, plus `first30_bottom_form_submit` when FIRST 30; `first30_bottom_select` on change |
| Regular OneDoc booking | unchanged widget `#online-buchen`; "Lieber regulär buchen? Online-Termin wählen" | unchanged; a OneDoc booking is never a FIRST 30 appointment |
| Desktop floating pill | "Dein FIRST 30 Geschenk · 30 Min · CHF 0.–" bottom right (left of the WhatsApp FAB) | scrolls to the phone form; `first30_cta_click {cta_position:'floating_desktop'}` |

Prefilled WhatsApp message (both WhatsApp CTAs, URL-encoded incl. emoji/umlauts): "Hallo TCM.ch! 🎁 Ich möchte gerne das FIRST 30 Vorweihnachtsgeschenk in St. Gallen anfragen (30 Minuten, CHF 0.–). Ist noch eines verfügbar? Vielen Dank!" — no health data requested. Recipient = `site.whatsapp` (41775236122), the number the St. Gallen page already uses; **the owner must confirm this reaches the St. Gallen appointment team**.

Page CTAs further down (`data-offer="first30"`, href `#kontakt`) scroll to the bottom form with FIRST 30 preselected; `?first30=1` or `#first30-kontakt` preselect it without submitting. Regular CTAs (`data-offer="regular"`) never select the gift. The regular sticky bar is replaced on this page (`scb-off`) by the floating gift card, which appears only after the gift card has scrolled out of view, hides while the card or the bottom form is visible or a form field is focused, and can be dismissed for the browser session (×, sessionStorage).

## Single source of truth: `src/data/first30.ts`
| Field | Meaning | Who changes it |
|---|---|---|
| `totalAllocation: 10` | approved total packages of the edition (not per week). 30 was proposed and is **not** approved; the gate pins 10. | owner |
| `confirmedClaims: null` | verified confirmed FIRST 30 appointments from the practice agenda. `null` → indicator "Limitierte FIRST 30 Vorweihnachtsgeschenke · Maximal 10 Geschenke in dieser Edition", no bar, no percentage, no remaining count. A number → "x / 10 Geschenke vergeben", bar x/10, "Nur noch y Geschenke verfügbar" (one-time entrance animation from 0 to the real value, never incremented by the browser). `10` or `campaignActive:false` → waitlist state everywhere (hero CTA, floating CTA, bottom selector), regular stays. | clinic team, with `verifiedAt` + `verifiedBy` (gate refuses a number without both) |
| `campaignActive: true` | false once the edition has officially ended | owner |
| `onceAYearApproved: false` | enables "The Once-a-Year Edition" ribbon / "jährlich" wording | owner |
| `dailyCutoff.approved: false` | enables the live countdown strip inside the WhatsApp button ("Heutige Anfragefrist · HH:MM", Europe/Zurich, `time`, `days`). Only when the team confirms same-day review of requests received before the cutoff. Off → strip shows "Nur 10 exklusive Geschenke". After the cutoff / on non-cutoff days: "Anfragen weiterhin möglich · Bearbeitung am nächsten Arbeitstag", CTA stays. Processing deadline, never an offer expiry; nothing resets at midnight. | clinic team |

Update procedure (team): count confirmed FIRST 30 appointments in the agenda → edit `confirmedClaims`, `verifiedAt`, `verifiedBy` → commit on a branch → `npm run build && node scripts/check-first30.mjs` → merge. No other place holds the number; no counter runs in the browser; nothing is random or reset on refresh. Design preview only (never production): set `src/data/first30.preview.json` to `{"claims": 8, "cutoff": true}`, run `npx astro build --outDir dist-preview`, then restore `{"claims": null, "cutoff": false}`; preview builds carry `data-first30-preview="1"` and the gate fails if the file or the build is not in production state.

## Offer identifiers (form → `/api/anfrage` → e-mail)
| `angebot_id` | `angebot` (server-canonical) | E-mail |
|---|---|---|
| `FIRST30_WINTER_2026_SG` | FIRST 30 Pre-Christmas Edition 2026 – kostenloser 30-Minuten-Termin – St. Gallen | first rows Anfrageart **FIRST 30 PRE-CHRISTMAS EDITION** · Terminart Kostenloser 30-Minuten-Termin · Angebots-ID; header line; subject suffix " · FIRST 30" |
| `FIRST30_WINTER_2026_SG_WARTELISTE` | FIRST 30 Pre-Christmas Edition 2026 – Warteliste – St. Gallen | Anfrageart **FIRST 30 WARTELISTE** |
| `ERSTTERMIN_REGULAER_SG` | Regulärer Ersttermin – St. Gallen | Anfrageart **REGULÄRER ERSTTERMIN** · Terminart Reguläre kostenpflichtige Erstanfrage |

Server rules: the ID is resolved against the whitelist, client-supplied `angebot` text is replaced, unknown IDs → 422 `invalid_offer`. Phone-only acceptance (no name) applies **only** to `quelle=launch-hero-sg` with a FIRST 30 ID and a valid phone number (7–15 digits, optional +, separators; else 422 `invalid_phone`); every other form and location keeps its rules. Honeypot `website` and Turnstile unchanged. Rate limiting: not available in this Worker (no KV/Durable Object); Turnstile + honeypot remain the anti-spam layer — noted as an open item. Requests without an ID (all other forms) are unchanged.

## Tracking (see franca-tracking-recommendations.md T9)
Unchanged: form name, `quelle` values, `Quelle`/`Seite`, `formular_senden`/`form_type`, GTM/GA4/Ads. New dataLayer events (not mapped in GTM until Franca approves): `first30_whatsapp_click`, `first30_cta_click`, `first30_cta_dismiss`, `first30_bottom_select`, `first30_phone_form_submit`, `first30_bottom_form_submit` (each with `campaign`, `standort`, `source_path`, `cta_position`/`angebot_id`). Attribution after switching to WhatsApp is not automatic: UTM/GA client data do not travel into the chat; matching conversations to patients needs the team to ask "Wie hast du uns gefunden?" or a coded message (feasibility noted, not built).

## Measurement (bundled experiment, by path)
Primary: attended new patients per 100 landing sessions. Per path (WhatsApp, phone form, bottom form FIRST 30, bottom form regular, OneDoc): WhatsApp clicks (intent), conversations actually received, contactable leads, inquiries, confirmed appointments, cancellations, no-shows, attended, subsequent paid treatments, cost per attended patient. A click, request or reserved appointment is never counted as attended. Use `st-gallen-weekly-log-template.csv` columns once per path.

## Approvals still open before release
free appointment offer · exact 30-minute scope · ten genuinely available slots (30 proposed, not approved) · WhatsApp number routing to the St. Gallen team · once-a-year claim · daily processing cutoff (countdown) · patient confirmation / no-show process · Swiss healthcare advertising and billing compliance (free medical service) · Franca GTM/mailbox review (T9) · rate limiting on `/api/anfrage`.
