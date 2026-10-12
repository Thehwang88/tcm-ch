# Factual content review — four items (read-only, proposals only)

Stand 12.10.2026 · Source state `main` aca1d5eb · Nothing changed; each item lists the exact file, line and the minimal proposed correction. Owner confirmation is needed where a fact is involved.

## Priority order

| # | Item | Why first | Effort |
|---|---|---|---|
| 1 | Winterthur Münzgasse: five practitioner cards on an under-review location | implies clinical operation at a location whose status is `review`; status gate otherwise clean | 1 line (template) |
| 2 | St. Gallen "80 bis 100 Prozent" insurance claim | absolute reimbursement figure contradicts the policy-dependent wording released on 12.10. | 1 sentence |
| 3 | Basel operational status vs "vorgesehen" leadership | page says "TCM.ch Klinik · Basel" and is bookable, while the team text says the lead is only designated and no hours are published | owner fact check + 2 strings |
| 4 | Selbsttest "Ehrlichkeits-Garantie" | consistency with the homepage wording released on 12.10. | 1 string |

## 1. Winterthur Münzgasse — practitioners on an unconfirmed location

- Status: `src/data/locations.ts:66` → `status: 'review'`.
- Cause: `src/components/standort/Team.astro:14` builds the cards from every profile whose `standorte[]` includes the slug, with no status check; five profiles list `winterthur-muenzgasse` (`src/data/therapeuten.ts` lines 159, 264, 391, 529, 590: Ken Uehara, Ji Eun Lee Tremmel, Natalia Goc, Brenda Oviedo, Désirée Letter). `src/pages/standorte/[slug].astro:309` renders `<Team data={data} />` unconditionally.
- Minimal correction (template, keeps the data): in `src/pages/standorte/[slug].astro:309` render the team only for operational locations:
  `{!data.planned && !data.review && <Team data={data} />}`
  (`planned` and `review` are already copied onto `data` at `standorte.ts:905-908`). Effect: Münzgasse shows no practitioner cards until its status becomes `operational`; Oerlikon, Luzern and Bern are unaffected (no profiles assigned). Alternative if the people are confirmed for Münzgasse: keep the cards and add the status line in `teamIntro` ("Standort in Prüfung; das Team arbeitet derzeit an der Marktgasse") — owner decision.
- Check after the change: `node scripts/check-clinic-status.mjs` and `check-standort-ux.mjs` (both already pass; no rule covers team visibility, so one assertion "no `team-` section on `review`/`planned` pages" should be added to the clinic-status gate step 4 in the same PR).

## 2. St. Gallen — "80 bis 100 Prozent" insurance claim

- Where it actually is (two St. Gallen places):
  - `src/data/standort-leaves/st-gallen.html:22` (page `/standorte/st-gallen/`, Krankenkassen block): "Je nach Zusatzversicherung werden häufig 80–100 % übernommen." (absolute figure, no policy/recognition condition).
  - `src/data/akupunktur-tcm-st-gallen-body.html:326` (page `/akupunktur-tcm-st-gallen/`): "Bei den meisten Kassen werden 80 bis 100 Prozent des Sitzungspreises übernommen. Wir prüfen deine Deckung kostenlos, bevor du das erste Mal kommst."
