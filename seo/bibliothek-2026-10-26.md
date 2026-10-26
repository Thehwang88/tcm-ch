# Bibliothek 26.10.2026: neue Seiten aus dem SEO-Audit vom 26.10.2026

Draft-PR, nicht Ready, kein Merge, kein Deployment. Basis: main `67b857e5` (Merge PR #93), beim Start und vor dem PR erneut geprüft. Offene PRs geprüft: #89 (Wissen-Cluster, Draft; keine Überschneidung mit Themen oder Host-Dateien dieses Pakets), #38, #15, #1 (keine Überschneidung mit Host-Dateien).

## 0. Ergebnis in Kürze

- **Aufgenommen: 14** (A 01 bis 10, C 17 bis 20). **Zurückgestellt: 6** (B 11 bis 16). **Ausgeschlossen: 0.**
- 10 Beschwerden-Leaves (Welle-6-Vorlage, ohne Datum, ohne FAQPage-Schema), 3 Befunde, 1 Untersuchungsseite.
- Neue Konstante `PUBLISHED_BIBLIOTHEK_2026_10_26 = undefined`: keine Schema-Daten, kein sichtbares Datum bis zum Release. Kein Reviewer, keine ärztliche Freigabe behauptet.
- 27 neue eigenständige Absätze in 21 Bestandsquellen; jede neue Seite hat genau zwei Kontext-Hosts aus der Basis. Nach Entfernen der Absätze sind alle Host-Quellen identisch mit main.
- Index-Queue: 14 Einträge unter «Geplant (noch nicht live)», ohne Datum, kein GSC-Submit.

## 1. Entscheidungstabelle

Volumen: Audit (Keyword-Planer DE/CH, 26.10.2026, gerundet). Keine Traffic-Prognose, Synonyme nicht addiert.

| Nr | Kandidat | Suchintention / Zielgruppe | Nächster Owner / Überschneidung | Eigenständiger Nutzen | Bezug zum Angebot | Quellenlage | Entscheid |
|---|---|---|---|---|---|---|---|
| 01 | Medikamentenübergebrauchskopfschmerz | Menschen mit fast täglichem Kopfweh und häufiger Schmerzmitteleinnahme | Kopfschmerzen-Leaf (eine FAQ zu Rebound), Spannungskopfschmerz, Migräne-Artikel: nur Erwähnungen, kein Owner | Einnahmetage statt Tabletten, Grenzwerte (USZ, ICHD-3), ärztlicher Plan, Warnzeichen | Kopfschmerzpatienten sind Kernzielgruppe; TCM nicht für MÜK selbst belegt | ICHD-3 Volltext, USZ-PDF Volltext, NHS Volltext | **aufnehmen** (neutrale Orientierung; keine Absetzanleitung) |
| 02 | Hypermobilität | Menschen mit beweglichen, schmerzenden Gelenken, Verstauchungen | Erwähnung in Symphysenschmerzen-Leaf; kein Owner | HSD vs. hEDS vs. andere EDS, Beighton, Schweizer Abklärungsweg | Physiotherapie; Akupunktur nur bei Begleitschmerz, Sicherheitshinweis | Rheuma Schweiz Volltext, NHS Volltext, Fallbericht 2026 | **aufnehmen** |
| 03 | Schambeinentzündung | Sportler mit Leistenschmerz | Symphysenschmerzen in der Schwangerschaft (eigener Owner), Adduktorentendinopathie; kein Owner | Osteitis pubis abgegrenzt, konservativer Weg, Warnzeichen | Physiotherapie; TCM nicht belegt | Übersicht Via 2019 (Volltext), UKE Volltext; AGA-PDF 403 | **aufnehmen** |
| 04 | Sjögren-Syndrom | Menschen mit trockenen Augen/Mund, Fatigue, Gelenkschmerz | Trockene Augen (Sicca-Owner), Körpersignal trockener Mund, Bestrahlungs-Xerostomie-Artikel; kein Owner | Systemerkrankung, Abklärung, Kontrollen, Lymphom-Warnzeichen, KK-Hinweis | Akupunktur: widersprüchliche RCTs, nur ergänzend | Rheumaliga, USZ, NHS (Volltext); 3 RCT-Abstracts | **aufnehmen** (höchstes Volumen) |
| 05 | Essentieller Tremor | Menschen mit Händezittern | Körpersignal Händezittern bleibt Symptom-Owner | Diagnoseseite mit Abgrenzung Parkinson/dystoner Tremor, Behandlungsstufen | Akupunktur: NMA mit schweren Limitationen | USZ, NHS (Volltext), NMA Shi 2026 (Volltext); DGN-Leitlinie nicht zugänglich | **aufnehmen** |
| 06 | POTS | Junge Erwachsene mit Herzrasen/Schwindel im Stehen | Körpersignal Schwindel beim Aufstehen, Long Covid, ME/CFS, niedriger Blutdruck | Kriterien, Abgrenzung, individuelle Behandlung ohne Pauschalvorgaben | Kein TCM-Nachweis; neutrale Orientierung | NIH-Konsens Vernino 2021 (Volltext), NHS PoTS und Fainting (Volltext); heart.org 403 | **aufnehmen** |
| 07 | Mikroskopische Kolitis | Menschen mit chronisch wässrigem Durchfall | Reizdarm, Colitis ulcerosa, Morbus Crohn, Stuhlanalyse; kein Owner | Beide Unterformen gemeinsam, Biopsie-Pflicht, Leitlinien-Empfehlungen | Kein TCM-Bezug; neutrale Orientierung | UEG/EMCG-Leitlinie 2021 (Volltext), NIDDK, BSG 2018 | **aufnehmen** |
| 08 | Gallensäurebedingter Durchfall | Menschen mit «Reizdarm» und wässrigem Durchfall, nach OP | Reizdarm, Morbus Crohn; kein Owner | Gallensäureverlust vs. Krankheitsbild, Tests, Behandlung | Kein TCM-Bezug; neutrale Orientierung | BSG 2018 (Volltext), UEG 2021; NHS-Seite 404 | **aufnehmen** |
| 09 | Proctalgia fugax | Menschen mit kurzen Schmerzattacken im After | Beckenbodenverspannung, Pudendusneuralgie, Hämorrhoiden; kein Owner | Rom-IV-Abgrenzung, Warnzeichen, Behandlungsgrenzen | Kein PF-spezifischer TCM-Nachweis | Rom IV, Übersicht 2020, AFP 1995 (nur Abstracts), NHS Volltext; keine Schweizer Patientenquelle gefunden | **aufnehmen** (Quellen ausreichend für Orientierung, Zugang in Matrix dokumentiert) |
| 10 | Beckenorgansenkung | Frauen mit Druckgefühl/Vorwölbung | Inkontinenz, Beckenbodenverspannung, Rektusdiastase; kein Owner | Formen getrennt, Pessar/Training/OP, Warnzeichen | Physiotherapie; keine Zusage, TCM hebe Organe an | USZ, NHS (Volltext); KSB-Seite fast ohne Text; RCT-Abstract | **aufnehmen** |
| 11 | Ganglion Handgelenk | Menschen mit Überbein | Erwähnungen in Loge-de-Guyon, Radialtunnel | handchirurgische Entscheidung, gut durch Spitalseiten abgedeckt | kein nachvollziehbarer Bezug | nicht vertieft | **zurückstellen**: kein Angebotsbezug, «Überbein» mehrdeutig |
| 12 | Morbus Dupuytren | Menschen mit Knoten/Fingerkrümmung | Schnappfinger | handchirurgisch | kein Bezug, kein Volumenwert | nicht vertieft | **zurückstellen** |
| 13 | Polymyalgia rheumatica | Ältere mit Schulter-/Hüftsteifigkeit | Fibromyalgie-Artikel (Erwähnung) | Kortison- und Riesenzellarteriitis-Management dominieren | PubMed: keine TCM-Studie; Risiko, dringende Rheumatologie zu verzögern | NHS gelesen | **zurückstellen**: hohes Volumen ist kein Eignungsbeleg |
| 14 | Reaktive Arthritis | nach Infekt | Rheuma, RA | akute ärztliche Abklärung im Vordergrund | kein Bezug | nicht vertieft | **zurückstellen** |
| 15 | Zervikale Dystonie | neurologisch Diagnostizierte | Host-Vorschlag Nackenschmerzen ist EN-geschützt | Botulinumtoxin-Domäne | kein Bezug, 10/Monat | nicht vertieft | **zurückstellen** |
| 16 | Analfissur | Schmerzen beim Stuhlgang | Hämorrhoiden, Verstopfung | starke Spitalseiten (USZ, KSW) | PubMed: eine chinesische postoperative Studie | USZ, KSW gelesen | **zurückstellen**: reine Krankheitsinformation ohne Angebotsbezug |
| 17 | TRAK erhöht | Menschen mit auffälligem Laborbefund | TPO, TSH, fT3/fT4, Überfunktion | konkreter Antikörperbefund, kein Owner | keine Buchungsabsicht behauptet | MedlinePlus, gesund.bund (Volltext), ETA-Leitlinie (Abstract) | **aufnehmen** |
| 18 | Calcium zu niedrig | auffälliger Laborwert | Calcium zu hoch (Gegenstück), PTH, Vitamin D | Albumin-Effekt, Ursachen, Warnzeichen | keine Buchungsabsicht | MedlinePlus, IQWiG (Volltext) | **aufnehmen** |
| 19 | Gesamt-IgE erhöht | auffälliger Laborwert | Allergietest erwähnt nur spezifisches IgE (geprüft) | Befundfokus über den Allergietest hinaus: Gesamt- vs. spezifisches IgE, andere Ursachen | keine Buchungsabsicht | MedlinePlus, gesundheit.gv.at (Volltext) | **aufnehmen** (Mehrwert gegenüber Allergietest belegt) |
| 20 | Urodynamik | Menschen vor einer Blasenabklärung | Inkontinenz, Reizblase, Urinuntersuchung | Ablauf, Messungen, Risiken, Grenzen | TCM.ch führt sie nicht durch (sichtbar und im Quelltext) | USZ, NIDDK (Volltext) | **aufnehmen** |

Keine Ersatzthemen.

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

Bei den fünf reinen Orientierungsseiten (01, 06, 07, 08, 09) lautet der Abschnittstitel vor dem Formular «Ergänzende Behandlung erst nach der ärztlichen Abklärung», und der Hub-Eintrag trägt kein Badge «Behandlung verfügbar». Formularkomponente, Tracking, CTA-Buttons und Standortlogik sind unverändert (Template-Kopie).

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
| 04 | Sjögren + acupuncture | 34 | 3 scheinkontrollierte RCTs (Abstract): Zhou 2022 n=120 kein Unterschied (28 % vs. 32 %, P=0,705); Gomes-Silva 2025 46 randomisiert/27 abgeschlossen, ESSPRI besser ≥4 Wochen; Linares 2026 n=50 Laser, Woche 8 Tendenz, Woche 12 kein Unterschied. Fazit: widersprüchlich, kein verlässlicher Nachweis. 2026-RCT mit Hydroxychloroquin (PMID 42826003) nicht gelesen, nicht verwendet |
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

## 8. Prüfungen

Getesteter Stand: Commit `d9bb7663` plus die Registrierungen dieses Commits (identisch mit dem gepushten HEAD bis auf diese Doku), Build vom 26.10.2026.

- `npm run build`: grün; Sitemap 916 → 930 URLs (+14).
- Kohortenprüfung `node scripts/check-bibliothek-2026-10-26.mjs --base-sitemap=<frische main-dist>/sitemap.xml`: **OK** (14 Seiten: 1 H1, Canonical, indexierbar, Title/Meta eindeutig, kein FAQPage-/Question-Schema, kein datePublished, kein reviewedBy, keine leeren Datumsfelder, kein NaN/undefined, ≥2 Quellen, 3 FAQ, keine Em-Dashes/ß/energetische Sprache, alle internen Linkziele vorhanden, je 2 Kontext-Hosts aus der Basis, Hubs, Keep-Liste, Suchindex mit Synonym, Map/Guards/Queue/Sitemap). Hinweis: Proctalgia fugax mit 663 Wörtern unter der Orientierung 700 (bewusst knapp, keine Füllung).
- Gates: health-audit (Wissen-Serie 46 Slugs 0 Fehler, Ownership-Gate 7 Pins 3 Retired 0 Fehler), check-i18n (51 Einträge, 0 outdated/warnings/failures), test-en-analytics 48/0, check-kontakt-formular 0, test-anfrage-betreff 92/0, check-clinic-status 0, check-standort-ux 0, check-first30 0, check-professional grün, test-kontakt-formular 715/0. test-hero-video: erster Lauf 123/1, drei weitere Läufe 124/0, main 124/0 (keine Hero-/Video-Datei geändert).
- Ältere Kohortenprüfungen `check-artikel-2026-10-24/25`: 2 bzw. 6 Befunde, **identisch auf main 67b857e5** (gleiche Meldungen, gleicher Hash). Ursache: Default-Basis ist die veraltete eingecheckte `public/sitemap.xml`; keine Assertion entfernt.
- Viewports 320/390/768/1440 px, 14 neue Seiten plus Beschwerden- und Untersuchungen-Hub: 0 echte Seitenüberläufe, 0 scrollende Tabellen (ein 9-px-Überlauf bei 320 px durch «Bauchspeicheldrüsenentzündung» gefunden und in `d9bb7663` behoben).
- Build-Diff gegen frische main-Build (`67b857e5`): 14 neue Dateien, 38 geänderte: 27 Host-Seiten (je genau ein eingefügter `<p>`-Absatz, sonst byteidentisch), Beschwerden-Hub, Untersuchungen-Hub, Befunde-Hub, Bibliothek (Suchindex), 5 Körperregionen, `beschwerden-keep.js`, `sitemap.xml`. Keine EN-, Formular-, Tracking-, Standort-, Asset- oder Worker-Änderung.
- Host-Revert-Nachweis (Quellen): nach Entfernen der 27 Absätze sind 21/21 Host-Quellen identisch mit main (befunde-werte.ts: die vier Host-Einträge identisch; die Datei enthält zusätzlich die neuen Einträge).
- CSV: Map 935 Zeilen, Guards 317 Zeilen, alle mit korrekter Spaltenzahl (21 bzw. 5), keine doppelten URLs oder Primärkeywords.
- Bestehende Schema-Daten unverändert (Host-Seiten nur Absatz-Einfügung). Keine echten Anfragen, Mails, Buchungen oder Conversions ausgelöst.

## 9. Offene Unsicherheiten und Konflikte

- Keine ärztliche Prüfung erfolgt; `suggestedReviewerType` nur als Hinweis.
- Mehrere Studienaussagen nur aus Abstracts (gekennzeichnet). DGN-Tremor-Leitlinie, AGA-Sportlerleiste-PDF, heart.org und NHS-Gallensäureseite nicht zugänglich und nicht verwendet.
- Verfügbarkeit von SeHCAT/C4 in der Schweiz nicht belegt; Seite sagt nur, dass das Angebot je Zentrum unterschiedlich ist.
- Hero-CTA, Sidebar und Formular der Beschwerden-Vorlage sind bei allen Leaves gleich; bei den fünf Orientierungsseiten bleibt dadurch ein Buchungsweg sichtbar, obwohl der Text klar die ärztliche Abklärung voranstellt. Eine Template-Variante wäre ein eigener Auftrag.
- Traffic-Potenzial (Keyword-Planer, gerundet) und Buchungswirkung sind getrennt zu sehen; besonders 06–09 und 17–20 haben vermutlich wenig direkte Buchungsabsicht. Aus der Erstellung folgen weder Indexierung, Rankings noch Anfragen.

## 10. Release-Schritte (nur nach ausdrücklichem GO)

1. `PUBLISHED_BIBLIOTHEK_2026_10_26` auf das reale Datum setzen (betrifft nur Befunde und Urodynamik; Leaves tragen kein Datum).
2. Queue: 14 URLs von «Geplant» nach «Offen» mit Datum.
3. Build, Kohortenprüfung (prüft dann Schema-Datum = Konstante), Live-Check.
