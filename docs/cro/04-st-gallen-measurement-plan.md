# St. Gallen conversion measurement — 12 October to 8 November 2026

Stand 12.10.2026 · Production baseline `main` aca1d5eb (PR #35 live) · Read-only on GA4 / Ads; no GTM, GA4 or Ads instrumentation changes. PR #38 (hero-form pilot) stays in draft during this window.

## 1. Purpose and primary KPI

Measure the regular first-appointment funnel on `/standorte/st-gallen/` for four full weeks (12.10.–8.11.2026) so that the later PR #38 pilot can be compared with the same definitions. **First review: Monday 9 November 2026**, on the four complete weeks; no decision on the pilot before that date.

**Primary KPI:** attended new patients per 100 landing sessions on `/standorte/st-gallen/`.
**Secondary KPIs:** inquiry-to-booking rate (confirmed first appointments ÷ inquiries), booking-to-attendance rate (attended ÷ confirmed), cost per attended new patient (Ads cost of the St. Gallen campaigns ÷ attended new patients from paid traffic, only where the source is reliable).

Rules: keep raw counts and denominators in every row; never treat GA4 event counts as unique patients (one visitor can fire several events, one patient can send two inquiries); unknown attribution is recorded as "unknown", never guessed.

## 2. Weekly windows

| Week | From (Mon) | To (Sun) |
|---|---|---|
| W1 | 12.10.2026 | 18.10.2026 |
| W2 | 19.10.2026 | 25.10.2026 |
| W3 | 26.10.2026 | 01.11.2026 |
| W4 | 02.11.2026 | 08.11.2026 |

Attendance and follow-up bookings are counted by the week of the *inquiry*, not the appointment date; rows are updated when outcomes become known. The eight-week follow-up period is counted from the **actual date of the attended first appointment** of each patient, not from the inquiry week or the end of the baseline (a first appointment on 8.11.2026 closes its follow-up column on 3.1.2027). Unknown outcomes stay "unknown" until confirmed; nothing is estimated.

## 3. Data sources per metric (who fills what)

| Metric | Source | Owner | Definition |
|---|---|---|---|
| Landing sessions | GA4 (TCM.ch property 539741092) → Reports › Engagement › Landing page, filter `landing page = /standorte/st-gallen/`, secondary dimension *Session source / medium* and *Device category*, weekly date range | Franca / owner | Sessions whose first page was the St. Gallen page |
| Paid vs organic | same GA4 report, split by source/medium (`google / cpc`, `google / organic`, direct, referral, other) | Franca / owner | raw session counts per bucket |
| Ads cost | Google Ads 434-334-6617, campaigns "TCM.ch St. Gallen Search" and "TCM.ch PMax SG + Winterthur", weekly cost | Franca | CHF; PMax cost cannot be split by landing page: report it separately and mark it |
| Form-submit events (hero form) | GA4 event `formular_senden` with event parameter `quelle = launch-hero-sg` (landing page filter) | Franca / owner | GA4 event count, not patients |
| Form-submit events (bottom form) | GA4 event `formular_senden` with `quelle = /standorte/st-gallen/` | Franca / owner | GA4 event count |
| WhatsApp / phone clicks | GA4 events `wa_click` (quelle fab/sticky/drawer/form) and the GTM phone-click event, landing page filter | Franca / owner | clicks, not conversations |
| Inquiries received (hero form) | `termine@tcm.ch` inbox: subject prefix `[Hero-Gratis-30min-StGallen]` (unchanged identifier) and `Angebot: Ersttermin-Anfrage (Hero St. Gallen)` | Clinic team | one e-mail = one inquiry; duplicates from the same person within 7 days count once |
| Inquiries received (bottom form) | inbox: subject "Neue Anfrage — St. Gallen …" without the hero prefix | Clinic team | same rule |
| OneDoc bookings | OneDoc practice back-office, bookings created in the week via the widget (Corinna Reinhart agenda) | Clinic team | a booking = confirmed appointment by definition |
| WhatsApp / phone inquiries | clinic phone log / WhatsApp business chat list, only when the person says they came via the website or the message carries the website prefill text | Clinic team | otherwise "source unknown" |
| Confirmed first appointments | practice agenda | Clinic team | an appointment date agreed with a new patient |
| Cancellations / no-shows | practice agenda | Clinic team | cancelled ≥ 24 h before vs not appeared |
| Attended first appointments | practice agenda | Clinic team | new patient attended the first appointment |
| Follow-up bookings | practice agenda, within 8 weeks counted from the actual date of the attended first appointment | Clinic team | at least one further appointment booked; "unknown" while the 8-week window is still open |

## 4. Weekly routine (15 minutes)

1. Monday: Franca/owner exports the GA4 landing-page report and the Ads cost for the previous week and fills columns B–L of the log.
2. Monday: the clinic team counts inquiries by source from the inbox, OneDoc and the phone/WhatsApp log and fills columns M–R.
3. Rolling: the clinic team updates confirmed / cancelled / no-show / attended / follow-up (columns S–W) as outcomes occur, by inquiry week; the follow-up column of a patient closes 8 weeks after that patient's actual first appointment date.
4. Every Monday the KPI columns (X–AB) are recalculated from the raw columns; nothing is estimated.

Template: `docs/cro/st-gallen-weekly-log-template.csv` (one row per week; Google Sheets / Excel import; keep the column headers).

## 5. Baseline availability (what we have now)

- GA4 and Google Ads data for 14.9.–11.10.2026 exist only as the summary in `docs/cro/01-baseline-audit.md` (St. Gallen: 178 sessions, 34 key events, 7 form-submit events); page-level exports must be pulled read-only from GA4/Ads by Franca or the owner, this session has no analytics connector.
- The hero form changed on 12.10.2026 (free offer discontinued); inquiries before that date carried the `Angebot` value `GRATIS 30 Min Erstbehandlung (Hero St. Gallen)` and are not comparable in quality. Treat 12.10. as day 0.
- No historical operational log (confirmed / attended / no-show) exists in the repository; the baseline for the primary KPI therefore starts with W1 of this window.
- OneDoc bookings before 12.10. can be read from the OneDoc back-office if the team wants a pre-window reference; mark them as "pre-window".

## 6. Reading the numbers

- Report rates only with their denominators (e.g. "3 attended / 212 sessions = 1.4 per 100"), never as a bare percentage.
- With St. Gallen's traffic (≈40–60 landing sessions per week) weekly rates will swing by several points for one patient; compare 4-week totals, not weeks.
- A GA4 form-submit event count higher than the inbox count is normal (test submits, double clicks, bot honeypot replies); the inbox count is the inquiry count.
- Cost per attended new patient is only reported for weeks where paid sessions and attended patients from paid sources are both known; PMax cost is reported separately because it cannot be attributed to the landing page.
- The later PR #38 pilot uses the identical columns and definitions; the comparison is the 4-week window before vs after the pilot release.
- GA4, GTM and Google Ads are read only; no instrumentation, event, trigger or campaign change is part of this plan.