- The Kosten page `/akupunktur-st-gallen-kosten/` (`akupunktur-st-gallen-kosten-body.html`) carries no percentage; it already says the share "steht in deiner Police" and offers the free coverage check (lines 28, 115, 130, 141). No change needed there.
- Site-wide context (read-only scan): the "80 bis 100 Prozent" figure appears in 212 source files (location data `standorte.ts`, `wissen.ts`, therapy and condition bodies, the Bottighofen leaf, the header menu "Krankenkasse — Deckung 80 bis 100%"). Most are already conditional ("je nach Modell häufig", "hängt von Versicherer und Modell ab"); the absolute forms ("in der Regel", "bei den meisten Kassen werden … übernommen", the header menu line) are the ones to align. Because the figure is also the agreed positioning in the project notes, this is a one-time editorial policy decision for the owner, not a St. Gallen fix alone.
- Minimal corrections (one sentence each):
  - Leaf line 22 → "Je nach Police, Kasse und Modell beteiligt sich die Zusatzversicherung an den Kosten; Voraussetzung ist die EMR-/ASCA-Anerkennung der Therapeut:in."
  - Landing body line 326 → "Wie hoch die Beteiligung ist, steht in deiner Police; je nach Kasse und Modell liegt sie meist zwischen 50 und 100 Prozent, oft mit einem Jahresmaximum. Wir prüfen deine Deckung kostenlos, bevor du das erste Mal kommst." If the owner prefers no figure at all: "Wie hoch die Beteiligung ist, steht in deiner Police und hängt von Kasse und Modell ab. Wir prüfen deine Deckung kostenlos, bevor du das erste Mal kommst."
- The homepage FAQ and treatments intro were already corrected on 12.10. (PR #35).

## 3. Basel — operational status vs future opening and designated management

- Facts in the data: `src/data/locations.ts:104-105` status `operational` with the comment "Aktiver Standort (Inhaberbestätigung 12.10.2026). Öffnungszeiten noch nicht bestätigt: keine Angabe." (`openingHours: []`, pinned in the clinic-status gate).
- Page copy: eyebrow "TCM.ch Klinik · Basel", hero lead "Unsere Praxis an der Steinenvorstadt 73 …", form bookable; `src/data/standorte.ts:115` `teamIntro: 'Janine Trebes ist als Standortleiterin für Basel vorgesehen. …'`; `src/data/therapeuten.ts:215` `ortLabel: 'Designierte Standortleiterin Basel'`.
- Inconsistency: an operational, bookable clinic whose only named clinician is "designated" and whose hours are unpublished. Two consistent options; the owner picks the true one:
  - **A — Basel is open and treating:** `standorte.ts:115` → `'Janine Trebes leitet den Standort Basel. Ihr Profil und ihren öffentlichen Registereintrag findest du auf der Profilseite.'`; `therapeuten.ts:215` → `'Standortleiterin Basel'`; add the real opening hours to `locations.ts:105` (`openingHours`) so the page and the MedicalClinic schema show them.
  - **B — Basel is not yet treating:** `locations.ts:105` `status: 'planned'` with an `openingNote` (date or "Eröffnung in Vorbereitung"), which automatically switches the hero eyebrow, status banner, form options ("Vormerken") and removes the MedicalClinic hours; keep the "vorgesehen" wording. The gate pin at `scripts/check-clinic-status.mjs:177` must then be updated in the same change.
- Also to confirm with the owner: the hero photo is a "Symbolbild" (reception of another clinic); if Basel is open, an authentic Basel photo would resolve the caption.

## 4. Selbsttest — outdated "Ehrlichkeits-Garantie"

- `src/pages/selbsttest/index.astro:336`: `'<span>Ehrlichkeits-Garantie: Wir sagen dir auch, wenn die TCM nicht das Richtige ist</span>'` (rendered in the result offer list of `/selbsttest/`).
- Minimal correction: `'<span>Unser Versprechen: ehrliche Einschätzung. Wir sagen dir auch, wenn TCM nicht das Richtige ist.</span>'` — same wording family as the homepage offer block released on 12.10. No tracking or form code in that string.

## Release notes for all four

- Each item is one small commit on a dedicated branch; items 1 and 4 need no owner fact check and can go first; items 2 and 3 need the owner's choice of wording/status.
- Gates to run: build, `check-clinic-status`, `check-standort-ux`, `check-i18n --strict` (Basel and St. Gallen have EN pairs; an EN review is required if the DE facts change), `test-en-analytics`.
- None of the four touches forms, `/api/anfrage`, dataLayer events, GTM, GA4 or Ads.
