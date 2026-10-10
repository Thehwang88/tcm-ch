# Qualitätsplan Beschwerden Cohort 20 (10 Seiten, live seit 04.10.2026)

Grundlage: `seo/gsc-not-indexed-audit-2026-10-10.md`. Alle 10 Seiten wurden 05./06.10. gecrawlt und
**nicht indexiert**. Dieser Plan ändert keine Inhalte; er legt fest, was redaktionell und medizinisch
geprüft und ergänzt werden soll. Ziel ist nicht mehr Text, sondern eine Seite, die eine Suchanfrage
besser beantwortet als das, was Google schon kennt.

Quelle der Seiten: `src/data/symptom-leaves/<slug>.html` (Commit 7b604c3, "extern geliefertes Copy").

## Befund (gemessen am Build)

| Seite | Eigene Wörter | Template-Anteil | Eigene H2-Abschnitte | Quellen | Nächste Geschwisterseite |
|---|---|---|---|---|---|
| funktionelle-dyspepsie | 258 | ~71 % | 3 (+FAQ) | keine | gastroparese, gastritis |
| adenomyose | 431 | ~60 % | 5 (+FAQ) | keine | endometriose, myome |
| interstitielle-zystitis | 221 | ~74 % | 3 | keine | reizblase |
| vulvodynie | 211 | ~75 % | 4 | keine | vaginismus, dyspareunie |
| dyspareunie | 235 | ~73 % | 3 | keine | vulvodynie, vaginismus |
| vaginismus | 207 | ~76 % | 3 | keine | dyspareunie, vulvodynie |
| gastroparese | 219 | ~75 % | 3 | keine | funktionelle-dyspepsie |
| costochondritis | 306 | ~68 % | 4 | keine | /koerpersignale/druck-auf-der-brust/ |
| divertikulitis | 254 | ~72 % | 4 | keine | verdauungsprobleme |
| zoeliakie | 243 | ~72 % | 4 | keine | eisenmangel, blaehungen |

Median eigene Wörter /beschwerden/: 821. Der Ton ist medizinisch vorsichtig und korrekt eingeordnet
(Red Flags, "ersetzt keine Abklärung"). Das Problem ist Tiefe, nicht Haltung: jeder Abschnitt hat
1 bis 2 Sätze, und der Rest der Seite ist identisch mit 150 anderen.

### Template-Fehler (bestätigt, betreffen auch andere Seiten)

| Fehler | Cohort 20 | Sitewide /beschwerden/ | Problem |
|---|---|---|---|
| Therapie-Karte "Kräutertherapie – laufend ans **Hautbild** angepasst" | adenomyose, funktionelle-dyspepsie | 7 (davon 5 ohne Hautbezug: + fruktoseintoleranz, laktoseintoleranz, sibo) | sachlich falsch im Kontext |
| Therapie-Karte "Moxibustion – stärkt **Immunsystem und Qi**" | adenomyose | 25 | verstösst gegen CLAUDE.md (kein Qi ausserhalb /tcm-verstehen/) und ist ein unbelegtes Wirkversprechen |
| Kosten-Info doppelt (Abschnitt "Kosten und Krankenkasse" + FAQ "Was kostet die Behandlung") | alle 10 | 128 | Wiederholung, verwässert Eigenanteil |
| Regionalblock "Wohnst du in …" (5 Städte, ~260 Wörter) | alle 10 | 59 | identischer Text, kein Bezug zur Beschwerde |

Empfehlung: die beiden Kartentexte korrigieren (eigener, kleiner Commit zur Freigabe; 28 live Seiten,
der Text steht je Leaf-Datei in `src/data/symptom-leaves/`, nicht zentral). Kosten-Dublette und Regionalblock nur auf den Pilotseiten testweise reduzieren und den
Effekt messen, bevor die Vorlage angefasst wird.

## Prüfraster je Seite

1. **Suchintention:** Was will jemand, der den Begriff sucht? (Diagnose verstehen, Abgrenzung,
   Behandlungsoptionen, Alltag.) Deckt die Seite die zwei, drei Hauptfragen vollständig ab?
