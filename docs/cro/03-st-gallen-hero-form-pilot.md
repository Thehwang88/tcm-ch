# St. Gallen hero-form pilot (form-led 50/50 hero)

Stand 12.10.2026 · Branch `feat/sg-hero-form-pilot` (based on PR #35 head d13bceea; depends on PR #35 being merged first) · Scope: `/standorte/st-gallen/` only.

## Hypothesis

On high-intent clinic landing pages, a compact first-appointment form in the right half of the hero produces more qualified first-appointment requests than a clinic photograph with the form directly underneath. Success is measured on attended first appointments and subsequent bookings, not on lead count.

## What changes (one file: `src/components/HeroLaunchSG.astro`)

- **Hero right half** now holds the existing compact card `#offer-form` ("Dein Ersttermin in St. Gallen"; name, phone, optional e-mail, optional preferred time, Turnstile; primary "Ersttermin anfragen"; reassurance "Unverbindliche Anfrage. Ein Termin ist erst nach unserer Bestätigung … vereinbart."). Same form element, name, hidden fields, submit handler and `formular_senden` push as PR #35.
- **Hero left half** unchanged: eyebrow, H1, lead, trust ticks (EMR/ASCA, address, direct request), CTAs "Ersttermin anfragen" → `#offer-form` and "Termin direkt online buchen" → `#online-buchen` (existing OneDoc widget further down, not embedded in the hero), tel/WhatsApp fallback, opening hours.
- **Clinic photo** (`/images/standort-stgallen.jpg`, authentic) moves into an "Über die Praxis" band directly below the hero: full content width, 24px radius, caption "TCM.ch St. Gallen · Oberer Graben 22 · wenige Gehminuten vom Bahnhof", lazy-loaded.
- **Mobile/tablet** (<1024px): headline and trust first, then the card, then the photo; existing mobile bar (Ersttermin anfragen / OneDoc / call) and WhatsApp FAB untouched.
- Nothing else on the page changes; the bottom `#kontakt` form and the OneDoc widget `#online-buchen` stay where they are.

## Status-aware protection

`HeroLaunchSG` is rendered only for `st-gallen` (operational TCM.ch clinic). The data-driven location template (`Hero.astro`, `KontaktForm.astro`) is untouched, so planned (Oerlikon, Luzern, Bern), under-review (Winterthur Münzgasse) and partner clinics keep their interest/waitlist or verified contact journeys. A rollout to other operational clinics would be a separate, approved change to the shared template with the status system deciding the journey.

## Measurements (local build, A = PR #35 state, B = pilot)

| Viewport | A hero / form top | B hero / form top | B photo band | Next section (USP) | Overflow |
|---|---|---|---|---|---|
| 390×844 | 998 / 998 (below hero) | 1382 / 697 (in hero) | 1406 (358×269) | 1675 | none |
| 768×1024 | 774 / 774 | 1160 / 473 | 1184 (720×405) | 1589 | none |
| 1440×900 | 677 / 677 | 850 / 132 (in first viewport) | 890 (1280×560) | 1450 | none |
| 1920×1080 | 779 / 779 | 850 / 132 | 890 (1280×560) | 1450 | none |

Form card 520×661 (desktop), same as before. Hero CTAs in view at every width. Page load in the local harness ~2 s (no OneDoc in the hero; widget loads where it did before).

## QA

- Build 767 pages; gates: standort-ux 0, clinic-status 0, i18n strict 0, analytics 47/47.
- St. Gallen: identical onclick sets, `dataLayer` (11), GTM (1), `data-sg-hero-form`, form name, Turnstile (5), form `name` attributes (28), wa.me (12), tel (7), OneDoc (1), `#online-buchen`, `#offer-form`, photo asset, title, canonical, H1, JSON-LD identical to the PR #35 build; href set identical except the page's own CSS chunk.
- Form states with mocked API: success card after HTTP ok with `formular_senden {quelle:'launch-hero-sg'}`; error state on HTTP 500 with the button re-enabled; validation message on empty name/phone.
- Accessibility census 390/768/1280/1440: 0 contrast failures (the previous figcaption item is resolved by the solid caption bar), 0 overflow, 0 console errors.
- Other location pages: the component's scoped CSS is now served as the shared `_slug_` stylesheet link instead of an inline `<style>` (Astro inlining threshold); rendered output unchanged.

## Evaluation plan (read-only analytics, no GTM/GA4 changes)

1. Baseline window: 4 weeks of `/standorte/st-gallen/` before release (GA4: sessions by source/medium and device; `formular_senden` with `quelle = launch-hero-sg` vs bottom form; `wa_click`/phone events; OneDoc widget events as already bridged by the widget).
2. Pilot window: same metrics for 4–6 weeks after release; same Ads campaigns and budgets (coordinate with Franca so campaign changes are logged).
3. Operational booking-source log (team, weekly sheet): inquiry id / date / source (hero form, bottom form, OneDoc, WhatsApp, phone) / confirmed appointment yes-no / cancelled or no-show / first appointment attended / follow-up bookings within 8 weeks. Source is taken from the lead e-mail (`quelle`, `formular`) or the OneDoc booking record; where it cannot be determined, record "unknown" rather than guessing.
4. Decision rule: recommend rollout to other operational clinics only if attended first appointments per 100 sessions and the follow-up booking share are at least level with the baseline and the inquiry quality (confirmed share) has not dropped; low traffic means at least one full pilot window, qualitative review of leads and no claims of statistical significance.
5. Rollback: revert the single component commit; no data or tracking change involved.

## Open points for approval

- Release order: PR #35 first, then this branch (re-verified against the new main).
- Whether the "Erste Akupunktur noch in derselben Sitzung" bullet in the card should stay (it is a process statement, not an offer).
- Franca: form name `Hero-Gratis-30min-StGallen`, `Quelle` and `Seite` payload values (see tracking doc T8) if the team wants clean source labels for the booking log.
