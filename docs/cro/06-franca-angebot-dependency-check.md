# Franca follow-up — `Angebot` value change on the St. Gallen hero form

Stand 12.10.2026 · Live since `main` aca1d5eb · Read-only repository check; GTM, CRM and mailbox rules can only be confirmed by Franca / the team.

## What changed and what did not

| Field (hero form `data-sg-hero-form`) | Before | Now | Changed? |
|---|---|---|---|
| hidden `Angebot` → payload `angebot` | `GRATIS 30 Min Erstbehandlung (Hero St. Gallen)` | `Ersttermin-Anfrage (Hero St. Gallen)` | **yes (value only)** |
| form `name` → payload `formular` → e-mail subject prefix | `Hero-Gratis-30min-StGallen` | same | no |
| hidden `quelle` → payload `quelle` → dataLayer `formular_senden.quelle` | `launch-hero-sg` | same | no |
| hidden `Quelle` → payload `quelle_detail` | `Hero St. Gallen Neueroeffnung` | same | no |
| hidden `Seite` → payload `seite` | `/standort/st-gallen` | same | no |
| dataLayer push | `{event:'formular_senden', form_type:'allgemein', quelle:'launch-hero-sg'}` after HTTP ok | same | no |
| GTM container, triggers, GA4, Ads | — | — | untouched |

## Repository-side result (verified)

- `functions/api/anfrage.js`: the API does not branch on the `angebot` value. It only (a) validates required fields by `quelle` (`launch-hero-sg` → name + phone, line 23), (b) prints `Angebot: <value>` as a row in the e-mail body (line 67), (c) builds the subject as `[<formular>] Neue Anfrage — <standort> (<name>)` (lines 100–106). E-mail delivery via Resend to `termine@tcm.ch` is unaffected.
- No CRM integration exists in the repository; routing happens in the mailbox. The `angebot` value is never pushed to the dataLayer or sent to GTM by the site code.
- Conclusion for the code side: no dependency on the old string. Inquiries since 12.10.2026 16:01 UTC carry the new value.

## Checklist for Franca (outside the repository)

1. GTM container `GTM-PZ92Q3KJ`: search variables, lookup/RegEx tables and trigger conditions for `GRATIS`, `Erstbehandlung`, `Angebot`, `angebot` — expected: none, because the value is not in the dataLayer.
2. GA4: no event parameter carries `angebot`; nothing to update. Confirm that the Ads conversion for `formular_senden` keys on the event name only (expected).
3. Mailbox rules / CRM (if any outside the repo): filters on the subject prefix `[Hero-Gratis-30min-StGallen]` keep working (unchanged); filters on the body line `Angebot: GRATIS 30 Min …` must be updated to `Angebot: Ersttermin-Anfrage (Hero St. Gallen)`.
4. Reporting: any dashboard that counted "free-offer leads" from the body line now counts regular first-appointment inquiries; label the series break at 12.10.2026.
5. Optional, needs approval before any change: rename the form identifier `Hero-Gratis-30min-StGallen` (subject prefix), `Quelle` and `Seite` values; not done, because they are tracking-bearing identifiers.
