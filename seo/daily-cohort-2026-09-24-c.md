# Daily-Cohort 2026-09-24-c — TCM Fragen Expansion

Datum: 2026-09-24 · Typ: Fragen-Cohort (Patientenfragen, editorial vorgegeben) · Max: 10 · **Ergebnis: 9 CREATED, 1 BLOCKED** · Indexierungs-Strategie: **Natural Crawl only** — keine manuellen GSC-URL-Anfragen, URLs bewusst NICHT in seo/index-queue.md (verifiziert: 0 Treffer).

## Pre-Write-Ownership-Audit & Tracking

| URL | GSC/Semrush-Signal | Nächster Owner | Verdict | Ownership-Grenze | Sitemap | Links |
|---|---|---|---|---|---|---|
| /gesundheitsbibliothek/fragen/sport-nach-akupunktur/ | GSC-Signal Fragen-Layer | nach-der-behandlung-Hub (Kurzantwort id sport) | **CREATED** (risk low) | Standalone besitzt Sport/Training nach Akupunktur; Hub-Kurzantwort bleibt und verlinkt hierher | ja | in: Hub-Antwort; out: Müdigkeit, Starke Reaktion, Hub |
| /gesundheitsbibliothek/fragen/schwimmen-nach-akupunktur/ | GSC-Signal | nach-der-behandlung-Hub (Kurzantwort id sauna) | **CREATED** (risk low) | Schwimmen/Baden/Sauna; Dauernadeln-/Ear-Seeds-Pflege bleibt bei deren Therapieseiten | ja | in: Hub-Antwort; out: Müdigkeit, Dauernadeln, Ear Seeds, Hub |
| /gesundheitsbibliothek/fragen/alkohol-nach-akupunktur/ | GSC-Signal | nach-der-behandlung-Hub (Kurzantwort id alkohol) | **CREATED** (risk low) | Alkohol nach Behandlung; Kräuter-Wechselwirkungen → tcm-kraeuter-nebenwirkungen | ja | in: Hub-Antwort; out: Müdigkeit, Kräuter-NW, Hub |
| /gesundheitsbibliothek/fragen/schmerzen-nach-akupunktur-schlimmer/ | GSC-Signal | starke-reaktion-nach-akupunktur (Umbrella) | **CREATED** (risk medium→low) | Besitzt NUR verstärkten Schmerz; Umbrella bleibt Owner des breiten Reaktionsmusters, beidseitig verlinkt; keine Heilkrise-Behauptung | ja | in: starke-reaktion, akupunktur-nebenwirkungen, Hub-Erstverschlimmerungs-Antwort; out: Umbrella, Nerv, Arzt-Seite |
| /gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/ | Semrush CH ~110, KD ~26 | /therapien/schroepfen/ (Head, Phase 3 LOCKED); /wissen/schroepfen-wirkung-flecken/ | **CREATED** (risk medium→low) | Safety-Intent; Head-Term und Flecken-Deutung bleiben bei ihren Ownern, beidseitig verlinkt | ja | in: Therapie-Chips, Flecken-Artikel (related + Hub-Antwort); out: Flecken, Blutiges Schröpfen, Schröpfmassage |
| /gesundheitsbibliothek/fragen/tut-schroepfen-weh/ | GSC-Signal (Analogie tut-akupunktur-weh) | schroepfen-methoden-Hub (Kurzantwort id schroepfen-schmerz) | **CREATED** (risk low) | Schmerz WÄHREND der Behandlung; Nebenwirkungen danach → schroepfen-nebenwirkungen; Hub-Antwort bleibt | ja | in: Hub-Antwort, Therapie-Chips, Schröpfmassage-Artikel; out: NW-Seite, Schröpfmassage, tut-akupunktur-weh |
| /gesundheitsbibliothek/fragen/tuina-nebenwirkungen/ | GSC-Signal | /therapien/tuina/ (Head) | **CREATED** (risk low) | Safety-Intent zu Tuina; Therapie-Head unverändert; Chip-Link von der Therapieseite | ja | in: Therapie-Chips, Hub-Tuina-Antwort; out: Tuina, Massage, Arzt-Seite, Hub |
| /gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/ | GSC-Signal | /therapien/kraeutertherapie/ (Head) | **CREATED** (risk low) | Arzneimittel-Safety (NW + Wechselwirkungen); keine erfundene Interaktionsliste, keine Selbstmedikation; Therapie-Head unverändert | ja | in: Therapie-Chips, Hub-Kräuter-Antwort, alkohol-Seite; out: Kräutertherapie, Blutverdünner, Erstverschlimmerung |
| /gesundheitsbibliothek/fragen/tcm-kraeuter-erstverschlimmerung/ | Semrush CH ~20 | tcm-kraeuter-nebenwirkungen (Schwester); nach-der-behandlung-Hub (Akupunktur-Erstverschlimmerung) | **CREATED** (risk low) | Verschlechterung nach KRÄUTERN; starke-reaktion bleibt Akupunktur-Owner (nur konzeptueller Verweis); keine Weiternahme-/Absetz-Anweisung | ja | in: Kräuter-NW-Seite; out: Kräuter-NW, Kräutertherapie, Arzt-Seite |
| /gesundheitsbibliothek/fragen/akupunktur-ohne-nadeln/ | GSC-Signal | /therapien/akupunktur/laserakupunktur/ | **BLOCKED** (risk high) | Laserakupunktur-Seite besitzt den Intent bereits title-level („Laserakupunktur: Akupunktur ohne Nadeln erklärt", Synonym „Akupunktur ohne Nadeln" im Suchindex); /akupunktur-kinder/ besitzt den pädiatrischen Nadelfrei-Abschnitt (Akupressur/Kindertuina/Ear Seeds/Laser inkl. FAQ „Geht das auch ohne Nadeln?"). Eine neue Übersichtsseite würde beide kannibalisieren. | — | — |

## Hub-Integration

- Alle 9 Standalone-Seiten erscheinen automatisch unter „Häufig gestellt" auf /gesundheitsbibliothek/fragen/ (bestehender Loop, kein neuer Hub).
- Kategorien-Zuordnung über bestehende Hubs per Link: Nach der Behandlung (Sport, Schwimmen, Alkohol, Schmerzen schlimmer), Schröpfen & Methoden (Schröpfen-NW, Tut Schröpfen weh, Tuina-NW, Kräuter-NW), Sicherheit & Nebenwirkungen (verwandt-Links). Keine neuen Hubs erstellt.

## Interne Links (Änderungen an Bestand)

- nach-der-behandlung-Hub: 4 Kurzantworten (sport/sauna/alkohol/erstverschlimmerung) verlinken neu auf die Standalone-Seiten.
- schroepfen-methoden-Hub: 4 Kurzantworten (schroepfmale/schroepfen-schmerz/tuina/kraeuter-medikamente) verlinken neu auf NW-/Schmerz-Seiten.
- FRAGEN_FOR_THERAPIE-Chips: schroepfen +2 (Tut Schröpfen weh, Schröpfen-NW), tuina +1, kraeutertherapie +1 → inbound von /therapien/schroepfen/, /therapien/tuina/, /therapien/kraeutertherapie/.
- starke-reaktion-nach-akupunktur + akupunktur-nebenwirkungen: verwandt += schmerzen-nach-akupunktur-schlimmer.
- /wissen/schroepfen-wirkung-flecken/ related += Schröpfen-NW; /wissen/schroepfmassage/ related += Tut Schröpfen weh.

## Suche / Technik / Build

- Suchindex: 270 → **279** (+9 via bestehenden Fragen-Loop) + 9 SYNONYMS-Einträge.
- Sitemap: 477 → **486** (+9); alle 9 enthalten, self-canonical, indexierbar, unique Title/H1/Meta, bestehendes Fragen-Schema, keine sichtbaren Em-Dashes (0 Treffer in allen 9 dist-Seiten).
- health-audit: 0 Orphans / 0 doppelte Titel / 0 kaputte Referenzen. Renders (Fragen-Hub + 3 Samples + /therapien/tuina/, 1440/390): 0 Overflow, 0 JS-Errors.
- Editorial: vorgegebene Copy technisch formatiert (HTML, Swiss-ss, Du-Form), nicht umgeschrieben; keine Detox-/Heilkrise-Framings, keine erfundenen Quellen/Interaktionslisten, Notruf 144 nur bei etablierten Red-Flag-Mustern.
- Tracking/Booking/Formulare/GTM: unverändert.

## Indexierung

Natural crawl only. Manual URL indexing: NO. URLs nicht in seo/index-queue.md (verifiziert: 0 Treffer).

After deployment, verify the updated sitemap in Google Search Console. Do not manually request indexing for this cohort yet.
