# Daily SEO Cohort 2026-09-27 — Diversifikation (Was jetzt? / Untersuchungen / Fragen)

Kontext: GSC settled bis 25.09 (787 Klicks/28d, Ø-Pos. ~20.6). Befunde indexieren gemischt/langsam → Kohorte bewusst OHNE Befunde, in schnell akzeptierte Cluster: Was jetzt? (erste 10 praktisch vollständig indexiert), Untersuchungen (Hub+NLG+EKG+grosses Blutbild indexiert), Fragen.

## Ergebnis: 12/12 sauber publiziert

**Was jetzt? (4)** — alle als reine Action-Owner, KS bleibt Ursachen-Owner:
- /gesundheitsbibliothek/was-jetzt/wadenkraempfe-nachts/ (Same-Slug-Paar; ersetzt den konservativen Block vom 26.09 nach explizitem Action-Briefing; kein Magnesium-Default, Befund-Owner unverändert)
- /gesundheitsbibliothek/was-jetzt/globusgefuehl/
- /gesundheitsbibliothek/was-jetzt/raeusperzwang/ (Kandidaten-Slug „raeuspzwang" war Tippfehler → korrigiert)
- /gesundheitsbibliothek/was-jetzt/trockener-mund-nachts/ (Same-Slug-Paar)

**Untersuchungen (6)** — B1-B4 + Reserven U1/U3, da alle 5 D-Kandidaten geblockt:
- ultraschall/ (Abgrenzung /haut/ultherapy-hifu/ explizit), roentgen/, gastroskopie/, koloskopie/, ct/ (Reserve U1), lungenfunktion/ (Reserve U3)
- Keine Abführ-/Nüchternheits-Dosierschemata; Strahlung proportional; TCM nur als kurzer After-Abklärung-Absatz.

**Patientenfragen (2)**: duschen-nach-akupunktur/ (schwimmen-Seite behält Schwimmbad/Baden/Sauna), kaffee-nach-akupunktur/ (kein „Koffein löscht Wirkung"-Mythos).

## BLOCKED (mit Grund)
| Kandidat | Grund |
|---|---|
| D1 Ohrdruck nach Erkältung | /koerpersignale/ohr-einseitig-verstopft/ + druck-auf-den-ohren + dumpfes-gefuehl-im-ohr besitzen das Terrain; kein separierter SERP-Intent. |
| D2 Taube Finger nachts | finger-schlafen-ein + arm-schlaeft-nachts-ein + einzelne-finger-taub + /beschwerden/karpaltunnelsyndrom/ decken das nächtliche Muster; hohes Kannibalisierungsrisiko. |
| D3 Druck hinter Brustbein nach Essen | Kardial-adjazent (YMYL, medical-first-Regel wie bei Herzstolpern-Action); benigner Anteil gehört sodbrennen/druck-im-oberbauch/magendruck-im-liegen. |
| D4 Kribbeln beide Hände nachts | Gleiches Nerv-Cluster wie D2; kein distinkter bilateraler Intent belegbar. |
| D5 Ohrgeräusch beim Gähnen/Schlucken | ohr-knackt-beim-schlucken + tinnitus decken den Intent. |
| U2 Schilddrüsen-Ultraschall | Vorerst Teilaspekt der neuen Ultraschall-Seite; Standalone erst bei Suchsignal. |
| U4 Belastungs-EKG | EKG-Seite erwähnt Belastungs-EKG als Folgeuntersuchung; kein eigener Owner nötig (Langzeit-EKG-Regel analog). |
| R1-R4 | Nicht benötigt (12 ohne sie erreicht); R3 zusätzlich: KS rankt bereits für Action-Varianten. |

## Interne Links
- Inbound (10): 4 KS→Was-jetzt (wadenkraempfe-nachts, klossgefuehl-im-hals, staendiger-raeusperzwang, trockener-mund-nachts), 4 KS→Untersuchungen (druck-im-oberbauch→Gastroskopie, durchfall-am-morgen→Koloskopie, harter-oberbauch-ohne-schmerzen→Ultraschall, trockener-husten→Lungenfunktion), 2 Fragen-Hub-Kurzantworten→Duschen/Kaffee; plus MRT-Seite→CT/Röntgen/Ultraschall.
- Hubs: Untersuchungen-Hub 4→10 Karten; Was-jetzt-Hub + Fragen-Hub automatisch; Suchindex 339→351 (DIAGNOSTICS-hrefs + Auto-Loops).
- Jede neue Seite: 3-6 kontextuelle Owner-/Therapie-Links, 0 kaputte Links (dist-verifiziert).

## CTR-Optimierungen (nur Title/Meta, Owner-Intent unverändert)
1. ohr-knackt-beim-schlucken → „Ohr knackt beim Schlucken: Ursachen und wann es normal ist"
2. durchfall-am-morgen → „Jeden Morgen Durchfall? Ursachen und wann du abklären solltest"
3. hitzegefuehl-ohne-fieber → „Plötzliches Hitzegefühl ohne Fieber: Was steckt dahinter?"
4. finger-morgens-steif → „Steife Finger am Morgen: Was die Dauer der Steifigkeit verrät"
5. bauch-fuehlt-sich-hart-an → „Harter, aufgeblähter Bauch: Was bedeutet die Spannung?" (kein Konflikt mit harter-oberbauch-ohne-schmerzen: Oberbauch-Qualifier bleibt dort exklusiv)

## Technik
- Sitemap 548 → **560** (+12). CSV +12 PRIMARY_OWNER-Zeilen (Grenzen dokumentiert). health-audit 0/0/0. Renders 390/1440: 0 Overflow, 0 JS-Errors. 0 Em-Dashes.
- Natural Discovery: keine der 12 URLs in seo/index-queue.md, keine manuelle GSC-Einreichung.

## Beobachtung / Risiken
- Zwei neue Same-Slug-Paare (wadenkraempfe-nachts, trockener-mund-nachts): H1-Logik „Warum?" vs. „Was tun?", GSC auf Kannibalisierung beobachten; Fallback = Merge in KS-Seite (dokumentiert).
- MRT weiter „crawled, not indexed": CT-Seite + neue MRT-Ausgangslinks stärken das Segment; beobachten.

## Kandidaten für morgen
- Untersuchungen: Herzultraschall (Echokardiografie), Langzeit-Blutdruckmessung, Schlaflabor/Polygraphie (je sauber, kein Owner).
- Was jetzt?: verstopfte Nase nachts (KS prüfen), Sodbrennen-Akutteil NUR als Ergänzung der Owner-Seite (kein neuer URL-Owner).
- Fragen: „Wie lange wirkt eine Akupunktursitzung nach?" (gegen wann-wirkt-akupunktur auditieren), „Akupunktur in der Schwangerschaft erlaubt?" (YMYL, streng auditieren).
- Schilddrüsen-Ultraschall als Standalone erst bei GSC-Signal auf der Ultraschall-Seite.

Deploy normally. Do not manually submit these URLs or resubmit the sitemap. We will measure natural discovery, crawl and indexing in Google Search Console.
