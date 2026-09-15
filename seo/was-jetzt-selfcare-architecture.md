# Was jetzt?: Selfcare-Architektur (Phase 1, 15.09.2026)

Struktur-only. Keine Übungen, keine Ernährungs- oder Akupressur-Anleitungen,
keine Red-Flag-Details, keine Quellen.

## A. Zweck

Praktische Handlungs-Ebene der Bibliothek: "Was kann ich jetzt sicher selbst
tun?" Verbindet Information mit Handlung, ohne zweite Enzyklopädie oder
DIY-Medizin-Bibliothek zu werden. Antwortet auf: was jetzt tun, was vermeiden,
wann ärztlich abklären, wann professionelle Behandlung.

## B. Intent-Abgrenzung

- Körpersignale: "Ich bemerke etwas."
- Beschwerden: "Ich kenne oder vermute das Problem."
- Befunde & Werte: "Ein Test/Bericht sagt etwas."
- Was jetzt?: "Was kann ich jetzt sicher selbst tun?"
- Therapien: "Welche professionelle Behandlung gibt es?"
- Fragen: "Konkrete Behandlungsfrage."
- Wissen: "Thema verstehen."
- Perspektiven: "Wie TCM.ch klinisch entscheidet."
- TCM verstehen: "TCM-Begriffe/Modelle."

Dokumentiert auch im Kopf von src/data/was-jetzt.ts. Kein zweites
Beschwerden-Cluster.

## C. Routen

- Hub: /gesundheitsbibliothek/was-jetzt/ (öffentlich, noindex,follow)
- Leaf: /gesundheitsbibliothek/was-jetzt/[slug]/ (nur published in Prod)
- Keine Kategorie-URLs; Selfcare-Tools sind Content-Dimensionen, keine Seiten.

## D. Selfcare-Toolbox-Modell

`SelfCareTool = movement | nutrition | acupressure | heat-cold | sleep |
stress | ergonomics | rest-recovery` mit deutschen Labels (TOOL_LABELS).
Pro Artikel nur die relevanten Dimensionen (selfCareTools[] pro Eintrag);
das Template rendert ausschliesslich gefüllte Module. KEIN Checklisten-Raster,
in dem jede Seite Bewegung+Ernährung+Akupressur+Schlaf+Stress enthält.

## E. Sicherheits-Modell

`SelfCareSafety = low-risk | needs-caution | medical-first`.
Phase-1-Themen: 5x low-risk, 5x needs-caution, 0x medical-first
(medical-first nur für explizite Triage-/Weiterleitungsseiten zulässig,
in Phase 1 nicht vorgesehen). Jede Seite trägt den festen Hinweis, dass
Selbsthilfe nur bei geeigneten Beschwerden sinnvoll ist.

## F. Kannibalisierungs-Regeln

Pflichtfelder pro Eintrag: primaryPurpose, canonicalIntentOwner, overlapNotes.
Das Cluster besitzt NUR den Handlungs-Intent; Einordnung (Signale),
Erkrankung (Beschwerden) und Methode (Therapien) bleiben bei den Ownern.
Strenger Seiten-Test (dokumentiert in was-jetzt.ts): Publikation nur bei
mindestens 4 von 5 Kriterien (Action-Intent, substanziell andere Antwort,
echter Selbsthilfe-Nutzen, natürliche interne Links, realer SEO-/Nav-Wert);
sonst Selbsthilfe-Abschnitt auf der Owner-Seite statt neuer URL.

## G. Die 10 geplanten Themen

| Slug | Titel | Safety |
|---|---|---|
| akuter-hexenschuss | Was tun bei akutem Hexenschuss? | needs-caution |
| ischias-schmerzen | Was tun bei Ischias-Schmerzen? | needs-caution |
| nackenschmerzen-nach-dem-schlafen | Was tun bei Nackenschmerzen nach dem Schlafen? | low-risk |
| migraene-im-anflug | Was tun bei Migräne im Anflug? | needs-caution |
| voellegefuehl-nach-dem-essen | Was tun bei Völlegefühl nach dem Essen? | low-risk |
| blaehbauch-am-abend | Was tun bei Blähbauch am Abend? | low-risk |
| muskelverspannungen | Was tun bei Muskelverspannungen? | low-risk |
| knieschmerzen-nach-belastung | Was tun bei Knieschmerzen nach Belastung? | needs-caution |
| schlafprobleme-heute-nacht | Was tun bei Schlafproblemen heute Nacht? | low-risk |
| leichter-schwindel | Was tun bei leichtem Schwindel? | needs-caution |

## H. Canonical Intent Owners (verifiziert)

