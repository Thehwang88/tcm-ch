# Tracking recommendations for Franca — findings only

Stand 12.10.2026 · Repo state 2b06a955 · **This document is not a deployment instruction.** Nothing here has been implemented. Any change requires owner approval and coordination with Franca (GTM, GA4, Google Ads).

## A. Current implementation (read-only inventory)

- One GTM container `GTM-PZ92Q3KJ`, loaded by `src/components/HeadAnalytics.astro:10` on every layout; CookieYes loaded at `:8`. No `<noscript>` GTM iframe. No `gtag('config')`, no Consent Mode defaults and no Google Ads `AW-` IDs in the repository: Ads conversions, consent mode and GA4 config live inside GTM.
- GA4 `G-NHZ8Y6V840` appears only in the OneDoc widget embed (St. Gallen), which pushes the widget's own events to `dataLayer` and `gtag`.
- Event sources in code:

| Event | Where | Timing |
|---|---|---|
| `formular_senden` | `public/home.js:48` (home + all inline/leaf forms), `MassageWartelisteForm`, `HeroLaunchSG`, Luzern waitlist | after `/api/anfrage` returns HTTP ok |
| `form_submit` | `src/components/TerminForm.astro:208` (kontakt, data-driven locations, wissen, fragen, …) | **before** the fetch |
| `form_submit` | B2B forms | after `res.ok && data.ok` |
| `wa_click` | `home.js:274` delegated on `a[href*="wa.me"]` | pages that load `home.js` only (index, SpaPage, longevity) |
| `whatsapp_click`, `hilfeerhalten_click`, `phone_click`, `zh_*`, `homepage_zurich_*` | inline onclick strings | on click |
| EN `cta_click`, `form_submit` (stage inquiry_attempt), `form_submit_success`, `form_submit_error` | `EnAnalytics.astro`, `AppointmentForm.astro` | attempt before fetch, success after `data.ok` |

## B. Findings

> **15.10.2026 (Draft-PR gemeinsames Kontaktformular):** T1 und T2 sind code-seitig für alle umgestellten Formulare behoben (Conversion nur nach `data.ok`, nur über `dataLayer.push` ohne zusätzlichen `gtag`-Aufruf, Honeypot ohne Versand/Event). Neue Event-Parameter `terminart`, `standort` (Standort-ID); neues Event `onedoc_click`; `first30_*` abgeschaltet. Nachweis nur im Code und mit Mocks; die Verarbeitung im GTM-/Ads-Setup ist noch nicht geprüft. Details und GTM-Prüfpunkte: `docs/cro/08-kontaktformular-checkin.md`.

### T1 — `form_submit` fires before backend confirmation (TerminForm)
- Current: `TerminForm.astro:208` pushes `form_submit` after client validation, then fetches `/api/anfrage` at `:233`. Failed Turnstile (403), validation (422) and server errors (500) are still counted.
- Why it matters: if GTM maps `form_submit` to a GA4 key event or an Ads conversion, Ads optimises toward attempts, not received inquiries; error spikes look like conversion spikes.
- Proposed correction: push a distinct success event after `res.ok && data.ok` (as the EN form already does with `form_submit_success`) and keep `form_submit` as the attempt signal; or move the existing push after success if Franca prefers one event.
- Implications: historical comparability breaks at the switch date (attempts ≥ successes); Ads bidding may need a learning period; recommend a parallel-run window with both events before switching the conversion action.
- Coordination: Franca defines the GTM trigger/tag mapping; dev changes the push site in one commit; verify in GTM preview on `/kontakt/` and one location page.

### T2 — `formular_senden` counts any HTTP-ok response, including the honeypot reply
- Current: `home.js:43-48` throws only on `!r.ok`; `functions/api/anfrage.js:18` answers `{ok:true}` for honeypot-filled bot posts.
- Why: bot submissions can inflate the main DE conversion.
- Proposed: check `data.ok` and a server flag, or make the honeypot path return a non-ok status while keeping the 200 for bots if desired (server decision); GTM could also require `form_type` ≠ empty.
- Implications: small downward correction of DE conversions; no Ads impact unless bots are material.

### T3 — WhatsApp clicks on `LayoutDe` pages have no code-side event
- Current: `wa_click` exists only where `home.js` loads; `#wac` and FAB on `LayoutDe` pages (wissen, beschwerden, team …) rely on GTM click triggers, if any.
- Proposed: confirm in GTM whether a generic `wa.me` link-click trigger exists; if not, decide whether `wa_click` should be global (one delegated listener in a shared layout).
- Implications: WhatsApp attribution per page would become comparable across the site.

### T4 — Two event names for the same action (`whatsapp_click` vs `wa_click`), two for forms (`form_submit` vs `formular_senden`)
- Proposed: keep names (historical continuity) but document the mapping in GTM; a future unified naming should be a planned migration with dual-tagging.

### T5 — Location value vs label in the inquiry payload
- Current: `home.js:30` sends the `<option>` **text** as `standort`; the clinic-status gate and `locations.ts:42` assume the value. Not a tracking issue but affects lead routing and any GA4 `standort` parameter.
- Proposed: align on the value (or send both) with the API owner; no GTM change.

### T6 — No Consent Mode in code
- Current: consent handled by CookieYes + GTM. Verify in GTM that Consent Mode v2 defaults exist; otherwise GA4/Ads modelling is incomplete. No code change proposed without Franca.

### T7 — Hidden field `Seite=/standort/st-gallen` (HeroLaunchSG.astro:57)
- Singular path, so GA4/CRM filters on `seite` miss the real `/standorte/st-gallen/` route. Payload field only; fix together with T5.

