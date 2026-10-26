# Bibliothek 26.10.2026: neue Seiten aus dem SEO-Audit vom 26.10.2026

Release-Stand: GO am 26.10.2026, veröffentlicht am 26.10.2026 (Europe/Zurich) über PR #94 (normaler Merge-Commit). Basis: main `67b857e5` (Merge PR #93), beim Start und vor dem PR erneut geprüft. Offene PRs geprüft: #89 (Wissen-Cluster, Draft; keine Überschneidung mit Themen oder Host-Dateien dieses Pakets), #38, #15, #1 (keine Überschneidung mit Host-Dateien).

## 0. Ergebnis in Kürze

- **Aufgenommen: 14** (A 01 bis 10, C 17 bis 20). **Zurückgestellt: 6** (B 11 bis 16). **Ausgeschlossen: 0.**
- 10 Beschwerden-Leaves (Welle-6-Vorlage, ohne Datum, ohne FAQPage-Schema), 3 Befunde, 1 Untersuchungsseite.
- Konstante `PUBLISHED_BIBLIOTHEK_2026_10_26 = '2026-10-26'`: `datePublished` bei den drei Befunden, `datePublished`/`dateModified` bei Urodynamik (wie die bestehenden Seiten desselben Typs, ohne sichtbare Datumszeile); Beschwerden-Leaves bleiben ohne Datumsfeld. Bestehende Datumsfelder unverändert. Kein Reviewer, keine ärztliche Freigabe behauptet.
- 27 neue eigenständige Absätze in 21 Bestandsquellen; jede neue Seite hat genau zwei Kontext-Hosts aus der Basis. Nach Entfernen der Absätze sind alle Host-Quellen identisch mit main.
- Index-Queue: die 14 Einträge stehen unter «Offen» mit 26.10.2026 (PR #94); Einreichung nur über die bestehende Tagesqueue, kein separater GSC-Submit.
- Release (GO 26.10.2026): Sjögren erhält ebenfalls den neutralen WhatsApp-Text; damit tragen alle zehn neuen Beschwerden-Seiten «Guten Tag, ich habe eine allgemeine Frage zum Artikel ‹H1›.»
- Review-Runde 1 (26.10.2026): Angebotsdarstellung korrigiert (Abschnitt 2a), Sjögren um PMID 42826003 ergänzt (Abschnitte 3 und 4), Teststatus getrennt nach bestanden, Bestandsfehler und nicht erneut ausgeführt (Abschnitt 8).
- Review-Runde 2 (26.10.2026): Essentieller Tremor ebenfalls reine Orientierung (jetzt neun Orientierungsseiten); Regel «Methode + Studie = belegtes Angebot» gestrichen, stattdessen Evidenz, verfügbare Methode und dokumentierte Kompetenz getrennt (Abschnitt 1); Sjögren-Wortlaut als allgemeines Akupunktur-Angebot abgegrenzt; WhatsApp-Kontakt der neun Orientierungsseiten neutral vorbelegt (Abschnitt 2a).

## 1. Entscheidungstabelle

Volumen: Audit (Keyword-Planer DE/CH, 26.10.2026, gerundet). Keine Traffic-Prognose, Synonyme nicht addiert. Informationsnutzen und erwartete Buchungsabsicht werden getrennt bewertet; die Aufnahme beruht bei allen 14 Seiten auf dem Informationsnutzen. Die Zurückstellungen 11–16 beruhen auf geringem zusätzlichem Informationsnutzen, einem Sicherheits-/Dringlichkeitsprofil oder der Host-Regel, nicht auf fehlendem Angebot.

Drei Dinge werden getrennt dokumentiert und nicht miteinander verrechnet (Review 2):

- **Wissenschaftliche Evidenz:** was Studien zur Erkrankung zeigen (Abschnitte 3 und 4). Sie begründet Text zur Studienlage, kein Angebot.
- **Tatsächlich verfügbare Methode:** was die kanonischen Angebotsdaten ausweisen (`src/data/standorte.ts`, Feld `therapien`: Akupunktur an allen Standorten; Physiotherapie in Kreuzlingen, Frauenfeld, Rorschach, Volketswil, Wil, Winterthur Münzgasse/Marktgasse, Zürich Höngg).
- **Dokumentierte krankheitsspezifische Kompetenz:** ist für keine der zehn Erkrankungen in einer kanonischen Quelle dokumentiert und wird deshalb nirgends behauptet.

Eine Studie belegt keine Kompetenz unserer Praxen. Die frühere interne Regel «Methode an Standorten vorhanden + mindestens eine Studie = belegtes Angebot» ist gestrichen; sie wird weder im Bericht noch im Renderer oder im Prüfskript verwendet.

| Nr | Kandidat | Informationsnutzen | Wissenschaftliche Evidenz | Verfügbare Methode (kanonisch) | Dokumentierte krankheitsspezifische Kompetenz | Erwartete Buchungsabsicht | Entscheid und Darstellung |
|---|---|---|---|---|---|---|---|
| 01 | Medikamentenübergebrauchskopfschmerz | hoch: eigene Diagnose, im Bestand nur eine FAQ; Einnahmetage, Grenzwerte, ärztlicher Plan | keine Studie zur Diagnose; Akupunkturdaten zu Migräne nicht übertragbar | Akupunktur allgemein | keine | gering | **aufnehmen**, Orientierung |
| 02 | Hypermobilität | mittel bis hoch: HSD/hEDS-Abgrenzung, Schweizer Abklärungsweg | keine Akupunkturstudie; Physiotherapie als etablierte Behandlung (Rheuma Schweiz) | Physiotherapie (8 Standorte), Akupunktur allgemein | keine (HSD) | gering bis mittel | **aufnehmen**, Orientierung |
| 03 | Schambeinentzündung | mittel: Abgrenzung gegen viele Leistenschmerz-Ursachen, Warnzeichen | keine Studie | Physiotherapie (8 Standorte), Akupunktur allgemein | keine (Sportreha) | gering | **aufnehmen**, Orientierung |
| 04 | Sjögren-Syndrom | hoch: Systemerkrankung, Kontrollen, Lymphom-Warnzeichen, KK-Hinweis | 4 scheinkontrollierte RCTs, uneinheitlich (2 günstig, 2 ohne anhaltenden Unterschied); kein Wirksamkeitsnachweis | Akupunktur allgemein | keine | mittel (Trockenheitsbeschwerden) | **aufnehmen**, Orientierung mit sekundärem, ausdrücklich allgemeinem Akupunktur-Kontakt (keine Sjögren-Sprechstunde, kein Behandlungserfolg) |
| 05 | Essentieller Tremor | mittel bis hoch: Abgrenzung zu Parkinson/dystonem Tremor, Behandlungsstufen | Netzwerk-Metaanalyse 2026 (20 RCTs) mit schweren, von den Autoren benannten Limitationen | Akupunktur allgemein | keine | gering bis mittel | **aufnehmen**, Orientierung (Review 2) |
| 06 | POTS | hoch: Kriterien, Abgrenzung zu Long Covid/ME/CFS/Hypotonie | keine kontrollierte Akupunkturstudie; Training etabliert (NIH-Konsens, NHS) | Physiotherapie (8 Standorte), Akupunktur allgemein | keine | gering | **aufnehmen**, Orientierung |
| 07 | Mikroskopische Kolitis | hoch: Leitlinienwissen, Biopsiepflicht | keine Studie | Akupunktur allgemein | keine | sehr gering | **aufnehmen**, Orientierung |
| 08 | Gallensäurebedingter Durchfall | hoch: Test statt Ausprobieren, Begriffsklärung | keine Studie | Akupunktur allgemein | keine | sehr gering | **aufnehmen**, Orientierung |
| 09 | Proctalgia fugax | mittel: wenig deutschsprachige Patienteninformation, keine Schweizer Quelle gefunden | keine PF-spezifische Studie | Akupunktur allgemein | keine | sehr gering | **aufnehmen**, Orientierung |
| 10 | Beckenorgansenkung | hoch: Formen, Optionen, Warnzeichen | eine Akupunktur-RCT ohne Scheinkontrolle; Beckenbodentraining etabliert (USZ, NHS) | Physiotherapie (8 Standorte), Akupunktur allgemein | keine (Beckenboden) | gering | **aufnehmen**, Orientierung |
| 11 | Ganglion Handgelenk | gering: von USZ/KSW vollständig abgedeckt; «Überbein» mehrdeutig (Ownership-Risiko) | nicht belegt | – | keine | gering | **zurückstellen**: geringer Zusatznutzen und Mehrdeutigkeit |
| 12 | Morbus Dupuytren | gering: handchirurgische Spitalseiten decken ab, kein Volumenwert | nicht belegt | – | keine | gering | **zurückstellen**: geringer Zusatznutzen |
| 13 | Polymyalgia rheumatica | potenziell hoch, aber Riesenzellarteriitis-Warnzeichen und Kortisonführung verlangen rasche Rheumatologie; ohne fachliche Prüfung zu riskant | keine Studie | – | keine | gering | **zurückstellen**: Sicherheits-/Dringlichkeitsprofil, fachliche Prüfung nötig |
| 14 | Reaktive Arthritis | mittel, aber Akutabklärung (septische Arthritis, Augen) dominiert | nicht belegt | – | keine | gering | **zurückstellen**: gleiche Begründung wie 13 |
| 15 | Zervikale Dystonie | gering (10/Monat) | nicht belegt | – | keine | sehr gering | **zurückstellen**: Host-Regel nicht erfüllbar (Nackenschmerzen EN-geschützt, nur ein weiterer sinnvoller Host) |
| 16 | Analfissur | gering zusätzlich: starke Schweizer Patientenseiten (USZ, KSW) mit gleichem Inhalt | eine chinesische postoperative Studie | – | keine | gering | **zurückstellen**: geringer Zusatznutzen gegenüber bestehenden Schweizer Seiten |
| 17 | TRAK erhöht | mittel: konkreter Befund ohne Owner | nicht anwendbar (Befund) | – | – | sehr gering | **aufnehmen** (Befund-Orientierung, kein Behandlungsangebot) |
| 18 | Calcium zu niedrig | mittel: Gegenstück zu Calcium zu hoch, Albumin-Effekt | nicht anwendbar | – | – | sehr gering | **aufnehmen** (kein Behandlungsangebot) |
| 19 | Gesamt-IgE erhöht | mittel: Allergietest-Seite erwähnt nur spezifisches IgE (geprüft) | nicht anwendbar | – | – | sehr gering | **aufnehmen** (kein Behandlungsangebot) |
| 20 | Urodynamik | mittel: Ablauf, Messungen, Risiken | nicht anwendbar | – (TCM.ch führt die Untersuchung nicht durch) | – | sehr gering | **aufnehmen** (kein Angebot) |

Owner, Überschneidungen und Quellenlage je Kandidat: Abschnitte 3 bis 5. Keine Ersatzthemen.

## 2. Neue URLs

| URL | Typ | Title |
|---|---|---|
| /beschwerden/medikamentenuebergebrauchskopfschmerz/ | Leaf | Medikamentenübergebrauchskopfschmerz: Symptome und Behandlung |
| /beschwerden/hypermobilitaet/ | Leaf | Hypermobilität mit Schmerzen: Abklärung und Behandlung |
| /beschwerden/schambeinentzuendung/ | Leaf | Schambeinentzündung (Osteitis pubis): Symptome und Behandlung |
| /beschwerden/sjoegren-syndrom/ | Leaf | Sjögren-Syndrom: Symptome, Abklärung und Behandlung |
| /beschwerden/essentieller-tremor/ | Leaf | Essentieller Tremor: Symptome, Abklärung und Behandlung |
| /beschwerden/pots-syndrom/ | Leaf | POTS-Syndrom: Herzrasen beim Aufstehen abklären |
| /beschwerden/mikroskopische-kolitis/ | Leaf | Mikroskopische Kolitis: kollagene und lymphozytäre Kolitis |
| /beschwerden/gallensaeurebedingter-durchfall/ | Leaf | Gallensäurebedingter Durchfall: Ursachen, Test und Behandlung |
| /beschwerden/proctalgia-fugax/ | Leaf | Proctalgia fugax: kurze Schmerzattacken im After |
| /beschwerden/beckenorgansenkung/ | Leaf | Beckenorgansenkung: Gebärmutter- und Blasensenkung |
| /gesundheitsbibliothek/befunde-werte/trak-erhoeht/ | Befund | TRAK erhöht: TSH-Rezeptor-Antikörper verstehen |
| /gesundheitsbibliothek/befunde-werte/calcium-zu-niedrig/ | Befund | Calcium zu niedrig (Hypokalzämie): Befund verstehen |
| /gesundheitsbibliothek/befunde-werte/gesamt-ige-erhoeht/ | Befund | Gesamt-IgE erhöht: warum der Wert keine Allergie beweist |
| /gesundheitsbibliothek/untersuchungen/urodynamik/ | Untersuchung | Urodynamik: Ablauf und Befund der Blasendruckmessung |

## 2a. Angebotsdarstellung je Seite (Review 1 und 2)

Erfasst an den gerenderten Seiten (Build vor und nach der Änderung, Skript-Inventar plus Browser), nicht nur an den Quelldateien. Unterschieden wird A (Beschreibung einer etablierten Behandlung, mit Quelle zulässig) und B (Behauptung, die Behandlung sei bei TCM.ch verfügbar; braucht Nachweis aus den kanonischen Daten).

**Bisherige Angebotswirkung aller zehn Beschwerden-Leaves (Stand `f5a1c8d2`):** Hero-Primär-CTA «Passende TCM.ch-Klinik finden» und «Per WhatsApp schildern»; Meta-Punkt «Deutschschweizweit verfügbar»; USP-Leiste «Termin direkt anfragen», «Krankenkassen anerkannt»; Sidebar «Schnell starten» und «Passende Therapien» (Therapie-Karten); Methoden-Chips «Was ergänzend infrage kommt bei …»; 15 Standort-Karten «Praxen in deiner Nähe / Termin prüfen»; Fallback «wir empfehlen dir die passende Therapie und Praxis»; Standort-Absätze «Wir behandeln bei TCM St. Gallen mit Akupunktur und Tuina» usw.; Formularumfeld «Jetzt passende Hilfe anfragen» mit «Passende Praxis statt langem Suchen»; CTA-Band; Selbsttest «Unsicher, ob die TCM bei dir passt?»; geteilte mobile Sticky-Leiste «Termin anfragen»; Hub-Badge «Behandlung verfügbar» bei 02, 03, 04, 05, 10.

| Seite | Seitenspezifische Angebotswirkung bisher | Nachweis | Geänderte Darstellung |
|---|---|---|---|
| 01 Medikamentenübergebrauchskopfschmerz | Akupunktur-Karte; «Nächster Schritt» mit Praxisfinder für die Grunderkrankung | fehlt (B nicht belegt) | Klasse I (s. unten); Praxisfinder-Satz entfernt; TCM-Abschnitt verweist nur noch auf die Studienlage der anderen Seiten |
| 02 Hypermobilität | Physiotherapie-Karte «Stabilisationstraining, abgestimmt auf die Diagnose», Link auf Physiotherapie-Angebotsseite, Akupunktur-Karte, Praxisfinder | Physiotherapie allgemein an 8 Standorten (A belegt, B nur allgemein); HSD-spezifische Kompetenz nicht dokumentiert | Klasse I; Physiotherapie bleibt als etablierte Behandlung im Text (A, Rheuma Schweiz), ohne Angebotslink und ohne Karte |
| 03 Schambeinentzündung | Physiotherapie-Karte «Stufenweise Rehabilitation», Akupunktur-Karte, Satz «ergänzender Versuch bei Schmerzen», Praxisfinder | wie 02; keine Studie | Klasse I; Satz und Praxisfinder entfernt |
| 04 Sjögren | Akupunktur-Karte, CTA-Band «Sjögren-Syndrom: Praxis für eine ergänzende Behandlung finden», Standort-Absatz mit Tuina | Akupunktur allgemein verfügbar; Studienlage uneinheitlich; keine Sjögren-Kompetenz dokumentiert | Review 1: Akupunktur-Karte bleibt («Studien uneinheitlich; nur ergänzend nach der Diagnose»); CTA-Band methodenbezogen «Akupunktur als ergänzender Versuch: Praxis finden»; Standort-Absätze entfernt; Hub-Badge entfernt. Review 2 (Wortlaut-Prüfung, vier konkrete Stellen): Hero «Passende TCM.ch-Klinik finden» → «Akupunktur-Praxis finden»; Chips «Häufig eingesetzte Methoden / Was ergänzend infrage kommt beim Sjögren-Syndrom» → «Allgemeines Angebot / Akupunktur an unseren Standorten»; Sidebar «Passende Therapien» → «Methode an unseren Standorten»; «Nächster Schritt» ergänzt um «Akupunktur ist dort ein allgemeines Angebot; eine spezialisierte Sjögren-Sprechstunde gibt es bei TCM.ch nicht.» Quellen und Studiendarstellung unverändert; kein Text behauptet Sjögren-Kompetenz oder gesicherten Behandlungserfolg. WhatsApp-Vorbefüllung bleibt der Leaf-Standardtext (Auftrag Review 2: neutraler Text nur auf den neun Orientierungsseiten), siehe Abschnitt 9 |
| 05 Essentieller Tremor | wie 04 | Akupunktur allgemein verfügbar; NMA mit schweren Limitationen; keine Tremor-Kompetenz dokumentiert | Review 1 wie 04; Review 2: Klasse I (Orientierung) mit derselben Option wie die übrigen acht. Zusätzlich Praxisfinder-Satz entfernt und «Nach der neurologischen Diagnose kann ein ergänzender Versuch besprochen werden; …» auf «Verordnete Medikamente bleiben unverändert, bis die Neurologin etwas anderes entscheidet.» gekürzt; Studienabschnitt und seine Grenzen unverändert; «Wer ist zuständig?»: Hausarztpraxis, bei Bedarf Neurologie |
| 06 POTS | «Termin direkt anfragen»; Physiotherapie-Karte «Schrittweiser Trainingsaufbau nach ärztlicher Diagnose»; Akupunktur-Karte | fehlt; Training ist A (NIH-Konsens, NHS), Verfügbarkeit für POTS nicht belegt | Klasse I; Training nur noch als etablierte Massnahme im Text |
| 07 Mikroskopische Kolitis | Akupunktur-Karte, Standort-Karten, CTA-Band | fehlt | Klasse I |
| 08 Gallensäurebedingter Durchfall | wie 07 | fehlt | Klasse I |
| 09 Proctalgia fugax | wie 07 | fehlt | Klasse I |
| 10 Beckenorgansenkung | Physiotherapie-Karte «Beckenbodentraining mit ärztlicher Verordnung», Link auf Physiotherapie-Angebotsseite, Akupunktur-Karte, CTA-Band «Praxis für eine ergänzende Behandlung» | Beckenboden-spezialisierte Physiotherapie nicht dokumentiert | Klasse I; Beckenbodentraining bleibt als etablierte Behandlung im Text (A, USZ/NHS), ohne Angebotslink |
| 17–19 Befunde | geteilte Befund-Vorlage: CARE-Kasten «Anliegen schildern» / «Praxis finden», Formular «Anliegen schildern» (neutral: «ärztliche Abklärung, TCM oder eine andere Anlaufstelle»), Sticky «Termin anfragen» | kein Behandlungsangebot dargestellt; integrativer Kontext sagt, dass TCM die Werte nicht interpretiert | Sticky-Leiste über neue optionale Befund-Eigenschaft `stickyCta: false` aus (Default aller anderen Befunde unverändert); CARE-Kasten und Formular bleiben als allgemeiner, benannter Kontakt |
| 20 Urodynamik | Info-Hinweis «… wann eine Abklärung vor einer ergänzenden Behandlung sinnvoll ist», Karte «… ob eine ergänzende Behandlung sinnvoll ist» mit «Praxis finden», Sticky «Termin anfragen» | kein Angebot (TCM.ch führt die Untersuchung nicht durch) | Hinweis «bietet keine Blasenabklärung an»; Karte «Fragen zur Untersuchung?» mit Verweis auf die untersuchende Praxis und sekundärem «Allgemeiner Kontakt»; Satz zur ergänzenden Behandlung entfernt; Sticky aus |

**Klasse I = reine Orientierung (01, 02, 03, 05, 06, 07, 08, 09, 10; 05 seit Review 2), konkret geändert:** Hero-Primärschritt «Wann ärztlich abklären?» (Sprung zu den Warnzeichen), sekundär «Allgemeine Frage an TCM.ch» (Sprung zum Kontakt); Meta-Punkte «Ärztliche Abklärung zuerst», «Warnzeichen und Abgrenzung», «Mit Quellenangaben»; USP-Leiste, Therapie-Karten, Methoden-Chips, Standort-Karten, Standort-Absätze, Fallback, CTA-Band und Selbsttest-Teaser entfernt; Sidebar «Auf dieser Seite» (Sprungmarken) und «Wer ist zuständig?» (Hausarzt- und Facharztweg); Kontaktabschnitt «Allgemeiner Kontakt: Fragen an TCM.ch … Dieser Kontakt ersetzt nicht die ärztliche Abklärung bei …», Vertrauenszeile «Passende Praxis statt langem Suchen» entfernt; geteilte Sticky-Leiste über das bestehende `data-no-sticky-cta`-Opt-out aus; Hub-Badge entfernt; `therapies` in `beschwerden.ts` leer; Map-Spalte `treatment` bei 02, 03, 05, 10 geleert. Unverändert: CARE-Kasten (neutral, sekundär), Formular inkl. Prefill «Mein Anliegen betrifft: …», hidden-Felder, IDs, Versand, Tracking und Standortauswahl.

**Renderer:** Die Standort-Karten werden zentral ersetzt und brechen den Build ab, wenn der Block fehlt. Deshalb eine kleine explizite Option `INFO_ONLY_SLUGS` in `src/pages/beschwerden/[slug].astro` nur für die neun Klasse-I-Slugs (keine Karten-Ersetzung, kein Selbsttest-Teaser, neutraler WhatsApp-Text). Alle anderen Leaves: Verhalten unverändert (Build-Diff: keine Bestands-Leaf-Änderung ausser den Kontextabsätzen).

**WhatsApp-Kontakt der neun Orientierungsseiten (Review 2):** Der Renderer setzt für `INFO_ONLY_SLUGS` statt «Hallo, ich bin über Ihre Seite zu … gekommen und interessiere mich für eine Behandlung …» den Text «Guten Tag, ich habe eine allgemeine Frage zum Artikel ‹[H1 der Seite]›.» (`encodeURIComponent`, Umlaute, Doppelpunkt, Komma und ‹› korrekt kodiert). Betroffen sind alle seitenspezifischen wa.me-Ziele des Kontaktabschnitts: «WhatsApp, sofort starten» und der WhatsApp-Link im Formular (übernimmt sein Ziel beim Formular-Upgrade aus dem Leaf; das Formular-JS blendet ihn nur je Standort ein/aus und schreibt das Ziel nicht um). Unverändert: Nummer 41775236122, Event `wa_click` mit `quelle`/`prefilled` aus `public/home.js`, keine neuen Analytics-Parameter, keine vorausgewählte Terminart (Formular startet ohne Auswahl), Formular-Prefill «Mein Anliegen betrifft: …». Bewusst unverändert, weil global: Header/Drawer-WhatsApp, FAB, geteilte Sticky-Leiste (auf diesen Seiten per Opt-out unsichtbar) mit dem Standardtext «… hätte gerne kurz Hilfe bei der passenden Behandlung oder Praxis», sowie der Desktop-Concierge, der seinen Text erst per JS aus dem Seitentitel bildet («Hallo, ich komme von der Seite … und habe eine Frage.»). Praxisfinder bleibt getrennt; Formular bleibt.


## 3. Quellenmatrix

Zugang: **V** = Volltext gelesen, **A** = nur Abstract/Zusammenfassung, **–** = nicht zugänglich (nicht verwendet). Korrekturen/Rückzüge: PubMed-Datensätze aller zitierten PMIDs am 26.10.2026 geprüft (CommentsCorrections); keine Erratum- oder Retraction-Verknüpfung. PMID 35602489 hat nur einen Kommentar (CommentIn), PMID 7484717 ebenfalls.

| Seite | Quelle | Zugang | Verwendete Aussagen |
|---|---|---|---|
| 01 | ICHD-3 8.2 | V | ≥15 Kopfwehtage/Monat, Übergebrauch >3 Monate, 15 bzw. 10 Tage je Mittel, Schwellen = Expertenmeinung, mehr als die Hälfte der Menschen mit ≥15 Tagen |
| 01 | USZ Patienteninfo MÜKS (PDF) | V | Merkmale (täglich, morgens, schlechtes Ansprechen), 14/9 Tage, Pause ca. 4 Wochen, anfängliche Zunahme, Prophylaxe-Alternative, Ziel, Vorbeugen |
| 01 | NHS Headaches | V | Warnzeichen-Stufen |
| 02 | Rheuma Schweiz Hyperlaxitätssyndrom | V | 2017-Nomenklatur, 10–20 % vs. 0,1 %, Symptome, Beighton, keine Labor/Gen/Bildgebung für HSD, Differenzialdiagnosen, Therapie, Opiate/Muskelrelaxanzien meiden, Zentrum seltene Krankheiten Zürich, Verlauf |
| 02 | NHS Joint hypermobility syndrome | V | Wann zum Arzt (Verstauchungen, Luxationen, Müdigkeit, Blase/Darm) |
| 02 | Zulqarnain 2026 (PMID 42846266) | A | Fallbericht Pneumothorax nach thorakaler Akupunktur bei EDS |
| 03 | Via et al. 2019 (PMC6307487) | V | Häufigkeit 0,5–8 %, Muskelungleichgewicht, Sportarten, Symptome/Ausstrahlung, Differenzialdiagnosen-Tabelle (u. a. septische Arthritis, Hodentorsion, Hernie, Stressfraktur), Bildgebung nicht beweisend, konservativ erste Wahl, Kortisonspritzen schlecht belegt, OP bei hartnäckigen Fällen |
| 03 | UKE Schambeinentzündung | V | nicht infektiös, Ultraschall/MRT, Entlastung, Sportpause, Sportprogramm erst bei Schmerzfreiheit, OP Ausnahme |
| 04 | Rheumaliga Sjögren | V | Namensänderung 2025, Häufigkeit, Symptome, Diagnostik, Behandlung, Lymphom-Warnzeichen, ILD/Ödeme, KK-Kostengutsprache Augentropfen |
| 04 | USZ Sjögren | V | ca. 8000 in der Schweiz, sekundärer Sjögren, Diagnostik inkl. Lippenbiopsie, Schwangerschaft/fetale Überwachung, Medikamente als Ursache von Trockenheit |
| 04 | NHS Sjögren's | V | Beschwerden, Behandlung |
| 04 | Zhou 2022, Gomes-Silva 2025, Linares 2026 | A | Studiengrösse, Vergleich, Endpunkt, Ergebnis (siehe Abschnitt 4) |
| 04 | Li et al. 2026, Chin J Integr Med (PMID 42826003, DOI 10.1007/s11655-026-4253-2) | A (Volltext nicht zugänglich: Springer-Abo, nicht in PMC oder Europe PMC; Registereintrag TCTR20230116003 nicht abrufbar) | 138 Personen mit primärem Sjögren-Syndrom, eine Klinik in Tianjin; alle mit Hydroxychloroquin; echte vs. Scheinakupunktur (scheinkontrolliertes Add-on, prüft also einen spezifischen Nadeleffekt zusätzlich zum Medikament, kein Paket gegen Nichtbehandlung); 8 Behandlungsserien, 4 Wochen Nachbeobachtung; Primärendpunkt ESSPRI; 57/69 vs. 62/69 abgeschlossen; Akupunkturgruppe mit geringerem ESSPRI, geringerer Augen-/Mundtrockenheit, höherem Speichelfluss, Schirmer-Test und BUT, geringerem HADS-A (alle P<0,05); unerwünschte Ereignisse ohne Unterschied. Grenzen: keine Effektgrössen oder Konfidenzintervalle im Abstract, Verblindung von Personen und Auswertenden nicht beschrieben, ungleiche Abbruchraten, kurze Nachbeobachtung, eine Klinik; Schlussfolgerung «wirksamer als HCQ allein» geht über das Design (Vergleich mit HCQ plus Schein) hinaus. Keine Korrektur- oder Rücknahmevermerke (PubMed CommentsCorrections leer). Übertragung auf Menschen ohne HCQ und auf andere Ursachen von Mundtrockenheit nicht zulässig. |
| 05 | USZ Tremor | V | Definition, Formen, Ursachen/Medikamente, essentieller Tremor, Abklärungsfragen, Propranolol/Primidon/Topiramat, THS, fokussierter Ultraschall |
| 05 | NHS Tremor | V | leichter Tremor oft ohne Behandlung, Wann zum Arzt |
| 05 | Shi 2026 NMA (PMC13026131) | V | 20 RCTs, 1067 Teilnehmende, überwiegend China, Kontrollen, selbst benannte Limitationen |
| 05 | MedlinePlus Thyroid antibody tests | V | Beschwerden bei Morbus Basedow (für Warnzeichen) |
| 05 | DGN-Leitlinie Tremor | – | Abruf leer/Bot-Check; nicht verwendet |
| 06 | Vernino 2021 NIH-Konsens (PMC8455420) | V | Kriterien (≥30/≥40 Schläge, 10 min, kein OH, ≥3 Monate, Ausschlüsse), Begleiterkrankungen, Salz/Wasser (Nutzen nicht belegt), Kompression, Training liegend, keine FDA-Zulassung, Evidenz nicht robust |
| 06 | NHS PoTS | V | Symptome, Auslöser, Long Covid/ME/CFS/Hypermobilität, Abklärung, Massnahmen, Fludrocortison/Betablocker |
| 06 | NHS Fainting | V | Notfallkriterien |
| 06 | heart.org Tilt table | – | 403; nicht verwendet |
| 07 | Miehlke 2021 UEG/EMCG-Leitlinie (PMC8259259) | V | Definition, Häufigkeiten, Risikofaktoren, Symptome, Biopsie rechts/links, Calprotectin ungeeignet, Zöliakie-Screening, Budesonid, Nicht-Empfehlungen, kein Krebsrisiko |
| 07 | NIDDK Microscopic colitis | V | Grunddefinition |
| 07/08 | Arasaradnam 2018 BSG (PMC6204957) | V | Alarmzeichen, Gallensäure-Abschnitt (SeHCAT-Grade, C4, Stuhl-Gallensäuren, Ursachen, Ansprechraten, kein Therapieversuch statt Test) |
| 07/08 | NHS Diarrhoea | V | Notfall-/Dringlichkeitsstufen |
| 08 | NHS Bile acid malabsorption | – | 404; nicht verwendet |
| 09 | Rao 2016 Rom IV (PMID 27144630) | A | Dauer-Abgrenzung PF / LAS / unspezifisch, Biofeedback bei LAS |
| 09 | Carrington 2020 (PMID 32519087) | A | Behandlungsergebnisse bei PF bescheiden, Biofeedback nur bei LAS randomisiert belegt |
| 09 | Nidorf 1995 AFP (PMID 7484717) | A | gutartig, Ursache unbekannt, Diagnose aus Anamnese + normaler Untersuchung, Beruhigung am hilfreichsten |
| 09 | NHS Anal pain | V | Warnzeichen-Stufen |
| 09 | Xue 2024 (PMID 38454239) | A | 68 Personen, Akupunktur vs. Biofeedback, Ergebnis |
| 09 | Albuquerque 2026 BJS (PMID 42501305) | – | kein Abstract; nicht verwendet |
| 10 | USZ Gebärmutter-/Blasensenkung | V | Ursachen, Symptome, Restharn/Infekte, verdeckte Inkontinenz, Urodynamik, nicht-operative und operative Optionen |
| 10 | NHS Pelvic organ prolapse | V | Symptome, Untersuchung, Grad 1–4, Behandlung, Netz-Hinweis UK, Alltag, Ursachen inkl. Hypermobilität/EDS/Marfan |
| 10 | Wang 2020 (PMID 32100501), EAPOP-Protokoll 2022 (PMID 35667733) | A | Studienaufbau/Ergebnis; Protokoll ohne in PubMed gefundene Ergebnisse |
| 17 | MedlinePlus Thyroid antibody tests | V | TRAb/TSI, Graves/Hashimoto, Symptome, Schwangerschaft |
| 17 | gesund.bund.de TRAK | V | Funktion, laborabhängige Normalbereiche |
| 17 | Kahaly 2018 ETA-Leitlinie (PMID 30283735) | A | Messung für Diagnose, vor Therapieende, in der Schwangerschaft; anhaltend hohe Werte |
| 18 | MedlinePlus Calcium blood test | V | gesamt/ionisiert, Symptome, Ursachen tiefer Werte, DEXA-Hinweis |
| 18 | IQWiG Kalzium | V | Regulation, Hälfte gebunden, Referenzbereich, Ursachen (Diuretika, Kortison, Antiepileptika, PTH nach OP) |
| 19 | MedlinePlus Allergy blood test | V | Gesamt- vs. spezifisches IgE, keine Aussage zu Auslöser/Schwere, falsch positiv, Rauchen/Parasiten |
| 19 | gesundheit.gv.at IgE | V | Synonyme, Atopie, Referenz <100 U/ml (Kinder tiefer), normaler Wert schliesst Allergie nicht aus, Anaphylaxie |
| 20 | USZ Urodynamik | V | Zweck, Ablauf mit Katheter, Röntgen/Kontrast, Fachgebiete |
| 20 | NIDDK Urodynamic testing | V | Indikationen, Einzeltests, Restharn 100–150 ml, Vorbereitung, nach der Untersuchung, Risiken, Ergebnisdauer |

## 4. TCM-Evidenzsuche (PubMed, 26.10.2026)

Suchweg: PubMed E-utilities, englische Suchbegriffe in Titel/Abstract, Datum 26.10.2026; Trefferlisten gesichtet, relevante Abstracts gelesen. Grenze: nur PubMed, keine chinesischen Datenbanken.

| Thema | Suchbegriff | Treffer | Ergebnis auf der Seite |
|---|---|---|---|
| 01 | medication overuse headache + acupuncture/Chinese herbal + randomized/systematic/trial | 2 | keine Studie zur Frage; keine Übertragung von Migräne-/Spannungskopfschmerz-Daten |
| 02 | hypermobility/Ehlers-Danlos + acupuncture/Chinese medicine | 5 | keine Wirksamkeitsstudie; Fallbericht Pneumothorax als Sicherheitshinweis |
| 03 | osteitis pubis/pubalgia + acupuncture/dry needling | 2 | keine Studie zur Frage |
| 04 | Sjögren + acupuncture | 34 | 4 scheinkontrollierte RCTs (Abstract): Zhou 2022 n=120 kein Unterschied (28 % vs. 32 %, P=0,705); Gomes-Silva 2025 46 randomisiert/27 abgeschlossen, ESSPRI besser ≥4 Wochen; Li 2026 n=138, Add-on zu Hydroxychloroquin, ESSPRI und Trockenheit besser nach 4 Wochen Nachbeobachtung, ohne Effektgrössen im Abstract; Linares 2026 n=50 Laser, Woche 8 Tendenz, Woche 12 kein Unterschied. Fazit: uneinheitlich, kein verlässlicher Nachweis, Dauer der Wirkung offen. PMID 42826003 im ersten Durchgang gefunden, aber nicht gelesen; in Review-Runde 1 ausgewertet und aufgenommen |
| 05 | essential tremor + acupuncture/Chinese herbal | 4 | NMA Shi 2026 (Volltext) mit selbst benannten Limitationen; kein Nachweis |
| 06 | postural orthostatic tachycardia + acupuncture/Chinese medicine | 5 | nur Erfahrungsbeiträge/Protokollvorschlag 2025; keine kontrollierte Studie |
| 07 | microscopic/collagenous/lymphocytic colitis + acupuncture/Chinese herbal/herbal | 1 | Fallbericht anderer Erkrankung; keine Studie gefunden |
| 08 | bile acid diarrh(o)ea/malabsorption + acupuncture/Chinese herbal | 2 | allgemeine Übersichten; keine Studie zur Ursache |
| 09 | proctalgia fugax/functional anorectal pain/levator ani + acupuncture/EA | 6 | keine PF-spezifische Studie; Xue 2024 (funktioneller Enddarmschmerz allgemein, ohne Scheinkontrolle) |
| 10 | pelvic organ/uterine prolapse + acupuncture/EA + randomized/trial | 2 (ohne Filter 5) | Wang 2020 (n=60, ohne Scheinkontrolle, Abstract); EAPOP-Protokoll ohne gefundene Ergebnisse |
| 13 | polymyalgia rheumatica + acupuncture/Chinese herbal | 2 | keine Studie (Begründung Zurückstellung) |
| 16 | anal fissure + acupuncture/Chinese herbal + trial | 1 | eine chinesische postoperative Studie (Begründung Zurückstellung) |

Auf keiner Seite steht «es gibt keine Studien»; formuliert ist jeweils «in einer PubMed-Suche am 26.10.2026 … haben wir … gefunden» mit Suchbegriffen.

## 5. Ownership-Grenzen

Vollständig in `seo/master-keyword-url-map.csv` (14 neue Zeilen, nur angehängt) und `seo/do-not-create-intents.csv` (14 Guards, nur angehängt). Keine bestehende Zuweisung verschoben; Kollisionsprüfung der neuen Primär-/Sekundärkeywords gegen alle 921 Basiszeilen: 0 Treffer. Wichtigste Grenzen:

- 02: hEDS, vEDS, Marfan, Loeys-Dietz nicht reserviert, keine Synonyme.
- 03: Schambeinfuge in der Schwangerschaft bleibt bei symphysenschmerzen-schwangerschaft; Pubalgie und Leistenschmerz nicht reserviert.
- 04: Sicca-Syndrom kein Synonym, bleibt bei trockene-augen.
- 05: «Tremor» allein und Händezittern bleiben beim Körpersignal.
- 06: Long Covid, ME/CFS, Herzrasen allgemein nicht reserviert.
- 07: beide Unterformen auf einer Seite; keine Unterform-Seiten.
- 09: Levator-ani-Syndrom kein Synonym.
- 10: Gebärmuttersenkung, Blasensenkung als abgedeckte Unterformen, nicht als Synonyme.
- 17–19: TPO, TSH, fT3/fT4, Calcium zu hoch, PTH, Vitamin D, Allergietest/spezifisches IgE bleiben Owner.
- Suchsynonyme nur für Seitentypen im Bibliotheks-Suchindex (Beschwerden, Befunde, Untersuchungen); im gebauten Index je Seite geprüft (Eintrag plus Synonym im selben Datensatz).

## 6. Host-Absätze (27 Absätze, 21 Quelldateien)

Alle als neue eigenständige `<p>`-Absätze; keine EN-geschützte Quelle (die 8 EN-Leaves, Home, Standorte) betroffen. Alle 28 Host-Vorschläge des Audits für die 14 aufgenommenen Seiten wurden nach Prüfung der gerenderten Seiten übernommen; die Vorschläge für 11–16 entfallen (zurückgestellt, darunter der EN-geschützte Host Nackenschmerzen für 15). Der Absatz auf /beschwerden/inkontinenz/ verlinkt Beckenorgansenkung und Urodynamik gemeinsam.

| Ziel | Host | Quelldatei | Neuer Absatz |
|---|---|---|---|
| medikamentenuebergebrauchskopfschmerz | /beschwerden/kopfschmerzen/ | `src/data/symptom-leaves/kopfschmerzen.html` | Nimmst du an vielen Tagen im Monat Mittel gegen Kopfweh, können sie selbst zu häufigeren Kopfschmerzen führen. Wie man einen Medikamentenübergebrauchskopfschmerz erkennt und warum dabei die Einnahmetage zählen, erklärt eine eigene Seite. |
| medikamentenuebergebrauchskopfschmerz | /beschwerden/spannungskopfschmerzen/ | `src/data/symptom-leaves/spannungskopfschmerzen.html` | Greifst du über Monate an mehr als 14 Tagen im Monat zu einfachen Schmerzmitteln, kann daraus ein eigener Dauerkopfschmerz entstehen. Mehr dazu unter Medikamentenübergebrauchskopfschmerz. |
| hypermobilitaet | /beschwerden/fibromyalgie/ | `src/data/symptom-leaves/fibromyalgie.html` | Wechselnde Gelenk- und Muskelschmerzen zusammen mit sehr beweglichen Gelenken und wiederholten Verstauchungen können auch zu einer beschwerdehaften Hypermobilität passen; die Abklärung grenzt beides voneinander ab. |
| hypermobilitaet | /beschwerden/sprunggelenkschmerzen/ | `src/data/symptom-leaves/sprunggelenkschmerzen.html` | Knickst du seit der Kindheit immer wieder um und sind auch andere Gelenke auffällig beweglich, lohnt sich ein Blick auf die Hypermobilität als mögliche Ursache wiederholter Verstauchungen. |
| schambeinentzuendung | /beschwerden/adduktorentendinopathie/ | `src/data/symptom-leaves/adduktorentendinopathie.html` | Sitzt der Schmerz eher direkt über dem Schambein und verstärkt er sich auch bei Bauchmuskelarbeit, kommt eine Schambeinentzündung (Osteitis pubis) infrage; beide Diagnosen treten bei Sportlern auf und werden bei der Abklärung voneinander getrennt. |
| schambeinentzuendung | /beschwerden/hueftschmerzen/ | `src/data/symptom-leaves/hueftschmerzen.html` | Bei Sportlerinnen und Sportlern mit Schmerzen vorne in der Leiste und über dem Schambein ist auch an eine Schambeinentzündung zu denken, eine Überlastung der Schambeinfuge. |
| sjoegren-syndrom | /beschwerden/trockene-augen/ | `src/data/symptom-leaves/trockene-augen.html` | Kommen zu trockenen Augen ein trockener Mund, ausgeprägte Müdigkeit oder Gelenkschmerzen hinzu, kann eine Autoimmunerkrankung dahinterstecken. Was dann abgeklärt wird, erklärt die Seite Sjögren-Syndrom. |
| sjoegren-syndrom | /koerpersignale/trockener-mund-nachts/ | `src/data/koerpersignale.ts` | Sind Mund und Augen über Monate gemeinsam trocken, oft zusammen mit Müdigkeit oder Gelenkschmerzen, kann ein Sjögren-Syndrom dahinterstecken; die Abklärung erfolgt rheumatologisch. |
| essentieller-tremor | /koerpersignale/haende-zittern/ | `src/data/koerpersignale.ts` | Wie der essentielle Tremor abgeklärt und behandelt wird, von Medikamenten bis zu Hirnstimulation und fokussiertem Ultraschall, beschreibt die Seite Essentieller Tremor. |
| essentieller-tremor | /gesundheitsbibliothek/untersuchungen/neurologische-untersuchung/ | `src/pages/gesundheitsbibliothek/untersuchungen/neurologische-untersuchung.astro` | Bei zitternden Händen zeigt die Untersuchung zum Beispiel, ob das Zittern eher in Ruhe oder beim Halten und Bewegen auftritt; das hilft, einen essentiellen Tremor von anderen Formen abzugrenzen. |
| pots-syndrom | /beschwerden/long-covid/ | `src/data/symptom-leaves/long-covid.html` | Rast nach einer Covid-Erkrankung beim Aufstehen der Puls und bessern sich Schwindel und Herzklopfen im Liegen, kann zusätzlich ein POTS vorliegen; es wird mit einer Messung im Liegen und Stehen abgeklärt. |
| pots-syndrom | /koerpersignale/schwindel-beim-aufstehen/ | `src/data/koerpersignale.ts` | Steigt beim Stehen vor allem der Puls stark an und kommen Schwindel und Herzklopfen über Monate fast täglich, kann ein POTS dahinterstecken; die Diagnose braucht eine ärztliche Messung im Liegen und Stehen. |
| mikroskopische-kolitis | /koerpersignale/durchfall-am-morgen/ | `src/data/koerpersignale.ts` | Bei wässrigem, nicht blutigem Durchfall über Wochen kann auch eine mikroskopische Kolitis die Ursache sein; sie zeigt sich nur in Gewebeproben aus der Darmspiegelung. |
| mikroskopische-kolitis | /gesundheitsbibliothek/untersuchungen/koloskopie/ | `src/pages/gesundheitsbibliothek/untersuchungen/koloskopie.astro` | Bei chronischem wässrigem Durchfall werden Gewebeproben auch dann entnommen, wenn die Schleimhaut normal aussieht, weil eine mikroskopische Kolitis nur unter dem Mikroskop sichtbar wird. |
| gallensaeurebedingter-durchfall | /beschwerden/reizdarm/ | `src/data/symptom-leaves/reizdarm.html` | Bei Reizdarm mit wässrigem Durchfall kommt auch ein gallensäurebedingter Durchfall infrage, der sich mit einem Test nachweisen lässt. |
| gallensaeurebedingter-durchfall | /beschwerden/morbus-crohn/ | `src/data/symptom-leaves/morbus-crohn.html` | Nach einer Operation am letzten Dünndarmabschnitt kann ein gallensäurebedingter Durchfall dazukommen, typischerweise nach dem Essen; er wird gezielt getestet und behandelt. |
| proctalgia-fugax | /beschwerden/beckenbodenverspannung/ | `src/data/symptom-leaves/beckenbodenverspannung.html` | Kurze, heftige Schmerzattacken im After, die nach Sekunden bis Minuten vorbei sind, passen eher zu einer Proctalgia fugax, einer eigenen Diagnose. |
| proctalgia-fugax | /beschwerden/pudendusneuralgie/ | `src/data/symptom-leaves/pudendusneuralgie.html` | Davon abzugrenzen ist die Proctalgia fugax mit plötzlichen Schmerzattacken im After, die nur Sekunden bis Minuten dauern und zwischen denen keine Beschwerden bestehen. |
| beckenorgansenkung | /beschwerden/inkontinenz/ | `src/data/symptom-leaves/inkontinenz.html` | Kommt zum Urinverlust ein Druck- oder Fremdkörpergefühl in der Scheide, kann eine Beckenorgansenkung beteiligt sein. Welche Form der Inkontinenz vorliegt, lässt sich bei Bedarf mit einer Urodynamik klären. |
| beckenorgansenkung | /beschwerden/rektusdiastase/ | `src/data/symptom-leaves/rektusdiastase.html` | Spürst du nach der Geburt zusätzlich ein Druck- oder Fremdkörpergefühl in der Scheide, denk auch an eine Beckenorgansenkung; sie wird gynäkologisch untersucht. |
| urodynamik | /beschwerden/reizblase/ | `src/data/symptom-leaves/reizblase.html` | Bleibt die Ursache der Beschwerden unklar, kann eine Urodynamik zeigen, ob sich die Blase beim Füllen ungewollt zusammenzieht oder ob der Abfluss behindert ist. |
| trak-erhoeht | /beschwerden/schilddruesenueberfunktion/ | `src/data/symptom-leaves/schilddruesenueberfunktion.html` | Wie ein erhöhter Wert der Antikörper gegen den TSH-Rezeptor zu lesen ist, erklärt die Befundseite TRAK erhöht. |
| trak-erhoeht | /gesundheitsbibliothek/befunde-werte/tpo-antikoerper-erhoeht/ | `src/data/befunde-werte.ts` | Bei einer Überfunktion werden oft auch die Antikörper gegen den TSH-Rezeptor bestimmt, die vor allem zum Morbus Basedow gehören; mehr dazu unter TRAK erhöht. |
| calcium-zu-niedrig | /gesundheitsbibliothek/befunde-werte/calcium-zu-hoch/ | `src/data/befunde-werte.ts` | Den umgekehrten Befund, einen zu tiefen Calciumwert, und seine möglichen Ursachen beschreibt die Seite Calcium zu niedrig. |
| calcium-zu-niedrig | /gesundheitsbibliothek/befunde-werte/parathormon/ | `src/data/befunde-werte.ts` | Ist das Calcium zusammen mit dem Parathormon tief, etwa nach einer Operation am Hals, hilft die Seite Calcium zu niedrig bei der Einordnung. |
| gesamt-ige-erhoeht | /gesundheitsbibliothek/untersuchungen/allergietest/ | `src/pages/gesundheitsbibliothek/untersuchungen/allergietest.astro` | Davon zu unterscheiden ist das Gesamt-IgE, die Summe aller IgE-Antikörper im Blut; was ein erhöhter Wert bedeutet und was nicht, erklärt Gesamt-IgE erhöht. |
| gesamt-ige-erhoeht | /gesundheitsbibliothek/befunde-werte/eosinophile-erhoeht/ | `src/data/befunde-werte.ts` | Bei Verdacht auf eine Allergie wird manchmal auch das Gesamt-IgE bestimmt; wie ein erhöhter Wert einzuordnen ist, steht unter Gesamt-IgE erhöht. |

## 7. Registrierungen

- Renderer: `beschwerden.ts` (10 Einträge), Title-/Meta-Map, `NO_FAQ_SCHEMA`, `REBRANDED_SLUGS`; Keep-Liste (10 Slugs).
- Hubs: Beschwerden A–Z (10 Zeilen), Untersuchungen-Hub (Urodynamik), Befunde-Hub automatisch aus `befunde-werte.ts`.
- Körperregionen: kopf, bauch-verdauung (2), huefte-bein-fuss, schlaf-nervensystem (2), becken-blase (2); Hypermobilität und Sjögren ohne Region (mehrere Regionen).
- Suche: 14 Synonymzeilen; `DIAGNOSTICS`-Eintrag Urodynamik.
- Map, Guards, Queue (14 × «Geplant», ohne Datum).
- Prüfskript `scripts/check-bibliothek-2026-10-26.mjs`.
- Review 1: Renderer-Option `INFO_ONLY_SLUGS` (Beschwerden), optionale Befund-Eigenschaft `stickyCta` (Default aktiv), Prüfskript um Assertions zur gerenderten Angebotsdarstellung ergänzt (Klasse I, Klasse II, Befunde, Urodynamik, Hub-Badges).
- Review 2: `essentieller-tremor` in `INFO_ONLY_SLUGS`, `therapies: []` in `beschwerden.ts`, Map-Spalte `treatment` geleert; neutraler WhatsApp-Text für `INFO_ONLY_SLUGS`; Prüfskript: Tremor in INFO, Assertion auf exakten WhatsApp-Text (dekodiert, Nummer unverändert, mindestens zwei Kontakt-Links) und auf die Sjögren-Abgrenzung.

## 8. Prüfungen

### Release-Stand (GO, 26.10.2026)

Geprüft: Branch-Inhaltsstand `1d2c1ade` (Sjögren-WhatsApp `d53d690d`, Release-Daten `1d2c1ade`); main `67b857e5` unverändert, frischer main-Build im separaten Worktree. Live-Prüfung nach dem Deployment: Kommentar auf PR #94.

- Build 930 URLs (main 916). Kohortenprüfung `--base-sitemap=<frischer main-Build>`: **OK** für 14 URLs, inklusive Schema-Datum = Konstante (2026-10-26) und WhatsApp-Assertion jetzt für alle zehn Beschwerden-Seiten.
- Schema: trak-erhoeht, calcium-zu-niedrig, gesamt-ige-erhoeht `datePublished` 2026-10-26; Urodynamik `datePublished`/`dateModified` 2026-10-26; Leaves ohne Datumsfeld; keine sichtbare Datumszeile (wie Bestandsseiten desselben Typs), kein «NaN»/«Invalid Date»; Bestands-Datumsfelder (z. B. TPO, Koloskopie, Allergietest) unverändert.
- Browser nach JS (390/1440, externe Anfragen blockiert, Klicks abgefangen, nichts gesendet): 22 Aufrufe, 0 Fehler. Alle zehn Seiten neutral (Sjögren: fünf seitenspezifische Links inkl. Hero, CTA-Band und Formular-Link nach Standortwahl); genau ein `wa_click` (`quelle: form`), keine Formular-Conversion; Referenz `/beschwerden/rueckenschmerzen/` unverändert.
- Angebotsprüfung neun Orientierungsseiten 18/0 (Sticky-Opt-out, Anker `#warnzeichen` mit Ziel, Formular vorhanden, trotz bekannter DOM-Verschachtelung); Viewports 64 Kombinationen, 0 Überläufe; Sichtprüfung Sjögren 320/1440, Tremor 320/390/1440, TRAK 390, Urodynamik 1440.
- Gates: health-audit, check-kontakt-formular, clinic-status, standort-ux, first30, professional, herbst-sg: 0 Fehler; test-en-analytics 48/0; test-anfrage-betreff 92/0; test-kontakt-formular 715/0; test-hero-video 124/0; check-i18n mit frisch erzeugter Build-Sitemap 0 failures (mit eingecheckter Sitemap weiterhin der bekannte S4-Bestandsfehler).
- Build-Diff gegen frischen main-Build (alle Dateien inkl. Assets/Worker): 14 neu, 0 entfernt, 38 geändert = 27 Host-Seiten, 4 Hubs (Beschwerden, Befunde, Untersuchungen, Bibliothek), 5 Körperregionen, `beschwerden-keep.js`, `sitemap.xml`. Keine EN-, Standort-, Tracking-, Formular-, Asset- oder Worker-Änderung.
- Bestandsschutz: 27/27 Host-Seiten nur um genau einen Kontextabsatz ergänzt; Quellen 21/21 nach Entfernen identisch mit main.

### Review-Runde 2 (26.10.2026)

**Geprüfter Stand:** Branch-HEAD `bfe923cc` (inhaltlich final; der anschliessende Bericht-Commit ändert nur diesen Bericht und `seo/health-library-audit.json`, das vom Gate `health-audit` geschrieben wird). Vorheriger PR-Stand: `56f1ccfe`. Basis: main `67b857e5`, vor Beginn und vor dem Push erneut geprüft, unverändert. Frischer Branch-Build nach der letzten Inhaltsänderung; Vergleich gegen den Build des vorigen PR-Stands und gegen den frischen main-Build aus Runde 1 (main seither unverändert).

#### Bestanden

- `npm run build` (Branch): grün, Sitemap 930 URLs (unverändert; main 916).
- `node scripts/check-bibliothek-2026-10-26.mjs --base-sitemap=<main-Build 67b857e5>/sitemap.xml`: **OK** für alle 14 URLs. Neu in Runde 2: Tremor in der INFO-Liste (neun Orientierungsseiten: keine Angebotskarten, Primärschritt `#warnzeichen`, Sprungziel vorhanden, «Allgemeiner Kontakt», Sticky-Opt-out, Formular vorhanden); exakter, dekodierter WhatsApp-Text «Guten Tag, ich habe eine allgemeine Frage zum Artikel ‹H1›.» auf allen seitenspezifischen wa.me-Zielen, Nummer 41775236122, mindestens zwei Kontakt-Links; Sjögren ohne «Häufig eingesetzte Methoden», «Passende TCM.ch-Klinik finden», «Passende Therapien», mit Abgrenzungssatz.
- Browser nach JS-Initialisierung (390 und 1440 px, externe Anfragen blockiert, Klicks per `preventDefault` abgefangen, keine Nachricht gesendet, kein Popup geöffnet): 22 Aufrufe, 0 Fehler. Neun Orientierungsseiten: alle wa.me-Ziele im Seiteninhalt und Kontaktabschnitt tragen den neutralen Text; nach Standortwahl im Formular wird der Formular-WhatsApp-Link sichtbar und trägt denselben Text; Klick darauf erzeugt genau ein Event `{event: 'wa_click', quelle: 'form', prefilled: false}` und kein Formular-/Lead-Event; keine Terminart vorausgewählt. Referenzseiten `/beschwerden/rueckenschmerzen/` (Bestand) und `/beschwerden/sjoegren-syndrom/`: unveränderter Standardtext, gleiches einzelnes `wa_click`.
- Angebots-Browserprüfung der neun Orientierungsseiten (390/1440): 18 Aufrufe, 0 Fehler (Sticky aus, Primärschritt springt auf vorhandenes Ziel, Formular und CARE-Kasten vorhanden, keine Standort- und Therapie-Karten).
- Tremor visuell bei 320, 390 und 1440 px (Hero, Artikel, Kontaktabschnitt, Formular): keine Überläufe, Hero mit «Wann ärztlich abklären?» und «Allgemeine Frage an TCM.ch», Sticky/FAB unsichtbar; Viewport-Prüfung 320/390/768/1440 der 14 Seiten plus Hubs: 64 Kombinationen, 0 Seitenüberläufe.
- Regressionstests wegen der Renderer-Änderung: `test-kontakt-formular` 715/0, `test-hero-video` 124/0, `test-en-analytics` 48/0, `test-anfrage-betreff` 92/0; Gates `health-audit` 0 Fehler (Audit-JSON: Praxisfinder-Link der Tremor-Seite entfällt, ausgehende Gesundheitslinks 8 → 7), `check-kontakt-formular` 0, `check-clinic-status` 0, `check-standort-ux` 0, `check-first30` 0, `check-professional` grün, `check-herbst-sg` bestanden; `check-i18n` mit Build-Sitemap 0 failures.
- Build-Diff gegen den vorigen PR-Stand `56f1ccfe`: 0 neu, 0 entfernt, genau 10 Seiten geändert (die neun Orientierungsseiten und Sjögren); keine Bestandsseite, kein Hub, kein Asset, kein Worker geändert.
- Build-Diff gegen main `67b857e5`: 14 neue Seiten, 0 entfernt, geänderte Bestandsseiten wie in Runde 1 (27 Host-Seiten, Hubs, Bibliothek, 5 Körperregionen, `sitemap.xml`).
- Bestandsschutz: 27/27 Host-Seiten unterscheiden sich vom main-Build nur durch genau einen eingefügten Absatz; nach Entfernen der 27 Absätze 21/21 Host-Quellen identisch mit main. Bestehende Artikel ausser den vereinbarten Kontextabsätzen unverändert.
- CSV: Map 935 Zeilen à 21 Felder (Python-CSV-Parser); Feldvergleich gegen den vorigen Stand: nur `treatment` der Tremor-Zeile geleert.
- Konstante `PUBLISHED_BIBLIOTHEK_2026_10_26` weiterhin `undefined`; Queue weiterhin «Geplant»; weiterhin genau 14 neue Seiten.

### Reproduzierbare Bestandsfehler (identisch auf main 67b857e5)

| Prüfung | Exakter Aufruf | Basis-Sitemap | Branch | main | Ursache |
|---|---|---|---|---|---|
| check-i18n S4 | `node scripts/check-i18n.mjs` | eingecheckte `public/sitemap.xml` (741 URLs, zuletzt geändert 11.10.2026 in `6a9eadf3`) | 1 failure: `/en/acupuncture-zurich/` fehlt in der Sitemap (Runde 2 erneut bestätigt) | identisch | veraltete eingecheckte Sitemap; mit Build-Sitemap 0 failures |
| check-artikel-2026-10-24 | `node scripts/check-artikel-2026-10-24.mjs` | Default: `git show origin/main:public/sitemap.xml` (741 URLs) | FEHLER: 2 (Belastungsinkontinenz, erektile Dysfunktion: je nur 1 Kontext-Host) | identische Meldungen | die zweiten Hosts (`/wissen/akupunktur-bei-reizblase/`, `/gesundheitsbibliothek/befunde-werte/testosteron-wert/`) fehlen in der veralteten Sitemap |
| check-artikel-2026-10-24 | `… --base-sitemap=<main-Build 72c045b8>/sitemap.xml` (895 URLs, im Bericht 24.10. dokumentierte Kohorten-Basis) | 72c045b8 | **OK** | **OK** | – |
| check-artikel-2026-10-25 | `node scripts/check-artikel-2026-10-25.mjs` | Default wie oben | FEHLER: 6 (je nur 1 Kontext-Host) | identische Meldungen | sechs Hosts (u. a. `/wissen/akupunktur-bei-ischias/`, `/gesundheitsbibliothek/befunde-werte/tpo-antikoerper-erhoeht/`) fehlen in der veralteten Sitemap |
| check-artikel-2026-10-25 | `… --base-sitemap=<main-Build 2ff9ed81>/sitemap.xml` (907 URLs, im Bericht 25.10. dokumentierte Kohorten-Basis) | 2ff9ed81 | **OK** | **OK** | – |
| check-entscheidungsfragen | `node scripts/check-entscheidungsfragen.mjs` | Default (veraltete eingecheckte Sitemap) | FEHLER: 9 (je nur 1 Kontext-Host) | identische Meldungen | gleiche Ursache; mit Kohorten-Basis nicht erneut ausgeführt (Basis-Build nicht vorhanden) |
| check-wissen-neun | `node scripts/check-wissen-neun.mjs` | Default (veraltete eingecheckte Sitemap) | FEHLER: 5 | identische Meldungen | gleiche Ursache; mit Kohorten-Basis nicht erneut ausgeführt |
| test-herbst-sg | `node scripts/test-herbst-sg.mjs` | – | Absturz `TypeError: … reading 'getBoundingClientRect'` (Zeile 51) | identischer Absturz | Testskript findet auf der SG-Kampagnenseite ein Element nicht; Seite in diesem PR nicht berührt, nicht weiter untersucht |

Zusätzlich in Runde 2 festgestellt (kein Testfehler, Struktur-Befund): Bei 52 Bestands-Leaves auf main (gleiches Legacy-Template) und bei allen zehn neuen Leaves schliesst der HTML-Parser drei Tags vorzeitig; dadurch liegt `#kontakt` im DOM ausserhalb von `#page-symptom`. Darstellung und Formular funktionieren (Browser- und Formulartests grün). Nicht in diesem PR behoben (Template-Thema).

Keine Assertion entfernt oder abgeschwächt. Die Basis-Builds 72c045b8 und 2ff9ed81 stammen aus früheren Läufen dieser Session (dieselben Commits wie in den Berichten dokumentiert).

### Nicht erneut ausgeführt

- Runde 2: Altkohorten `check-artikel-2026-10-24`, `check-artikel-2026-10-25`, `check-entscheidungsfragen`, `check-wissen-neun` und `test-herbst-sg` nicht erneut ausgeführt; diese Runde ändert keine ihrer Seiten (Build-Diff gegen den vorigen PR-Stand: nur die zehn neuen Leaves). Stand aus Runde 1 in der Tabelle oben.
- `visual-baseline`, `shots-*` (Screenshot-Werkzeuge ohne Pass/Fail-Bezug zu diesem PR).
- Altkohorten `check-entscheidungsfragen` und `check-wissen-neun` mit ihren Kohorten-Basen (Basis-Builds nicht vorhanden).

## 9. Offene Unsicherheiten und Konflikte

- Keine ärztliche Prüfung erfolgt; `suggestedReviewerType` nur als Hinweis.
- Mehrere Studienaussagen nur aus Abstracts (gekennzeichnet), darunter PMID 42826003 (Volltext hinter Abo). DGN-Tremor-Leitlinie, AGA-Sportlerleiste-PDF, heart.org und NHS-Gallensäureseite nicht zugänglich und nicht verwendet.
- Verfügbarkeit von SeHCAT/C4 in der Schweiz nicht belegt; die Seite sagt nur, dass das Angebot je Zentrum unterschiedlich ist.
- Geteilte, bewusst unveränderte Elemente: globaler Header-Button «Termin finden», Drawer-/FAB-/Sticky-WhatsApp mit dem globalen Standardtext «… Hilfe bei der passenden Behandlung oder Praxis», CARE-Kasten mit sekundärem «Praxis finden» und das zentrale Formular (Terminarten «Ersttermin mit Behandlung» / «TCM-Check-in», ohne Vorauswahl). Eine Anpassung wäre ein globaler Formular-/Header-/Sticky-Auftrag.
- Sjögren: seit dem Release-Commit ebenfalls neutraler WhatsApp-Text (alle seitenspezifischen Links inkl. Formular-Link nach Standortwahl); Header-Drawer unverändert.
- **Folgepunkt (separat, nicht in diesem PR):** Legacy-Leaf-Template schliesst drei Tags vorzeitig, `#kontakt` liegt im DOM ausserhalb von `#page-symptom` (52 Bestands-Leaves auf main und die zehn neuen Leaves). Funktional ohne Folgen (Formular, Anker, Sticky-Opt-out, Seitenregeln im Browser verifiziert); Bereinigung wäre ein globaler Template-Auftrag.
- Traffic-Potenzial (Keyword-Planer, gerundet) und Buchungswirkung sind getrennt zu sehen; die meisten Seiten haben laut Tabelle geringe oder sehr geringe Buchungsabsicht. Aus der Erstellung folgen weder Indexierung, Rankings noch Anfragen.

## 10. Release (GO 26.10.2026)

1. `PUBLISHED_BIBLIOTHEK_2026_10_26 = '2026-10-26'` (nur Befunde und Urodynamik; Leaves ohne Datum). Erledigt.
2. Queue: 14 URLs von «Geplant» nach «Offen» mit 26.10.2026. Erledigt.
3. Build, Kohortenprüfung, Gates, Diff: Abschnitt 8. Merge-SHA, Deployment-Status und Live-Prüfung: Kommentar auf PR #94 (kein Direkt-Commit auf main).
4. Danach keine weiteren Artikeländerungen oder SEO-Optimierungen; die Seiten bleiben zur Beobachtung unverändert.
