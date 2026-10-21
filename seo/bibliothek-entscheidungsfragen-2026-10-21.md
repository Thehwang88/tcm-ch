# Gesundheitsbibliothek: Entscheidungsfragen-Kohorte (21.10.2026)

Branch `claude/bibliothek-entscheidungsfragen-2026-10-21`, Basis main `62c972794e6d3d04cab669bdd808956cb1a56fcb` (Merge #78; am 21.10.2026 frisch geprüft, identisch mit der Auditbasis). Auftrag: Claude-Code, Briefing «20 Themen prüfen, geeignete neue Bibliotheksseiten schreiben, Draft-PR». Ausführungsdatum 21.10.2026 (Europe/Zurich).

## 0. Status

**Draft-PR, vollständig integriert (Texte, Links, Registrierungen, Prüfskript). Nicht Ready, kein Merge, kein Deployment, kein GSC-Submit.** Datumskonstante `PUBLISHED_ENTSCHEIDUNGEN_2026_10` ist `undefined`: keine Schema-Daten, kein sichtbares Datum, Index-Queue unter «Geplant».

- Commits: (1) Texte + Datenmodell `64743ee2`, (2) Inbound-Links `36fd620f`, (3) Registrierungen, Prüfskript, Bericht (dieser Commit), (4) Korrektur Tabellen-Scroll im Wissen-Template (Folgecommit).
- Arbeitsbaum vor Commit 1: sauber (kein fremder Rest). Offene PRs geprüft: #38 (SG-Hero), #15 (Commercial Sprint 1, berührt `fragen.ts`, Keyword-Map, Index-Queue, `therapie-leaves/akupunktur.html`), #1 (Cloudflare Workers). Keine Kollision mit den neuen Dateien; bei #15 sind nur additive Zeilen in denselben Dateien betroffen (Merge-Konflikt möglich, kein inhaltlicher Konflikt). `therapie-leaves/*` wurden hier nicht angefasst.
- Finaler Umfang: **14 neue Seiten** (4 Wissen-Vergleiche, 10 Fragen), davon 11 aus der Entscheidungsmatrix und **3 Ersatzthemen**. 9 ursprüngliche Kandidaten ausgeschieden (Briefing), 6 weitere Ersatzkandidaten nach Prüfung verworfen. Die Zahl 20 wurde bewusst nicht erzwungen.

## 1. Alle 20 ursprünglichen Kandidaten

Suchphrasen und Ergebnis-URLs aus der Vorprüfung vom 21.10.2026 (Anhang des Briefings); Bestandsprüfung hier am Quelltext (`src/data/fragen.ts`, `wissen*.ts`, `therapie-leaves/*.html`, `akupunkturverfahren.ts`), nicht nur an Slugs.

| Nr. | Thema | Suchphrase (21.10.2026) | Belege (Auswahl) | Vorhandene Owner (gesichtet) | Neu-Mehrwert | Entscheidung |
|---|---|---|---|---|---|---|
| 01 | Akupunktur oder Physiotherapie | «Akupunktur oder Physiotherapie» | aok.de, chinesisches-institut.de, reddit | `/therapien/physiotherapie/` (Kombination, Verordnung, «Unterschiede auf der Akupunktur-Seite»), `/wissen/dry-needling-vs-akupunktur/` | Entscheidungsmatrix Ziel/aktiv-passiv/Zugang CH/Evidenz je Cochrane, Fragen fürs Erstgespräch | **Draft: /wissen/akupunktur-oder-physiotherapie/** |
| 02 | Akupunktur oder Osteopathie | «Akupunktur oder Osteopathie» | osteopathie-institut, stern.de, osteopathie-praxis-hamburg | kein Owner; nur Charité-Studie (Akupunktur vs. Osteopathie) in `/wissen/akupunktur-bei-neurodermitis/` | Methodenunterschied, Berufsrecht CH (GesBG), Vorsichtspunkte, Verfügbarkeit ohne Angebotsbehauptung | **Draft: /wissen/akupunktur-oder-osteopathie/** |
| 03 | Akupunktur oder Shiatsu | «Akupunktur oder Shiatsu» | PMC3200172, wellnessurlaub, massagepraxiskuri.ch | `/wissen/was-bringt-shiatsu-wirkung-ablauf-kosten/` (Viermethoden-Vergleich), `/therapien/shiatsu/` | keiner | ausgeschieden (Briefing) |
| 04 | Akupunktur oder Schröpfen | «Akupunktur oder Schröpfen» | deine-gesundheitswelt, zentrumfuertcm, netdoktor | `/therapien/schroepfen/`, `/wissen/schroepfen-wirkung-flecken/` (Flecken/Wirkung), `/gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/` | Paarvergleich Reiz/Hautbild/Eignung/Vorsicht, keine Rangliste | **Draft: /wissen/akupunktur-oder-schroepfen/** |
| 05 | Tuina oder Shiatsu | «Tuina oder Shiatsu» | tcm.ch/therapien/shiatsu/ (eigener Abschnitt) | Shiatsu-Seite, Tuina-Seite, Shiatsu-Ratgeber | keiner | ausgeschieden (Briefing) |
| 06 | Akupunktur oder Tuina | «Akupunktur oder Tuina» | tcm-zentrum-kreuzlingen, h-och.ch, gesundheitszentrum-basel | Shiatsu-Ratgeber, `/therapien/tuina/` | keiner | ausgeschieden (Briefing) |
| 07 | Check-in oder Erstbehandlung | «TCM Check-in oder Erstbehandlung» | tcm-zentrum-kreuzlingen, tcm.ch/erster-termin | `/standorte/st-gallen/` (Formular mit Terminarten), `/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/` | keiner | ausgeschieden (Briefing) |
| 08 | Nickel-/Metallallergie | «Akupunktur Nickelallergie» | hwang.ch/allergie, akupunktur.de PDF, akupunktur-mutschellen | keine Antwort im Bestand (nur Ohrakupunktur-Materialhinweis) | Terminfrage Nadelmaterial, Befunde, Reaktion | **Draft: /gesundheitsbibliothek/fragen/akupunktur-metallallergie/** |
| 09 | Kräuter-Einnahmeplan | «TCM Kräuter Einnahme» | tcm.ch/kraeutertherapie, tcm-kraeuter-nebenwirkungen, kraeutertherapie-winterthur | `/wissen/tcm-granulat-dekokt-tabletten/` (Formenvergleich, «Hilfreiche Fragen»), Kräutertherapie-Seite («Einnahmeplan: wir erklären …») | produktunabhängige Prüfliste des Plans, Rückfragen, keine Dosis | **Draft: /gesundheitsbibliothek/fragen/tcm-kraeuter-einnahme/** |
| 10 | Kräuter und Pille | «TCM Kräuter Pille Wechselwirkung» | tcm-kraeuter-nebenwirkungen, agtcm.de Podcast | `/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/` (allgemeine Wechselwirkungen, keine Verhütung) | produkt- und methodenbezogene Prüfung, keine Pauschalaussage | **Draft: /gesundheitsbibliothek/fragen/tcm-kraeuter-und-pille/** |
| 11 | Akupunktur oder Akupressur | «Akupunktur oder Akupressur» | tcm-zentrum-kreuzlingen, css.ch, tcm.ch/akupressur | `/therapien/akupressur/`, `/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/` | keiner | ausgeschieden (Briefing) |
| 12 | Tuina oder Physiotherapie | «Tuina oder Physiotherapie» | PubMed 41514247, 39395482 | `/therapien/tuina/` (nur Tuina vs. Massage), `/therapien/physiotherapie/` | direkter RCT-Vergleich korrekt eingeordnet (ein Programm, zwei Populationen) | **Draft: /wissen/tuina-oder-physiotherapie/** |
| 13 | Gelenkprothese | «Akupunktur Metallimplantate Gelenkprothese» | edoc LMU (Implantat-Akupunktur), lametec FAQ | `/gesundheitsbibliothek/fragen/akupunktur-herzschrittmacher/` (nur elektrische Implantate) | passive Implantate, Infektionslogik, Warnzeichen | **Draft: /gesundheitsbibliothek/fragen/akupunktur-mit-gelenkprothese/** |
| 14 | Immunsuppression | «Akupunktur Immunsuppression» | uni-heidelberg, hwang.ch, tcm.ch/immunschwaeche | `/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/` (onkologisch), `/wissen/haeufige-infekte-immunsystem/` (nur Verweis) | nicht-onkologische Termin-Sicherheit | **Draft: /gesundheitsbibliothek/fragen/akupunktur-immunsuppression/** |
| 15 | Epilepsie | «Akupunktur Epilepsie Sicherheit» | Cochrane CD005062, DGN-LL | `/therapien/elektroakupunktur/`, Sicherheits-Hub | keiner (Behandlungs-Intent dominiert) | ausgeschieden (Briefing); Ersatz: Lymphknotenentfernung |
| 16 | Nach Operation | «Akupunktur nach Operation» | uzh.ch Nausea-Blogshot, akupunktur.de, tcm.ch/inkontinenz | `/wissen/akupunktur-bei-uebelkeit/` (P6), `/wissen/narbenbehandlung/` | reine Terminfrage, keine Wartefrist | **Draft: /gesundheitsbibliothek/fragen/akupunktur-nach-operation/** |
| 17 | Schmerzmittel | «Akupunktur Schmerzmittel nehmen» | aok.de, akupunktur.de PDF, tcm.ch/schmerzen-nach-akupunktur-schlimmer | Blutverdünner-, Schmerzverschlechterungs-, Erster-Termin-Owner | keiner | ausgeschieden (Briefing); Ersatz: Moxibustion-Sicherheit |
| 18 | Kräuter vor Operation | «TCM Kräuter vor Operation» | tcm-zentrum-kreuzlingen, tcm-kraeuter-nebenwirkungen | Nebenwirkungen-Owner (keine OP-Situation), `/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/` (Kräuter-Absatz) | OP-/Anästhesiegespräch, Produktliste, keine Absetzfrist | **Draft: /gesundheitsbibliothek/fragen/tcm-kraeuter-vor-operation/** |
| 19 | Kräuter Leberwerte | «TCM Kräuter erhöhte Leberwerte» | tcm.ch/leberwerte-erhoeht, gpt-alt-erhoeht, PubMed 29085558 | Nebenwirkungen-Owner (Leber/Niere-Abschnitt), Labor-Owner | keiner | ausgeschieden (Briefing); Ersatz: Kräuter unter Immunsuppressiva |
| 20 | Kräuter Nierenfunktion | «TCM Kräuter Nierenfunktion» | tcm-gasser PDF, agtcm.de, tcm-fachverband PDF | Nebenwirkungen-Owner, eGFR/Nierenwerte-Owner | keiner | ausgeschieden (Briefing); kein Ersatz gefunden |

## 2. Ersatzkandidaten für die 9 Ausschlüsse (eigene Recherche 21.10.2026)

Websuche je Kandidat (Phrase, Datum 21.10.2026, zurückgelieferte URLs), Sichtung der TCM.ch-Owner als Text.

| Kandidat | Suchphrase / Belege | Owner-Sichtung (Text) | Mehrwert-Prüfung | Entscheidung |
|---|---|---|---|---|
| Akupunktur nach Lymphknotenentfernung (Nadeln am betroffenen Arm) | «Akupunktur bei Lymphödem Arm nach Brustkrebs Nadeln betroffene Seite Sicherheit»: PMC5609040, NCT01706081, ascopost, westernsydney, cuh.nhs.uk, ruh.nhs.uk, cancerresearchuk | `/beschwerden/lymphoedem/` nennt nur «mit Rücksicht auf die betroffene Gliedmasse»; Chemo-Owner nennt «Lymphödemrisiken» als Planungspunkt | neu: Risikozahlen SLNB/CLND, Vorsichtsregel Nadeln/Akupunktur an betroffener Seite (Spital-Patienteninformationen), Entscheidungsweg Brustzentrum/Lymphtherapie, Infektionszeichen | **akzeptiert** (Ersatz für Nr. 15) |
| Moxibustion: Sicherheit vor dem Termin | «Moxibustion Nebenwirkungen Verbrennung Rauch wer darf nicht»: PMC4058265, dermnetnz, Cochrane CD010559, IDCases, acibadem | `/therapien/moxibustion/` (FAQ: Geruch, «verbrennt man sich?»), Hub-Antwort `schroepfen-methoden#moxibustion` (ein Satz zu Brandempfindlichkeit/Atemwegen) | neu: Risikogruppen (eingeschränktes Wärmeempfinden, Schwangerschaft, Haut, Atemwege) mit Fallsammlung, Formwahl, Warnzeichen | **akzeptiert** (Ersatz für Nr. 17) |
| TCM-Kräuter unter Immunsuppressiva | «herbal remedies after transplant immunosuppressants tacrolimus ciclosporin St John's wort»: EMC-PILs (Advagraf), SAGE 2013, frontierspartnerships, HPRA | Kräutertherapie-Seite nennt «Immunsuppressiva» in einem Satz; Nebenwirkungen-Owner nennt «enger therapeutischer Bereich» | neu: Herstellerwarnung (Johanniskraut, Schisandra, «any other herbal products»), Spiegelsteuerung, Tees/Nahrungsergänzungen, Entscheidungsweg Transplantationsteam/Apotheke; spezifische Interaktionsklasse wie bei der Pille | **akzeptiert** (Ersatz für Nr. 19) |
| TCM-Kräuter in Schwangerschaft/Stillzeit | «TCM Kräuter Schwangerschaft Stillzeit erlaubt»: hebamme-evascholz PDF, babyartikel, familie.de, Thieme a-0806-1683, BMC 12906-020-03032-0 | Nebenwirkungen-Owner hat Abschnitt «Was gilt bei Schwangerschaft und Stillzeit?» (Vorsicht, Rücksprache); Kräutertherapie-Seite fragt Schwangerschaft aktiv ab | kein substanzieller Inhalt jenseits «Rücksprache»; keine belastbare TCM-spezifische Quelle gefunden; analog zur Begründung Nr. 19/20 | verworfen |
| TCM-Kräuter bei Kindern | «chinesische Kräuter Kinder TCM Dosierung sicher»: PMC6612389 (Injektionen), MSD Manual, DOAJ-Artikel | kein Owner | nur generische Aussagen (UK: nicht empfohlen; Dosierung unsicher); keine Schweizer/pädiatrische Fachquelle, kein eigenständiger Handlungsschritt über «Kinderärztin fragen» hinaus; Angebot bei TCM.ch unklar | verworfen |
| TCM-Kräuter und Blutverdünner | «TCM Kräuter Blutverdünner Marcoumar Xarelto Wechselwirkung»: onmeda (Goji), cardio-bielefeld, apotheken.de | `/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/` enthält bereits einen Kräuter-Absatz (Medikamentenliste, Rücksprache); Nebenwirkungen-Owner verlinkt dorthin | bereits beantwortet; keine spezifischen Kräuterquellen gefunden | verworfen |
| Tuina/Massage bei Osteoporose | «Tuina Massage bei Osteoporose erlaubt Kontraindikation»: PMC5841994 (Protokoll), acupuncturetoday, utopia | `/beschwerden/osteoporose/` beantwortet «Ist Massage bei Osteoporose nicht gefährlich?» und beschreibt sanfte Tuina mit Befundmitnahme | bereits beantwortet durch den Condition-Owner | verworfen |
| Schröpfen in der Schwangerschaft | «Schröpfen in der Schwangerschaft erlaubt Kontraindikation»: gesundheits-lexikon, carepatron, doccheck, physio-lange PDF, Thieme a-1481-3702 | `/therapien/schroepfen/` listet «Schwangerschaft (relative Kontraindikation, mit Vorsicht möglich)»; Nebenwirkungen-Owner hat Vorsichtsliste | bereits beantwortet; Quellen uneinheitlich, keine Leitlinie | verworfen |
| Laser- oder Nadelakupunktur | «Laserakupunktur oder Nadelakupunktur Unterschied»: PMC3350989, DZA 2001, PubMed 20633458, boris.unibe.ch | `/therapien/akupunktur/laserakupunktur/` hat Abschnitte «Unterschied zur Nadelakupunktur» und «Für wen kann das interessant sein?» | bereits beantwortet durch den Methoden-Owner | verworfen |

Für Nr. 20 (Nierenfunktion) wurde kein geeigneter Ersatz gefunden; die Kandidaten Hämophilie, Hauterkrankung im Behandlungsbereich, Hebammen- vs. Praxis-Akupunktur und Ohr- vs. Körperakupunktur wurden aus Mehrwert- oder Quellengründen nicht weiterverfolgt.

## 3. Finales Manifest (14 Seiten)

| # | URL | Typ / Intent | Patientenentscheidung |
|---|---|---|---|
| 1 | /wissen/akupunktur-oder-physiotherapie/ | Wissen, Methodenvergleich | aktive Rehabilitation oder Nadelbehandlung |
| 2 | /wissen/akupunktur-oder-osteopathie/ | Wissen, Methodenvergleich | welche Fachrichtung anfragen |
| 3 | /wissen/akupunktur-oder-schroepfen/ | Wissen, Methodenvergleich | Nadelreiz oder Unterdruck |
| 4 | /wissen/tuina-oder-physiotherapie/ | Wissen, Methodenvergleich | manuell oder aktiv, RCT-Daten |
| 5 | /gesundheitsbibliothek/fragen/akupunktur-metallallergie/ | Frage, Sicherheit | Termin mit bekannter Allergie |
| 6 | /gesundheitsbibliothek/fragen/tcm-kraeuter-einnahme/ | Frage, praktische Anforderung | Einnahmeplan prüfen |
| 7 | /gesundheitsbibliothek/fragen/tcm-kraeuter-und-pille/ | Frage, Sicherheit | Kräuter bei hormoneller Verhütung |
| 8 | /gesundheitsbibliothek/fragen/akupunktur-mit-gelenkprothese/ | Frage, Sicherheit | Termin mit orthopädischem Implantat |
| 9 | /gesundheitsbibliothek/fragen/akupunktur-immunsuppression/ | Frage, Sicherheit | Termin unter Immunsuppressiva |
| 10 | /gesundheitsbibliothek/fragen/akupunktur-nach-operation/ | Frage, Sicherheit | Zeitpunkt nach Eingriff |
| 11 | /gesundheitsbibliothek/fragen/tcm-kraeuter-vor-operation/ | Frage, Sicherheit | OP-Team informieren |
| 12 | /gesundheitsbibliothek/fragen/akupunktur-nach-lymphknotenentfernung/ | Frage, Sicherheit (Ersatz) | Nadeln an betroffener Seite |
| 13 | /gesundheitsbibliothek/fragen/moxibustion-sicherheit/ | Frage, Sicherheit (Ersatz) | Rücksprache vor Moxibustion |
| 14 | /gesundheitsbibliothek/fragen/tcm-kraeuter-immunsuppressiva/ | Frage, Sicherheit (Ersatz) | Kräuter unter Immunsuppressiva |

Architektur: Wissen in `src/data/wissen-entscheidungen.ts` (Modell wie `wissen-kraeuter.ts`, angehängt in `wissen.ts`), Fragen in `src/data/fragen-entscheidungen.ts` (Frage-Interface, `cohort: 'entscheidungen-2026-10'`, angehängt in `fragen.ts`). Kleine Modellerweiterung: Kohorten-Union in `fragen.ts`, Datumslogik und Autorenkarte in `fragen/[slug].astro` (neue Kohorte ohne geerbtes Septemberdatum; Altbestand unverändert), scoped Tabellen-Stil `.table-wrap` in `wissen/[slug].astro`. Kein neuer Content-Engine, keine neue CTA-Komponente, keine Formular-/Tracking-Änderung.

## 4. Quellenmatrix

Zugriffsebene: V = Volltext/Patienteninformation geöffnet, A = Abstract/Metadaten (PubMed E-utilities), P = PDF-Text extrahiert. Korrektur-/Rücknahmeprüfung: PubMed-Datensätze 41514247, 39395482, 33550814, 42105092, 10998883, 1676221 ohne CommentsCorrections-Einträge (Stand 21.10.2026). NICE NG59/NG193 (403) und NHS-Tacrolimus (404) waren nicht abrufbar und wurden nicht verwendet.

| Seite | Quelle | Ebene | Trägt im Text |
|---|---|---|---|
| 1, 2, 3, 9, 10 | NCCIH, Acupuncture: Effectiveness and Safety (Okt 2022) | V | Nutzen bei Schmerzbildern, wenige Komplikationen, Versorgung nicht verzögern |
| 1 | Cochrane CD013814 Mu 2020 (33 Trials, 8270 Pat., Suche 29.08.2019) | V (Zusammenfassung) | Akupunktur vs. Schein/keine Behandlung/usual care, Gewissheit sehr niedrig bis moderat |
| 1 | Cochrane CD009790 Hayden 2021 (249 Studien, 24486 Pat.) | V (Zusammenfassung) | Bewegung reduziert Schmerz wahrscheinlich, kleiner Funktionseffekt |
| 1, 4 | Physioswiss Patienteninformation (Merkblätter 27.08.2024) | V | Grundversicherung nur mit Verordnung, 36-Sitzungen-Regel, freie Wahl |
| 2, 3, 7, 11, 14 | NHS, Herbal medicines and complementary therapies (1. Mai 2026) | V | Osteopathie-Beschreibung und Vorsichtspunkte, Akupunktur-Angebot NHS, Kräuter/Verhütung, Behandelnde informieren |
| 2, 4 | BAG FAQ GesBG | V | sieben Berufe, 1.2.2020, Master FH, kantonale Bewilligung, Register |
| 2 | Kanton Zürich Merkblatt Osteopathie (Nov 2023) | P | Berufsausübungsbewilligung, Master FH, Berufspflichten |
| 3 | NCCIH Cupping (Nov 2018) | V | Definition, Evidenz niedrig, Nebenwirkungen, Hygiene |
| 3 | J Back Musculoskelet Rehabil 2026, Cupping bei chron. Nackenschmerz (9 RCTs, n=401) | A | Hinweise auf Nutzen, keine schweren AE, Heterogenität |
| 4 | Ma Q et al. 2024, Complement Ther Med (n=204, 6 Sitzungen/8 Wo, 20-Wochen-FU, 1 AE) | A | keine Gruppenunterschiede VAS |
| 4 | Tan ICC et al. 2026, BMC Complement Med Ther (n=204, Singapur, ältere Population, ChiMCTR2000004087) | V (PMC-Volltext) | Schmerz ohne Unterschied nach 5 Mo, ODI zugunsten PT/Kombination (d≈0.4), gemeinsames Protokoll mit Jinan (im Volltext bestätigt), keine Placebo-Gruppe |
| 5, 8, 9, 10 | North Tees and Hartlepool NHS, Acupuncture (31.03.2026) | V | Metallallergie (Edelstahl, Nickel), Operation, Infekt, Immunsystem vorab angeben |
| 5, 9 | Guy's and St Thomas' NHS, Acupuncture (Aug 2024) | V | keine Akupunktur bei Edelstahlallergie, Immunsystem angeben |
| 5 | DermNet NZ, Nickel allergy (Apr 2023) | V | Epikutantest, Edelstahl selten auslösend |
| 5 | Masui 2000 (Fallbericht Nadeldermatitis, Nickel-Patchtest positiv); Acta Derm Venereol 1991 (Chrom) | A | Einzelfälle, keine Häufigkeit |
| 6 | Swissmedic, Asiatische Arzneimittel (Wegleitung 01.05.2025) | V | Komplementärarzneimittel, individualtherapeutischer Einsatz durch Fachpersonen |
| 6, 7, 11 | NHS 111 Wales, Herbal medicines (02.10.2025) | V | Wechselwirkungen, hormonelle Verhütung, OP: Arzt kann Absetzen in den Wochen davor anordnen |
| 6, 7, 13, 14 | NCCIH, TCM What You Need To Know (Apr 2019) | V | Verunreinigungen, nicht deklarierte Stoffe, Rücksprache |
| 6 | Lian Chinaherb Ratgeber | V | lieferantenspezifische Zubereitung, Nebenwirkung melden (nur für deren Produkte) |
| 8 | NHS, Complications of a hip replacement (06.03.2024) | V | kleine Infektionswahrscheinlichkeit, Warnzeichen |
| 8 | Acupunct Med 2021, Prosthetic knee joint infection after acupuncture | A (Metadaten, kein Abstract) | Einzelfall, keine Häufigkeit |
| 9 | NHS, About methotrexate (14.03.2023); OUH Rheumatology, Infections and vaccinations (02.08.2024) | V | erhöhtes Infektionsrisiko, Verhalten bei Infekt ist ärztliche Entscheidung |
| 10 | GOSH, How to care for a wound after surgery | V | Infektionszeichen, Wundversorgung |
| 11 | Guy's and St Thomas' NHS, Herbal remedies and dietary supplements (Apr 2026) | V | Empfehlung dieses Spitals: ≥2 Wochen Pause, Wiederbeginn nach Wundheilung (als Beispiel, nicht als Regel) |
| 12 | Cambridge University Hospitals NHS, Reducing the risk of lymphoedema (16.09.2024, v5) | V | SLNB ≈2 %, CLND ≈30 %, Nadeln inkl. Akupunktur vermeiden, keine starken Belege |
| 12 | Royal United Hospitals Bath, Lymphoedema Advice | P | «Avoid acupuncture to the affected side», Infektionszeichen |
| 12 | Cancer Research UK, Lowering your risk of lymphoedema (01.07.2026) | V | Injektionen/Blutentnahmen, Evidenzlage, Infektionszeichen |
| 13 | Xu/Deng/Shen 2014, Safety of Moxibustion, SR of case reports (64 Fälle) | V | Verbrennungen 43, Einflussfaktoren, Schwangerschaftsfälle, Sensibilitätsstörung |
| 13 | DermNet NZ, Moxibustion (Jun 2015) | V | Verbrennung mit Narbenbildung |
| 14 | EMC (UK), Advagraf Tacrolimus Packungsbeilage | P | Johanniskraut, andere pflanzliche Produkte, Schisandra, Spiegelkontrollen |

Verbleibende klinische Fragen (nicht aus Quellen klärbar, im Text offen gehalten): Nickelfreisetzung konkreter Nadelprodukte (5), Zeitpunkt nach Operation je Eingriff (10), Wechselwirkung einzelner chinesischer Kräuter mit Hormonpräparaten oder Immunsuppressiva (7, 14), Sicherheit von Nadeln an der betroffenen Seite nach Lymphknotenentfernung (12). Keine Reviewer, keine Freigabe behauptet; Author ist die bestehende Redaktions-/Organisationsangabe.

## 5. Title, Meta, H1, Quellen, Anschlussfragen, Links

| URL | Title (Zeichen) | Meta (Zeichen) | Quellen | FAQ | Bestands-Inbound (Satz bzw. Chip) | Outbound-Owner |
|---|---|---|---|---|---|---|
| /wissen/akupunktur-oder-physiotherapie/ | Akupunktur oder Physiotherapie: Was passt zu deinem Ziel? (66) | 162 | 4 | 3 | `/wissen/dry-needling-vs-akupunktur/` («Geht es dir weniger um Nadeln als um die Frage, ob aktive Rehabilitation oder eine Schmerzbehandlung passt …»), `/wissen/akupunktur-bei-rueckenschmerzen/` («Ob für dich eher aktive Physiotherapie oder eine Nadelbehandlung im Vordergrund steht …») | physiotherapie, akupunktur, dry-needling-vs-akupunktur, wann-zuerst-zum-arzt, krankenkassen/akupunktur, akupunktur-bei-rueckenschmerzen |
| /wissen/akupunktur-oder-osteopathie/ | Akupunktur oder Osteopathie: Unterschiede vor der Terminwahl (69) | 161 | 4 | 3 | `/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/` («Wer noch zwischen Methoden schwankt …»), `/wissen/akupunktur-bei-neurodermitis/` (nach der Charité-Studie) | akupunktur, wann-zuerst-zum-arzt, akupunktur-blutverduenner, akupunktur-bei-nackenschmerzen, krankenkassen/akupunktur |
| /wissen/akupunktur-oder-schroepfen/ | Akupunktur oder Schröpfen: Was unterscheidet die Behandlung? (69) | 170 | 4 | 3 | `/gesundheitsbibliothek/fragen/schroepfen-methoden/` (Antwort «Tut Schröpfen weh?»), `/wissen/schroepfen-wirkung-flecken/` («Worin sich Schröpfen und Akupunktur als Behandlung unterscheiden …»), Chip auf `/therapien/schroepfen/` | schroepfen, akupunktur, schroepfen-nebenwirkungen, akupunktur-nebenwirkungen, akupunktur-blutverduenner, wann-zuerst-zum-arzt, nach-der-behandlung |
| /wissen/tuina-oder-physiotherapie/ | Tuina oder Physiotherapie: Unterschiede und Ergänzung (62) | 170 | 4 | 3 | `/gesundheitsbibliothek/fragen/schroepfen-methoden/` (Antwort «Tuina oder klassische Massage?»), Chip auf `/therapien/tuina/` | tuina, physiotherapie, wann-zuerst-zum-arzt, tuina-nebenwirkungen, schroepfen-methoden#tuina |
| /gesundheitsbibliothek/fragen/akupunktur-metallallergie/ | Akupunktur bei Nickel- oder Metallallergie: Was klären? (64) | 163 | 5 | 3 | Hub `sicherheit-nebenwirkungen` (Antwort Hygiene/Nadeln), Chip auf `/therapien/akupunktur/` | beschwerden/kontaktdermatitis, akupunktur-nebenwirkungen, angst-vor-akupunktur-nadeln |
| /gesundheitsbibliothek/fragen/tcm-kraeuter-einnahme/ | TCM-Kräuter einnehmen: Was auf den Einnahmeplan gehört (63) | 164 | 4 | 3 | `/wissen/tcm-granulat-dekokt-tabletten/` («Welche Angaben ein vollständiger Einnahmeplan enthalten sollte …»), Chip auf `/therapien/kraeutertherapie/` | tcm-granulat-dekokt-tabletten, tcm-kraeuter-nebenwirkungen, chinesische-kraeuter-qualitaet-schweiz |
| /gesundheitsbibliothek/fragen/tcm-kraeuter-und-pille/ | TCM-Kräuter und die Pille: Wechselwirkungen vorab prüfen (65) | 168 | 3 | 3 | `/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/` («Für hormonelle Verhütung und für Immunsuppressiva … eigene Einordnungen»), `/wissen/chinesische-kraeuter-bei-regelschmerzen/` (FAQ zu hormonellen Medikamenten) | tcm-kraeuter-einnahme, tcm-kraeuter-nebenwirkungen |
| /gesundheitsbibliothek/fragen/akupunktur-mit-gelenkprothese/ | Akupunktur mit Knie- oder Hüftprothese: Was vorher klären? (67) | 171 | 3 | 3 | `/gesundheitsbibliothek/fragen/akupunktur-herzschrittmacher/» («Knie- oder Hüftprothesen, Schrauben und Platten sind keine elektrischen Geräte …»), `/wissen/akupunktur-bei-hueftschmerzen/` (nach dem Prothesen-Satz) | akupunktur-herzschrittmacher, akupunktur-nach-operation, akupunktur-blutverduenner |
| /gesundheitsbibliothek/fragen/akupunktur-immunsuppression/ | Akupunktur unter Immunsuppression: Was vorab klären? (61) | 163 | 5 | 3 | `/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/` («Für immunsuppressive Medikamente ohne Krebsbehandlung …»), `/wissen/haeufige-infekte-immunsystem/` («Wer bereits Immunsuppressiva nimmt …») | haeufige-infekte-immunsystem, akupunktur-waehrend-chemotherapie, tcm-kraeuter-immunsuppressiva, wann-zuerst-zum-arzt, akupunktur-herzschrittmacher |
| /gesundheitsbibliothek/fragen/akupunktur-nach-operation/ | Akupunktur nach einer Operation: Wann ist ein Termin möglich? (70) | 158 | 4 | 3 | `/wissen/narbenbehandlung/` («Wann nach einem Eingriff überhaupt ein Akupunkturtermin sinnvoll ist …»), `/wissen/akupunktur-bei-uebelkeit/` (nach P6-Absatz), Chip auf `/therapien/akupunktur/` | akupunktur-blutverduenner, akupunktur-oder-physiotherapie, wann-zuerst-zum-arzt, akupunktur-bei-uebelkeit, narbenbehandlung |
| /gesundheitsbibliothek/fragen/tcm-kraeuter-vor-operation/ | TCM-Kräuter vor einer Operation: Was das OP-Team wissen muss (69) | 164 | 3 | 3 | `/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/` («Vor einer Operation gilt dasselbe gegenüber dem Anästhesieteam …»), Chip auf `/therapien/kraeutertherapie/` | tcm-kraeuter-nebenwirkungen, tcm-kraeuter-einnahme, akupunktur-nach-operation |
| /gesundheitsbibliothek/fragen/akupunktur-nach-lymphknotenentfernung/ | Akupunktur nach Lymphknotenentfernung: Was gilt am Arm? (64) | 167 | 3 | 3 | `/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/` («Nach einer Lymphknotenentfernung betrifft das vor allem die betroffene Körperseite …»), Chip auf `/therapien/akupunktur/` | beschwerden/lymphoedem, akupunktur-waehrend-chemotherapie, akupunktur-bei-aromatasehemmer-gelenkschmerzen |
| /gesundheitsbibliothek/fragen/moxibustion-sicherheit/ | Moxibustion: Was vor dem Termin geklärt gehört (55) | 157 | 3 | 3 | Hub `schroepfen-methoden` (Antwort Moxibustion), Chip auf `/therapien/moxibustion/` | therapien/moxibustion, schroepfen-methoden#moxibustion, akupunktur-diabetes-sicherheit, akupunktur-herzschrittmacher |
| /gesundheitsbibliothek/fragen/tcm-kraeuter-immunsuppressiva/ | TCM-Kräuter unter Immunsuppressiva: Was vorab geklärt gehört (69) | 158 | 4 | 3 | `/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/` (derselbe Satz wie Pille), Chip auf `/therapien/kraeutertherapie/` | tcm-kraeuter-einnahme, tcm-kraeuter-nebenwirkungen, akupunktur-immunsuppression |

Hosts ohne EN-Pendant gewählt (Fragen, Hub-Antworten, Wissen, Chips über `FRAGEN_FOR_THERAPIE`); keine `therapie-leaves/*` und keine Beschwerde-Leaves verändert, Fingerprints unberührt (`check-i18n --strict`: outdated 0). Titles/Meta/H1/FAQ der Hosts unverändert. Wortumfang: Wissen 756 bis 875, Fragen 593 bis 660 (Hauptinhalt inkl. Kurzantwort, FAQ und Quellen).

## 6. Google-Qualitätsprüfung (Abruf 21.10.2026, redaktionelle Selbstprüfung, keine Freigabe)

Geprüfte Fassungen: Spam Policies (Stand 28.08.2026; «Scaled content abuse», «Doorway abuse»), Creating helpful, reliable, people-first content (Stand 05.10.2026; Who/How/Why, Originalität, Disclosure), Blogpost «Google Search's guidance about AI-generated content» (08.02.2023; angemessene Automatisierung nicht gegen Richtlinien, Manipulation ist Spam), Search Quality Rater Guidelines (Fassung 11. September 2025, 182 Seiten, PDF vollständig geladen; Abschnitte 4.6.5 Scaled Content Abuse, YMYL, Lowest Quality), Search Central Blog (keine neuere Guidance, die die 2023-Aussagen ersetzt; Hinweis auf «Optimizing for generative AI search» Mai 2026), Search Status Dashboard (21.10.2026: keine Incidents).

Je Seite gleich geprüft: eigener Patientenbedarf (Methodenwahl oder konkrete Sicherheitsfrage vor einem Termin), eigenständiger Mehrwert gegenüber dem gesichteten Bestand (Abschnitte 1 und 2), passender Zweck (Entscheidung, nicht Beschwerde oder Behandlungsversprechen), Quellenpassung (Abschnitt 4, Aussagen den Quellen zugeordnet, Grenzen benannt), YMYL-Sicherheit (Warnzeichen mit medizinischem Schritt, keine Dosen, keine Absetzfristen, keine Freigaben), keine kopierte Antwort, keine Doorway-/Skalierungsvariante (jede Seite eigene Entscheidung, Alias-Sperren in `do-not-create-intents.csv`), keine falsche E-E-A-T-Behauptung (Redaktionsangabe, kein Reviewer), hilfreicher nächster Schritt (CTA passend: Behandlungsweg besprechen bzw. zuerst Ärztin/Apotheke/OP-Team). Nicht verfügbar: Semrush-Volumina/KD, CWV, CRM-Daten. Nachfrage und Conversion sind nicht bewiesen.

## 7. Registrierungen (Commit 3)

- `seo/master-keyword-url-map.csv`: 14 Zeilen (21 Spalten, csv-geschrieben), Owner-Status PRIMARY_OWNER, source_confidence medium, Hinweis «Suchvolumen nicht verfügbar».
- `seo/do-not-create-intents.csv`: 14 Alias-/Varianten-Sperren mit Owner (Schreibvarianten, keine Methoden- oder Erkrankungsnamen reserviert).
- `seo/index-queue.md`: 14 URLs unter «Geplant (noch nicht live)», vorbereitet 21.10.2026, ohne Live-Datum. Kein GSC-Submit.
- `src/data/gesundheitsbibliothek.ts`: 4 Wissen in `METHODEN_ARTIKEL` (Bibliothekssuche; Fragen sind automatisch erfasst), 14 `SYNONYMS`.
- Hubs: `/wissen/` (Karten ohne Datum bis Release) und `/gesundheitsbibliothek/fragen/` automatisch; Sitemap über `scripts/gen-sitemap.mjs` beim Build (886 statt 872 URLs). `public/sitemap.xml` ist im Repo eingecheckt und beim Build neu generiert (alle lastmod auf das Build-Datum); hier nicht committet, wird beim Deploy-Build erzeugt.
- `scripts/check-entscheidungsfragen.mjs`: Kohortenprüfung über das tatsächliche Manifest (Route, H1, Canonical, indexierbar, Title/Meta eindeutig über alle Seiten, Breadcrumb/MedicalWebPage, kein FAQPage, kein Schema-Datum bei ungesetzter Konstante, kein geerbtes Septemberdatum, ≥2 Quellen, 3 Anschlussfragen, keine Em-/Gedankenstriche, interne Links und Anker, ≥2 Bestands-Inbound aus unterschiedlichen Seiten, Registrierungen, Sitemap, Wortumfang).
- `seo/health-library-audit.json`: vom Health-Audit neu geschrieben (wie bei früheren Kohorten mitcommittet).

## 8. Prüfungen (21.10.2026, finaler Build)

- `npm run build`: grün, 886 Sitemap-URLs, Worker kompiliert.
- `node scripts/check-entscheidungsfragen.mjs`: OK (0 Fehler, 14 Seiten).
- `node scripts/health-audit.mjs`: 0 Orphans, 0 doppelte Titel, 0 kaputte Beziehungs-Slugs, Wissen-Serie 36 Slugs 0 Fehler, Ownership-Gate 0 Fehler.
- `node scripts/check-i18n.mjs --strict`: 51 Einträge, outdated 0, warnings 0, failures 0.
- `check-first30`, `check-professional`, `check-clinic-status`, `check-standort-ux`, `check-kontakt-formular`: je 0 Fehler. `test-anfrage-betreff`: 86 PASS / 0 FAIL. `test-en-analytics`: 47 passed / 0 failed.
- `test-kontakt-formular` (Puppeteer): Lauf 1 parallel zu den Screenshot-Prüfungen gestört (zwei ✗ zu SG-Hero-Höhe/Telefon-only, Abbruch in Abschnitt U mit `null.getAttribute` auf `/standorte/st-gallen/`); Wiederholung allein und gegen den main-Basisbuild siehe Abschnitt 8a. Die Kohorte berührt keine Formulare, Standortseiten oder Hero-Komponenten.
- Build-Diff gegen frisch gebauten main (`62c97279`, Worktree): genau 14 neue `index.html`, keine entfernte URL; 25 geänderte Bestandsseiten = 3 Hubs (`/gesundheitsbibliothek/`, `/gesundheitsbibliothek/fragen/`, `/wissen/`) + 22 Link-Hosts (`akupunktur-blutverduenner`, `akupunktur-herzschrittmacher`, `akupunktur-waehrend-chemotherapie`, `schroepfen-methoden`, `sicherheit-nebenwirkungen`, `tcm-kraeuter-nebenwirkungen`, `wann-zuerst-zum-arzt`, `therapien/akupunktur|kraeutertherapie|moxibustion|schroepfen|tuina`, `wissen/akupunktur-bei-hueftschmerzen|-neurodermitis|-rueckenschmerzen|-uebelkeit`, `chinesische-kraeuter-bei-regelschmerzen`, `dry-needling-vs-akupunktur`, `haeufige-infekte-immunsystem`, `narbenbehandlung`, `schroepfen-wirkung-flecken`, `tcm-granulat-dekokt-tabletten`). EN-, Formular-, Tracking-, Standort- und Angebotsseiten unverändert. Host-Quellen entsprechen nach Entfernen der Link-Sätze dem Ausgangsstand (nur Einfügungen, Commit `36fd620f`).
- Overflow/Lesbarkeit (Puppeteer, lokaler Server auf dist, Drittskripte geblockt): 14 Seiten + 4 Hosts + Wissen-Hub bei 320/390/768/1440 px: 76 Prüfungen, 0 Fehler (Seitenüberlauf 0, genau eine H1, Tabellen innerhalb `.table-wrap` scrollbar, keine JS-Fehler). Erste Messung zeigte 21 bis 142 px Überlauf der Vergleichstabellen bei 320/390 px; behoben durch den scoped Stil in `wissen/[slug].astro` (Folgecommit). Der CookieYes-Fehler «website URL has changed» tritt nur auf localhost auf (Drittskript, nicht Teil der Kohorte).
- Screenshots (keine Patientendaten): Scratchpad `/tmp/claude-0/-home-user-tcm-ch/7256a291-45a8-5985-b8d0-3822d9872d66/scratchpad/ef/shots/` (Wissen 320/390/1440 und 768 für physiotherapie, Fragen 390/1440 und 768 für metallallergie, fünf Host-Absätze bei 1280 px). Nicht im Repo.

### 8a. test-kontakt-formular, Wiederholung

Wird nach Abschluss der Läufe hier nachgetragen (Branch allein, danach main-Basis; gleicher unveränderter Test).

## 9. Befunde im Bestand (nicht ungefragt geändert)

- `fragen/[slug].astro` zeigte für alle Fragen, auch Welle 3 (publiziert 14.10.2026), fix «zuletzt aktualisiert September 2026». Für die neue Kohorte behoben (kein Datum bis Release, danach Kohortendatum); Altbestand bewusst unverändert, Korrektur separat zu entscheiden.
- `public/sitemap.xml` im Repo trägt lastmod 2026-10-06 für alle URLs; der Build generiert sie neu. Unkritisch für Deploy, aber Diff-Rauschen.
- `/wissen/akupunktur-bei-uebelkeit/` enthält einen Gedankenstrich im Bestandstext (nicht von dieser Kohorte).
- Offener PR #15 berührt `fragen.ts`, Keyword-Map und Index-Queue; beim Merge beider PRs textuelle Konflikte in diesen Dateien möglich.

## 10. Release-Schritte (nur nach ausdrücklichem GO)

1. `PUBLISHED_ENTSCHEIDUNGEN_2026_10` in `src/data/befunde-werte.ts` auf das reale Datum setzen.
2. `seo/index-queue.md`: 14 Zeilen von «Geplant» nach «Offen» mit dem realen Datum verschieben (gleicher Commit).
3. `seo/master-keyword-url-map.csv`: Notiz «Draft-PR» auf «veröffentlicht» anpassen (optional).
4. Build, `check-entscheidungsfragen`, `health-audit`, `check-i18n --strict`; PR Ready, normaler Merge, Live-Check der 14 URLs.
5. Kein manueller GSC-Submit; die tägliche Queue-Aufgabe übernimmt.