### T8 — St. Gallen hero form: payload values after the end of the free-offer promotion (implemented in PR #35, values only)
- Current (PR #35): the hidden field key `Angebot` is unchanged; its value is now `Ersttermin-Anfrage (Hero St. Gallen)` instead of `GRATIS 30 Min Erstbehandlung (Hero St. Gallen)`, because the free 30-minute offer was discontinued. The `formular_senden` push (`form_type: 'allgemein'`, `quelle: 'launch-hero-sg'`) and its timing are untouched.
- Still unchanged and flagged for review: the form name `Hero-Gratis-30min-StGallen` (sent as `formular`), `Quelle="Hero St. Gallen Neueroeffnung"` (sent as `quelle_detail`) and `Seite="/standort/st-gallen"` (singular path, sent as `seite`). They are tracking-bearing identifiers and were not renamed; if GTM/CRM filters match on them, a coordinated rename is proposed (e.g. `Hero-Ersttermin-StGallen`, `Hero St. Gallen`, `/standorte/st-gallen/`).
- Why it matters: lead emails and any GA4/CRM segmentation keyed on the `angebot` value must now read the new string; historical rows keep the old value.
- **Release gate (owner decision 12.10.2026):** before PR #35 is released, Franca checks GTM (variables, triggers, lookup tables) and the CRM/e-mail routing for any dependency on the old `angebot` string `GRATIS 30 Min Erstbehandlung (Hero St. Gallen)`; if one exists, it is updated in the same change window. Event names, form identifiers and `quelle` values stay unchanged.


### T9 — FIRST 30 Pre-Christmas Edition 2026 (St. Gallen, draft branch, not released)
- Unchanged: form name `Hero-Gratis-30min-StGallen`, hidden `quelle=launch-hero-sg`, `Quelle="Hero St. Gallen Neueroeffnung"`, `Seite="/standort/st-gallen"`, the single `formular_senden {form_type:'allgemein', quelle:'launch-hero-sg'}` push after HTTP ok, the bottom form `quelle=sg-kontakt-bottom` with its `formular_senden` (home.js), GTM/GA4/Ads, OneDoc widget, Turnstile.
- Hero form is now phone-only for FIRST 30 (no `name`, `email`, `behandlung` in the payload); `telefon` validated server-side.
- New payload field on both St. Gallen forms: `angebot_id` (`FIRST30_WINTER_2026_SG`, `FIRST30_WINTER_2026_SG_WARTELISTE`, `ERSTTERMIN_REGULAER_SG`), validated against a whitelist (unknown → 422 `invalid_offer`) and bound to St. Gallen (`standort` + `quelle` ∈ {launch-hero-sg, sg-kontakt-bottom}, otherwise 422 `invalid_offer_scope`). Bottom form additionally sends `wunschzeit` (new optional field). Deployment requirement: Cloudflare WAF rate-limiting rule on POST `/api/anfrage` (see docs/cro/07).
- `angebot` value, before → after: `Ersttermin-Anfrage (Hero St. Gallen)` → `FIRST 30 Pre-Christmas Edition 2026 – kostenloser 30-Minuten-Termin – St. Gallen` (server-canonical, client text ignored). Bottom form previously sent no `angebot`; now `Regulärer Ersttermin – St. Gallen` or the FIRST 30 label.
- E-mail: new first rows Anfrageart / Terminart / Angebots-ID and a coloured header line; subject keeps `[Hero-Gratis-30min-StGallen] Neue Anfrage — St. Gallen (Name)` (name empty for phone-only requests) and gets the suffix ` · FIRST 30`. Mailbox/CRM rules on the exact full subject must be checked; "contains" rules on the prefix keep working.
- New dataLayer events (code side, not mapped in GTM; approval needed before any tag): `first30_whatsapp_click {cta_position: hero|floating_mobile}`, `first30_cta_click {cta_position}`, `first30_cta_dismiss`, `first30_bottom_select {angebot_id}`, `first30_phone_form_submit {angebot_id, quelle}`, `first30_bottom_form_submit {angebot_id}`; all carry `campaign:'FIRST30_WINTER_2026_SG'`, `standort`, `source_path`. Successful-submit events stay single per submission.
- WhatsApp deep link `wa.me/41775236122` with prefilled text: an outbound click, not a sent message; UTM/GA attribution does not carry into the chat.
- The St. Gallen H1 changes to the campaign headline for the duration of the campaign (SEO note, not tracking).

## C. Future measurement specification (not implemented)

Goal: one funnel per brand × location × landing page × source/medium × campaign × device × CTA position, separating (1) Ads conversion, (2) GA4 contact event, (3) successful inquiry (`data.ok`), (4) qualified lead, (5) confirmed appointment, (6) new patient.

- Code side (future, with approval): one success event per form after `data.ok` carrying `form_type`, `standort` (value), `quelle`, `cta_position`, `lang`, `page_path` (no PII); one click event per channel (`phone`, `whatsapp`, `email`) with `cta_position`; keep existing events in parallel for one quarter.
- GTM/GA4 side (Franca): map success events to key events; custom dimensions `standort`, `cta_position`, `form_type`, `lang`; Ads conversion = success event only.
- Offline side (team): import confirmed appointments and new-patient status by inquiry id (CRM/Resend email id) for stages 4–6; GA4 offline import or a monthly reconciliation sheet.
- Governance: a change log in this folder; no event renames without dual-tagging; all changes verified in GTM preview on `/`, `/standorte/st-gallen/`, `/en/`.
