# Wissen: Kräutercluster, zehn Artikel zur chinesischen Kräutertherapie (18.10.2026)

Branch `content/kraeuter-cluster-10`, HEAD `807be275 (Textstand; Bericht im Folgecommit)`, Basis main `bddea458` (am 18.10.2026 geprüft). Draft-PR, Integration auf dem Branch angewendet; **nicht veröffentlicht**, STOP vor Ready/Merge/Deployment.

Textpaket: `dd1b8533-TCM-ch-Kraeutercluster-10-Artikel-Claude-Prompt.txt` (Stand 18.10.2026), 1:1 übernommen (Titles, Metas, H1, Text, FAQ, Quellen). Umsetzung im bestehenden Wissen-Modell (`src/data/wissen-kraeuter.ts`, gemerged in `wissen.ts`, Template `src/pages/wissen/[slug].astro`), nicht in der Akupunktur-bei-Serie. Semrush ist blockiert: keine Suchvolumen, Keyword-Difficulty oder Conversion-Prognosen; der Cluster ist eine strategische Hypothese.

## 1. Die zehn Seiten

| # | URL | Title | Meta | Wörter | Quellen |
|---|-----|-------|------|--------|---------|
| 1 | /wissen/chinesische-kraeuter-bei-schlafstoerungen/ | Chinesische Kräuter bei Schlafstörungen: Nutzen & Grenzen | 150 | 438 | 3 |
| 2 | /wissen/chinesische-kraeuter-bei-reizdarm/ | Chinesische Kräuter bei Reizdarm: Studien & Grenzen | 155 | 416 | 3 |
| 3 | /wissen/chinesische-kraeuter-bei-funktioneller-dyspepsie/ | Chinesische Kräuter bei Reizmagen: Studien & Einordnung | 159 | 395 | 3 |
| 4 | /wissen/chinesische-kraeuter-bei-verstopfung/ | Chinesische Kräuter bei Verstopfung: Nutzen & Risiken | 145 | 393 | 3 |
| 5 | /wissen/chinesische-kraeuter-bei-regelschmerzen/ | Chinesische Kräuter bei Regelschmerzen: Evidenz & Grenzen | 162 | 360 | 3 |
| 6 | /wissen/chinesische-kraeuter-bei-allergischem-schnupfen/ | Chinesische Kräuter bei Heuschnupfen: Studien & Grenzen | 149 | 361 | 3 |
| 7 | /wissen/akupunktur-oder-kraeutertherapie/ | Akupunktur oder Kräutertherapie: Was passt zu dir? | 161 | 380 | 2 |
| 8 | /wissen/tcm-granulat-dekokt-tabletten/ | TCM-Granulat, Dekokt oder Tabletten: die Unterschiede | 149 | 387 | 3 |
| 9 | /wissen/chinesische-kraeuter-qualitaet-schweiz/ | Chinesische Kräuter: Qualität und Zulassung in der Schweiz | 149 | 380 | 3 |
| 10 | /wissen/chinesische-kraeuter-online-kaufen-oder-verordnen/ | Chinesische Kräuter online kaufen: Was vorher wichtig ist | 154 | 376 | 2 |

Aufbau je Seite: Hero (Kategorie, H1, Lead = erster Absatz des Textpakets, Lesezeit, Autorin «Redaktion TCM.ch»), Body mit den H2 des Textpakets, drei sichtbare FAQ (H3/Absatz, `faqs: []`, dadurch kein FAQPage-/Question-Schema), Quellenblock, Artikel-CTA auf `/kontakt/`, Autorenkarte «Allgemeine Einordnung, keine ärztliche Diagnose», Weiterlesen-Karten. Kein Veröffentlichungsdatum, kein Reviewer, keine Qualifikationen (`PUBLISHED_KRAEUTER_2026_10 = undefined`).

## 2. Ownership-Abgrenzung

- `/therapien/kraeutertherapie/` bleibt Head-Owner für Methode, Anwendung, Ablauf, Dauer, Kosten, Gesamtüberblick (Map-Zeile unverändert).
- Beschwerden-Owner (schlafprobleme, reizdarm, funktionelle-dyspepsie, verstopfung, menstruationsbeschwerden, allergien-heuschnupfen) behalten Erkrankung, Symptome, Abklärung und «tcm X»-Keywords; die sechs Indikationsartikel besitzen nur die Kräuter-Entscheidung (Map `treatment = Kräutertherapie`, `content_role = treatment_decision`, Notizen benennen die Grenzen).
- Akupunktur-bei-Artikel behalten alle Akupunktur-Entscheidungsintents; die Kräuterartikel verlinken sie und übernehmen keine Akupunktur-Keywords.
- Nebenwirkungen und Wechselwirkungen bleiben bei `/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/` (die Artikel verlinken dorthin, keine eigene Interaktionsliste).
- Qualität/Zulassung = Produktprüfung und regulatorische Einordnung für Patient:innen; Onlinekauf/Verordnung = Bezugsweg; Granulat/Dekokt/Tabletten = Darreichungsformenvergleich; Akupunktur oder Kräuter = Methodenvergleich (`content_role = standalone`). B2B-Regulatorik (/professional, Praxiswissen) nicht vermischt.
- Keine Kollision mit `do-not-create-intents.csv` (Reizmagen-Guard bleibt: kein eigener Reizmagen-Owner, der Artikel verlinkt `/beschwerden/funktionelle-dyspepsie/`), `intent-conflicts.csv` und `unowned-search-intents.csv` (keine Kräuter-Einträge). Winterthur-Kräuterartikel bleibt lokaler Support des Therapie-Heads. Stillzeit-/Erstverschlimmerungsseiten unberührt.
- Keine breite Reservierung von «Kräuter», «TCM», «Schlaf», «Verdauung», «Allergie»: Map-`secondary_keywords` enthalten nur Schreibvarianten/echte Synonyme des Entscheidungsintents (automatische Prüfung `ksem.py`).

