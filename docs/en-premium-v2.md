# English V2 — audit and review scope

Baseline: `51a5366560b64da2f2340cb3118ac30109ee631f`, fetched 2026-10-11.
Branch: `feat/en-premium-v2`. No merge or deployment authorised.

## Findings

| Family | Current gap | Priority / action |
| --- | --- | --- |
| Home | Legacy green buttons, stacked photo, three short sections; unsupported blanket recognition/coverage claims | P0: mint split hero, clinic choice, conditions, treatments, journey, insurance, genuine public profiles, FAQs and conversion |
| Locations | Generic copy; conditions point to DE; blanket therapy/language claims; no practitioner or nearby context | P0: shared clinic facts/status/entity IDs, explicit operator, EN discovery, published public practitioner profiles and actual location treatment lists |
| Location index | Active/planned/review mixed; generic recognition claim | P1: explicit status groups and operator labels |
| Therapy/condition pages | Useful existing EN datasets and interlinks; old presentation; review metadata needs evidence audit | P1: retain URL ownership; separate evidence/editorial pass before broad rollout |
| Knowledge | Nine existing articles already cover first visit, costs, insurance, safety and English-speaking care | P1: surface existing routes; no mass translation or competing URLs |
| Insurance | Implies recognition alone secures reimbursement; suggests buying cover after diagnosis | P0: explain policy, method and provider checks; no guaranteed acceptance or reimbursement |
| Near-me | Existing national location-discovery owner | Retain; no new national near-me route |
| Contact | Existing Turnstile and `/api/anfrage`; location list duplicated; planned prefill picks first partner option; no explicit success analytics | P0: use central clinics/options, exact prefill, preserve payload/backend, add success-only existing event vocabulary |
| Language/SEO | Canonical and pair map exist; unmatched EN path silently falls back to DE home | Check built relationships; do not invent twins |
| Mobile | Responsive CSS exists but current EN hero/content is not the new brand | Use canonical breakpoints; browser screenshots required before GO |

## Brand evidence and boundaries

`docs/design-system.md`, `public/styles/tokens.css`, `public/styles/ui.css`,
`home.css` Softriver hero, `BrandSignature.astro` are actual repository evidence.
Use Figtree 800, existing type tokens, mint `--brand`, rich black
`--brand-black`, concrete `--surface-concrete`, pill CTAs and 16px cards.
The complete “TCM.ch Complete Brand Guidelines.pdf” (33 pages, uploaded 2026-10-07)
was located during continuation. Its palette matches the deployed primary colours:
Concrete #F2F4F2, Vivid Mint #1AE288, Rich Black #020B10. Page 22 specifies Manrope
Regular/Medium, while the current DE implementation uses Figtree. This draft keeps
shared deployed typography rather than creating an independent EN font system.
Typography authority needs owner resolution before claiming full PDF compliance. Earlier `REBRAND_ARCHITECTURE.md` and `CLAUDE.md` contain
obsolete colour/form/SPA claims; current source takes precedence.

Reuse tokens, UI buttons, `BrandSignature` via its existing English-capable props,
Header/FooterEn, clinic status/options, EN conditions/therapies and public
therapist whitelist. New EN adapters: opt-in premium wrapper, split hero,
clinic cards and practical insurance/journey sections. No global token flips,
German refactor, German header/footer edit or Zürich CREW edit.

The homepage uses existing brand imagery labelled as illustrative, not as
proof of actual team membership. Named portraits come from the public therapist
data. Unconfirmed English fluency, treatment slots and fees are never inferred.

## Architecture

Home: split hero → open clinic selection + separate future-location link →
condition discovery → treatment discovery → first appointment → insurance →
public practitioner profile → FAQ → inquiry CTA.

Clinic: local split hero → actual operator/address/contact/status → publicly
assigned practitioner profiles (designated roles explicit) → locally listed
treatments → EN conditions → first appointment → insurance → address/map and
published hours → practical FAQ → nearby operating clinics → preselected inquiry.
Missing facts are omitted or offered as a question to the coordination team.
No fabricated walking times or local narrative.

## Milestones and gates

A: this audit. B: homepage and isolated brand adapters. C: reusable clinic
template and index. D: prioritise insurance and existing conversion page;
additional SEO/evidence expansion stays a separate review. E: production build,
clinic/status gates, complete EN internal-link/schema/canonical/hreflang checks,
DE output comparison, desktop/mobile screenshots and mocked form interaction.

This environment has no supported browser-control skill. Browser QA/screenshots,
real fonts, Turnstile interaction and visual parity remain explicit release
blockers, not assumed passes. No real patient inquiry is sent during testing.
GSC figures in the brief are historical, not newly verified performance data.

Insurance sources checked 2026-10-11: BAG physician complementary medicine
https://www.bag.admin.ch/de/arztliche-komplementaermedizin ; CSS policy/method/provider
requirements https://www.css.ch/en/private-customers/quick-easy/get-help/benefits-check/alternative-methods.html ;
EMR quality label https://emr.ch/de/das-emr .

## Implemented review candidate

- Home: `src/pages/en/index.astro`.
- Brand adapters: `src/components/en/{Premium,Hero,ClinicCard,Journey,Insurance}.astro`
  and `src/styles/en-premium.css`; existing `BrandSignature` reused via props.
- Local pages/index: `src/pages/en/locations/{[slug],index}.astro`.
- Insurance and inquiry: `src/pages/en/{health-insurance-acupuncture,contact}.astro`.
- Language resolution: `src/layouts/Layout.astro` tolerates trailing-slash variants
  and emits no unrelated German-home twin for unpaired pages.
- Trust correction: the three EN condition/therapy/knowledge templates no longer
  render a generic medical reviewer or `lastReviewed` assertion without a
  documented review. Article authors and publication/modification dates remain.
