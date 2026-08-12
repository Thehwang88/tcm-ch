# Claude Code Prompt: 3 neue Beschwerden-Seiten (Reizdarm, Blasenentzündung, Neurodermitis)

Copy everything below into Claude Code:

---

Add 3 new Beschwerden pages to tcm.ch (repo: C:\dev\tcm-ch, Astro, deploy target tcm-ch-2):

1. /beschwerden/reizdarm/
2. /beschwerden/blasenentzuendung/
3. /beschwerden/neurodermitis/

## Scope (surgical, no refactor)

- New page files only, following the structure of an existing live KEEP Beschwerden page 1:1 (pick a strong existing one like rueckenschmerzen as template, reuse its layout/components/CSS unchanged)
- Register each page in the /beschwerden/ overview cards:
  - Reizdarm → "Verdauung & Stoffwechsel"
  - Blasenentzündung → "Urogenital & Beckenboden"
  - Neurodermitis → "Haut, Haare & sichtbare Beschwerden"
- Add all 3 URLs to sitemap
- Internal links per page: Therapien (Akupunktur, Chinesische Kräutertherapie; Reizdarm additionally Schröpfen + Moxibustion; Blasenentzündung additionally Moxibustion) + the standard Standorte section like existing pages
- Schema per page: MedicalCondition + FAQPage (matching the visible FAQ) + BreadcrumbList
- No changes to unrelated files, no refactor, no global CSS edits

## Content requirements (all 3 pages)

- Length: 1,300–1,600 words per page (Blasenentzündung min. 1,200)
- Language: Du-form, Swiss ss (never ß), no em-dashes, no Heilversprechen, no Qi/Yin/Yang/Meridian-Esoterik language, no "ganzheitlich"-inflation, no AI-slop (no "In der heutigen Zeit", no schematic triple listings, varied sentence rhythm, concrete instead of generic)
- Tone: written by an experienced TCM therapist, helpful to patients, easy to read, keyword-loaded but natural
- Each page needs these sections:
  1. H1 + intro (patient pain point, empathisch, konkret)
  2. Was ist [Beschwerde]? (Symptome als Liste)
  3. Ursachen & Auslöser
  4. Wie die TCM [Beschwerde] betrachtet (Muster-Differenzierung, ohne Esoterik-Sprache)
  5. So behandeln wir (Akupunktur, Kräutertherapie, Ernährung nach TCM, plus beschwerdespezifische Methoden)
  6. TCM-Diagnose: So läuft die Erstkonsultation ab (Anamnese, Zungen- und Pulsdiagnose, Behandlungsplan)
  7. Was du erwarten kannst (realistischer Behandlungsverlauf mit Sitzungszahl-Richtwerten)
  8. Wann zum Arzt / Abgrenzung (Red Flags, TCM ergänzt Schulmedizin, ersetzt sie nicht)
  9. Kostenübernahme (EMR/ASCA-anerkannt, Zusatzversicherung übernimmt in der Regel 70–90%)
  10. FAQ: 6 Fragen pro Seite (People-also-ask style), sichtbar + als FAQPage schema
  11. Standort-CTA wie bestehende Seiten

## Base copy

Use the file beschwerden-content-reizdarm-blasenentzuendung-neurodermitis.md as the content foundation (H1s, intros, TCM-Betrachtung, Behandlung, Kostenübernahme, 4 FAQs per page are already written there). Expand each page to target length by adding:
- Ursachen & Auslöser section (new)
- TCM-Diagnose/Erstkonsultation section (new)
- Wann zum Arzt section (expand the existing red-flag sentences into own section)
- 2 additional FAQ questions per page:
  - Reizdarm: "Was kostet eine TCM-Behandlung bei Reizdarm?" + "Welche Lebensmittel sollte ich bei Reizdarm meiden?"
  - Blasenentzündung: "Was kostet die Behandlung?" + "Was kann ich selbst gegen wiederkehrende Blasenentzündungen tun?"
  - Neurodermitis: "Was kostet die Behandlung?" + "Welche Rolle spielt Ernährung bei Neurodermitis?"
- Kosten-FAQ answers: reference Zusatzversicherung coverage, keine konkreten CHF-Preise erfinden; use the same pricing wording as existing Beschwerden pages if present, otherwise link to the Kosten/Krankenkassen page
- All new text follows the same style rules above. Keyword targets to weave in naturally:
  - Reizdarm: Reizdarm behandeln, Reizdarmsyndrom TCM, Akupunktur Reizdarm, Reizdarm Schweiz, Blähungen, Darmbeschwerden natürlich behandeln
  - Blasenentzündung: wiederkehrende Blasenentzündung, Harnwegsinfekt vorbeugen, Akupunktur Blasenentzündung, chronische Blasenentzündung natürlich behandeln
  - Neurodermitis: Neurodermitis behandeln, atopische Dermatitis TCM, Juckreiz lindern, Neurodermitis natürlich behandeln, chinesische Kräuter Haut

## Meta

- Title ≤ 60 chars, pattern: [Beschwerde] mit TCM behandeln | TCM.ch (adjust per page, keep keyword first)
- Meta description ≤ 155 chars, includes keyword + CTA/USP (EMR/ASCA, 10+ Standorte)
- Use the Titles/Metas from the content file as base, shorten if over limit

## Build rules (repo standards)

- Crawlable links: <a href>, never <div onclick>
- Trailing-slash URL schema consistent with existing Beschwerden pages
- _redirects: relative paths only if touched (should not be needed)
- Do not touch _headers, redirects, or global config

## Verification before done

- npm build passes
- All 3 pages render with FAQ visible, schema valid (no FAQPage/visible-FAQ mismatch)
- Overview page shows all 3 in the correct cards
- Sitemap contains the 3 new URLs
- Grep check: no "ß", no "—", no "ganzheitlich"

Do NOT deploy. Stop after build passes and list the changed files.
