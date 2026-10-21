# Neun-Artikel-Paket /wissen/ (21.10.2026): Bericht zum Draft-PR

Stand: Draft-PR, nicht Ready, nicht gemergt, nicht deployed. Kein GSC-Submit, keine Live-Daten.

## 1. Rahmen

- Basis: `9e5a914c` (main nach Merge von #80). Branch `claude/wissen-neun-artikel-2026-10-21`. PR #80 wurde nicht wiederverwendet.
- Drei Commits, kein Amend, kein Rebase, kein Force-Push:
  1. `b6e24b3d` Inhalte und Datenmodell (9 Einträge in `wissen-kraeuter.ts` und `wissen-akupunktur-bei.ts`, Kohortenkonstante `PUBLISHED_WISSEN_NEUN_2026_10 = undefined` in `befunde-werte.ts`).
  2. `65528160` Kontextlinks aus 19 Bestandsseiten, Ownership COPD-Alias.
  3. `9a5fd9ca` Registrierungen (Map, Do-not-create, Index-Queue, Bibliothekssuche, Health-Audit-JSON), Prüfskript `scripts/check-wissen-neun.mjs`, Bericht.
  4. Review-Folgecommit 21.10.2026 (drei Textstellen in 05, 08, 09, Quellenmatrix, Abschnitte 4b und 7b dieses Berichts).
- Texte aus dem Textpaket wortgetreu übernommen (Markdown zu HTML, typografische Apostrophe vereinheitlicht, Quellen-IDs durch sichtbare Labels mit Zugriffsangabe ersetzt). Inhaltliche Änderungen nur die in Abschnitt 4 dokumentierten.
- Autor auf allen neun Seiten: «Redaktion TCM.ch» mit Vermerk «Redaktionelle Einordnung». Keine Fachautorenschaft, kein Datum (Konstante undefined, FAQs im Body, `faqs: []`, kein FAQPage-Schema).
- Offene PRs bei Start (#38 SG-Hero-Pilot, #15 Commercial-Sprint, #1 Cloudflare-Konfiguration): keiner berührt die neun Slugs, die Kräuter- oder Akupunktur-bei-Dateien oder die Hostseiten.

## 2. Seitenliste

| Nr | URL | Title (Zeichen) | Meta (Zeichen) | Wörter Text / gebaut | Quellen | Kategorie |
|---|---|---|---|---|---|---|
| 01 | /wissen/chinesische-kraeuter-bei-migraene/ | Chinesische Kräuter bei Migräne: Nutzen und Grenzen (51) | 148 | 570 / 626 | 3 | Beschwerden verstehen |
| 02 | /wissen/chinesische-kraeuter-bei-wechseljahresbeschwerden/ | Chinesische Kräuter bei Wechseljahren: Was ist belegt? (54) | 149 | 550 / 625 | 3 | Beschwerden verstehen |
| 03 | /wissen/chinesische-kraeuter-bei-neurodermitis/ | Chinesische Kräuter bei Neurodermitis: Nutzen und Risiken (57) | 156 | 564 / 637 | 4 | Beschwerden verstehen |
| 04 | /wissen/chinesische-kraeuter-bei-schuppenflechte/ | Chinesische Kräuter bei Schuppenflechte: Was ist belegt? (56) | 158 | 584 / 629 | 3 | Beschwerden verstehen |
| 05 | /wissen/chinesische-kraeuter-bei-endometriose/ | Chinesische Kräuter bei Endometriose: Nutzen und Grenzen (56) | 160 | 638 / 785 | 5 | Beschwerden verstehen |
| 06 | /wissen/chinesische-kraeuter-bei-pcos/ | Chinesische Kräuter bei PCOS und Kinderwunsch: Evidenz (54) | 160 | 630 / 679 | 3 | Beschwerden verstehen |
| 07 | /wissen/akupunktur-bei-trockenen-augen/ | Akupunktur bei trockenen Augen: Studien und Grenzen (51) | 152 | 592 / 651 | 4 | Beschwerden verstehen |
| 08 | /wissen/akupunktur-bei-krebsbedingter-fatigue/ | Akupunktur bei krebsbedingter Fatigue: Was ist belegt? (54) | 159 | 698 / 925 | 7 | Beschwerden verstehen |
| 09 | /wissen/akupunktur-bei-copd/ | Akupunktur bei COPD: Studien zu Atemnot und Grenzen (51) | 156 | 652 / 807 | 6 | Beschwerden verstehen |

«Wörter Text» = Fliesstext ohne Quellenblock (Lesezeit 3 Min.; 05, 08, 09 nach Review-Durchgang 1 länger), «gebaut» = Prüfskript auf dem gebauten Artikel inklusive FAQ und Quellenlabels. Alle Titles und Metas eindeutig gegenüber dem Bestand (Prüfskript). 01 bis 06 laufen in der Kräuter-Serie (`wissen-kraeuter.ts`, jetzt 16 Slugs), 07 bis 09 in der Akupunktur-bei-Serie (`akupunkturSerieSlugs`, jetzt 34; Health-Audit Wissen-Serie 39 Slugs).

## 3. Vorprüfung je Artikel (21.10.2026)

Für jeden Artikel geprüft: Route und enge Aliasse gegen `master-keyword-url-map.csv`, `do-not-create-intents.csv`, Bibliothekssuche (`SYNONYMS`), offene PRs; Websuche; bestehende Antwort im Bestand; Entscheidung.

| Nr | Route/Alias im Bestand | Websuche (Query, Treffer) | Bereits beantwortet? | Entscheidung |
|---|---|---|---|---|
| 01 | Kein Bestand für «chinesische kräuter migräne». Migräne-Owner `/beschwerden/migraene/` (EN-fingerprinted, nicht editiert), `/wissen/migraene-tcm-warum-akupunktur-nicht-fuer-jeden/` (Akupunktur). | «chinesische Kräuter Migräne Vorbeugung»: PMC7781685, PMC3525331, PMC9358217, RMIT-Evidenzsummary, pta-in-love, Frontiers Neurology 2022 | Nein: Bestand behandelt Akupunktur; Kräuter nur als Methodensatz. | Behalten. |
| 02 | Owner `/beschwerden/wechseljahre/`, Akupunktur-Artikel `/wissen/akupunktur-bei-wechseljahresbeschwerden/`. Kein Kräuter-Eintrag. | «chinesische Kräuter Wechseljahre Hitzewallungen»: cochrane.org CD009023 (de), pressetext, Buchangebote | Nein: Leaf nennt zwei Formeln in einem Satz ohne Evidenz. | Behalten; Overlap-Präzedenz wie Akupunktur-Artikel (Leaf behält Beschwerde-Owner). |
| 03 | Owner `/beschwerden/neurodermitis/`, `/wissen/akupunktur-bei-neurodermitis/`. | «chinesische Kräuter Neurodermitis TCM Kräutertherapie»: Buchtitel (Schmitz), klarity.health, kuechenfibel | Nein: Leaf beschreibt Kräuter als Methode ohne Studienlage. | Behalten. |
| 04 | Owner `/beschwerden/schuppenflechte/`; Immunsuppressiva-Frage `/gesundheitsbibliothek/fragen/tcm-kraeuter-immunsuppressiva/`. | «chinesische Kräuter Schuppenflechte Psoriasis TCM»: PMC12529447, PMC6739008, PMC11608678, PMC7862748, JCM-Archiv | Nein: Leaf erwähnt «teils positive Ergebnisse», keine Einordnung. | Behalten. |
| 05 | Owner `/beschwerden/endometriose/`, `/wissen/akupunktur-bei-endometriose/`. | «chinesische Kräuter Endometriose Schmerzen TCM»: NCT00034047, PMC9663487, PMC4150457, PMC3463977, LMU-Open-Access | Nein: Akupunktur-Artikel nennt Kräuter nur als Ergänzung. | Behalten. Keine indirekte Evidenz (Akupunktur plus Kräuter) als Kräuterbeleg verwendet (S23 nur als Abgrenzung). |
| 06 | Owner `/beschwerden/pcos/`, `/wissen/pcos-akupunktur-tcm/`. | «chinesische Kräuter PCOS Kinderwunsch»: PMC8179771, PMC9392647, cochrane.org CD007535 (de), NIHR SPCR | Nein. | Behalten. Keine indirekte Evidenz. |
| 07 | Owner `/beschwerden/trockene-augen/`; kein Akupunktur-Alias in Map/DNC/Suche. | «Akupunktur trockene Augen Studie»: NCT01105221, PMC6393036, PMC4415668, PMC6093252, ogka.at | Nein: Leaf fasst eine Übersicht 2018 in drei Sätzen. | Behalten. |
| 08 | Owner Erschöpfung `/beschwerden/erschoepfung/`; onkologische Fragen `/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/`, `/wissen/akupunktur-bei-aromatasehemmer-gelenkschmerzen/`. Kein Fatigue-Alias. | «Akupunktur Fatigue Krebs Erschöpfung Studie Leitlinie»: PMC11549166, PMC12783427, PMC9496910, PMC10083363, PMC9139178, ptaheute | Nein. | Behalten. Keine indirekte Evidenz; S13 nicht mit Akupressur verwechselt (Abschnitt 4). |
| 09 | Owner `/beschwerden/copd/` führte «akupunktur copd» als Secondary. | «Akupunktur COPD Atemnot Studie»: ogka.at (Li 2025), Thieme, Arzneimittelbrief, PEDro, Springer Medicine | Nein: Leaf drei Sätze zu Atemnot. | Behalten; Alias «akupunktur copd» vom Leaf an den Artikel übergeben (Map-Zeile COPD: Secondary bereinigt, Note). |

Aktualisierungssuche zu neueren Studien und Korrekturen (PubMed E-utilities, 21.10.2026): «chinese herbal migraine» (keine Korrektur zu S01), «cancer-related fatigue acupuncture 2025/2026» (S29, S30, S33 neu), «acupuncture COPD randomised 2025» (S31 neu), «traditional chinese medicine endometriosis pain meta-analysis 2025» (S32 neu), «atopic dermatitis chinese herbal 2025» (S08 bestätigt), «dry eye acupuncture 2024/2025» (keine zusätzliche Quelle mit besserer Evidenz, nichts ergänzt). Keine Errata oder Retraktionen zu S01 bis S28 gefunden.

## 4. Quellen: Zugriff und Korrekturen

Zugriffsebenen aus der erneuten Prüfung (nicht aus Teil C übernommen). Snapshots unter `scratchpad/ef/src3/` (nicht im Repo). Label wie im Artikel sichtbar.

| ID | Quelle | Zugriff 21.10.2026 | Artikel |
|---|---|---|---|
| S01 | Lyu et al., Frontiers in Neurology 2022, PMID 35873759 | Volltext PMC; Abstract, Limitationen und Schlussfolgerung geprüft | 01 |
| S02 | NHS Migraine | Patienteninformation, Volltext | 01 |
| S03 | NHS Herbal medicines and complementary therapies | Patienteninformation, Volltext | 01, 05, 06 |
| S04 | Cochrane CD009023 (2016) | Cochrane-Zusammenfassung und Abstract | 02 |
| S05 | Maunder et al., Climacteric 2026, PMID 41498229 | Abstract im Publikationsverzeichnis der University of Bristol | 02 |
| S06 | NHS Treatment for menopause | Patienteninformation, Volltext | 02 |
| S07 | Cochrane CD008642 (2013) | Cochrane-Zusammenfassung und Abstract | 03 |
| S08 | Coyle et al., Dermatologic Therapy 2025, DOI 10.1155/dth/9920370 | Abstract über Crossref; Verlagsseite (Wiley) beim Abruf 403 | 03 |
| S09 | NHS Atopic eczema | Patienteninformation, Volltext | 03 |
| S10 | Parker et al., J Dermatol Treat 2017, PMID 27366921 | PubMed-Abstract | 04 |
| S11 | Cochrane CD006568 (2012) | Cochrane-Zusammenfassung und Abstract | 05 |
| S12 | Cochrane CD007535 (2021) | Cochrane-Zusammenfassung und Abstract | 06 |
| S13 | Bower et al., ASCO-SIO Guideline Update, JCO 2024, PMID 38754041 | PubMed-Abstract und PMC-Volltext (PMC12082589) mit Empfehlungstabelle | 08 |
| S14 | Shin et al., Acta Ophthalmol 2010, PMID 21070615 | PubMed-Abstract | 07 |
| S15 | Kong et al., Complement Ther Clin Pract 2022, PMID 36347150 | PubMed-Abstract | 07 |
| S16 | Xu et al., BMC Complement Med Ther 2024, PMID 39227880 | Volltext PMC (PMC11370288); Springer beim Abruf gesperrt | 09 |
| S17 | Li et al., Complement Ther Med 2025, PMID 39956529 | PubMed-Abstract | 09 |
| S18 | NHS COPD | Patienteninformation, Volltext | 09 |
| S19 | NCCIH Traditional Chinese Medicine | Patienteninformation, Volltext | 03, 04, 06, 08, 09 |
| S20 | NHS Endometriosis | Patienteninformation, Volltext | 05 |
| S21 | NHS Dry eyes | Patienteninformation, Volltext | 07 |
| S22 | NHS Psoriasis | Patienteninformation, Volltext | 04 |
| S23 | Xu et al., Akupunktur plus CHM vs. CHM allein bei Endometrioseschmerz | Verlagsvolltext und Abstract | 05 |
| S24 | National Cancer Institute, Cancer Fatigue | Patienteninformation, Volltext | 08 |
| S25 | NHS Eye pain | Patienteninformation, Volltext | 07 |
| S26 | NHS Shortness of breath | Patienteninformation, Volltext | 09 |
| S28 | Molassiotis et al., JCO 2012, PMID 23109700 | PubMed-Abstract | 08 |
| S29 | Meta-Analyse Brustkrebs-Fatigue, Medicine 2026, PMID 42363469 | PubMed-Abstract (neu) | 08 |
| S30 | Meta-Analyse Fatigue, Frontiers in Oncology 2026, PMID 42164120 | PubMed-Abstract (neu) | 08 |
| S31 | Suzuki et al., ERJ Open Research 2025, DOI 10.1183/23120541.00668-2024 | Abstract über Crossref; Verlagsseite beim Abruf gesperrt (neu) | 09 |
| S32 | Meta-Analyse TCM bei Endometrioseschmerz, Am J Transl Res 2025;17(10), PMID 41268238, PMC12628223 | Verlagsvolltext als PDF über DOI 10.62347/RHXV3554 (e-Century), Tabelle 2 und Limitationen gelesen; PMC-Seite und PMC-XML beim Abruf gesperrt (reCAPTCHA, Verlag erlaubt kein XML) (neu; im ersten Durchgang nur Abstract) | 05 |
| S33 | Pilotstudie Akupunktur vs. Sham bei Brustkrebs-Fatigue, BMC Complement Med Ther 2026, PMID 41821024 | PubMed-Abstract vollständig gelesen (Methoden, Ergebnisse Woche 6 und Follow-up, Schlussfolgerung) (neu) | 08 |

S27 wird im Textpaket nicht verwendet. Alle Aussagen aus Teil C wurden an den Quellen bestätigt; S17 bewusst mit dem Ergebnisabschnitt (SGRQ ohne Gruppen-/Interaktionseffekt) und nicht mit der stärkeren Abstract-Schlussfolgerung übernommen; S16 bestätigt zwei Zentren in Chengdu und fehlende Nachbeobachtung.

Textkorrekturen und Ergänzungen (Vorher → Nachher, Quelle):

| Nr | Vorher | Nachher | Grund, Quelle |
|---|---|---|---|
| 08 | «Die ASCO-SIO-Leitlinie von 2024 spricht wegen unzureichender oder uneinheitlicher Evidenz keine Empfehlung für oder gegen Akupunktur zur Fatigue aus.» | «… keine Empfehlung für oder gegen Akupunktur zur Fatigue bei Erwachsenen nach Abschluss der Krebsbehandlung aus; ihre Evidenztabelle nennt dazu zwei Studien mit 399 Teilnehmenden, eine positive und eine negative.» | Präzisierung des Geltungsbereichs und der Evidenzbasis aus der Empfehlungstabelle; S13 PMC-Volltext. Akupressur-Abgrenzung unverändert. |
| 08 | kein Absatz | Neuer Absatz nach der Akupressur-Abgrenzung: Übersichten 2026 (13 Studien/963 Brustkrebspatientinnen; 28 Studien, verschiedene Krebsarten) mit im Mittel weniger Fatigue, Verlässlichkeit niedrig bis sehr niedrig; Sham-kontrollierte Pilotstudie 2026 ohne Überlegenheitsnachweis. | Aktualisierungssuche; S29, S30, S33, Abstract-Ebene, so im Text benannt. |
| 09 | «Für die SGRQ-Lebensqualitätsskala zeigte der Abstract dagegen keinen Gruppen- oder Interaktionseffekt.» | gleicher Satz, ergänzt um die japanische Ein-Jahres-Studie (45 Teilnehmende, wöchentliche Akupunktur plus übliche Versorgung, SGRQ nach 52 Wochen besser; ohne Scheinakupunktur, kleine Gruppe). | Aktualisierungssuche; S31 Crossref-Abstract. |
| 05 | «Sie zeigen aber nicht, wie gut die Kräuter selbst gegenüber Placebo oder einer gynäkologischen Standardbehandlung wirken.» | gleicher Satz, ergänzt um die Meta-Analyse 2025 (elf Studien, 1'401 Teilnehmerinnen; weniger Regelschmerzen und Dyspareunie, stark uneinheitlich, kein klarer Effekt auf Beckenschmerzen; Präparate und Vergleiche aus dem Abstract nicht ablesbar). | Aktualisierungssuche; S32 PubMed-Abstract. |

Keine weiteren Sachfehler gefunden. Keine Dosierungen, Rezepte, Behandlungsdauern oder Erfolgsaussagen ergänzt. Notrufnummer 144 wie im Textpaket.

### 4b. Review-Durchgang 1 (21.10.2026, drei Punkte)

| Nr | Vorher | Nachher | Grund, Quelle |
|---|---|---|---|
| 08 | «Eine kleine Pilotstudie mit Scheinakupunktur bei 68 Brustkrebspatientinnen fand nach sechs Wochen keinen Unterschied zwischen echter und Scheinakupunktur. Das Leitlinienfazit von 2024 ändert sich dadurch nicht.» | Pilotstudie 2026, zwei Zentren, 68 Patientinnen, nicht eindringende Scheinakupunktur; nach sechs Wochen beide Gruppen ähnlich weniger Fatigue ohne statistisch gesicherten Unterschied; in der Nachbeobachtung bis Woche zehn stärkere Rückgänge bei Fatigue sowie Angst- und Depressionswerten in der Akupunkturgruppe mit wachsendem Abstand; Übertragbarkeit begrenzt, kein garantierter Erfolg. Leitlinie 2024 beurteilte den damaligen Evidenzstand; neuere Übersichten und Pilotstudie darin nicht enthalten, ob sie die Bewertung verändern, ist offen. | S33 Abstract vollständig: Woche 6 BFI 6.69 vs. 6.19, p = 0.223; Follow-up BFI Δ −1.28 (p = 0.011), FS-14 Δ −1.81, HADS-A/-D signifikant; «time-dependent advantage». Kein Leitlinienupdate behauptet. |
| 05 | «Eine Meta-Analyse von 2025 mit elf Studien und 1'401 Teilnehmerinnen berichtet unter Kräuterbehandlungen weniger Regelschmerzen und weniger Schmerzen beim Geschlechtsverkehr, bei stark uneinheitlichen Studien und ohne klaren Effekt auf Beckenschmerzen; welche Präparate dort eingeschlossen wurden, liess sich nur auf Abstract-Ebene prüfen.» | Eingegrenzt: Die Übersicht fasst unter «chinesische Kräutermedizin» chinesische Rezepturen und Fertigpräparate (China, UK) sowie iranische Studien mit Knoblauchtabletten, Kamille- und Leinsamenkapseln und Astaxanthin zusammen; gepoolte Ergebnisse zu Regelschmerzen und Dyspareunie deshalb kein spezifischer Wirknachweis für chinesische Kräuter; Autor:innen nennen uneinheitliche Zusammensetzung, Dosierung, Dauer und fehlende Untergruppenanalysen; Beckenschmerz ohne klaren Effekt. | S32 Volltext Tabelle 2: Leng 2024 Sanjie-Kapsel, Flower 2011 individualisierte CHM (UK), Lian 2009 Quyu-Jiedu-Granulat, Ruan 2021 SanJieZhenTong, Rostami 2023 Astaxanthin (Iran), Yang 2006 Yiweining, Zhao 2020 Huoxue-Xiaoyi/Bushen-Zhuyun, Zhong 2019 DanDa Fukang, Amirsalari 2021 Knoblauch (Iran), Zhao 2013 Guifu/Danchi, Khalajinia 2024 Kamille/Leinsamen (Iran); Limitationen: «significant differences in composition, dosages, and treatment courses», «no subgroup analysis … on different TCM types». |
| 09 | «ohne Scheinakupunktur und bei so kleiner Gruppe ist das ein Hinweis, kein Nachweis.» | «Als randomisierter Vergleich liefert sie Evidenz für den untersuchten Zusatznutzen gegenüber üblicher Versorgung allein; ohne Scheinakupunktur trennt sie den spezifischen Nadeleffekt aber nicht sicher von unspezifischen Effekten der Behandlung ab, und bei so kleiner Gruppe bleibt die Aussage vorläufig.» | Präzisierung ohne neue Quelle; S31 (RCT, 45 Teilnehmende, usual care als Kontrolle, kein Sham). |

Sichtbare Quellenlabels angepasst: S32 «Verlagsvolltext als PDF über DOI, Tabelle 2 geprüft» mit Journal, S33 «PubMed-Abstract, vollständig gelesen».

## 5. Kontextlinks

Vorgabe: je Artikel mindestens zwei Kontextlinks aus zwei verschiedenen bestehenden indexierbaren Inhaltsseiten im Haupttext (Hubs, Chips, Nav, Footer, neue Artikel zählen nicht). Prüfung mit `scripts/check-wissen-neun.mjs` gegen die Sitemap eines frischen main-Builds (`/home/user/tcm-main-dist/sitemap.xml`, 886 URLs).

Abweichungen von den Hostvorschlägen des Textpakets:

- 01: `/beschwerden/migraene/` ist EN-fingerprinted (würde `check-i18n --strict` brechen) und wurde nicht editiert. Ersatz: Akupunktur-Migräne-Artikel und `/wissen/was-hilft-gegen-kopfschmerzen/`. Der Link in `/gesundheitsbibliothek/was-jetzt/migraene-im-anflug/` wurde zusätzlich gesetzt, zählt aber nicht als Kontext-Host (steht in einem `<aside>`).
- 04: `/therapien/kraeutertherapie/` ist EN-fingerprinted. Ersatz: Frage `/gesundheitsbibliothek/fragen/tcm-kraeuter-immunsuppressiva/` (Absatz zu Methotrexat/Biologika).
- 07: `/wissen/heizungsluft-trockene-schleimhaeute/` hat keinen Augenabschnitt. Ersatz: `/koerpersignale/augenlid-zuckt/`.
- Alle anderen Hosts wie vorgeschlagen. Zusätzlicher Ownership-Eingriff: Map-Zeile `/beschwerden/copd/` ohne Secondary «akupunktur copd», Note ergänzt.

19 Inbound-Nachweise (Host → Ziel, Ankersatz aus dem gebauten Host; 18 Kontext-Hosts plus Was-jetzt):

1. `/wissen/migraene-tcm-warum-akupunktur-nicht-fuer-jeden/` → 01: «Wenn du statt Nadeln eine Rezeptur erwägst, lies die getrennte Einordnung zu chinesischen Kräutern bei Migräne; die Akupunkturdaten beantworten diese Frage nicht.»
2. `/wissen/was-hilft-gegen-kopfschmerzen/` → 01: Absatz «Was langfristig wirkt», Link «chinesische Kräuter bei Migräne» als getrennte Entscheidung zur Vorbeugung.
3. `/gesundheitsbibliothek/was-jetzt/migraene-im-anflug/` → 01: Absatz «Professionelle Behandlung» (Aside, zählt nicht als Kontext-Host).
4. `/beschwerden/wechseljahre/` → 02: «Die Entscheidung über eine Rezeptur, einschliesslich der Grenzen eines Vergleichs mit Hormonen, …»
5. `/wissen/akupunktur-bei-wechseljahresbeschwerden/` → 02: «Eine Rezeptur ist eine eigene Behandlungsentscheidung; die passende Forschung ordnet chinesische Kräuter bei Wechseljahresbeschwerden ein.»
6. `/beschwerden/neurodermitis/` → 03: Methodenabsatz Kräutertherapie, Link auf die Einordnung der Studienlage.
7. `/wissen/akupunktur-bei-neurodermitis/` → 03: «Die Studien zu Nadeln sind kein Beleg für eine Rezeptur; dafür gibt es die gesonderte Einordnung chinesische Kräuter bei Neurodermitis.»
8. `/beschwerden/schuppenflechte/` → 04: Absatz «Kräutertherapie ist der zentrale Baustein … Ein systematischer Review …», Link auf die Einordnung.
9. `/gesundheitsbibliothek/fragen/tcm-kraeuter-immunsuppressiva/` → 04: «Wer wegen Schuppenflechte Methotrexat oder Biologika erhält und zusätzlich Kräuter erwägt …»
10. `/beschwerden/endometriose/` → 05: «Welche Aussagen zu Schmerz und Nutzen einer Rezeptur möglich sind, ordnet chinesische Kräuter bei Endometriose getrennt von der Akupunkturforschung ein.»
11. `/wissen/akupunktur-bei-endometriose/` → 05: «Wenn zusätzlich eine Rezeptur zur Diskussion steht …»
12. `/beschwerden/pcos/` → 06: Absatz Kräutertherapie, Kinderwunsch-Satz mit Link.
13. `/wissen/pcos-akupunktur-tcm/` → 06: Absatz Behandlungsplan, Link auf die Kräuter-Einordnung.
14. `/beschwerden/trockene-augen/` → 07: Absatz zur Übersicht 2018, Link auf die Einzelstudien.
15. `/koerpersignale/augenlid-zuckt/` → 07: «Sind trockene Augen augenärztlich diagnostiziert und erwägst du eine Ergänzung zu den Tropfen, beantwortet Akupunktur bei trockenen Augen diese separate Frage.»
16. `/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/` → 08: «Die Frage nach dem Nutzen bei Erschöpfung ist davon zu unterscheiden: Akupunktur bei krebsbedingter Fatigue ordnet Studien und Leitlinie ein.»
17. `/wissen/akupunktur-bei-aromatasehemmer-gelenkschmerzen/` → 08: «Wenn neben Gelenkschmerzen vor allem Erschöpfung belastet, ist das eine andere Behandlungsfrage …»
18. `/beschwerden/copd/` → 09: «Die einzelnen Studien und ihre Grenzen bei stabiler Erkrankung erklärt Akupunktur bei COPD.»
19. `/gesundheitsbibliothek/untersuchungen/lungenfunktion/` → 09: Absatz Messwerte/Referenzwerte, Link für Betroffene mit COPD-Diagnose.

Vollständige Ankersätze: Ausgabe von `node scripts/check-wissen-neun.mjs --base-sitemap=<main-dist>/sitemap.xml` (Block «Kontextlinks»).

## 6. Registrierungen

- `seo/master-keyword-url-map.csv`: 9 Zeilen (editorial, live, PRIMARY_OWNER, treatment_decision, source_confidence medium, Note «Neun-Artikel-Paket 21.10.2026 (Draft-PR, Basis 9e5a914c) … Suchvolumen/KD/Conversion nicht gemessen»). COPD-Zeile angepasst (Commit 2).
- `seo/do-not-create-intents.csv`: 9 Zeilen (enge Aliasse, Owner = neue URL). Zeile 169 ist auf main eine Leerzeile, nicht aus diesem PR.
- `seo/index-queue.md`: 9 Zeilen unter «Geplant (noch nicht live)», ohne Datum, kein GSC-Submit.
- `src/data/gesundheitsbibliothek.ts`: 9 SYNONYMS-Einträge für die Bibliothekssuche.
- `/wissen/`-Übersicht: automatisch über die Serien-Arrays. `seo/health-library-audit.json`: durch `health-audit` neu generiert.
- `scripts/check-wissen-neun.mjs`: Kohortenprüfung (200, indexierbar, Canonical, eindeutige Title/Meta, eine H1, drei FAQs, Quellenblock, Autor «Redaktion TCM.ch», keine Fachautorenschaft, kein Datum, keine Gedankenstriche, keine energetische Sprache, interne Ziele, mindestens zwei Kontext-Hosts aus der Basis; für 07 bis 09 keine konkurrierenden Akupunktur-Aliasse beim Beschwerde-Owner).

## 7. QA (finaler Build, 21.10.2026)

- `npm run build`: grün. Sitemap 895 URLs (Basis 886 + 9).
- `check-wissen-neun --base-sitemap`: OK, 9/9, je 2 Kontext-Hosts.
- `health-audit`: 0 Fehler (Wissen-Serie 39 Slugs, Ownership-Gate 0). `check-first30`, `check-professional` (103 Einträge), `check-clinic-status`, `check-standort-ux`, `check-kontakt-formular`: je 0 Fehler. `test-en-analytics`: 47/0.
- `check-i18n --strict`: 1 Failure, vorbestehend auf main: Outdated `location:winterthur-marktgasse` (standorte.ts durch #81 geändert, EN-Review offen). Nicht Teil dieses PR, keine Fingerprints angefasst.
- `check-entscheidungsfragen --base-sitemap`: OK (gegen die eingecheckte, veraltete `public/sitemap.xml` meldet das Skript 9 Basis-Fehler, bekanntes Verhalten aus #80).
- `test-anfrage-betreff`: 86 PASS / 0 FAIL. `test-kontakt-formular` (vollständig, auf dem finalen Build): 704 PASS / 8 FAIL. Alle 8 Fehler betreffen Abschnitt N (SG-Hero-Video) und sind ein Bestandsbefund auf main, nicht Teil dieses PR: `/standorte/st-gallen/` ist im Branch-Build byte-identisch zum main-Build `9e5a914c`; auf dem frischen main-Build 703 PASS / 9 FAIL: dieselben 8 Hero-Assertions plus einmalig «ohne Auswahl: Mint-Kachel hat denselben neutralen Rand wie der Check-in», die auf dem Branch-Build in zwei Läufen bestand (zeitabhängige Stilmessung, nicht Teil dieses PR). Ursache: Die in #80 (`d97c25db`) umgestellten Hero-Assertions prüfen den Stand von #79 (Pfad `/videos/hero-sg/`, Poster `standort-stgallen.jpg`, Start per `load`-Listener). #81 (`1ef22f33`, `46155772`, in #80 per Merge von origin/main übernommen, ohne den Test erneut zu fahren) hat das Video auf `/videos/hero-praxis/` und ein gemeinsames `HeroMedia.astro` umgestellt, Poster auf `.webp` gewechselt und den Start auf volle Sichtbarkeit oder ersten Scroll verlegt. Die Assertions sind damit veraltet, nicht abgeschwächt; Anpassung an #81 ist ein eigener Test-Folgecommit ausserhalb des Neun-Artikel-Pakets (Vorschlag: Pfad, Poster-Format und Startbedingung aus `src/components/standort/HeroMedia.astro` und `src/data/hero-video.ts` ableiten, keine Assertion streichen).
- Overflow (Puppeteer, lokaler Server, Drittskripte geblockt): 9 Artikel bei 320/390/768/1440 px und 17 Hosts bei 390/1440 px: 70 OK / 0 Fehler, 0 JS-Fehler, je eine H1, Autor sichtbar, keine Fachautorenschaft. Screenshots `scratchpad/ef/shots-neun/` (nicht im Repo).
- Build-Diff gegen frischen main-Build `9e5a914c`: 9 neu, 0 entfernt, 20 geändert: die sieben Leaves (copd, endometriose, neurodermitis, pcos, schuppenflechte, trockene-augen, wechseljahre), Fragen akupunktur-waehrend-chemotherapie und tcm-kraeuter-immunsuppressiva, Untersuchung lungenfunktion, Was-jetzt migraene-im-anflug, Körpersignal augenlid-zuckt, Wissen aromatasehemmer-gelenkschmerzen, akupunktur-bei-endometriose/-neurodermitis/-wechseljahresbeschwerden, migraene-tcm, pcos-akupunktur-tcm, was-hilft-gegen-kopfschmerzen, `/wissen/`-Hub. Keine weiteren Seiten verändert; Templates, CTA, Formulare, Tracking unberührt.
- Keine echten Anfragen, Mails, Buchungen oder Test-Conversions. `public/sitemap.xml` nicht manuell angepasst (wird vom Build geschrieben).

### 7b. Prüfungen nach Review-Durchgang 1 (21.10.2026, finaler Build)

- main unverändert (`9e5a914c`), Branch-HEAD vor dem Folgecommit `9a5fd9ca`; keine zwischenzeitlichen Änderungen auf main oder im Branch.
- `npm run build`: grün, Sitemap 895 URLs. `check-wissen-neun --base-sitemap`: OK, 9/9, je 2 Kontext-Hosts (05: 785, 08: 925, 09: 807 Wörter gebaut).
- `health-audit` 0 (Wissen-Serie 39 Slugs, Ownership 0), `check-first30`, `check-professional` (103), `check-clinic-status`, `check-standort-ux`, `check-kontakt-formular`: 0 Fehler. `test-en-analytics` 47/0, `test-anfrage-betreff` 86/0, `check-entscheidungsfragen --base-sitemap` OK.
- `check-i18n --strict`: unverändert 1 Failure, Bestandsbefund Outdated `location:winterthur-marktgasse` (#81, `standorte.ts`). Fingerprints nicht angefasst; die EN-Prüfung der Winterthur-Daten ist ein eigener Schritt ausserhalb dieses PR.
- `test-kontakt-formular` (vollständig): 704 PASS / 8 FAIL, dieselben 8 SG-Hero-Assertions wie in Abschnitt 7 (Bestandsbefund #80-Test vs. #81-Markup, auf main identisch). Keine Assertion gestrichen; Test-Folgecommit separat.
- Overflow der drei geänderten Artikel bei 320/390/768/1440 px (Puppeteer, lokaler Server, Drittskripte geblockt): 12 OK / 0 Fehler, 0 JS-Fehler, je eine H1, Autor sichtbar. Ein erster Lauf meldete 12 falsch-positive «Gedankenstrich»-Treffer, weil die temporäre Regex auf das ganze `<main>` zielte und den Template-Hinweis «… Arzt – im Notfall an die 144» sowie Formular-Standortlabels traf; Artikeltexte sind frei von Gedankenstrichen (`check-wissen-neun` prüft den Artikelkörper).
- Build-Diff gegen frischen main-Build: 9 neu, 0 entfernt, 20 geändert, Liste identisch mit Abschnitt 7.
- Keine echten Anfragen, Mails, Buchungen oder Test-Conversions.

## 8. Ausschlüsse und Abweichungen

- Ausgeschlossen: keiner der neun Artikel.
- Hostabweichungen 01, 04, 07 (Abschnitt 5); COPD-Alias-Übergabe (Abschnitt 3).
- Nicht gemessen und nicht behauptet: Suchvolumen, Rankings, GSC-, GA4- oder Semrush-Daten.

## 9. Release (nicht ausgeführt)

1. Review des Draft-PR, dann Ready.
2. Im Release-Commit `PUBLISHED_WISSEN_NEUN_2026_10` auf das Live-Datum setzen, die 9 Queue-Zeilen von «Geplant» nach «Offen» verschieben.
3. Nach Deploy Live-Check der 9 URLs (200, indexierbar, Canonical), dann tägliche GSC-Queue.