- akuter-hexenschuss -> /beschwerden/hexenschuss/
- ischias-schmerzen -> /beschwerden/ischias/
- nackenschmerzen-nach-dem-schlafen -> /koerpersignale/nacken-morgens-steif/ + /beschwerden/nackenschmerzen/
- migraene-im-anflug -> /beschwerden/migraene/
- voellegefuehl-nach-dem-essen -> /koerpersignale/voellegefuehl-nach-dem-essen/
- blaehbauch-am-abend -> /koerpersignale/blaehbauch-am-abend/
- muskelverspannungen -> leeres Array. Begründung: keine Beschwerden-Seite zu
  Muskelverspannungen (geprüft gegen src/data/symptom-leaves/); regionale
  Intents bleiben bei nackenschmerzen/rueckenschmerzen. Keine URL erfunden.
- knieschmerzen-nach-belastung -> /beschwerden/knieschmerzen/
- schlafprobleme-heute-nacht -> /beschwerden/schlafprobleme/ (Canonical;
  schlafstoerungen kanonisiert dorthin)
- leichter-schwindel -> /beschwerden/schwindel/

## I. Überlappungs-Risiken

- Höchstes Risiko: voellegefuehl-nach-dem-essen und blaehbauch-am-abend
  tragen IDENTISCHE Slugs wie ihre Körpersignale. Publikation nur bei klar
  bestandenem Seiten-Test, sonst Selbsthilfe-Abschnitt im Körpersignal.
- Drift-Risiko: Handlungsseiten werden schleichend zu Erkrankungs-Explainern
  (z.B. ischias-schmerzen doppelt /beschwerden/ischias/). Gegenmittel:
  primaryPurpose/Owner-Verlinkung, Ursachen/Diagnose konsequent delegieren.
- leichter-schwindel: Grenze "leicht" vs. abklärungsbedürftig muss redaktionell
  sehr sauber werden (needs-caution).

## J. Künftiger interner Linking-Graph

Phase 1: nur strukturelle related*-Arrays, KEINE reziproken Links von
Live-Seiten. Nach Publikation wirken die Seiten als Brücken-Knoten:
Körpersignal -> Was jetzt? -> Beschwerde -> Therapie -> Kontakt, bzw.
Befund -> Beschwerde -> Was jetzt? -> professionelle Behandlung.
Keine Massen-Verlinkungswelle.

## K. Kräuter-Ausschluss

KEIN herbsHtml-Feld, bewusst. Chinesische Kräutertherapie ist ein
professioneller Behandlungsweg: keine Rezepturen, Dosierungen, Kombinationen
oder Selbstverordnung. Erwähnungen verlinken auf /therapien/kraeutertherapie/.

## L. Physio-Grenze

Bewegung nur als sanfte, breite Orientierung (Ruhe vs. Bewegung). Keine
Reha-Programme, keine Übungsverordnungen, kein Physiotherapie-Ersatzcontent;
reine/lokale Physio-Intents gehören physio.ch.

## M. Akupressur-Beziehung (Zukunft)

Kein eigenständiges Akupressur-Selfcare-Cluster. Künftige Artikel können
1-2 einfache Punkte enthalten (acupressureHtml + relatedVisuals +
Sicherheitshinweis); die professionelle Methodenübersicht bleibt bei
/therapien/akupressur/, keine Duplikation. Selbst-Akupressur ersetzt keine
Abklärung und wird nicht mit professioneller Akupunktur vermischt.

## N. Launch-Kriterien

Hub erst indexierbar (HUB_INDEXABLE = true, Sitemap, index-queue) ab
mindestens 4 hochwertigen publizierten Seiten. Jede Publikation einzeln:
Seiten-Test (4/5) bestehen, fachliche Review, interne Links setzen,
URL in seo/index-queue.md.

## O. Dateien (Phase 1)

- src/data/was-jetzt.ts (neu): Datenmodell, TOOL_LABELS, Safety-Modell,
  HUB_INDEXABLE, Seiten-Test-Doku, 10 geplante Einträge, publishedWasJetzt
- src/pages/gesundheitsbibliothek/was-jetzt/index.astro (neu): Hub mit
  Abgrenzungs-Box, nicht-klickbaren Karten inkl. Tool-Chips,
  "Was kann dazugehören?"-Box, Safety-Box, Bibliotheks-Chips
- src/pages/gesundheitsbibliothek/was-jetzt/[slug].astro (neu): Template
  (Kurzantwort, Tun/Vermeiden, optionale Module, Wann abklären, Wenn es
  nicht besser wird, Professionelle Behandlung, Quellen, Related), Dev-Badge
- src/pages/gesundheitsbibliothek/index.astro: Karte nach Befunde & Werte
- src/data/gesundheitsbibliothek.ts: Suchgruppe "Was jetzt?" (nur published,
  aktuell 0 Einträge)
- scripts/health-audit.mjs: classify was-jetzt -> 'selfcare'
