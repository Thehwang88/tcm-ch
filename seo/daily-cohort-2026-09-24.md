# Daily-Cohort 2026-09-24 — Organic Library Expansion

Datum: 2026-09-24 · Typ: Daily organic library expansion · Max: 10 · **Ergebnis: 10 CREATED, 0 BLOCKED** · Indexierungs-Strategie: **Natural Crawl only** — keine manuellen GSC-URL-Anfragen, URLs bewusst NICHT in seo/index-queue.md (verifiziert: 0 Treffer).

## Pre-Write-Audit & Tracking

| URL | Cluster | Target-Query (Semrush) | Nächster Owner | Risiko | Verdict | Sitemap | Links |
|---|---|---|---|---|---|---|---|
| /gesundheitsbibliothek/befunde-werte/harnsaeure-erhoeht/ | Befunde/Stoffwechsel | harnsäure erhöht (~210, KD18) | /beschwerden/gicht/ (Erkrankung) | low | CREATED | ja | out: gicht, nierenwerte, cholesterin |
| /gesundheitsbibliothek/befunde-werte/ferritin-erhoeht/ | Befunde/Stoffwechsel | ferritin erhöht (~110, KD16) | ferritin-zu-niedrig (Gegen-Intent) | low | CREATED | ja | in: ferritin-zu-niedrig; out: low-Seite, crp, leberwerte, fettleber |
| /gesundheitsbibliothek/befunde-werte/kalium-zu-hoch/ | Befunde/Elektrolyte | kalium zu hoch (~390, KD32) | keiner | none | CREATED | ja | in: nierenwerte; out: nierenwerte, blutdruck, bluthochdruck |
| /gesundheitsbibliothek/befunde-werte/alkalische-phosphatase-erhoeht/ | Befunde/Leber | alkalische phosphatase erhöht (~210, KD21) | leberwerte-erhoeht (Umbrella) | low | CREATED | ja | in: leberwerte-Listenpunkt; out: leberwerte, gamma-gt, bilirubin |
| /gesundheitsbibliothek/befunde-werte/gpt-alt-erhoeht/ | Befunde/Leber | gpt erhöht (+ALT-Varianten) | leberwerte-erhoeht | low | CREATED (GPT+ALT bewusst EIN Owner) | ja | in: leberwerte-Listenpunkt; out: leberwerte, got-ast, gamma-gt, fettleber |
| /gesundheitsbibliothek/befunde-werte/got-ast-erhoeht/ | Befunde/Leber | got erhöht (+AST) | gpt-alt-erhoeht (Schwester) | low | CREATED (GOT+AST EIN Owner) | ja | in: leberwerte-Listenpunkt; out: gpt-alt, leberwerte, gamma-gt |
| /gesundheitsbibliothek/befunde-werte/vitamin-d-zu-niedrig/ | Befunde/Vitamine | vitamin d zu niedrig (~30 + Varianten) | keiner (nur Nebenerwähnungen) | none | CREATED | ja | out: b12, tsh |
| /gesundheitsbibliothek/befunde-werte/vitamin-b12-zu-niedrig/ | Befunde/Vitamine | vitamin b12 zu niedrig | keiner (B12 nur Nebenerwähnung in KS) | none | CREATED | ja | out: vitamin-d, ferritin-low, eisenmangel, beine-kribbeln-nachts |
| /wissen/schroepfmassage/ | Wissen/Methoden | schröpfmassage (~140, KD13; GSC-Impressionen vorhanden) | /therapien/schroepfen/ (Head, Phase 3 LOCKED) | medium→low | CREATED (als Schröpf-Variante deklariert, Grenze in Title/Intro/Links) | ja | in: schroepfen-Leaf + wirkung-flecken-Artikel; out: beide + tuina + Fragen-Hub |
| /wissen/shiatsu-selbstbehandlung/ | Wissen/Methoden | shiatsu selbstbehandlung (~20; GSC-Query vorhanden) | /therapien/shiatsu/ (Head, Phase 3 LOCKED) | low | CREATED (Self-Care-Intent, kein Übungskatalog) | ja | in: shiatsu-Leaf + was-bringt-Artikel; out: beide + akupressur + wann-zuerst-zum-arzt |

## Ownership-Entscheidungen (Kernpunkte)

- Ferritin hoch vs. tief: zwei getrennte Owner, beidseitig kreuzverlinkt; hoch = Entzündung/Leber vor Eisenüberladung, Transferrinsättigung als Schlüssel.
- GPT/ALT und GOT/AST: je EIN Artikel pro Enzym (Synonyme, keine getrennten URLs); Umbrella bleibt leberwerte-erhoeht, dessen Listenpunkte (ALT, AST, AP) jetzt auf die Einzelwert-Seiten verlinken.
- AP vs. Gamma-GT: AP-Seite nutzt Gamma-GT explizit als Abgrenzungswert; beide bleiben eigene Owner unter dem Leberwerte-Umbrella.
- Harnsäure: Laborwert-Owner mit canonicalIntentOwner /beschwerden/gicht/; erhöhter Wert ≠ Gicht ausdrücklich.
- Kalium: Sicherheitsseite (Hämolyse-Artefakt prominent, keine individuellen Grenzwerte, keine Elektrolyt-Eigenmanipulation, Dringlichkeit klar benannt).
- Schröpfmassage: ehrlich als Variante des trockenen Schröpfens deklariert; Schröpfen-Head und Wirkung/Flecken-Intents bleiben bei ihren Ownern (Phase 3 unangetastet).
- Shiatsu-Selbstbehandlung: Self-Care-Grenzen + Tabuzonen + Abklärungs-Schwelle; Shiatsu-Head bleibt Therapie-Owner.

## Hub / Suche / Technik

- Befunde-Hub: 8 neue Leaves automatisch in der bestehenden Kategorien-Logik (Laborwerte); bewusst KEIN Hub-Redesign in neue Untergruppen (bestehendes System beibehalten, im Cohort-Log als mögliche spätere Strukturverbesserung notiert).
- Suche: 258→**260** Einträge gesamt (+8 Befunde automatisch, +2 Wissen-Artikel über neue kuratierte METHODEN_ARTIKEL-Liste, Gruppe "Therapien"); 11 SYNONYMS-Einträge (inkl. GGT/ALAT/ASAT/AP/Hyperkaliämie/Cobalamin).
- Sitemap: 457 → **467** (+10). Alle 10: 200, self-canonical, indexierbar, unique Title/H1/Meta, Schema nach Bestand, keine Orphans, keine Em-Dashes.
- health-audit: 0 Orphans / 0 doppelte Titel / 0 kaputte Referenzen. Renders 1440/390 auf 6 Samples sauber.
- Keine Quellenlisten erfunden (Projekt-Konvention: vorsichtige Formulierung statt unverifizierbarer Zitate); suggestedReviewerType dokumentiert ärztlichen Review-Bedarf pro Befund-Seite.
- Tracking/Booking/Canonical-Architektur: unverändert.

## Indexierung

Natural crawl only. Manual URL indexing: NO. URLs nicht in seo/index-queue.md.
