# Audit 29.10.2026: acht Beschwerden-Orientierungsseiten (A-Kandidaten)

**Stand 29.10.2026: integriert und zum Merge freigegeben (Abschnitt 11).** Ursprünglich Draft-PR. Basis: main `caca1e74` (am 29.10.2026 geprüft, seit dem Audit unverändert). Grundlage: «TCM.ch SEO-Audit – 29.10.2026», A-Kandidaten 01 bis 08. Keine ärztliche Freigabe, kein Reviewer, kein Publikationsdatum behauptet.

**Review-Runde 29.10.2026** (Folgecommits `c40c5029`, `1b6fe7a9`, dieser Bericht): WhatsApp-Prefill generisch (Abschnitt 8a), Erratum PMID 35774887 gelesen (Abschnitt 3), Evidenzformulierungen nach Fundlage getrennt (Abschnitt 4), Orphan-Befund erklärt (Abschnitt 8). Weiterhin Draft, Integrations-Patch nicht angewendet.

## 0. Ergebnis in Kürze

- **Aufgenommen:** alle 8 A-Kandidaten als `/beschwerden/`-Seiten. Zurückgestellt wurde keiner; Ersatzthemen gibt es nicht.
- **Darstellung:** alle 8 als reine Orientierung, gleich wie die Orientierungsseiten der Bibliothek 26.10.2026 (`INFO_ONLY_SLUGS`). Kein Behandlungsangebot, keine Standort-Karten, kein Badge «Behandlung verfügbar», generischer WhatsApp-Text «Guten Tag, ich habe eine Frage zu Ihrem Angebot.» (Abschnitt 8a), kein FAQPage-Schema, Sticky-Leiste aus.
  - Grund: Für keine der acht Diagnosen ist eine krankheitsspezifische Kompetenz in den kanonischen Daten dokumentiert.
  - Akupunktur (alle Standorte) und Physiotherapie (8 Standorte) sind zwar verfügbar, begründen aber kein Angebot zur jeweiligen Diagnose.
- **Bestand eingefroren:** Kein bestehender Artikel ist verändert, weder Text noch Title, Meta, H1, FAQ, Datum, Keywords oder CTAs.
  - Die Kontextlinks liegen als **nicht angewendeter Integrations-Patch** vor: `seo/beschwerden-a8-2026-10-29-integration.patch`, Abschnitt 6.
- **Registrierungen** (Hub A–Z, Körperregionen, Suche, Map, Guards, Queue) stehen in einem eigenen Commit, getrennt von den Seiten (Abschnitt 7).
- **Wichtig:** Der Draft-Stand ist **nicht veröffentlichungsfähig**.
  - Ohne Patch haben die neuen Seiten keine Kontextlinks aus Bestandsartikeln.
  - Zwei Seiten (chronische postoperative Schmerzen, Lichen simplex) erscheinen im Health-Audit unter `orphans`: Sie haben im Draft keinen einzigen gezählten Content-Link (keine Körperregion, Hub-Links zählen technisch nicht). `orphans` ist eine Kennzahl ohne Gate-Wirkung; deshalb meldet das Gate trotzdem 0 Fehler (Abschnitt 8).
  - Im separaten Test-Worktree mit angewendetem Patch sind alle acht Seiten mit je zwei Kontext-Hosts verlinkt und nicht verwaist (Abschnitt 8).
- **Release-Zustand:** Beschwerden-Leaves tragen kein Datum und haben keine Publikationskonstante. Queue «Geplant», kein GSC-Submit.

## 1. Vorprüfung

- **Repo-Regeln:**
  - CLAUDE.md gelesen: Du-Form, keine energetische Sprache, kein Heilversprechen, Queue-Pflicht, Kontextlink-Regel.
  - Muster «Angebotsdarstellung» aus `seo/bibliothek-2026-10-26.md`, Abschnitt 2a, übernommen.