2. **Medizinische Eigenständigkeit:** Was steht hier, das auf der Geschwisterseite nicht steht?
   Diagnostikweg, Differenzialdiagnosen, schulmedizinische Standardtherapie, Verlauf.
3. **Evidenz:** Jede Aussage zur Wirkung von Akupunktur/TCM braucht eine prüfbare Quelle oder wird
   als "wenig untersucht" benannt. Evidenz zu einer verwandten Indikation (z. B. primäre Dysmenorrhoe)
   nicht auf die Erkrankung übertragen.
4. **Patientennutzen:** Konkrete nächste Schritte (wohin zur Abklärung, was mitbringen, woran man
   Fortschritt misst, wann abbrechen). Ablauf einer Begleitung bei TCM.ch ehrlich beschreiben.
5. **YMYL/Voice:** keine Heilversprechen, kein Qi/Yin-Yang/Meridiane, Du-Form, Red Flags spezifisch
   statt generisch, ärztliche Review mit Name/Fachrichtung, Quellenliste sichtbar.

## Pilotseiten (P1)

### Funktionelle Dyspepsie (Reizmagen)
- **Intention:** "Magen spiegeln war unauffällig, trotzdem Beschwerden: was ist das, was hilft?"
  Owner laut Master-Map: "funktionelle dyspepsie (reizmagen)", sekundär "reizmagen".
- **Fehlt (zu prüfen und zu belegen):**
  - Diagnosekriterien und Subtypen (Rom-IV: postprandiales Distress-Syndrom vs. epigastrisches
    Schmerzsyndrom), wann eine Magenspiegelung nötig ist, Rolle des H.-pylori-Tests.
  - Abgrenzung zu Gastritis, Reflux und **Gastroparese** (gleiche Leitsymptome; beide Seiten müssen
    sich gegenseitig klar abgrenzen und verlinken).
  - Schulmedizinische Optionen nach aktueller Leitlinie (vom Reviewer zu bestätigen).
  - Evidenzlage Akupunktur: Kandidat RCT zu postprandialem Distress-Syndrom (Ann Intern Med 2020);
    vor Verwendung bibliografisch verifizieren und Aussage auf den Subtyp begrenzen.
  - Patientennutzen: Symptom-/Esstagebuch, Essrhythmus, wann wiederkommen, Erfolgskriterium nach
    4 bis 6 Sitzungen.
- **Korrigieren:** Kräuterkarte ("Hautbild"), Kosten-Dublette.
- **Links:** /koerpersignale/voellegefuehl-nach-dem-essen/, /beschwerden/gastroparese/,
  /beschwerden/reizdarm/ (Overlap-Syndrom).
- **Review:** Gastroenterologie.

### Adenomyose
- **Intention:** "Adenomyose: was ist das, Unterschied zu Endometriose, was hilft gegen Schmerzen
  und Blutungen, Kinderwunsch?" Owner "adenomyose", sekundär "adenomyose oder endometriose".
- **Stark:** Abgrenzung zu Endometriose, Diagnostikweg, Red Flags, ehrliche TCM-Rolle.
- **Fehlt (zu prüfen und zu belegen):**
  - Schulmedizinische Optionen (hormonell, Schmerzmittel, operativ) mit Hinweis, dass die Wahl von
    Beschwerden und Kinderwunsch abhängt.
  - Kinderwunsch-Abschnitt mit Link /beschwerden/kinderwunsch/ (kommerziell relevantester Kontext,
    nur ohne Erfolgsversprechen).
  - Eisenmangel bei starker Blutung: Link /beschwerden/eisenmangel/ und
    /gesundheitsbibliothek/befunde-werte/ferritin-zu-niedrig/.
  - Evidenz: Akupunkturdaten existieren vor allem zur **primären** Dysmenorrhoe; Adenomyose verursacht
    sekundäre Dysmenorrhoe. Genau so benennen, nicht übertragen.