- Gates: `scripts/check-en-premium.mjs`; clinic-status gate extended narrowly
  for the exact English status label for Bern (which has no bespoke vorab list).

The English form now includes all central clinic options. Exact query values
preserve the distinction between the Oerlikon partner practice and new clinic;
legacy name-only links select the new-clinic interest option. Payload fields,
endpoint, Turnstile key and honeypot remain. `formular_senden` is emitted only
on a successful `{ok:true}` response, without patient data. Duplicate submits
are blocked while a request is pending. Backend validation remains unchanged.

## Verification (2026-10-11)

| Check | Result |
| --- | --- |
| `npm run build` | PASS — static Astro output, sitemap and Worker compile |
| `node scripts/check-clinic-status.mjs` | PASS — zero failures |
| `node scripts/check-standort-ux.mjs` | PASS — zero failures |
| `node scripts/check-en-premium.mjs` | PASS — 51 EN pages; 50 JSON-LD script blocks parse; canonical/reciprocal DE links, internal links/anchors and image files resolve |
| Form script in isolated VM with mocked network | PASS — every option prefilled; distinct Oerlikon paths; validation, missing token, honeypot, success/server/network failure and duplicate submission |
| German regression | All 715 non-English HTML files byte-identical to a fresh production build of current main `c34cb98` |
| Sitemap | URL set unchanged; date-only generator churn excluded from source commit |
| `git diff --check` | PASS |
| Browser/desktop/mobile screenshots | NOT RUN — supported control-browser skill unavailable in managed environment |
| Live submission, Turnstile, GTM delivery | NOT RUN — mocks verify code behaviour, not production third-party services |
| Full schema.org / Google rich-result validation | NOT RUN — local checks verify JSON and selected clinic identity/status invariants only |
| Search Console refresh | Unavailable: Windsor discovery returned only Google Ads accounts; no Search Console connector/account |
| Full brand PDF comparison | Text reviewed; primary palette agrees, Manrope vs deployed Figtree remains unresolved; visual PDF/layout comparison pending |

No new route was added, so no new index-queue entry is required. No mass EN
translation or generic city hub was created. Therapy, condition and knowledge design/content expansion is now implemented below. This is an editorial improvement with linked sources, not a documented clinical review or a comprehensive systematic evidence update.

Recommended review routes: `/en/`, `/en/locations/st-gallen/`,
`/en/locations/basel/`, `/en/locations/zuerich-oerlikon/`, `/en/contact/`.
Before GO: screenshots at 390px and 1440px (plus 360/768/1024 overflow checks),
font and CTA comparison with DE, keyboard/mobile navigation, real Turnstile
rendering and a mocked browser submission. Production merge/deploy stays blocked
until the owner explicitly approves.


## Continuation: current main and German imagery

Integrated main `c34cb98149eda61f0329bbba64108bcee85e0880`, including its shared
EN rebrand stylesheet and German Wave 6/7 changes. The initial audit above describes
the original baseline, not the subsequently integrated release. Homepage now reuses
DE `team-hero.jpg`; St. Gallen reuses its dedicated `standort-stgallen.jpg`; other
clinic heroes prefer current `getStandort(id).hero.image` over the legacy mapping.
Generic and planned-location images remain explicitly illustrative. Image reuse
does not verify depicted staff identities. No German source was changed by this step.


## Milestone D — full English route coverage (2026-10-11)

User requested continuation across the full English site. All 51 existing EN routes
now use the opt-in premium layout; no new routes or local search-intent owners added.

- 11 therapy pages and 8 condition pages: shared split hero, real anchor navigation,
  patient preparation, evidence references, explicit limitations, related topics and
  a common inquiry section. Condition warning signs precede promotional treatment copy.
- 3 discovery indexes: editorial introductions and shared image cards. Regional
  near-me finder now separates operating clinics from planned/review statuses using
  the central clinic data; removed invented appointment times and insurance percentages.
- 9 knowledge articles: premium article layout and generated heading navigation.
  Five practical guides rewritten (fees, claims, English care, safety and first visit);
  four topic guides corrected and citations completed. Static modification dates updated
  only for edited articles. Undocumented reviewer metadata removed.
- Contact preserves treatment/condition query context as editable textarea text, capped
  at 160 characters per field, without overwriting a pre-existing patient message.
- EN 404 now uses the same hero/buttons. New components: ArticleNav, Sources, NextSteps;
  new English-only reference data: en-editorial.ts. DE components/tokens remain untouched.
- Existing DE image sources retained; facial acupuncture now uses the current DE crop,
  and fertility uses the current DE hero. No images or practitioner identities invented.

Evidence corrections include the differing low-back-pain guideline recommendations,
low/very-low certainty in the cited 2016 period-pain review, the 2018 sham-controlled
IVF trial, and explicit separation of general massage/acupuncture research from claims
about individual variations. General reference links are not represented as proof of
specific cosmetic, moxibustion or gua-sha outcomes. This is not an exhaustive literature
review; older reviews are dated and linked, not described as new 2026 findings.

Validation adds a premium-layout gate, rejection of unresolved citation placeholders,
and actual form-handler tests for combined treatment/condition context, preserving
patient-entered text and treating URL input as plain text. Browser/visual QA remains
unavailable under the Sites skill in this environment. No claim of visual approval,
clinical sign-off, live Turnstile verification or production deployment is made.


Full-route verification: production build, EN link/schema/form/layout checks and
Standort UX pass. All 715 non-English HTML pages remain byte-identical to current
main c34cb98; sitemap URL set unchanged. Clinic-status gate additionally checked
against the regional finder to ensure the planned-location section is not read as
an operating clinic's status. Clinical-source links are explicit; no citation
placeholders remain. Full browser and clinical review remain separate requirements.