- **HEAD und main:** main `caca1e74` (Merge #89), Branch `claude/beschwerden-a8-2026-10-29` neu ab main. Seit dem Audit keine weiteren Merges.
- **Offene PRs:** #38 (SG-Hero-Pilot), #15 (KK/Erster Termin) und #1 (Cloudflare-Konfiguration). Keiner berührt Beschwerden-Leaves, Hub, Suche, Map-Zeilen der Nachbarn oder die acht Slugs.
- **Ownership** (Map, Do-not-create, gebaute Seiten):
  - Keiner der acht Slugs existiert, keine primäre oder sekundäre Zuweisung kollidiert.
  - Bei Lichen planus ist «Lichen simplex (kein Owner)» ausdrücklich als nicht reserviert vermerkt.
- **Vorhandene Inhalte:**
  - **Sprunggelenkschmerzen:** nennt Arthrose als eine Ursache in einem Absatz. Die neue Seite behandelt die diagnostizierte OSG-Arthrose mit Abklärung, Schuhversorgung, Spritzen, Umstellung, Versteifung und Prothese.
  - **Zyklusbeschwerden:** nennt ausbleibende Perioden in einem Satz. Die neue Seite deckt die Definition, die Abklärungsschritte und die Ursachen ab.
  - **PMS:** nennt Brustspannen als Symptom.
  - **Lichen planus:** nennt den Lichen simplex als Differenzialdiagnose.
  - Für AC-Gelenkarthrose, Omarthrose, Intersektionssyndrom und chronische postoperative Schmerzen gibt es im Bestand keine Erwähnung.
  - Gelenkspezifische Arthrose-Owner gibt es bereits als Muster: Gonarthrose, Koxarthrose, Rhizarthrose.

## 2. Aufnahme-/Ausschlussentscheid je Kandidat

| Nr | Seite | Eigenständiger Intent und Mehrwert gegenüber Bestand | Wissenschaftliche Evidenz (Diagnose) | TCM-Evidenz (indikationsspezifisch, PubMed 29.10.2026) | Verfügbare Methode / dokumentierte Kompetenz | Entscheid |
|---|---|---|---|---|---|---|
| 01 | AC-Gelenkarthrose | eigenes Gelenk, kein Bestand; Abgrenzung zur Omarthrose und zu Sehnen, Bildbefund vs. Beschwerden, Testinjektion | SR 2024 (48 Studien, keine gesicherte Wirksamkeit), SR 2022 Prävalenz, CH-Klinik | 0 Treffer | Akupunktur/Physio allgemein; keine Kompetenz dokumentiert | aufnehmen, Orientierung |
| 02 | Omarthrose | Glenohumeralgelenk, kein Bestand; Abgrenzung zu AC, Frozen Shoulder, Rotatorenmanschette; Prothesenwege | APTA-Leitlinie 2023, AAOS-Leitlinie 2020, CH-Klinik | 18 Treffer, keine kontrollierte Studie zur Omarthrose; 1 Fallbericht Gelenkinfekt | wie 01 | aufnehmen, Orientierung |
| 03 | Sprunggelenksarthrose | diagnostizierte OSG-Arthrose (Bestand nur ein Ursachen-Absatz) | Review 2022, CH-Universitätsklinik Balgrist | 1 RCT (78 P., EA + Training vs. Training, ohne Scheinkontrolle), 1 Protokoll, sonst Tierversuche | wie 01 | aufnehmen, Orientierung |
| 04 | Intersektionssyndrom | eigenes Syndrom, kein Bestand; Abgrenzung zu De Quervain | narrative Übersicht 2017, Ultraschallstudie 2014 (Fallserien) | 0 Treffer | wie 01 | aufnehmen, Orientierung (Datenlage dünn, im Text benannt) |
| 05 | Chronische postoperative Schmerzen | chronische Schmerzdiagnose nach ICD-11; Bestand behandelt nur akute Phase, Terminfrage und Narben | Insel-Studie (PAIN OUT), BJA Educ 2022, SR 2017 (66 RCTs, keine ausreichende Evidenz) | 22 Treffer; SR 2017 schliesst Akupunktur ein (nicht ausreichend); 1 RCT zur perioperativen Vorbeugung, nicht übertragbar | wie 01 | aufnehmen, Orientierung |
| 06 | Mastodynie | Brustdrüsenschmerz, kein Owner; Abgrenzung zu PMS, Brustwand und Herz | USZ-Autor:innen 2018, NHS, SR 2018, Empfehlungen 2015 | 36 Treffer; SR: Akupunktur ohne gute Belege; 1 Pilotstudie ohne Kontrolle; 2 Protokolle ohne Ergebnisse; Mastopathie-Studien nicht übertragbar | Akupunktur allgemein; keine Kompetenz dokumentiert | aufnehmen, Orientierung |
| 07 | Sekundäre Amenorrhoe | Definition, Abklärung und Ursachen; Bestand nur ein Satz | AFP 2019, Endocrine Society 2017, ESHRE 2024, USZ, NHS | 6 Treffer: Fallberichte, alte Laborstudien, keine kontrollierte Ergebnisstudie | Akupunktur allgemein; keine Kompetenz dokumentiert | aufnehmen, Orientierung, ausdrücklich ohne «Hormonregulation» |
| 08 | Lichen simplex chronicus | eigenes Krankheitsbild, kein Owner; Abgrenzung zu Neurodermitis und Lichen planus | DermNet, MSD Manual, EU-S2k-Leitlinie Pruritus 2025, Review 2025 | 19 Treffer; 3 SR chinesischer Studien (Akupunktur, Feuernadel, blutiges Schröpfen), niedrige Qualität, ohne Scheinkontrolle | Akupunktur/Schröpfen allgemein; keine Kompetenz dokumentiert | aufnehmen, Orientierung |

**Nicht gemessen:** Suchvolumen, Keyword-Difficulty, Rankings und erwartete Buchungen; Semrush hat keine API-Einheiten. Die Aufnahme beruht auf dem Informationsnutzen, nicht auf Nachfrage oder Buchungsabsicht.

## 3. Quellenmatrix

Zugang: **V** = Volltext gelesen, **T** = Teile gelesen, **A** = nur Abstract. PubMed-Datensätze aller zitierten PMIDs am 29.10.2026 per E-utilities geprüft (CommentsCorrections): keine Retraction. PMID 34271271 hat einen Kommentar (CommentIn). PMID 32577471 (Moody 2020) hat ein Erratum (PMID 35774887, Arthroplast Today 2022, doi 10.1016/j.artd.2022.01.016, PMC9237239). **Erratum am 29.10.2026 im PMC-Volltext gelesen:** Der Verlag hatte wegen eines technischen Fehlers die Erklärung zur Patienteneinwilligung nicht veröffentlicht; die Autoren bestätigen eine schriftliche Einwilligung unter IRB-Genehmigung (File # 09-19-24EX). Befunde, Fallangaben, Zahlen und Schlussfolgerungen werden nicht geändert. **Betroffene Aussagen:** nur Seite 05, ein Satz im TCM-Abschnitt plus Quellenliste und diese Matrix. Beim Gegenlesen fiel unabhängig vom Erratum eine Ungenauigkeit auf: Das Abstract beschreibt nach Dry Needling **einen** Fall (der zweite folgte auf Nervenblockaden). Der Satz lautete «einzelne Infektionen», jetzt «ist eine Infektion einer Knieprothese als Fallbericht beschrieben» (Commit `1b6fe7a9`).

| Seite | Quelle | Zugang | Verwendete Aussagen |
|---|---|---|---|
| 01 | Hirslanden Klinik Im Park: AC-Gelenksarthrose | V | Lage, Häufigkeit im Alter, Stürze, Ausstrahlung Nacken/Oberarm, Kortisoninfiltration, arthroskopische Entfernung, Bewegungstherapie danach |
| 01, 02 | AAOS OrthoInfo: Arthritis of the Shoulder | V | GH- vs. AC-Gelenk, Schmerzort, Nachtschmerz, Krepitation, Röntgen und Beschwerden, Testinjektion, Physio, NSAR, Kortison, Wärme/Kälte; Gelenkschmiere nicht empfohlen, Glucosamin wenig belegt; Arthroskopie, Prothesen, Schlüsselbeinresektion |
| 01 | Welch et al. 2024, SR (PMC11034467) | V | 48 Studien, Injektion 6,4 auf 3,0 (VAS) bei etwa 7,5 Monaten, Wirkdauer variabel, Physio 1 Studie, Resektion 0,5–2 cm, offen = arthroskopisch, Tests sensibel/unspezifisch, MRT nicht routinemässig, Fazit ohne gesicherten Wirksamkeitsnachweis, rund 6 Monate konservativ |
| 01 | Rossano et al. 2022, SR (PMID 35638093) | A | 70 % der MRT asymptomatischer Schultern und 48 % der Präparate mit AC-OA-Zeichen; Diagnose zurückhaltend stellen |
| 01 | Precerutti et al. 2020 (PMID 32671655) | A | Testinjektion zur Unterscheidung, Ultraschall |
| 01, 02 | NHS: Shoulder pain | V | Warnzeichen und Dringlichkeit |
| 02 | Schulthess Klinik: Schulterprothese | V | Anatomie, Osteophyten, Ursachen der Gelenkzerstörung, Röntgen/Ultraschall/MRT/CT, Indikation Prothese, anatomisch vs. invers, Physio 3–6 Monate, Infekt etwa 1 %, Nervenverletzung etwa 1 % |
| 02 | APTA-Leitlinie 2023 (PMC10256270) | V | Physio ohne OP sinnvoll (Best Practice), keine Methode überlegen; Leitsymptome, Aussendrehung; Akupunktur nur als Beispiel ohne Bewertung |
| 02 | AAOS-Leitlinie 2020 (PMID 32986386) | A | Leitlinie mit 13 Empfehlungen, Forschungsbedarf nicht operative Verfahren |
| 02 | Fallbericht 1997 (PMID 9415915) | A | Gelenkinfekt der Schulter nach Akupunktur (Einzelfall) |
| 03 | Universitätsklinik Balgrist: Sprunggelenkarthrose | V | etwa 1 % Bevölkerung, dreifache Kraft, drei von vier nach Bruch, 13 % Instabilität, Anlaufschmerz, Röntgen, Pufferabsatz/Abrollhilfe, Kortison, Hyaluron/PRP, Arthroskopie, Osteotomie, Arthrodese vs. Prothese, Nachbehandlung |
| 03 | Herrera-Pérez et al. 2022 (PMC9297055) | V | belastetes Röntgen, CT/MRT, jüngeres Alter, 10–20 Jahre bis fortgeschritten, Gewicht, Gels, Kortison 4–8 Wochen, Keil-Einlagen ohne Effekt, Arthrodese vs. Prothese ohne deutlichen Unterschied |
| 03 | Jiang et al. 2025, RCT (PMID 39973276) | A | 78 P., EA + Krafttraining vs. Krafttraining, keine Scheinbehandlung |
| 03, 04 | NHS: Sprains and strains | V | Notfall- und Dringlichkeitszeichen nach Verletzungen |
| 04 | Balakatounis et al. 2017 (PMC5565493) | V | Anatomie 1./2. Fach, 60°, 4–8 cm, Inzidenz 0,2–0,37 %, Sportarten, Symptome, Abgrenzung De Quervain, Differenzialdiagnosen, Ultraschall/MRT, Phasen, Schiene 20° für 2–3 Wochen, Kortison nach 2–3 Wochen, Nebenwirkungen, Operation, etwa 60 % konservativ, mindestens 12 Wochen nach OP |
| 04 | Draghi et al. 2014 (PMID 24337446) | A | 1,9 % der Ultraschalluntersuchungen in einer Klinik |
| 05 | Insel Gruppe Bern, Medienmitteilung 16.02.2023 | V | ICD-11 seit 2022, über 3 Monate, 2'319 Operierte, 8,6 % bzw. 3,3 %, frühere 14–68 %, Lebensqualität, nicht jeder Schmerz nach OP stammt von der OP |
| 05 | Rosenberger und Pogatzki-Zahn 2022 (PMC9039436) | V | ICD-11-Definition, Ausschlüsse, neuropathische Merkmale, Raten je Eingriff, Risikofaktoren, Vorbeugung (Regionalanästhesie, Opioide), multidisziplinär |
| 05 | Wylde et al. 2017, SR (PMID 28681962) | A | 66 RCTs, untersuchte Verfahren inkl. Akupunktur, keine ausreichende Evidenz |
| 05 | Lu et al. 2021, RCT (PMID 34271271) | A | 576 Frauen, TEAS vor Mastektomie zur Vorbeugung (perioperativ, nicht Behandlung) |
| 05 | Moody et al. 2020 (PMID 32577471); Erratum PMID 35774887 | A; Erratum V | eine Infektion einer Knieprothese nach Dry Needling (Fallbericht); Erratum nur Einwilligungserklärung |
| 06 | Talimi-Schnabel, Frauchiger Heuer, Fink (USZ), Ars Medici 2018 | V | bis 70 % der Frauen, drei Formen mit Anteilen, Symptome, Ursachen, Anamnese, Kalender, Bildgebung, 1,2 % Karzinom ohne Tastbefund, BH, Kühlen, NSAR, Ernährung unklar, Mönchspfeffer mindestens 3 Monate, Hormone, Danazol/Tamoxifen nur schwer, OP meiden, Remission 20–30 % |
| 06 | NHS: Breast pain | V | Zyklusverlauf, Auslöser, Ibuprofen/Paracetamol, Gel, BH, Vitamin E/Nachtkerze kaum belegt, Warnzeichen |
| 06 | Hafiz et al. 2018, SR (PMID 31039960) | A | Gels lindern bei 70–92 %, Akupunktur ohne gute Belege |
| 06 | Ngô et al. 2015, Empfehlungen (PMID 26541567) | A | Beruhigung, BH, NSAR-Gel, MRT nicht bei unauffälliger Mammografie/Sonografie |
| 06 | Ooi et al. 2020, SR (PMID 31464546) | A | Mönchspfeffer vs. Placebo, unklares Verzerrungsrisiko |
| 06 | Thicke et al. 2011, Pilotstudie (PMID 22083985) | A | 37 eingeschlossen, 22 abgeschlossen, ohne Kontrollgruppe |
| 07 | Klein, Paradise, Reeder 2019, American Family Physician | V | Definition 3/6 Monate, primär bis 15 Jahre, Schwangerschaftstest zuerst, Anamnese, Labor, Bildgebung, Knochendichte, Behandlung je Ursache, Warnzeichen |
| 07 | Gordon et al. 2017, Endocrine Society | V | FHA als Ausschlussdiagnose, Labor, MRT-Indikationen, Energiebilanz, KVT, keine Pille allein für Blutung/Knochen, DXA nach 6 Monaten, Klinikindikationen |
| 07 | ESHRE/ASRM/IMS 2024, POI-Leitlinie (PMID 39660328) | A | Prävalenz 3,5 %, einmal FSH > 25 IE/l, bei Unsicherheit Wiederholung oder AMH |
| 07 | USZ: Sprechstunde gynäkologische Endokrinologie | V | Sprechstunde für primäre und sekundäre Amenorrhoe, Anmeldung oder Zuweisung |
| 07 | NHS: Missed or late periods | V | Verhütung, Perimenopause 45–55, chronische Krankheiten, PCOS heisst neu PMOS |
| 07 | Liu et al. 2022 (PMID 35101572) | A | Kräuter bei Amenorrhoe durch Psychopharmaka, ohne Kontrollgruppen |
| 08 | DermNet: Lichen simplex | V | Synonyme (neurodermatitis), Frauen 2:1, 30–50 Jahre, Auslöser, Lokalisation, Abklärung, Differenzialdiagnosen inkl. Hautkrebs, Behandlung, Verlauf |
| 08 | MSD Manual Profi (DE): Lichen simplex chronicus | V | Juck-Kratz-Zyklus, Angst/Stress, Atopie, Lokalisation (nicht mittlerer Rücken), Lichen planus als Hauptdifferenzialdiagnose, Kortison/Okklusion, Antihistaminika, Capsaicin |
| 08 | Weisshaar et al. 2025, EU-S2k-Leitlinie Pruritus (PMC12529596) | T | chronisch ab 6 Wochen, allgemeine Massnahmen (Pflege, Entspannung, Schulung), Verhaltenstherapie gegen Kratzen; Teile gelesen: Definition, Tabellen 5/10, Abschnitte 6.3–6.4 |
| 08 | Moshkovich et al. 2025 (PMID 40855389) | A | Schlafstörung, Kältetherapie/Laser/Botulinumtoxin/systemisch bei hartnäckigen Fällen |
| 08 | Yang 2022, Qiu 2025, Zhai 2024, SR (PMID 36091587, 41357504, 39748922) | A | 8/10/19 chinesische Studien, meist zusätzlich zu Standard vs. Standard, ohne Scheinkontrolle, Qualität niedrig |

**Balgrist-URL:** Der im Audit genannte Host `iframe.balgrist.ch` liefert zwar Inhalt, deklariert aber sich selbst als canonical; den Host aus der zweiten Audit-Quelle (`iframe2.balgrist.ch`, Kandidat 09) haben wir nicht geprüft. `https://www.balgrist.ch/angebot/fachbereiche/fuss-und-sprunggelenkchirurgie/sprunggelenkarthrose/` antwortet am 29.10.2026 mit 200 und gleichem Inhalt (11'666 Zeichen) und deklariert sich selbst als canonical. Verwendet wird nur diese URL. Die Instabilitäts-Seite (Kandidat 09) wurde nicht gebraucht.

**Nicht verwendet:**
- NCBI Bookshelf (StatPearls) und die IASP-Definitionsseite: im Abruf durch Captcha bzw. 403 blockiert. Ersetzt durch die Übersicht 2017 bzw. durch Insel-Studie und BJA Educ.
- Hirslanden-PDF zur Mastodynie: nicht gelesen, daher nicht zitiert.

## 4. TCM-Evidenzsuche (PubMed, 29.10.2026)

Je Kandidat dieselbe Methodenliste: `(acupuncture OR electroacupuncture OR "dry needling" OR moxibustion OR cupping OR "Chinese herbal" OR "traditional Chinese medicine")[tiab]`, kombiniert mit den Diagnosebegriffen. Treffer: 01: 0 · 02: 18 · 03: 11 · 04: 0 · 05: 22 · 06: 36 · 07: 6 · 08: 19. Ergänzend gezielte Suchen zu den Leitlinien und Übersichten (Abschnitt 3).

**Suchdokumentation (Review 29.10.2026):**
- **Datum:** 29.10.2026. **Datenbank:** nur PubMed (NCBI E-utilities, `esearch` + `esummary`). Nicht durchsucht: Cochrane Library, Embase, CNKI/chinesische Datenbanken, Studienregister, graue Literatur.
- **Feld:** Titel/Abstract (`[tiab]`), keine MeSH-Explosion, keine Sprach- oder Datumsfilter.
- **Zugriffsebene:** Trefferlisten (Titel, Publikationstyp, Jahr) aller Treffer gesichtet. Gelesen wurden nur die im Text genannten Arbeiten, Zugang je Quelle in Abschnitt 3 (meist Abstract). Kein Volltext-Screening aller Treffer.
- **Suchbegriffe je Seite** (jeweils `AND` Methodenliste oben):

| Nr | Diagnosebegriffe | Treffer |
|---|---|---|
| 01 | `acromioclavicular[tiab] AND (osteoarthritis[tiab] OR arthrosis[tiab] OR arthropathy[tiab])` | 0 |
| 02 | `glenohumeral[tiab] OR omarthrosis[tiab] OR "shoulder osteoarthritis"[tiab] OR "shoulder arthritis"[tiab]` | 18 |
| 03 | `"ankle osteoarthritis"[tiab] OR "ankle arthritis"[tiab] OR "ankle arthrosis"[tiab] OR talocrural[tiab]` | 11 |
| 04 | `"intersection syndrome"[tiab]` | 0 |
| 05 | `"chronic postsurgical pain" OR "chronic post-surgical pain" OR "persistent postsurgical pain" OR "chronic postoperative pain" OR "persistent postoperative pain"` (je `[tiab]`) | 22 |
| 06 | `mastalgia[tiab] OR mastodynia[tiab] OR "breast pain"[tiab]` | 36 |
| 07 | `"secondary amenorrhea" OR "secondary amenorrhoea" OR "hypothalamic amenorrhea" OR "hypothalamic amenorrhoea"` (je `[tiab]`) | 6 |
| 08 | `"lichen simplex"[tiab] OR neurodermatitis[tiab]` | 19 |

**Einordnung der Fundlage** (die Texte unterscheiden diese vier Fälle; «Evidenz für fehlenden Nutzen» trifft auf keine Seite zu):

| Nr | Kategorie | Formulierung im Text (nach Review) |
|---|---|---|
| 01, 04 | keine passende Studie in der dokumentierten Suche gefunden | «haben wir keine Studie zu dieser Diagnose gefunden. Ob Akupunktur … hilft, können wir deshalb nicht beurteilen.» |
| 02, 07 | keine kontrollierte Ergebnisstudie gefunden (nur Fallberichte, Laborstudien, Tierversuche, andere Diagnosen) | «… keine kontrollierte Studie … gefunden … Ob … hilft, lässt sich damit nicht beurteilen.» |
| 03 | vorhandene Studie mit unsicherem Ergebnis (1 kleine RCT ohne Scheinkontrolle) | unverändert: «Eine einzelne kleine Studie reicht nicht für einen Wirksamkeitsnachweis.» |
| 05 | vorhandene Studien mit unsicherem Ergebnis (SR 2017: Evidenz unzureichend, um zu urteilen) | «Ob Akupunktur bei bereits bestehenden … hilft, ist damit offen.» |
| 06 | vorhandene Studien mit unsicherem Ergebnis (SR 2018: möglicherweise nützlich, ohne gute Belege; Pilotstudie ohne Kontrolle) | «Ob Akupunktur bei Mastodynie hilft, ist damit offen.» |
| 08 | vorhandene Studien mit unsicherem Ergebnis (3 SR, niedrige Qualität, ohne Scheinkontrolle) | unverändert: «höchstens Hinweise; ein Wirksamkeitsnachweis ist das nicht.» |

Korrigiert wurden nur die sechs Sätze «Ein Nutzen bei … ist damit nicht belegt», die aus einer begrenzten Suche eine pauschale Aussage machten, sowie die Suchbegriffe in 06, 07 und 08 (Dry Needling war Teil der Suche, stand aber nicht im Text). Map- und Do-not-create-Notizen entsprechend (z. B. «In der dokumentierten PubMed-Suche (29.10.2026) keine passende Akupunktur-/TCM-Studie gefunden; kein Beleg für fehlenden Nutzen»).

Grundsatz: Evidenz anderer Erkrankungen wird nicht übertragen. Das gilt für Knie- oder Hüftarthrose bei 01 bis 03, PCOS bei 07, atopische Dermatitis bei 08, akute postoperative Schmerzen bei 05 und Mastopathie bei 06. Wo eine Studie die Zeit der Operation betrifft (05) oder einen anderen Fachbegriff verwendet (08: englisch «neurodermatitis» = Lichen simplex), steht das im Text.

## 5. Ownership- und Synonymprüfung

| Seite | Echte Synonyme (Hub-Alias, Suche, Map) | Nicht reserviert, bleibt bei | Kollision |
|---|---|---|---|
| 01 | AC-Gelenksarthrose, ACG-Arthrose, Akromioklavikulargelenksarthrose, Schultereckgelenkarthrose | Omarthrose, Schulterschmerzen, Rotatorenmanschette, Kalkschulter; AC-Gelenk-Verletzung (kein Owner) | keine |
| 02 | Schulterarthrose, Schultergelenksarthrose, Glenohumeralarthrose | AC-Gelenkarthrose, Frozen Shoulder, Rotatorenmanschette, Arthrose allgemein; Schulterprothese (kein Owner) | keine |
| 03 | Sprunggelenkarthrose, OSG-Arthrose, Arthrose oberes Sprunggelenk, tibiotalare Arthrose | Sprunggelenkschmerzen (inkl. Instabilität), Arthrose allgemein; USG-Arthrose (kein Owner) | keine |
| 04 | Intersection Syndrome | Sehnenscheidenentzündung/De Quervain/Mausarm, Rhizarthrose | keine |
| 05 | chronische Schmerzen nach Operation/OP, CPSP, persistierende postoperative Schmerzen (nur mit «chronisch») | akute Phase und Akupunktur (`/wissen/akupunktur-bei-schmerzen-nach-operation/`), Terminfrage (`/gesundheitsbibliothek/fragen/akupunktur-nach-operation/`), Narbenbehandlung (`/wissen/narbenbehandlung/`), Nervenschmerzen; Phantomschmerz (kein Owner) | keine |
| 06 | Mastalgie, zyklische Brustschmerzen, Brustschmerzen vor der Periode, Brustdrüsenschmerzen; bewusst **nicht** «Brustspannen» (PMS-Symptom) | PMS, Costochondritis, Interkostalneuralgie, Druck auf der Brust; Mastitis/Mastopathie (kein Owner) | keine |
| 07 | sekundäre Amenorrhö, Amenorrhoe, Amenorrhö, ausbleibende Periode, Periode bleibt aus | Zyklusbeschwerden (unregelmässiger Zyklus), PCOS, Wechseljahre, Kinderwunsch, Prolaktin erhöht; primäre Amenorrhoe und POI (kein Owner) | keine; Hub-Alias Zyklusbeschwerden enthält keine dieser Formen |
| 08 | Lichen simplex, Neurodermatitis circumscripta (englischer Fachbegriff), lichenifiziertes Ekzem; **nicht** «Neurodermitis», «Lichen planus», «Knötchenflechte» | Neurodermitis, Lichen ruber planus, brachioradialer Pruritus; Prurigo nodularis und chronischer Juckreiz allgemein (kein Owner) | keine; das Prüfskript sperrt diese Synonyme in beide Richtungen |

Gegen offene PRs (#38, #15, #1): keine Überschneidung mit diesen Slugs, Synonymen oder Nachbar-Ownern.

## 6. Integrations-Linkplan (separat, NICHT angewendet)

Datei: `seo/beschwerden-a8-2026-10-29-integration.patch`. Die 14 Bestandsquellen bleiben in diesem PR unverändert. Der Patch fügt je Host einen kurzen Absatz direkt nach dem genannten Ankerabsatz ein, mit derselben Absatzformatierung. Bei Lichen planus setzt er stattdessen nur einen Link auf die bestehende Erwähnung.

| Neue Seite | Host 1 (Anker → Vorschlag) | Host 2 (Anker → Vorschlag) |
|---|---|---|
| AC-Gelenkarthrose | `/beschwerden/schulterschmerzen/` nach «Verschleiss und Kalkeinlagerungen»: «Verschleiss kann auch die Gelenke selbst betreffen: die AC-Gelenkarthrose oben am Schulterdach und die Omarthrose im eigentlichen Schultergelenk.» | `/beschwerden/rotatorenmanschette/` nach «Verschleiss ab 40»: «Sitzt der Schmerz eher punktgenau oben auf der Schulter, kann auch das Schultereckgelenk die Quelle sein; mehr dazu unter AC-Gelenkarthrose.» |
| Omarthrose | `/beschwerden/schulterschmerzen/` (derselbe Absatz wie oben) | `/beschwerden/arthrose/` nach «Arthrose betrifft am häufigsten Knie …»: «Seltener betroffene Gelenke haben eigene Seiten: die Omarthrose der Schulter und die Sprunggelenksarthrose, die meist Jahre nach einer Verletzung entsteht.» |
| Sprunggelenksarthrose | `/beschwerden/arthrose/` (derselbe Absatz) | `/beschwerden/sprunggelenkschmerzen/` nach «Arthrose. Nach mehreren Verletzungen …»: «Wie eine diagnostizierte Arthrose im oberen Sprunggelenk abgeklärt und behandelt wird, beschreibt die Seite Sprunggelenksarthrose.» |
| Intersektionssyndrom | `/beschwerden/sehnenscheidenentzuendung/` nach «Sehnen gleiten in Hüllen …»: «Liegt der Schmerz mit Reiben und Schwellung einige Zentimeter weiter oben auf der Daumenseite des Unterarms, kommt ein Intersektionssyndrom infrage.» | `/beschwerden/rhizarthrose/` nach «Schmerzt nicht die Daumenseite, sondern die Kleinfingerseite …»: «Liegt der Schmerz dagegen einige Zentimeter oberhalb des Handgelenks auf der Daumenseite des Unterarms, oft mit Reiben, kann ein Intersektionssyndrom dahinterstecken.» |
| Chronische postoperative Schmerzen | `/beschwerden/nervenschmerzen/` nach «Post-Zoster-Neuralgie»: «Chronische Schmerzen nach einer Operation. Hält ein Schmerz im Operationsgebiet oder entlang eines dort verlaufenden Nervs länger als drei Monate an, spricht man von chronischen postoperativen Schmerzen.» | `/gesundheitsbibliothek/fragen/akupunktur-nach-operation/` (`src/data/fragen-entscheidungen.ts`) nach «Nach Gelenk-, Rücken- oder Sehnenoperationen …»: «Halten Schmerzen nach der Operation länger als drei Monate an, ist das eine eigene Frage; mehr dazu unter Chronische Schmerzen nach einer Operation.» |
| Mastodynie | `/beschwerden/pms/` nach dem PMDS-Absatz: «Steht der Brustschmerz selbst im Vordergrund, etwa ein starkes Spannen vor der Periode oder einseitige Schmerzen, findest du mehr unter Mastodynie.» | `/beschwerden/costochondritis/` nach «Geht es dir primär um ein unklares Druckgefühl …»: «Schmerzt nicht die Brustwand, sondern die Brustdrüse selbst, oft im Rhythmus des Zyklus, hilft die Seite Mastodynie.» |
| Sekundäre Amenorrhoe | `/beschwerden/zyklusbeschwerden/` nach «Eine sehr starke oder plötzlich veränderte Blutung …»: «Bleibt die Periode drei Monate oder länger aus, obwohl sie vorher regelmässig kam, beschreibt die Seite Sekundäre Amenorrhoe die Abklärung vom Schwangerschaftstest bis zu den Hormonwerten.» | `/beschwerden/pcos/` nach «Zyklen, die dauerhaft länger als 35 Tage sind …»: «Welche anderen Ursachen hinter einer ausbleibenden Periode stecken können, beschreibt die Seite Sekundäre Amenorrhoe.» |
| Lichen simplex chronicus | `/beschwerden/brachioradialer-pruritus/` nach «Abzugrenzen ist Juckreiz am Arm allgemein …»: «Wird die juckende Stelle durch ständiges Kratzen dick und ledrig, spricht man von einem Lichen simplex chronicus.» | `/beschwerden/lichen-planus/`: bestehende Erwähnung «Der Lichen simplex ist verdickte Haut durch dauerhaftes Kratzen» erhält nur den Link |

**Korrektur 29.10.2026:** Ein Host ist EN-fingerprinted: `zyklusbeschwerden.html` ist DE-Quelle von `condition:menstrual-issues` (`src/data/i18n/fingerprints.json`). Nach der Integration meldet `check-i18n` dafür eine Outdated-Warnung (keine Failure); siehe Abschnitt 11. Alle Hosts sind Beschwerden-Leaves oder eine Bibliothek-Frage aus der Basis-Sitemap. Wird der Patch später angewendet, ändern sich genau diese 14 Bestandsseiten um je einen Absatz bzw. einen Link.

## 7. Registrierungen (separater Commit, keine Artikeländerung)

- **Routing (mit den Seiten, sonst HTTP 410):**
  - `public/beschwerden-keep.js`: 8 Slugs
  - `src/data/beschwerden.ts`: 8 Einträge
  - `src/pages/beschwerden/[slug].astro`: Title-/Meta-Map, `NO_FAQ_SCHEMA`, `REBRANDED_SLUGS`, `INFO_ONLY_SLUGS`
- **Hub A–Z** (`src/data/beschwerden-body.html`): 8 Zeilen ohne Badge, alphabetisch. Der Name der Zeile 05 lautet «Chronische Schmerzen nach einer Operation».
- **Körperregionen** (`src/data/gesundheitsbibliothek.ts`):
  - Schulter, Arm und Hand: 01, 02, 04
  - Hüfte, Bein und Fuss: 03
  - Zyklus und Hormone: 06, 07
  - 05 und 08 haben keine passende Region; es gibt keine Region «Haut».
- **Suche:** 8 Synonymeinträge, nur echte Synonyme (Abschnitt 5).
- **SEO-Daten:**
  - `seo/master-keyword-url-map.csv` und `seo/do-not-create-intents.csv`: je 8 Zeilen
  - `seo/index-queue.md`: 8 URLs unter «Geplant»
  - `seo/health-library-audit.json`: neu erzeugt
- **Sitemap:** entsteht beim Build (966 URLs; main 958).

## 8. Prüfungen

Stand nach Review-Runde: Branch-HEAD `1b6fe7a9` auf Basis `caca1e74`; frischer Branch-Build, frischer main-Build und frischer Build des bisherigen PR-Stands `653a1bbe` (je separater Worktree) am 29.10.2026.

### Draft-Stand (dieser PR)

- **Kohortenprüfung** `node scripts/check-beschwerden-a8-2026-10-29.mjs --base-sitemap=<main-Build caca1e74>/sitemap.xml`: OK. Geprüft wird:
  - Route, eine H1, Canonical auf sich selbst, indexierbar, Title und Meta eindeutig (Meta höchstens 160 Zeichen)
  - mindestens 2 sichtbare Quellen, 3 FAQ
  - kein FAQPage-, Datums- oder Reviewer-Schema, BreadcrumbList vorhanden
  - keine energetische Sprache, kein ß, keine Gedankenstriche im redaktionellen Text, Link-Ziele und Anker vorhanden
  - Orientierungsdarstellung: kein Angebotsbaustein, Hero-Schritt Abklärung, allgemeiner Kontakt, Sticky aus, Formular erhalten, WhatsApp-Text exakt «Guten Tag, ich habe eine Frage zu Ihrem Angebot.» ohne H1, Slug oder URL, Marker `data-wa-neutral` vorhanden, Nummer unverändert (Gegenprobe: Marker entfernt bzw. Text mit Diagnose → Fehler gemeldet)
  - inhaltliche Grenzen des Auftrags; Lichen-simplex-Synonymsperre; kanonische Balgrist-URL
  - Hub, Keep-Liste, Suche, Map, Guards, Queue, Sitemap
  - Bestandsschutz: 0 Kontext-Hosts im Bestand, alle 14 Host-Dateien identisch mit `origin/main`, Patch per `git apply --check` anwendbar und mit mindestens 2 Host-Links je Seite
- **Regression der übrigen Kohorten:** check-wissen-cluster, check-wissen-neun, check-artikel-2026-10-24 und -25, check-bibliothek-2026-10-26, check-trauma-2026-10-27: alle OK.
- **Gates:**
  - health-audit: Hub 226 Zeilen, Wissen-Serie 59 Slugs, Ownership-Gate, 0 Fehler
  - check-kontakt-formular, check-clinic-status, check-standort-ux, check-first30, check-professional, check-herbst-sg: 0 Fehler
  - test-en-analytics 48/0, test-anfrage-betreff 92/0, test-hero-video 124/0
  - check-i18n mit Build-Sitemap: outdated 0, failures 0
- **Verschachtelung:** alle 8 neuen Leaves ohne Fehlverschachtelung; der Kontaktbereich liegt in `#page-symptom`.
- **Mobile Darstellung:** 8 Seiten plus Beschwerden-Hub und 3 Körperregionen bei 320/390/1440 px: 36 Aufrufe, 0 Überläufe, je eine H1, 0 JS-Fehler. Sichtprüfung: Mastodynie 320, AC-Gelenkarthrose 1440, Amenorrhoe 390.
- **Health-Audit, Orphan-Befund (Draft) – warum trotzdem 0 Fehler:**
  - `orphans` ist eine **separate Kennzahl**, kein Gate. `scripts/health-audit.mjs` zählt je indexierbarer Seite die eingehenden `href`-Links aus dem Inhalt anderer Seiten (Header, Footer, `<nav>` und Mobile-Drawer `#siteDrawer` vorher entfernt). Seiten mit 0 landen in `orphans` (Konsole und `seo/health-library-audit.json`). Daran hängt kein `exitCode`.
  - `exitCode = 1` setzen nur die Gates: Beschwerden-Hub-Konsistenz (226 Zeilen), Akupunktur-bei-Serie inkl. deren Inbound-Pflicht (59 Slugs) und Ownership (Pins/Retired). Die acht neuen Seiten fallen unter keine Inbound-Pflicht. «0 Fehler» heisst also: diese Gates bestanden. Es heisst nicht: keine verwaisten Seiten.
  - Warum gerade diese zwei: Die Hub-Zeilen A–Z verlinken per `onclick="nav('symptom','…')"`, nicht per `href`, und zählen deshalb nicht; der Bibliothek-Suchindex zählt ebenfalls nicht. Gezählte Draft-Inbound-Links: AC-Gelenkarthrose 2 (Körperregion Schulter-Arm-Hand, Omarthrose), Omarthrose 2 (Region, AC-Gelenkarthrose), Sprunggelenksarthrose 1 (Region Hüfte-Bein-Fuss), Intersektionssyndrom 1 (Region Schulter-Arm-Hand), Mastodynie 1 und Amenorrhoe 1 (Region Zyklus und Hormone), **CPSP 0, Lichen simplex 0** (keine passende Region, es gibt keine Region «Haut»).
  - Vergleich: main `caca1e74` hat `orphans: []`. Der Befund entsteht also durch diesen Draft und verschwindet im integrierten Stand (je 2 Kontext-Hosts, `orphans: []`, unten).
  - Folge: Dieser Draft-Stand ist **nicht veröffentlichungsfähig**. Keine Assertion entfernt, kein Gate geändert.

### Integrierter Teststand (separater Worktree `/home/user/tcm-a8-int`, Patch angewendet, nicht committet)

- **Stand:** nach der Review-Runde neu aufgesetzt auf `1b6fe7a9` plus Patch (14 Host-Dateien).
- **Build:** grün.
- **`check-beschwerden-a8-2026-10-29.mjs --integriert`:** OK. Jede der 8 Seiten hat genau die 2 geplanten Kontext-Hosts aus der Basis; Ankersätze wie in Abschnitt 6.
- **Health-Audit:** 0 Fehler, `orphans: []`; CPSP und Lichen simplex je 2 gezählte Inbound-Links.

### Build-Diff gegen frischen main-Build (explizite Allowlist)

- **Neu:** 8, alle erwartet (die acht `/beschwerden/<slug>/index.html`).
- **Entfernt:** 0.
- **Geändert:** 7, alle auf der Allowlist:
  - `beschwerden/index.html` (Hub A–Z): 8 reine Einfügungen
  - 3 Körperregionen: je eine reine Einfügung
  - `gesundheitsbibliothek/index.html`: 5 Einfügungen im Suchindex und 3 automatisch abgeleitete Themenzähler der Regionen (24 → 27, 42 → 43, 13 → 15)
  - `sitemap.xml`: 8 Einfügungen
  - `beschwerden-keep.js`: Listenende um Kommentar und 8 Slugs erweitert
- **Unerwartet:** 0. Kein bestehender Artikel geändert; EN, Formulare, Tracking, Standortlogik und Worker-Bundle unverändert.
- **Gegen bisherigen PR-Stand `653a1bbe` (frischer Build):** neu 0, entfernt 0, geändert genau die 8 neuen Seiten. Inhalt der Änderung: WhatsApp-`text` (2 Links je Seite), Marker `data-wa-neutral`, die korrigierten Evidenzsätze und Suchbegriffe, der Moody-Satz. Hub, Regionen, Suche, Sitemap, Bestandsartikel, EN, Formulare und Standortlogik unverändert.
- **Quell-Diff gegen main:** Die einzigen entfernten Zeilen sind Listenabschlüsse, die um die neuen Slugs verlängert wurden (`[slug].astro`, Keep-Liste).

### 8a. WhatsApp-Verhalten (Browser, Playwright, ohne Versand)

- **Umsetzung, seitenbezogen:** `WA_GENERIC_SLUGS` in `src/pages/beschwerden/[slug].astro` setzt den Kontakt-Prefill dieser acht Slugs auf den generischen Text. Jede Leaf trägt `<div data-wa-neutral hidden>`; dann setzt der vorhandene Mechanismus in `WhatsAppConcierge.astro` (aus dem Trauma-Cluster) nach DOMContentLoaded den Text auf alle `a[href*="wa.me/"]` der Seite. Keine globale Änderung; andere Seiten unverändert.
- **Geprüft:** 8 Seiten bei 390 und 1440 px nach JS, externe Anfragen blockiert, neue Tabs sofort geschlossen, Navigation per `preventDefault` unterbunden.
  - Je Seite 6 erreichbare WhatsApp-Links: Drawer, Kontaktabschnitt, Formular-Alternative, FAB/Concierge-Launcher, Concierge-CTA, Sticky. **Alle 6 tragen exakt** `Guten Tag, ich habe eine Frage zu Ihrem Angebot.`; kein H1, keine Diagnose, keine URL. Nummer `41775236122` unverändert.
  - Vor JS (Server-HTML): 2 Links mit generischem Text, 4 mit dem globalen Standardtext (ohne Diagnose). Nach JS: alle 6 generisch.
  - Klick je Link: genau ein `wa_click` mit unveränderter `quelle` (drawer, form, form, fab, fab, sticky) und `prefilled:false`. Eventnamen und Tracking-Code unverändert.
  - Referenzseiten unverändert: Schambeinentzündung behält «allgemeine Frage zum Artikel ‹H1›» im Kontaktabschnitt, Rückenschmerzen ihren Angebotstext, PTBS (Trauma) den generischen Text.
- **Grenze:** Das ist eine **Prefill-Korrektur**, kein Datenschutz-/Analytics-Schutz wie im Trauma-Cluster. Seiten-URL, Titel und Pfad gelangen weiter wie auf allen Seiten in Analytics/GTM (nach Consent). Das Kontaktformular übernimmt wie überall «Mein Anliegen betrifft: <Diagnose>.» in das Textfeld; das ist kein WhatsApp-Prefill und wurde nicht geändert.

### Nicht ausgeführt

- **`test-kontakt-formular`:** Formularcode und Formular-Upgrade sind unverändert; die neuen Leaves nutzen dieselbe Vorlage wie die Bibliothek-Orientierungsseiten.
- **`visual-baseline`, `shots-*`.**

### Bekannte Baseline-Fehler (auf main identisch, nicht durch diesen PR)

- Die eingecheckte `public/sitemap.xml` ist veraltet. Deshalb müssen `check-i18n` (S4) und die Kohortenprüfungen ohne `--base-sitemap` mit der Build-Sitemap bzw. einer main-Build-Sitemap laufen.
- Suchsynonyme des Pakets 24.10.2026 für `/wissen/akupunktur-bei-*` wirken nicht (kein Suchindex-Eintrag dieser URLs).
- Im SEO-Keyword-Verzeichnis tragen die Trauma-Zeilen (#96) noch die Notiz «Draft-PR»; das ist eine reine Notiz.

## 9. Offene Punkte und Grenzen

- **Veröffentlichung nur integriert:** Die Seiten dürfen erst live gehen, wenn der Integrations-Patch freigegeben und angewendet ist. Sonst sind sie verwaist bzw. ohne Kontextlinks aus Bestandsartikeln.
- **WhatsApp:** generischer Text umgesetzt (8a). Analytics/Seiten-URL und Formular-Prefill bleiben wie auf allen Seiten; ein weitergehender Schutz wäre ein eigener Auftrag.
- **Bibliothek-Kohortenprüfung ohne `--base-sitemap`:** 6 Fehler (Kontext-Hosts zu Schambeinentzündung, Sjögren, Proctalgia fugax, Beckenorgansenkung, TRAK, Calcium), auf main identisch; Ursache ist die veraltete eingecheckte Sitemap. Mit main-Build-Sitemap: OK.
- **Datenlage Intersektionssyndrom:** nur narrative Übersicht und Fallserien; das steht im Text.
- **Studien:** Studienquellen meist auf Abstract-Ebene (Zugang in der Matrix). Keine ärztliche Prüfung.
- **Nachfrage:** Suchvolumen, KD und Buchungsabsicht sind nicht gemessen.

## 10. Release-Schritte (nur nach ausdrücklichem GO)

**Offene Voraussetzungen (Stand Review-Runde):**
- Ausdrückliche Freigabe, die 14 eingefrorenen Bestandsseiten per Integrations-Patch zu ändern. Ohne sie bleiben CPSP und Lichen simplex verwaist; das Release ist dann ausgeschlossen.
- Main-Stand prüfen: Bewegt sich main seit `caca1e74`, Patch mit `git apply --check` neu prüfen und Build-Diff wiederholen.
- Inhaltliche Freigabe der acht Texte (keine ärztliche Prüfung erfolgt; Studien meist auf Abstract-Ebene).
- Publikationsentscheid: Datum, Queue «Offen», Map-Notizen «veröffentlicht».

1. Integrations-Patch freigeben und anwenden (`git apply seo/beschwerden-a8-2026-10-29-integration.patch`). Die 14 Bestandsseiten ändern sich dann um je einen Absatz bzw. Link.
2. Build und `check-beschwerden-a8-2026-10-29.mjs --integriert --base-sitemap=<main-Build>`; Health-Audit ohne verwaiste Seiten.
3. Queue: 8 URLs von «Geplant» nach «Offen» mit Datum; Map-Notizen auf «veröffentlicht».
4. Merge, Live-Check. Kein GSC-Submit ausser über die tägliche Queue.

## 11. Integration und Release (GO 29.10.2026)

- **GO Integration** und anschliessend **Merge-Auftrag** des Auftraggebers am 29.10.2026. Main vor dem Anwenden geprüft: weiterhin `caca1e74`; `git apply --check` sauber.
- **Integration** (Commit `202d26dd`): Patch unverändert angewendet, 14 Dateien, je +1/−1 Zeile. Build-Diff gegen den Stand vor Integration: genau die 14 Host-Seiten geändert. 13 reine Absatz-Einfügungen, Lichen planus nur der Link um die bestehende Erwähnung. Nichts sonst.
- **Prüfskript:** «integriert» ist jetzt Standard; `--draft` prüft den alten eingefrorenen Stand und schlägt nach der Integration erwartungsgemäss fehl.
- **Prüfungen integriert** (frischer Build):
  - `check-beschwerden-a8-2026-10-29`: OK, je Seite mindestens 2 Kontext-Hosts aus der Basis.
  - Health-Audit: 0 Fehler, `orphans: []`.
  - Übrige Kohorten mit main-Build-Sitemap: OK. Kontaktformular, Clinic-Status, Standort-UX, First30, Professional, Herbst-SG: 0 Fehler. EN-Analytics 48/0, Anfrage-Betreff 92/0, Hero-Video 124/0.
  - Mobile: 14 Hosts bei 320/390/1440 px, 42 Aufrufe, 0 Überläufe, 0 JS-Fehler.
  - WhatsApp-Prüfung unverändert: 0 Auffälligkeiten.
- **i18n:** failures 0, **1 Warnung**: `condition:menstrual-issues` ist Outdated, weil `zyklusbeschwerden.html` einen Absatz mit Link auf die DE-Seite «Sekundäre Amenorrhoe» erhielt.
  - Kein `--update`: Das ist nur in einem Commit mit geprüfter EN-Fassung erlaubt.
  - Die EN-Seite braucht inhaltlich vermutlich keine Änderung, weil es kein EN-Gegenstück der neuen Seite gibt. Das ist aber im EN-Workflow zu bestätigen.
- **Release** (dieser Commit): Queue 8 URLs von «Geplant» nach «Offen» mit Datum 29.10.2026 (PR #97). Map-Notizen auf «veröffentlicht 29.10.2026». Keine Publikationskonstante, da Leaves ohne Datum. GSC nur über die tägliche Queue.
- **Weiterhin offen:** keine ärztliche Prüfung der Texte; die EN-Review zu `menstrual-issues` steht aus.