## 3. Quellenmatrix (tatsächlich gelesen, Zugriffsebene)

Alle Quellen wurden am 18.10.2026 erneut geöffnet; Korrekturen/Rücknahmen für alle PubMed-Einträge über Europe PMC geprüft (keine). Chat-Zitationsmarker aus dem Textpaket sind nicht gerendert; die Quellen stehen als normale Links im Quellenblock.

### /wissen/chinesische-kraeuter-bei-schlafstoerungen/

| Quelle | Zugriff | trägt |
|---|---|---|
| Ma et al. Comparative efficacy and safety of Chinese patent medicines for primary insomnia. Journal of Ethnopharmacology, 2025. PMID 39701221 (https://pubmed.ncbi.nlm.nih.gov/39701221/) | Abstract (PubMed; Volltext nicht offen) | Netzwerk-Metaanalyse, 109 RCTs, 11 488 Erwachsene, chinesische Fertigarzneimittel teils mit westlichen Medikamenten; Vorteile einzelner Präparate bei Schlafqualität/Schlafmassen; Evidenzsicherheit «low or very low», Schlussfolgerungen auf Studien niedriger Qualität. Keine Korrektur/Rücknahme (Europe PMC). |
| NHS. Insomnia (https://www.nhs.uk/conditions/insomnia/) | Volltext (NHS-Seite) | Ursachen (Stress, Schmerzen, Medikamente, Schlafapnoe), CBT als Behandlung, wann zur Ärztin. |
| NCCIH. Traditional Chinese Medicine: What You Need To Know (https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know) | Volltext (NCCIH-Seite) | Gemischte Studienlage chinesischer Kräuterprodukte; Verunreinigungen (Schwermetalle, Pestizide, Mikroorganismen) und Verwechslungen bei der Herstellung; keine Wirkversprechen. |

### /wissen/chinesische-kraeuter-bei-reizdarm/

| Quelle | Zugriff | trägt |
|---|---|---|
| Liang et al. Systematic review and meta-analysis of Chinese herbal formula Tongxie Yaofang for diarrhea-predominant irritable bowel syndrome. Frontiers in Pharmacology, 2022 (https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2022.904657/full) | Volltext (Frontiers, offen) | Systematische Übersicht Tongxie Yaofang bei IBS-D, 11 RCTs/985 Personen; Hinweise auf Besserung, aber «no clear and confirmed conclusion» wegen unzureichendem Studiendesign; nur ein Placebovergleich für den Hauptendpunkt (155 Personen). |
| Liang et al. Chinese herbal formula Tongxie Yaofang granules for diarrhoea-predominant irritable bowel syndrome: a randomised, double-blind, placebo-controlled, phase II trial. BMJ Open, 2025 (https://bmjopen.bmj.com/content/15/1/e088410) | Volltext (PMC11772933; BMJ-Open-Seite selbst 403) | RCT 96 Personen, 8 Wochen, TXYF-Granulat vs. Placebo, primärer Endpunkt IBS-SSS-Response: kein signifikanter Unterschied (RR 1,12; 95 % KI 0,89 bis 1,41; p=0,348), beide Gruppen mit hoher Besserung (79,2 % vs. 70,8 %); keine Unterschiede bei sekundären Endpunkten. Keine Korrektur/Rücknahme. |
| NHS. Irritable bowel syndrome (https://www.nhs.uk/conditions/irritable-bowel-syndrome-ibs/) | Volltext (NHS-Seite) | Beschwerdebild und Einordnung des Reizdarms. |

### /wissen/chinesische-kraeuter-bei-funktioneller-dyspepsie/

| Quelle | Zugriff | trägt |
|---|---|---|
| Wang et al. Efficacy and safety of Xiangsha liujunzi decoction for functional dyspepsia: a systematic review and meta-analysis. Frontiers in Pharmacology, 2024. PMID 38933675 (https://pubmed.ncbi.nlm.nih.gov/38933675/) | Abstract (PubMed; Volltext PMC11200127 offen, nicht gesondert zitiert) | Metaanalyse Xiangsha Liujunzi bei funktioneller Dyspepsie, 23 Studien/2 101 Personen, primärer Endpunkt «klinische Wirksamkeitsrate» (RR 1,27), «low quality of the enrolled studies». Keine Korrektur/Rücknahme. |
| NHS. Indigestion (https://www.nhs.uk/conditions/indigestion/) | Volltext (NHS-Seite) | Warnzeichen (Gewichtsverlust, Schluckbeschwerden, Erbrechen, Blut), Selbsthilfe. |
| NCCIH. Traditional Chinese Medicine: What You Need To Know (https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know) | Volltext (NCCIH-Seite) | Gemischte Studienlage chinesischer Kräuterprodukte; Verunreinigungen (Schwermetalle, Pestizide, Mikroorganismen) und Verwechslungen bei der Herstellung; keine Wirkversprechen. |

### /wissen/chinesische-kraeuter-bei-verstopfung/

| Quelle | Zugriff | trägt |
|---|---|---|
| Zhong et al. Efficacy of MaZiRenWan, a Chinese Herbal Medicine, in Patients With Functional Constipation in a Randomized Controlled Trial. Clinical Gastroenterology and Hepatology, 2019. PMID 29654915 (https://pubmed.ncbi.nlm.nih.gov/29654915/) | Abstract (PubMed; Volltext nicht offen) | RCT 291 Personen, MZRW vs. Senna vs. Placebo, 8 Wochen + 8 Wochen Nachbeobachtung; Komplettansprechen 68 % vs. 57,7 % (n. s., p=0,14) vs. 33 % (p<0,005); Definition ≥1 zusätzlicher CSBM/Woche. Keine Korrektur/Rücknahme. |
| Hong Kong Baptist University. Studienabstract und bibliografische Angaben (https://scholars.hkbu.edu.hk/en/publications/efficacy-of-mazirenwan-a-chinese-herbal-medicine-in-patients-with-2/) | Bibliografischer Eintrag mit Abstract (HKBU Scholars) | Dieselbe Studie wie PMID 29654915 (identischer Abstract); zählt nicht als zweiter Nachweis. |
| NHS. Constipation (https://www.nhs.uk/conditions/constipation/) | Volltext (NHS-Seite) | Ursachen, Selbsthilfe, Warnzeichen (Blut im Stuhl, Gewichtsverlust, plötzliche Veränderung). |

### /wissen/chinesische-kraeuter-bei-regelschmerzen/

| Quelle | Zugriff | trägt |
|---|---|---|
| Zhu et al. Chinese herbal medicine for primary dysmenorrhoea. Cochrane Database of Systematic Reviews, 2008 (https://www.cochrane.org/evidence/CD005288_chinese-herbal-medicine-may-help-reduce-menstrual-pain) | Volltext der Cochrane-Kurzfassung (Review 2008, pub3) | «promising evidence» für chinesische Kräuter bei primärer Dysmenorrhö, «limited by the poor methodological quality of the included trials»; Review von 2008 (älter). |
| NHS. Period pain (https://www.nhs.uk/symptoms/period-pain/) | Volltext (NHS-Seite) | Primäre vs. sekundäre Ursachen (Endometriose, Adenomyose, Myome, Infektionen), wann zur Ärztin (stärker, unregelmässig, Schmerzen beim Sex/Wasserlassen/Stuhlgang). |
| NCCIH. Traditional Chinese Medicine: What You Need To Know (https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know) | Volltext (NCCIH-Seite) | Gemischte Studienlage chinesischer Kräuterprodukte; Verunreinigungen (Schwermetalle, Pestizide, Mikroorganismen) und Verwechslungen bei der Herstellung; keine Wirkversprechen. |

### /wissen/chinesische-kraeuter-bei-allergischem-schnupfen/

| Quelle | Zugriff | trägt |
|---|---|---|
| Luo et al. Potential effectiveness of Chinese herbal medicine Yu ping feng san for adult allergic rhinitis. BMC Complementary and Alternative Medicine, 2017. PMID 29110710 (https://pubmed.ncbi.nlm.nih.gov/29110710/) | Abstract (PubMed; Volltext PMC5674829 offen, nicht gesondert zitiert) | Yu Ping Feng San bei allergischer Rhinitis, 22 RCTs: «effective rate» nicht besser als Pharmakotherapie (RR 1,07), Kombination besser als Pharmakotherapie allein (RR 1,27, low quality). Keine Korrektur/Rücknahme. |
| The efficacy and safety of Yupingfengsan in the treatment of allergic rhinitis: a systematic review and meta-analysis, 2025. PMID 41031154 (https://pubmed.ncbi.nlm.nih.gov/41031154/) | Volltext (PMC12477554) für die GRADE-Aussage; Abstract via PubMed | 39 RCTs/4 578 Personen; Vorteile als Kombination und Monotherapie; GRADE: «all outcomes were rated as low to very low certainty»; Nebenwirkungen vielfach nicht berichtet. Keine Korrektur/Rücknahme. |
| NHS. Allergic rhinitis (https://www.nhs.uk/conditions/allergic-rhinitis/) | Volltext (NHS-Seite) | Auslöser (Pollen, Hausstaubmilben), Antihistaminika, kortisonhaltige Nasensprays, Vermeidung. |

### /wissen/akupunktur-oder-kraeutertherapie/

| Quelle | Zugriff | trägt |
|---|---|---|
| NCCIH. Traditional Chinese Medicine: What You Need To Know (https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know) | Volltext (NCCIH-Seite) | Gemischte Studienlage chinesischer Kräuterprodukte; Verunreinigungen (Schwermetalle, Pestizide, Mikroorganismen) und Verwechslungen bei der Herstellung; keine Wirkversprechen. |
| NCCIH. Acupuncture: Effectiveness and Safety (https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety) | Volltext (NCCIH-Seite) | Hinweise auf Nutzen bei Rücken-/Nackenschmerz, Kniearthrose, Kopfschmerz/Migräne; Wirkmechanismus nicht vollständig geklärt, unspezifische Effekte. |

### /wissen/tcm-granulat-dekokt-tabletten/

| Quelle | Zugriff | trägt |
|---|---|---|
| Swissmedic. Asiatische Arzneimittel (https://www.swissmedic.ch/swissmedic/de/home/kpa/asiatische-am.html) | Volltext (Swissmedic-Seite) | Asiatische Arzneimittel: vereinfachte Zulassung mit Indikation, ohne Indikation, Meldeverfahren. |
| Swissmedic. Anforderungen an die Qualitätsdokumentation von asiatischen Arzneimitteln (https://www.swissmedic.ch/dam/swissmedic/it/dokumente/zulassung/KPA/anforderungen_andiequalitaetsdokumentationvonasiatischenarzneimi.pdf.download.pdf/anforderungen_andiequalitaetsdokumentationvonasiatischenarzneimi.pdf) | Volltext (PDF, 3 496 Wörter, Merkblatt Stand 27.11.2006, per pdftotext gelesen) | Definitionen: «Zubereitungen aus Stoffen … wie namentlich wässrige Dekokte, Granulate aus Dekokten»; Granulate gemäss Ph.Eur. als feste, trockene Aggregate zum Einnehmen; Granulate/Zubereitungen werden zu Kapseln oder Tabletten weiterverarbeitet (Zwischen- vs. Fertigprodukt, arzneiformspezifische Prüfungen). Trägt: Dekokt = wässrige Abkochung, Granulat kann aus Dekokt entstehen, Tabletten/Kapseln enthalten Zubereitungen oder Granulate; Qualitätsdokumentation gilt für jede Form. |
| Swissmedic. Handbuch HOMANT Asia HMV4 (https://www.swissmedic.ch/dam/swissmedic/en/dokumente/zulassung/KPA/zl103_00_003d_hb_handbuch_homant_asia.pdf.download.pdf/ZL103_00_003d_HB_Handbuch_HOMANT_Asia_HMV4.pdf) | Volltext (PDF, 4 231 Wörter, Handbuch HOMANT Asia HMV4 Version 1.1, gültig ab 17.07.2024, per pdftotext gelesen) | Abschliessende Auswahllisten: Darreichungsformen Pulver, Granulat, Tabletten, Kapseln, flüssige Zubereitung (Dekokt), Salbe; Wirkstoffarten ganzer/zerkleinerter Stoff, pulverisierter Stoff, Granulat aus Stoff pulverisiert, Granulat aus angetrocknetem Wasserauszug (mit/ohne Träger). Trägt: «Nicht jedes Pulver wird gleich zubereitet», «Granulat ist nicht unbedingt gemahlenes Kraut», Unterscheidung von Stoffen, Zubereitungen und Darreichungsformen. |

### /wissen/chinesische-kraeuter-qualitaet-schweiz/

| Quelle | Zugriff | trägt |
|---|---|---|
| Swissmedic. Asiatische Arzneimittel (https://www.swissmedic.ch/swissmedic/de/home/kpa/asiatische-am.html) | Volltext (Swissmedic-Seite) | Asiatische Arzneimittel: vereinfachte Zulassung mit Indikation, ohne Indikation, Meldeverfahren. |
| Swissmedic. Vereinfachte Zulassung ohne Indikation (https://www.swissmedic.ch/swissmedic/de/home/kpa/asiatische-am/vereinfachte-zl-ohne-indikation.html) | Volltext (Swissmedic-Seite) | Zulassung ohne Indikation: Nachweise vorwiegend bibliografisch für traditionell hergeleitete Kenndaten (Stoffe, Zubereitungen, Darreichungsform, Anwendungsgebiete, Dosierung); Anforderungen an die Qualitätsdokumentation wie mit Indikation. |
| NCCIH. Traditional Chinese Medicine: What You Need To Know (https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know) | Volltext (NCCIH-Seite) | Gemischte Studienlage chinesischer Kräuterprodukte; Verunreinigungen (Schwermetalle, Pestizide, Mikroorganismen) und Verwechslungen bei der Herstellung; keine Wirkversprechen. |

### /wissen/chinesische-kraeuter-online-kaufen-oder-verordnen/

| Quelle | Zugriff | trägt |
|---|---|---|
| Swissmedic. Leitfaden Arzneimittel aus dem Internet (https://www.swissmedic.ch/swissmedic/de/home/humanarzneimittel/marktueberwachung/arzneimittel-aus-dem-internet/leitfaden-arzneimittel-aus-dem-internet.html) | Volltext (Swissmedic-Seite) | Warnung vor Arzneimitteln aus unsicheren Internetquellen (zu wenig/zu viel Wirkstoff, Verunreinigungen); Ausnahme Schweizer Versandapotheken mit kantonaler Bewilligung. |
| Swissmedic. Vermitteln von Arzneimitteln auf Verkaufsplattformen (https://www.swissmedic.ch/swissmedic/de/home/humanarzneimittel/marktueberwachung/arzneimittel-aus-dem-internet/drug-safety-current-threats/medicinal-products-and-sales-platforms.html) | Volltext (Swissmedic-Seite) | Versandhandel mit Arzneimitteln grundsätzlich untersagt, Bewilligungspflicht; Vermittlung über Verkaufsplattformen. |

Besonders geprüft: Reizdarm-Seite enthält den negativen primären Endpunkt der BMJ-Open-Studie 2025 (96 Teilnehmende, acht Wochen, kein signifikanter Unterschied) und stellt Besserungen innerhalb der Gruppe nicht als Überlegenheit dar. Verstopfung: MZRW-Studie und HKBU-Eintrag sind eine Studie; die Seite nennt beide Links, zählt aber nur eine Untersuchung («einen grösseren Placebovergleich»). Regelschmerzen: Cochrane 2008 nur für primäre Dysmenorrhö, Endometriose/Adenomyose ausdrücklich ausgenommen. Qualität: Zulassung ohne Indikation wird nicht als Wirksamkeitsnachweis dargestellt. Keine Dosisangaben (die Studiendosierungen aus den Abstracts wurden nicht übernommen).

## 4. Abweichungen vom Textpaket

- Zwei Präzisierungen nach Quellenprüfung (sonst keine Änderung an Titles, Metas, H1, Fliesstext, FAQ oder Quellen):
  - Regelschmerzen: «Die Übersicht ist zudem älter und …» → «Die Übersicht stammt aus dem Jahr 2008 und …» (Cochrane CD005288.pub3, publiziert 16.04.2008; Alter offen genannt).
  - Verstopfung: «Gegenüber Senna mit 57,7 Prozent war der Unterschied statistisch nicht signifikant.» → «… statistisch nicht signifikant; das belegt keine Gleichwertigkeit der beiden Mittel.» (Zhong 2019: p=0,14, Nichtunterlegenheit nicht geprüft).
- Review 18.10.2026 (Folgecommit): Rezepturnamen «Tongxie Yaofang» und «MaZiRenWan» aus `secondary_keywords` (Map) und aus der Synonymliste der Guards entfernt; sie bleiben als Suchhilfe in der Bibliothekssuche und sind in Map-Notiz und Guard-Begründung als «Suchhilfe, kein Synonym, nicht reserviert» bezeichnet. Semantik-Gate `ksem.py` prüft Rezepturnamen jetzt in Map-Keywords und Guard-Synonymen. Wissen-Hub `/wissen/`: Datumssegment der Karte wird nur gerendert, wenn `datePublished` gesetzt ist (vorher «NaN. undefined» bei leerem Datum); kein Datum eingesetzt, Sortierung unverändert (Karten ohne Datum am Ende).
- Zugriffslücken: Cochrane Library (DOI-Seite) HTTP 412, PubMed-HTML 403, BMJ-Open-Seite 403, Mayo/Springer nicht betroffen; genutzt wurden Cochrane-Kurzfassung (cochrane.org), PubMed E-utilities, PMC und Europe PMC. Europe PMC listet für CD005288.pub3 ein «Update of» (pub2, 2007) und einen Kommentar (Explore 2008), keine Rücknahme; für Frontiers 2022 (PMID 36091782) und alle übrigen PMIDs keine Korrektur. Ein fehlender Treffer ist keine Bestätigung, dass keine existiert.
## 5. Bestandsänderungen (exakt)

Nur Link-Ergänzungen und Registrierungen; keine Änderung an H1, Titles, Metas, FAQ oder medizinischen Abschnitten. `src/data/therapie-leaves/kraeutertherapie.html` wurde bewusst **nicht** angefasst (DE-Quelle mit EN-Paar, Fingerprint in `src/data/i18n/fingerprints.json`; ein Edit würde `check-i18n` F1 auslösen).

| Datei | Abschnitt/Anker | Hinzugefügt | Ziel |
|---|---|---|---|
| `src/data/wissen-links.ts` |   schlafprobleme: [     { slug: 'akupunktur-schlafprobleme', label: 'Akupunktur bei Schlafproblemen: Studien und Ablauf' },     { slug: 'muedigkeit-im |   schlafprobleme: [     { slug: 'akupunktur-schlafprobleme', label: 'Akupunktur bei Schlafproblemen: Studien und Ablauf' },     { slug: 'muedigkeit-im-herbst', label: 'Müdigkeit im Herbst: Licht, Zeitumstellung und was hilft' },     { slug: 'chinesische-kraeuter-bei-schlafstoerungen', label: 'Chines |  |
| `src/data/wissen-links.ts` |   verstopfung: [{ slug: 'akupunktur-bei-verstopfung', label: 'Akupunktur bei Verstopfung: Nutzen und Grenzen' }], |   verstopfung: [     { slug: 'akupunktur-bei-verstopfung', label: 'Akupunktur bei Verstopfung: Nutzen und Grenzen' },     { slug: 'chinesische-kraeuter-bei-verstopfung', label: 'Chinesische Kräuter bei Verstopfung: Nutzen und Risiken' },   ],   reizdarm: [{ slug: 'chinesische-kraeuter-bei-reizdarm', |  |
| `src/data/wissen-links.ts` |     { slug: 'erkaeltung-grippe-allergie', label: 'Erkältung, Grippe oder Allergie? Die Unterschiede' },   ], |     { slug: 'erkaeltung-grippe-allergie', label: 'Erkältung, Grippe oder Allergie? Die Unterschiede' },     { slug: 'chinesische-kraeuter-bei-allergischem-schnupfen', label: 'Chinesische Kräuter bei Heuschnupfen: Studien und Grenzen' },   ], |  |
| `src/data/wissen-akupunktur-bei.ts` | related von akupunktur-bei-reizdarm, letzte Zeile: { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' }, |       { href: '/wissen/chinesische-kraeuter-bei-reizdarm/', label: 'Chinesische Kräuter bei Reizdarm', cat: 'Artikel' }, +       { href: '/wissen/chinesische-kraeuter-bei-funktioneller-dyspepsie/', label: 'Chinesische Kräuter bei Reizmagen', cat: 'Artikel' }, | /wissen/chinesische-kraeuter-bei-funktioneller-dyspepsie/, /wissen/chinesische-kraeuter-bei-reizdarm/ |
| `src/data/wissen-akupunktur-bei.ts` | related von akupunktur-bei-verstopfung, letzte Zeile: { href: '/wissen/akupunktur-bei-reizdarm/', label: 'Akupunktur bei Reizdarm', cat: 'Artikel' }, |       { href: '/wissen/chinesische-kraeuter-bei-verstopfung/', label: 'Chinesische Kräuter bei Verstopfung', cat: 'Artikel' }, | /wissen/chinesische-kraeuter-bei-verstopfung/ |
| `src/data/wissen-akupunktur-bei.ts` | related von akupunktur-bei-menstruationsbeschwerden, letzte Zeile: { href: '/wissen/akupunktur-bei-wechseljahresbeschwerden/', label: 'Akupunktur bei  |       { href: '/wissen/chinesische-kraeuter-bei-regelschmerzen/', label: 'Chinesische Kräuter bei Regelschmerzen', cat: 'Artikel' }, | /wissen/chinesische-kraeuter-bei-regelschmerzen/ |
| `src/data/wissen.ts` |       {         "href": "/wissen/haeufige-infekte-immunsystem/",         "label": "Häufige Infekte und Immunsystem",         "cat": "Artikel"       }  |       {         "href": "/wissen/haeufige-infekte-immunsystem/",         "label": "Häufige Infekte und Immunsystem",         "cat": "Artikel"       },       {         "href": "/wissen/chinesische-kraeuter-bei-allergischem-schnupfen/",         "label": "Chinesische Kräuter bei Heuschnupfen",          | /wissen/chinesische-kraeuter-bei-allergischem-schnupfen/, /wissen/haeufige-infekte-immunsystem/ |
| `src/data/wissen.ts` |       {         "href": "/beschwerden/schlafapnoe/",         "label": "Schlafapnoe",         "cat": "Beschwerde"       }     ] |       {         "href": "/beschwerden/schlafapnoe/",         "label": "Schlafapnoe",         "cat": "Beschwerde"       },       {         "href": "/wissen/chinesische-kraeuter-bei-schlafstoerungen/",         "label": "Chinesische Kräuter bei Schlafstörungen",         "cat": "Artikel"       },        | /wissen/akupunktur-oder-kraeutertherapie/, /wissen/chinesische-kraeuter-bei-schlafstoerungen/ |
| `src/data/wissen.ts` | Zwei Personen mit derselben Diagnose bekommen bei uns unterschiedliche Rezepturen, weil die TCM nicht das Symptom behandelt, sondern das Muster dahint | <p>Ob für dich eher Nadeln oder eine Rezeptur infrage kommen, erklärt der Vergleich <a href=\"/wissen/akupunktur-oder-kraeutertherapie/\">Akupunktur oder Kräutertherapie</a>.</p> | /wissen/akupunktur-oder-kraeutertherapie/ |
| `src/data/wissen.ts` | Dekokte sind möglich, wenn du es traditionell willst, brauchen aber täglich Zeit.</p> | Dekokte sind möglich, wenn du es traditionell willst, brauchen aber täglich Zeit. Was die Darreichungsformen unterscheidet, steht unter <a href=\"/wissen/tcm-granulat-dekokt-tabletten/\">Granulat, Dekokt oder Tabletten</a>.</p> | /wissen/tcm-granulat-dekokt-tabletten/ |
| `src/data/wissen.ts` | Chinesische Kräuter aus unklarer Quelle, aus dem Internet oder aus dem Ferienkoffer solltest du nicht einnehmen. |  Worauf du bei <a href=\"/wissen/chinesische-kraeuter-qualitaet-schweiz/\">Qualität und Zulassung in der Schweiz</a> achten kannst und was vor einem <a href=\"/wissen/chinesische-kraeuter-online-kaufen-oder-verordnen/\">Onlinekauf</a> wichtig ist, haben wir separat zusammengefasst. | /wissen/chinesische-kraeuter-online-kaufen-oder-verordnen/, /wissen/chinesische-kraeuter-qualitaet-schweiz/ |
| `src/data/fragen.ts` | mehr-Block von tcm-kraeuter-nebenwirkungen | { href: '/wissen/chinesische-kraeuter-qualitaet-schweiz/', label: 'Qualität und Zulassung chinesischer Kräuter', cat: 'Artikel' },       { href: '/wissen/chinesische-kraeuter-online-kaufen-oder-verordnen/', label: 'Online kaufen oder verordnen lassen?', cat: 'Artikel' },       { href: '/wissen/tcm-g | /wissen/chinesische-kraeuter-online-kaufen-oder-verordnen/, /wissen/chinesische-kraeuter-qualitaet-schweiz/, /wissen/tcm-granulat-dekokt-tabletten/ |
| `src/data/gesundheitsbibliothek.ts` |   '/beschwerden/burning-mouth-syndrom/': 'Burning-Mouth-Syndrom Mundbrennen Glossodynie Stomatodynie',  |   '/wissen/chinesische-kraeuter-bei-schlafstoerungen/': 'Chinesische Kräuter Schlafstörungen Kräutertherapie Schlaf Einschlafen Durchschlafen',   '/wissen/chinesische-kraeuter-bei-reizdarm/': 'Chinesische Kräuter Reizdarm Kräutertherapie Reizdarm Tongxie Yaofang',   '/wissen/chinesische-kraeuter-bei | /wissen/akupunktur-oder-kraeutertherapie/, /wissen/chinesische-kraeuter-bei-allergischem-schnupfen/, /wissen/chinesische-kraeuter-bei-funktioneller-dyspepsie/, /wissen/chinesische-kraeuter-bei-regelschmerzen/, /wissen/chinesische-kraeuter-bei-reizdarm/, /wissen/chinesische-kraeuter-bei-schlafstoerungen/, /wissen/chinesische-kraeuter-bei-verstopfung/, /wissen/chinesische-kraeuter-online-kaufen-oder-verordnen/, /wissen/chinesische-kraeuter-qualitaet-schweiz/, /wissen/tcm-granulat-dekokt-tabletten/ |
| `seo/master-keyword-url-map.csv` | Dateiende | 10 Zeilen |  |
| `seo/do-not-create-intents.csv` | Dateiende | 10 Zeilen |  |
| `seo/index-queue.md` | nach «## Geplant (noch nicht live)» | 10 Zeilen |  |

Gerendert: Beschwerden-Chips «Wirkt das wirklich? Zum Nachlesen» (wissen-links.ts) auf sechs Beschwerde-Leaves, Weiterlesen-Karten auf fünf Akupunktur-Artikeln, drei Verweissätze im Winterthur-Kräuterartikel, drei «Mehr»-Karten auf der Nebenwirkungen-Frage. Registrierungen: Bibliothekssuche (10 Einträge), Keyword-Map (10 Zeilen), Guards (10 Zeilen), Index-Queue «Geplant (noch nicht live)» (10 Zeilen, vorbereitet, nicht eingereicht/indexiert). Wissen-Hub und Sitemap entstehen automatisch aus `wissen.ts`.

## 6. Prüfungen auf dem PR-HEAD `807be275 (Textstand; Bericht im Folgecommit)`

- `npm run build`: grün (Sitemap + Worker).
- Gates:
  - `health-audit`:   Ownership-Gate: 7 Pins, 3 Retired, 0 Fehler
  - `check-i18n`: i18n: 51 entries (41 DE⇄EN pairs, 10 EN-only) · editorial {"Approved":51} · publication published 51 / unpubli
  - `test-en-analytics`: en-analytics: 47 passed, 0 failed
  - `check-kontakt-formular`: Kontaktformular-Gate: 0 Fehler
  - `check-clinic-status`: Clinic-Status-Gate: 0 Fehler
  - `check-standort-ux`: Standort-UX-Gate: 0 Fehler
  - `check-first30`: FIRST-30-Gate: 0 Fehler
  - `check-professional`:  ✓ Registry ↔ Build ↔ Sitemap konsistent, Logik-Tests grün
  - `test-anfrage-betreff`: 86 PASS / 0 FAIL
  - `test-kontakt-formular`: 703 PASS / 0 FAIL
- Kohortenprüfung der 10 URLs (`kcohort.py`): 10 Seiten, 0 Befunde. Geprüft: Status, Title (eindeutig), Meta (eindeutig über alle /wissen/), Canonical, Indexierbarkeit, genau 1 H1, drei sichtbare FAQ, Quellenblock, kein FAQPage-/Question-Schema, kein datePublished/dateModified/lastReviewed/reviewedBy, keine Reviewer-Angabe, Em-/Gedankenstrich/ß/Qi, alle internen Linkziele vorhanden und kanonisch, ≥ 2 Bestands-Inbound (ohne die zehn neuen Seiten).
- CSV-Parsing und Ownership-/Alias-Semantik (`ksem.py`): Map-Zeilen 857, Guard-Zeilen 229, neue Map/Guard-Zeilen 10/10; Befunde: 0.
- Overflow 320/390/1440 px, 10 neue URLs + 4 Bestandsseiten (Reizdarm-Leaf, Winterthur, Nebenwirkungen-Frage, Wissen-Hub): 42 Prüfungen, 0 Overflow, pageerrors 0 []. Screenshots (top/FAQ/Quellen/Weiterlesen bei 390 und 1440): `/tmp/claude-0/-home-user-tcm-ch/7256a291-45a8-5985-b8d0-3822d9872d66/scratchpad/kqa/shots`.
- Build-Diff main `bddea458` → Branch: Seiten 866 → 876, hinzugefügt 10 (= die 10 URLs: ja), entfernt keine; geänderte Bestandsdateien: beschwerden/allergien-heuschnupfen/index.html (chip), beschwerden/funktionelle-dyspepsie/index.html (chip), beschwerden/menstruationsbeschwerden/index.html (chip), beschwerden/reizdarm/index.html (chip), beschwerden/schlafprobleme/index.html (chip), beschwerden/verstopfung/index.html (chip), gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/index.html (mehr-karten), sitemap.xml (sitemap), wissen/akupunktur-bei-heuschnupfen/index.html (weiterlesen-karte), wissen/akupunktur-bei-menstruationsbeschwerden/index.html (weiterlesen-karte), wissen/akupunktur-bei-reizdarm/index.html (weiterlesen-karte), wissen/akupunktur-bei-verstopfung/index.html (weiterlesen-karte), wissen/akupunktur-schlafprobleme/index.html (weiterlesen-karte), wissen/chinesische-kraeutertherapie-winterthur/index.html (verweissaetze), wissen/index.html (wissen-hub (Karten aus wissen.ts)); unerwartet: keine; EN: 0; Standorte/Formulare: 0.
- Integrationsscript atomar (alle Dateien erst nach allen Prüfungen geschrieben); zweiter Lauf bricht vor der ersten Mutation ab.
- Keine echten Anfragen, Mails, Buchungen oder Conversions; Formulare, Tracking, GTM/GA4/Ads, OneDoc unverändert (Diff enthält keine Komponenten-, Script- oder Functions-Dateien).

## 7. Einschränkungen und offene Punkte

- Veröffentlichungsdatum ungesetzt: Hub-Karten auf `/wissen/` zeigen für die zehn Artikel kein Datumssegment (Karten am Listenende). Beim Release: `PUBLISHED_KRAEUTER_2026_10` setzen, Queue-Zeilen nach «Offen» mit Datum verschieben.
- Formulartest `test-kontakt-formular` auf dem Review-Stand: Lauf 1 702/703 mit dem bekannten Flacker-Check «ohne Auswahl: Mint-Kachel hat denselben neutralen Rand wie der Check-in» (Style-Messung vor dem Stylesheet, auf main in PR #71 dokumentiert), Lauf 2 703/703. Dieser Branch ändert keine Komponenten-, Formular-, Script- oder Functions-Dateien (`git diff --name-only origin/main` enthält nur `seo/`, `src/data/` und `src/pages/wissen/index.astro`). Der grüne Rerun ist keine Ursachenbehebung; Assertion unverändert. Logs: `/tmp/claude-0/-home-user-tcm-ch/7256a291-45a8-5985-b8d0-3822d9872d66/scratchpad/kqa/gate-test-kontakt-formular.run1.log` (Lauf 1), `/tmp/claude-0/-home-user-tcm-ch/7256a291-45a8-5985-b8d0-3822d9872d66/scratchpad/kqa/gate-test-kontakt-formular.log` (Lauf 2).
- Keine ärztliche Prüfung erfolgt oder behauptet; Autorin ist die Redaktion, keine Reviewer-Angaben.
- Semrush blockiert: keine Nachfragedaten; Priorisierung innerhalb des Clusters nicht belegt.
- Standortbezogene Kräuter-CTAs bewusst nicht gesetzt (keine verifizierte Angebots-/Fachpersonenzuordnung); alle CTAs führen auf die neutrale Kontaktanfrage.
