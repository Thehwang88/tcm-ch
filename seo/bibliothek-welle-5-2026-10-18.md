# Gesundheitsbibliothek Welle 5: 20 Beschwerden-Drafts (18.10.2026)

Branch `content/welle-5-beschwerden-20`, HEAD `Release-Commit (Integration + Queue-Datum, dieser Commit)`, Basis main `d7425f1f` (Merge #69; main am 18.10.2026 erneut geprüft, unverändert). Release-Stand (Integration angewendet, Merge per GO vom 18.10.2026 freigegeben).

Nur `/beschwerden/<slug>/` über das bestehende Leaf-Template (`src/data/symptom-leaves/*.html`, `src/pages/beschwerden/[slug].astro`, Eintrag in `src/data/beschwerden.ts`). Keine Akupunktur-bei-Serie, keine Synonymseiten, kein FAQPage-/Question-Schema (`NO_FAQ_SCHEMA`), kein Publikationsdatum (Beschwerden-Leaves tragen keines), keine Autoren/Reviewer/Qualifikationen, keine Spezialangebote. Schweizer Schreibweise, du, keine Em-Dashes in neuen Texten.

## 0. Status

**Release-Stand.** Die 20 Seiten sind registriert (Keep-Liste, Hub A-Z, Bibliothekssuche und Körperregionen, Keyword-Map, Guards, Index-Queue mit Veröffentlichungsdatum 18.10.2026 unter «Offen» = veröffentlicht, Indexierung offen) und über kontextuelle Sätze aus Bestandsseiten verlinkt. `npm run build` auf dem Branch ist vollständig grün (Sitemap 842 URLs, Worker-Bundle). Beschwerden-Leaves tragen kein datePublished-Feld; es wurde keines ergänzt. Keine ärztliche Freigabe erfolgt oder behauptet. Der frühere `seo/welle-5-integration.patch` ist angewendet und entfernt (historisch in Commit `be2abd99`). Veröffentlichung ist kein Nachweis für Indexierung oder Rankings.

## 1. Textpaket

| # | URL | Title | Meta | Wörter | Quellen |
|---|-----|-------|------|--------|---------|
| 1 | /beschwerden/hallux-rigidus/ | Hallux rigidus: Symptome und Behandlung | 151 | 753 | 3 |
| 2 | /beschwerden/laeuferknie/ | Läuferknie (Iliotibialband-Syndrom): Symptome und Behandlung | 158 | 691 | 2 |
| 3 | /beschwerden/schienbeinkantensyndrom/ | Schienbeinkantensyndrom: Symptome und Behandlung | 155 | 643 | 2 |
| 4 | /beschwerden/gluteale-tendinopathie/ | Gluteale Tendinopathie: Symptome und Behandlung | 159 | 742 | 4 |
| 5 | /beschwerden/tfcc-laesion/ | TFCC-Läsion: Symptome und Behandlung | 157 | 718 | 3 |
| 6 | /beschwerden/proximale-hamstring-tendinopathie/ | Proximale Hamstring-Tendinopathie: Symptome und Behandlung | 163 | 702 | 3 |
| 7 | /beschwerden/adduktorentendinopathie/ | Adduktorentendinopathie: Symptome und Behandlung | 161 | 634 | 3 |
| 8 | /beschwerden/peronealsehnen-tendinopathie/ | Peronealsehnen-Tendinopathie: Symptome und Behandlung | 164 | 720 | 3 |
| 9 | /beschwerden/tibialis-posterior-tendinopathie/ | Tibialis-posterior-Tendinopathie: Symptome und Behandlung | 155 | 753 | 2 |
| 10 | /beschwerden/metatarsalgie/ | Metatarsalgie: Symptome und Behandlung | 159 | 696 | 3 |
| 11 | /beschwerden/spondylolisthese/ | Wirbelgleiten (Spondylolisthese): Symptome und Behandlung | 164 | 744 | 4 |
| 12 | /beschwerden/psoriasis-arthritis/ | Psoriasis-Arthritis: Symptome und Behandlung | 164 | 670 | 3 |
| 13 | /beschwerden/dyshidrotisches-ekzem/ | Dyshidrotisches Ekzem: Symptome und Behandlung | 161 | 666 | 2 |
| 14 | /beschwerden/kontaktdermatitis/ | Kontaktdermatitis: Symptome und Behandlung | 163 | 779 | 2 |
| 15 | /beschwerden/akne-inversa/ | Akne inversa: Symptome und Behandlung | 165 | 725 | 3 |
| 16 | /beschwerden/lichen-sclerosus/ | Lichen sclerosus: Symptome und Behandlung | 162 | 818 | 3 |
| 17 | /beschwerden/vestibulaere-migraene/ | Vestibuläre Migräne: Symptome und Behandlung | 164 | 748 | 3 |
| 18 | /beschwerden/vestibularisneuritis/ | Vestibularisneuritis: Symptome und Behandlung | 165 | 741 | 3 |
| 19 | /beschwerden/hyperakusis/ | Hyperakusis: Symptome und Behandlung | 156 | 662 | 3 |
| 20 | /beschwerden/burning-mouth-syndrom/ | Burning-Mouth-Syndrom: Symptome und Behandlung | 164 | 761 | 5 |

Wörter = sichtbarer Text inkl. Kurzantwort, Lead und FAQ, ohne Navigation/Sidebar. Aufbau je Seite: Kurzantwort, Definition/Abgrenzung, Beschwerden, Ursachen, Abklärung, Standardbehandlung, ergänzende Möglichkeiten und Grenzen, Warnzeichen, nächster Schritt, 3 FAQ mit sichtbaren Antworten, Quellen. H1 «X: Beschwerden, Abklärung und Behandlung», Title «X: Symptome und Behandlung» (das Template hängt wie bei Welle 4 kein «| TCM.ch» an). Metas 151 bis 165 Zeichen.

### Metas

- **hallux-rigidus**: Hallux rigidus: Arthrose im Grosszehengrundgelenk. Typische Beschwerden, Abklärung, Behandlung von Schuh bis Operation und die Grenzen ergänzender TCM.
- **laeuferknie**: Läuferknie (Iliotibialband-Syndrom): Schmerz aussen am Knie beim Laufen. Ursachen, Abgrenzung, Abklärung, Behandlung mit Training und Grenzen ergänzender TCM.
- **schienbeinkantensyndrom**: Schienbeinkantensyndrom: Belastungsschmerz an der inneren Schienbeinkante. Ursachen, Abgrenzung zur Stressfraktur, Behandlung und ergänzende Möglichkeiten.
- **gluteale-tendinopathie**: Gluteale Tendinopathie: Schmerz aussen an der Hüfte, beim Seitenliegen und Treppensteigen. Ursachen, Abklärung, Training als Basis und Grenzen ergänzender TCM.
- **tfcc-laesion**: TFCC-Läsion: Schmerz an der Kleinfingerseite des Handgelenks nach Verletzung oder Verschleiss. Abklärung, Schiene oder Operation und Grenzen ergänzender TCM.
- **proximale-hamstring-tendinopathie**: Proximale Hamstring-Tendinopathie: tiefer Schmerz am Sitzbeinhöcker beim Sitzen und Laufen. Abgrenzung zu Ischias, Abklärung, Belastungsaufbau und Grenzen der TCM.
- **adduktorentendinopathie**: Adduktorentendinopathie: Leistenschmerz durch überlastete Sehnen der Oberschenkelinnenseite. Abgrenzung, Abklärung, aktives Training und Grenzen ergänzender TCM.
- **peronealsehnen-tendinopathie**: Peronealsehnen-Tendinopathie: Schmerz hinter dem Aussenknöchel nach Umknicken oder Überlastung. Riss und Schnappen erkennen, Abklärung, Behandlung, Grenzen der TCM.
- **tibialis-posterior-tendinopathie**: Tibialis-posterior-Tendinopathie: Schmerz am Innenknöchel, später Knick-Senkfuss. Ursachen, Abklärung, Einlagen und Training sowie Grenzen ergänzender TCM.
- **metatarsalgie**: Metatarsalgie: Schmerz unter dem Vorfussballen beim Stehen und Gehen. Häufige Ursachen, Abklärung, was Schuhe und Einlagen leisten und Grenzen ergänzender TCM.
- **spondylolisthese**: Wirbelgleiten (Spondylolisthese): ein Wirbel verschiebt sich nach vorne. Beschwerden, Abgrenzung zum Bandscheibenvorfall, Abklärung, Behandlung und Grenzen der TCM.
- **psoriasis-arthritis**: Psoriasis-Arthritis: Gelenkentzündung bei Schuppenflechte mit Schmerz, Schwellung und Steifigkeit. Zeichen, rheumatologische Abklärung, Behandlung, Grenzen der TCM.
- **dyshidrotisches-ekzem**: Dyshidrotisches Ekzem (Pompholyx): juckende Bläschen an Händen und Füssen in Schüben. Auslöser, Abgrenzung zu Pilz und Psoriasis, Behandlung und Grenzen der TCM.
- **kontaktdermatitis**: Kontaktdermatitis: Ekzem durch Reizstoffe oder Kontaktallergene, meist an Händen und Gesicht. Irritativ oder allergisch, Epikutantest, Behandlung, Grenzen der TCM.
- **akne-inversa**: Akne inversa (Hidradenitis suppurativa): schmerzhafte Knoten und Abszesse in Hautfalten. Ursachen, Abklärung, dermatologische Behandlung und Grenzen ergänzender TCM.
- **lichen-sclerosus**: Lichen sclerosus: juckende, weisse Hautstellen meist im Genitalbereich. Zeichen bei allen Geschlechtern, Abklärung, Kortisonsalbe, Kontrollen und Grenzen der TCM.
- **vestibulaere-migraene**: Vestibuläre Migräne: Schwindelattacken mit Migränebezug, oft ohne Kopfschmerz. Kriterien, Abgrenzung zu Lagerungsschwindel und Menière, Behandlung, Grenzen der TCM.
- **vestibularisneuritis**: Vestibularisneuritis: plötzlicher, tagelanger Drehschwindel durch Ausfall des Gleichgewichtsnervs. Abgrenzung zum Schlaganfall, Behandlung, Reha und Grenzen der TCM.
- **hyperakusis**: Hyperakusis: Alltagsgeräusche wirken unerträglich laut oder schmerzhaft. Abgrenzung zu Tinnitus und Misophonie, HNO-Abklärung, Therapie und Grenzen der TCM.
- **burning-mouth-syndrom**: Burning-Mouth-Syndrom: chronisches Brennen im Mund bei unauffälliger Schleimhaut. Abgrenzung zu anderen Ursachen, Abklärung, Behandlung und Grenzen ergänzender TCM.

### FAQ-Fragen

- **hallux-rigidus**: Ist Hallux rigidus dasselbe wie Hallux valgus? · Wann ist eine Operation ein Thema? · Welche Rolle spielen Schuhe und Belastung?
- **laeuferknie**: Wo sitzt der Schmerz beim Läuferknie? · Ist Läuferknie dasselbe wie PFPS? · Wann kann ich wieder laufen?
- **schienbeinkantensyndrom**: Ist jeder Schienbeinschmerz ein Schienbeinkantensyndrom? · Muss ich mit dem Laufen pausieren? · Wann sollte der Schmerz abgeklärt werden?
- **gluteale-tendinopathie**: Ist das eine Schleimbeutelentzündung? · Warum tut Liegen auf der Seite weh? · Welche Rolle spielt Belastungsaufbau?
- **tfcc-laesion**: Wo liegt der TFCC? · Braucht jede TFCC-Läsion eine Operation? · Wann ist Handchirurgie sinnvoll?
- **proximale-hamstring-tendinopathie**: Warum schmerzt der Sitzbeinhöcker beim Sitzen? · Ist das dasselbe wie Ischias? · Wie wird die Belastung wieder aufgebaut?
- **adduktorentendinopathie**: Ist jeder Leistenschmerz eine Adduktorenreizung? · Was unterscheidet sie von einer Zerrung? · Wann ist Sport wieder möglich?
- **peronealsehnen-tendinopathie**: Wo verlaufen die Peronealsehnen? · Kann Umknicken damit zusammenhängen? · Wann sollte ich den Fuss untersuchen lassen?
- **tibialis-posterior-tendinopathie**: Welche Funktion hat die Tibialis-posterior-Sehne? · Ist jeder Plattfuss eine Sehnenerkrankung? · Welche Behandlungsmöglichkeiten gibt es?
- **metatarsalgie**: Ist Metatarsalgie eine eigene Diagnose? · Wie unterscheidet sie sich vom Morton-Neurom? · Was können Schuhe und Einlagen beitragen?
- **spondylolisthese**: Ist Wirbelgleiten dasselbe wie ein Bandscheibenvorfall? · Kann es ohne Beschwerden bestehen? · Wann ist eine Operation ein Thema?
- **psoriasis-arthritis**: Kann Psoriasis auch die Gelenke betreffen? · Kann die Erkrankung ohne sichtbare Hautstellen auftreten? · Ersetzt ergänzende Behandlung die Rheumatherapie?
- **dyshidrotisches-ekzem**: Sind die Bläschen ansteckend? · Kann das an Händen und Füssen auftreten? · Wann ist ärztliche Behandlung nötig?
- **kontaktdermatitis**: Was unterscheidet allergische und irritative Kontaktdermatitis? · Wann ist ein Allergietest sinnvoll? · Wie lässt sich der Auslöser finden?
- **akne-inversa**: Ist Akne inversa dasselbe wie gewöhnliche Akne? · Ist sie ansteckend? · Wann sollte ich zur Dermatologie?
- **lichen-sclerosus**: Ist Lichen sclerosus ansteckend? · Ist jeder Juckreiz im Intimbereich Lichen sclerosus? · Warum sind Kontrollen wichtig?
- **vestibulaere-migraene**: Kann vestibuläre Migräne ohne Kopfschmerzen auftreten? · Wie unterscheidet sie sich von Lagerungsschwindel? · Wer stellt die Diagnose?
- **vestibularisneuritis**: Wie unterscheidet sie sich von einer Labyrinthitis? · Welche Rolle spielt vestibuläre Rehabilitation? · Wann ist plötzlicher Schwindel dringend?
- **hyperakusis**: Ist Hyperakusis dasselbe wie Tinnitus? · Sollte ich ständig Ohrstöpsel tragen? · Welche Fachperson ist zuständig?
- **burning-mouth-syndrom**: Kann die Mundschleimhaut normal aussehen? · Ist jedes Zungenbrennen ein Burning-Mouth-Syndrom? · Welche Abklärungen sind sinnvoll?

## 2. Quellenmatrix

Jede Quelle wurde tatsächlich abgerufen und gelesen (Patientenseiten im Volltext, Studien als Abstract via PubMed, Leitlinien als Volltext wo frei). Spalte «trägt» = welche Aussagen der Seite sich auf die Quelle stützen. Erkrankungsinformationen belegen keine Akupunkturwirkung; Akupunktur-Aussagen haben eine eigene Zeile in Abschnitt 3.

### /beschwerden/hallux-rigidus/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| Royal Orthopaedic Hospital NHS Foundation Trust: Hallux Rigidus (Big Toe Arthritis) | https://roh.nhs.uk/services-information/foot-and-ankle/big-toe-arthritis | Definition als Arthrose des Grosszehengrundgelenks; Beschwerden (Schmerz beim Abrollen, Steifheit, Höcker); Stufen der Behandlung von steifer Sohle/Einlagen über Schmerzmittel und Spritze bis Cheilektomie und Versteifung. |
| AAOS OrthoInfo: Hallux Rigidus (Stiff Big Toe) | https://orthoinfo.aaos.org/en/diseases--conditions/stiff-big-toe-hallux-rigidus/ | Ursachen und Risikofaktoren, Diagnose per Untersuchung und Röntgen, Abgrenzung zu Hallux valgus und Gicht, Verlauf ohne Behandlung. |
| NCCIH: Acupuncture, effectiveness and safety | https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety | Nur Einordnung der allgemeinen Akupunktur-Evidenz: Arthrose-Daten betreffen vor allem das Knie; daraus folgt keine Wirkaussage für das Grosszehengrundgelenk. |

### /beschwerden/laeuferknie/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| My Joint Health Hub (NHS Bristol, North Somerset and South Gloucestershire): Lateral knee pain / Iliotibial band syndrome | https://myjointhealthhub.bnssg.nhs.uk/knee-pain/lateral-knee-pain-itb-syndrome/ | ITBS als Ursache des Schmerzes aussen am Knie, Zusammenhang mit Laufumfang und Bergablaufen, Belastungssteuerung, Kräftigung von Hüfte und Bein, schrittweise Rückkehr; wann ärztlich abklären. |
| MedlinePlus: Iliotibial band syndrome, aftercare | https://medlineplus.gov/ency/patientinstructions/000683.htm | Selbsthilfe und Nachsorge: Pause, Eis, Schuh- und Trainingsanpassung, Kriterien für die Rückkehr zum Laufen. |

### /beschwerden/schienbeinkantensyndrom/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| NHS: Shin splints | https://www.nhs.uk/conditions/shin-splints/ | Beschwerdebild an der Schienbeinkante, Auslöser (mehr Belastung, harter Boden, Schuhe), Selbsthilfe, wann zur Ärztin (Verdacht auf Stressfraktur). |
| AAOS OrthoInfo: Shin Splints | https://orthoinfo.aaos.org/en/diseases--conditions/shin-splints/ | Mechanismus (Überlastung von Knochenhaut und Muskelansätzen), Abgrenzung zur Stressfraktur und zum Kompartmentsyndrom, Bildgebung, Wiederaufbau der Belastung. |

### /beschwerden/gluteale-tendinopathie/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| Royal National Orthopaedic Hospital NHS Trust: A Patient's guide to Gluteal Tendinopathy | https://www.rnoh.nhs.uk/patients-and-visitors/patient-information-guides/patients-guide-gluteal-tendinopathy | Sehnen des Gluteus medius/minimus am grossen Rollhügel, typische Beschwerden (Seitenliegen, Treppen, längeres Stehen), Belastungsmanagement, Kräftigungsprogramm, was zu vermeiden ist (Dehnen in Adduktion, Beine übereinanderschlagen). |
| Mellor et al. 2018: Education plus exercise versus corticosteroid injection use versus a wait and see approach on global outcome and pain from gluteal tendinopathy, BMJ | https://pubmed.ncbi.nlm.nih.gov/29720374/ | LEAP-Studie (BMJ 2018): Schulung plus Übungen besser als Kortisonspritze und Abwarten nach 8 und 52 Wochen; trägt die Aussage «Training ist die Basis, Spritze hilft nur kurzfristig». |
| My Joint Health Hub (NHS BNSSG): Greater trochanteric pain syndrome (GTPS) | https://myjointhealthhub.bnssg.nhs.uk/hip-pain/greater-trochanteric-pain-syndrome-gtps/ | GTPS als Überbegriff für Schmerz am grossen Rollhügel (Sehnen und Schleimbeutel); Abgrenzung zur glutealen Tendinopathie als häufigster Ursache. |
| Brennan et al. 2017: Dry Needling Versus Cortisone Injection in the Treatment of Greater Trochanteric Pain Syndrome, a Noninferiority Randomized Clinical Trial, Journal of Orthopaedic and Sports Physical Therapy | https://pubmed.ncbi.nlm.nih.gov/28257614/ | Dry Needling vs. Kortisonspritze bei GTPS, n=43, nicht unterlegen nach 6 Wochen, keine Scheinbehandlung; trägt ausschliesslich die Einordnung «keine spezifische Nadelwirkung belegt, Dry Needling ist keine TCM-Akupunktur». |

### /beschwerden/tfcc-laesion/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| Gloucestershire Hospitals NHS Foundation Trust: Injuries to the Triangular Fibro-Cartilaginous Complex (TFCC) | https://www.gloshospitals.nhs.uk/our-services/services-we-offer/trauma-orthopaedics/hand-clinic/wrist-trauma/injuries-to-the-triangular-fibro-cartilaginous-complex-tfcc/ | Anatomie und Funktion des TFCC, Verletzungsmechanismen (Sturz, Drehung) und Verschleiss, Beschwerden an der Kleinfingerseite, Schienenbehandlung, Zeitrahmen, Operation bei Instabilität. |
| Lim et al. 2024: Current concepts and new trends in management of isolated triangular fibrocartilage complex injuries, Journal of Hand Surgery (European Volume) | https://pubmed.ncbi.nlm.nih.gov/38488619/ | Aktuelle Behandlungskonzepte isolierter TFCC-Verletzungen: Klassifikation, MRT/Arthroskopie, konservativ zuerst, arthroskopische Naht oder Debridement, Ulnaverkürzung bei Ulna-plus. |
| Chang et al. 2021: Short-term effect of electroacupuncture on rehabilitation after arthroscopic triangular fibrocartilage complex repair, a randomised study, Journal of Orthopaedic Surgery and Research | https://pubmed.ncbi.nlm.nih.gov/33761976/ | Einzige direkte Akupunktur-Evidenz: randomisierte Studie, n=42, Elektroakupunktur zusätzlich zur Reha nach arthroskopischer TFCC-Naht, kurzfristig weniger Schmerz und bessere Funktion; trägt genau diese eingegrenzte Aussage (postoperativ, kurzfristig, klein). |

### /beschwerden/proximale-hamstring-tendinopathie/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| Calderdale and Huddersfield NHS Foundation Trust: Proximal Hamstring Tendinopathy | https://www.cht.nhs.uk/services/clinical-services/physiotherapy-outpatients/hip/proximal-hamstring-tendinopathy | Sitzbeinhöcker als Schmerzort, Sitzen und Laufen als Verstärker, Belastungsstufen (isometrisch, langsam schwer, energiespeichernd), was zu meiden ist (Dehnung in Hüftbeugung, Kompression). |
| Goom et al. 2016: Proximal Hamstring Tendinopathy, Clinical Aspects of Assessment and Management, Journal of Orthopaedic and Sports Physical Therapy | https://pubmed.ncbi.nlm.nih.gov/27084841/ | Goom 2016 (JOSPT): Untersuchung, Abgrenzung (Ischias, Piriformis, Sitzbeinbursitis), stufenweises Belastungsprogramm ohne pauschales Dehnen. |
| Degen 2019: Proximal Hamstring Injuries, Management of Tendinopathy and Avulsion Injuries, Current Reviews in Musculoskeletal Medicine | https://pubmed.ncbi.nlm.nih.gov/30806898/ | Degen 2019: Abgrenzung Tendinopathie vs. Sehnenabriss (Avulsion), Bildgebung (MRT), wann operativ; trägt die Warnzeichen für einen Riss. |

### /beschwerden/adduktorentendinopathie/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| Calderdale and Huddersfield NHS Foundation Trust: Adductor tendinopathy | https://www.cht.nhs.uk/services/clinical-services/physiotherapy-outpatients/hip/adductor-tendinopathy | Leistenschmerz aus den Adduktorensehnen, Druckschmerz am Schambeinansatz, Belastungsaufbau, Rückkehr zum Sport. |
| Weir et al. 2015: Doha agreement meeting on terminology and definitions in groin pain in athletes, British Journal of Sports Medicine | https://pubmed.ncbi.nlm.nih.gov/26031643/ | Doha-Konsens 2015: Einteilung des Leistenschmerzes bei Sportlern (adduktorenbezogen, iliopsoas-, leisten-, schambeinbezogen) und Abgrenzung zu Hüftgelenk und Hernie; trägt die Aussage «Hernie und Hüftgelenk ausschliessen». |
| Hölmich et al. 1999: Effectiveness of active physical training as treatment for long-standing adductor-related groin pain in athletes, randomised trial, The Lancet | https://pubmed.ncbi.nlm.nih.gov/9989713/ | Hölmich 1999 (Lancet): aktives Training deutlich wirksamer als passive Physiotherapie bei langdauerndem adduktorenbezogenem Leistenschmerz; trägt «aktives Training ist die belegte Behandlung». |

### /beschwerden/peronealsehnen-tendinopathie/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| MSK Dorset (NHS): Ankle pain, Peroneal tendinopathy | https://www.mskdorset.nhs.uk/ankle-pain/ankle-pain-peroneal-tendinopathy/ | Verlauf der Peronealsehnen hinter dem Aussenknöchel, Beschwerden, Auslöser (Umknicken, Überlastung, Hohlfuss), Belastungsmanagement und Kräftigung. |
| American College of Foot and Ankle Surgeons, FootHealthFacts: Peroneal Tendon Injuries | https://www.foothealthfacts.org/conditions/peroneal-tendon-injuries | Tendinopathie, Riss und Subluxation als drei Formen, Schnappen als Zeichen der Subluxation, Diagnostik (Untersuchung, Bildgebung), konservative und operative Behandlung. |
| Davda et al. 2017: Peroneal tendon disorders, EFORT Open Reviews | https://pubmed.ncbi.nlm.nih.gov/28736620/ | Davda 2017 (EFORT Open Reviews): Klassifikation der Peronealsehnenerkrankungen, Fehlstellungen als Mitursache, Operationsindikationen bei Riss und Instabilität. |

### /beschwerden/tibialis-posterior-tendinopathie/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| MSK Dorset (NHS): Ankle pain, Tibialis posterior tendinopathy | https://www.mskdorset.nhs.uk/ankle-pain/ankle-pain-tibialis-posterior-tendinopathy/ | Schmerz am Innenknöchel, Funktion der Sehne für das Längsgewölbe, Einlagen, Schuhe, Kräftigung, Belastungsanpassung. |
| AAOS OrthoInfo: Progressive Collapsing Foot Deformity (Posterior Tibial Tendon Dysfunction) | https://orthoinfo.aaos.org/en/diseases--conditions/posterior-tibial-tendon-dysfunction/ | Stadien von der Tendinopathie bis zum erworbenen Plattfuss (PCFD), Zehenstandtest, Bildgebung, Orthesen, Operation in fortgeschrittenen Stadien; trägt «nicht jede Tendinopathie führt zur Deformität». |

### /beschwerden/metatarsalgie/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| NHS: Pain in the ball of the foot | https://www.nhs.uk/symptoms/foot-pain/pain-in-the-ball-of-the-foot/ | Vorfussschmerz als Symptomkomplex, häufige Ursachen, Selbsthilfe (Schuhe, Polster), wann ärztlich abklären. |
| MSK Dorset (NHS): Foot pain, Metatarsalgia | https://www.mskdorset.nhs.uk/foot-pain-new-demo/foot-pain-metatarsalgia/ | Definition Metatarsalgie, Ursachen (Überlastung, Schuhwerk, Fussform, Fehlstellungen), Einlagen mit retrokapitaler Pelotte, Belastungsmanagement. |
| Besse 2017: Metatarsalgia, Orthopaedics and Traumatology, Surgery and Research | https://pubmed.ncbi.nlm.nih.gov/28109624/ | Besse 2017: Ursachen und biomechanische Einteilung der Metatarsalgie, Abgrenzung zu Morton-Neurom und Stressfraktur, konservative Behandlung zuerst, Operation nur bei strukturellen Ursachen. |

### /beschwerden/spondylolisthese/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| NHS: Spondylolisthesis | https://www.nhs.uk/conditions/spondylolisthesis/ | Definition Wirbelgleiten, Beschwerden, Diagnose per Röntgen/MRT, Behandlung (Schmerzmittel, Physiotherapie, Spritzen, Operation), Warnzeichen (Blasen-/Darmstörung, Lähmung). |
| AAOS OrthoInfo: Adult Spondylolisthesis of the Low Back | https://orthoinfo.aaos.org/en/diseases--conditions/adult-spondylolisthesis-in-the-low-back/ | Formen (degenerativ, isthmisch), Gradeinteilung, Abgrenzung zu Bandscheibenvorfall und Spinalkanalstenose, nichtoperative Behandlung, Indikationen zur Operation. |
| Lee et al. 2014: Acupuncture for low back pain due to spondylolisthesis, study protocol for a randomized controlled pilot trial, Trials | https://pubmed.ncbi.nlm.nih.gov/24693959/ | Nur Studienprotokoll (Pilot-RCT Akupunktur bei Wirbelgleiten, 2014); trägt die Aussage «keine abgeschlossene Studie, nur Protokolle». |
| Kim et al. 2018: The effectiveness and safety of nonsurgical integrative interventions for symptomatic lumbar spinal spondylolisthesis, randomized controlled trial protocol, Medicine | https://pubmed.ncbi.nlm.nih.gov/29742708/ | Nur Studienprotokoll (integratives Programm inkl. Akupunktur, 2018); trägt dieselbe Aussage. |

### /beschwerden/psoriasis-arthritis/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| NHS: Psoriatic arthritis | https://www.nhs.uk/conditions/psoriatic-arthritis/ | Beschwerden (Gelenkschmerz, Schwellung, Steifheit, Daktylitis, Nägel), Zusammenhang mit Schuppenflechte, Diagnose durch Rheumatologie, Behandlung (NSAR, DMARDs, Biologika), Bedeutung früher Behandlung. |
| Coates et al. 2022: GRAPPA updated treatment recommendations for psoriatic arthritis 2021, Nature Reviews Rheumatology | https://pubmed.ncbi.nlm.nih.gov/35761070/ | GRAPPA 2021/2022: Behandlungsempfehlungen nach Befallsmuster; trägt «DMARDs/Biologika sind Standard, keine Alternative durch ergänzende Verfahren». |
| MedlinePlus: Psoriatic Arthritis | https://medlineplus.gov/psoriaticarthritis.html | Abgrenzung zur rheumatoiden Arthritis und zur reinen Hautpsoriasis, Verlauf, Komorbiditäten. |

### /beschwerden/dyshidrotisches-ekzem/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| NHS: Pompholyx (dyshidrotic eczema) | https://www.nhs.uk/conditions/pompholyx/ | Pompholyx/dyshidrotisches Ekzem: juckende Bläschen an Händen und Füssen in Schüben, Auslöser (Schwitzen, Metalle, Stress, Reizstoffe), Behandlung (Kortisoncreme, Pflege, Auslöser meiden), wann zur Ärztin (Infektion). |
| MedlinePlus: Pompholyx eczema | https://medlineplus.gov/ency/article/000832.htm | Diagnose klinisch, Abgrenzung zu Pilz und Kontaktekzem, Verlauf in Schüben, Behandlung. |

### /beschwerden/kontaktdermatitis/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| NHS: Contact dermatitis | https://www.nhs.uk/conditions/contact-dermatitis/ | Irritative vs. allergische Kontaktdermatitis, typische Auslöser, Epikutantest als dermatologische Diagnostik, Behandlung (Meiden, Pflege, Kortison), wann zur Ärztin. |
| MedlinePlus: Contact dermatitis | https://medlineplus.gov/ency/article/000869.htm | Verlauf nach Kontakt, Diagnostik, Abgrenzung zu anderen Ekzemen, Selbstschutz (Handschuhe, Hautpflege). |

### /beschwerden/akne-inversa/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| NHS: Hidradenitis suppurativa (HS) | https://www.nhs.uk/conditions/hidradenitis-suppurativa/ | Akne inversa: schmerzhafte Knoten, Abszesse und Fisteln in Hautfalten, Schweregrade, Behandlung (Antiseptika, Antibiotika, Biologika, Operation), Risikofaktoren (Rauchen, Gewicht). |
| Zouboulis et al. 2015: European S1 guideline for the treatment of hidradenitis suppurativa/acne inversa, Journal of the European Academy of Dermatology and Venereology | https://pubmed.ncbi.nlm.nih.gov/25640693/ | Europäische S1-Leitlinie HS/Akne inversa: Stadieneinteilung (Hurley), stufenweise medikamentöse und chirurgische Behandlung, Abgrenzung zur Akne vulgaris. |
| MedlinePlus: Hidradenitis Suppurativa (Acne Inversa) | https://medlineplus.gov/hidradenitissuppurativa.html | Patientenverständliche Einordnung als chronische Entzündung der Haarfollikel in Hautfalten, nicht als Hygieneproblem oder gewöhnliche Akne. |

### /beschwerden/lichen-sclerosus/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| NHS: Lichen sclerosus | https://www.nhs.uk/conditions/lichen-sclerosus/ | Beschwerden (Juckreiz, weisse Hautstellen, Risse, Schmerzen), alle Geschlechter und Kinder, Kortisonsalbe als Standard, regelmässige Kontrollen wegen Vernarbung und erhöhtem Hautkrebsrisiko. |
| DermNet: Lichen sclerosus | https://dermnetnz.org/topics/lichen-sclerosus | Klinisches Bild an Genital und Haut, Diagnose klinisch mit Biopsie bei Unklarheit, Abgrenzung zu Lichen planus, Vulvodynie und atrophischer Scheidenhaut. |
| Lewis et al. 2018: British Association of Dermatologists guidelines for the management of lichen sclerosus, British Journal of Dermatology | https://pubmed.ncbi.nlm.nih.gov/29313888/ | BAD-Leitlinie 2018: hochpotentes Kortison als Erstlinie, Erhaltungstherapie, Nachsorge, Hinweis auf Plattenepithelkarzinom-Risiko; trägt «keine Kortisonvermeidung». |

### /beschwerden/vestibulaere-migraene/

Startquelle **nicht erreichbar** (HTTP 403, Cloudflare-Challenge, Merseycare-Leaflet). Ersatz: Lempert 2022 (Diagnosekriterien), American Migraine Foundation, NHS Vertigo.

| Quelle | URL | trägt |
|--------|-----|-------|
| Lempert et al. 2022: Vestibular migraine, Diagnostic criteria, Journal of Vestibular Research (Bárány Society und International Headache Society) | https://pubmed.ncbi.nlm.nih.gov/34719447/ | Lempert 2022 (Bárány/IHS): Diagnosekriterien der vestibulären Migräne (Episodendauer 5 Min bis 72 h, Migräneanamnese, Migränezeichen bei mindestens der Hälfte der Episoden); trägt Definition und Abgrenzung. |
| American Migraine Foundation: What to Know About Vestibular Migraine | https://americanmigrainefoundation.org/resource-library/vestibular-migraine/ | Beschwerdebild (Schwindel ohne Kopfschmerz möglich), Trigger, Prophylaxe und Akutbehandlung analog Migräne, vestibuläre Rehabilitation. |
| NHS: Vertigo | https://www.nhs.uk/conditions/vertigo/ | Abgrenzung der Schwindelursachen (Lagerungsschwindel, Vestibularisneuritis, Menière, Migräne), Warnzeichen, wann notfallmässig. |

### /beschwerden/vestibularisneuritis/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| NHS: Labyrinthitis and vestibular neuritis | https://www.nhs.uk/conditions/labyrinthitis/ | Vestibularisneuritis vs. Labyrinthitis (mit/ohne Hörsymptome), akuter tagelanger Drehschwindel, Behandlung (Antiemetika kurz, frühe Mobilisation), Warnzeichen. |
| Strupp et al. 2022: Acute unilateral vestibulopathy/vestibular neuritis, Diagnostic criteria, Journal of Vestibular Research (Bárány Society) | https://pubmed.ncbi.nlm.nih.gov/35723133/ | Strupp 2022 (Bárány): Kriterien der akuten einseitigen Vestibulopathie, HINTS-Untersuchung zur Abgrenzung vom Schlaganfall, Kortison-Evidenz begrenzt, vestibuläre Reha. |
| NIDCD: Balance Disorders | https://www.nidcd.nih.gov/health/balance-disorders | Überblick Gleichgewichtsstörungen, Rolle des Gleichgewichtsnervs, Diagnostik (Hörtest, Gleichgewichtstests), Reha. |

### /beschwerden/hyperakusis/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| NHS: Noise sensitivity (hyperacusis) | https://www.nhs.uk/conditions/hyperacusis/ | Definition (Alltagsgeräusche unerträglich laut), Ursachen und Begleiterkrankungen, Abgrenzung zu Tinnitus und Misophonie, Hörtherapie/CBT, keine Gehörschützer im Alltag. |
| RNID: Hyperacusis | https://rnid.org.uk/information-and-support/tinnitus/hyperacusis/ | Audiologische Abklärung, Unbehaglichkeitsschwellen, Geräuschtherapie, Phonophobie und Rekruitment als eigene Phänomene. |
| Tinnitus UK: Hyperacusis | https://www.tinnitus.org.uk/hyperacusis | Alltagsbewältigung, schrittweise Geräuschgewöhnung, Zusammenhang mit Tinnitus, Hinweis auf Fachstellen. |

### /beschwerden/burning-mouth-syndrom/

Startquelle verwendet.

| Quelle | URL | trägt |
|--------|-----|-------|
| NIDCR (National Institute of Dental and Craniofacial Research): Burning Mouth Syndrome | https://www.nidcr.nih.gov/health-info/burning-mouth | Primäres vs. sekundäres BMS, Ausschlussdiagnose, Ursachen des sekundären Brennens (Eisenmangel, Mundtrockenheit, Pilz, Medikamente, Hormone), Behandlung symptomatisch. |
| McMillan et al. 2016: Interventions for treating burning mouth syndrome, Cochrane Database of Systematic Reviews | https://pubmed.ncbi.nlm.nih.gov/27855478/ | Cochrane 2016: insgesamt niedrige Evidenz für alle Behandlungen des BMS; trägt «kein belastbarer Nachweis». |
| Yan et al. 2012: A systematic review of acupuncture or acupoint injection for management of burning mouth syndrome, Quintessence International | https://pubmed.ncbi.nlm.nih.gov/23034422/ | Yan 2012: systematische Übersicht Akupunktur/Akupunktinjektion bei BMS, kleine Studien schwacher Qualität; trägt die Bewertung der Akupunkturstudien. |
| Cabras et al. 2021: Effectiveness of Nonpharmacologic Treatments of Burning Mouth Syndrome, A Systematic Review, Journal of Oral and Facial Pain and Headache | https://pubmed.ncbi.nlm.nih.gov/34609377/ | Cabras 2021: Übersicht nichtmedikamentöser Verfahren inkl. Akupunktur, methodische Schwächen, keine Empfehlung; trägt dieselbe Bewertung. |
| Sato et al. 2026: Efficacy of acupuncture in burning mouth syndrome, a placebo-controlled trial, European Archives of Oto-Rhino-Laryngology | https://pubmed.ncbi.nlm.nih.gov/41566026/ | Sato 2026 (Eur Arch Otorhinolaryngol; nur Abstract zugänglich, Springer-Volltext paywalled): 40 Personen mit primärem BMS, Verum- vs. Schein-Akupunktur, zehn Sitzungen, Fragebögen vor/nach Behandlung; Abstract berichtet eine signifikant reduzierte Schmerzintensität in der Verum-Gruppe (besonders abends) und mehr Speichel, ohne Zwischen-Gruppen-Statistik, Endpunktdefinition, Effektgrösse oder Nachbeobachtung zu nennen. Trägt nur: Schmerzabnahme in der Verum-Gruppe berichtet, klein, kein belastbarer Nachweis. |

## 3. Akupunktur-Wirkaussagen: gesonderter Nachweis

Je Seite: Wortlaut der Grenze auf der Seite, direkte Evidenz (falls vorhanden) und Ergebnis der PubMed-Suche vom 18.10.2026 (`(acupuncture OR electroacupuncture) AND <Erkrankung>`, englische Begriffe, einmal ohne und einmal mit Filter RCT/klinische Studie/systematische Übersicht/Metaanalyse). Treffer, die keine Akupunktur bei dieser Erkrankung betreffen, sind als irrelevant markiert.

**Grenzen der Suche:** nur PubMed, nur englische Suchbegriffe, keine chinesischsprachigen Datenbanken (CNKI), keine Studienregister, keine Handsuche in Leitlinien; Studien, deren Titel/Abstract die Akupunktur nicht nennen (z. B. Behandlungspakete wie «Mokhuri Chuna»), werden so nicht gefunden. Genau das ist beim Wirbelgleiten passiert (Abschnitt 8). Die Seiten formulieren deshalb als Rechercheergebnis («haben wir keine aussagekräftigen Studien gefunden»), nicht als Tatsache, dass keine Studien existieren.

| Seite | PubMed gesamt / Studien+Übersichten | Einordnung | Wortlaut der Seite |
|---|---|---|---|
| hallux-rigidus | 1 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur beim Hallux rigidus gibt es keine aussagekräftigen Studien. Studien zur Akupunktur bei Arthrose betreffen vor allem das Kniegelenk und lassen sich nicht auf das Grosszehengrundgelenk übertragen. Ein ergänzender Versuch zur Schmerzlinderung kann nach der Abklärung besprochen werden. Verlorener Knorpel, Knochenanbauten oder die Gelenkstellung lassen sich damit nicht wiederherstellen, und eine notwendige Schuhversorgung oder Operation ersetzt er nicht. |
| laeuferknie | 1 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur beim Iliotibialband-Syndrom gibt es keine aussagekräftigen Studien. Ergebnisse zu anderen Knieschmerzen, etwa zur Kniearthrose, lassen sich nicht übertragen. Ein ergänzender Versuch zur Schmerzlinderung kann besprochen werden, wenn die Diagnose steht. Die Grundlage bleibt die Anpassung der Belastung und das Kräftigungsprogramm; ohne sie kommt der Schmerz beim Laufen meist zurück. |
| schienbeinkantensyndrom | 3 / 1 | Treffer betrifft Karpaltunnelsyndrom (irrelevant) | Zur Akupunktur beim Schienbeinkantensyndrom gibt es keine aussagekräftigen Studien. Ein ergänzender Versuch zur Schmerzlinderung kann besprochen werden, wenn eine Stressfraktur ausgeschlossen ist. Wichtig: Weniger Schmerz ist kein Zeichen dafür, dass der Knochen die Belastung wieder trägt. Die Pause und der schrittweise Aufbau bleiben die Behandlung. |
| gluteale-tendinopathie | 4 / 2 | Treffer: Dry Needling vs. Kortison (Brennan 2017, keine Scheinkontrolle) und Übersicht Dry Needling vs. Kortison; auf der Seite eingeordnet | Zur Akupunktur bei glutealer Tendinopathie gibt es keine aussagekräftigen Studien. Eine kleine Studie mit 43 Personen fand Dry Needling einer Kortisonspritze nicht unterlegen (Brennan 2017); Dry Needling ist eine physiotherapeutische Nadeltechnik, keine TCM-Akupunktur, und die Studie hatte keine Scheinbehandlung, belegt also keine spezifische Nadelwirkung. Ein ergänzender Versuch zur Schmerzlinderung, etwa um besser zu schlafen und das Übungsprogramm durchzuhalten, kann besprochen werden. Nadeln reparieren die Sehne nicht. Was die Sehne belastbarer macht, ist der dosierte Trainingsaufbau; er bleibt die Grundlage. |
| tfcc-laesion | 3 / 1 | Treffer: Chang 2021 (post-OP, n=42), auf der Seite eingeordnet | Zur Akupunktur bei TFCC-Läsionen gibt es kaum Daten. Eine kleine randomisierte Studie mit 42 Personen untersuchte Elektroakupunktur zusätzlich zur Rehabilitation nach einer arthroskopischen TFCC-Naht; die Akupunkturgruppe erreichte nach vier und acht Wochen eine bessere Beweglichkeit und Funktion. Das ist eine einzelne kleine Studie zur Nachbehandlung und kein Beleg für die Behandlung der Verletzung selbst. Akupunktur kann einen gerissenen TFCC nicht reparieren und eine instabile Verletzung nicht stabilisieren. Nach der handchirurgischen Einordnung kann ein ergänzender Versuch zur Schmerzlinderung besprochen werden. |
| proximale-hamstring-tendinopathie | 2 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur bei proximaler Hamstring-Tendinopathie gibt es keine aussagekräftigen Studien. Ein ergänzender Versuch zur Schmerzlinderung kann besprochen werden, wenn die Diagnose steht und ein Sehnenriss ausgeschlossen ist. Die Sehne wird nicht durch Nadeln belastbarer, sondern durch den dosierten Trainingsaufbau; dieser bleibt die Grundlage. |
| adduktorentendinopathie | 0 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur bei Adduktorentendinopathie gibt es keine aussagekräftigen Studien. Ein ergänzender Versuch zur Schmerzlinderung kann besprochen werden, wenn Hernie, Verletzung und Hüftgelenk abgeklärt sind. Die belegte Behandlung ist das aktive Training; Akupunktur ersetzt es nicht. |
| peronealsehnen-tendinopathie | 1 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur bei Peronealsehnen-Tendinopathie gibt es keine aussagekräftigen Studien. Ein ergänzender Versuch zur Schmerzlinderung kann nach der Abklärung besprochen werden. Einen Riss oder eine herausspringende Sehne behebt er nicht; eine Subluxation, die weiterbesteht, reisst mit der Zeit eher. Die fachärztliche Einordnung geht vor. |
| tibialis-posterior-tendinopathie | 3 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur bei Tibialis-posterior-Tendinopathie gibt es keine aussagekräftigen Studien. Ein ergänzender Versuch zur Schmerzlinderung kann nach der Abklärung besprochen werden. Er stützt das Gewölbe nicht und hält ein Fortschreiten der Fehlstellung nicht auf; Einlagen, Schuhe und Kräftigung bleiben die Grundlage, und ein sich veränderndes Fussgewölbe gehört in fachärztliche Kontrolle. |
| metatarsalgie | 1 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur bei Metatarsalgie gibt es keine aussagekräftigen Studien. Weil hinter dem Schmerz verschiedene Ursachen stecken, muss zuerst klar sein, welche vorliegt. Danach kann ein ergänzender Versuch zur Schmerzlinderung besprochen werden. Er ändert nichts an Fehlstellung, Druckverteilung oder Schuhproblem; Schuhe, Einlagen und Dehnung bleiben die Grundlage. |
| spondylolisthese | 14 / 3 | Filtertreffer: zwei Protokolle und eine OP-Studie (irrelevant). Nachträglich geprüft (Review): Kim 2026 (Paket vs. Standardversorgung, 115 Personen) und Wang 2021 (Akupunktur plus Nervenblockade, 70 Personen) sind auf der Seite als Paket- bzw. Add-on-Ergebnis eingeordnet, nicht als isolierte Akupunkturwirkung | Zur Akupunktur beim Wirbelgleiten gibt es keine abgeschlossenen aussagekräftigen Studien; veröffentlicht sind bisher nur Studienprotokolle ohne Ergebnisse (Lee 2014, Kim 2018). Ergebnisse zur Akupunktur bei unspezifischen Rückenschmerzen lassen sich nicht ohne Weiteres übertragen, weil hier eine strukturelle Verschiebung vorliegt. Ein ergänzender Versuch zur Schmerzlinderung kann nach der Abklärung besprochen werden. Kein manuelles oder nadelbasiertes Verfahren schiebt einen Wirbel zurück, und bei Nervenausfällen darf keine Zeit verloren gehen. |
| psoriasis-arthritis | 10 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur bei Psoriasis-Arthritis gibt es keine aussagekräftigen Studien. Sie ist keine Alternative zu DMARDs oder Biologika; wer die Rheumatherapie zugunsten ergänzender Verfahren pausiert, riskiert bleibende Gelenkschäden. Ein ergänzender Versuch zur Linderung von Schmerz oder Verspannung kann mit dem Rheumatologie-Team besprochen werden. Pflanzliche Präparate können mit Rheumamedikamenten wechselwirken und gehören deshalb vorab auf den Tisch. |
| dyshidrotisches-ekzem | 0 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur beim dyshidrotischen Ekzem gibt es keine aussagekräftigen Studien. Studien zur Akupunktur bei Neurodermitis betreffen eine andere Erkrankung und lassen sich nicht übertragen. Ein ergänzender Versuch, etwa bei starkem Juckreiz, kann besprochen werden, wenn die Diagnose steht; in Bereiche mit Bläschen oder offener Haut wird nicht genadelt. Pflege, Kortisonkur und Auslöservermeidung bleiben die Grundlage. |
| kontaktdermatitis | 50 / 1 | Treffer betrifft Warzen (irrelevant); übrige Literatur: Kontaktallergie durch Nadeln, keine Wirkstudien | Zur Akupunktur bei Kontaktdermatitis gibt es keine aussagekräftigen Studien. Die Behandlung besteht darin, den Auslöser zu finden und zu meiden, die Hautbarriere zu pflegen und die Entzündung mit Cremes zu behandeln. Ein ergänzender Versuch gegen Juckreiz kann nach der Abklärung besprochen werden; auf entzündete oder offene Haut wird nicht genadelt. Pflanzliche Salben oder Umschläge können selbst Kontaktallergien auslösen und sollten mit der Dermatologin abgesprochen werden. |
| akne-inversa | 2 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur bei Akne inversa gibt es keine aussagekräftigen Studien. Sie heilt die Erkrankung nicht und ersetzt weder Antibiotika noch Biologika noch Operationen. In entzündete Haut, Knoten oder Fistelbereiche wird nicht genadelt. Nach der dermatologischen Einordnung kann ein ergänzender Versuch zur Schmerzlinderung oder bei begleitenden Beschwerden wie Schlafstörung besprochen werden, abgestimmt mit dem behandelnden Team. |
| lichen-sclerosus | 5 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur bei Lichen sclerosus gibt es keine aussagekräftigen Studien. Sie ersetzt die Kortisonbehandlung nicht; wer die Salbe zugunsten anderer Verfahren weglässt, riskiert Vernarbung. Ein ergänzender Versuch, etwa bei Juckreiz, Schlafstörung oder Schmerz, kann mit der behandelnden Fachärztin besprochen werden. Die betroffene Haut selbst wird nicht genadelt, und die Kontrollen bleiben unverändert wichtig. |
| vestibulaere-migraene | 10 / 1 | Treffer ist Bildgebungs-Metaanalyse zur Migräne (irrelevant); zur vestibulären Migräne nur Protokolle | Zur Akupunktur bei vestibulärer Migräne liegen bisher nur Studienprotokolle, aber keine abgeschlossenen aussagekräftigen Studien vor. Ergebnisse zur Akupunktur bei Migränekopfschmerz lassen sich nicht direkt auf Schwindelattacken übertragen. Ein ergänzender Versuch kann besprochen werden, wenn die Diagnose steht und gefährliche Ursachen ausgeschlossen sind. Die ärztliche Behandlung und Vorbeugung bleibt die Grundlage. |
| vestibularisneuritis | 3 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur bei Vestibularisneuritis gibt es keine aussagekräftigen Studien. In der Akutphase hat die notfallmässige Abklärung Vorrang; Akupunktur ist keine Erstversorgung bei akutem Schwindel. Wenn die Diagnose steht und ein Schlaganfall ausgeschlossen ist, kann ein ergänzender Versuch bei Übelkeit oder Restbeschwerden besprochen werden. Den Ausgleich des Nervenausfalls leistet das Gehirn durch Bewegung und Training; das bleibt die Grundlage. |
| hyperakusis | 2 / 0 | kein Treffer, keine Wirkaussage auf der Seite | Zur Akupunktur bei Hyperakusis gibt es keine aussagekräftigen Studien. Sie stellt weder Gehör wieder her noch heilt sie die Geräuschempfindlichkeit. Nach der HNO- und audiologischen Abklärung kann ein ergänzender Versuch zur Entspannung oder bei begleitenden Beschwerden wie Schlafstörung besprochen werden. Geräusch- und Verhaltenstherapie bleiben die belegten Behandlungen. |
| burning-mouth-syndrom | 17 / 9 | Treffer: kleine Pilotstudien, Yan 2012, Cabras 2021, Sato 2026 (nur Abstract zugänglich; Seite nennt nur die Schmerzabnahme in der Verum-Gruppe, keinen Zwischen-Gruppen-Vergleich) | Zur Akupunktur beim Burning-Mouth-Syndrom gibt es einige kleine Studien, die über eine Besserung berichten. Systematische Übersichten bewerten diese Studien als klein, kurz und methodisch schwach. Eine neuere scheinkontrollierte Studie mit 40 Personen berichtet nach zehn Sitzungen weniger Schmerz unter echter als unter Schein-Akupunktur, vor allem abends (Sato 2026); sie ist klein und ohne Langzeitdaten. Ein belastbarer Nachweis fehlt damit weiterhin. Ein ergänzender Versuch kann besprochen werden, wenn die zahnärztliche und ärztliche Abklärung abgeschlossen ist und behandelbare Ursachen ausgeschlossen sind. Eine Heilung lässt sich nicht versprechen. |

Ergebnis: Auf 16 Seiten steht «haben wir keine aussagekräftigen Studien gefunden» (Rechercheergebnis, keine Existenzaussage), und es wird kein wirksamer Behandlungsversuch behauptet (nur: ein ergänzender Versuch kann besprochen werden, mit klaren Grenzen). Direkte Evidenz ist nur dort benannt, wo sie existiert und genau in ihrer Reichweite: TFCC (post-OP, kurzfristig, n=42), Burning-Mouth-Syndrom (kleine Studien, Übersichten skeptisch, Sato 2026 n=40 nur Abstract), gluteale Tendinopathie (Dry Needling ist keine TCM-Akupunktur, keine Scheinkontrolle), Wirbelgleiten (Paket- und Add-on-Studien, keine isolierte Akupunktur), vestibuläre Migräne (nur Protokolle gefunden). Keine Übertragung aus Nachbarerkrankungen (Kniearthrose, Neurodermitis, Migränekopfschmerz, unspezifischer Rückenschmerz werden jeweils ausdrücklich als nicht übertragbar benannt).

## 4. Ownership-Prüfung

- **Läuferknie = ITBS**: Seite: «Ist Läuferknie dasselbe wie PFPS? Nein.»; PFPS und Patellaspitzensyndrom als Abgrenzung verlinkt. Meta/Title nennen Iliotibialband-Syndrom. Registrierung: Owner `/beschwerden/laeuferknie/`, PFPS-Notiz in Map/Guards wird im Patch auf den neuen Owner umgestellt; `/beschwerden/knieschmerzen/` behält den Oberbegriff (Listenpunkt wird verlinkt).
- **Gluteale Tendinopathie vs. GTPS**: Seite: «Oft wird der Überbegriff Trochanter-Schmerzsyndrom (GTPS) verwendet» (Überbegriff, nicht Synonym). Hub-Alias enthält GTPS nur als Suchhilfe; **keine** GTPS-/Trochanter-Synonymseite geplant (Guard-Zeile schliesst sie aus).
- **Metatarsalgie = Schmerzkomplex Vorfuss**: Seite nennt Morton-Neurom, Hallux valgus, Hallux rigidus als eigene Ursachen mit eigenen Seiten; FAQ «Wie unterscheidet sie sich vom Morton-Neurom?». Map: supporting_urls = diese drei Owner, keine Übernahme.
- **Tibialis-posterior-Tendinopathie vs. Fussdeformität**: Seite: «Nicht jeder Plattfuss ist eine Sehnenerkrankung, und nicht jede Tendinopathie führt zum Plattfuss»; PCFD als Verlaufsstadium benannt, nicht gleichgesetzt.
- **Vestibuläre Migräne**: Definition nach Bárány/IHS-Kriterien; Abgrenzung zu Lagerungsschwindel (Sekunden, lageabhängig), Morbus Menière (Hörsymptome) und Migräne ohne Schwindel auf der Seite und in der Meta. `/beschwerden/migraene/` bleibt Kopfschmerz-Owner (im Patch bewusst nicht angefasst, EN-Paar).
- **Vestibularisneuritis**: Labyrinthitis (zusätzlich Hörorgan) und Hörsturz (Hörverlust im Vordergrund) als eigene Bilder beschrieben, FAQ dazu; nicht als Synonym geführt, Hub-Alias enthält weder Labyrinthitis noch Hörsturz.
- **Hyperakusis**: Seite: «nicht dasselbe wie Tinnitus»; Misophonie, Phonophobie und Rekruitment als eigene Phänomene abgegrenzt. Aliasse: Geräuschüberempfindlichkeit, Lärmempfindlichkeit (keine Tinnitus-/Misophonie-Begriffe).
- **Burning-Mouth-Syndrom vs. Zungenbrennen**: Seite: «Das Körpersignal Zungenbrennen ordnet das Symptom offen ein; von einem BMS spricht man erst, wenn andere Ursachen ausgeschlossen sind.» `/koerpersignale/zungenbrennen/` behält den Symptom-Intent; Map-Notiz hält das fest; Inbound von dort nur an der bestehenden BMS-Erwähnung.
- **Akne inversa**: FAQ «Ist Akne inversa dasselbe wie gewöhnliche Akne? Nein.»; Hidradenitis suppurativa als Alias; Akne-Seite bleibt Owner der Akne vulgaris.
- **Kontaktdermatitis / dyshidrotisches Ekzem vs. Neurodermitis**: Beide Seiten grenzen sich explizit von Neurodermitis ab («nicht dasselbe wie Neurodermitis»); Neurodermitis-Akupunkturstudien werden ausdrücklich nicht übertragen. Neurodermitis-Owner unverändert.
- **Lichen sclerosus**: Seite: «nicht dasselbe wie Scheidentrockenheit in den Wechseljahren oder eine Vulvodynie»; alle Geschlechter; Kortison als Standard, keine Vermeidung.
- **Psoriasis-Arthritis**: Seite: gehört zum Formenkreis Rheuma, unterscheidet sich von der rheumatoiden Arthritis (Befallsmuster); «Die Hautseite bleibt bei der Schuppenflechte-Seite». Keine Alternative zu DMARDs.

Keine bestehende Ownership wird übertragen. Ungelöste Konflikte: keine. Die Bibliotheks-Startseite baut ihren Suchindex automatisch aus `beschwerden.ts`; die 20 Einträge sind dort enthalten.

## 5. Prüfungen

### 5A. Content-Draft vor Integration (historisch, HEAD `be2abd99`)

- `npm run build` brach in `gen-sitemap.mjs` ab (20 Slugs nicht in Keep-Liste), `health-audit` 20 × «Leaf fehlt im Hub», 0 Inbound je Seite; `check-i18n`/`test-anfrage-betreff` rot nur als Folge des abgebrochenen Builds. Dieser Zustand ist mit dem Integrationsschritt behoben und gilt nicht mehr.

### 5B. Integrierter PR-Branch (HEAD `Release-Commit (Integration + Queue-Datum, dieser Commit)`, vollständiger Build auf dem Branch, kein Test-Worktree)

- `npm run build`: grün inklusive Sitemap (822 → 842 URLs, die 20 neuen enthalten) und Worker-Bundle.
- Gates:
  - `health-audit`:   Ownership-Gate: 7 Pins, 3 Retired, 0 Fehler
  - `check-i18n`: i18n: 51 entries (41 DE⇄EN pairs, 10 EN-only) · editorial {"Approved":51} · publication published 51 / unpubli
  - `test-en-analytics`: en-analytics: 47 passed, 0 failed
  - `check-kontakt-formular`: Kontaktformular-Gate: 0 Fehler
  - `test-anfrage-betreff`: 86 PASS / 0 FAIL
  - `check-clinic-status`: Clinic-Status-Gate: 0 Fehler
  - `check-standort-ux`: Standort-UX-Gate: 0 Fehler
  - `check-first30`: FIRST-30-Gate: 0 Fehler
  - `check-professional`:  ✓ Registry ↔ Build ↔ Sitemap konsistent, Logik-Tests grün
  - `test-kontakt-formular`: 703 PASS / 0 FAIL
- Kohortenprüfung der 20 URLs gegen das Branch-dist: 20 Seiten, 0 Befunde. Geprüft: Canonical, genau 1 H1, kein noindex, kein FAQ-/Question-Schema, kein datePublished, 3 sichtbare FAQ, Quellenblock, Em-Dash/ß/Qi/Yin/Yang/Meridian, Titles eindeutig, alle internen Linkziele vorhanden, ≥ 2 Inbound aus Bestand.
- CSV-Parsing und semantische Ownership-/Alias-Prüfung (`w5semcheck.py`): Map-Zeilen gesamt 847, Guard-Zeilen gesamt 219, neue Guard-Zeilen 20; Befunde: 0.
- Bestandsänderungen (exakte Prüfung): 32 Bestandsdateien geändert; nach Entfernen der geplanten Link-Edits ist jede Datei byteidentisch mit dem Stand vor Integration (0 Rest-Differenzen, keine Fremdziele). 33 Edits = 28 neue Absätze + 5 Satzergänzungen/Link-Umhüllungen, 42 neue Links auf Welle-5-Seiten. Title, Meta, H1, Formular- und Tracking-Marker und FAQ-Blöcke der 32 Host-Seiten im Build unverändert gegenüber main.
- Overflow 320/390/1440 px, alle 20 Seiten: 68 Prüfungen, 0 Overflow, pageerrors 0 []. Screenshots: `/tmp/claude-0/-home-user-tcm-ch/7256a291-45a8-5985-b8d0-3822d9872d66/scratchpad/w5qa/shots-rel`.
- Stichprobe Bestandsabschnitte (eingefügte Absätze bei 390/1440 px gerendert, Link sichtbar, kein Overflow): /beschwerden/hallux-valgus/ → hallux-rigidus @390: sichtbar/ok; /beschwerden/hallux-valgus/ → hallux-rigidus @1440: sichtbar/ok; /beschwerden/schwindel/ → vestibularisneuritis @390: sichtbar/ok; /beschwerden/schwindel/ → vestibularisneuritis @1440: sichtbar/ok; /beschwerden/neurodermitis/ → dyshidrotisches-ekzem @390: sichtbar/ok; /beschwerden/neurodermitis/ → dyshidrotisches-ekzem @1440: sichtbar/ok; /koerpersignale/zungenbrennen/ → burning-mouth-syndrom @390: sichtbar/ok; /koerpersignale/zungenbrennen/ → burning-mouth-syndrom @1440: sichtbar/ok; /beschwerden/knieschmerzen/ → laeuferknie @390: sichtbar/ok; /beschwerden/knieschmerzen/ → laeuferknie @1440: sichtbar/ok; /beschwerden/morbus-meniere/ → vestibulaere-migraene @390: sichtbar/ok; /beschwerden/morbus-meniere/ → vestibulaere-migraene @1440: sichtbar/ok. Screenshots: `/tmp/claude-0/-home-user-tcm-ch/7256a291-45a8-5985-b8d0-3822d9872d66/scratchpad/w5qa/shots-hosts`.
- Build-Diff main `d7425f1f` → Branch (Erwartungsliste: +20 Seiten, nichts entfernt, nur Inbound-Hosts/Hub/Bibliothek/Sitemap/Keep-Liste geändert, EN/Standorte/Formulare 0): Seiten 846 → 866, hinzugefügt 20 (= die 20 URLs: ja), entfernt keine; geändert: Inbound-Hosts 32 (31 Beschwerden-Leaves + Zungenbrennen), Hub A-Z 1, Bibliothek (Startseite + 4 Regionsseiten) 5, `sitemap.xml` 1, `beschwerden-keep.js` 1; unerwartet: keine; EN: 0.
- `test-kontakt-formular`, Lauf 1 auf dem Branch-Build: 702/703, Fehler «390px Laden: Box ohne nachträgliches Auf-/Zuklappen (keine Änderung), Höhe stabil (0→963)». Analyse: Der Test hängt per MutationObserver einen ResizeObserver an die SG-Hero-Box, sobald deren Knoten im DOM erscheint; wird der Knoten beobachtet, bevor der Parser seine Kinder eingefügt und das Stylesheet gegriffen hat, meldet der ResizeObserver zuerst Höhe 0 und danach die Endhöhe 963, obwohl kein Auf-/Zuklappen stattfand (keine hidden/aria-expanded-Mutation). Es ist ein Mess-Timing des Tests, kein Verhalten der Seite; der frühere Flacker-Fall «Mint-Kachel … neutraler Rand» (702/703 im ersten integrierten Testlauf) misst analog Styles vor dem Stylesheet. Die SG-Hero-Markup-, Komponenten-, Script- und Formularquellen sind gegenüber main byteidentisch (`git diff origin/main -- src/components src/lib src/pages functions scripts public` nur `beschwerden-keep.js` und `[slug].astro`). Verlauf auf dem identischen Branch-dist (Hash 0bb81cf9664d vor und nach dem finalen Rebuild): Lauf 1 702/703 (390 px, 0→963), Lauf 2 702/703 (1440 px, 215→912), Vergleichslauf auf dem main-Baseline-Build (SG-Seite byteidentisch) 702/703 (390 px, 0→963) bei Systemlast 2,7 auf 4 Kernen ohne eigene Nebenprozesse, Lauf 3 auf dem Branch 703/703. Der Fehler ist damit auf main reproduziert und nicht dieser Änderung zuzuordnen; der grüne Lauf ist kein Nachweis einer Ursachenbehebung. Assertion und Erwartung unverändert; eine Härtung des Tests (Messung erst nach `load`) ist ein separater, nicht freigegebener Schritt. Logs: `/tmp/claude-0/-home-user-tcm-ch/7256a291-45a8-5985-b8d0-3822d9872d66/scratchpad/w5qa/rel-gate-test-kontakt-formular.log` (Lauf 3), `/tmp/claude-0/-home-user-tcm-ch/7256a291-45a8-5985-b8d0-3822d9872d66/scratchpad/w5qa/rel-gate-test-kontakt-formular.run1.log` (Lauf 1), `/tmp/claude-0/-home-user-tcm-ch/7256a291-45a8-5985-b8d0-3822d9872d66/scratchpad/w5qa/base-gate-test-kontakt-formular.log` (main).
- Formulartests gemockt (`test-kontakt-formular`, `test-anfrage-betreff`); keine echten Anfragen, Mails, Buchungen, Conversions; GTM/GA4/Ads/OneDoc nicht berührt.

## 6. Angewendete Integration (Commit nach `be2abd99`)

1. Hub A-Z `src/data/beschwerden-body.html`: 20 Zeilen alphabetisch in den bestehenden Buchstabengruppen (A: Adduktorentendinopathie, Akne inversa; B: Burning-Mouth-Syndrom; D: Dyshidrotisches Ekzem; G: Gluteale Tendinopathie; H: Hallux rigidus, Hyperakusis; K: Kontaktdermatitis; L: Läuferknie, Lichen sclerosus; M: Metatarsalgie; P: Peronealsehnen-, Proximale Hamstring-Tendinopathie, Psoriasis-Arthritis; S: Schienbeinkantensyndrom; T: TFCC-Läsion, Tibialis-posterior-Tendinopathie; V: Vestibuläre Migräne, Vestibularisneuritis; W: Wirbelgleiten (Spondylolisthese)). `data-alias` = Suchhilfe ohne Synonymanspruch.
2. Keep-Liste `public/beschwerden-keep.js`: 20 Slugs (kein 410 mehr, Sitemap über Build).
3. Keyword-Map `seo/master-keyword-url-map.csv`: 20 Zeilen (`PRIMARY_OWNER`, `condition`; `secondary_keywords` nur echte Synonyme/Schreibvarianten; `notes` nennen echte Synonyme, nicht reservierte Begriffe und Grenzen) plus PFPS-Notiz zu Läuferknie.
4. Guards `seo/do-not-create-intents.csv`: 20 Zeilen (`blocked_intent` = Keyword plus echte Synonyme; `reason` nennt die nicht reservierten verwandten Begriffe mit bestehendem Owner; keine zusätzliche Seite) plus PFPS-Zeile. Suchhilfen GTPS/Trochanter, PTTD/Knick-Senkfuss, Kontaktallergie bleiben nur in Hub-Alias/Bibliothekssuche, nicht als Synonyme oder Ownership.
5. `src/data/gesundheitsbibliothek.ts`: 20 Sucheinträge; `BODY_REGIONS.conditions` für Hüfte/Bein/Fuss (9), Schulter/Arm/Hand (TFCC), Rücken (Wirbelgleiten), Kopf & Gesicht (vestibuläre Migräne, Vestibularisneuritis, Hyperakusis, Burning-Mouth-Syndrom). Haut-/Genitalthemen wie bisher ohne Region.
6. Inbound-Links auf Bestandsseiten (Abschnitt 7).
7. `seo/index-queue.md`: 20 Zeilen unter «Offen» mit Datum 18.10.2026 (bestehender Status für veröffentlichte, zur Indexierungsprüfung offene URLs; nicht als indexiert markiert).
8. `migraene.html` bewusst nicht angefasst (DE-Quelle mit EN-Paar; Edit würde `check-i18n` F1 und ein EN-Re-Review auslösen); vestibuläre Migräne erhält ihre Inbound-Links über Morbus Menière und Schwindel.

## 7. Inbound-Nachweis

Je Zeile: Quelldatei, gerenderte URL, Modus/Anker, exakter neuer Satz bzw. Änderung, Ziel(e). Alle Edits sind im Build gerendert (Zählung unten aus dem Branch-dist, ohne Hub/Regionen/Suche und ohne Links der neuen Seiten untereinander).

| Quelldatei | URL | Modus / Anker | Neuer Satz bzw. Änderung | Ziel(e) |
|---|---|---|---|---|
| `src/data/symptom-leaves/hallux-valgus.html` | /beschwerden/hallux-valgus/ | after first <p> below: `<h2>Was steckt hinter dem Hallux valgus?</h2>` | Bleibt die Grosszehe gerade, wird aber steif und schmerzt beim Abrollen, spricht man von einem Hallux rigidus, einer Arthrose des Grosszehengrundgelenks. Druckschmerz unter den mittleren Mittelfussköpfchen, der durch die Fehlstellung entstehen kann, beschreiben wir unter Metatarsalgie. | hallux-rigidus, metatarsalgie |
| `src/data/symptom-leaves/gicht.html` | /beschwerden/gicht/ | after first <p> below: `<h2>Häufige Symptome</h2>` | Ein dauerhaft steifes Grosszehengrundgelenk, das beim Abrollen schmerzt, ohne akute Anfälle spricht eher für einen Hallux rigidus als für Gicht. | hallux-rigidus |
| `src/data/symptom-leaves/morton-neurom.html` | /beschwerden/morton-neurom/ | after element containing: `<strong>Spreizfuss.</strong>` | Drückt und brennt es breitflächig unter dem Vorfussballen statt zwischen zwei Zehen, ist meist eine Metatarsalgie die Ursache. | metatarsalgie |
| `src/data/symptom-leaves/knieschmerzen.html` | /beschwerden/knieschmerzen/ | replace: `Läuferknie – Schmerz aussen am Knie` | Läuferknie – Schmerz aussen am Knie | laeuferknie |
| `src/data/symptom-leaves/patellaspitzensyndrom.html` | /beschwerden/patellaspitzensyndrom/ | after first <p> below: `<h2>Was ist das Patellaspitzensyndrom?</h2>` | Sitzt der Schmerz nicht an der Kniescheibenspitze, sondern aussen am Knie und tritt vor allem beim Laufen auf, ist eher ein Läuferknie (Iliotibialband-Syndrom) die Ursache. | laeuferknie |
| `src/data/symptom-leaves/wadenschmerzen.html` | /beschwerden/wadenschmerzen/ | after element containing: `<strong>Überlastung und Belastungswechsel.</strong>` | Schmerzt es nicht in der Wade, sondern entlang der inneren Schienbeinkante, steckt oft ein Schienbeinkantensyndrom dahinter. | schienbeinkantensyndrom |
| `src/data/symptom-leaves/achillessehnenentzuendung.html` | /beschwerden/achillessehnenentzuendung/ | after element containing: `Betroffen sind längst nicht nur Läuferinnen und Läufer.` | Belastungsschmerz an der inneren Schienbeinkante statt an der Sehne ordnen wir unter Schienbeinkantensyndrom ein, Schmerz seitlich hinter dem Aussenknöchel unter Peronealsehnen-Tendinopathie. | peronealsehnen-tendinopathie, schienbeinkantensyndrom |
| `src/data/symptom-leaves/hueftschmerzen.html` | /beschwerden/hueftschmerzen/ | after element containing: `Die Hüfte trägt bei jedem Schritt ein Mehrfaches des Körpergewichts` | Schmerz aussen an der Hüfte, der beim Seitenliegen und Treppensteigen zunimmt, ist typisch für eine gluteale Tendinopathie. Leistenschmerz, der von den Sehnen der Oberschenkelinnenseite ausgeht, ordnen wir unter Adduktorentendinopathie ein. | adduktorentendinopathie, gluteale-tendinopathie |
| `src/data/symptom-leaves/koxarthrose.html` | /beschwerden/koxarthrose/ | after element containing: `Nicht jeder Hüftschmerz ist Arthrose` | Die gereizten Sehnen am grossen Rollhügel beschreiben wir unter gluteale Tendinopathie. Leistenschmerz bei Sportlerinnen und Sportlern mit Druckschmerz am Schambein kann auch von den Adduktorensehnen kommen (Adduktorentendinopathie). | adduktorentendinopathie, gluteale-tendinopathie |
| `src/data/symptom-leaves/sehnenscheidenentzuendung.html` | /beschwerden/sehnenscheidenentzuendung/ | after element containing: `Sehnen gleiten in Hüllen, den Sehnenscheiden.` | Schmerz an der Kleinfingerseite des Handgelenks nach einem Sturz oder beim Drehen ist eher ein Hinweis auf eine TFCC-Läsion als auf eine Sehnenscheidenentzündung. | tfcc-laesion |
| `src/data/symptom-leaves/rhizarthrose.html` | /beschwerden/rhizarthrose/ | after element containing: `Das Daumensattelgelenk an der Daumenwurzel` | Schmerzt nicht die Daumenseite, sondern die Kleinfingerseite des Handgelenks, kommt eine TFCC-Läsion in Frage. | tfcc-laesion |
| `src/data/symptom-leaves/piriformis-syndrom.html` | /beschwerden/piriformis-syndrom/ | after element containing: `<strong>Langes Sitzen.</strong>` | Sitzt der Schmerz direkt am Sitzbeinhöcker und nimmt auf harten Sitzflächen und beim Laufen zu, kann auch eine proximale Hamstring-Tendinopathie dahinterstecken. | proximale-hamstring-tendinopathie |
| `src/data/symptom-leaves/ischias.html` | /beschwerden/ischias/ | after element containing: `<strong>Verspannte Gesässmuskulatur.</strong>` | Ein tiefer Schmerz am Sitzbeinhöcker ohne Ausstrahlung bis in den Fuss spricht eher für eine proximale Hamstring-Tendinopathie. | proximale-hamstring-tendinopathie |
| `src/data/symptom-leaves/sprunggelenkschmerzen.html` | /beschwerden/sprunggelenkschmerzen/ | after first <p> below: `<h2>Häufige Auslöser</h2>` | Schmerz hinter dem Aussenknöchel nach Umknicken, manchmal mit Schnappen, weist auf die Peronealsehnen hin (Peronealsehnen-Tendinopathie). Schmerz am Innenknöchel mit absinkendem Fussgewölbe spricht für eine Tibialis-posterior-Tendinopathie. | peronealsehnen-tendinopathie, tibialis-posterior-tendinopathie |
| `src/data/symptom-leaves/plantarfasziitis.html` | /beschwerden/plantarfasziitis/ | after element containing: `Die Plantarfaszie ist eine kräftige Sehnenplatte` | Schmerzt es nicht an der Ferse, sondern hinter dem Innenknöchel, und sinkt das Fussgewölbe ab, kommt eine Tibialis-posterior-Tendinopathie in Frage. | tibialis-posterior-tendinopathie |
| `src/data/symptom-leaves/spondylose.html` | /beschwerden/spondylose/ | after element containing: `Spondylose beschreibt degenerative Veränderungen der Wirbelsäule` | Verschiebt sich ein Wirbel gegenüber dem darunterliegenden nach vorne, spricht man von Wirbelgleiten (Spondylolisthese). | spondylolisthese |
| `src/data/symptom-leaves/spinalkanalstenose.html` | /beschwerden/spinalkanalstenose/ | after element containing: `Der Wirbelkanal beherbergt Rückenmark und Nervenwurzeln.` | Auch ein nach vorne gleitender Wirbel (Spondylolisthese) kann den Kanal einengen. | spondylolisthese |
| `src/data/symptom-leaves/schuppenflechte.html` | /beschwerden/schuppenflechte/ | replace: `(Verdacht auf Psoriasis-Arthritis, hier zählt Zeit)` | (Verdacht auf Psoriasis-Arthritis, hier zählt Zeit) | psoriasis-arthritis |
| `src/data/symptom-leaves/rheumatoide-arthritis.html` | /beschwerden/rheumatoide-arthritis/ | after first <p> below: `<h2>Was ist rheumatoide Arthritis?</h2>` | Treten Gelenkbeschwerden zusammen mit Schuppenflechte oder Nagelveränderungen auf, kommt eine Psoriasis-Arthritis in Frage, die rheumatologisch abgegrenzt wird. | psoriasis-arthritis |
| `src/data/symptom-leaves/neurodermitis.html` | /beschwerden/neurodermitis/ | after first <p> below: `<h2>Was ist Neurodermitis?</h2>` | Juckende Bläschen an Handflächen, Fingerseiten und Fusssohlen in Schüben sind typisch für das dyshidrotische Ekzem, ein Ekzem genau an der Kontaktstelle mit einem Stoff für die Kontaktdermatitis. Schmerzhafte Knoten und Abszesse in Achseln oder Leisten sind kein Ekzem, sondern Zeichen einer Akne inversa. | akne-inversa, dyshidrotisches-ekzem, kontaktdermatitis |
| `src/data/symptom-leaves/schuppenflechte.html` | /beschwerden/schuppenflechte/ | after first <p> below: `<h2>Was steckt hinter Schuppenflechte?</h2>` | Kleine, stark juckende Bläschen an Händen und Füssen gehören eher zum dyshidrotischen Ekzem als zur Schuppenflechte; die Abgrenzung trifft die Dermatologie. | dyshidrotisches-ekzem |
| `src/data/symptom-leaves/seborrhoisches-ekzem.html` | /beschwerden/seborrhoisches-ekzem/ | after first <p> below: `<h2>Abgrenzung</h2>` | Tritt das Ekzem genau dort auf, wo die Haut mit einem bestimmten Stoff in Berührung kommt, etwa durch Kosmetik oder Schmuck, spricht das für eine Kontaktdermatitis. | kontaktdermatitis |
| `src/data/symptom-leaves/akne.html` | /beschwerden/akne/ | after first <p> below: `<h2>Was steckt hinter Akne?</h2>` | Tiefe, schmerzhafte Knoten und Abszesse in Achseln, Leisten oder Gesässfalte sind keine gewöhnliche Akne, sondern Zeichen einer Akne inversa (Hidradenitis suppurativa). | akne-inversa |
| `src/data/symptom-leaves/vulvodynie.html` | /beschwerden/vulvodynie/ | after first <p> below: `<h2>Andere Ursachen ausschliessen</h2>` | Weisse, verdünnte oder rissige Haut mit Juckreiz spricht für einen Lichen sclerosus, der eine eigene Behandlung braucht. | lichen-sclerosus |
| `src/data/symptom-leaves/scheidentrockenheit.html` | /beschwerden/scheidentrockenheit/ | after element containing: `<h2>Wann ärztlich abklären?</h2><p>Bei anhaltenden Schmerzen, Blutungen, Hautveränderungen` | Weissliche, juckende Hautveränderungen an Vulva oder Damm können auf einen Lichen sclerosus hinweisen. | lichen-sclerosus |
| `src/data/symptom-leaves/morbus-meniere.html` | /beschwerden/morbus-meniere/ | replace: `Kreislaufprobleme oder vestibuläre Migräne.` | Kreislaufprobleme oder vestibuläre Migräne. Ein einmaliger, tagelanger Drehschwindel ohne Hörverlust spricht eher für eine Ve | vestibulaere-migraene, vestibularisneuritis |
| `src/data/symptom-leaves/schwindel.html` | /beschwerden/schwindel/ | replace: `Lagerungsschwindel, Gleichgewichtsnerv-Entzündung oder Morbus Menière gehören in HNO-Behan` | Lagerungsschwindel, Gleichgewichtsnerv-Entzündung (Vestibularisneuritis) oder Morbus Menière gehören in HNO-Behandlung, TCM kann danach begleiten. Schwindelattacken mit Mi | vestibulaere-migraene, vestibularisneuritis |
| `src/data/symptom-leaves/lagerungsschwindel.html` | /beschwerden/lagerungsschwindel/ | after first <p> below: `<h2>Was ist Lagerungsschwindel?</h2>` | Hält Drehschwindel dagegen über Tage an und hängt nicht von der Lage ab, ist eher eine Vestibularisneuritis die Ursache. | vestibularisneuritis |
| `src/data/symptom-leaves/tinnitus.html` | /beschwerden/tinnitus/ | after element containing: `Tinnitus bezeichnet die Wahrnehmung von Geräuschen` | Wirken Alltagsgeräusche unerträglich laut oder schmerzhaft, liegt eine Hyperakusis vor, die häufig gemeinsam mit Tinnitus auftritt. | hyperakusis |
| `src/data/symptom-leaves/hoersturz.html` | /beschwerden/hoersturz/ | after element containing: `<strong>Tinnitus.</strong> Ohrgeräusche begleiten viele Hörstürze` | Manche Betroffene erleben nach einem Hörsturz zudem eine Hyperakusis, eine schmerzhafte Überempfindlichkeit gegenüber Alltagsgeräuschen. | hyperakusis |
| `src/data/koerpersignale.ts` | /koerpersignale/zungenbrennen/ | replace: `sprechen Fachleute vom Burning-Mouth-Syndrom:` | sprechen Fachleute vom Burning-Mouth-Syndrom: | burning-mouth-syndrom |
| `src/data/symptom-leaves/eisenmangel.html` | /beschwerden/eisenmangel/ | after first <p> below: `<h2>Häufige Symptome</h2>` | Ein Brennen im Mund bei unauffälliger Schleimhaut kann auf Eisenmangel zurückgehen; bleibt es nach dem Ausgleich bestehen, wird ein Burning-Mouth-Syndrom abgeklärt. | burning-mouth-syndrom |
| `src/data/symptom-leaves/wechseljahre.html` | /beschwerden/wechseljahre/ | after element containing: `Manche Begleiter dieser Lebensphase wirken zunächst rätselhaft` | Hält das Brennen im Mund über Monate an, ohne dass die Schleimhaut verändert ist, spricht man von einem Burning-Mouth-Syndrom. | burning-mouth-syndrom |

Gerenderte Inbound-Links aus Bestandsseiten je neuer URL (Branch-dist):

- /beschwerden/hallux-rigidus/: 2 (/beschwerden/gicht/, /beschwerden/hallux-valgus/)
- /beschwerden/laeuferknie/: 2 (/beschwerden/knieschmerzen/, /beschwerden/patellaspitzensyndrom/)
- /beschwerden/schienbeinkantensyndrom/: 2 (/beschwerden/achillessehnenentzuendung/, /beschwerden/wadenschmerzen/)
- /beschwerden/gluteale-tendinopathie/: 2 (/beschwerden/hueftschmerzen/, /beschwerden/koxarthrose/)
- /beschwerden/tfcc-laesion/: 2 (/beschwerden/rhizarthrose/, /beschwerden/sehnenscheidenentzuendung/)
- /beschwerden/proximale-hamstring-tendinopathie/: 2 (/beschwerden/ischias/, /beschwerden/piriformis-syndrom/)
- /beschwerden/adduktorentendinopathie/: 2 (/beschwerden/hueftschmerzen/, /beschwerden/koxarthrose/)
- /beschwerden/peronealsehnen-tendinopathie/: 2 (/beschwerden/achillessehnenentzuendung/, /beschwerden/sprunggelenkschmerzen/)
- /beschwerden/tibialis-posterior-tendinopathie/: 2 (/beschwerden/plantarfasziitis/, /beschwerden/sprunggelenkschmerzen/)
- /beschwerden/metatarsalgie/: 2 (/beschwerden/hallux-valgus/, /beschwerden/morton-neurom/)
- /beschwerden/spondylolisthese/: 2 (/beschwerden/spinalkanalstenose/, /beschwerden/spondylose/)
- /beschwerden/psoriasis-arthritis/: 2 (/beschwerden/rheumatoide-arthritis/, /beschwerden/schuppenflechte/)
- /beschwerden/dyshidrotisches-ekzem/: 2 (/beschwerden/neurodermitis/, /beschwerden/schuppenflechte/)
- /beschwerden/kontaktdermatitis/: 2 (/beschwerden/neurodermitis/, /beschwerden/seborrhoisches-ekzem/)
- /beschwerden/akne-inversa/: 2 (/beschwerden/akne/, /beschwerden/neurodermitis/)
- /beschwerden/lichen-sclerosus/: 2 (/beschwerden/scheidentrockenheit/, /beschwerden/vulvodynie/)
- /beschwerden/vestibulaere-migraene/: 2 (/beschwerden/morbus-meniere/, /beschwerden/schwindel/)
- /beschwerden/vestibularisneuritis/: 3 (/beschwerden/lagerungsschwindel/, /beschwerden/morbus-meniere/, /beschwerden/schwindel/)
- /beschwerden/hyperakusis/: 2 (/beschwerden/hoersturz/, /beschwerden/tinnitus/)
- /beschwerden/burning-mouth-syndrom/: 3 (/beschwerden/eisenmangel/, /beschwerden/wechseljahre/, /koerpersignale/zungenbrennen/)

## 8. Review-Korrekturen (PR #71, 18.10.2026)

| Seite/Datei | bisherige Aussage | geprüfte Quelle (tatsächlich gelesen) | Korrektur | verbleibende Unsicherheit |
|---|---|---|---|---|
| /beschwerden/spondylolisthese/ | «Veröffentlicht sind bisher nur Studienprotokolle ohne Ergebnisse (Lee 2014, Kim 2018).» | Kim 2026, Mayo Clin Proc, PMID 41176728 (Abstract via PubMed/Europe PMC; Volltext paywalled, 403); Wang 2021, PMID 34336382 (Volltext PMC8310871 gelesen); Europe PMC/PubMed: keine Korrektur, keine Rücknahme | Satz entfernt. Neu: Paket-Studie (Chuna + Akupunktur + Schulung vs. Standardversorgung, 115 randomisiert/112 mITT, Rücken -10,27 und Bein -11,91 VAS-Punkte zugunsten des Pakets, kein Unterschied bei ODI/EQ-5D/Gehstrecke; ohne Scheinbehandlung und ohne Akupunktur-allein-Arm nicht der Akupunktur zuschreibbar) und Add-on-Studie (Akupunktur + Nervenblockade vs. Nervenblockade, 70 Personen, bis Tag 7, nicht verblindet, lückenhaft berichtet). Quellenblock: Protokolle ersetzt durch beide Studien. | Kim 2026: Messzeitpunkt der berichteten Differenzen und Verlauf über 102 Wochen nur aus dem Abstract, daher nicht auf der Seite. Wang 2021: Abstract nennt 70 je Gruppe und vertauscht die Gruppenbezeichnungen; Methodik nennt 35 je Gruppe; Seite nennt nur die Gesamtzahl 70. |
| Integration (Map, Guards, Hub-Alias, Suche) | Alias-Bags als «Synonyme» in Guards; GTPS/Trochanterschmerzsyndrom, Spondylolyse, Bursitis trochanterica, Sportlerleiste, Adduktorenzerrung, Handekzem, Zungenbrennen u. a. als secondary_keywords/Synonyme | Eigene Prüfung aller 20 Zeilen gegen die Seitentexte und die bestehenden Owner | Neue Felder «echte Synonyme» und «nicht reserviert»; Map-`secondary_keywords` nur Synonyme/Schreibvarianten; Guards nennen die nicht reservierten Begriffe mit Owner; Suchhilfen bereinigt (Abschnitt 6, Punkt 4); automatische Prüfung `w5semcheck.py` | Suchhilfen (GTPS, PTTD/Knick-Senkfuss, Kontaktallergie) bleiben zur Auffindbarkeit, ohne Ownership-Anspruch; wenn das Team sie nicht will, Zeilen kürzen. |
| /beschwerden/vestibulaere-migraene/ (FAQ) | «Für die Diagnose reicht es, wenn mindestens die Hälfte der Schwindelepisoden mit Migränezeichen … einhergeht und eine Migräne in der Vorgeschichte besteht.» | ICHD-3 A1.6.6 (ichd-3.org, gelesen); Lempert 2022, PMID 34719447 | FAQ neu: Kopfschmerz nicht bei jeder Episode nötig; Diagnose aus mehreren Kriterien zusammen (≥5 Episoden, 5 Min bis 72 h, mindestens mittelschwer, Migräne-Vorgeschichte, Migränezeichen bei ≥ der Hälfte, keine bessere andere Erklärung), ärztliche Einordnung. Haupttext nannte die Kriterien bereits vollständig; jetzt widerspruchsfrei. | keine |
| /beschwerden/burning-mouth-syndrom/ | «weniger Schmerz unter echter als unter Schein-Akupunktur, vor allem abends … ohne Langzeitdaten» | Sato 2026, PMID 41566026, DOI 10.1007/s00405-025-10001-1: Springer-Seite zeigt nur Abstract («preview of subscription content»), Volltext nicht zugänglich; Europe PMC: keine Korrektur | Zwischen-Gruppen-Vergleich und «ohne Langzeitdaten» entfernt; Seite nennt nur die im Abstract berichtete deutliche Schmerzabnahme in der Verum-Gruppe (40 Personen, 10 Sitzungen, Scheinkontrolle), klein, kein belastbarer Nachweis. | Zwischen-Gruppen-Statistik, Endpunktdefinition, Effektgrösse und Nachbeobachtung unbekannt (Volltext nicht gelesen). |
| 16 Seiten, Abschnitt «Kann TCM ergänzend helfen?» | «Zur Akupunktur bei X gibt es keine aussagekräftigen Studien.» | PubMed-Suche (Abschnitt 3) mit dokumentierten Grenzen | «… haben wir keine aussagekräftigen Studien gefunden.» (Rechercheergebnis statt Existenzaussage) | Suche nur PubMed/englisch; weitere Studien ausserhalb möglich. |

## 9. Release-Schritte und Nicht-gemacht

- Nach dem Merge: Live-Check der 20 URLs (200, Canonical, Title, Indexierbarkeit, H1, FAQ, Quellen), Sitemap, Hub- und Inbound-Verlinkung, 390/1440 px; Ergebnis im PR. GSC-Einreichung über die tägliche Queue (bis 10 URLs/Tag).
- Keine Umschreibung bestehender Artikel, keine neuen Wirkbehauptungen auf Bestandsseiten, keine Title-/Meta-/H1-/Layout-/Formularänderungen; GTM, GA4, Ads, OneDoc, EN unverändert.
- Keine echten Anfragen, Mails, Buchungen, Conversions. Keine Gates abgeschwächt. Kein Amend, kein Force-Push. Merge mit normalem Merge-Commit auf den geprüften HEAD.
