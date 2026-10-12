# EN conversion analytics — implementation specification (for GTM/GA4 configuration)

Scope: English pages under `/en/` only. Source: `src/components/en/EnAnalytics.astro` (dataLayer) and
`src/components/en/AppointmentForm.astro` (form stages). Container: the existing GTM-PZ92Q3KJ, consent via CookieYes.
Nothing in this document is configured live by the repo; the dataLayer contract is tested by
`node scripts/test-en-analytics.mjs` (offline, 47 assertions).

## Events and parameters

| Event | When | Parameters |
|---|---|---|
| `cta_click` | A link click, capture phase, once per click | `cta_type` = `booking` \| `phone` \| `whatsapp`; `cta_target` (booking only: `#appointment`, `#zh-funnel` or `/en/contact/`); `label` (static link text, max 60 chars); `location`; `lang`; `page_path` |
| `form_submit` | Submit attempt after client validation and Turnstile token present | `form_id` = `en-appointment`; `stage` = `inquiry_attempt`; `herkunft` (page path); `standort` (selected option value, DE routing value); `location`; `lang`; `page_path` |
| `form_submit_success` | `/api/anfrage` answered HTTP ok **and** `{ok:true}` | same as above with `stage` = `inquiry_received` |
| `form_submit_error` | Server rejected (`reason: server`) or network failure (`reason: network`) | `reason` + the form_submit parameters |

Common parameters: `lang` = `en`; `page_path` = `location.pathname`; `location` = clinic id on location pages (`basel`, `zuerich-oerlikon`, …), empty string elsewhere.

Booking definition: a link to `/en/contact…` or to a same-page anchor whose target contains an appointment form (`form [name="standort"]`). Practice-selector and clinic-finder buttons are such links; the finder's own radio choices emit nothing.

Funnel stages (do not conflate): `cta_click` (intent) → `form_submit` (attempt) → `form_submit_success` (inquiry received) → qualified lead → booked patient. The last two are decided by the team after contact and are not client events; join offline on the intake record (`quelle` = EN page path).

## PII
No name, email, phone or message text is ever pushed. `label` is static link text; `standort` is a clinic option value; `herkunft`/`page_path` are URL paths without query strings.

## Page paths that carry forms
`/en/contact/` (`en-contact-form`), `/en/acupuncture-zurich/` (`en-zurich-form`, Zürich options + "next available" value `Zürich – nächster freier Termin`), `/en/acupuncture-near-me/` (`en-nearme-form`, all locations, clinic finder), `/en/locations/<id>/` (`en-location-form-<id>`, clinic preselected).

## Recommended GTM / GA4 setup
1. Triggers: Custom Event for each of the four event names (do **not** also use GA4 Enhanced Measurement "form interactions" for `form_submit`, or it will double-count).
2. GA4 event tags with event parameters: `cta_type`, `cta_target`, `label`, `location`, `lang`, `page_path`, `stage`, `herkunft`, `standort`, `reason`.
3. Mark `form_submit_success` as a conversion ("EN inquiry received"). Optionally `cta_click` with `cta_type = whatsapp|phone` as secondary conversions ("EN contact intent").
4. Custom dimensions (event scope): `lang`, `location`, `cta_type`, `cta_target`, `stage`, `standort`. Register `page_path` begins with `/en/` as the EN segment.
5. Reports: EN landing-page sessions (organic), inquiries received per `location` and per landing page, booking-intent clicks by `cta_type`, and offline-joined qualified leads / booked patients from the intake (`quelle`).