- **Korrigieren:** Kräuterkarte ("Hautbild"), Moxa-Karte ("Immunsystem und Qi"), Kosten-Dublette.
- **Links:** /beschwerden/endometriose/, /beschwerden/myome/.
- **Review:** Gynäkologie.

## Übrige Seiten

| Prio | Seite | Intention / Eigenständigkeit | Evidenz- und YMYL-Punkte | Abgrenzung / Links |
|---|---|---|---|---|
| P2 | interstitielle-zystitis | Blasenschmerzsyndrom als Ausschlussdiagnose erklären: Abklärungsschritte (Urin, Zystoskopie), Trigger, Beckenboden | Akupunktur nur als Schmerzbegleitung; Datenlage klein, so benennen | /beschwerden/reizblase/, /beschwerden/blasenentzuendung/, /koerpersignale/haeufiger-harndrang-nachts/ |
| P2 | vulvodynie | Diagnose (Wattestäbchen-Test, Ausschluss), Subtypen (provoziert/spontan), multimodale Therapie | Sensibles Thema: Ton prüfen, keine Psychologisierung | Gyn-Dreier gegeneinander abgrenzen: je eigene Leitfrage |
| P2 | dyspareunie | Symptom-Seite als **Verteiler**: Ursachen nach Schmerzort (Eingang vs. tief) und Weg zur Abklärung | Keine Therapieaussage ohne geklärte Ursache | verweist auf vulvodynie, vaginismus, endometriose, adenomyose |
| P2 | vaginismus | Beckenboden-Physiotherapie, Dilatoren, Sexualtherapie als Kern | Akupunktur nur als Entspannungsbaustein, so benennen | Abgrenzung zu vulvodynie (Muskel vs. Nerv/Schleimhaut) |
| P3 | gastroparese | Ursachen (Diabetes, Medikamente wie GLP-1, nach OP), Diagnostik (Magenentleerungsszintigrafie) | Medikamenten-Anamnese betonen; Link /gesundheitsbibliothek/untersuchungen/szintigrafie/ | klare Abgrenzung zu funktioneller Dyspepsie |
| P3 | costochondritis | Abgrenzung zu Tietze-Syndrom, Verlauf, Selbsthilfe | Brustschmerz-Red-Flags spezifisch und oben (kardial, Lungenembolie) | /koerpersignale/druck-auf-der-brust/ (verlinkt), /beschwerden/interkostalneuralgie/ |
| P3 | divertikulitis | Divertikulose vs. Divertikulitis, Akut vs. Intervall, Ernährung nach aktueller Evidenz | TCM ausdrücklich erst nach Akutphase (bereits gut); keine Ernährungsmythen | /beschwerden/verstopfung/ |
| P3 | zoeliakie | Diagnostik (Serologie unter Glutenbelastung, Biopsie), Alltag glutenfrei | **Hohes Risiko**: TCM behandelt Zöliakie nicht. Master-Map-Sekundär "glutenunverträglichkeit" prüfen (breiter Begriff, nicht gleich Zöliakie) | /beschwerden/eisenmangel/; ggf. Zöliakie bewusst ohne TCM-Funnel führen |

## Ablauf

1. Kartentexte korrigieren (28 Seiten, eigener Commit, Freigabe).
2. Pilot: Funktionelle Dyspepsie und Adenomyose nach Raster überarbeiten, ärztlich reviewen,
   Quellen sichtbar, Kosten-Dublette und Regionalblock auf diesen zwei Seiten reduzieren.
3. Nach Deploy: Indexierung beantragen (Queue oben), 3 bis 4 Wochen beobachten
   (GSC-URL-Prüfung, Impressionen).
4. Wenn indexiert: Raster auf P2 (Gyn-Dreier + Zystitis), dann P3 übertragen.
   Wenn nicht: Ursache vor dem Rollout neu bewerten (z. B. Konsolidierung des Gyn-Dreiers prüfen).

Erfolgskriterium ist der Indexierungsstatus und die Antwortqualität, nicht die Wortzahl.
"Eigene Wörter" ist nur ein Messwert, um Template-Anteile sichtbar zu machen.
